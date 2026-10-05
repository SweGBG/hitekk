"use client";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/LangContext";
import { useShop } from "@/lib/ShopContext";
import Emblem from "./Emblem";

export default function Navbar() {
  const { lang, setLang, tr } = useLang();
  const { count, setCartOpen } = useShop();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [menu]);

  const bar = [...tr.topbar, ...tr.topbar];

  return (
    <>
      <div className="topbar" data-anim>
        <div className="topbar-track">
          {bar.map((u, i) => <span key={i}><i aria-hidden="true" />{u}</span>)}
        </div>
      </div>

      <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
        <div className="wrap nav-in">
          <a href="#top" className="brand" aria-label="HiTekk">
            <Emblem id="nav" className="brand-em" />
            <span className="brand-word">Hi<b>Tekk</b></span>
          </a>

          <nav className="nav-links" aria-label="Huvudmeny">
            {tr.nav.links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          </nav>

          <div className="nav-actions">
            <button className="lang" onClick={() => setLang(lang === "sv" ? "en" : "sv")} aria-label={tr.nav.switchTo}>
              <span className={lang === "sv" ? "on" : ""}>SV</span>
              <span className={lang === "en" ? "on" : ""}>EN</span>
            </button>
            <button className="cart-btn" onClick={() => setCartOpen(true)} aria-label={`${tr.nav.cart} (${count})`}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6.2" /><circle cx="10" cy="20" r="1.4" /><circle cx="17" cy="20" r="1.4" /></svg>
              {count > 0 && <b key={count} className="badge">{count}</b>}
            </button>
            <a href="#kontakt" className="btn btn-primary nav-cta">{tr.nav.cta}</a>
            <button className={`burger ${menu ? "open" : ""}`} onClick={() => setMenu((m) => !m)} aria-label={menu ? tr.nav.close : tr.nav.menu} aria-expanded={menu}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <div className={`mmenu ${menu ? "open" : ""}`} aria-hidden={!menu}>
        <nav>
          {tr.nav.links.map(([label, href], i) => (
            <a key={href} href={href} onClick={() => setMenu(false)} style={{ ["--i" as string]: i }} tabIndex={menu ? 0 : -1}>
              <small>0{i + 1}</small>{label}
            </a>
          ))}
          <a href="#kontakt" className="btn btn-primary" onClick={() => setMenu(false)} style={{ ["--i" as string]: 4 }} tabIndex={menu ? 0 : -1}>{tr.nav.cta}</a>
        </nav>
      </div>
    </>
  );
}
