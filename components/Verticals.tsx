"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowSquareIcon, CartIcon, ConveyorIcon, DevicesIcon, MedicalBagIcon, MonitorWaveIcon } from "./icons";
import { Reveal, Stagger, fadeUpChild } from "./motion";

const VERTICALS = [
  { icon: <MedicalBagIcon />, title: "Healthcare", body: "HIPAA-compliant infrastructure management for hospitals, clinics, and health-tech platforms." },
  { icon: <ConveyorIcon />, title: "Manufacturing", body: "OT/IT convergence, ERP protection, and 24/7 uptime for production-critical environments." },
  { icon: <DevicesIcon />, title: "Technology", body: "Scalable migration management for fast-growing SaaS and software companies." },
  { icon: <MonitorWaveIcon />, title: "Professional Services", body: "Secure, compliant IT infrastructure for law firms, consultancies, and advisory groups." },
  { icon: <CartIcon />, title: "Retail & Distribution", body: "POS security, supply chain IT, and multi-site infrastructure management at scale." },
];

export function Verticals() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const step = () => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".vertical-card");
    const by = card ? card.offsetWidth + 22 : 320;
    // Loop back to the start once the last card is in view.
    el.scrollTo({ left: atEnd ? 0 : el.scrollLeft + by, behavior: "smooth" });
  };

  return (
    <section className="verticals" id="industries">
      <div className="verticals__head container">
        <Reveal className="verticals__intro">
          <h2 className="h-display">IT Expertise Across Every Vertical</h2>
          <p className="lede"> We understand that a healthcare clinic and a manufacturing plant have fundamentally different IT requirements. Our teams are specialised, not generalist.</p>
        </Reveal>
        <Reveal delay={0.1}>
          <a href="#contact" className="btn btn--outline">Discuss Your Requirements</a>
        </Reveal>
      </div>

      <div className="verticals__rail">
        <div className="verticals__track" ref={trackRef} onScroll={update}>
          <Stagger className="verticals__list" stagger={0.08}>
            {VERTICALS.map((v) => (
              <motion.article key={v.title} className="vertical-card" variants={fadeUpChild}>
                <span className="vertical-card__icon">{v.icon}</span>
                <div>
                  <h3 className="vertical-card__title">{v.title}</h3>
                  <p className="vertical-card__body">{v.body}</p>
                </div>
              </motion.article>
            ))}
          </Stagger>
        </div>
        <motion.button
          className="verticals__next"
          onClick={step}
          aria-label={atEnd ? "Back to first industry" : "Next industry"}
          animate={{ rotate: atEnd ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
          whileTap={{ scale: 0.92 }}
        >
          <ArrowSquareIcon />
        </motion.button>
      </div>
    </section>
  );
}
