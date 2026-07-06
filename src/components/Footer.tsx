import { Link } from '@tanstack/react-router'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Logo />
              <span className="font-semibold text-gray-900">Nest</span>
            </div>
            <p className="text-sm text-gray-600">
              Financial infrastructure for African business
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/_authenticated/dashboard" className="text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/_authenticated/transactions" className="text-gray-600 hover:text-gray-900">
                  Transactions
                </Link>
              </li>
              <li>
                <Link to="/_authenticated/advisor" className="text-gray-600 hover:text-gray-900">
                  AI Advisor
                </Link>
              </li>
              <li>
                <Link to="/_authenticated/passport" className="text-gray-600 hover:text-gray-900">
                  Financial Passport
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:support@nestfinance.xyz" className="text-gray-600 hover:text-gray-900">
                  Contact
                </a>
              </li>
              <li>
                <a href="mailto:Nest.businesses@proton.me" className="text-gray-600 hover:text-gray-900">
                  Partners
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/legal/terms" className="text-gray-600 hover:text-gray-900">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/legal/privacy" className="text-gray-600 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Nest Financial Technologies Limited. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Built for African businesses
          </p>
        </div>
      </div>
    </footer>
  )
}
