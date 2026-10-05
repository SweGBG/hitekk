// HiTekks emblem — hörlurar runt en kretskortsglob — återskapat som SVG.
// Klasserna em-* animeras i hjälten (ledningar ritas, strömpulser, ljudvågor).
// I nav/footer står det still.

const TRACES = [
  "M74 120 H96 L104 112 H112",
  "M68 140 H92 L100 148 H106",
  "M76 162 H96 L104 170 V184",
  "M92 94 V106 L100 114 H106",
  "M120 80 V110",
  "M142 90 V102 L136 108",
  "M168 118 H152 L144 126 H138",
  "M172 142 H152",
  "M164 166 H148 L140 158 H132",
  "M120 202 V186 L128 178 V166",
  "M100 194 V170",
  "M146 192 V178 L140 172",
];
const OUT = [
  "M140 82 V40",
  "M148 86 V60 L158 50 H168",
  "M158 92 V70 L172 56 H186",
  "M168 102 V84 L182 70 H198",
  "M176 116 H192 L206 102",
];
// Slutpunkten på en bana (för lödpunkten)
const end = (d: string) => {
  let x = 0, y = 0;
  for (const m of d.matchAll(/([MLHV])\s*([\d.]+)(?:\s+([\d.]+))?/g)) {
    const [, c, a, b] = m;
    if (c === "M" || c === "L") { x = +a; y = +b; } else if (c === "H") x = +a; else y = +a;
  }
  return [x, y];
};

export default function Emblem({ id = "em", className = "", animated = false }: { id?: string; className?: string; animated?: boolean }) {
  return (
    <svg viewBox="0 0 240 240" className={`emblem ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-chrome`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#eaf4ff" />
          <stop offset=".3" stopColor="#9cc8ff" />
          <stop offset=".58" stopColor="#3d8bff" />
          <stop offset=".85" stopColor="#1e5fd8" />
          <stop offset="1" stopColor="#143fa0" />
        </linearGradient>
        <linearGradient id={`${id}-cup`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5fb4ff" />
          <stop offset=".5" stopColor="#2e6fe0" />
          <stop offset="1" stopColor="#143fa0" />
        </linearGradient>
        <radialGradient id={`${id}-globe`} cx=".4" cy=".35" r=".7">
          <stop offset="0" stopColor="#173a7a" />
          <stop offset="1" stopColor="#081633" />
        </radialGradient>
        <clipPath id={`${id}-clip`}><circle cx="120" cy="140" r="60" /></clipPath>
      </defs>

      {/* bygel */}
      <path className="em-band" d="M44 156 V138 A76 76 0 0 1 196 138 V156" fill="none" stroke={`url(#${id}-chrome)`} strokeWidth="11" strokeLinecap="round" pathLength="1" />

      {/* glob */}
      <circle cx="120" cy="140" r="60" fill={`url(#${id}-globe)`} />
      <g clipPath={`url(#${id}-clip)`} className="em-traces">
        {TRACES.map((d, i) => (
          <path key={i} d={d} className="em-tr" pathLength="1" style={{ ["--i" as string]: i }} />
        ))}
        {animated && TRACES.map((d, i) => (
          <path key={`p${i}`} d={d} className="em-pulse" pathLength="1" style={{ ["--i" as string]: i }} />
        ))}
        {TRACES.map((d, i) => { const [x, y] = end(d); return <circle key={`d${i}`} cx={x} cy={y} r="2.6" className="em-pad" />; })}
      </g>
      <circle cx="120" cy="140" r="60" fill="none" stroke={`url(#${id}-chrome)`} strokeWidth="5" className="em-ring" />

      {/* chip */}
      <g className="em-chips">
        <rect x="108" y="116" width="24" height="24" rx="3" className="em-chip big" />
        {[0, 1, 2].map((k) => (
          <g key={k}>
            <path d={`M${112 + k * 8} 116 v-5 M${112 + k * 8} 140 v5 M108 ${120 + k * 8} h-5 M132 ${120 + k * 8} h5`} className="em-pin" />
          </g>
        ))}
        <rect x="114" y="122" width="12" height="12" rx="1.5" className="em-core" />
        <rect x="140" y="132" width="14" height="14" rx="2" className="em-chip" />
        <rect x="104" y="150" width="12" height="16" rx="2" className="em-chip" />
      </g>

      {/* ledningar ut ur globen */}
      <g className="em-out">
        {OUT.map((d, i) => (
          <path key={i} d={d} className="em-tr out" pathLength="1" style={{ ["--i" as string]: i + 4 }} />
        ))}
        {animated && OUT.map((d, i) => (
          <path key={`p${i}`} d={d} className="em-pulse out" pathLength="1" style={{ ["--i" as string]: i + 2 }} />
        ))}
        {OUT.map((d, i) => { const [x, y] = end(d); return <circle key={`o${i}`} cx={x} cy={y} r="3.4" className="em-pad out" />; })}
      </g>

      {/* kåpor */}
      <rect x="26" y="134" width="30" height="60" rx="13" fill={`url(#${id}-cup)`} stroke="#0b1d44" strokeWidth="2" className="em-cup l" />
      <rect x="184" y="134" width="30" height="60" rx="13" fill={`url(#${id}-cup)`} stroke="#0b1d44" strokeWidth="2" className="em-cup r" />
      <rect x="32" y="142" width="6" height="44" rx="3" fill="#b9dcff" opacity=".35" />
      <rect x="190" y="142" width="6" height="44" rx="3" fill="#b9dcff" opacity=".35" />
    </svg>
  );
}
