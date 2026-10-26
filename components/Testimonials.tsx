"use client";

import { motion } from "framer-motion";
import { Reveal, Stagger, fadeUpChild } from "./motion";
import { asset } from "@/lib/asset";

const QUOTES = [
  {
    logo: "/images/client-arcom.png",
    logoW: 211,
    alt: "Arcom IT",
    quote:
      "“We’ve been extremely impressed with Folio3’s outsourced IT support team. They’ve taken the time to understand our people and operations, delivering seamless, reliable support and clear communication. Most importantly, they’ve become a true extension of our IT team, strengthening both our technical capabilities and the support experience we provide.”",
    name: "Shahid Azeem",
    role: "Managing Director, ArcomIT",
  },
  {
    logo: "/images/client-io-solution.png",
    logoW: 142,
    alt: "IO Solutions",
    quote:
      "“Folio3 has been an invaluable IT partner across our digital roadmap, collaborating with us on mobile app rollouts & day-to-day managed services. Whenever deadlines tightened, they rolled up sleeves, stayed responsive, and did whatever it took to keep our operations running smoothly. Their dedication saved time, reduced operational overhead, & proved that they are a partner who takes ownership until the job is done.”",
    name: "Omar Mumtaz",
    role: "Managing Director, IO Solutions",
  },
];

export function Testimonials() {
  return (
    <section className="section container">
      <Reveal className="section-head section-head--wide">
        <h2 className="h-display">What Our Clients Say</h2>
        <p className="lede">
          Real-world outcomes from organizations improving their support experience, security posture, and confidence
          in their systems
        </p>
      </Reveal>
      <Stagger className="quotes" stagger={0.12}>
        {QUOTES.map((q) => (
          <motion.figure key={q.name} className="quote-card" variants={fadeUpChild}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="quote-card__logo" src={asset(q.logo)} alt={q.alt} width={q.logoW} height={50} loading="lazy" />
            <blockquote className="quote-card__text">{q.quote}</blockquote>
            <figcaption>
              <span className="quote-card__name">{q.name}</span>
              <span className="quote-card__role">{q.role}</span>
            </figcaption>
          </motion.figure>
        ))}
      </Stagger>
    </section>
  );
}
