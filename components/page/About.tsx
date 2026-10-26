"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { EASE_OUT_QUINT, Reveal, Stagger, fadeUpChild } from "../motion";
import { asset } from "@/lib/asset";
import { StatValue } from "./StatValue";

type Stat = { icon: string; value: string; label: string; note: string };

/** Light band of four headline numbers under the About hero. */
export function StatsBand({ stats }: { stats: Stat[] }) {
  return (
    <section className="stats-band">
      <Stagger className="container stats-band__row" stagger={0.08}>
        {stats.map((s, i) => (
          <motion.div key={s.value} className="stats-band__group" variants={fadeUpChild}>
            {i > 0 && <span className="stats-band__rule" aria-hidden />}
            <div className="stats-band__item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(s.icon)} alt="" width={32} height={32} />
              <p className="stats-band__value">
                <StatValue value={s.value} />
              </p>
              <p className="stats-band__label">
                {s.label}
                <br />
                {s.note}
              </p>
            </div>
          </motion.div>
        ))}
      </Stagger>
    </section>
  );
}

type StoryProps = {
  tag: string;
  title: React.ReactNode;
  paragraphs: string[];
  actions: { label: string; href: string; variant: "primary" | "outline" }[];
  image: { src: string; alt: string };
};

/** Copy beside a plain rounded photo, as in the About "Our Story" block. */
export function Story({ tag, title, paragraphs, actions, image }: StoryProps) {
  return (
    <section className="story">
      <div className="container story__inner">
        <Reveal className="story__copy">
          <p className="pill-tag pill-tag--blue">{tag}</p>
          <div className="story__text">
            <h2 className="split__title">{title}</h2>
            <div className="story__body">
              {paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className="story__actions">
            {actions.map((a) => (
              <Link key={a.label} href={a.href} className={`btn btn--${a.variant} btn--md`}>
                {a.label}
              </Link>
            ))}
          </div>
        </Reveal>
        <motion.div
          className="story__media"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE_OUT_QUINT }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset(image.src)} alt={image.alt} width={560} height={550} loading="lazy" />
        </motion.div>
      </div>
    </section>
  );
}

type Milestone = {
  year: string;
  text: string;
  icon: string;
  /** Highlighted years are blue and carry a small badge next to the year. */
  badge?: string;
  /** Which side of the line the card sits on. The icon takes the other side. */
  card: "top" | "bottom";
};

/** Horizontal timeline with cards alternating above and below the line. Stacks vertically on small screens. */
export function Timeline({ title, items }: { title: string; items: Milestone[] }) {
  return (
    <section className="timeline">
      <div className="container">
        <Reveal>
          <h2 className="timeline__title">{title}</h2>
        </Reveal>
        <Stagger className="timeline__row" stagger={0.1}>
          <motion.span
            className="timeline__line"
            aria-hidden
            // A CSS variable, so the same draw works for the horizontal line and the stacked mobile one.
            variants={{ hidden: { "--draw": 0 }, visible: { "--draw": 1 } } as Variants}
            transition={{ duration: 1.2, ease: [0.645, 0.045, 0.355, 1] }}
          />
          {items.map((m) => {
            const card = (
              <div className={`timeline__card${m.badge ? " is-key" : ""}`}>
                <span className="timeline__ghost" aria-hidden>
                  {m.year.slice(2)}
                </span>
                <p className="timeline__year">
                  {m.year}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {m.badge && <img src={asset(m.badge)} alt="" width={24} height={24} />}
                </p>
                <p className="timeline__text">{m.text}</p>
              </div>
            );
            // eslint-disable-next-line @next/next/no-img-element
            const icon = <img className="timeline__icon" src={asset(m.icon)} alt="" width={48} height={48} />;
            return (
              <motion.div key={m.year} className={`timeline__col timeline__col--${m.card}`} variants={fadeUpChild}>
                <div className="timeline__slot timeline__slot--top">{m.card === "top" ? card : icon}</div>
                <div className="timeline__track">
                  <span className={`timeline__dot${m.badge ? " is-key" : ""}`} />
                </div>
                <div className="timeline__slot timeline__slot--bottom">{m.card === "bottom" ? card : icon}</div>
              </motion.div>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

type Value = { icon: string; title: string; text: string };

/** Bento grid of values: intro and one card, then two cards, then three. */
export function ValuesBento({
  eyebrow,
  title,
  text,
  values,
}: {
  eyebrow: string;
  title: string;
  text: string;
  values: Value[];
}) {
  const rows = [values.slice(0, 1), values.slice(1, 3), values.slice(3)];
  const card = (v: Value) => (
    <motion.article key={v.title} className="value-card" variants={fadeUpChild}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset(v.icon)} alt="" width={48} height={48} />
      <div className="value-card__copy">
        <h3 className="value-card__title">{v.title}</h3>
        <p className="value-card__text">{v.text}</p>
      </div>
    </motion.article>
  );
  return (
    <section className="values">
      <div className="container values__grid">
        <Stagger className="values__row values__row--1" stagger={0.08}>
          <motion.div className="values__intro" variants={fadeUpChild}>
            <p className="soft-pill">{eyebrow}</p>
            <h2 className="values__title">{title}</h2>
            <p className="values__text">{text}</p>
          </motion.div>
          {rows[0].map(card)}
        </Stagger>
        <Stagger className="values__row values__row--2" stagger={0.08}>
          {rows[1].map(card)}
        </Stagger>
        <Stagger className="values__row values__row--3" stagger={0.08}>
          {rows[2].map(card)}
        </Stagger>
      </div>
    </section>
  );
}

type TestimonialProps = {
  eyebrow: string;
  title: string;
  lede: string;
  photo: { src: string; alt: string };
  quote: string;
  name: string;
  role: string;
  logo: { src: string; alt: string };
};

/** Single large testimonial card with a photo, as on the About page. */
export function Testimonial({ eyebrow, title, lede, photo, quote, name, role, logo }: TestimonialProps) {
  return (
    <section className="testimonial">
      <div className="container">
        <Reveal className="testimonial__head">
          <p className="soft-pill">{eyebrow}</p>
          <h2 className="values__title">{title}</h2>
          <p className="values__text">{lede}</p>
        </Reveal>
        <Reveal className="testimonial__card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="testimonial__photo" src={asset(photo.src)} alt={photo.alt} width={400} height={400} loading="lazy" />
          <figure className="testimonial__body">
            <blockquote className="testimonial__quote">{quote}</blockquote>
            <figcaption>
              <span className="testimonial__name">{name}</span>
              <span className="testimonial__role">{role}</span>
            </figcaption>
          </figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="testimonial__logo" src={asset(logo.src)} alt={logo.alt} width={145} height={147} loading="lazy" />
        </Reveal>
      </div>
    </section>
  );
}
