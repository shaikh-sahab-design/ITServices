"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Stagger, fadeUpChild } from "../motion";
import { asset } from "@/lib/asset";

export type CaseCard = {
  logo: { src: string; alt: string; w: number; h: number };
  sector: string;
  image: string;
  title: string;
  text: string;
  tags: string[];
  href: string;
};

/** Three-up grid of case study cards from the Case Studies page. */
export function CaseGrid({ cards }: { cards: CaseCard[] }) {
  return (
    <section className="case-grid">
      <Stagger className="container case-grid__inner" stagger={0.08}>
        {cards.map((c) => (
          <motion.article key={c.title} className="case-tile" variants={fadeUpChild}>
            <div className="case-tile__body">
              <div className="case-tile__head">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(c.logo.src)} alt={c.logo.alt} width={c.logo.w} height={c.logo.h} loading="lazy" />
                <p className="pill-tag pill-tag--blue">{c.sector}</p>
              </div>
              <div className="case-tile__media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(c.image)} alt="" width={364} height={200} loading="lazy" />
              </div>
              <div className="case-tile__copy">
                <h2 className="case-tile__title">{c.title}</h2>
                <p className="case-tile__text">{c.text}</p>
              </div>
              <ul className="case-tile__tags">
                {c.tags.map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <Link href={c.href} className="btn btn--primary btn--md case-tile__cta">
              Read Case Study
            </Link>
          </motion.article>
        ))}
      </Stagger>
    </section>
  );
}
