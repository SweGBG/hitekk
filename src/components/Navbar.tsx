"use client";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

const navLinks = [
  { label: "Produkter", href: "#produkter" },
  { label: "Kategorier", href: "#kategorier" },
  { label: "Om oss", href: "#om-oss" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Expose cart updater globally for demo
  useEffect(() => {
    (window as any).__hitekk_addToCart = () => setCartCount((c) => c + 1);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <a href="#" className={styles.logo}>
        Hi<span>Tekk</span>
      </a>

      <ul className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
        {navLinks.map((l) => (
          <li key={l.href}>
            <a href={l.href} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <div className={styles.right}>
        <button className={styles.iconBtn} aria-label="Sök">
          <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </button>

        <button className={styles.iconBtn} aria-label="Varukorg">
          <svg viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
        </button>

        <a href="#kontakt" className={styles.ctaBtn}>Kontakta oss</a>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Meny"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
