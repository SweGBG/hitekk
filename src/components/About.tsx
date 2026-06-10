"use client";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import styles from "./About.module.css";

const perkIcons = [
  <svg key="1" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  <svg key="2" viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-5.5"/></svg>,
  <svg key="3" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  <svg key="4" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.35a16 16 0 0 0 7.75 7.75l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z"/></svg>,
];

export default function About() {
  const { lang } = useLang();
  const tr = t[lang].about;

  return (
    <section className={styles.section} id="om-oss">
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.eyebrow}>{tr.eyebrow}</div>
          <h2 className={styles.title}>
            {tr.title1}<br /><span className={styles.hl}>{tr.title2}</span>
          </h2>
          <p className={styles.body}>{tr.body1}</p>
          <p className={styles.body}>{tr.body2}</p>
          <div className={styles.pills}>
            <span className={styles.pill}>{tr.pill1}</span>
            <span className={styles.pill}>{tr.pill2}</span>
            <span className={styles.pill}>{tr.pill3}</span>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.imgWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=700&q=80&fit=crop&crop=center" alt="HiTekk" />
            <div className={styles.imgBadge}>
              <div className={styles.badgeNum}>2019</div>
              <div className={styles.badgeSub}>{tr.badgeSub}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.perks}>
        {tr.perks.map((p, i) => (
          <div key={p.label} className={styles.perk}>
            <div className={styles.perkIcon}>{perkIcons[i]}</div>
            <div>
              <div className={styles.perkLabel}>{p.label}</div>
              <div className={styles.perkDesc}>{p.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
