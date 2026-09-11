import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";
import { PRIVACY_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy · RAAH | BAL",
  description: "How RAAH | BAL collects, uses and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage
      eyebrow="POLICIES"
      title="Privacy Policy"
      updated="3 September 2026"
      sections={[
        {
          heading: "1. Who we are",
          body: (
            <p>
              This policy covers this website and the RAAH | BAL storefront (together, &quot;RAAH | BAL&quot;,
              &quot;we&quot;, &quot;us&quot;). It explains what personal information we collect when you
              browse, create an account or place an order, and how we use, store and protect it.
            </p>
          ),
        },
        {
          heading: "2. What we collect",
          body: (
            <>
              <p>
                Account information: your name, email address and profile photo, when you sign in with
                Google.
              </p>
              <p>
                Order information: shipping address, phone number, items purchased and payment
                confirmation. Payment card details themselves are collected and processed directly by
                Shopify&apos;s payment processor, never by us.
              </p>
              <p>
                Usage information: pages visited, device and browser type, and general location, collected
                automatically to keep the site working and secure.
              </p>
            </>
          ),
        },
        {
          heading: "3. How we use it",
          body: (
            <p>
              To process and ship orders, respond to support requests, secure your account, and, only
              with your consent (e.g. the newsletter form), tell you about future drops. We do not sell
              your personal information to third parties.
            </p>
          ),
        },
        {
          heading: "4. Who we share it with",
          body: (
            <p>
              Shopify (order processing, payments, fulfilment), Google (sign-in), and courier partners
              (delivery), each bound by their own privacy and security obligations. We share only what
              each of them needs to do their job.
            </p>
          ),
        },
        {
          heading: "5. Cookies",
          body: (
            <p>
              We use essential cookies to keep your cart and session working, and optional analytics
              cookies to understand how the site is used. You can manage non-essential cookies from the
              banner shown on your first visit.
            </p>
          ),
        },
        {
          heading: "6. Your rights",
          body: (
            <p>
              You can ask us to access, correct or delete your personal data at any time by writing to{" "}
              <a href={`mailto:${PRIVACY_EMAIL}`} data-hover className="link-draw text-ink">
                {PRIVACY_EMAIL}
              </a>
              . We&apos;ll respond within 30 days.
            </p>
          ),
        },
        {
          heading: "7. Changes to this policy",
          body: (
            <p>
              We may update this policy as the business grows. Material changes will be reflected on this
              page with a new &quot;last updated&quot; date.
            </p>
          ),
        },
      ]}
    />
  );
}
