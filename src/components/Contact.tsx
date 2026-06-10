"use client";
import { useState } from "react";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import styles from "./Contact.module.css";

export default function Contact() {
  const { lang } = useLang();
  const tr = t[lang].contact;
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name:"", email:"", message:"" });

  return (
    <section className={styles.section} id="kontakt">
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.eyebrow}>{tr.eyebrow}</div>
          <h2 className={styles.title}>{tr.title1}<br /><span className={styles.hl}>{tr.title2}</span></h2>
          <p className={styles.sub}>{tr.sub}</p>
          <div className={styles.contacts}>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.35a16 16 0 0 0 7.75 7.75l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z"/></svg></div>
              <div><div className={styles.contactLabel}>{tr.phone}</div><a href="tel:+46812345678" className={styles.contactVal}>+46 8 123 456 78</a></div>
            </div>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}><svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
              <div><div className={styles.contactLabel}>{tr.email}</div><a href="mailto:hej@hitekk.se" className={styles.contactVal}>hej@hitekk.se</a></div>
            </div>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}><svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
              <div><div className={styles.contactLabel}>{tr.address}</div><div className={styles.contactVal}>Kungsgatan 12, 111 35 Stockholm</div></div>
            </div>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
              <div><div className={styles.contactLabel}>{tr.hours}</div><div className={styles.contactVal}>{tr.hoursVal}</div></div>
            </div>
          </div>
          <div className={styles.mapWrap}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2034.8!2d18.0646!3d59.3326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9d5f0a14f2c5%3A0x1!2sKungsgatan%2C+Stockholm!5e0!3m2!1ssv!2sse!4v1" width="100%" height="200" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="HiTekk karta" />
          </div>
        </div>
        <div className={styles.right}>
          {sent ? (
            <div className={styles.successBox}>
              <div className={styles.successIcon}>✓</div>
              <h3>{tr.successTitle}</h3>
              <p>{tr.successSub}</p>
            </div>
          ) : (
            <div className={styles.formBox}>
              <div className={styles.formTitle}>{tr.formTitle}</div>
              <div className={styles.field}>
                <label className={styles.label}>{tr.labelName}</label>
                <input type="text" className={styles.input} placeholder={tr.placeholderName} value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>{tr.labelEmail}</label>
                <input type="email" className={styles.input} placeholder={tr.placeholderEmail} value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>{tr.labelMsg}</label>
                <textarea className={`${styles.input} ${styles.textarea}`} placeholder={tr.placeholderMsg} rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
              </div>
              <button className={styles.submitBtn} onClick={() => { if(form.name && form.email && form.message) setSent(true); }}>
                {tr.submitBtn}
                <svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
              <p className={styles.formNote}>{tr.note}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
