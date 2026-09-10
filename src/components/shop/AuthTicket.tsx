type AuthTicketProps = {
  code: string;
  className?: string;
};

/**
 * A hang-tag styled detail — a punched, perforated ticket instead of a plain
 * trust badge, reinforcing "earned, not given" in the vocabulary of the
 * clothes themselves rather than generic ecommerce chrome.
 */
export default function AuthTicket({ code, className }: AuthTicketProps) {
  return (
    <div className={`relative flex items-stretch border border-ink/15 ${className ?? ""}`}>
      <div className="flex flex-1 flex-col justify-between gap-4 p-4">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/40">Authenticity</p>
          <p className="mt-1 font-display text-sm uppercase">Earned, not given.</p>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/55">{code}</p>
      </div>
      <div className="relative flex w-10 shrink-0 items-center justify-center border-l border-dashed border-ink/25">
        <span className="absolute -left-[5px] -top-[5px] h-[10px] w-[10px] rounded-full bg-paper" aria-hidden />
        <span className="[writing-mode:vertical-rl] rotate-180 font-mono text-[9px] uppercase tracking-[0.3em] text-ink/35">
          RAAH | BAL
        </span>
        <span className="absolute -left-[5px] -bottom-[5px] h-[10px] w-[10px] rounded-full bg-paper" aria-hidden />
      </div>
    </div>
  );
}
