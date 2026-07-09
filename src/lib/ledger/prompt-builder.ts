import { RawTransaction, BusinessContext, FewShotExample, TransactionCategory } from './types'

export class PromptBuilder {
  private static readonly SYSTEM_PROMPT = `You are a financial categorization agent for Kenyan SMEs. Your task is to categorize transactions into one of these categories:

- revenue: Money coming in from customers, sales, services
- cogs: Cost of goods sold - direct costs of producing goods/services (inventory, raw materials, direct labor)
- opex: Operating expenses - rent, utilities, salaries, marketing, software subscriptions, other overhead
- owner_draw: Money withdrawn by business owners for personal use
- transfer: Money moved between business accounts (not income or expense)
- uncategorized: Cannot be determined with available context

You will be provided with:
1. A batch of transactions to categorize
2. Business context (industry, segment, known suppliers/customers)
3. Past examples of how similar transactions were categorized

For each transaction, provide:
- category (one of the above)
- confidence (high/medium/low)
- reasoning (brief explanation)
- suggested_subcategory (optional, more specific classification)

Confidence guidelines:
- HIGH: Clear pattern matches, well-known counterparty, unambiguous context
- MEDIUM: Some ambiguity but can make reasonable inference
- LOW: Insufficient information, ambiguous context, multiple plausible categories

Pay special attention to Kenyan context:
- M-Pesa transfers to unnamed numbers could be supplier payments or owner draws
- Till numbers often indicate retail revenue
- Bank transfers to individuals may be salary payments or owner draws
- Mobile money is commonly used for both business and personal transactions

Return your response as a JSON array of categorized transactions.`

  static buildCategorizationPrompt(
    transactions: RawTransaction[],
    businessContext?: BusinessContext,
    fewShotExamples?: FewShotExample[]
  ): string {
    let prompt = ''

    // Add few-shot examples if available
    if (fewShotExamples && fewShotExamples.length > 0) {
      prompt += '## Past Categorization Examples\n\n'
      fewShotExamples.forEach((example, index) => {
        prompt += `Example ${index + 1}:\n`
        prompt += `Transaction: ${JSON.stringify(example.transaction)}\n`
        prompt += `Category: ${example.category}\n`
        prompt += `Explanation: ${example.explanation}\n\n`
      })
      prompt += '---\n\n'
    }

    // Add business context
    if (businessContext) {
      prompt += '## Business Context\n\n'
      if (businessContext.business_segment) {
        prompt += `Business Segment: ${businessContext.business_segment}\n`
      }
      if (businessContext.industry) {
        prompt += `Industry: ${businessContext.industry}\n`
      }
      if (businessContext.common_suppliers && businessContext.common_suppliers.length > 0) {
        prompt += `Known Suppliers: ${businessContext.common_suppliers.join(', ')}\n`
      }
      if (businessContext.common_customers && businessContext.common_customers.length > 0) {
        prompt += `Known Customers: ${businessContext.common_customers.join(', ')}\n`
      }
      if (businessContext.owner_phone_numbers && businessContext.owner_phone_numbers.length > 0) {
        prompt += `Owner Phone Numbers: ${businessContext.owner_phone_numbers.join(', ')}\n`
      }
      prompt += '\n'
    }

    // Add transactions to categorize
    prompt += '## Transactions to Categorize\n\n'
    prompt += JSON.stringify(transactions, null, 2)
    prompt += '\n\n'

    prompt += 'Categorize each transaction and return a JSON array with this structure:\n'
    prompt += '```json\n'
    prompt += '[\n'
    prompt += '  {\n'
    prompt += '    "transaction_id": "string",\n'
    prompt += '    "category": "revenue|cogs|opex|owner_draw|transfer|uncategorized",\n'
    prompt += '    "confidence": "high|medium|low",\n'
    prompt += '    "reasoning": "string",\n'
    prompt += '    "suggested_subcategory": "optional string"\n'
    prompt += '  }\n'
    prompt += ']\n'
    prompt += '```'

    return prompt
  }

  static buildCorrectionPrompt(
    transaction: RawTransaction,
    originalCategory: TransactionCategory,
    correctedCategory: TransactionCategory,
    businessContext?: BusinessContext
  ): string {
    let prompt = '## Transaction Correction\n\n'
    prompt += `Transaction: ${JSON.stringify(transaction)}\n\n`
    prompt += `Original Category: ${originalCategory}\n`
    prompt += `Corrected Category: ${correctedCategory}\n\n`

    if (businessContext) {
      prompt += 'Business Context:\n'
      prompt += JSON.stringify(businessContext, null, 2)
      prompt += '\n\n'
    }

    prompt += 'Provide a brief explanation for why this correction was made. This will be used as a few-shot example for future categorizations.\n\n'
    prompt += 'Return your response as JSON with this structure:\n'
    prompt += '```json\n'
    prompt += '{\n'
    prompt += '  "explanation": "string"\n'
    prompt += '}\n'
    prompt += '```'

    return prompt
  }

  static getSystemPrompt(): string {
    return this.SYSTEM_PROMPT
  }
}
