type MarqueeProps = {
  items: string[];
  className?: string;
};

export default function Marquee({ items, className }: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div className={`marquee ${className ?? ""}`}>
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span className="marquee-item" key={i}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
