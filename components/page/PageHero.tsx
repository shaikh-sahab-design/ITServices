"use client";

import { motion } from "framer-motion";
import { EASE_OUT_QUINT } from "../motion";

type Action = { label: string; href: string; variant: "primary" | "ghost" };

type Props = {
  image: string;
  /** Lines of the H1. Lines after the first are red, as in the Figma heroes. */
  title: string[];
  lede: React.ReactNode;
  actions: Action[];
  /** Where the navy overlay starts fading and where it is gone, in % of hero width (from the Figma gradient). */
  fade?: [number, number];
  /** Overlay colour as "r, g, b". */
  tint?: string;
  /** Width of the text column in px, as set in Figma. */
  copyWidth?: number;
};

const line = (i: number) => ({
  initial: { y: "100%" },
  animate: { y: 0 },
  transition: { duration: 0.7, ease: EASE_OUT_QUINT, delay: 0.1 + i * 0.08 },
});

/** Dark photo hero used by the inner pages (Services, About, Contact, service pages). */
export function PageHero({ image, title, lede, actions, fade = [30.9, 80.2], tint = "6, 19, 51", copyWidth = 873 }: Props) {
  return (
    <section
      className="page-hero"
      style={
        {
          "--hero-img": `url(${image})`,
          "--tint": tint,
          "--fade-from": `${fade[0]}%`,
          "--fade-to": `${fade[1]}%`,
          "--copy-w": `${copyWidth}px`,
        } as React.CSSProperties
      }
    >
      <div className="container page-hero__inner">
        <div className="page-hero__copy">
          <h1 className="page-hero__title">
            {title.map((t, i) => (
              <span key={t} className="line-mask">
                <motion.span className={i > 0 ? "t-red" : undefined} {...line(i)}>
                  {t}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            className="page-hero__lede"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT_QUINT, delay: 0.3 }}
          >
            {lede}
          </motion.p>
        </div>
        <motion.div
          className="page-hero__actions"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT_QUINT, delay: 0.4 }}
        >
          {actions.map((a) => (
            <a key={a.label} href={a.href} className={`btn btn--${a.variant}`}>
              {a.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
