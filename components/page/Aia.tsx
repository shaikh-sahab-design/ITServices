"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal, Stagger, fadeUpChild } from "../motion";
import { asset } from "@/lib/asset";

type Cta = { label: string; href: string };

function Btn({ cta, tone = "primary" }: { cta: Cta; tone?: "primary" | "yellow" }) {
  return (
    <Link href={cta.href} className={`btn btn--${tone}`}>
      {cta.label}
    </Link>
  );
}

/* ---------- AI exposure: intro copy beside the numbered "difficult to know" box ---------- */

export function AiaExposure({
  title,
  lead,
  text,
  cta,
  box,
}: {
  title: string;
  lead: string;
  text?: string;
  cta: Cta;
  box: { title: string; items: string[] };
}) {
  return (
    <section className="aia-exposure">
      <div className="container aia-split aia-split--center">
        <Reveal className="aia-exposure__copy">
          <h2 className="aia-h2">{title}</h2>
          <p className="aia-lead">{lead}</p>
          {text && <p className="aia-text">{text}</p>}
          <Btn cta={cta} />
        </Reveal>
        <Reveal className="aia-exposure__box" delay={0.1}>
          <p className="aia-lead">{box.title}</p>
          <ol className="aia-numbered">
            {box.items.map((item, i) => (
              <li key={item}>
                <span className="aia-numbered__num">{String(i + 1).padStart(2, "0")}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- What is an AI Security Assessment: definition and the dark goal band ---------- */

export function AiaDefinition({
  title,
  lead,
  paragraphs,
  band,
}: {
  title: string;
  lead: string;
  paragraphs: string[];
  band: { title: string; text: string; cta: Cta };
}) {
  return (
    <section className="aia-definition">
      <div className="container">
        <div className="aia-split">
          <Reveal className="aia-stack aia-stack--20 aia-col-556">
            <h2 className="aia-h2">{title}</h2>
            <p className="aia-lead">{lead}</p>
          </Reveal>
          <Reveal className="aia-stack aia-stack--20 aia-col-664" delay={0.1}>
            {paragraphs.map((p) => (
              <p key={p} className="aia-text">
                {p}
              </p>
            ))}
          </Reveal>
        </div>
        <Reveal className="cta-band cta-band--strip aia-definition__band">
          <div className="cta-band__copy">
            <p className="cta-band__title">{band.title}</p>
            <p className="cta-band__text">{band.text}</p>
          </div>
          <Btn cta={band.cta} tone="yellow" />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Why assess: five numbered reasons as ruled rows ---------- */

export function AiaWhy({
  title,
  aside,
  cta,
  rows,
}: {
  title: string;
  aside: string;
  cta: Cta;
  rows: { title: string; text: string }[];
}) {
  return (
    <section className="aia-why">
      <div className="container">
        <div className="aia-split aia-why__head">
          <Reveal className="aia-why__title-col">
            <h2 className="aia-h2">{title}</h2>
          </Reveal>
          <Reveal className="aia-stack aia-stack--20 aia-why__aside" delay={0.1}>
            <p className="aia-lead aia-lead--muted">{aside}</p>
            <Btn cta={cta} />
          </Reveal>
        </div>
        <Stagger className="aia-rows" stagger={0.06}>
          {rows.map((r, i) => (
            <motion.div key={r.title} className="aia-row" variants={fadeUpChild}>
              <span className="aia-row__num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="aia-row__title">{r.title}</h3>
              <p className="aia-row__text">{r.text}</p>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ---------- Coverage: six area cards with focus lists ---------- */

type Area = { label?: string; title: string; text: string; focus: string[] };

export function AiaCoverage({
  title,
  cta,
  aside,
  areas,
}: {
  title: string;
  cta: Cta;
  aside: { title: string; text: string };
  areas: Area[];
}) {
  return (
    <section className="aia-coverage">
      <div className="container">
        <div className="aia-split aia-coverage__head">
          <Reveal className="aia-stack aia-stack--20 aia-coverage__title-col">
            <h2 className="aia-h2">{title}</h2>
            <Btn cta={cta} />
          </Reveal>
          <Reveal className="aia-stack aia-stack--10 aia-coverage__aside" delay={0.1}>
            <p className="aia-lead">{aside.title}</p>
            <p className="aia-text">{aside.text}</p>
          </Reveal>
        </div>
        <Stagger className="aia-areas" stagger={0.06}>
          {areas.map((a) => (
            <motion.article key={a.title} className="aia-area" variants={fadeUpChild}>
              {a.label && <p className="aia-area__label">{a.label}</p>}
              <h3 className="aia-area__title">{a.title}</h3>
              <p className="aia-area__text">{a.text}</p>
              <p className="aia-area__text">Focus Areas:</p>
              <ul className="aia-area__list">
                {a.focus.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ---------- Process: copy on the left, five checked steps with outcomes on the right ---------- */

type Step = { title: string; text: string; outcome: string };

export function AiaProcess({
  eyebrow,
  title,
  lead,
  cta,
  steps,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  cta: Cta;
  steps: Step[];
}) {
  return (
    <section className="aia-process">
      <div className="container aia-process__inner">
        <Reveal className="aia-process__copy">
          {eyebrow && <p className="aia-process__eyebrow">{eyebrow}</p>}
          <h2 className="aia-h2 aia-h2--light">{title}</h2>
          {lead && <p className="aia-lead aia-lead--light">{lead}</p>}
          <Btn cta={cta} />
        </Reveal>
        <Stagger className="aia-steps" stagger={0.1}>
          {steps.map((s, i) => (
            <motion.div key={s.title} className="aia-step" variants={fadeUpChild}>
              <div className="aia-step__rail" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset("/icons/aia-check.svg")} alt="" width={24} height={24} />
                {i < steps.length - 1 && <span className="aia-step__line" />}
              </div>
              <div className="aia-step__body">
                <h3 className="aia-step__title">
                  {i + 1}. {s.title}
                </h3>
                <p className="aia-step__text">{s.text}</p>
                <div className="aia-step__outcome">
                  <p className="aia-step__outcome-label">Outcome</p>
                  <p className="aia-step__outcome-text">{s.outcome}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ---------- Security throughout AI adoption: four stage cards ---------- */

export function AiaAdoption({
  title,
  text,
  stages,
  cta,
}: {
  title: string;
  text: string;
  stages: { icon: string; title: string; text: string }[];
  cta: Cta;
}) {
  return (
    <section className="aia-adoption">
      <div className="container">
        <Reveal className="aia-adoption__head">
          <h2 className="aia-h2 aia-h2--center">{title}</h2>
          <p className="aia-row__text aia-adoption__lede">{text}</p>
        </Reveal>
        <Stagger className={`aia-stages${stages.length === 3 ? " aia-stages--3" : ""}`} stagger={0.08}>
          {stages.map((s) => (
            <motion.article key={s.title} className="aia-stage" variants={fadeUpChild}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(s.icon)} alt="" width={48} height={48} />
              <h3 className="aia-stage__title">{s.title}</h3>
              <p className="aia-area__text">{s.text}</p>
            </motion.article>
          ))}
        </Stagger>
        <Reveal className="aia-adoption__cta">
          <Btn cta={cta} />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Audiences: who should consider an assessment ---------- */

export function AiaAudiences({
  title,
  cta,
  items,
}: {
  title: string;
  cta: Cta;
  items: { title: string; text: string }[];
}) {
  return (
    <section className="aia-audiences">
      <div className="container aia-audiences__inner">
        <Reveal className="aia-stack aia-stack--32 aia-audiences__copy">
          <h2 className="aia-h2">{title}</h2>
          <Btn cta={cta} />
        </Reveal>
        <Stagger className="aia-audiences__list" stagger={0.08}>
          {items.map((it) => (
            <motion.article key={it.title} className="aia-audience" variants={fadeUpChild}>
              <h3 className="aia-lead">{it.title}</h3>
              <p className="aia-row__text">{it.text}</p>
            </motion.article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
