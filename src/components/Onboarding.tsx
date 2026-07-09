import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Logo } from './Logo'
import { ChevronRight, ArrowRight } from 'lucide-react'

type BusinessSegment = 'informal' | 'startup' | 'sme' | 'lender'

interface OnboardingData {
  // Universal fields
  fullName: string
  phoneNumber: string
  businessName: string
  segment: BusinessSegment
  email: string
  // Informal business fields
  whatYouSell?: string
  howYouGetPaid?: string
  businessDuration?: string
  recordKeepingMethod?: string
  // Startup fields
  startupStage?: string
  hasExistingRecords?: boolean
  seekingFunding?: boolean
  // SME fields
  employeeCount?: string
  usesAccountingSoftware?: boolean
  primaryRevenueSource?: string
  // Lender fields
  institutionName?: string
  institutionType?: string
  loanSizesInterest?: string
  regulatoryStatus?: string
}

interface OnboardingProps {
  onComplete: (data: OnboardingData) => void
  initialEmail?: string
  initialName?: string
}

export function Onboarding({ onComplete, initialEmail = '', initialName = '' }: OnboardingProps) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<OnboardingData>({
    fullName: initialName,
    phoneNumber: '',
    businessName: '',
    segment: 'informal',
    email: initialEmail,
  })

  const updateData = (field: keyof OnboardingData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1)
    } else {
      onComplete(data)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const isStepValid = () => {
    if (step === 1) {
      return data.fullName && data.phoneNumber && data.businessName && data.segment
    }
    if (step === 2) {
      // Segment-specific validation
      if (data.segment === 'informal') {
        return data.whatYouSell && data.howYouGetPaid && data.businessDuration
      }
      if (data.segment === 'startup') {
        return data.startupStage && data.hasExistingRecords !== undefined
      }
      if (data.segment === 'sme') {
        return data.employeeCount && data.primaryRevenueSource
      }
      if (data.segment === 'lender') {
        return data.institutionName && data.institutionType && data.regulatoryStatus
      }
    }
    return false
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-border bg-card">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <CardTitle className="text-2xl">
            {step === 1 ? 'Tell us about your business' : 'A few more details'}
          </CardTitle>
          <CardDescription>
            {step === 1 
              ? 'This helps us tailor Nest to your specific needs'
              : 'Almost there! Just a couple more questions'
            }
          </CardDescription>
          {/* Progress indicator */}
          <div className="flex justify-center gap-2 mt-4">
            <div className={`h-1 w-8 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-muted'}`} />
            <div className={`h-1 w-8 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
          </div>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full name *</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={data.fullName}
                  onChange={(e) => updateData('fullName', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone number *</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="+254712345678"
                  value={data.phoneNumber}
                  onChange={(e) => updateData('phoneNumber', e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Used for M-Pesa transaction matching
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessName">Business name *</Label>
                <Input
                  id="businessName"
                  type="text"
                  placeholder="Your Business Name"
                  value={data.businessName}
                  onChange={(e) => updateData('businessName', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="segment">Business segment *</Label>
                <select
                  id="segment"
                  value={data.segment}
                  onChange={(e) => updateData('segment', e.target.value as BusinessSegment)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                >
                  <option value="informal">Informal Business</option>
                  <option value="startup">Startup</option>
                  <option value="sme">SME</option>
                  <option value="lender">Lender</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={data.email}
                  onChange={(e) => updateData('email', e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Optional, for account recovery
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              {data.segment === 'informal' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="whatYouSell">What do you sell/do? *</Label>
                    <select
                      id="whatYouSell"
                      value={data.whatYouSell}
                      onChange={(e) => updateData('whatYouSell', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    >
                      <option value="">Select one...</option>
                      <option value="retail">Retail</option>
                      <option value="food">Food & Beverage</option>
                      <option value="services">Services</option>
                      <option value="transport">Transport</option>
                      <option value="agriculture">Agriculture</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="howYouGetPaid">How do you currently get paid? *</Label>
                    <select
                      id="howYouGetPaid"
                      value={data.howYouGetPaid}
                      onChange={(e) => updateData('howYouGetPaid', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    >
                      <option value="">Select one...</option>
                      <option value="mpesa">M-Pesa only</option>
                      <option value="cash">Cash only</option>
                      <option value="both">Both M-Pesa and cash</option>
                      <option value="bank">Bank transfer</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessDuration">How long has your business been running? *</Label>
                    <select
                      id="businessDuration"
                      value={data.businessDuration}
                      onChange={(e) => updateData('businessDuration', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    >
                      <option value="">Select one...</option>
                      <option value="under_1_year">Under 1 year</option>
                      <option value="1_3_years">1-3 years</option>
                      <option value="3_plus_years">3+ years</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recordKeepingMethod">Do you currently keep any records?</Label>
                    <select
                      id="recordKeepingMethod"
                      value={data.recordKeepingMethod}
                      onChange={(e) => updateData('recordKeepingMethod', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    >
                      <option value="">Select one...</option>
                      <option value="notebook">Notebook</option>
                      <option value="phone_notes">Phone notes</option>
                      <option value="nothing">Nothing</option>
                      <option value="software">Accounting software</option>
                    </select>
                  </div>
                </>
              )}

              {data.segment === 'startup' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="startupStage">What stage is your startup at? *</Label>
                    <select
                      id="startupStage"
                      value={data.startupStage}
                      onChange={(e) => updateData('startupStage', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    >
                      <option value="">Select one...</option>
                      <option value="idea">Idea stage</option>
                      <option value="pre_revenue">Pre-revenue</option>
                      <option value="revenue">Revenue-generating</option>
                      <option value="raising">Currently raising</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sector">Sector</Label>
                    <Input
                      id="sector"
                      type="text"
                      placeholder="e.g., Fintech, Healthtech, E-commerce"
                      value={data.industry}
                      onChange={(e) => updateData('industry', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Do you have existing financial records to connect?</Label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="hasExistingRecords"
                          checked={data.hasExistingRecords === true}
                          onChange={() => updateData('hasExistingRecords', true)}
                        />
                        Yes
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="hasExistingRecords"
                          checked={data.hasExistingRecords === false}
                          onChange={() => updateData('hasExistingRecords', false)}
                        />
                        No, starting fresh
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Are you currently seeking funding?</Label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="seekingFunding"
                          checked={data.seekingFunding === true}
                          onChange={() => updateData('seekingFunding', true)}
                        />
                        Yes
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="seekingFunding"
                          checked={data.seekingFunding === false}
                          onChange={() => updateData('seekingFunding', false)}
                        />
                        No
                      </label>
                    </div>
                  </div>
                </>
              )}

              {data.segment === 'sme' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="employeeCount">How many employees do you have? *</Label>
                    <select
                      id="employeeCount"
                      value={data.employeeCount}
                      onChange={(e) => updateData('employeeCount', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    >
                      <option value="">Select one...</option>
                      <option value="1_5">1-5 employees</option>
                      <option value="6_20">6-20 employees</option>
                      <option value="21_plus">21+ employees</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>Do you currently use any accounting software?</Label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="usesAccountingSoftware"
                          checked={data.usesAccountingSoftware === true}
                          onChange={() => updateData('usesAccountingSoftware', true)}
                        />
                        Yes
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="usesAccountingSoftware"
                          checked={data.usesAccountingSoftware === false}
                          onChange={() => updateData('usesAccountingSoftware', false)}
                        />
                        No
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="primaryRevenueSource">Primary revenue source/industry *</Label>
                    <Input
                      id="primaryRevenueSource"
                      type="text"
                      placeholder="e.g., Retail, Manufacturing, Services"
                      value={data.primaryRevenueSource}
                      onChange={(e) => updateData('primaryRevenueSource', e.target.value)}
                    />
                  </div>
                </>
              )}

              {data.segment === 'lender' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="institutionName">Institution name *</Label>
                    <Input
                      id="institutionName"
                      type="text"
                      placeholder="Your Institution Name"
                      value={data.institutionName}
                      onChange={(e) => updateData('institutionName', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="institutionType">Institution type *</Label>
                    <select
                      id="institutionType"
                      value={data.institutionType}
                      onChange={(e) => updateData('institutionType', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    >
                      <option value="">Select one...</option>
                      <option value="bank">Bank</option>
                      <option value="sacco">SACCO</option>
                      <option value="microfinance">Microfinance Institution</option>
                      <option value="individual">Individual Investor</option>
                      <option value="dfi">Development Finance Institution</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="loanSizesInterest">What loan sizes/segments are you interested in?</Label>
                    <Input
                      id="loanSizesInterest"
                      type="text"
                      placeholder="e.g., KES 50K-500K, SME loans"
                      value={data.loanSizesInterest}
                      onChange={(e) => updateData('loanSizesInterest', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="regulatoryStatus">Regulatory status *</Label>
                    <select
                      id="regulatoryStatus"
                      value={data.regulatoryStatus}
                      onChange={(e) => updateData('regulatoryStatus', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    >
                      <option value="">Select one...</option>
                      <option value="licensed_mfi">Licensed MFI</option>
                      <option value="bank">Licensed Bank</option>
                      <option value="sacco">Registered SACCO</option>
                      <option value="informal">Informal Lender</option>
                    </select>
                  </div>
                </>
              )}
            </div>
          )}

          <div className="flex justify-between mt-6">
            {step > 1 ? (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            ) : (
              <div />
            )}
            
            <Button onClick={handleNext} disabled={!isStepValid()}>
              {step === 1 ? (
                <>
                  Continue
                  <ChevronRight className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Complete Setup
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
