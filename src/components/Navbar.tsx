"use client";
import { useState, useEffect } from "react";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";
import styles from "./Navbar.module.css";

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

  // Stäng meny vid scroll
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
        <a href="#" className={styles.logo}>Hi<span>Tekk</span></a>

        {/* Desktop links */}
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
            <button className={`${styles.langBtn} ${lang === "sv" ? styles.langActive : ""}`} onClick={() => setLang("sv")}>SE</button>
            <span className={styles.langDivider}>|</span>
            <button className={`${styles.langBtn} ${lang === "en" ? styles.langActive : ""}`} onClick={() => setLang("en")}>EN</button>
          </div>

          <a href="#kontakt" className={styles.ctaBtn}>{tr.cta}</a>

          {/* Hamburger */}
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Meny"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu — slide down under navbar */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}>
        <ul className={styles.mobileLinks}>
          <li><a href="#produkter" onClick={() => setMenuOpen(false)}>{tr.products}</a></li>
          <li><a href="#kategorier" onClick={() => setMenuOpen(false)}>{tr.categories}</a></li>
          <li><a href="#om-oss" onClick={() => setMenuOpen(false)}>{tr.about}</a></li>
          <li><a href="#kontakt" onClick={() => setMenuOpen(false)}>{tr.contact}</a></li>
        </ul>
        <div className={styles.mobileLang}>
          <button className={`${styles.mobileLangBtn} ${lang === "sv" ? styles.mobileLangActive : ""}`} onClick={() => setLang("sv")}>🇸🇪 Svenska</button>
          <button className={`${styles.mobileLangBtn} ${lang === "en" ? styles.mobileLangActive : ""}`} onClick={() => setLang("en")}>🇺🇸 English</button>
        </div>
        <a href="#kontakt" className={styles.mobileCtaBtn} onClick={() => setMenuOpen(false)}>{tr.cta}</a>
      </div>

      {/* Backdrop */}
      {menuOpen && <div className={styles.backdrop} onClick={() => setMenuOpen(false)} />}
    </>
  );
}
