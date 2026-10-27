"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal, Stagger, fadeUpChild } from "../motion";
import { asset } from "@/lib/asset";

type Cta = { label: string; href: string };

/* ---------- Intro: yellow "why Folio3" card beside the "what is a vCIO" card ---------- */

export function VcioIntro({
  why,
  what,
}: {
  why: { title: string; items: string[] };
  what: { title: string; text: string; stat: { value: string; label: string } };
}) {
  return (
    <section className="vcio-intro">
      <Stagger className="container vcio-intro__grid" stagger={0.1}>
        <motion.article className="vcio-intro__card vcio-intro__card--yellow" variants={fadeUpChild}>
          <h2 className="vcio-h3">{why.title}</h2>
          <ul className="vcio-intro__list">
            {why.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="vcio-intro__mark" src={asset("/images/vcio-watermark.png")} alt="" width={359} height={219} />
        </motion.article>
        <motion.article className="vcio-intro__card vcio-intro__card--soft" variants={fadeUpChild}>
          <h2 className="vcio-h3">{what.title}</h2>
          <p className="vcio-intro__text">{what.text}</p>
          <div className="vcio-intro__stat">
            <span className="vcio-intro__value">{what.stat.value}</span>
            <span className="vcio-intro__label">{what.stat.label}</span>
          </div>
        </motion.article>
      </Stagger>
    </section>
  );
}

/* ---------- Challenges: four icon cards with a highlighted note ---------- */

type Challenge = { icon: string; title: string; text: string; note: string };

export function VcioChallenges({ title, lede, cards }: { title: string; lede: string; cards: Challenge[] }) {
  return (
    <section className="vcio-challenges">
      <div className="container">
        <Reveal className="vcio-head vcio-head--challenges">
          <h2 className="vcio-h2 vcio-title-case">{title}</h2>
          <p className="vcio-head__lede">{lede}</p>
        </Reveal>
        <Stagger className="vcio-challenges__grid" stagger={0.08}>
          {cards.map((c) => (
            <motion.article key={c.title} className="vcio-challenge" variants={fadeUpChild}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(c.icon)} alt="" width={48} height={48} />
              <div className="vcio-challenge__copy">
                <h3 className="vcio-challenge__title">{c.title}</h3>
                <p className="vcio-challenge__text">{c.text}</p>
              </div>
              <p className="vcio-challenge__note">{c.note}</p>
            </motion.article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ---------- "You may benefit" row: photo, checklist card and blue prompt ---------- */

export function VcioBenefit({
  image,
  title,
  items,
  cta,
  prompt,
}: {
  image: { src: string; alt: string };
  title: string;
  items: string[];
  cta: Cta;
  prompt: { title: string; text: string };
}) {
  return (
    <section className="vcio-benefit">
      <Stagger className="container vcio-benefit__row" stagger={0.1}>
        <motion.div className="vcio-benefit__media" variants={fadeUpChild}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset(image.src)} alt={image.alt} width={321} height={394} loading="lazy" />
        </motion.div>
        <motion.div className="vcio-benefit__card" variants={fadeUpChild}>
          <h2 className="vcio-benefit__title vcio-title-case">{title}</h2>
          <ul className="vcio-benefit__list">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Link href={cta.href} className="btn btn--primary btn--md">
            {cta.label}
          </Link>
        </motion.div>
        <motion.div className="vcio-benefit__prompt" variants={fadeUpChild}>
          <p className="vcio-benefit__prompt-title">{prompt.title}</p>
          <p className="vcio-benefit__prompt-text">{prompt.text}</p>
        </motion.div>
      </Stagger>
    </section>
  );
}

/* ---------- Strategic framework: four staggered outcome cards ---------- */

type Outcome = { label: string; icon: string; title: string; text: string };

export function VcioFramework({ eyebrow, title, cards }: { eyebrow: string; title: string; cards: Outcome[] }) {
  return (
    <section className="vcio-framework">
      <div className="container">
        <Reveal className="vcio-head vcio-head--framework">
          <p className="vcio-pill">{eyebrow}</p>
          <h2 className="vcio-h2 vcio-title-case">{title}</h2>
        </Reveal>
        <Stagger className="vcio-framework__grid" stagger={0.1}>
          {cards.map((c, i) => (
            <motion.article key={c.title} className="vcio-outcome-card" variants={fadeUpChild}>
              <div className="vcio-outcome-card__head">
                <div>
                  <p className="vcio-outcome-card__num">{String(i + 1).padStart(2, "0")}</p>
                  <p className="vcio-outcome-card__label">{c.label}</p>
                </div>
                <span className="vcio-outcome-card__icon">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={asset(c.icon)} alt="" width={24} height={24} />
                </span>
              </div>
              <div className="vcio-outcome-card__copy">
                <h3 className="vcio-outcome-card__title">{c.title}</h3>
                <p className="vcio-outcome-card__text">{c.text}</p>
              </div>
            </motion.article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ---------- The Outcome: copy and button beside a photo ---------- */

export function VcioOutcome({
  title,
  text,
  cta,
  image,
}: {
  title: string;
  text: string;
  cta: Cta;
  image: { src: string; alt: string };
}) {
  return (
    <section className="vcio-outcome">
      <div className="container vcio-outcome__inner">
        <Reveal className="vcio-outcome__copy">
          <div className="vcio-outcome__text-wrap">
            <h2 className="vcio-h3">{title}</h2>
            <p className="vcio-outcome__text">{text}</p>
          </div>
          <Link href={cta.href} className="btn btn--primary">
            {cta.label}
          </Link>
        </Reveal>
        <Reveal className="vcio-outcome__media" delay={0.1}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset(image.src)} alt={image.alt} width={560} height={430} loading="lazy" />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Why Trust Folio3: two photo cards with an overlapping colour panel ---------- */

type TrustCard = { image: { src: string; alt: string }; icon: string; title: string; text: string; tone: "yellow" | "blue" };

export function VcioTrust({ title, lede, cards }: { title: string; lede: string; cards: TrustCard[] }) {
  return (
    <section className="vcio-trust">
      <div className="container">
        <Reveal className="vcio-head vcio-head--trust">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="vcio-trust__logo" src={asset("/images/folio3-mark.png")} alt="Folio3" width={186} height={90} />
          <h2 className="vcio-h2 vcio-trust__title">{title}</h2>
          <p className="vcio-trust__lede">{lede}</p>
        </Reveal>
        <Stagger className="vcio-trust__row" stagger={0.12}>
          {cards.map((c) => (
            <motion.article key={c.title} className={`vcio-trust__item vcio-trust__item--${c.tone}`} variants={fadeUpChild}>
              <div className="vcio-trust__media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(c.image.src)} alt={c.image.alt} width={309} height={560} loading="lazy" />
              </div>
              <div className="vcio-trust__panel">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(c.icon)} alt="" width={48} height={48} />
                <h3 className="vcio-trust__panel-title">{c.title}</h3>
                <p className="vcio-trust__panel-text">{c.text}</p>
              </div>
            </motion.article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
