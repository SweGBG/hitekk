# HiTekk — Kom igång

## Stack
- **Next.js 15** (App Router)
- **TypeScript**
- **CSS Modules** (ingen Tailwind — lättare att anpassa)
- **Vercel** (hosting)

---

## Steg 1 — Klona / kopiera projektet

Flytta mappen `hitekk/` till din önskade plats, t.ex. `~/kod/hitekk`.

---

## Steg 2 — Installera beroenden

```bash
cd hitekk
npm install
```

Det installerar: `next`, `react`, `react-dom` + TypeScript-typer.
**Inga extra npm-paket behövs** — allt är byggt med inbyggda CSS Modules och Next.js.

---

## Steg 3 — Kör lokalt

```bash
npm run dev
```

Öppna **http://localhost:3000** i webbläsaren.

---

## Steg 4 — Skapa GitHub-repo

```bash
git init
git add .
git commit -m "Initial HiTekk landing"
git branch -M main
git remote add origin https://github.com/DITT-NAMN/hitekk.git
git push -u origin main
```

---

## Steg 5 — Deploya till Vercel

### Alternativ A — Vercel CLI (rekommenderat)

```bash
npm install -g vercel   # installera en gång
vercel                  # första gången, följ promptsen
vercel --prod           # deploya till produktion
```

### Alternativ B — Via Vercel dashboard

1. Gå till **vercel.com** → New Project
2. Importera ditt GitHub-repo
3. Framework: välj **Next.js** (detekteras automatiskt)
4. Klicka **Deploy**

Klart. Vercel ger dig en URL typ `hitekk.vercel.app`.

---

## Steg 6 — Eget domännamn (valfritt)

1. Köp domän på t.ex. **namecheap.com** eller **one.com** (`hitekk.se`)
2. Vercel Dashboard → ditt projekt → Settings → Domains
3. Lägg till domänen, följ DNS-instruktionerna

---

## Bygga vidare — rekommenderade npm-paket

När du är redo att expandera till riktig e-handel:

| Vad | Paket |
|-----|-------|
| Betalning | `npm install stripe` |
| E-post | `npm install resend` |
| Databas | `npm install @supabase/supabase-js @supabase/ssr` |
| Formulärvalidering | `npm install react-hook-form zod` |
| Animationer | `npm install framer-motion` |
| Ikoner | `npm install @tabler/icons-react` |

---

## Filstruktur

```
src/
  app/
    layout.tsx        ← root layout, metadata, fonts
    page.tsx          ← huvudsidan, samlar alla sektioner
    globals.css       ← design tokens (CSS-variabler), reset
  components/
    Navbar.tsx        ← sticky nav, mobilmeny, varukorg-badge
    Navbar.module.css
    Hero.tsx          ← hero split-layout med featured produkt
    Hero.module.css
    Categories.tsx    ← 6 kategori-kort
    Categories.module.css
    Products.tsx      ← produktgrid med filter-pills
    Products.module.css
    PromoBanner.tsx   ← rabattbanner
    PromoBanner.module.css
    About.tsx         ← om oss + USP-strip
    About.module.css
    Contact.tsx       ← kontaktformulär + karta + info
    Contact.module.css
    Footer.tsx        ← footer med nyhetsbrev, org.nr, sociala
    Footer.module.css
    ScrollFadeIn.tsx  ← scroll-animationer (IntersectionObserver)
```

---

## Anpassa

- **Färger** → `src/app/globals.css` `:root { ... }`
- **Produkter** → `src/components/Products.tsx` `const products = [...]`
- **Kontaktinfo** → `src/components/Contact.tsx`
- **Org.nr** → `src/components/Footer.tsx`
- **Google Maps** → byt ut iframe `src` i `Contact.tsx`

---

## Porföljnotering

Bygg klart: lägg till länk på **SweGBG Trading (swegbg.com)** och **Atilli Berg (barberare.vercel.app)** i portfolionavbar.
