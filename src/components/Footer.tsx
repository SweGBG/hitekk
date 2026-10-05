"use client";
import { useState } from "react";
import { useLang } from "@/lib/LangContext";
import Emblem from "./Emblem";
import SweGBGCredit from "./SweGBGCredit";

export default function Footer() {
  const { lang, tr } = useLang();
  const f = tr.footer;
  const [mail, setMail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <footer className="footer" data-anim>
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <a href="#top" className="brand" aria-label="HiTekk"><Emblem id="foot" className="brand-em" /><span className="brand-word">Hi<b>Tekk</b></span></a>
            <p>{f.desc}</p>
            <p className="orgnr">{f.orgnr}</p>
          </div>
          {[[f.col1, f.shop], [f.col2, f.help], [f.col3, f.company]].map(([title, links]) => (
            <div key={title as string} className="foot-col">
              <h4>{title as string}</h4>
              <ul>{(links as string[]).map((l) => <li key={l}><a href="#produkter">{l}</a></li>)}</ul>
            </div>
          ))}
          <form className="news" onSubmit={(e) => { e.preventDefault(); if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) setDone(true); }}>
            <label htmlFor="news">{f.newsTitle}</label>
            {done ? <p className="news-done">{f.subDone}</p> : (
              <div>
                <input id="news" type="email" placeholder={f.placeholder} value={mail} onChange={(e) => setMail(e.target.value)} />
                <button className="btn btn-primary">{f.subBtn}</button>
              </div>
            )}
          </form>
        </div>
      </div>

      <div className="giant" aria-hidden="true">HiTekk</div>

      <div className="wrap foot-bottom">
        <span>{f.copy}</span>
        <span className="trust-row"><span>🔒 SSL</span><span>Klarna</span><span>Swish</span><span>Stripe</span></span>
        <span className="socials">
          {["in", "ig", "yt", "x"].map((s) => <a key={s} href="#" aria-label={s}>{s}</a>)}
        </span>
        <a href="#top" className="to-top">{f.top} ↑</a>
      </div>
      <SweGBGCredit lang={lang} accent="#5FB4FF" text="rgba(226,234,246,.55)" line="rgba(95,180,255,.2)" />
    </footer>
  );
}
