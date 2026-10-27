"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { EASE_OUT_QUINT, Reveal, Stagger, fadeUpChild } from "../motion";
import { asset } from "@/lib/asset";

/*
 * Building blocks for the sub-service detail pages (Network Design, Migration, SOC and the rest).
 * Each mirrors a section pattern that repeats across those Figma frames.
 */

type Cta = { label: string; href: string };
type Dot = "blue" | "yellow" | "red";

export function DetailCta({ cta, size = "sm" }: { cta: Cta; size?: "sm" | "md" }) {
  return (
    <Link href={cta.href} className={`btn btn--primary btn--${size} detail-cta`}>
      {cta.label}
    </Link>
  );
}

/** Two columns of dotted points. The first column holds the extra item when the count is odd. */
export function Bullets({ items, dot = "blue", columns = 2 }: { items: string[]; dot?: Dot; columns?: 1 | 2 }) {
  const split = columns === 2 ? Math.ceil(items.length / 2) : items.length;
  const cols = columns === 2 ? [items.slice(0, split), items.slice(split)] : [items];
  return (
    <div className={`bullets bullets--${dot}`}>
      {cols.map((col, i) => (
        <ul key={i} className="bullets__col">
          {col.map((t, j) => (
            <li key={`${t}-${j}`}>{t}</li>
          ))}
        </ul>
      ))}
    </div>
  );
}

/** "Example: ..." line, and an optional closing note, shown between the bullets and the outcome. */
export function Extras({ example, note, dark }: { example?: string; note?: string; dark?: boolean }) {
  const cls = dark ? "detail-card__text" : "detail-text";
  return (
    <>
      {note && <p className={cls}>{note}</p>}
      {example && (
        <p className={`${cls} detail-example`}>
          <strong>Example:</strong> {example}
        </p>
      )}
    </>
  );
}

/**
 * "Outcome" note. Figma uses a few surface colours and two text sizes for it,
 * so both are set per use rather than guessed from context.
 */
export type OutcomeTone = "white" | "soft" | "yellow" | "blue" | "dark";
export function Outcome({
  text,
  tone = "white",
  size = "md",
}: {
  text: string;
  tone?: OutcomeTone;
  /** sm: 14px grey. md: 15px. lg: 17px. */
  size?: "sm" | "md" | "lg";
}) {
  return (
    <div className={`outcome outcome--${tone} outcome--${size}`}>
      <p className="outcome__label">Outcome</p>
      <p className="outcome__text">{text}</p>
    </div>
  );
}

