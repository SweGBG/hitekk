import styles from "./Footer.module.css";

const shopLinks = ["Hörlurar", "Laptops", "Kameror", "Mobiler", "Tillbehör", "Gaming"];
const helpLinks = ["Frakt & Retur", "Garanti", "Betalning", "Kontakt", "FAQ"];
const companyLinks = ["Om oss", "Karriär", "Integritetspolicy", "Villkor", "Cookies"];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <div className={styles.logo}>Hi<span>Tekk</span></div>
          <p className={styles.desc}>
            Premium elektronik och gadgets för dig som kräver det bästa.
            Auktoriserad återförsäljare sedan 2019.
          </p>
          <div className={styles.newsletter}>
            <input
              type="email"
              className={styles.input}
              placeholder="Din e-postadress"
            />
            <button className={styles.subBtn}>Prenumerera</button>
          </div>
          <div className={styles.orgnr}>Org.nr: 556xxx-xxxx · Momsreg.</div>
        </div>

        <div>
          <div className={styles.colTitle}>Shop</div>
          <ul className={styles.links}>
            {shopLinks.map((l) => <li key={l}><a href="#">{l}</a></li>)}
          </ul>
        </div>

        <div>
          <div className={styles.colTitle}>Hjälp</div>
          <ul className={styles.links}>
            {helpLinks.map((l) => <li key={l}><a href="#">{l}</a></li>)}
          </ul>
        </div>

        <div>
          <div className={styles.colTitle}>Företag</div>
          <ul className={styles.links}>
            {companyLinks.map((l) => <li key={l}><a href="#">{l}</a></li>)}
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.copy}>
          © 2026 HiTekk AB · Alla rättigheter förbehållna
        </div>
        <div className={styles.trust}>
          <span>🔒 SSL-säkrad</span>
          <span>✓ Klarna</span>
          <span>✓ Swish</span>
          <span>✓ Stripe</span>
        </div>
        <div className={styles.socials}>
          {["in", "ig", "yt", "x"].map((s) => (
            <a key={s} href="#" className={styles.social} aria-label={s}>
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
