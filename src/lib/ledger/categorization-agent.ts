import { generateText } from 'ai'
import { google } from '@ai-sdk/google'
import {
  CategorizationRequest,
  CategorizationResponse,
  CategorizedTransaction,
  CorrectionRequest,
  FewShotExample,
} from './types'
import { PromptBuilder } from './prompt-builder'

export class CategorizationAgent {
  private apiKey: string
  private model: string = 'gemini-1.5-flash'

  constructor(apiKey: string, model?: string) {
    this.apiKey = apiKey
    if (model) {
      this.model = model
    }
  }

  async categorizeTransactions(request: CategorizationRequest): Promise<CategorizationResponse> {
    const { transactions, business_context, past_categorizations } = request

    // Convert past categorizations to few-shot examples
    const fewShotExamples: FewShotExample[] = this.buildFewShotExamples(past_categorizations)

    // Build the prompt
    const userPrompt = PromptBuilder.buildCategorizationPrompt(
      transactions,
      business_context,
      fewShotExamples
    )

    try {
      const result = await generateText({
        model: google(this.model, {
          apiKey: this.apiKey,
        }),
        system: PromptBuilder.getSystemPrompt(),
        prompt: userPrompt,
        temperature: 0.3,
      })

      // Extract and parse the response
      const responseText = this.extractJsonFromResponse(result.text)
      const categorizedTransactions: CategorizedTransaction[] = JSON.parse(responseText)

      // Validate and count confidence levels
      const validated = this.validateCategorizations(categorizedTransactions, transactions)
      
      const highConfidence = validated.filter((t) => t.confidence === 'high').length
      const mediumConfidence = validated.filter((t) => t.confidence === 'medium').length
      const lowConfidence = validated.filter((t) => t.confidence === 'low').length

      return {
        categorized_transactions: validated,
        total_processed: validated.length,
        high_confidence_count: highConfidence,
        medium_confidence_count: mediumConfidence,
        low_confidence_count: lowConfidence,
      }
    } catch (error) {
      console.error('Error categorizing transactions:', error)
      throw new Error(`Failed to categorize transactions: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async processCorrection(request: CorrectionRequest): Promise<FewShotExample> {
    const { transaction, original_category, corrected_category } = request

    // Build correction prompt
    const userPrompt = PromptBuilder.buildCorrectionPrompt(
      transaction,
      original_category,
      corrected_category
    )

    try {
      const result = await generateText({
        model: google(this.model, {
          apiKey: this.apiKey,
        }),
        system: PromptBuilder.getSystemPrompt(),
        prompt: userPrompt,
        temperature: 0.3,
      })

      const responseText = this.extractJsonFromResponse(result.text)
      const { explanation } = JSON.parse(responseText)

      return {
        transaction,
        category: corrected_category,
        explanation: explanation || `User corrected from ${original_category} to ${corrected_category}`,
      }
    } catch (error) {
      console.error('Error processing correction:', error)
      // Return a basic example even if AI explanation fails
      return {
        transaction,
        category: corrected_category,
        explanation: `User corrected from ${original_category} to ${corrected_category}`,
      }
    }
  }

  async categorizeBatch(
    transactions: any[],
    batchSize: number = 20,
    request: CategorizationRequest
  ): Promise<CategorizationResponse> {
    const allCategorized: CategorizedTransaction[] = []
    let highCount = 0
    let mediumCount = 0
    let lowCount = 0

    for (let i = 0; i < transactions.length; i += batchSize) {
      const batch = transactions.slice(i, i + batchSize)
      const batchRequest = {
        ...request,
        transactions: batch,
      }

      const batchResult = await this.categorizeTransactions(batchRequest)
      allCategorized.push(...batchResult.categorized_transactions)
      highCount += batchResult.high_confidence_count
      mediumCount += batchResult.medium_confidence_count
      lowCount += batchResult.low_confidence_count
    }

    return {
      categorized_transactions: allCategorized,
      total_processed: allCategorized.length,
      high_confidence_count: highCount,
      medium_confidence_count: mediumCount,
      low_confidence_count: lowCount,
    }
  }

  private buildFewShotExamples(pastCategorizations?: any[]): FewShotExample[] {
    if (!pastCategorizations) return []

    return pastCategorizations
      .filter((pc) => pc.was_corrected && pc.corrected_to)
      .map((pc) => ({
        transaction: pc.transaction,
        category: pc.corrected_to,
        explanation: `User corrected from ${pc.category} to ${pc.corrected_to}`,
      }))
  }

  private extractJsonFromResponse(text: string): string {
    // Try to extract JSON from markdown code blocks if present
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/)
    if (jsonMatch) {
      return jsonMatch[1].trim()
    }
    // If no code block, try to parse the whole text as JSON
    return text.trim()
  }

  private validateCategorizations(
    categorized: CategorizedTransaction[],
    originalTransactions: any[]
  ): CategorizedTransaction[] {
    const validCategories = ['revenue', 'cogs', 'opex', 'owner_draw', 'transfer', 'uncategorized']
    const validConfidence = ['high', 'medium', 'low']

    const transactionIds = new Set(originalTransactions.map((t) => t.id))

    return categorized.filter((cat) => {
      // Check if transaction_id exists in original batch
      if (!transactionIds.has(cat.transaction_id)) {
        console.warn(`Invalid transaction_id: ${cat.transaction_id}`)
        return false
      }

      // Validate category
      if (!validCategories.includes(cat.category)) {
        console.warn(`Invalid category: ${cat.category}`)
        return false
      }

      // Validate confidence
      if (!validConfidence.includes(cat.confidence)) {
        console.warn(`Invalid confidence: ${cat.confidence}`)
        return false
      }

      return true
    })
  }
}
