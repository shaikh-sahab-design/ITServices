"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ROUTES } from "@/lib/routes";
import { Reveal, Stagger, fadeUpChild } from "../motion";
import { asset } from "@/lib/asset";

const MotionLink = motion.create(Link);

const CARDS = [
  {
    key: "it",
    title: "Managed IT Services",
    text: "Keep your technology, infrastructure, users and daily operations running without interruption.",
    pill: "Explore Managed IT Services →",
    href: ROUTES.managedIt,
    img: "/images/service-managed-it.png",
    alt: "Monitor showing a network operations dashboard",
  },
  {
    key: "security",
    title: "Managed Security Services",
    text: "Strengthen your security with assessment, monitoring, detection, response and compliance.",
    pill: "Explore Managed Security Services →",
    href: ROUTES.managedSecurity,
    img: "/images/service-managed-security.png",
    alt: "Security appliance displaying a glowing shield",
  },
  {
    key: "ai",
    title: "AI Security Services",
    text: "Find and control the security risks that AI applications, data, agents and workflows introduce.",
    pill: "Explore AI Security Services →",
    href: ROUTES.aiSecurity,
    img: "/images/service-ai-security.png",
    alt: "Robotic hand holding a shield with a check mark",
  },
];

/** Services overview: the three coloured service cards with a description and an explore pill. */
export function ServicePortfolio() {
  return (
    <section className="section section--pb container">
      <Reveal className="section-head section-head--portfolio">
        <h2 className="h-display">Run, protect and secure AI with one accountable team</h2>
        <p className="lede">
          Businesses now need more than IT support. They need reliable operations, stronger security and a way to
          control the risks that come with AI adoption.
        </p>
      </Reveal>

      <Stagger className="services services--portfolio" stagger={0.1}>
        {CARDS.map((c) => (
          <MotionLink href={c.href} key={c.key} className={`service-card service-card--${c.key}`} variants={fadeUpChild}>
            <div className="service-card__body">
              <h3 className="service-card__title">{c.title}</h3>
              <p className="service-card__text">{c.text}</p>
              <span className="tag tag--cta">{c.pill}</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="service-card__img" src={asset(c.img)} alt={c.alt} loading="lazy" />
          </MotionLink>
        ))}
      </Stagger>
    </section>
  );
}
