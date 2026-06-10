"use client";
import { useState } from "react";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import styles from "./Products.module.css";

const products = [
  { id:1, name:"Sony WH-1000XM5", categoryKey:"Hörlurar", spec:"30h batteri · LDAC", price:4890, oldPrice:6490, discount:25, rating:4.9, reviews:341, img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80&fit=crop&crop=center", hot:true },
  { id:2, name:"MacBook Air M3", categoryKey:"Laptops", spec:'13.6" · 16GB · 512GB', price:14990, oldPrice:17490, discount:14, rating:4.8, reviews:218, img:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80&fit=crop&crop=center", hot:false },
  { id:3, name:"Samsung Galaxy S25", categoryKey:"Mobiler", spec:"256GB · 12GB RAM · 5G", price:9490, oldPrice:11490, discount:17, rating:4.7, reviews:189, img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80&fit=crop&crop=center", hot:true },
  { id:4, name:"Sony A7 IV", categoryKey:"Kameror", spec:"33MP · 4K60 · IBIS", price:27490, oldPrice:31990, discount:14, rating:4.9, reviews:97, img:"https://images.unsplash.com/photo-1606986628248-a8a2bc4a9a43?w=500&q=80&fit=crop&crop=center", hot:false },
  { id:5, name:'iPad Pro 13"', categoryKey:"Tillbehör", spec:"M4 · 256GB · WiFi", price:13490, oldPrice:15490, discount:13, rating:4.8, reviews:154, img:"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80&fit=crop&crop=center", hot:false },
  { id:6, name:"Anker Soundcore P40i", categoryKey:"Hörlurar", spec:"60h · ANC · IP54", price:890, oldPrice:1290, discount:31, rating:4.6, reviews:502, img:"https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80&fit=crop&crop=center", hot:true },
];

// Map sv category key → index in cats array
const catMap: Record<string, number> = { "Hörlurar":1, "Laptops":2, "Mobiler":3, "Kameror":4, "Tillbehör":5 };

export default function Products() {
  const { lang } = useLang();
  const tr = t[lang].products;
  const [activeIdx, setActiveIdx] = useState(0);
  const [liked, setLiked] = useState<Set<number>>(new Set());

  const filtered = activeIdx === 0
    ? products
    : products.filter(p => catMap[p.categoryKey] === activeIdx);

  const toggleLike = (id: number) => setLiked(prev => {
    const n = new Set(prev);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });

  return (
    <section className={styles.section} id="produkter">
      <div className={styles.header}>
        <div>
          <div className={styles.eyebrow}>{tr.eyebrow}</div>
          <h2 className={styles.title}>{tr.title}</h2>
        </div>
        <a href="#" className={styles.seeAll}>{tr.seeAll}</a>
      </div>
      <div className={styles.filters}>
        {tr.cats.map((cat, i) => (
          <button key={cat} className={`${styles.filterBtn} ${activeIdx === i ? styles.filterActive : ""}`} onClick={() => setActiveIdx(i)}>
            {cat}
          </button>
        ))}
      </div>
      <div className={styles.grid}>
        {filtered.map(p => (
          <div key={p.id} className={styles.card}>
            <div className={styles.imgWrap}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.img} alt={p.name} />
              <button className={`${styles.wishBtn} ${liked.has(p.id) ? styles.liked : ""}`} onClick={() => toggleLike(p.id)}>
                <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </button>
              {p.discount > 0 && <span className={styles.badge}>−{p.discount}%</span>}
              {p.hot && <span className={styles.hotBadge}>🔥 {lang === "sv" ? "Populär" : "Popular"}</span>}
            </div>
            <div className={styles.body}>
              <div className={styles.cat}>{lang === "sv" ? p.categoryKey : (tr.cats[catMap[p.categoryKey]] ?? p.categoryKey)}</div>
              <div className={styles.name}>{p.name}</div>
              <div className={styles.spec}>{p.spec}</div>
              <div className={styles.stars}>
                <span>{"★".repeat(Math.round(p.rating))}{"☆".repeat(5-Math.round(p.rating))}</span>
                <span className={styles.revCount}>{p.reviews} {tr.reviews}</span>
              </div>
              <div className={styles.footer}>
                <div>
                  <div className={styles.price}>{p.price.toLocaleString("sv-SE")} kr</div>
                  <div className={styles.oldPrice}>{p.oldPrice.toLocaleString("sv-SE")} kr</div>
                </div>
                <button className={styles.addBtn} onClick={() => (window as any).__hitekk_addToCart?.()} aria-label={tr.addBtn}>
                  <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
