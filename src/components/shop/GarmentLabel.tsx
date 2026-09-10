import type { GarmentCode } from "@/lib/shopify";

/** A fashion-tech spec line — OBJ / weight / cut / drop / season — styled
 * like a garment care tag rather than ecommerce metadata. */
export default function GarmentLabel({ code, fabric }: { code: GarmentCode; fabric: string }) {
  const gsmMatch = fabric.match(/(\d+)\s*GSM/i);
  const gsm = gsmMatch ? `${gsmMatch[1]} GSM` : null;

  if (!code.obj) return null;

  return (
    <div className="flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-ink/40">
      <span>{code.obj}</span>
      {gsm && <span>{gsm}</span>}
      <span>{code.cut}</span>
      <span>{code.drop}</span>
      <span>{code.season}</span>
    </div>
  );
}
