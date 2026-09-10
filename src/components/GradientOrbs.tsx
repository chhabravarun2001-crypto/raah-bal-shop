type Orb = {
  color: string;
  size: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  opacity?: number;
};

type GradientOrbsProps = {
  orbs: Orb[];
  className?: string;
};

export default function GradientOrbs({ orbs, className }: GradientOrbsProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`} aria-hidden>
      {orbs.map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            bottom: orb.bottom,
            left: orb.left,
            right: orb.right,
            background: orb.color,
            opacity: orb.opacity ?? 0.35,
          }}
        />
      ))}
    </div>
  );
}
