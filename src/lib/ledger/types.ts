export type TransactionCategory = 
  | 'revenue'
  | 'cogs'
  | 'opex'
  | 'owner_draw'
  | 'transfer'
  | 'uncategorized'

export type ConfidenceLevel = 'high' | 'medium' | 'low'

export interface RawTransaction {
  id: string
  amount_kes: number
  direction: 'in' | 'out'
  counterparty?: string
  note?: string
  occurred_at: string
  account_type?: string
  account_name?: string
}

export interface CategorizedTransaction {
  transaction_id: string
  category: TransactionCategory
  confidence: ConfidenceLevel
  reasoning?: string
  suggested_subcategory?: string
}

export interface BusinessContext {
  business_segment?: string
  industry?: string
  common_suppliers?: string[]
  common_customers?: string[]
  owner_phone_numbers?: string[]
}

export interface PastCategorization {
  transaction: RawTransaction
  category: TransactionCategory
  was_corrected: boolean
  corrected_to?: TransactionCategory
}

export interface CategorizationRequest {
  transactions: RawTransaction[]
  business_context?: BusinessContext
  past_categorizations?: PastCategorization[]
  user_id: string
}

export interface CategorizationResponse {
  categorized_transactions: CategorizedTransaction[]
  total_processed: number
  high_confidence_count: number
  medium_confidence_count: number
  low_confidence_count: number
}

export interface CorrectionRequest {
  transaction_id: string
  original_category: TransactionCategory
  corrected_category: TransactionCategory
  user_id: string
  transaction: RawTransaction
}

export interface FewShotExample {
  transaction: RawTransaction
  category: TransactionCategory
  explanation: string
}
