import { createFileRoute } from '@tanstack/react-router'
import { LegalDocument } from '@/components/LegalDocument'

export const Route = createFileRoute('/legal/privacy')({
  component: PrivacyPolicy,
})

function PrivacyPolicy() {
  const sections = [
    {
      id: 'introduction',
      title: '1. Introduction',
      content: `
        <p>Nest ("we," "us," or "our") is committed to protecting your privacy and handling your personal and financial data responsibly. This Privacy Policy explains how we collect, use, store, share, and protect your information when you use the Nest mobile application, web application, APIs, and related services (collectively, the "Services").</p>
        <p>This Policy is designed to comply with the Kenya Data Protection Act, 2019 ("DPA") and its accompanying regulations, as well as applicable international standards including the principles reflected in the EU General Data Protection Regulation (GDPR), to the extent relevant to our operations and User base.</p>
        <p>By using the Services, you consent to the data practices described in this Policy. If you do not agree with this Policy, please do not use the Services.</p>
      `
    },
    {
      id: 'data-controller',
      title: '2. Data Controller',
      content: `
        <p>For the purposes of the DPA, Nest acts as the Data Controller in respect of the personal data described in this Policy, except where explicitly stated that Nest acts as a Data Processor on behalf of a third party (such as a Lender Partner).</p>
        <p><strong>Data Protection contact:</strong> dataprotection@nestfinance.xyz</p>
      `
    },
    {
      id: 'information-collected',
      title: '3. Information We Collect',
      content: `
        <p>We collect the following categories of personal and financial data, depending on how you use the Services:</p>
        <table class="min-w-full border-collapse border border-gray-300 my-4">
          <thead>
            <tr class="bg-gray-100">
              <th class="border border-gray-300 px-4 py-2 text-left">Category of Data</th>
              <th class="border border-gray-300 px-4 py-2 text-left">Examples</th>
              <th class="border border-gray-300 px-4 py-2 text-left">Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 px-4 py-2 font-medium">Identity Data</td>
              <td class="border border-gray-300 px-4 py-2">Full name, date of birth, national ID/passport number, phone number</td>
              <td class="border border-gray-300 px-4 py-2">Account creation, identity verification, fraud prevention</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 font-medium">Business Data</td>
              <td class="border border-gray-300 px-4 py-2">Business name, registration details, business type, county, years in operation</td>
              <td class="border border-gray-300 px-4 py-2">Service personalisation, Financial Passport generation</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 font-medium">Financial & Transaction Data</td>
              <td class="border border-gray-300 px-4 py-2">M-Pesa statements, bank statements, transaction history, revenue, expenses, debts</td>
              <td class="border border-gray-300 px-4 py-2">Bookkeeping, insights, Financial Passport, credit assessment (with consent)</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 font-medium">Authentication Data</td>
              <td class="border border-gray-300 px-4 py-2">Email address, hashed password, OAuth tokens (e.g. Google sign-in)</td>
              <td class="border border-gray-300 px-4 py-2">Account security and access management</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 font-medium">Usage Data</td>
              <td class="border border-gray-300 px-4 py-2">App interactions, feature usage, device type, IP address, log data</td>
              <td class="border border-gray-300 px-4 py-2">Service improvement, analytics, security monitoring</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2 font-medium">Communications Data</td>
              <td class="border border-gray-300 px-4 py-2">Messages to Manikka AI advisor, support enquiries</td>
              <td class="border border-gray-300 px-4 py-2">Providing AI-driven advisory features and customer support</td>
            </tr>
          </tbody>
        </table>
      `
    },
    {
      id: 'data-collection-methods',
      title: '4. How We Collect Your Data',
      content: ``,
      subsections: [
        {
          id: 'direct-collection',
          title: '4.1 Directly From You',
          content: `
            <p>Information you provide during registration, onboarding, profile setup, customer support interactions, or when manually uploading financial statements (PDF/CSV).</p>
          `
        },
        {
          id: 'automatic-collection',
          title: '4.2 Automatically',
          content: `
            <p>Usage data, device information, and log data collected automatically when you interact with the Services, via cookies, SDKs, and similar technologies.</p>
          `
        },
        {
          id: 'third-party-integrations',
          title: '4.3 Via Third-Party Integrations',
          content: `
            <p>With your explicit consent, we collect transaction data from:</p>
            <ul>
              <li><strong>Safaricom Daraja API</strong> — M-Pesa transaction and Paybill/Till data;</li>
              <li><strong>Open banking providers</strong> (e.g. Stitch, Mono) — bank account transactions and balances;</li>
              <li><strong>Africa's Talking</strong> — SMS-based transaction parsing, where you opt in to SMS sync;</li>
              <li><strong>Google OAuth</strong> — basic profile information when you sign in with Google.</li>
            </ul>
            <p>You may revoke any of these integrations at any time via your account settings, which will stop future data collection from that source (subject to retention of previously collected data as described in Section 8).</p>
          `
        }
      ]
    },
    {
      id: 'data-use',
      title: '5. How We Use Your Information',
      content: `
        <p>We use your information for the following purposes, relying on the legal bases indicated:</p>
        <ul>
          <li>To provide and maintain the Services, including bookkeeping, sales tracking, and account management (performance of contract);</li>
          <li>To generate your Financial Passport and AI-driven financial insights via Manikka (performance of contract / legitimate interest);</li>
          <li>To facilitate credit assessment by Lender Partners, only where you have given explicit, specific consent for each instance of sharing (consent);</li>
          <li>To detect, prevent, and investigate fraud, security incidents, or violations of our Terms of Service (legitimate interest / legal obligation);</li>
          <li>To comply with applicable legal and regulatory obligations, including anti-money laundering (AML) requirements (legal obligation);</li>
          <li>To communicate with you regarding your account, updates, or customer support (performance of contract / legitimate interest);</li>
          <li>To improve and develop the Services, including training and refining AI models, using aggregated or de-identified data wherever possible (legitimate interest).</li>
        </ul>
      `
    },
    {
      id: 'ai-processing',
      title: '6. AI Processing and Manikka',
      content: `
        <p>When you interact with Manikka, our AI-powered financial advisor, your queries and relevant financial data may be processed by third-party large language model providers (such as Anthropic's Claude API) to generate responses. We take reasonable steps to ensure such processing is conducted under data processing agreements that require appropriate confidentiality and security standards.</p>
        <p>We do not permit third-party AI providers to use your data to train their general-purpose models outside the context of providing the Service to you, where such controls are available and contractually agreed.</p>
      `
    },
    {
      id: 'financial-passport-sharing',
      title: '7. The Financial Passport and Data Sharing with Lenders',
      content: `
        <p>Your Financial Passport is built from your transaction history and behavioural financial data. It is private by default and is never shared with any third party unless you provide explicit, informed, and revocable consent for a specific sharing instance (e.g. when applying for credit through a Lender Partner).</p>
        <ul>
          <li>You will be shown clearly what data is included in any Financial Passport share before you authorise it;</li>
          <li>You may withdraw consent for future sharing at any time, though this does not retract data already shared with a Lender Partner for a completed transaction;</li>
          <li>Lender Partners receiving your Financial Passport data are contractually obligated to use it solely for the agreed purpose (e.g. credit assessment) and are prohibited from reselling or repurposing your data without further consent.</li>
        </ul>
        <p>Lenders, financial institutions, or partners interested in accessing Financial Passport data via API should contact us directly at Nest.businesses@proton.me to establish a data sharing agreement, which will be governed by a separate data processing agreement in addition to this Policy.</p>
      `
    },
    {
      id: 'data-retention',
      title: '8. Data Retention',
      content: `
        <p>We retain your personal and financial data for as long as your account remains active, and for a reasonable period thereafter to comply with legal obligations, resolve disputes, enforce our agreements, and maintain accurate financial records, generally not exceeding seven (7) years from account closure, unless a longer retention period is required by applicable law (including tax and AML regulations).</p>
        <p>Upon account deletion, we will delete or anonymise your personal data within 90 days, except where retention is required by law or for legitimate business purposes such as fraud prevention.</p>
      `
    },
    {
      id: 'data-security',
      title: '9. Data Security',
      content: `
        <p>We implement industry-standard technical and organisational measures to protect your data, including:</p>
        <ul>
          <li>Encryption of data in transit (TLS) and at rest;</li>
          <li>Row-level security and access controls restricting data access to authorised personnel only;</li>
          <li>Cryptographic anchoring of Financial Passport records to ensure data integrity;</li>
          <li>Regular security reviews and monitoring for unauthorised access or anomalies;</li>
          <li>Secure authentication mechanisms, including support for OAuth-based sign-in.</li>
        </ul>
        <p>While we take reasonable steps to protect your data, no system is completely secure, and we cannot guarantee absolute security. You play a role in protecting your account by maintaining strong, unique passwords and not sharing your credentials.</p>
      `
    },
    {
      id: 'data-sharing',
      title: '10. Data Sharing and Disclosure',
      content: `
        <p>We do not sell your personal data. We may share your data with:</p>
        <ul>
          <li><strong>Service providers and sub-processors</strong> who support our infrastructure (e.g. cloud hosting, payment processing, SMS gateways), under contractual confidentiality and data protection obligations;</li>
          <li><strong>Lender Partners</strong>, solely with your explicit consent as described in Section 7;</li>
          <li><strong>Regulatory authorities or law enforcement</strong>, where required by law, court order, or to protect the rights, property, or safety of Nest, our Users, or the public;</li>
          <li><strong>A successor entity</strong>, in the event of a merger, acquisition, or sale of assets, subject to equivalent privacy protections being maintained.</li>
        </ul>
      `
    },
    {
      id: 'cross-border-transfers',
      title: '11. Cross-Border Data Transfers',
      content: `
        <p>Where your data is processed or stored outside Kenya (for example, via cloud infrastructure providers or AI service providers located in other jurisdictions), we ensure that appropriate safeguards are in place in accordance with the Kenya Data Protection Act, 2019, including contractual protections and, where applicable, reliance on jurisdictions recognised as providing adequate data protection.</p>
      `
    },
    {
      id: 'user-rights',
      title: '12. Your Rights',
      content: `
        <p>Subject to applicable law, including the Kenya Data Protection Act, 2019, you have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you;</li>
          <li>Request correction of inaccurate or incomplete data;</li>
          <li>Request deletion of your personal data, subject to legal retention requirements;</li>
          <li>Object to or restrict certain processing activities, including direct marketing;</li>
          <li>Withdraw consent at any time for processing based on consent, including Financial Passport sharing;</li>
          <li>Request a copy of your data in a portable, machine-readable format;</li>
          <li>Lodge a complaint with the Office of the Data Protection Commissioner (ODPC) Kenya, or other applicable supervisory authority.</li>
        </ul>
        <p>To exercise any of these rights, please contact us at dataprotection@nestfinance.xyz. We will respond to your request within the timeframe required by applicable law.</p>
      `
    },
    {
      id: 'childrens-privacy',
      title: '13. Children\'s Privacy',
      content: `
        <p>The Services are not directed at, and we do not knowingly collect personal data from, individuals under the age of 18. If we become aware that we have inadvertently collected personal data from a minor, we will take steps to delete such data promptly.</p>
      `
    },
    {
      id: 'cookies',
      title: '14. Cookies and Tracking Technologies',
      content: `
        <p>We use cookies and similar tracking technologies on our web application to enhance user experience, remember preferences, and gather analytics. You may control cookie preferences through your browser settings, although disabling certain cookies may affect functionality.</p>
      `
    },
    {
      id: 'changes-policy',
      title: '15. Changes to This Policy',
      content: `
        <p>We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of material changes via email or in-app notification, and will update the "Last updated" date at the top of this Policy. Continued use of the Services after such changes constitutes acceptance of the revised Policy.</p>
      `
    },
    {
      id: 'contact',
      title: '16. Contact Us',
      content: `
        <p>If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:</p>
        <ul>
          <li><strong>General enquiries:</strong> support@nestfinance.xyz</li>
          <li><strong>Lenders & Partners:</strong> Nest.businesses@proton.me</li>
        </ul>
      `
    }
  ]

  return (
    <LegalDocument
      title="Privacy Policy"
      lastUpdated="June 30, 2026"
      sections={sections}
    />
  )
}