/** Heading and copy on the left, a blue box of benefits on the right. */
export function DefineSplit({
  title,
  paragraphs,
  cta,
  box,
}: {
  title: string;
  paragraphs: string[];
  cta?: Cta;
  box: { title: string; items: string[] };
}) {
  return (
    <section className="define">
      <div className="container define__inner">
        <Reveal className="define__copy">
          <h2 className="define__title">{title}</h2>
          {paragraphs.map((p) => (
            <p key={p} className="detail-text">
              {p}
            </p>
          ))}
          {cta && <DetailCta cta={cta} />}
        </Reveal>
        <Reveal className="define__box" delay={0.1}>
          <p className="define__box-title">{box.title}</p>
          <ul className="define__list">
            {box.items.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

type NumberCard = { title?: string; text: string };

/**
 * Numbered cards. "rail" scrolls sideways with arrows (white cards on grey);
 * "grid" is a fixed row of grey cards on white with an optional button beside the heading.
 */
export function NumberCards({
  title,
  cards,
  layout,
  cta,
  flushTop,
}: {
  title: string;
  cards: NumberCard[];
  layout: "rail" | "grid";
  cta?: Cta;
  flushTop?: boolean;
}) {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const step = (el.querySelector(".num-card")?.getBoundingClientRect().width ?? 307) + 20;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };
  const list = (
    <Stagger className={layout === "rail" ? "rail__track num-cards__track" : "num-cards__grid"} stagger={0.06}>
      {cards.map((c, i) => (
        <motion.article key={c.text} className="num-card" variants={fadeUpChild}>
          <p className="num-card__n">{String(i + 1).padStart(2, "0")}</p>
          <div className="num-card__copy">
            {c.title && <h3 className="num-card__title">{c.title}</h3>}
            <p className="num-card__text">{c.text}</p>
          </div>
        </motion.article>
      ))}
    </Stagger>
  );
  return (
    <section className={`num-cards num-cards--${layout}${flushTop ? " num-cards--flush" : ""}`}>
      <div className="container num-cards__head">
        <Reveal>
          <h2 className="detail-h2">{title}</h2>
        </Reveal>
        {layout === "rail" && (
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
        {cta && <DetailCta cta={cta} />}
      </div>
      {layout === "rail" ? (
        <div className="rail__viewport" ref={track}>
          {list}
        </div>
      ) : (
        <div className="container">{list}</div>
      )}
    </section>
  );
}

export type DetailCardData = {
  icon: string;
  /** Blue (or yellow on dark) label beside or above the title. */
  label: string;
  title: string;
  text: string;
  scope?: string;
  bullets: string[];
  outcome: { text: string; tone?: OutcomeTone; size?: "sm" | "md" | "lg" };
  cta: Cta;
  example?: string;
  note?: string;
};

/**
 * Service card with icon, label, title, copy, two bullet columns, outcome and button.
 * "stacked" puts the icon and label on a row above the title; "inline" sets the label
 * above the title, both beside the icon. "dark" is the navy card variant.
 */
export function DetailCard({
  card,
  header = "stacked",
  tone = "soft",
}: {
  card: DetailCardData;
  header?: "stacked" | "inline";
  tone?: "soft" | "dark";
}) {
  const icon = (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={asset(card.icon)} alt="" width={48} height={48} />
  );
  return (
    <motion.article className={`detail-card detail-card--${tone} detail-card--${header}`} variants={fadeUpChild}>
      {header === "stacked" ? (
        <>
          <div className="detail-card__id">
            {icon}
            <p className="detail-card__label">{card.label}</p>
          </div>
          <h3 className="detail-card__title">{card.title}</h3>
        </>
      ) : (
        <div className="detail-card__id">
          {icon}
          <div>
            <p className="detail-card__tag">{card.label}</p>
            <h3 className="detail-card__title">{card.title}</h3>
          </div>
        </div>
      )}
      <p className={tone === "dark" ? "detail-card__text" : "detail-text"}>{card.text}</p>
      {card.scope && <p className="detail-scope">{card.scope}</p>}
      <Bullets items={card.bullets} dot={tone === "dark" ? "yellow" : "blue"} />
      <Extras example={card.example} note={card.note} dark={tone === "dark"} />
      <Outcome {...card.outcome} tone={tone === "dark" ? "dark" : card.outcome.tone} />
      <DetailCta cta={card.cta} />
    </motion.article>
  );
}

/** Optional centred heading over two service cards. */
export function DetailPair({
  title,
  cards,
  header,
  tones = ["soft", "soft"],
  tight,
}: {
  title?: string;
  cards: [DetailCardData, DetailCardData];
  header?: "stacked" | "inline";
  tones?: ["soft" | "dark", "soft" | "dark"];
  /** Wider side gutter (80px) and 12px corners, as in the Figma segmentation row. */
  tight?: boolean;
}) {
  return (
    <section className={`detail-pair${tight ? " detail-pair--tight" : ""}`}>
      <div className="container">
        {title && (
          <Reveal className="detail-head">
            <h2 className="detail-h2">{title}</h2>
          </Reveal>
        )}
        <Stagger className="detail-pair__grid" stagger={0.08}>
          <DetailCard card={cards[0]} header={header} tone={tones[0]} />
          <DetailCard card={cards[1]} header={header} tone={tones[1]} />
        </Stagger>
      </div>
    </section>
  );
}

/** Centred heading, a white card of bold statements with an outcome, and a photo. */
export function ImageFeature({
  title,
  statements,
  outcome,
  cta,
  image,
  scope,
  bullets,
  example,
  note,
}: {
  title: string;
  statements: string[];
  scope?: string;
  bullets?: string[];
  example?: string;
  note?: string;
  outcome: string;
  cta: Cta;
  image: { src: string; alt: string };
}) {
  return (
    <section className="img-feature">
      <div className="container">
        <Reveal className="detail-head">
          <h2 className="detail-h2">{title}</h2>
        </Reveal>
        <div className="img-feature__row">
          <Reveal className="img-feature__card">
            <div className="img-feature__copy">
              {statements.map((s) => (
                <p key={s} className="img-feature__lead">
                  {s}
                </p>
              ))}
              {scope && <p className="detail-scope">{scope}</p>}
              {bullets && <Bullets items={bullets} />}
              <Extras example={example} note={note} />
              <Outcome text={outcome} tone="soft" size="lg" />
            </div>
            <DetailCta cta={cta} size="md" />
          </Reveal>
          <motion.div
            className="img-feature__media"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE_OUT_QUINT }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset(image.src)} alt={image.alt} width={596} height={410} loading="lazy" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export type PanelRow = {
  panel:
    | { kind: "photo"; image: { src: string; alt: string }; icon: string; caption: string }
    | { kind: "blue"; title: string; text: string };
  title?: string;
  text?: string;
  scope: string;
  bullets: string[];
  note?: string;
  outcome: { text: string; tone: OutcomeTone };
  cta: Cta;
};

/** Rows of a coloured panel beside a service description, split by a hairline. */
export function PanelRows({ rows }: { rows: PanelRow[] }) {
  return (
    <section className="panel-rows">
      <div className="container">
        {rows.map((r, i) => (
          <div key={i} className="panel-row">
            <Reveal className={`panel panel--${r.panel.kind}`}>
              {r.panel.kind === "photo" ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="panel__photo" src={asset(r.panel.image.src)} alt={r.panel.image.alt} width={440} height={242} loading="lazy" />
                  <div className="panel__caption">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={asset(r.panel.icon)} alt="" width={48} height={48} />
                    <p className="panel__caption-title">{r.panel.caption}</p>
                  </div>
                </>
              ) : (
                <>
                  <p className="panel__title">{r.panel.title}</p>
                  <p className="panel__text">{r.panel.text}</p>
                </>
              )}
            </Reveal>
            <Reveal className="panel-row__copy" delay={0.08}>
              {r.title && <h2 className="detail-h2">{r.title}</h2>}
              {r.text && <p className="detail-text">{r.text}</p>}
              <p className="detail-scope">{r.scope}</p>
              <Bullets items={r.bullets} />
              <Extras note={r.note} />
              <Outcome text={r.outcome.text} tone={r.outcome.tone} />
              <DetailCta cta={r.cta} />
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Full-width illustration. With a video (path without extension, shipped as .webm and .mp4), the image is its poster and the video loops silently. */
export function Infographic({
  src,
  alt,
  width,
  height,
  video,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  video?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <section className="infographic">
      <div className="container">
        <Reveal>
          {video ? (
            <video
              className="infographic__img infographic__video"
              poster={asset(src)}
              width={width}
              height={height}
              aria-label={alt}
              autoPlay={!reduce}
              controls={!!reduce}
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src={asset(`${video}.webm`)} type="video/webm" />
              <source src={asset(`${video}.mp4`)} type="video/mp4" />
            </video>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="infographic__img" src={asset(src)} alt={alt} width={width} height={height} loading="lazy" />
          )}
        </Reveal>
      </div>
    </section>
  );
}

/** Three-column comparison with the last column highlighted. */
export function CompareTable({
  title,
  head,
  rows,
  note,
  cta,
}: {
  title: string;
  head: [string, string, string];
  rows: [string, string, string][];
  note?: string;
  cta?: Cta;
}) {
  return (
    <section className="compare">
      <div className="container">
        <Reveal className="detail-head detail-head--40">
          <h2 className="detail-h2">{title}</h2>
        </Reveal>
        <Reveal className="compare__scroll">
          <table className="compare__table">
            <thead>
              <tr>
                {head.map((h) => (
                  <th key={h} scope="col">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([a, b, c]) => (
                <tr key={a}>
                  <th scope="row">{a}</th>
                  <td>{b}</td>
                  <td>{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
        {(note || cta) && (
          <Reveal className="compare__after">
            {note && <p className="detail-text">{note}</p>}
            {cta && <DetailCta cta={cta} size="md" />}
          </Reveal>
        )}
      </div>
    </section>
  );
}
