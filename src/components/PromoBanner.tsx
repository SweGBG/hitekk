"use client";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import styles from "./PromoBanner.module.css";

export default function PromoBanner() {
  const { lang } = useLang();
  const tr = t[lang].promo;

  return (
    <div className={`${styles.banner} fade-in`}>
      <div className={styles.left}>
        <div className={styles.eyebrow}>{tr.eyebrow}</div>
        <h2 className={styles.title}>
          {tr.title1} <span className={styles.hl}>{tr.title2}</span> {tr.title3}
        </h2>
        <p className={styles.sub}>{tr.sub}</p>
        <a href="#produkter" className={styles.btn}>
          <svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          {tr.btn}
        </a>
      </div>
      <div className={styles.right}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80&fit=crop&crop=center" alt="Hörlurar promo" />
        <div className={styles.overlay} />
        <div className={styles.discount}>
          <div className={styles.discountNum}>50%</div>
          <div className={styles.discountOff}>{tr.discount}</div>
        </div>
      </div>
    </div>
  );
}
