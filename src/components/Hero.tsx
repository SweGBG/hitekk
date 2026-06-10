"use client";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import styles from "./Hero.module.css";

export default function Hero() {
  const { lang } = useLang();
  const tr = t[lang].hero;

  return (
    <section className={styles.hero}>
      <div className={styles.left}>
        <div className={styles.pill}>
          <svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          {tr.pill}
        </div>
        <h1 className={styles.title}>
          {tr.title1}<br />
          <span className={styles.hl}>{tr.title2}</span>
        </h1>
        <p className={styles.sub}>{tr.sub}</p>
        <div className={styles.btns}>
          <a href="#produkter" className={styles.btnPrimary}>
            {tr.btn1}
            <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
          <a href="#om-oss" className={styles.btnSecondary}>{tr.btn2}</a>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>{tr.stat1Num}<sup>★</sup></span>
            <span className={styles.statLabel}>{tr.stat1Label}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>{tr.stat2Num}</span>
            <span className={styles.statLabel}>{tr.stat2Label}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>{tr.stat3Num}</span>
            <span className={styles.statLabel}>{tr.stat3Label}</span>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.imgWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=85&fit=crop&crop=center" alt="Premium hörlurar" />
          <div className={styles.overlay} />
          <div className={styles.floatBadge}>
            <div className={styles.floatIcon}>
              <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </div>
            <div>
              <div className={styles.floatVal}>4 890 kr</div>
              <div className={styles.floatSub}>Sony WH-1000XM5</div>
            </div>
          </div>
          <div className={styles.dealTag}>{tr.dealTag}</div>
        </div>
        <div className={styles.productInfo}>
          <div>
            <div className={styles.productCat}>{tr.productCat}</div>
            <div className={styles.productName}>Sony WH-1000XM5</div>
            <div className={styles.productSpec}>{tr.productSpec}</div>
          </div>
          <div className={styles.priceWrap}>
            <div className={styles.priceOld}>6 490 kr</div>
            <div className={styles.price}>4 890 kr</div>
          </div>
          <button className={styles.addBtn} onClick={() => (window as any).__hitekk_addToCart?.()}>
            <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            {tr.addBtn}
          </button>
        </div>
      </div>
    </section>
  );
}
