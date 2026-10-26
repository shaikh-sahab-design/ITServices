"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EASE_OUT_QUINT, Reveal } from "../motion";

/** Accent colours used by tags and stat boxes in the Figma service blocks. */
export type Accent = "yellow" | "red" | "blue" | "green" | "purple" | "grey";

type Props = {
  title: React.ReactNode;
  /** Small coloured pill above the title. */
  tag?: { label: string; accent: Accent };
  lede?: string;
  /** Two bullet columns, as laid out in Figma. */
  columns: string[][];
  cta?: { label: string; href: string };
  image: { src: string; alt: string };
  /** Coloured stat box that sits in the image's cut-out corner. */
  stat?: { icon: string; value: string; label: string; accent: Accent };
  imageSide?: "left" | "right";
  tone?: "white" | "soft";
  /** Figma's first split section on the Services page sits directly under the cards with no top padding. */
  flushTop?: boolean;
};

/** Heading, two bullet columns and a button beside a notched photo. */
export function SplitFeature({
  title,
  tag,
  lede,
  columns,
  cta,
  image,
  stat,
  imageSide = "right",
  tone = "white",
  flushTop,
}: Props) {
  return (
    <section
      className={`split split--${tone}${flushTop ? " split--flush" : ""}${tag ? " split--detailed" : ""}`}
      data-image={imageSide}
    >
      <div className="container split__inner">
        <Reveal className="split__copy">
          {tag && <p className={`pill-tag pill-tag--${tag.accent}`}>{tag.label}</p>}
          <div className="split__heading">
            <h2 className="split__title">{title}</h2>
            {lede && <p className="split__lede">{lede}</p>}
          </div>
          <div className="split__lists">
            {columns.map((col, i) => (
              <ul key={i} className="dot-list">
                {col.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ))}
          </div>
          {cta && (
            <Link href={cta.href} className="btn btn--primary btn--md">
              {cta.label}
            </Link>
          )}
        </Reveal>
        <motion.div
          className="split__media"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE_OUT_QUINT }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image.src} alt={image.alt} width={560} height={550} loading="lazy" />
          {stat && (
            <motion.div
              className={`stat-box stat-box--${stat.accent}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: EASE_OUT_QUINT, delay: 0.25 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="stat-box__icon" src={stat.icon} alt="" width={48} height={48} />
              <p className="stat-box__value">{stat.value}</p>
              <p className="stat-box__label">{stat.label}</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
