"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal, Stagger, fadeUpChild } from "./motion";
import { asset } from "@/lib/asset";

// Matches the Figma "On hover" spring on the card variants.
const FLIP_SPRING = { type: "spring", mass: 1, stiffness: 100, damping: 15 } as const;

const SERVICES = [
  {
    key: "it",
    title: ["Managed IT", "Services"],
    tags: ["Reliable technology", "Infrastructure Built for Growth", "Expert Support"],
    items: [
      "Managed IT Support",
      "Network & Infrastructure",
      "Migration Services",
      "Backup & Disaster Recovery",
      "IT Strategy & vCIO",
      "Database Management",
      "Identity & Access Management",
    ],
    img: "/images/service-managed-it.png",
    alt: "Monitor showing a network operations dashboard",
  },
  {
    key: "security",
    title: ["Managed Security"],
    tags: ["Proactive Monitoring", "Continuous Protection", "Response Against Evolving Threats"],
    items: [
      "Vulnerability Assessment & Penetration Testing",
      "Security Operations Center (SOC)",
      "Threat Detection & Incident Response",
      "Cloud Security",
      "Endpoint & Identity Security",
      "Security Compliance & Risk",
    ],
    img: "/images/service-managed-security.png",
    alt: "Security appliance displaying a glowing shield",
  },
  {
    key: "ai",
    title: ["AI Security"],
    tags: ["AI Adoption With Governance", "security built in", "Protection"],
    items: [
      "AI Security Assessment",
      "AI Governance & Risk",
      "AI Data Security",
      "AI Application & LLM Security",
      "AI Agent Security",
      "AI Red Teaming",
    ],
    img: "/images/service-ai-security.png",
    alt: "Robotic hand holding a shield with a check mark",
  },
];

type Service = (typeof SERVICES)[number];

function CardTitle({ s }: { s: Service }) {
  return (
    <h3 className="service-card__title">
      {s.title.map((line, i) => (
        <span key={line}>
          {line}
          {i < s.title.length - 1 && <br />}
        </span>
      ))}
    </h3>
  );
}

function ServiceCard({ s }: { s: Service }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.article
      className={`service-card service-card--${s.key}${open ? " is-open" : ""}`}
      variants={fadeUpChild}
      onHoverStart={() => setOpen(true)}
      onHoverEnd={() => setOpen(false)}
      onFocus={(e) => {
        // Keyboard focus opens the card; a tap is handled by onClick below.
        if (e.currentTarget.matches(":focus-visible")) setOpen(true);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
      onClick={(e) => {
        // Touch screens have no hover, so a tap toggles the card instead.
        if ((e.target as HTMLElement).closest("a")) return;
        if (window.matchMedia("(hover: none)").matches) setOpen((v) => !v);
      }}
      tabIndex={0}
      aria-expanded={open}
    >
      <motion.div className="service-card__inner" initial={false} animate={{ rotateY: open ? 180 : 0 }} transition={FLIP_SPRING}>
        <div className="service-card__face service-card__face--front" aria-hidden={open}>
          <div className="service-card__body">
            <CardTitle s={s} />
            <ul className="service-card__tags">
              {s.tags.map((t) => (
                <li key={t} className="tag">{t}</li>
              ))}
            </ul>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="service-card__img" src={asset(s.img)} alt={s.alt} loading="lazy" />
        </div>

        <div className="service-card__face service-card__face--back" aria-hidden={!open}>
          <div className="service-card__body">
            <CardTitle s={s} />
            <ul className="service-card__list">
              {s.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a href="#" className="service-card__cta" tabIndex={open ? 0 : -1}>
              View Service Details
            </a>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="service-card__img service-card__img--faded" src={asset(s.img)} alt="" loading="lazy" />
        </div>
      </motion.div>
    </motion.article>
  );
}

export function Services() {
  return (
    <section className="section container" id="services">
      <Reveal className="section-head">
        <h2 className="h-display">Managed Services That Fit The Way You Operate</h2>
        <p className="lede">One Partner. Three Connected Technology Priorities</p>
      </Reveal>

      <Stagger className="services" stagger={0.1}>
        {SERVICES.map((s) => (
          <ServiceCard key={s.key} s={s} />
        ))}
      </Stagger>
    </section>
  );
}
