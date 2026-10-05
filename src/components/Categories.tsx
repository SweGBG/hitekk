"use client";
import { useLang } from "@/lib/LangContext";
import { useShop } from "@/lib/ShopContext";

const ICONS = [
  <path key="h" d="M4 15v-3a8 8 0 0 1 16 0v3M4 15h3v6H5a1 1 0 0 1-1-1zM20 15h-3v6h2a1 1 0 0 0 1-1z" />,
  <path key="l" d="M4 5h16v11H4zM2 19h20M9 19l.5-1.5h5L15 19" />,
  <path key="m" d="M7 2h10a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM10 5h4M11 19h2" />,
  <path key="k" d="M3 8h4l2-3h6l2 3h4v12H3zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8" />,
  <path key="t" d="M9 2v5M15 2v5M7 7h10v4a5 5 0 0 1-10 0zM12 16v6" />,
  <path key="g" d="M6 9h12a4 4 0 0 1 4 4v1a3 3 0 0 1-5.4 1.8L15 14H9l-1.6 1.8A3 3 0 0 1 2 14v-1a4 4 0 0 1 4-4zM7 11v4M5 13h4M16 12h.01M18 14h.01" />,
];

export default function Categories() {
  const { tr } = useLang();
  const c = tr.categories;
  const { setCat } = useShop();

  const pick = (i: number) => {
    setCat(i + 1);
    document.getElementById("produkter")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="cats" id="kategorier">
      <div className="wrap">
        <header className="sec-head" data-reveal>
          <p className="eyebrow">{c.eyebrow}</p>
          <h2 className="sec-title"><span className="chrome">{c.title}</span></h2>
          <p className="sec-sub">{c.sub}</p>
        </header>
        <ul className="cat-grid">
          {c.items.map((it, i) => (
            <li key={it.name} data-reveal style={{ ["--i" as string]: i }}>
              <button className="cat" onClick={() => pick(i)}>
                <span className="cat-orbit" aria-hidden="true" />
                <span className="cat-icon"><svg viewBox="0 0 24 24" aria-hidden="true">{ICONS[i]}</svg></span>
                <span className="cat-name">{it.name}</span>
                <span className="cat-desc">{it.desc}</span>
                <span className="cat-foot">
                  <span>{it.count}</span>
                  <span className="cat-go">{c.show} <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
