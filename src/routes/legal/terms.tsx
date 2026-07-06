import { createFileRoute } from '@tanstack/react-router'
import { LegalDocument } from '@/components/LegalDocument'

export const Route = createFileRoute('/legal/terms')({
  component: TermsOfService,
})

function TermsOfService() {
  const sections = [
    {
      id: 'introduction',
      title: '1. Introduction and Acceptance of Terms',
      content: `
        <p>These Terms of Service ("Terms") constitute a legally binding agreement between you ("you," "your," or "User") and Nest, governing your access to and use of the Nest mobile application, web application, APIs, and related services (collectively, the "Services").</p>
        <p>By creating an account, accessing, or using the Services in any way, you confirm that you have read, understood, and agree to be bound by these Terms, our Privacy Policy, and any additional terms referenced herein. If you do not agree to these Terms, you must not access or use the Services.</p>
        <p>If you are using the Services on behalf of a business, organisation, or other legal entity, you represent that you have the authority to bind that entity to these Terms, and "you" will refer to that entity.</p>
      `
    },
    {
      id: 'eligibility',
      title: '2. Eligibility',
      content: `
        <p>To use the Services, you must:</p>
        <ul>
          <li>Be at least 18 years of age, or the age of legal majority in your jurisdiction;</li>
          <li>Have the legal capacity to enter into a binding contract;</li>
          <li>Operate a legitimate business, be a registered or informal business owner, founder, or authorised lending/financial partner;</li>
          <li>Not be barred from using financial services under applicable law, including anti-money laundering (AML) and counter-terrorism financing (CTF) regulations;</li>
          <li>Provide accurate, current, and complete information during registration and onboarding.</li>
        </ul>
        <p>Nest reserves the right to refuse service, suspend, or terminate accounts that do not meet these eligibility requirements, at our sole discretion.</p>
      `
    },
    {
      id: 'services',
      title: '3. Description of Services',
      content: `
        <p>Nest provides an AI-powered financial operating system for informal businesses, startups, and small and medium enterprises (SMEs), comprising the following core service layers:</p>
      `,
      subsections: [
        {
          id: 'business-tools',
          title: '3.1 Business Operating Tools',
          content: `
            <p>Sales recording, point-of-sale (POS) functionality, digital receipts, inventory and stock tracking, customer and debt management, and double-entry bookkeeping.</p>
          `
        },
        {
          id: 'ai-advisory',
          title: '3.2 AI Financial Advisory ("Manikka")',
          content: `
            <p>An AI-powered conversational assistant providing financial summaries, insights, anomaly detection, and advisory support based on your transaction data. Manikka's outputs are generated using artificial intelligence and are provided for informational purposes only. They do not constitute professional financial, legal, tax, or investment advice, and Nest does not guarantee their accuracy, completeness, or suitability for your specific circumstances.</p>
          `
        },
        {
          id: 'financial-passport',
          title: '3.3 Financial Passport',
          content: `
            <p>A cryptographically anchored, behavioural financial identity record generated from your transaction history over time, which may be shared, at your sole discretion and with your express consent, with third-party lenders, financial institutions, or credit partners ("Lender Partners") for the purpose of credit assessment or other agreed purposes.</p>
          `
        },
        {
          id: 'data-aggregation',
          title: '3.4 Data Aggregation Services',
          content: `
            <p>Integration with mobile money platforms (including but not limited to M-Pesa via the Safaricom Daraja API), bank account data via licensed open banking providers, SMS-based transaction parsing, and manual statement uploads (PDF/CSV), for the purpose of aggregating your financial data into a unified view.</p>
            <p>Nest reserves the right to modify, suspend, add to, or discontinue any aspect of the Services at any time, with or without notice, although we will make reasonable efforts to notify Users of material changes in advance.</p>
          `
        }
      ]
    },
    {
      id: 'account-security',
      title: '4. Account Registration and Security',
      content: `
        <p>You are responsible for maintaining the confidentiality of your account credentials, including your password and any authentication tokens. You agree to:</p>
        <ul>
          <li>Notify Nest immediately of any unauthorised access to or use of your account;</li>
          <li>Ensure that all information provided during registration and ongoing use remains accurate and up to date;</li>
          <li>Not share your account credentials with any third party;</li>
          <li>Not create multiple accounts for fraudulent purposes or to circumvent service limitations.</li>
        </ul>
        <p>Nest is not liable for any loss or damage arising from your failure to comply with these security obligations.</p>
      `
    },
    {
      id: 'data-collection',
      title: '5. Data Collection, Linking, and Consent',
      content: `
        <p>By using the Services, you authorise Nest to collect, process, and store financial data from sources you choose to connect, including but not limited to mobile money statements, bank statements, SMS transaction alerts, and data obtained via third-party APIs (including Safaricom Daraja, open banking providers such as Stitch or Mono, and Africa's Talking SMS gateway services).</p>
        <p>You acknowledge that:</p>
        <ul>
          <li>You are solely responsible for ensuring you have the right to share any data you upload or connect, including data relating to joint accounts or shared business finances;</li>
          <li>Nest acts as a data processor and, in certain contexts, a data controller, in accordance with our Privacy Policy and applicable data protection law, including the Kenya Data Protection Act, 2019;</li>
          <li>You may revoke data access permissions at any time through your account settings, subject to certain retention obligations described in our Privacy Policy;</li>
          <li>Sharing your Financial Passport with a Lender Partner is entirely optional and occurs only upon your explicit, informed consent for each instance of sharing.</li>
        </ul>
      `
    },
    {
      id: 'fees',
      title: '6. Fees, Billing, and Subscription Plans',
      content: ``,
      subsections: [
        {
          id: 'subscription-tiers',
          title: '6.1 Subscription Tiers',
          content: `
            <p>Nest offers tiered subscription plans ("Starter," "Growth," and "Scale"), each with differing features and pricing, as described on our website or within the application. Prices are quoted in Kenyan Shillings (KES) unless otherwise stated and are subject to change with reasonable prior notice.</p>
          `
        },
        {
          id: 'billing',
          title: '6.2 Billing',
          content: `
            <p>Subscription fees are billed in advance on a monthly or annual basis, as selected at checkout. Payment may be collected via mobile money, card, or other supported payment methods. Failure to pay outstanding fees may result in suspension or downgrade of your account.</p>
          `
        },
        {
          id: 'refunds',
          title: '6.3 Refunds',
          content: `
            <p>Except where required by applicable law, subscription fees are non-refundable. You may cancel your subscription at any time, with cancellation taking effect at the end of the current billing cycle.</p>
          `
        },
        {
          id: 'revenue-arrangements',
          title: '6.4 Additional Revenue Arrangements',
          content: `
            <p>Where applicable, Nest may earn referral fees from Lender Partners for successful credit introductions, or licensing fees from third parties accessing Financial Passport data via API, in each case only where you have provided explicit consent to such data sharing. These arrangements do not result in any additional cost to you.</p>
          `
        }
      ]
    },
    {
      id: 'acceptable-use',
      title: '7. Acceptable Use',
      content: `
        <p>You agree not to use the Services to:</p>
        <ul>
          <li>Engage in or facilitate fraud, money laundering, terrorist financing, or any other illegal financial activity;</li>
          <li>Upload false, fabricated, or manipulated transaction data or financial statements;</li>
          <li>Reverse-engineer, decompile, or attempt to extract the source code of the Services, except where permitted by law;</li>
          <li>Interfere with, disrupt, or attempt to gain unauthorised access to Nest's systems, servers, or networks;</li>
          <li>Use automated means (bots, scrapers) to access the Services without our express written permission;</li>
          <li>Resell, sublicense, or commercially exploit the Services without Nest's prior written consent;</li>
          <li>Violate any applicable local, national, or international law or regulation.</li>
        </ul>
        <p>Violation of this Section may result in immediate suspension or termination of your account, and Nest reserves the right to report suspected illegal activity to relevant authorities.</p>
      `
    },
    {
      id: 'financial-passport-terms',
      title: '8. Financial Passport: Specific Terms',
      content: `
        <p>The Financial Passport is generated algorithmically based on your historical transaction behaviour, including but not limited to revenue consistency, repayment history, business longevity, and transaction volume.</p>
        <ul>
          <li>The Financial Passport is a behavioural and informational tool. It does not constitute a credit guarantee, and Nest does not guarantee that any Lender Partner will extend credit based on your Financial Passport;</li>
          <li>Nest is not a licensed lender, bank, or deposit-taking institution, and does not itself extend credit to Users unless explicitly stated otherwise in separate terms;</li>
          <li>Lending decisions are made solely by the relevant Lender Partner, in accordance with their own underwriting criteria, and Nest bears no responsibility for such decisions;</li>
          <li>You may request a copy of the data underlying your Financial Passport, and may dispute inaccuracies through the process described in our Privacy Policy.</li>
        </ul>
      `
    },
    {
      id: 'intellectual-property',
      title: '9. Intellectual Property',
      content: `
        <p>All content, trademarks, logos, software, algorithms, and other intellectual property comprising the Services ("Nest IP") are owned by or licensed to Nest and are protected under applicable intellectual property laws. Nothing in these Terms grants you any right, title, or interest in the Nest IP, except for a limited, non-exclusive, non-transferable licence to access and use the Services for their intended purpose.</p>
        <p>You retain ownership of any data you upload to the Services ("User Data"). By uploading User Data, you grant Nest a worldwide, royalty-free licence to use, process, and analyse such data solely for the purpose of providing, improving, and securing the Services, in accordance with our Privacy Policy.</p>
      `
    },
    {
      id: 'third-party-services',
      title: '10. Third-Party Services and Integrations',
      content: `
        <p>The Services may integrate with or rely upon third-party services, including but not limited to Safaricom Daraja API, open banking providers, payment processors, and cloud infrastructure providers. Nest is not responsible for the availability, accuracy, or performance of third-party services, and your use of such integrations may be subject to the third party's own terms and privacy policies.</p>
      `
    },
    {
      id: 'disclaimers',
      title: '11. Disclaimers',
      content: `
        <p>THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR ACCURACY OF DATA OR AI-GENERATED OUTPUTS.</p>
        <p>Nest does not guarantee that the Services will be uninterrupted, error-free, or completely secure, and does not warrant the accuracy or reliability of any financial insight, forecast, or recommendation generated by Manikka or any other AI feature.</p>
        <p>Nest is not a bank, licensed financial institution, or registered investment, tax, or legal advisor. Nothing within the Services should be construed as professional financial, legal, or tax advice. You should consult qualified professionals before making financial decisions.</p>
      `
    },
    {
      id: 'limitation-liability',
      title: '12. Limitation of Liability',
      content: `
        <p>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, NEST, ITS DIRECTORS, EMPLOYEES, AGENTS, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, REVENUE, DATA, OR BUSINESS OPPORTUNITY, ARISING FROM OR RELATED TO YOUR USE OF THE SERVICES.</p>
        <p>Nest's total aggregate liability arising from or related to these Terms or the Services shall not exceed the greater of (i) the total fees paid by you to Nest in the twelve (12) months preceding the claim, or (ii) KES 1,000,000.</p>
        <p>Nothing in these Terms shall limit or exclude liability that cannot be limited or excluded under applicable law, including liability for fraud or wilful misconduct.</p>
      `
    },
    {
      id: 'indemnification',
      title: '13. Indemnification',
      content: `
        <p>You agree to indemnify, defend, and hold harmless Nest and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable legal fees, arising out of or in any way connected with: (i) your use or misuse of the Services; (ii) your violation of these Terms; (iii) your violation of any applicable law or third-party right; or (iv) any inaccurate or fraudulent data you submit to the Services.</p>
      `
    },
    {
      id: 'suspension-termination',
      title: '14. Suspension and Termination',
      content: `
        <p>Nest may suspend or terminate your access to the Services, in whole or in part, at any time, with or without notice, if we reasonably believe you have violated these Terms, engaged in fraudulent or illegal activity, or for any other reason at our sole discretion, including discontinuation of the Services.</p>
        <p>You may terminate your account at any time by following the account closure process within the application or by contacting us directly. Upon termination, your right to use the Services will immediately cease, although certain provisions of these Terms (including but not limited to intellectual property, disclaimers, limitation of liability, and indemnification) shall survive termination.</p>
      `
    },
    {
      id: 'dispute-resolution',
      title: '15. Dispute Resolution and Governing Law',
      content: `
        <p>These Terms shall be governed by and construed in accordance with the laws of the Republic of Kenya, without regard to conflict of law principles.</p>
        <p>In the event of any dispute arising out of or relating to these Terms or the Services, the parties shall first attempt to resolve the dispute through good-faith negotiation. If the dispute cannot be resolved within thirty (30) days, either party may refer the matter to mediation or arbitration in accordance with the Arbitration Act (Kenya), with the seat of arbitration in Nairobi, Kenya, and proceedings conducted in English.</p>
        <p>Nothing in this Section shall prevent either party from seeking injunctive or equitable relief in a court of competent jurisdiction where necessary to protect its rights.</p>
      `
    },
    {
      id: 'changes-terms',
      title: '16. Changes to These Terms',
      content: `
        <p>Nest reserves the right to amend or update these Terms at any time. Where changes are material, we will provide reasonable advance notice via email, in-app notification, or by posting the updated Terms with a revised "Last updated" date. Your continued use of the Services after such changes take effect constitutes your acceptance of the revised Terms.</p>
      `
    },
    {
      id: 'severability',
      title: '17. Severability and Entire Agreement',
      content: `
        <p>If any provision of these Terms is found to be unenforceable or invalid under applicable law, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall continue in full force and effect.</p>
        <p>These Terms, together with the Privacy Policy and any other agreements expressly incorporated by reference, constitute the entire agreement between you and Nest regarding the Services, and supersede any prior agreements or understandings.</p>
      `
    },
    {
      id: 'contact',
      title: '18. Contact Information',
      content: `
        <p>If you have any questions, concerns, or complaints regarding these Terms, please contact us at:</p>
        <ul>
          <li><strong>Email (General):</strong> support@nestfinance.xyz</li>
          <li><strong>Email (Lenders & Partners):</strong> Nest.businesses@proton.me</li>
        </ul>
      `
    }
  ]

  return (
    <LegalDocument
      title="Terms of Service"
      lastUpdated="June 30, 2026"
      sections={sections}
    />
  )
}
