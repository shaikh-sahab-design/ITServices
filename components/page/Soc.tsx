"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal, Stagger, fadeUpChild } from "../motion";
import { asset } from "@/lib/asset";

type Cta = { label: string; href: string };
type BtnSize = "sm" | "md" | "lg";

const sizeClass = { sm: " btn--sm", md: " btn--md", lg: "" } as const;

function Btn({ cta, variant, size }: { cta: Cta; variant: "primary" | "ghost" | "yellow"; size: BtnSize }) {
  return (
    <Link href={cta.href} className={`btn btn--${variant}${sizeClass[size]}`}>
      {cta.label}
    </Link>
  );
}

/* ---------- What Is SOC: intro, heading and the six benefit cards ---------- */

type Benefit = { icon: string; title: string; text: string };

export function SocIntro({
  eyebrow,
  title,
  text,
  cta,
  heading,
  benefits,
  promo,
}: {
  eyebrow: string;
  title: string;
  /** One paragraph, or several. */
  text: string | string[];
  cta?: Cta;
  heading: string;
  benefits: Benefit[];
  promo: { title: string; text: string; cta: Cta };
}) {
  return (
    <section className="soc-intro">
      <div className="container">
        <Reveal className="soc-intro__head">
          <p className="soc-eyebrow">{eyebrow}</p>
          <h2 className="soc-intro__title">{title}</h2>
          {(Array.isArray(text) ? text : [text]).map((t) => (
            <p key={t} className="soc-intro__text">
              {t}
            </p>
          ))}
          {cta && <Btn cta={cta} variant="primary" size="md" />}
        </Reveal>
        <Reveal>
          <h2 className="soc-h2 soc-h2--center">{heading}</h2>
        </Reveal>
        <Stagger className="soc-benefits" stagger={0.06}>
          {benefits.map((b) => (
            <motion.article key={b.title} className="soc-benefit" variants={fadeUpChild}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(b.icon)} alt="" width={48} height={48} />
              <h3 className="soc-benefit__title">{b.title}</h3>
              <p className="soc-benefit__text">{b.text}</p>
            </motion.article>
          ))}
          <motion.article className="soc-benefit soc-benefit--promo" variants={fadeUpChild}>
            <div className="soc-benefit__promo-copy">
              <h3 className="soc-benefit__title">{promo.title}</h3>
              <p className="soc-benefit__text">{promo.text}</p>
            </div>
            <Btn cta={promo.cta} variant="ghost" size="md" />
          </motion.article>
        </Stagger>
      </div>
    </section>
  );
}

/* ---------- SOC Managed Security Services: two wide and three narrow service cards ---------- */

export type ServiceTone = "navy" | "soft" | "white" | "blue";

export type SocService = {
  icon: string;
  label: string;
  /** Optional service name between the label and the title. */
  name?: string;
  title: string;
  text: string;
  includes: string[];
  cta: Cta;
  tone: ServiceTone;
};

const ghostTones: ServiceTone[] = ["navy", "blue"];

function ServiceCard({ s, wide }: { s: SocService; wide?: boolean }) {
  const half = Math.ceil(s.includes.length / 2);
  const cols = wide ? [s.includes.slice(0, half), s.includes.slice(half)] : [s.includes];
  return (
    <motion.article
      className={`soc-service soc-service--${s.tone}${wide ? " soc-service--wide" : ""}`}
      variants={fadeUpChild}
    >
      <div className="soc-service__label">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset(s.icon)} alt="" width={wide ? 48 : 32} height={wide ? 48 : 32} />
        <span>{s.label}</span>
      </div>
      {s.name && <p className="soc-service__name">{s.name}</p>}
      <h3 className="soc-service__title">{s.title}</h3>
      <p className="soc-service__text">{s.text}</p>
      <p className="soc-service__includes">Includes:</p>
      <div className="soc-service__lists">
        {cols.map((col, i) => (
          <ul key={i} className="soc-dots">
            {col.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ))}
      </div>
      <Btn cta={s.cta} variant={ghostTones.includes(s.tone) ? "ghost" : "primary"} size="sm" />
    </motion.article>
  );
}

