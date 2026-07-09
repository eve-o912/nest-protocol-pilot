import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Check, X, AlertCircle } from 'lucide-react'
import { categorizeTransactions, submitCorrection } from '../lib/ledger.functions'
import type { RawTransaction, CategorizedTransaction } from '../lib/ledger'

interface CategorizationReviewProps {
  transactions: RawTransaction[]
  userId: string
  onComplete?: (results: any) => void
}

export function CategorizationReview({ transactions, userId, onComplete }: CategorizationReviewProps) {
  const [categorizations, setCategorizations] = useState<CategorizedTransaction[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [corrections, setCorrections] = useState<Record<string, string>>({})

  const handleCategorize = async () => {
    setIsProcessing(true)
    try {
      const result = await categorizeTransactions({ transactions, userId })
      setCategorizations(result.categorized_transactions)
    } catch (error) {
      console.error('Categorization failed:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCorrection = (transactionId: string, newCategory: string) => {
    setCorrections(prev => ({ ...prev, [transactionId]: newCategory }))
  }

  const handleSubmitCorrections = async () => {
    setIsSubmitting(true)
    try {
      for (const [transactionId, correctedCategory] of Object.entries(corrections)) {
        const categorization = categorizations.find(c => c.transaction_id === transactionId)
        const transaction = transactions.find(t => t.id === transactionId)
        
        if (categorization && transaction) {
          await submitCorrection({
            transactionId,
            originalCategory: categorization.category,
            correctedCategory,
            userId,
            transaction,
          })
        }
      }
      
      // Refresh categorizations after corrections
      await handleCategorize()
      setCorrections({})
      onComplete?.({ success: true })
    } catch (error) {
      console.error('Failed to submit corrections:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getConfidenceIcon = (confidence: string) => {
    switch (confidence) {
      case 'high':
        return <Check className="h-4 w-4 text-green-500" />
      case 'medium':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case 'low':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getConfidenceBadge = (confidence: string) => {
    const colors = {
      high: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-red-100 text-red-800',
    }
    return (
      <Badge className={colors[confidence as keyof typeof colors] || 'bg-gray-100'}>
        {confidence} confidence
      </Badge>
    )
  }

  const categories = ['revenue', 'cogs', 'opex', 'owner_draw', 'transfer', 'uncategorized']

  if (categorizations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transaction Categorization</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            AI will categorize {transactions.length} transactions based on context and past corrections.
          </p>
          <Button onClick={handleCategorize} disabled={isProcessing}>
            {isProcessing ? 'Categorizing...' : 'Start Categorization'}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Review Categorizations</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleCategorize}
            disabled={isProcessing}
          >
            {isProcessing ? 'Refreshing...' : 'Refresh'}
          </Button>
          <Button
            onClick={handleSubmitCorrections}
            disabled={isSubmitting || Object.keys(corrections).length === 0}
          >
            {isSubmitting ? 'Submitting...' : `Submit ${Object.keys(corrections).length} Corrections`}
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {categorizations.map((cat) => {
          const transaction = transactions.find(t => t.id === cat.transaction_id)
          if (!transaction) return null

          const correctedCategory = corrections[cat.transaction_id]
          const displayCategory = correctedCategory || cat.category

          return (
            <Card key={cat.transaction_id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">
                        {transaction.counterparty || 'Unknown'}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {transaction.direction === 'in' ? '+' : '-'}KES {transaction.amount_kes.toLocaleString()}
                      </span>
                      {getConfidenceIcon(cat.confidence)}
                    </div>
                    
                    {transaction.note && (
                      <p className="text-sm text-muted-foreground">{transaction.note}</p>
                    )}
                    
                    <div className="flex items-center gap-2 flex-wrap">
                      {getConfidenceBadge(cat.confidence)}
                      <Badge variant="outline">{displayCategory}</Badge>
                      {cat.suggested_subcategory && (
                        <Badge variant="secondary">{cat.suggested_subcategory}</Badge>
                      )}
                    </div>

                    {cat.reasoning && (
                      <p className="text-xs text-muted-foreground italic">
                        {cat.reasoning}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <select
                      value={correctedCategory || cat.category}
                      onChange={(e) => handleCorrection(cat.transaction_id, e.target.value)}
                      className="text-sm border rounded px-2 py-1"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    {correctedCategory && correctedCategory !== cat.category && (
                      <span className="text-xs text-orange-600">Modified</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
