import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";
import { SUPPORT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service — RAAH | BAL",
  description: "The terms that govern your use of the RAAH | BAL storefront and your orders.",
};

export default function TermsOfServicePage() {
  return (
    <PolicyPage
      eyebrow="POLICIES"
      title="Terms of Service"
      updated="3 September 2026"
      sections={[
        {
          heading: "1. Agreement",
          body: (
            <p>
              By using this site or placing an order with RAAH | BAL, you agree to these terms. If you
              don&apos;t agree with them, please don&apos;t use the site.
            </p>
          ),
        },
        {
          heading: "2. Orders and pricing",
          body: (
            <p>
              All prices are listed in Indian Rupees (INR) and include GST unless stated otherwise. We
              reserve the right to refuse or cancel an order — for example if a piece is mispriced, out of
              stock, or flagged for suspected fraud — and will refund any amount already charged.
            </p>
          ),
        },
        {
          heading: "3. Payment and checkout",
          body: (
            <p>
              Checkout and payment are handled by Shopify&apos;s secure, PCI-compliant checkout. RAAH | BAL
              never sees or stores your full card details.
            </p>
          ),
        },
        {
          heading: "4. Product information",
          body: (
            <p>
              We try to keep sizing, fabric and colour details accurate, but slight variation is normal —
              screens render colour differently and each piece is cut by hand. Refer to the size guide on
              each product page before ordering.
            </p>
          ),
        },
        {
          heading: "5. Intellectual property",
          body: (
            <p>
              All designs, photography, text and the RAAH | BAL mark belong to us and may not be
              reproduced, resold or used commercially without written permission.
            </p>
          ),
        },
        {
          heading: "6. Limited editions",
          body: (
            <p>
              Matter 12 and other capsule pieces are produced in limited runs and, once sold out,
              may not be restocked in the same colourway or print.
            </p>
          ),
        },
        {
          heading: "7. Liability",
          body: (
            <p>
              RAAH | BAL is not liable for delays or losses caused by events outside our reasonable
              control, including courier delays, natural events, or platform outages.
            </p>
          ),
        },
        {
          heading: "8. Contact",
          body: (
            <p>
              Questions about these terms:{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`} data-hover className="link-draw text-ink">
                {SUPPORT_EMAIL}
              </a>
              .
            </p>
          ),
        },
      ]}
    />
  );
}
