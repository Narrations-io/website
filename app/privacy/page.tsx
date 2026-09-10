import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Privacy Policy, Narrations",
  description: "Narrations privacy policy.",
};

const SECTIONS = [
  {
    heading: "1. Scope of This Policy",
    body: [
      `This Privacy Policy applies to information we collect through the Services, principally through the contact form, the demo request form, and the newsletter signup, and through your general interaction with the website. It does not apply to any third-party website, product, or service that we do not control, even where linked from or integrated with the Services.`,
    ],
  },
  {
    heading: "2. Information We Collect",
    body: [
      `2.1 Information you provide. When you use a form on the Services, we collect the information you choose to submit. Depending on the form, this may include your name, your email address, your company or organisation, and the content of any message, enquiry, or request you send.`,
      `2.2 Information collected automatically. When you visit the Services, certain limited technical information may be collected automatically by our hosting infrastructure and any technical tools we use, such as your internet protocol (IP) address, browser type, device information, and access times. This information is used for the operation, security, and maintenance of the Services.`,
      `2.3 No special category data required. We do not ask you to submit, and you should not submit, any sensitive or special category information through the Services. If you choose to include such information in a free-text message, you do so at your own risk and on the basis set out in this Policy.`,
    ],
  },
  {
    heading: "3. How We Use Information",
    body: [
      `We use the information we collect to: respond to your enquiries and requests; arrange and provide demonstrations of the Services; send you newsletters, product updates, and marketing communications where you have signed up or where otherwise permitted; operate, maintain, secure, and improve the Services; and comply with applicable legal and regulatory obligations.`,
      `Where you have signed up to receive communications from us, you may opt out at any time by contacting contact@narrations.io. We will action legitimate opt-out requests within a reasonable period of time as determined by us.`,
    ],
  },
  {
    heading: "4. Territorial Scope and Intended Users",
    body: [
      `The Services are directed to and intended for businesses and professional users located outside the United Arab Emirates, consistent with the permitted scope of business of Narrations LLC as a free zone entity under the laws of the Emirate of Sharjah and the applicable free zone regulations. Narrations does not target or market the Services to clients based within the United Arab Emirates mainland except as expressly permitted under its free zone licence and applicable UAE law.`,
      `If you access the Services or submit information to us, you do so on your own initiative and are responsible for compliance with the laws of your own jurisdiction. You are responsible for ensuring that your submission of information to an entity based in the United Arab Emirates is lawful in your jurisdiction.`,
    ],
  },
  {
    heading: "5. Legal Bases for Processing",
    body: [
      `Where and to the extent that applicable data protection law requires a legal basis for processing, we rely on one or more of the following: your consent; the performance of a contract or steps taken at your request prior to entering into a contract; our legitimate interests in operating and promoting our business, provided these are not overridden by your rights; and compliance with a legal obligation.`,
    ],
  },
  {
    heading: "6. Third-Party Processors and Disclosure",
    body: [
      `We use third-party service providers to operate the Services. These may include, without limitation, a hosting provider, a database or workspace tool used to store form submissions, an email or communications tool, and technical or analytics tools. These providers process information on our behalf or as independent controllers under their own terms and policies.`,
      `We do not sell your personal information. We may disclose information: to our third-party processors as described above; where required by law, regulation, court order, or governmental or regulatory authority; to protect the rights, property, or safety of Narrations, our users, or others; and in connection with any merger, acquisition, financing, or sale of assets.`,
      `Where information is handled by a third-party processor, that processing is subject to the processor's own security measures and policies. To the maximum extent permitted by applicable law, Narrations is not responsible for the acts, omissions, security practices, or breaches of any third-party processor.`,
    ],
  },
  {
    heading: "7. International Transfers",
    body: [
      `Narrations is based in the United Arab Emirates. By using the Services and submitting information to us, you acknowledge and agree that your information may be transferred to, stored in, and processed in the United Arab Emirates and in other jurisdictions where we or our processors operate, which may have data protection laws that differ from, and may be less protective than, those of your own jurisdiction. You consent to such transfer, storage, and processing.`,
    ],
  },
  {
    heading: "8. Data Retention and Security",
    body: [
      `We retain information for as long as necessary to fulfil the purposes described in this Policy, to comply with our legal obligations, to resolve disputes, and to enforce our agreements, after which we will delete or anonymise it.`,
      `We apply reasonable technical and organisational measures intended to protect information. However, no method of transmission over the internet and no method of electronic storage is completely secure. See Section 9.`,
    ],
  },
  {
    heading: "9. Data Security, Risk, and Breach",
    body: [
      `9.1 Submission at your own risk. You acknowledge that the transmission of information over the internet is inherently insecure, and that you submit information to the Services entirely at your own risk. We cannot and do not guarantee the absolute security of any information.`,
      `9.2 Limitation regarding breaches. To the maximum extent permitted by applicable law, Narrations, together with its owners, directors, officers, employees, operators, agents, and affiliates, shall not be liable for any loss, damage, cost, or harm of any kind arising out of or in connection with any unauthorised access to, interception of, loss of, corruption of, or disclosure of any information, including as a result of any security incident, breach, cyberattack, or failure affecting Narrations or any of its third-party processors. You expressly assume the risk of any such event to the fullest extent permitted by law.`,
      `9.3 Non-excludable obligations. The provisions of this Section apply only to the extent permitted by applicable law. Nothing in this Section purports to exclude any liability or obligation that cannot lawfully be excluded, including any mandatory breach-notification or other obligation under applicable data protection law. Where a mandatory obligation applies, we will comply with it to the extent required by that law, and the remaining provisions of this Section continue to apply to the maximum extent permitted.`,
    ],
  },
  {
    heading: "10. Cookies and Tracking",
    body: [
      `The Services may use cookies or similar technologies for the operation, security, and performance of the website, and, where deployed, for analytics. Where required by applicable law, we will seek your consent for non-essential cookies. You can control cookies through your browser settings. Disabling cookies may affect the functionality of the Services.`,
    ],
  },
  {
    heading: "11. Notice to Individuals in the European Economic Area and United Kingdom (GDPR)",
    body: [
      `This Section applies to individuals located in the European Economic Area ("EEA") or the United Kingdom to the extent the General Data Protection Regulation or the UK GDPR applies to our processing of their personal data.`,
      `11.1 The Services are not directed at the EEA or UK. The Services are directed to business users outside the United Arab Emirates and are not specifically targeted at, or intended for, individuals in the EEA or the United Kingdom. Narrations does not intentionally offer goods or services to, or monitor the behaviour of, individuals in the EEA or the United Kingdom. If you are located in the EEA or the United Kingdom and you nonetheless choose to access the Services or submit personal data to us, you do so on your own initiative, at your own risk, and on the basis that you have chosen to engage with an entity established in the United Arab Emirates.`,
      `11.2 Your rights where the GDPR applies. Where the GDPR or UK GDPR applies, you may have the right to request access to, rectification of, or erasure of your personal data; to restrict or object to processing; to data portability; and to withdraw consent. You may exercise these rights by contacting contact@narrations.io. We will assess and respond to valid requests within the period required by applicable law, or otherwise within a reasonable period as determined by us.`,
      `11.3 Limitation of liability. To the maximum extent permitted by applicable law, and without limiting any right that cannot lawfully be limited, you agree that Narrations's liability to you in respect of any processing of your personal data is limited to the fullest extent the law allows, and that where you have chosen to submit personal data to an entity outside the EEA and the United Kingdom, you accept the risks inherent in that choice. Nothing in this Section removes any right or remedy that applicable mandatory law confers on you and that cannot be waived; to that extent, and only to that extent, this limitation does not apply.`,
      `11.4 Supervisory authority. Where the GDPR or UK GDPR applies to you, you may have the right to lodge a complaint with your local supervisory authority.`,
    ],
  },
  {
    heading: "12. Notice to California Residents (CCPA / CPRA)",
    body: [
      `This Section applies to residents of the State of California to the extent the California Consumer Privacy Act, as amended by the California Privacy Rights Act ("CCPA/CPRA"), applies.`,
      `12.1 Categories. In the twelve months preceding the effective date of this Policy, the categories of personal information we may collect are identifiers (such as name and email address) and internet or network activity information, as described in Section 2.`,
      `12.2 No sale or sharing. We do not sell, and do not share for cross-context behavioural advertising, the personal information of California residents.`,
      `12.3 Your rights. Subject to the CCPA/CPRA and its exceptions, California residents may have the right to know what personal information we collect, to request deletion or correction of their personal information, and not to be discriminated against for exercising their rights. You may exercise these rights by contacting contact@narrations.io. We may need to verify your identity before responding.`,
      `12.4 Limitation. To the maximum extent permitted by applicable law, our liability in respect of the personal information of California residents is limited to the fullest extent the law allows. Nothing in this Section removes any non-waivable right conferred by the CCPA/CPRA.`,
    ],
  },
  {
    heading: "13. Logos, Trademarks, and Third-Party Marks",
    body: [
      `Any third-party names, logos, trademarks, or brand features that appear on the Services are used solely for identification and reference. They indicate companies with which the founders of Narrations have worked in a personal and professional capacity, and companies that have been clients of Narrations, and their display does not imply any current partnership, sponsorship, endorsement, affiliation, or approval by the owners of those marks.`,
      `Such marks are the property of their respective owners. They are not necessarily official, current, exact, or authorised reproductions, and may not conform to the brand guidelines of their respective owners. Narrations claims no ownership of any such marks. If you own such a mark, or represent its owner, and wish to have it removed, corrected, or amended, please contact contact@narrations.io. We will review any valid request in good faith and act on it within a reasonable period of time as determined by us. This accommodation is made in good faith and does not constitute any admission of liability or infringement. The full trademark provisions are set out in Section 9 of our Terms of Service, which is incorporated here by reference.`,
    ],
  },
  {
    heading: "14. Removal and Correction of Content",
    body: [
      `Beyond trademarks and logos, if you believe that any content on the Services relates to you, infringes your rights, or is inaccurate, and you wish to have it removed, corrected, or amended, you may contact us at contact@narrations.io with details of your request. We will review each valid request in good faith and, where we consider it appropriate, act on it within a reasonable period of time as determined by us. Reviewing or acting on a request does not constitute any admission of liability or wrongdoing by Narrations.`,
    ],
  },
  {
    heading: "15. Children",
    body: [
      `The Services are intended for business and professional users and are not directed to children. We do not knowingly collect personal information from children. If you believe a child has provided us with information, contact contact@narrations.io and we will take reasonable steps to delete it.`,
    ],
  },
  {
    heading: "16. Changes to This Policy",
    body: [
      `We may amend, modify, or update this Privacy Policy at any time and at our sole discretion, without prior individual notice. Changes take effect upon posting to the Services. Your continued use of the Services after any change constitutes acceptance of the amended Policy. You may request the current version, or clarification of any provision, by contacting contact@narrations.io, and we will respond within a reasonable period of time as determined by us.`,
    ],
  },
  {
    heading: "17. Governing Law",
    body: [
      `This Privacy Policy is governed by the applicable free zone regulations of the Emirate of Sharjah and, to the extent applicable, the federal laws of the United Arab Emirates. Any dispute arising out of or in connection with it is subject to the exclusive jurisdiction of the competent courts and dispute-resolution bodies of the applicable free zone and the Emirate of Sharjah, United Arab Emirates. The provisions of Sections 11 and 12 apply only to the extent the relevant foreign law mandatorily applies to you.`,
    ],
  },
  {
    heading: "18. Contact",
    body: [
      `For any question about this Privacy Policy, to exercise any right, or to make any removal, correction, or opt-out request, contact:`,
      `Narrations LLC\nEmail: contact@narrations.io\nWebsite: narrations.io`,
      `We will respond to legitimate requests within a reasonable period of time as determined by us.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-dbg">
      <SiteNav />
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mx-auto max-w-2xl py-24 md:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            Legal
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-white/50">Narrations LLC</p>
          <p className="mt-1 text-sm text-white/50">
            Effective date: 1 January 2025 &middot; Last updated: 1 January 2025
          </p>

          <p className="mt-8 text-base leading-7 text-white/70">
            This Privacy Policy explains how Narrations LLC, a limited liability company
            registered as a free zone entity in the Emirate of Sharjah, United Arab Emirates
            (&ldquo;Narrations&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or
            &ldquo;our&rdquo;), collects, uses, discloses, and handles information in connection
            with the website at narrations.io and the services made available through it (the
            &ldquo;Services&rdquo;).
          </p>
          <p className="mt-4 text-base leading-7 text-white/70">
            By accessing or using the Services, or by submitting any information to us, you
            acknowledge that you have read and understood this Privacy Policy and agree to it.
            If you do not agree, you must not use the Services or submit any information to us.
            This Privacy Policy forms part of, and should be read together with, our{" "}
            <a href="/terms" className="text-green-400 underline underline-offset-2 hover:text-green-300">
              Terms of Service
            </a>
            .
          </p>

          <div className="mt-16 space-y-14">
            {SECTIONS.map((section) => (
              <section
                key={section.heading}
                className="border-t border-d-border pt-10 first:border-t-0 first:pt-0"
              >
                <h2 className="text-xl font-semibold tracking-tight text-white">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.body.map((paragraph, i) => (
                    <p
                      key={i}
                      className="whitespace-pre-line text-[15px] leading-7 text-white/65"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
