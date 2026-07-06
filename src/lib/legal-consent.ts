import { supabase } from './supabase'

export type DocumentType = 'terms' | 'privacy'

export interface LegalConsent {
  id: string
  user_id: string
  document_type: DocumentType
  document_version: string
  accepted_at: string
  ip_address?: string
  user_agent?: string
  created_at: string
}

/**
 * Record user consent to a legal document
 */
export async function recordConsent(
  documentType: DocumentType,
  documentVersion: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return { success: false, error: 'User not authenticated' }
    }

    const { error } = await supabase
      .from('legal_consent')
      .upsert({
        user_id: user.id,
        document_type: documentType,
        document_version: documentVersion,
        ip_address: await getClientIP(),
        user_agent: navigator.userAgent,
      }, {
        onConflict: 'user_id,document_type'
      })

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error('Error recording consent:', error)
    return { success: false, error: 'Failed to record consent' }
  }
}

/**
 * Check if user has consented to a specific document version
 */
export async function hasConsented(
  documentType: DocumentType,
  requiredVersion?: string
): Promise<{ hasConsented: boolean; currentVersion?: string }> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return { hasConsented: false }
    }

    const { data, error } = await supabase
      .from('legal_consent')
      .select('document_version')
      .eq('user_id', user.id)
      .eq('document_type', documentType)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // No consent record found
        return { hasConsented: false }
      }
      throw error
    }

    if (requiredVersion) {
      return { 
        hasConsented: data.document_version === requiredVersion,
        currentVersion: data.document_version
      }
    }

    return { hasConsented: true, currentVersion: data.document_version }
  } catch (error) {
    console.error('Error checking consent:', error)
    return { hasConsented: false }
  }
}

/**
 * Get all consent records for the current user
 */
export async function getUserConsents(): Promise<LegalConsent[]> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return []
    }

    const { data, error } = await supabase
      .from('legal_consent')
      .select('*')
      .eq('user_id', user.id)
      .order('accepted_at', { ascending: false })

    if (error) throw error

    return data || []
  } catch (error) {
    console.error('Error fetching user consents:', error)
    return []
  }
}

/**
 * Helper function to get client IP address
 * Note: This is a simplified version. In production, you might want to use
 * a server-side endpoint or a service like ipify to get the real IP.
 */
async function getClientIP(): Promise<string | undefined> {
  try {
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    return data.ip
  } catch {
    return undefined
  }
}

/**
 * Current document versions - update these when documents change
 */
export const DOCUMENT_VERSIONS = {
  terms: '2026-06-30',
  privacy: '2026-06-30',
} as const
