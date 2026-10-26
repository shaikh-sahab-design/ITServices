"use client";

import { motion } from "framer-motion";
import { EASE_OUT_QUINT, Reveal, Stagger, fadeUpChild } from "../motion";
import { asset } from "@/lib/asset";
import type { CaseStudy } from "@/lib/case-studies";

/** Five white cards with the client, partner, size, industry and region. */
export function CaseFacts({ facts }: { facts: CaseStudy["facts"] }) {
  const withIcon = [
    { label: "Company Size", icon: "/icons/cs-fact-size.svg", value: facts.size },
    { label: "Industry", icon: "/icons/cs-fact-industry.svg", value: facts.industry },
    { label: "Region", icon: "/icons/cs-fact-region.svg", value: facts.region },
  ];
  return (
    <section className="case-facts">
      <Stagger className="container case-facts__row" stagger={0.06}>
        <motion.div className="case-fact" variants={fadeUpChild}>
          <p className="case-fact__label">Company</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset(facts.company.src)} alt={facts.company.alt} width={facts.company.w} height={facts.company.h} />
        </motion.div>
        <motion.div className="case-fact" variants={fadeUpChild}>
          <p className="case-fact__label">Partner</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/images/logo-nav.png")} alt="Folio3 Managed IT & Cybersecurity Services" width={296} height={36} />
        </motion.div>
        {withIcon.map((f) => (
          <motion.div key={f.label} className="case-fact" variants={fadeUpChild}>
            <p className="case-fact__label">{f.label}</p>
            <div className="case-fact__value">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(f.icon)} alt="" width={48} height={48} />
              <span>{f.value}</span>
            </div>
          </motion.div>
        ))}
      </Stagger>
    </section>
  );
}

/** Centred heading with grey service pills. */
export function CaseServices({ services }: { services: NonNullable<CaseStudy["services"]> }) {
  return (
    <section className="case-services">
      <div className="container">
        <Reveal className="case-head">
          <h2 className="case-head__title">{services.title}</h2>
          <p className="case-head__lede">{services.lede}</p>
        </Reveal>
        <Stagger className="case-services__pills" stagger={0.05}>
          {services.pills.map((p) => (
            <motion.span key={p} className="chip chip--lg" variants={fadeUpChild}>
              {p}
            </motion.span>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export function CaseChallenge({ challenge }: { challenge: CaseStudy["challenge"] }) {
  return (
    <section className="case-challenge">
      <div className="container case-challenge__inner">
        <Reveal className="case-challenge__copy">
          <p className="case-kicker">THE CHALLENGE</p>
          <h2 className="case-challenge__title">{challenge.title}</h2>
          <div className="case-challenge__body">
            {challenge.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>
        <Stagger className="case-challenge__grid" stagger={0.08}>
          {challenge.cards.map((c) => (
            <motion.article key={c.title} className="value-card" variants={fadeUpChild}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(c.icon)} alt="" width={48} height={48} />
              <div className="value-card__copy">
                <h3 className="value-card__title">{c.title}</h3>
                <p className="value-card__text">{c.text}</p>
              </div>
            </motion.article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export function CaseSolution({ solution }: { solution: CaseStudy["solution"] }) {
  return (
    <section className="case-solution">
      <div className="container case-solution__inner">
        <Reveal className="case-solution__intro">
          <div className="case-solution__box">
            <p className="case-kicker case-kicker--title">The Solution</p>
            <h2 className="case-solution__title">{solution.title}</h2>
          </div>
          <p className="case-solution__body">{solution.body}</p>
        </Reveal>
        <motion.div
          className="case-solution__media"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE_OUT_QUINT }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset(solution.image)} alt="" width={428} height={634} loading="lazy" />
        </motion.div>
        <Stagger className="case-solution__points" stagger={0.06}>
          {solution.points.map((p) => (
            <motion.div key={p.title} className="case-point" variants={fadeUpChild}>
              <p className="case-point__title">{p.title}</p>
              <p className="case-point__text">{p.text}</p>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export function CaseStack({ logos }: { logos: NonNullable<CaseStudy["stack"]> }) {
  return (
    <section className="case-stack">
      <div className="container">
        <Reveal className="case-head">
          <h2 className="case-head__title">Technology Stack</h2>
        </Reveal>
        <Stagger className="case-stack__logos" stagger={0.04}>
          {logos.map((l) => (
            <motion.div key={l.alt} className="case-stack__pill" variants={fadeUpChild}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(l.src)} alt={l.alt} width={l.w} height={l.h} loading="lazy" />
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export function CaseOutcomes({ outcomes, flushBottom }: { outcomes: CaseStudy["outcomes"]; flushBottom?: boolean }) {
  return (
    <section className={`case-outcomes${flushBottom ? " case-outcomes--before-quote" : ""}`}>
      <div className="container">
        <Reveal className="case-head case-head--outcomes">
          <p className="soft-pill">BUSINESS OUTCOMES</p>
          <h2 className="case-head__title case-head__title--caps">
            {outcomes.title.split("\n").map((line, i) => (
              <span key={line}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h2>
          <p className="case-head__lede">{outcomes.lede}</p>
        </Reveal>
        <Stagger className="case-outcomes__grid" stagger={0.08}>
          {outcomes.cards.map((c) => (
            <motion.article key={c.title} className="value-card" variants={fadeUpChild}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(c.icon)} alt="" width={48} height={48} />
              <div className="value-card__copy">
                <h3 className="value-card__title">{c.title}</h3>
                <ul className="case-bullets">
                  {c.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export function CaseQuote({ testimonial }: { testimonial: NonNullable<CaseStudy["testimonial"]> }) {
  return (
    <section className="testimonial case-quote">
      <div className="container">
        <Reveal className="testimonial__head case-quote__head">
          <p className="soft-pill">Trusted IT Management Support</p>
          <h2 className="values__title">What Our Clients Say</h2>
          <p className="values__text">{testimonial.lede}</p>
        </Reveal>
        <Reveal className="case-quote__card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="case-quote__mark" src={asset(testimonial.watermark)} alt="" width={418} height={355} loading="lazy" />
          <figure className="case-quote__body">
            <p className="case-quote__heading">{testimonial.heading}</p>
            <blockquote className="case-quote__text">
              {testimonial.quotes.map((q) => (
                <p key={q}>{q}</p>
              ))}
            </blockquote>
            <figcaption>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(testimonial.logo.src)} alt={testimonial.logo.alt} width={testimonial.logo.w} height={testimonial.logo.h} loading="lazy" />
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
