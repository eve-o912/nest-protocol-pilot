import { createFileRoute } from '@tanstack/react-router'
import { LegalDocument } from '@/components/LegalDocument'

export const Route = createFileRoute('/legal/')({
  component: LegalHub,
})

function LegalHub() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Legal Documents</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Review our terms of service, privacy policy, and other legal documents governing your use of Nest's financial services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <a
            href="/legal/terms"
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Terms of Service</h2>
                <p className="text-gray-600 text-sm">
                  The terms and conditions governing your use of Nest's financial services, including rights, responsibilities, and limitations.
                </p>
              </div>
            </div>
          </a>

          <a
            href="/legal/privacy"
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-green-300 transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Privacy Policy</h2>
                <p className="text-gray-600 text-sm">
                  How we collect, use, store, and protect your personal and financial data in compliance with Kenyan data protection laws.
                </p>
              </div>
            </div>
          </a>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Questions about our legal documents? Contact us at{' '}
            <a href="mailto:support@nestfinance.xyz" className="text-blue-600 hover:underline">
              support@nestfinance.xyz
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
