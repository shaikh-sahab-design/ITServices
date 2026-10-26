"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./motion";
import { asset } from "@/lib/asset";

const CERTS = [
  { src: "/images/cert-microsoft-gold.png", alt: "Microsoft Gold Partner", w: 132, h: 40, pill: 185 },
  { src: "/images/cert-aws.png", alt: "AWS Partner, Advanced Tier Services", w: 46, h: 46, pill: 110 },
  { src: "/images/cert-azure-msp.png", alt: "Microsoft Partner, Azure Expert MSP", w: 71, h: 40, pill: 129 },
  { src: "/images/cert-iso.png", alt: "ISO 27701 certified", w: 40, h: 40, pill: 90 },
  { src: "/images/cert-google-cloud.png", alt: "Google Cloud Partner", w: 118, h: 40, pill: 140 },
  { src: "/images/cert-hipaa.png", alt: "HIPAA compliant", w: 84, h: 40, pill: 126 },
  { src: "/images/cert-soc2.png", alt: "SOC 2 Type II certified", w: 89, h: 50, pill: 129 },
];

export function TrustStrip() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  // Progress runs from the moment the whole strip is in view (its Figma resting
  // layout) until it scrolls off the top, so it never shifts before you scroll past it.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["end end", "end start"] });
  // Two layers at different speeds: the heading rises faster than the page, the logos lag behind.
  const introY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -70]);
  const logosY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 35]);

  // The row is rendered twice so the CSS marquee can loop seamlessly.
  const row = (hidden: boolean) => (
    <ul className="marquee__row" aria-hidden={hidden || undefined}>
      {CERTS.map((c) => (
        <li key={c.src} className="cert-pill" style={{ width: c.pill }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset(c.src)} alt={hidden ? "" : c.alt} width={c.w} height={c.h} loading="lazy" />
        </li>
      ))}
    </ul>
  );

  return (
    <section ref={sectionRef} className="trust" aria-label="Trust and certification">
      <motion.div className="trust__layer" style={{ y: introY }}>
        <Reveal className="trust__intro">
          <h2 className="trust__title">TRUST / CERTIFICATION</h2>
          <p className="trust__sub">
            Trusted by <strong className="t-red">500+</strong> Organisations · Certified Partners
          </p>
        </Reveal>
      </motion.div>
      <div className="trust__divider" aria-hidden="true" />
      <motion.div className="marquee" style={{ y: logosY }}>
        <div className="marquee__track">
          {row(false)}
          {row(true)}
        </div>
      </motion.div>
    </section>
  );
}
