"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { asset } from "@/lib/asset";
import { ROUTES } from "@/lib/routes";
import { EASE_OUT_QUINT, Reveal, Stagger, fadeUpChild } from "../motion";

const Arrow = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M3.75 9h10.5M9.75 4.5 14.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Check = ({ size, stroke }: { size: number; stroke: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <path d="M10 25l9 9 19-19" stroke="#fff" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Confetti pieces from the Figma "Confetti" frame, positioned as % of the 1440 x 649 hero.
const CONFETTI = [
  { x: 150, y: 124, w: 23, h: 23, r: 4, rot: 20, c: "var(--yellow)" },
  { x: 250, y: 300, w: 12, h: 12, r: 6, rot: 0, c: "var(--red)" },
  { x: 117, y: 470, w: 27, h: 8, r: 4, rot: -25, c: "var(--blue)" },
  { x: 330, y: 560, w: 10, h: 10, r: 5, rot: 0, c: "var(--yellow)" },
  { x: 1260, y: 132, w: 16, h: 16, r: 4, rot: 30, c: "var(--blue)" },
  { x: 1150, y: 270, w: 24, h: 8, r: 4, rot: -35, c: "var(--red)" },
  { x: 1310, y: 470, w: 12, h: 12, r: 6, rot: 0, c: "var(--yellow)" },
  { x: 1100, y: 557, w: 10, h: 10, r: 3, rot: 15, c: "var(--blue)" },
  { x: 420, y: 160, w: 8, h: 8, r: 4, rot: 0, c: "var(--red)" },
  { x: 1000, y: 150, w: 8, h: 8, r: 4, rot: 0, c: "var(--yellow)" },
];

const STEPS = [
  { title: "Request received", text: "Done", tone: "done" },
  { title: "Team review", text: "In progress", tone: "yellow", n: "02" },
  { title: "We get back to you", text: "Within 2 business hours", tone: "red", n: "03" },
] as const;

export function ThankYouHero() {
  return (
    <section className="ty-hero">
      <div className="ty-hero__grid" aria-hidden="true" />
      <span className="ty-hero__glow ty-hero__glow--blue" aria-hidden="true" />
      <span className="ty-hero__glow ty-hero__glow--red" aria-hidden="true" />
      <span className="ty-hero__glow ty-hero__glow--yellow" aria-hidden="true" />
      <div className="ty-hero__confetti" aria-hidden="true">
        {CONFETTI.map((p, i) => (
          <span
            key={i}
            style={
              {
                left: `${(p.x / 1440) * 100}%`,
                top: `${(p.y / 649) * 100}%`,
                width: p.w,
                height: p.h,
                borderRadius: p.r,
                background: p.c,
                "--rot": `${p.rot}deg`,
                "--sway": `${i % 2 ? -18 : 18}px`,
                "--dur": `${4.2 + (i % 4) * 0.7}s`,
                "--delay": `${(i * 0.37) % 2.6}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="ty-hero__inner container">
        <div className="ty-badge" aria-hidden="true">
          <span className="ty-badge__ring" />
          <span className="ty-badge__wave" />
          <span className="ty-badge__wave" />
          <span className="ty-badge__wave" />
          <motion.span
            className="ty-badge__halo"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: EASE_OUT_QUINT, delay: 0.1 }}
          />
          <motion.span
            className="ty-badge__core"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 420, damping: 22 }}
          >
            <Check size={48} stroke={5.2} />
          </motion.span>
          <span className="ty-badge__dot ty-badge__dot--a" />
          <span className="ty-badge__dot ty-badge__dot--b" />
          <span className="ty-badge__dot ty-badge__dot--c" />
        </div>

        <motion.ol
          className="ty-track"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT_QUINT, delay: 0.3 }}
        >
          {STEPS.map((s, i) => (
            <li key={s.title} className="ty-track__item">
              {i > 0 && <span className="ty-track__line" aria-hidden="true" />}
              <div className="ty-step">
                <span className={`ty-step__marker ty-step__marker--${s.tone}`}>
                  {s.tone === "done" ? <Check size={18} stroke={4.5} /> : s.n}
                </span>
                <span className="ty-step__copy">
                  <span className="ty-step__title">{s.title}</span>
                  <span className="ty-step__text">{s.text}</span>
                </span>
              </div>
            </li>
          ))}
        </motion.ol>

        <motion.div
          className="ty-hero__actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT_QUINT, delay: 0.42 }}
        >
          <Link href={ROUTES.services} className="btn ty-btn ty-btn--primary">
            Explore Our Services
            <Arrow />
          </Link>
          <Link href={ROUTES.contact} className="btn ty-btn ty-btn--secondary">
            Submit Another Request
          </Link>
        </motion.div>
      </div>

      <motion.h1
        className="ty-hero__word"
        // Rises from behind the section below (the hero clips it), swells a little, then settles.
        initial={{ y: "110%", scale: 1 }}
        animate={{ y: ["110%", "0%", "0%"], scale: [1, 1.08, 1] }}
        transition={{ duration: 1.6, times: [0, 0.55, 1], ease: EASE_OUT_QUINT, delay: 0.3 }}
      >
        Thank You!
      </motion.h1>
    </section>
  );
}

const OPTIONS = [
  {
    tone: "blue",
    icon: "/icons/ty-sales.svg",
    chip: "Mon–Fri, 9am–6pm PT",
    title: "Sales",
    value: "+1 (408) 412-3813",
    action: "Call Sales",
    href: "tel:+14084123813",
  },
  {
    tone: "red",
    icon: "/icons/ty-support.svg",
    chip: "Around the clock",
    title: "24/7 Support",
    value: "+1 (408) 512-1812",
    action: "Call Support",
    href: "tel:+14085121812",
  },
  {
    tone: "yellow",
    icon: "/icons/ty-email.svg",
    chip: "Response in < 2 hrs",
    title: "Email",
    value: "msp-support@folio3.com",
    action: "Send an Email",
    href: "mailto:msp-support@folio3.com",
  },
];

export function ContactOptions() {
  return (
    <section className="ty-options">
      <div className="container">
        <Reveal>
          <h2 className="ty-options__title">Contact Options</h2>
        </Reveal>
        <Stagger className="ty-options__cards">
          {OPTIONS.map((o) => (
            <motion.a key={o.title} href={o.href} className={`ty-card ty-card--${o.tone}`} variants={fadeUpChild}>
              <span className="ty-card__glow" aria-hidden="true" />
              <span className="ty-card__top">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(o.icon)} alt="" width={48} height={48} />
                <span className="ty-card__chip">{o.chip}</span>
              </span>
              <span className="ty-card__title">{o.title}</span>
              <span className="ty-card__value">{o.value}</span>
              <span className="ty-card__action">
                {o.action}
                <Arrow />
              </span>
            </motion.a>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
