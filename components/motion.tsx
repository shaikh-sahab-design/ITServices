"use client";

import { animate, motion, useInView, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const EASE_OUT_QUINT = [0.23, 1, 0.32, 1] as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

/** Fades and lifts content in once it scrolls into view. */
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: EASE_OUT_QUINT, delay }}
    >
      {children}
    </motion.div>
  );
}

export const staggerParent = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

export const fadeUpChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_QUINT } },
};

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
  style?: React.CSSProperties;
};

/** Parent that staggers any <motion.* variants={fadeUpChild}> children into view. */
export function Stagger({ children, className, stagger = 0.08, delay = 0, amount = 0.2, style }: StaggerProps) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={staggerParent(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

/** Counts a number up from zero the first time it enters the viewport. */
export function CountUp({ value, decimals = 0, suffix = "" }: { value: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [display, setDisplay] = useState((0).toFixed(decimals));

  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(value.toFixed(decimals));
      return;
    }
    const controls = animate(0, value, {
      duration: 1.4,
      ease: EASE_OUT_QUINT,
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, value, decimals]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
