import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";
import { ORDERS_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Shipping Policy — RAAH | BAL",
  description: "Dispatch times, delivery windows and shipping rates for RAAH | BAL orders.",
};

export default function ShippingPolicyPage() {
  return (
    <PolicyPage
      eyebrow="POLICIES"
      title="Shipping Policy"
      updated="3 September 2026"
      sections={[
        {
          heading: "1. Dispatch time",
          body: (
            <p>
              Orders are packed and handed to our courier partner within 1–3 working days of confirmation.
              Matter 12 pre-orders ship in the window stated on the product page.
            </p>
          ),
        },
        {
          heading: "2. Delivery windows",
          body: (
            <>
              <p>Metro cities: 3–5 working days after dispatch.</p>
              <p>Rest of India: 5–7 working days after dispatch.</p>
              <p>
                International shipping isn&apos;t available yet — it&apos;s on the list for a future drop.
              </p>
            </>
          ),
        },
        {
          heading: "3. Shipping rates",
          body: (
            <p>
              Standard shipping is free on prepaid orders above ₹2,999; a flat rate applies below that
              threshold and is shown at checkout before you pay.
            </p>
          ),
        },
        {
          heading: "4. Tracking",
          body: (
            <p>
              You&apos;ll get a tracking link by email and SMS as soon as your order is handed to the
              courier. Signed-in accounts can also see order status under{" "}
              <a href="/account" data-hover className="link-draw text-ink">
                Account
              </a>
              .
            </p>
          ),
        },
        {
          heading: "5. Delays",
          body: (
            <p>
              Weather, regional restrictions and courier volume can occasionally push delivery beyond the
              windows above. If your order is significantly delayed, write to{" "}
              <a href={`mailto:${ORDERS_EMAIL}`} data-hover className="link-draw text-ink">
                {ORDERS_EMAIL}
              </a>{" "}
              with your order number and we&apos;ll chase it down.
            </p>
          ),
        },
        {
          heading: "6. Address accuracy",
          body: (
            <p>
              Please double-check your shipping address at checkout — we can amend it before dispatch, but
              can&apos;t guarantee changes once a package is with the courier.
            </p>
          ),
        },
      ]}
    />
  );
}
