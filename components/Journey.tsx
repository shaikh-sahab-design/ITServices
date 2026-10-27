"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ListIcon, LoginIcon, PieIcon, SearchListIcon, WaveSquareIcon } from "./icons";
import { EASE_OUT_QUINT, Reveal } from "./motion";
import { asset } from "@/lib/asset";

type Step = { icon: React.ReactNode; title: string; body: string };

const STEPS: Step[] = [
  { icon: <SearchListIcon />, title: "IT Assessment", body: "We review your current IT environment, including users, devices, security, infrastructure, support gaps, vendors, and recovery readiness." },
  { icon: <ListIcon />, title: "Action Plan", body: "We define priorities based on risk, business impact, cost, and operational urgency." },
  { icon: <LoginIcon />, title: "Onboarding", body: "We transition your systems into managed operations with minimal disruption to your users." },
  { icon: <WaveSquareIcon />, title: "Ongoing Management", body: "We manage support, monitoring, maintenance, security, infrastructure, reporting, and continuous improvement." },
  { icon: <PieIcon />, title: "Strategic Review", body: "We provide regular visibility into IT performance, risks, costs, and future technology priorities." },
];

// Each milestone and card lands just as the drawn line reaches it.
const LINE_DURATION = 1.2;
const stepDelay = (i: number, count: number) => 0.15 + (i / (count - 1)) * LINE_DURATION * 0.85;

type JourneyCta = { title: string; text: string; label: string; href: string };

const HOME_CTA: JourneyCta = {
  title: "Ready to strengthen your IT operations?",
  text: "Let’s turn complexity into a clear, managed roadmap.",
  label: "Get Started Today",
  href: "#contact",
};

/**
 * Home process band. Service pages reuse it with their own heading and CTA, and drop the top margin.
 * A page can pass its own steps; icons given as paths load from public/.
 */
export function Journey({
  title = "Start Your IT Management Journey With Folio3",
  cta = HOME_CTA,
  flush,
  steps = STEPS,
}: {
  title?: string;
  cta?: JourneyCta;
  flush?: boolean;
  steps?: { icon: React.ReactNode | string; title: string; body: string }[];
}) {
  return (
    <section className={`journey${flush ? " journey--flush" : ""}`}>
      <div className="container">
        <Reveal className="section-head">
          <h2 className="h-display">{title}</h2>
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
          <ol className="journey__steps" style={{ "--steps": steps.length } as React.CSSProperties}>
            {steps.map((s, i) => (
              <li key={s.title} className="journey__step">
                <motion.span
                  className="milestone"
                  variants={{ hidden: { scale: 0, opacity: 0 }, visible: { scale: 1, opacity: 1 } }}
                  transition={{ type: "spring", stiffness: 420, damping: 22, delay: stepDelay(i, steps.length) }}
                >
                  {String(i + 1).padStart(2, "0")}
                </motion.span>
                <motion.article
                  className="step-card"
                  variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.5, ease: EASE_OUT_QUINT, delay: stepDelay(i, steps.length) + 0.05 }}
                >
                  {typeof s.icon === "string" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={asset(s.icon)} alt="" width={48} height={48} />
                  ) : (
                    s.icon
                  )}
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
            <p className="cta-band__title">{cta.title}</p>
            <p className="cta-band__text">{cta.text}</p>
          </div>
          {cta.href.startsWith("#") ? (
            <a href={cta.href} className="btn btn--yellow">
              {cta.label}
            </a>
          ) : (
            <Link href={cta.href} className="btn btn--yellow">
              {cta.label}
            </Link>
          )}
        </Reveal>
      </div>
    </section>
  );
}
