"use client";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/LangContext";
import { useShop } from "@/lib/ShopContext";

// Sekunder kvar till söndag 23:59:59 i svensk tid
function secondsLeft() {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Stockholm", weekday: "short", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).formatToParts(new Date());
  const g = (t: string) => parts.find((p) => p.type === t)?.value ?? "0";
  const day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(g("weekday"));
  const sec = (Number(g("hour")) % 24) * 3600 + Number(g("minute")) * 60 + Number(g("second"));
  return (6 - day) * 86400 + (86400 - sec);
}

const RAYS = 48;

export default function Promo() {
  const { tr } = useLang();
  const p = tr.promo;
  const { setCat } = useShop();
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setLeft(secondsLeft());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const parts = left === null ? null : [Math.floor(left / 86400), Math.floor((left % 86400) / 3600), Math.floor((left % 3600) / 60), left % 60];

  return (
    <section className="promo" data-anim>
      <div className="wrap promo-in">
        <div className="promo-copy" data-reveal>
          <p className="eyebrow">{p.eyebrow}</p>
          <h2 className="promo-title">
            <span>{p.title1}</span>
            <span className="big" data-text={p.title2}>{p.title2}</span>
            <span>{p.title3}</span>
          </h2>
          <p className="promo-sub">{p.sub}</p>
          <div className="countdown" aria-live="off">
            <span className="cd-label">{p.ends}</span>
            <div className="cd">
              {p.units.map((u, i) => (
                <div key={u} className="cd-cell">
                  <b key={parts ? parts[i] : "x"}>{parts ? String(parts[i]).padStart(2, "0") : "--"}</b>
                  <small>{u}</small>
                </div>
              ))}
            </div>
          </div>
          <a href="#produkter" className="btn btn-primary" onClick={() => setCat(1)}>
            {p.btn}
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </a>
        </div>

        <div className="promo-visual" data-reveal>
          <div className="viz" aria-hidden="true">
            {Array.from({ length: RAYS }, (_, i) => (
              <i key={i} style={{ ["--a" as string]: `${(i * 360) / RAYS}deg`, ["--d" as string]: `${(0.6 + ((i * 37) % 11) / 10).toFixed(1)}s`, ["--del" as string]: `${(-((i * 53) % 17) / 10).toFixed(1)}s` }} />
            ))}
          </div>
          <div className="promo-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1484704849700-f032a568e944?w=900&q=80&fit=crop&crop=center" alt="" />
          </div>
          <div className="promo-badge"><b>−50%</b><span>{p.discount}</span></div>
        </div>
      </div>
    </section>
  );
}
