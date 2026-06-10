import styles from "./PromoBanner.module.css";

export default function PromoBanner() {
  return (
    <div className={`${styles.banner} fade-in`}>
      <div className={styles.left}>
        <div className={styles.eyebrow}>// Veckans specialerbjudande</div>
        <h2 className={styles.title}>
          Upp till <span className={styles.hl}>50% rabatt</span> på hörlurar
        </h2>
        <p className={styles.sub}>
          Premiumljud utan premiumprislapp. Erbjudandet gäller till söndag —
          passa på medan lagret räcker.
        </p>
        <a href="#produkter" className={styles.btn}>
          <svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          Shoppa nu
        </a>
      </div>
      <div className={styles.right}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80&fit=crop&crop=center"
          alt="Hörlurar promo"
        />
        <div className={styles.overlay} />
        <div className={styles.discount}>
          <div className={styles.discountNum}>50%</div>
          <div className={styles.discountOff}>rabatt</div>
        </div>
      </div>
    </div>
  );
}
