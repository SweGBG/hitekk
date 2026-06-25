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
          <span className={styles.pillDot} />
          {tr.pill}
        </div>
        <h1 className={styles.title}>
          {tr.title1}<br />
          <span className={`${styles.hl} metal-text`}>{tr.title2}</span>
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
        <div className={styles.brandStage}>
          <div className={styles.grid} />
          <div className={styles.glowOrb} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="HiTekk" className={styles.brandLogo} />
        </div>
        <div className={styles.trustStrip}>
          <span><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>{tr.trust1}</span>
          <span><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>{tr.trust2}</span>
          <span><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>{tr.trust3}</span>
        </div>
      </div>
    </section>
  );
}
