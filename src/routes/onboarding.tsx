import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Onboarding } from '@/components/Onboarding'
import { supabase } from '@/lib/supabase'

export const Route = createFileRoute('/onboarding')({
  component: OnboardingComponent,
})

function OnboardingComponent() {
  const navigate = useNavigate()

  const handleComplete = async (data: any) => {
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        throw new Error('User not authenticated')
      }

      // Update profile with onboarding data
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: data.fullName,
          phone_number: data.phoneNumber,
          business_name: data.businessName,
          business_segment: data.segment,
          email: data.email || user.email,
          onboarding_completed: true,
          // Segment-specific fields
          what_you_sell: data.whatYouSell,
          how_you_get_paid: data.howYouGetPaid,
          business_duration: data.businessDuration,
          record_keeping_method: data.recordKeepingMethod,
          startup_stage: data.startupStage,
          has_existing_records: data.hasExistingRecords,
          seeking_funding: data.seekingFunding,
          employee_count: data.employeeCount,
          uses_accounting_software: data.usesAccountingSoftware,
          primary_revenue_source: data.primaryRevenueSource,
          institution_name: data.institutionName,
          institution_type: data.institutionType,
          loan_sizes_interest: data.loanSizesInterest,
          regulatory_status: data.regulatoryStatus,
          industry: data.industry,
        })
        .eq('id', user.id)

      if (error) throw error

      // Navigate to dashboard
      navigate({ to: '/_authenticated/dashboard' })
    } catch (error) {
      console.error('Failed to complete onboarding:', error)
      // You might want to show an error message here
    }
  }

  // Get user info from auth if available
  const getUserInfo = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return {
      email: user?.email || '',
      name: user?.user_metadata?.full_name || '',
    }
  }

  // For simplicity, we'll pass empty strings initially
  // In a real app, you'd fetch this data
  return (
    <Onboarding 
      onComplete={handleComplete}
      initialEmail=""
      initialName=""
    />
  )
}
