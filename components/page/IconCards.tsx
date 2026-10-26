"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal, Stagger, fadeUpChild } from "../motion";

export type IconCard = { icon: string; title: string; text: string; cta?: { label: string; href: string } };

type Props = {
  eyebrow?: string;
  title: string;
  lede: string;
  /** Button that sits between the heading and the cards. */
  cta?: { label: string; href: string };
  cards: IconCard[];
  /** "dark": glass cards on ink. "outline": bordered white cards. */
  tone: "dark" | "outline";
};

/** Centered heading with a row of icon cards. */
export function IconCards({ eyebrow, title, lede, cta, cards, tone }: Props) {
  return (
    <section className={`icon-cards icon-cards--${tone}`}>
      <div className="container">
        <Reveal className="icon-cards__head">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 className="icon-cards__title">{title}</h2>
          <p className="icon-cards__lede">{lede}</p>
          {cta && (
            <Link href={cta.href} className="btn btn--primary btn--md icon-cards__cta">
              {cta.label}
            </Link>
          )}
        </Reveal>
        <Stagger className={`icon-cards__grid icon-cards__grid--${cards.length}`} stagger={0.08}>
          {cards.map((c) => (
            <motion.article key={c.title} className="icon-card" variants={fadeUpChild}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="icon-card__icon" src={c.icon} alt="" width={48} height={48} />
              <div className="icon-card__copy">
                <h3 className="icon-card__title">{c.title}</h3>
                <p className="icon-card__text">{c.text}</p>
              </div>
              {c.cta && (
                <Link href={c.cta.href} className="btn btn--outline btn--md icon-card__cta">
                  {c.cta.label}
                </Link>
              )}
            </motion.article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
