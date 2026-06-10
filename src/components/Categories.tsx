"use client";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import styles from "./Categories.module.css";

const icons = [
  <svg key="1" viewBox="0 0 24 24"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>,
  <svg key="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  <svg key="3" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
  <svg key="4" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  <svg key="5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>,
  <svg key="6" viewBox="0 0 24 24"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect x="2" y="6" width="20" height="12" rx="8"/></svg>,
];

export default function Categories() {
  const { lang } = useLang();
  const tr = t[lang].categories;

  return (
    <section className={styles.section} id="kategorier">
      <div className={styles.header}>
        <div className={styles.eyebrow}>{tr.eyebrow}</div>
        <h2 className={styles.title}>{tr.title}</h2>
        <p className={styles.sub}>{tr.sub}</p>
      </div>
      <div className={styles.grid}>
        {tr.items.map((cat, i) => (
          <a href="#produkter" key={cat.name} className={styles.card}>
            <div className={styles.iconWrap}>{icons[i]}</div>
            <div className={styles.cardName}>{cat.name}</div>
            <div className={styles.cardDesc}>{cat.desc}</div>
            <div className={styles.cardCount}>{cat.count}</div>
            <div className={styles.arrow}>→</div>
          </a>
        ))}
      </div>
    </section>
  );
}
