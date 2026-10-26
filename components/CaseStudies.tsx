"use client";

import { motion } from "framer-motion";
import { Reveal, Stagger, fadeUpChild } from "./motion";

const CASES = [
  {
    logo: "/images/client-arcom.png",
    logoW: 211,
    alt: "Arcom IT",
    mark: "/images/case-arcom-mark.png",
    title: "Scaling Multi-Customer MSP Operations",
    body: "Arcom IT needed additional technical capacity to support 35+ customer environments without compromising service quality.",
  },
  {
    logo: "/images/client-io-solution.png",
    logoW: 168,
    alt: "IO Solution",
    mark: "/images/case-io-mark.png",
    title: "Modernizing IT Operations Across Multiple Locations",
    body: "The client needed to improve IT support and infrastructure management across a growing, distributed environment.",
  },
  {
    logo: "/images/client-activecomply.png",
    logoW: 263,
    alt: "ActiveComply",
    mark: "/images/case-activecomply-mark.png",
    title: "Scaling Multi-Customer MSP Operations",
    body: "Arcom IT needed additional technical capacity to support 35+ customer environments without compromising service quality.",
  },
  {
    logo: "/images/client-opportune.png",
    logoW: 154,
    alt: "Opportune",
    mark: "/images/case-opportune-mark.png",
    title: "Managed IT,  Managed Security & Infrastructure Operations",
    body: "Opportune required additional IT capacity to support its growing Microsoft 365, endpoint, infrastructure, and security environment while improving security visibility, compliance readiness, and technology governance.",
  },
];

export function CaseStudies() {
  return (
    <section className="section container" id="case-studies">
      <Reveal className="section-head section-head--wide">
        <h2 className="h-display">Client Success Story</h2>
        <p className="lede">
          See how Folio3 Managed IT works alongside businesses to solve complex IT challenges and strengthen
          day-to-day operations.
        </p>
      </Reveal>
      <Stagger className="cases" stagger={0.1}>
        {CASES.map((c, i) => (
          <motion.a href="#" key={i} className="case-card" variants={fadeUpChild}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="case-card__mark" src={c.mark} alt="" loading="lazy" />
            <div className="case-card__body">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="case-card__logo" src={c.logo} alt={c.alt} width={c.logoW} height={50} loading="lazy" />
              <div className="case-card__copy">
                <h3 className="case-card__title">{c.title}</h3>
                <p className="case-card__text">{c.body}</p>
              </div>
            </div>
          </motion.a>
        ))}
      </Stagger>
    </section>
  );
}
