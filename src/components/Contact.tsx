"use client";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/LangContext";

// Öppettider i minuter från midnatt, index 0 = måndag.
const HOURS: ([number, number] | null)[] = [
  [540, 1080], [540, 1080], [540, 1080], [540, 1080], [540, 1080], [600, 900], null,
];
const hm = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

function stockholmNow() {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Stockholm", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(get("weekday"));
  return { day, min: (Number(get("hour")) % 24) * 60 + Number(get("minute")) };
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const { tr } = useLang();
  const c = tr.contact;
  const [now, setNow] = useState<{ day: number; min: number } | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", msg: "" });
  const [state, setState] = useState<"idle" | "invalid" | "sent">("idle");

  useEffect(() => {
    const tick = () => setNow(stockholmNow());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  let status: { open: boolean; text: string } | null = null;
  if (now) {
    const today = HOURS[now.day];
    if (today && now.min >= today[0] && now.min < today[1]) {
      status = { open: true, text: c.closesAt(hm(today[1])) };
    } else {
      let d = now.day, first = true;
      for (let k = 0; k < 8; k++) {
        const h = HOURS[d];
        if (h && (!first || now.min < h[0])) {
          status = { open: false, text: c.opensAt(`${k === 0 ? "" : c.days[d].slice(0, 3).toLowerCase() + " "}${hm(h[0])}`) };
          break;
        }
        d = (d + 1) % 7; first = false;
      }
    }
  }

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [k]: e.target.value });
    if (state === "invalid") setState("idle");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !EMAIL.test(form.email.trim()) || !form.msg.trim()) { setState("invalid"); return; }
    setState("sent"); // Demo: koppla gärna till Resend via en /api-route
  };

  const info = [
    { label: c.phone, val: "+46 8 123 456 78", href: "tel:+46812345678", icon: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /> },
    { label: c.email, val: "hej@hitekk.se", href: "mailto:hej@hitekk.se", icon: <path d="M3 5h18v14H3zM3 6l9 7 9-7" /> },
    { label: c.address, val: "Kungsgatan 12, 111 35 Stockholm", icon: <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" /> },
  ];

  return (
    <section className="contact" id="kontakt">
      <div className="wrap contact-in">
        <div className="contact-info" data-reveal>
          <p className="eyebrow">{c.eyebrow}</p>
          <h2 className="sec-title">{c.title1}<br /><span className="grad">{c.title2}</span></h2>
          <p className="contact-sub">{c.sub}</p>

          <ul className="info">
            {info.map((x) => (
              <li key={x.label}>
                <svg viewBox="0 0 24 24" aria-hidden="true">{x.icon}</svg>
                <div>
                  <small>{x.label}</small>
                  {x.href ? <a href={x.href}>{x.val}</a> : <span>{x.val}</span>}
                </div>
              </li>
            ))}
          </ul>

          <div className="hours">
            <div className="hours-head">
              <span>{c.hours}</span>
              {status && (
                <span className={`open-pill ${status.open ? "is-open" : "is-closed"}`}>
                  <i />{status.open ? c.open : c.closed}<em>· {status.text}</em>
                </span>
              )}
            </div>
            <table>
              <tbody>
                {c.days.map((d, i) => (
                  <tr key={d} className={now?.day === i ? "today" : ""}>
                    <th>{d}</th>
                    <td>{HOURS[i] ? `${hm(HOURS[i]![0])}–${hm(HOURS[i]![1])}` : c.closedDay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="form-card" data-reveal>
          {state === "sent" ? (
            <div className="sent" role="status">
              <svg className="sent-check" viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="23" pathLength="1" /><path d="M15 27l7 7 15-16" pathLength="1" /></svg>
              <h3>{c.successTitle}</h3>
              <p>{c.successSub}</p>
              <button className="btn btn-ghost" onClick={() => { setForm({ name: "", email: "", phone: "", msg: "" }); setState("idle"); }}>{c.again}</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <h3 className="form-title">{c.formTitle}</h3>
              <label className="field"><input value={form.name} onChange={set("name")} placeholder=" " autoComplete="name" required /><span>{c.labelName} *</span></label>
              <label className="field"><input type="email" value={form.email} onChange={set("email")} placeholder=" " autoComplete="email" required /><span>{c.labelEmail} *</span></label>
              <label className="field"><textarea rows={5} value={form.msg} onChange={set("msg")} placeholder=" " required /><span>{c.labelMsg} *</span></label>
              {state === "invalid" && <p className="form-err" role="alert">{c.required}</p>}
              <button className="btn btn-primary btn-wide" type="submit">
                {c.submitBtn}
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" /></svg>
              </button>
              <p className="form-note">{c.note}</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
