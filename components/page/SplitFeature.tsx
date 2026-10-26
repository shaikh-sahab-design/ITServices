"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EASE_OUT_QUINT, Reveal } from "../motion";

type Props = {
  title: string;
  /** Two bullet columns, as laid out in Figma. */
  columns: string[][];
  cta?: { label: string; href: string };
  image: { src: string; alt: string };
  imageSide?: "left" | "right";
  tone?: "white" | "soft";
  /** Figma's first split section sits directly under the previous one with no top padding. */
  flushTop?: boolean;
};

/** Heading, two bullet columns and a button beside a notched photo. */
export function SplitFeature({ title, columns, cta, image, imageSide = "right", tone = "white", flushTop }: Props) {
  return (
    <section
      className={`split split--${tone}${flushTop ? " split--flush" : ""}`}
      data-image={imageSide}
    >
      <div className="container split__inner">
        <Reveal className="split__copy">
          <h2 className="split__title">{title}</h2>
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
        </motion.div>
      </div>
    </section>
  );
}
