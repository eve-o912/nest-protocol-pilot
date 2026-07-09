import { createServerFn } from '@tanstack/react-start'
import { supabase } from './supabase'
import { CategorizationAgent, ContextManager } from './ledger'
import type {
  CategorizationRequest,
  CategorizationResponse,
  CorrectionRequest,
  FewShotExample,
  BusinessContext,
  RawTransaction,
} from './ledger'

// Initialize agent and context manager
const getAgent = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_GENERATIVE_AI_API_KEY
  if (!apiKey) {
    throw new Error('GOOGLE_GENERATIVE_AI_API_KEY environment variable is not set')
  }
  return new CategorizationAgent(apiKey)
}

const contextManager = new ContextManager()

interface CategorizeInput {
  transactions: RawTransaction[]
  userId: string
}

export const categorizeTransactions = createServerFn({ method: 'POST' })
  .validator((data: CategorizeInput) => data)
  .handler(async ({ data }) => {
    const { transactions, userId } = data

    // Fetch business context from profiles
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (profileError || !profile) {
      console.warn('Could not fetch profile, proceeding without business context')
    }

    const businessContext: BusinessContext = {
      business_segment: profile?.business_segment,
      industry: profile?.industry,
      // Additional context could be added here from profile
    }

    // Fetch past corrections for few-shot learning
    const { data: corrections, error: correctionsError } = await supabase
      .from('transaction_corrections')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50)

    if (correctionsError) {
      console.warn('Could not fetch corrections, proceeding without few-shot examples')
    }

    // Build past categorizations from corrections
    const pastCategorizations = corrections?.map(correction => ({
      transaction: correction.transaction_data as RawTransaction,
      category: correction.original_category,
      was_corrected: true,
      corrected_to: correction.corrected_category,
    })) || []

    // Build categorization request
    const request: CategorizationRequest = {
      transactions,
      business_context: businessContext,
      past_categorizations: pastCategorizations,
      user_id: userId,
    }

    // Categorize transactions
    const agent = getAgent()
    const result: CategorizationResponse = await agent.categorizeTransactions(request)

    // Update transactions in database with categories
    for (const categorized of result.categorized_transactions) {
      const { error: updateError } = await supabase
        .from('transactions')
        .update({
          category: categorized.category,
          confidence: categorized.confidence,
        })
        .eq('id', categorized.transaction_id)
        .eq('user_id', userId)

      if (updateError) {
        console.error(`Failed to update transaction ${categorized.transaction_id}:`, updateError)
      }
    }

    return result
  })

interface CorrectionInput {
  transactionId: string
  originalCategory: string
  correctedCategory: string
  userId: string
  transaction: RawTransaction
}

export const submitCorrection = createServerFn({ method: 'POST' })
  .validator((data: CorrectionInput) => data)
  .handler(async ({ data }) => {
    const { transactionId, originalCategory, correctedCategory, userId, transaction } = data

    // Store correction in database
    const { error: insertError } = await supabase
      .from('transaction_corrections')
      .insert({
        user_id: userId,
        transaction_id: transactionId,
        original_category: originalCategory,
        corrected_category: correctedCategory,
        transaction_data: transaction,
        created_at: new Date().toISOString(),
      })

    if (insertError) {
      console.error('Failed to store correction:', insertError)
      throw new Error('Failed to store correction')
    }

    // Update transaction with corrected category
    const { error: updateError } = await supabase
      .from('transactions')
      .update({
        category: correctedCategory,
      })
      .eq('id', transactionId)
      .eq('user_id', userId)

    if (updateError) {
      console.error('Failed to update transaction:', updateError)
      throw new Error('Failed to update transaction')
    }

    // Generate explanation using agent (optional, for better few-shot examples)
    let explanation: string | undefined
    try {
      const agent = getAgent()
      const fewShotExample: FewShotExample = await agent.processCorrection({
        transaction_id: transactionId,
        original_category: originalCategory as any,
        corrected_category: correctedCategory as any,
        user_id: userId,
        transaction,
      })
      explanation = fewShotExample.explanation
    } catch (error) {
      console.warn('Could not generate explanation for correction:', error)
    }

    // Update correction with explanation if generated
    if (explanation) {
      await supabase
        .from('transaction_corrections')
        .update({ explanation })
        .eq('transaction_id', transactionId)
        .eq('user_id', userId)
    }

    // Learn from correction in context manager
    await contextManager.learnFromCorrection(userId, transaction, originalCategory, correctedCategory)

    return { success: true, explanation }
  })

interface GetContextInput {
  userId: string
}

export const getCategorizationContext = createServerFn({ method: 'GET' })
  .validator((data: GetContextInput) => data)
  .handler(async ({ data }) => {
    const { userId } = data

    // Fetch business context
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    const businessContext: BusinessContext = {
      business_segment: profile?.business_segment,
      industry: profile?.industry,
    }

    // Fetch past corrections
    const { data: corrections } = await supabase
      .from('transaction_corrections')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50)

    const pastCategorizations = corrections?.map(correction => ({
      transaction: correction.transaction_data as RawTransaction,
      category: correction.original_category,
      was_corrected: true,
      corrected_to: correction.corrected_category,
    })) || []

    return {
      business_context: businessContext,
      past_categorizations_count: pastCategorizations.length,
    }
  })
