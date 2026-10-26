"use client";

import { motion } from "framer-motion";
import { Reveal, Stagger, fadeUpChild } from "./motion";
import { asset } from "@/lib/asset";

const SERVICES = [
  {
    key: "it",
    title: ["Managed IT", "Services"],
    tags: ["Reliable technology", "Infrastructure Built for Growth", "Expert Support"],
    img: "/images/service-managed-it.png",
    alt: "Monitor showing a network operations dashboard",
  },
  {
    key: "security",
    title: ["Managed Security"],
    tags: ["Proactive Monitoring", "Continuous Protection", "Response Against Evolving Threats"],
    img: "/images/service-managed-security.png",
    alt: "Security appliance displaying a glowing shield",
  },
  {
    key: "ai",
    title: ["AI Security"],
    tags: ["AI Adoption With Governance", "security built in", "Protection"],
    img: "/images/service-ai-security.png",
    alt: "Robotic hand holding a shield with a check mark",
  },
];

export function Services() {
  return (
    <section className="section container" id="services">
      <Reveal className="section-head">
        <h2 className="h-display">Managed Services That Fit The Way You Operate</h2>
        <p className="lede">One Partner. Three Connected Technology Priorities</p>
      </Reveal>

      <Stagger className="services" stagger={0.1}>
        {SERVICES.map((s) => (
          <motion.a href="#" key={s.key} className={`service-card service-card--${s.key}`} variants={fadeUpChild}>
            <div className="service-card__body">
              <h3 className="service-card__title">
                {s.title.map((line, i) => (
                  <span key={line}>
                    {line}
                    {i < s.title.length - 1 && <br />}
                  </span>
                ))}
              </h3>
              <ul className="service-card__tags">
                {s.tags.map((t) => (
                  <li key={t} className="tag">{t}</li>
                ))}
              </ul>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="service-card__img" src={asset(s.img)} alt={s.alt} loading="lazy" />
          </motion.a>
        ))}
      </Stagger>
    </section>
  );
}
