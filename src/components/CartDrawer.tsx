"use client";
import { useEffect } from "react";
import { useLang } from "@/lib/LangContext";
import { useShop } from "@/lib/ShopContext";
import { products, fmt, FREE_SHIPPING, SHIPPING_FEE } from "@/lib/products";

export default function CartDrawer() {
  const { tr } = useLang();
  const c = tr.cart;
  const { items, setQty, cartOpen, setCartOpen, count } = useShop();

  useEffect(() => {
    if (!cartOpen) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setCartOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [cartOpen, setCartOpen]);

  const rows = Object.entries(items).map(([id, qty]) => ({ p: products.find((x) => x.id === Number(id))!, qty }));
  const sub = rows.reduce((s, r) => s + r.p.price * r.qty, 0);
  const free = sub >= FREE_SHIPPING;
  const ship = rows.length === 0 || free ? 0 : SHIPPING_FEE;
  const pct = Math.min(100, (sub / FREE_SHIPPING) * 100);
  const tab = cartOpen ? 0 : -1;

  return (
    <>
      <button className={`cart-fab ${count > 0 ? "show" : ""}`} onClick={() => setCartOpen(true)} aria-label={`${c.title} (${count})`}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6.2" /><circle cx="10" cy="20" r="1.4" /><circle cx="17" cy="20" r="1.4" /></svg>
        <b key={count}>{count}</b>
      </button>

      <div className={`scrim ${cartOpen ? "open" : ""}`} onClick={() => setCartOpen(false)} />
      <aside className={`drawer ${cartOpen ? "open" : ""}`} aria-hidden={!cartOpen} aria-label={c.title}>
        <header>
          <h3>{c.title} <span>{count}</span></h3>
          <button className="x" onClick={() => setCartOpen(false)} aria-label={tr.nav.close} tabIndex={tab}>
            <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </header>

        <div className="ship">
          <p>{free ? c.freeOk : c.freeLeft(fmt(FREE_SHIPPING - sub))}</p>
          <div className="ship-bar"><i style={{ width: `${pct}%` }} className={free ? "done" : ""} /></div>
        </div>

        {rows.length === 0 ? (
          <p className="drawer-empty">{c.empty}</p>
        ) : (
          <ul className="drawer-list">
            {rows.map(({ p, qty }) => (
              <li key={p.id}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt="" />
                <div>
                  <small>{p.brand}</small>
                  <strong>{p.name}</strong>
                  <span>{fmt(p.price)}</span>
                </div>
                <div className="qty">
                  <button onClick={() => setQty(p.id, qty - 1)} aria-label="−" tabIndex={tab}>−</button>
                  <output>{qty}</output>
                  <button onClick={() => setQty(p.id, qty + 1)} aria-label="+" tabIndex={tab}>+</button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <footer>
          <div className="row"><span>{c.subtotal}</span><span>{fmt(sub)}</span></div>
          <div className="row"><span>{c.shipping}</span><span>{ship === 0 && rows.length ? c.free : fmt(ship)}</span></div>
          <div className="row total"><span>{c.total}</span><strong>{fmt(sub + ship)}</strong></div>
          <p className="vat">{c.vat}</p>
          <button className="btn btn-primary btn-wide" disabled={rows.length === 0} tabIndex={tab}>{c.checkout}</button>
          <p className="demo">{c.demo}</p>
        </footer>
      </aside>
    </>
  );
}
