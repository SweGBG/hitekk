"use client";
import { useLang } from "@/lib/LangContext";

const ICONS = [
  <path key="a" d="M2 6h11v10H2zM13 9h4l4 4v3h-8M6 19a2 2 0 1 0 0-.01M17 19a2 2 0 1 0 0-.01" />,
  <path key="b" d="M4 12a8 8 0 1 0 2.3-5.6M4 4v4h4" />,
  <path key="c" d="M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4M12 15v2" />,
  <path key="d" d="M4 13v-1a8 8 0 0 1 16 0v1M4 13h3v5H5a1 1 0 0 1-1-1zM20 13h-3v5h2a1 1 0 0 0 1-1zM17 18c0 2-2 3-5 3" />,
];

export default function About() {
  const { tr } = useLang();
  const a = tr.about;
  return (
    <section className="about" id="om-oss">
      <div className="wrap about-in">
        <div className="about-media" data-reveal>
          <div className="about-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=900&q=80&fit=crop&crop=center" alt="Apple-produkter med kartonger" loading="lazy" />
            <span className="corner tl" /><span className="corner tr" /><span className="corner bl" /><span className="corner br" />
          </div>
          <div className="about-badge">
            <b>2019</b>
            <span>{a.badgeSub}</span>
          </div>
          <svg className="about-trace" viewBox="0 0 200 120" aria-hidden="true">
            <path d="M0 100 H60 L80 80 H130 L150 60 H200" pathLength="1" />
            <circle cx="200" cy="60" r="4" />
          </svg>
        </div>

        <div className="about-copy" data-reveal>
          <p className="eyebrow">{a.eyebrow}</p>
          <h2 className="sec-title">{a.title1}<br /><span className="grad">{a.title2}</span></h2>
          <p>{a.body1}</p>
          <p>{a.body2}</p>
          <ul className="pills">
            {a.pills.map((x) => (
              <li key={x}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>{x}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="wrap">
        <ul className="perks">
          {a.perks.map((x, i) => (
            <li key={x.label} data-reveal style={{ ["--i" as string]: i }}>
              <svg viewBox="0 0 24 24" aria-hidden="true">{ICONS[i]}</svg>
              <strong>{x.label}</strong>
              <p>{x.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