export function SocServices({ title, wide, narrow }: { title: string; wide: SocService[]; narrow: SocService[] }) {
  return (
    <section className="soc-services">
      <div className="container">
        <Reveal>
          <h2 className="soc-h2 soc-h2--center">{title}</h2>
        </Reveal>
        <Stagger className="soc-services__row soc-services__row--wide" stagger={0.08}>
          {wide.map((s) => (
            <ServiceCard key={s.label} s={s} wide />
          ))}
        </Stagger>
        <Stagger className="soc-services__row soc-services__row--narrow" stagger={0.08}>
          {narrow.map((s) => (
            <ServiceCard key={s.label} s={s} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ---------- Process: five numbered stages, the middle one featured with a photo ---------- */

type Stage = { title: string; text: string; outcome: string };

function StageCard({ n, stage }: { n: number; stage: Stage }) {
  return (
    <motion.article className="soc-stage" variants={fadeUpChild}>
      <div className="soc-stage__head">
        <span className="soc-stage__num">{n}</span>
        <h3 className="soc-stage__title">{stage.title}</h3>
      </div>
      <p className="soc-stage__text">{stage.text}</p>
      <div className="soc-outcome">
        <p className="soc-outcome__label">Outcome</p>
        <p className="soc-outcome__text">{stage.outcome}</p>
      </div>
    </motion.article>
  );
}

export function SocProcess({
  title,
  cta,
  stages,
  image,
}: {
  title: string;
  cta: Cta;
  stages: [Stage, Stage, Stage, Stage, Stage];
  /** caption is the dark label Figma keeps over the photo; some frames hide it. */
  image: { src: string; alt: string; caption?: string };
}) {
  const [s1, s2, s3, s4, s5] = stages;
  return (
    <section className="soc-process">
      <div className="container">
        <Reveal className="soc-process__head">
          <h2 className="soc-h2 soc-h2--light">{title}</h2>
          <Btn cta={cta} variant="primary" size="lg" />
        </Reveal>
        <Stagger className="soc-process__grid" stagger={0.08}>
          <div className="soc-process__col">
            <StageCard n={1} stage={s1} />
            <StageCard n={2} stage={s2} />
          </div>
          <motion.article className="soc-stage soc-stage--feature" variants={fadeUpChild}>
            <div className="soc-stage__media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(image.src)} alt={image.alt} width={360} height={339} loading="lazy" />
              {/* Figma keeps this dark caption over the photo. */}
              {image.caption && (
                <span className="soc-stage__caption" aria-hidden="true">
                  {image.caption}
                </span>
              )}
            </div>
            <div className="soc-stage__body">
              <div className="soc-stage__head">
                <span className="soc-stage__num">3</span>
                <h3 className="soc-stage__title">{s3.title}</h3>
              </div>
              <p className="soc-stage__text">{s3.text}</p>
            </div>
            <div className="soc-outcome">
              <p className="soc-outcome__label">Outcome</p>
              <p className="soc-outcome__text">{s3.outcome}</p>
            </div>
          </motion.article>
          <div className="soc-process__col">
            <StageCard n={4} stage={s4} />
            <StageCard n={5} stage={s5} />
          </div>
        </Stagger>
      </div>
    </section>
  );
}

/* ---------- Comparison table ---------- */

export function SocCompare({
  title,
  text,
  head,
  rows,
  cta,
}: {
  title: string;
  text: string;
  head: [string, string];
  rows: [string, string][];
  cta: Cta;
}) {
  return (
    <section className="soc-compare">
      <div className="container">
        <Reveal className="soc-head soc-head--compare">
          <h2 className="soc-h2 soc-h2--center">{title}</h2>
          <p className="soc-head__text">{text}</p>
        </Reveal>
        <Reveal className="soc-table-wrap">
          <table className="soc-table">
            <thead>
              <tr>
                <th scope="col">{head[0]}</th>
                <th scope="col">{head[1]}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([a, b]) => (
                <tr key={a}>
                  <td>{a}</td>
                  <td>{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
        <Reveal className="soc-compare__cta">
          <Btn cta={cta} variant="primary" size="md" />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Use cases ---------- */

export function SocUseCases({
  title,
  text,
  cases,
  banner,
  cta,
}: {
  title: string;
  text: string;
  cases: { title: string; text: string; dark?: boolean }[];
  banner?: { title: string; text: string; cta: Cta };
  /** Centred button under the cards, for use without the banner. */
  cta?: Cta;
}) {
  return (
    <section className="soc-cases">
      <div className="container">
        <Reveal className="soc-head soc-head--cases">
          <h2 className="soc-h2 soc-h2--center">{title}</h2>
          <p className="soc-head__text">{text}</p>
        </Reveal>
        <Stagger className="soc-cases__grid" stagger={0.06}>
          {cases.map((c) => (
            <motion.article key={c.title} className={`soc-case${c.dark ? " soc-case--dark" : ""}`} variants={fadeUpChild}>
              <h3 className="soc-case__title">{c.title}</h3>
              <p className="soc-case__text">{c.text}</p>
            </motion.article>
          ))}
          {banner && (
            <motion.article className="soc-case soc-case--banner" variants={fadeUpChild}>
              <h3 className="soc-case__banner-title">{banner.title}</h3>
              <div className="soc-case__banner-row">
                <p className="soc-case__text">{banner.text}</p>
                <Btn cta={banner.cta} variant="ghost" size="md" />
              </div>
            </motion.article>
          )}
        </Stagger>
        {cta && (
          <Reveal className="soc-compare__cta">
            <Btn cta={cta} variant="primary" size="md" />
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ---------- Why Folio3 ---------- */

export function SocWhy({
  eyebrow,
  title,
  paragraphs,
  cta,
  highlight,
  stats,
  footer,
}: {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  cta?: Cta;
  highlight: { title: string; text: string };
  stats?: { value: string; label: string; tone: "blue" | "red" }[];
  footer: { title: string; text: string };
}) {
  return (
    <section className="soc-why">
      <div className="container soc-why__inner">
        <Reveal className="soc-why__copy">
          <div className="soc-why__heading">
            <p className="soc-eyebrow">{eyebrow}</p>
            <h2 className="soc-h2 soc-why__title">{title}</h2>
          </div>
          {paragraphs.map((p) => (
            <p key={p} className="soc-why__text">
              {p}
            </p>
          ))}
          {cta && <Btn cta={cta} variant="primary" size="md" />}
        </Reveal>
        <Stagger className="soc-why__cards" stagger={0.08}>
          <motion.div className="soc-why__highlight" variants={fadeUpChild}>
            <h3 className="soc-why__highlight-title">{highlight.title}</h3>
            <p className="soc-why__small">{highlight.text}</p>
          </motion.div>
          {stats && stats.length > 0 && (
          <div className="soc-why__stats">
            {stats.map((s) => (
              <motion.div key={s.label} className="soc-why__stat" variants={fadeUpChild}>
                <p className={`soc-why__value soc-why__value--${s.tone}`}>{s.value}</p>
                <p className="soc-why__label">{s.label}</p>
              </motion.div>
            ))}
          </div>
          )}
          <motion.div className="soc-why__footer" variants={fadeUpChild}>
            <h3 className="soc-why__footer-title">{footer.title}</h3>
            <p className="soc-why__small">{footer.text}</p>
          </motion.div>
        </Stagger>
      </div>
    </section>
  );
}

/* ---------- Closing call to action ---------- */

export function SocClosing({
  title,
  text,
  primary,
  secondary,
  note,
}: {
  title: string;
  text: string;
  primary: Cta;
  secondary?: Cta;
  note?: string;
}) {
  return (
    <section className="soc-closing">
      <div className="container">
        <Reveal className="soc-case soc-case--banner soc-closing__card">
          <h2 className="soc-closing__title">{title}</h2>
          <p className="soc-case__text">{text}</p>
          <div className="soc-closing__actions">
            <Btn cta={primary} variant="yellow" size="md" />
            {secondary && <Btn cta={secondary} variant="ghost" size="md" />}
          </div>
          {note && <p className="soc-closing__note">{note}</p>}
        </Reveal>
      </div>
    </section>
  );
}
