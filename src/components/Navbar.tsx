"use client";
import { useState, useEffect } from "react";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import styles from "./Navbar.module.css";

const FlagSE = () => (
  <svg viewBox="0 0 16 10" className={styles.flag} aria-hidden>
    <rect width="16" height="10" fill="#006AA7"/>
    <rect x="5" width="2" height="10" fill="#FECC00"/>
    <rect y="4" width="16" height="2" fill="#FECC00"/>
  </svg>
);
const FlagGB = () => (
  <svg viewBox="0 0 16 10" className={styles.flag} aria-hidden>
    <rect width="16" height="10" fill="#012169"/>
    <path d="M0 0l16 10M16 0L0 10" stroke="#fff" strokeWidth="2"/>
    <path d="M0 0l16 10M16 0L0 10" stroke="#C8102E" strokeWidth="1"/>
    <path d="M8 0v10M0 5h16" stroke="#fff" strokeWidth="3"/>
    <path d="M8 0v10M0 5h16" stroke="#C8102E" strokeWidth="1.6"/>
  </svg>
);

export default function Navbar() {
  const { lang, setLang } = useLang();
  const tr = t[lang].nav;
  const [cartCount, setCartCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    (window as any).__hitekk_addToCart = () => setCartCount((c) => c + 1);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
        <a href="#" className={styles.logo}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-icon.png" alt="HiTekk" className={styles.logoImg} />
          <span className={styles.logoWord}>Hi<span className={styles.logoAccent}>Tekk</span></span>
        </a>

        <ul className={styles.links}>
          <li><a href="#produkter">{tr.products}</a></li>
          <li><a href="#kategorier">{tr.categories}</a></li>
          <li><a href="#om-oss">{tr.about}</a></li>
          <li><a href="#kontakt">{tr.contact}</a></li>
        </ul>

        <div className={styles.right}>
          <button className={styles.iconBtn} aria-label="Sök">
            <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
          <button className={styles.iconBtn} aria-label="Varukorg">
            <svg viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </button>

          <div className={styles.langSwitch}>
            <button className={`${styles.langBtn} ${lang === "sv" ? styles.langActive : ""}`} onClick={() => setLang("sv")} aria-label="Svenska"><FlagSE/>SE</button>
            <button className={`${styles.langBtn} ${lang === "en" ? styles.langActive : ""}`} onClick={() => setLang("en")} aria-label="English"><FlagGB/>EN</button>
          </div>

          <a href="#kontakt" className={styles.ctaBtn}>{tr.cta}</a>

          <button
            className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Meny"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}>
        <ul className={styles.mobileLinks}>
          <li><a href="#produkter" onClick={() => setMenuOpen(false)}>{tr.products}</a></li>
          <li><a href="#kategorier" onClick={() => setMenuOpen(false)}>{tr.categories}</a></li>
          <li><a href="#om-oss" onClick={() => setMenuOpen(false)}>{tr.about}</a></li>
          <li><a href="#kontakt" onClick={() => setMenuOpen(false)}>{tr.contact}</a></li>
        </ul>
        <div className={styles.mobileLang}>
          <button className={`${styles.mobileLangBtn} ${lang === "sv" ? styles.mobileLangActive : ""}`} onClick={() => setLang("sv")}><FlagSE/> Svenska</button>
          <button className={`${styles.mobileLangBtn} ${lang === "en" ? styles.mobileLangActive : ""}`} onClick={() => setLang("en")}><FlagGB/> English</button>
        </div>
        <a href="#kontakt" className={styles.mobileCtaBtn} onClick={() => setMenuOpen(false)}>{tr.cta}</a>
      </div>

      {menuOpen && <div className={styles.backdrop} onClick={() => setMenuOpen(false)} />}
    </>
  );
}
