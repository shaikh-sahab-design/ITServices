"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { Reveal, Stagger, fadeUpChild } from "../motion";
import type { IconCard } from "./IconCards";
import { asset } from "@/lib/asset";

type Props = {
  title: string;
  lede: string;
  cards: IconCard[];
  /** Show prev/next arrows and let the row scroll past the right edge, as in the Figma carousel. */
  arrows?: boolean;
};

/** Left-aligned heading with a row of outline icon cards that bleeds off the right edge. */
export function CardRail({ title, lede, cards, arrows }: Props) {
  const track = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const step = (el.querySelector(".rail__card")?.getBoundingClientRect().width ?? 316) + 20;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="rail">
      <div className="container rail__head">
        <Reveal className="rail__intro">
          <h2 className="icon-cards__title">{title}</h2>
          <p className="rail__lede">{lede}</p>
        </Reveal>
        {arrows && (
          <div className="rail__arrows">
            <button type="button" className="rail__arrow" aria-label="Previous" onClick={() => scroll(-1)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset("/icons/arrow-prev.svg")} alt="" width={48} height={48} />
            </button>
            <button type="button" className="rail__arrow" aria-label="Next" onClick={() => scroll(1)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset("/icons/arrow-next.svg")} alt="" width={48} height={48} />
            </button>
          </div>
        )}
      </div>
      <div className="rail__viewport" ref={track}>
        <Stagger className="rail__track" stagger={0.06}>
          {cards.map((c) => (
            <motion.article key={c.title} className="icon-card rail__card" variants={fadeUpChild}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="icon-card__icon" src={asset(c.icon)} alt="" width={48} height={48} />
              <div className="icon-card__copy">
                <h3 className="icon-card__title">{c.title}</h3>
                <p className="icon-card__text">{c.text}</p>
              </div>
            </motion.article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
