"use client";
import { useLang } from "@/lib/LangContext";
import { useShop } from "@/lib/ShopContext";
import { products, fmt } from "@/lib/products";
import { rng } from "@/lib/rng";
import Emblem from "./Emblem";
import CountUp from "./CountUp";

// Seedat (samma på server och klient): equalizer-staplar + gnistrande stjärnor
const r1 = rng(2019);
const BARS = Array.from({ length: 28 }, () => ({ d: (0.7 + r1() * 0.9).toFixed(2), h: (0.25 + r1() * 0.75).toFixed(2), del: (-r1() * 2).toFixed(2) }));
const r2 = rng(5);
const STARS = Array.from({ length: 7 }, () => ({ x: (8 + r2() * 84).toFixed(1), y: (6 + r2() * 70).toFixed(1), s: (8 + r2() * 10).toFixed(0), del: (r2() * 4).toFixed(2) }));

export default function Hero() {
  const { tr } = useLang();
  const h = tr.hero;
  const { add } = useShop();
  const sony = products[0];

  return (
    <section className="hero" id="top" data-anim>
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid" />
        <div className="orb orb-a" />
        <div className="orb orb-b" />
      </div>

      <div className="wrap hero-in">
        <div className="hero-copy">
          <p className="pill"><span className="pill-dot" />{h.pill}</p>
          <h1 className="hero-title">
            <span className="t1" aria-label={h.title1}>
              {h.title1.split(" ").map((w, wi, arr) => {
                const start = arr.slice(0, wi).join(" ").length + (wi ? 1 : 0);
                return (
                  <span key={wi} className="word" aria-hidden="true">
                    {[...w].map((c, ci) => (
                      <span key={ci} className="ch" style={{ ["--i" as string]: start + ci }}>{c}</span>
                    ))}
                    {wi < arr.length - 1 && " "}
                  </span>
                );
              })}
            </span>
            <span className="t2" data-text={h.title2}>{h.title2}</span>
          </h1>
          <p className="hero-sub">{h.sub}</p>
          <div className="hero-actions">
            <a href="#produkter" className="btn btn-primary">
              {h.btn1}
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
            <a href="#om-oss" className="btn btn-ghost">{h.btn2}</a>
          </div>
          <dl className="hero-stats">
            {h.stats.map(([num, suf, label]) => (
              <div key={label}>
                <dt>{num.includes(".") ? <span className="count">{num}</span> : <CountUp to={Number(num)} suffix={suf} />}{num.includes(".") && <span className="star">★</span>}</dt>
                <dd>{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero-stage">
          <div className="stage-rings" aria-hidden="true"><i /><i /><i /></div>
          {STARS.map((s, i) => (
            <span key={i} className="spark" aria-hidden="true" style={{ left: `${s.x}%`, top: `${s.y}%`, width: `${s.s}px`, height: `${s.s}px`, ["--del" as string]: `${s.del}s` }} />
          ))}
          <div className="waves l" aria-hidden="true"><i /><i /><i /></div>
          <div className="waves r" aria-hidden="true"><i /><i /><i /></div>
          <Emblem id="hero" className="hero-em" animated />
          <div className="eq" aria-hidden="true">
            {BARS.map((b, i) => (
              <i key={i} style={{ ["--d" as string]: `${b.d}s`, ["--h" as string]: b.h, ["--del" as string]: `${b.del}s` }} />
            ))}
          </div>

          <div className="deal-card">
            <span className="deal-tag">{h.dealTag}</span>
            <div className="deal-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={sony.img} alt={sony.name} />
            </div>
            <div className="deal-body">
              <small>{h.productCat}</small>
              <strong>{sony.name}</strong>
              <span className="deal-spec">{h.productSpec}</span>
              <div className="deal-row">
                <span className="deal-price">{fmt(sony.price)} <s>{fmt(sony.oldPrice)}</s></span>
                <button className="deal-add" onClick={() => add(sony.id)} aria-label={h.addBtn}>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ul className="trust wrap">
        {h.trust.map((x, i) => (
          <li key={x} style={{ ["--i" as string]: i }}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>{x}
          </li>
        ))}
      </ul>

      <a href="#kategorier" className="scroll-hint" aria-label={h.scroll}><span>{h.scroll}</span><i /></a>
    </section>
  );
}
