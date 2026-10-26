"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE_OUT_QUINT } from "../motion";

// Leading text, one number (commas and decimals allowed), trailing text: "<15min", "1,200+", "99.9%", "08".
const PARTS = /^(\D*?)(\d[\d,]*(?:\.\d+)?)(\D*)$/;

/**
 * Counts a design stat like "1,200+" up from zero when it scrolls into view, keeping its
 * exact formatting (commas, decimals, leading zeros, prefix and suffix). Values that aren't
 * a single number, such as "24/7", are shown as they are.
 */
export function StatValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const m = value.match(PARTS);
  const [prefix, raw, suffix] = m ? [m[1], m[2], m[3]] : ["", "", ""];
  const target = m ? Number(raw.replace(/,/g, "")) : 0;
  const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
  const width = raw.replace(/,/g, "").split(".")[0].length;

  const format = (v: number) => {
    let s = v.toFixed(decimals);
    const [int, dec] = s.split(".");
    let i = int.padStart(width, "0");
    if (raw.includes(",")) i = Number(i).toLocaleString("en-US");
    s = dec ? `${i}.${dec}` : i;
    return prefix + s + suffix;
  };

  const [display, setDisplay] = useState(() => (m ? format(0) : value));

  useEffect(() => {
    if (!m || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, target, {
      duration: 1.4,
      ease: EASE_OUT_QUINT,
      onUpdate: (v) => setDisplay(format(v)),
      onComplete: () => setDisplay(value),
    });
    return () => controls.stop();
    // format only depends on value, which is already a dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value]);

  return <span ref={ref}>{display}</span>;
}
