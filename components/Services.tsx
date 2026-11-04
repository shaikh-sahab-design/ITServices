"use client";

import { useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { Reveal, Stagger, fadeUpChild } from "./motion";
import Link from "next/link";
import { asset } from "@/lib/asset";
import { ROUTES } from "@/lib/routes";

// Matches the Figma "On hover" spring on the card variants.
const FLIP_SPRING = { type: "spring", mass: 1, stiffness: 100, damping: 15 } as const;

// Tilt on the flipped (back) side, after React Bits <TiltedCard /> with the settings Adil chose.
const TILT = { rotateAmplitude: 12, scaleOnHover: 1.05, glare: 0.5, shadow: 0.5 };
const TILT_SPRING = { damping: 30, stiffness: 100, mass: 2 };

const SERVICES = [
  {
    key: "it",
    title: ["Managed IT", "Services"],
    href: ROUTES.managedIt,
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
    href: ROUTES.managedSecurity,
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
    href: ROUTES.aiSecurity,
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
  const reduceMotion = useReducedMotion();

  const rotateX = useSpring(0, TILT_SPRING);
  const rotateY = useSpring(0, TILT_SPRING);
  const scale = useSpring(1, TILT_SPRING);
  const glare = useSpring(0, TILT_SPRING);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0) 60%)`;
  // The drop shadow leans away from the raised edge, strength set by TILT.shadow.
  const shadowX = useTransform(rotateY, (v) => -v * 1.5);
  const shadowY = useTransform(rotateX, (v) => 10 + v * 1.5);
  const backShadow = useMotionTemplate`${shadowX}px ${shadowY}px 48px rgba(11, 27, 43, ${TILT.shadow * 0.3})`;

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
    glare.set(0);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    // Only the back side tilts, and only for a mouse or pen that can hover.
    if (!open || reduceMotion || e.pointerType === "touch") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    rotateX.set((offsetY / (rect.height / 2)) * -TILT.rotateAmplitude);
    rotateY.set((offsetX / (rect.width / 2)) * TILT.rotateAmplitude);
    scale.set(TILT.scaleOnHover);
    glare.set(TILT.glare);
    glareX.set(((e.clientX - rect.left) / rect.width) * 100);
    glareY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <motion.article
      className={`service-card service-card--${s.key}${open ? " is-open" : ""}`}
      variants={fadeUpChild}
      onHoverStart={() => setOpen(true)}
      onHoverEnd={() => {
        setOpen(false);
        resetTilt();
      }}
      onPointerMove={onPointerMove}
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
      <motion.div className="service-card__tilt" style={{ rotateX, rotateY, scale }}>
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

          <motion.div className="service-card__face service-card__face--back" aria-hidden={!open} style={{ boxShadow: backShadow }}>
            <motion.span className="service-card__glare" aria-hidden="true" style={{ opacity: glare, background: glareBg }} />
            <div className="service-card__body">
              <CardTitle s={s} />
              <ul className="service-card__list">
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link href={s.href} className="service-card__cta" tabIndex={open ? 0 : -1}>
                View Service Details
              </Link>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="service-card__img service-card__img--faded" src={asset(s.img)} alt="" loading="lazy" />
          </motion.div>
        </motion.div>
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
