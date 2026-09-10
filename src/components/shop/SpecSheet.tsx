type SpecRow = {
  label: string;
  value: string;
  swatch?: string;
};

/**
 * An always-visible catalogue spec block — material, fit, care, colour laid
 * out like a garment tag, instead of copy buried behind an accordion.
 */
export default function SpecSheet({ rows }: { rows: SpecRow[] }) {
  return (
    <dl className="divide-y divide-ink/10 border-y border-ink/10">
      {rows.map((row) => (
        <div key={row.label} className="flex items-start justify-between gap-6 py-4">
          <dt className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40">{row.label}</dt>
          <dd className="flex items-center gap-2 text-right text-sm text-ink/75">
            {row.swatch && (
              <span
                className="inline-block h-3.5 w-3.5 shrink-0 rounded-full border border-ink/15"
                style={{ background: row.swatch }}
                aria-hidden
              />
            )}
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
