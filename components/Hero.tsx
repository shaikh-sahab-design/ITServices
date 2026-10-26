"use client";

import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { ChartDuoIcon, HeadphonesDuoIcon, StopwatchDuoIcon, UsersDuoIcon } from "./icons";
import { EASE_OUT_QUINT } from "./motion";
import { asset } from "@/lib/asset";

const BADGES = [
  { key: "clients", icon: <UsersDuoIcon />, top: "500+", bottom: "Enterprise Clients", tone: "blue", delay: 1.15, float: 0 },
  { key: "sla", icon: <ChartDuoIcon />, top: "99.9%", bottom: "Uptime SLA", tone: "yellow", delay: 1.25, float: 0.6 },
  { key: "support", icon: <HeadphonesDuoIcon />, top: "24/7", bottom: "Expert Support", tone: "red", delay: 1.35, float: 1.2 },
  { key: "response", icon: <StopwatchDuoIcon />, top: "11 min", bottom: "Avg. Response Time", tone: "white", delay: 1.45, float: 1.8 },
] as const;

// Divider geometry in Figma units (dashboard is 1050 x 512). The mask edge is a
// diagonal that leans 532 units to the right over the image height.
const DASH_W = 1050;
const LEAN = 532;
const SPLIT_START = 508; // where the Figma mask meets the bottom edge
const SPLIT_MIN = -LEAN; // dark version fully shown
const SPLIT_MAX = DASH_W; // light version fully shown
const clampSplit = (v: number) => Math.min(SPLIT_MAX, Math.max(SPLIT_MIN, v));
const pct = (v: number) => `${(v / DASH_W) * 100}%`;

export function Hero() {
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start end", "end start"] });
  // Subtle parallax: the dashboard drifts slower than the page as you scroll past it.
  const dashY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [30, -30]);

  // Bottom x of the light/dark divider. Starts fully light and settles on the Figma split.
  const split = useMotionValue<number>(SPLIT_MAX);
  const darkClip = useTransform(split, (v) => `polygon(${pct(v + LEAN)} 0%, 100% 0%, 100% 100%, ${pct(v)} 100%)`);
  const lineX1 = useTransform(split, (v) => v + LEAN);
  // The handle rides along the divider and sits under the pointer horizontally,
  // so both ends of the range stay reachable inside the image.
  const handleFrac = useTransform(split, (v) => (v - SPLIT_MIN) / (SPLIT_MAX - SPLIT_MIN));
  const handleLeft = useTransform(handleFrac, (f) => `${f * 100}%`);
  const handleTop = useTransform(split, (v) => {
    const hx = ((v - SPLIT_MIN) / (SPLIT_MAX - SPLIT_MIN)) * DASH_W;
    return `${(1 - (hx - v) / LEAN) * 100}%`;
  });
  const dashRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const handleRef = useRef<HTMLDivElement>(null);

  // Screen readers get how much of the dark version is showing.
  useMotionValueEvent(split, "change", (v) => {
    const shown = Math.round(((SPLIT_MAX - v) / (SPLIT_MAX - SPLIT_MIN)) * 100);
    handleRef.current?.setAttribute("aria-valuenow", String(shown));
  });

  // The banner pins once its bottom edge reaches the bottom of the viewport (or
  // under the nav if it fits), so the sections after it slide up and cover it.
  const heroRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const place = () => {
      const navH = document.querySelector<HTMLElement>(".nav")?.offsetHeight ?? 0;
      hero.style.top = `${Math.min(navH, window.innerHeight - hero.offsetHeight)}px`;
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(hero);
    window.addEventListener("resize", place);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", place);
    };
  }, []);

  useEffect(() => {
    const controls = animate(split, SPLIT_START, { duration: 1.1, ease: [0.645, 0.045, 0.355, 1], delay: 1.0 });
    return () => controls.stop();
  }, [split]);

  const moveTo = (clientX: number) => {
    const box = dashRef.current?.getBoundingClientRect();
    if (!box) return;
    const frac = (clientX - box.left) / box.width;
    split.stop();
    split.set(clampSplit(SPLIT_MIN + frac * (SPLIT_MAX - SPLIT_MIN)));
  };

  const onKey = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 150 : 50;
    const to =
      e.key === "ArrowLeft" ? split.get() - step
      : e.key === "ArrowRight" ? split.get() + step
      : e.key === "Home" ? SPLIT_MIN
      : e.key === "End" ? SPLIT_MAX
      : null;
    if (to === null) return;
    e.preventDefault();
    animate(split, clampSplit(to), { type: "spring", stiffness: 300, damping: 32 });
  };

  return (
    <section className="hero" ref={heroRef}>
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
            {/* Dark version sits on top, masked along the draggable diagonal */}
            <motion.div className="hero__dash-dark" style={{ clipPath: darkClip }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset("/images/hero-dashboard-dark-full.png")} alt="" width={1050} height={512} />
            </motion.div>

            <div
              ref={dashRef}
              className="hero__compare"
              onPointerDown={(e) => {
                dragging.current = true;
                e.currentTarget.setPointerCapture(e.pointerId);
                moveTo(e.clientX);
              }}
              onPointerMove={(e) => dragging.current && moveTo(e.clientX)}
              onPointerUp={() => (dragging.current = false)}
              onPointerCancel={() => (dragging.current = false)}
            >
              <svg className="hero__divider" viewBox="0 0 1050 512" preserveAspectRatio="none" aria-hidden="true">
                <motion.line x1={lineX1} y1={0} x2={split} y2={512} vectorEffect="non-scaling-stroke" />
              </svg>
              <motion.div
                ref={handleRef}
                className="hero__handle"
                style={{ left: handleLeft, top: handleTop }}
                role="slider"
                tabIndex={0}
                aria-label="Dark version shown, in percent"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={0}
                onKeyDown={onKey}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1.9 }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M7.5 5 2.5 10l5 5M12.5 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </div>

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
