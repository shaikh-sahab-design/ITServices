"use client";

import { motion } from "framer-motion";
import { Reveal, Stagger, fadeUpChild } from "./motion";
import { asset } from "@/lib/asset";

const CLIENTS = [
  { src: "/images/client-activecomply.png", alt: "ActiveComply", w: 263 },
  { src: "/images/client-opportune.png", alt: "Opportune", w: 154 },
  { src: "/images/client-arcom.png", alt: "Arcom IT", w: 211 },
  { src: "/images/client-io-solution.png", alt: "IO Solution", w: 142 },
];

export function Clients() {
  return (
    <section className="section container">
      <Reveal className="section-head section-head--wide">
        <h2 className="h-display">Trusted By Businesses Worldwide</h2>
        <p className="lede">
          Folio3 Managed IT supports organizations with daily IT operations, security, infrastructure, and technical
          support across industries and time zones.
        </p>
      </Reveal>
      <Stagger className="clients" stagger={0.08}>
        {CLIENTS.map((c) => (
          <motion.div key={c.alt} className="client-pill" variants={fadeUpChild}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset(c.src)} alt={c.alt} width={c.w} height={50} loading="lazy" />
          </motion.div>
        ))}
      </Stagger>
    </section>
  );
}
