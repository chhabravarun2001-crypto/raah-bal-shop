type LogoProps = {
  variant?: "ink" | "paper";
  className?: string;
};

export default function Logo({ variant = "ink", className }: LogoProps) {
  return (
    <span
      className={`font-display inline-flex items-baseline gap-1.5 uppercase leading-none tracking-tight ${
        variant === "paper" ? "text-paper" : "text-ink"
      } ${className ?? ""}`}
    >
      <span>RAAH</span>
      <span className="text-ember">|</span>
      <span>BAL</span>
    </span>
  );
}
