import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";
import { ORDERS_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Returns & Refunds · RAAH | BAL",
  description: "How to return or exchange a RAAH | BAL order, and how refunds are processed.",
};

export default function RefundPolicyPage() {
  return (
    <PolicyPage
      eyebrow="POLICIES"
      title="Returns & Refunds"
      updated="3 September 2026"
      sections={[
        {
          heading: "1. Return window",
          body: (
            <p>
              You can return an unworn, unwashed piece with tags attached within 7 days of delivery.
              Matter 12 and other clearly marked limited pieces are final sale, unless the item
              arrives damaged or incorrect.
            </p>
          ),
        },
        {
          heading: "2. How to start a return",
          body: (
            <p>
              Email{" "}
              <a href={`mailto:${ORDERS_EMAIL}`} data-hover className="link-draw text-ink">
                {ORDERS_EMAIL}
              </a>{" "}
              with your order number and reason for return. We&apos;ll confirm eligibility and arrange a
              pickup or share the return address.
            </p>
          ),
        },
        {
          heading: "3. Exchanges",
          body: (
            <p>
              Need a different size? Let us know when you request the return. We&apos;ll hold the size
              you need for up to 5 days while the original piece is on its way back to us.
            </p>
          ),
        },
        {
          heading: "4. Refunds",
          body: (
            <p>
              Once we receive and inspect the returned piece, refunds are issued to the original payment
              method within 5–7 working days. Shipping charges on the original order are non-refundable
              unless the return is due to our error.
            </p>
          ),
        },
        {
          heading: "5. Damaged or incorrect items",
          body: (
            <p>
              If something arrives damaged, defective or not what you ordered, tell us within 48 hours of
              delivery with a photo. We&apos;ll replace it or refund it in full, no return shipping cost
              to you.
            </p>
          ),
        },
        {
          heading: "6. Non-returnable items",
          body: <p>For hygiene reasons, innerwear and any items marked &quot;final sale&quot; cannot be returned.</p>,
        },
      ]}
    />
  );
}
