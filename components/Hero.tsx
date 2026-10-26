"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChartDuoIcon, HeadphonesDuoIcon, StopwatchDuoIcon, UsersDuoIcon } from "./icons";
import { EASE_OUT_QUINT } from "./motion";
import { asset } from "@/lib/asset";

const BADGES = [
  { key: "clients", icon: <UsersDuoIcon />, top: "500+", bottom: "Enterprise Clients", tone: "blue", delay: 1.15, float: 0 },
  { key: "sla", icon: <ChartDuoIcon />, top: "99.9%", bottom: "Uptime SLA", tone: "yellow", delay: 1.25, float: 0.6 },
  { key: "support", icon: <HeadphonesDuoIcon />, top: "24/7", bottom: "Expert Support", tone: "red", delay: 1.35, float: 1.2 },
  { key: "response", icon: <StopwatchDuoIcon />, top: "11 min", bottom: "Avg. Response Time", tone: "white", delay: 1.45, float: 1.8 },
] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start end", "end start"] });
  // Subtle parallax: the dashboard drifts slower than the page as you scroll past it.
  const dashY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [30, -30]);

  return (
    <section className="hero">
      <div className="hero__copy">
        <h1 className="hero__title">
          <span className="line-mask">
            <motion.span
              className="hero__title-red"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT_QUINT, delay: 0.15 }}
            >
              IT Downtime?
            </motion.span>
          </span>
          <span className="line-mask">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT_QUINT, delay: 0.25 }}
            >
              Get Reliable Support
            </motion.span>
          </span>
        </h1>

        <motion.p
          className="hero__lede"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT_QUINT, delay: 0.45 }}
        >
          Folio3 Managed IT delivers proactive infrastructure management, enterprise-grade security, and{" "}
          <strong className="t-red">24/7</strong> expert support so your{" "}
          <strong className="t-blue">team focuses on growth</strong>, not firefighting.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT_QUINT, delay: 0.55 }}
        >
          <a href="#contact" className="btn btn--primary">Get a Free Consultation</a>
          <a href="#services" className="btn btn--outline">Explore Services</a>
        </motion.div>
      </div>

      <div className="hero__stage" ref={stageRef}>
        <motion.div
          className="hero__dash"
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE_OUT_QUINT, delay: 0.6 }}
        >
          <motion.div className="hero__dash-inner" style={{ y: dashY }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="hero__dash-light"
              src={asset("/images/hero-dashboard-light.png")}
              alt="Managed IT dashboard showing remote access, cybersecurity, backup and service desk metrics"
              width={1050}
              height={512}
            />
            {/* Dark-mode half wipes in along the diagonal */}
            <motion.div
              className="hero__dash-dark"
              initial={{ clipPath: "polygon(100% 0%, 100% 0%, 100% 0%)" }}
              animate={{ clipPath: "polygon(100% 0%, 100% 250%, -150% 0%)" }}
              transition={{ duration: 1.1, ease: [0.645, 0.045, 0.355, 1], delay: 1.0 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset("/images/hero-dashboard-dark.png")} alt="" width={660} height={522} />
            </motion.div>

            {BADGES.map((b) => (
              <motion.div
                key={b.key}
                className={`badge badge--${b.key}`}
                initial={{ opacity: 0, scale: 0.9, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 22, delay: b.delay }}
              >
                <div className="badge__float" style={{ animationDelay: `${b.float}s` }}>
                  <span className="badge__icon">{b.icon}</span>
                  <span className={`badge__text t-${b.tone}`}>
                    {b.top}
                    <br />
                    {b.bottom}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
