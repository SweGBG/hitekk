"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLang } from "@/lib/LangContext";
import { useShop } from "@/lib/ShopContext";
import { products, fmt } from "@/lib/products";

export default function Products() {
  const { tr } = useLang();
  const p = tr.products;
  const { cat, setCat, add, items } = useShop();
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [flash, setFlash] = useState<number | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [ind, setInd] = useState({ x: 0, w: 0 });

  const list = useMemo(() => (cat === 0 ? products : products.filter((x) => x.cat === cat)), [cat]);

  // glidande markör under aktiv flik
  useEffect(() => {
    const place = () => {
      const wrap = tabsRef.current;
      const btn = wrap?.querySelector<HTMLButtonElement>(`[data-i="${cat}"]`);
      if (!wrap || !btn) return;
      setInd({ x: btn.offsetLeft, w: btn.offsetWidth });
      // scrolla bara flikraden (inte hela sidan) så aktiv flik syns på mobil
      wrap.scrollTo({ left: btn.offsetLeft - wrap.clientWidth / 2 + btn.offsetWidth / 2, behavior: "smooth" });
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [cat, p.cats]);

  const like = (id: number) => setLiked((s) => { const n = new Set(s); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  const onAdd = (id: number) => {
    add(id);
    setFlash(id);
    setTimeout(() => setFlash((f) => (f === id ? null : f)), 1100);
  };

  return (
    <section className="prods" id="produkter">
      <div className="wrap">
        <header className="prods-head" data-reveal>
          <div>
            <p className="eyebrow">{p.eyebrow}</p>
            <h2 className="sec-title"><span className="chrome">{p.title}</span></h2>
          </div>
          <span className="mono">{p.count(list.length)}</span>
        </header>

        <div className="tabs" ref={tabsRef} role="tablist">
          <span className="tab-ind" style={{ transform: `translateX(${ind.x}px)`, width: ind.w }} aria-hidden="true" />
          {p.cats.map((c, i) => (
            <button key={c} data-i={i} role="tab" aria-selected={cat === i} className={cat === i ? "on" : ""} onClick={() => setCat(i)}>{c}</button>
          ))}
        </div>

        <ul className="pgrid" key={cat}>
          {list.length === 0 && <li className="empty">{p.empty}</li>}
          {list.map((x, i) => {
            const pct = Math.round((1 - x.price / x.oldPrice) * 100);
            const n = items[x.id] ?? 0;
            return (
              <li key={x.id} className="pcard" style={{ ["--i" as string]: i }}>
                <div className="pimg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={x.img} alt={x.name} loading="lazy" />
                  <span className="scan" aria-hidden="true" />
                  <span className="pct">−{pct}%</span>
                  {x.hot && <span className="hot">{p.hot}</span>}
                  <button className={`heart ${liked.has(x.id) ? "on" : ""}`} onClick={() => like(x.id)} aria-label={p.like} aria-pressed={liked.has(x.id)}>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-9.2-8.6C1.3 8.4 3 5 6.4 5c2 0 3.3 1.1 4.1 2.3h3C14.3 6.1 15.6 5 17.6 5 21 5 22.7 8.4 21.2 11.4 19 15.6 12 20 12 20z" /></svg>
                  </button>
                </div>
                <div className="pbody">
                  <p className="pbrand">{x.brand}</p>
                  <h3 className="pname">{x.name}</h3>
                  <p className="pspec">{x.spec}</p>
                  <div className="prate">
                    <span className="stars" style={{ ["--r" as string]: x.rating }} aria-label={`${x.rating}/5`} />
                    <span>{x.rating} · {x.reviews} {p.reviews}</span>
                  </div>
                  <div className="pfoot">
                    <div className="pprice"><strong>{fmt(x.price)}</strong><s>{fmt(x.oldPrice)}</s></div>
                    <button className={`padd ${flash === x.id ? "pop" : ""}`} onClick={() => onAdd(x.id)}>
                      <span>{flash === x.id ? p.added : p.addBtn}</span>
                      {n > 0 && <b>{n}</b>}
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
