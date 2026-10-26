"use client";

import { motion } from "framer-motion";
import { ListIcon, LoginIcon, PieIcon, SearchListIcon, WaveSquareIcon } from "./icons";
import { EASE_OUT_QUINT, Reveal } from "./motion";

const STEPS = [
  { icon: <SearchListIcon />, title: "IT Assessment", body: "We review your current IT environment, including users, devices, security, infrastructure, support gaps, vendors, and recovery readiness." },
  { icon: <ListIcon />, title: "Action Plan", body: "We define priorities based on risk, business impact, cost, and operational urgency." },
  { icon: <LoginIcon />, title: "Onboarding", body: "We transition your systems into managed operations with minimal disruption to your users." },
  { icon: <WaveSquareIcon />, title: "Ongoing Management", body: "We manage support, monitoring, maintenance, security, infrastructure, reporting, and continuous improvement." },
  { icon: <PieIcon />, title: "Strategic Review", body: "We provide regular visibility into IT performance, risks, costs, and future technology priorities." },
];

// Each milestone and card lands just as the drawn line reaches it.
const LINE_DURATION = 1.2;
const stepDelay = (i: number) => 0.15 + (i / (STEPS.length - 1)) * LINE_DURATION * 0.85;

export function Journey() {
  return (
    <section className="journey">
      <div className="container">
        <Reveal className="section-head">
          <h2 className="h-display">Start Your IT Management Journey With Folio3</h2>
        </Reveal>

        <motion.div
          className="journey__process"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="journey__track" aria-hidden="true">
            <motion.span
              className="journey__line"
              variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
              transition={{ duration: LINE_DURATION, ease: [0.645, 0.045, 0.355, 1], delay: 0.15 }}
            />
          </div>
          <ol className="journey__steps">
            {STEPS.map((s, i) => (
              <li key={s.title} className="journey__step">
                <motion.span
                  className="milestone"
                  variants={{ hidden: { scale: 0, opacity: 0 }, visible: { scale: 1, opacity: 1 } }}
                  transition={{ type: "spring", stiffness: 420, damping: 22, delay: stepDelay(i) }}
                >
                  {String(i + 1).padStart(2, "0")}
                </motion.span>
                <motion.article
                  className="step-card"
                  variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.5, ease: EASE_OUT_QUINT, delay: stepDelay(i) + 0.05 }}
                >
                  {s.icon}
                  <div className="step-card__copy">
                    <h3 className="step-card__title">{s.title}</h3>
                    <p className="step-card__text">{s.body}</p>
                  </div>
                </motion.article>
              </li>
            ))}
          </ol>
        </motion.div>

        <Reveal className="cta-band">
          <div>
            <p className="cta-band__title">Ready to strengthen your IT operations?</p>
            <p className="cta-band__text">Let’s turn complexity into a clear, managed roadmap.</p>
          </div>
          <a href="#contact" className="btn btn--yellow">Get Started Today</a>
        </Reveal>
      </div>
    </section>
  );
}
