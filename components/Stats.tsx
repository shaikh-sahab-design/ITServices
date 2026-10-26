"use client";

import { motion } from "framer-motion";
import { Fragment } from "react";
import { ChartIcon, StarIcon, StopwatchIcon, UsersIcon } from "./icons";
import { CountUp, Reveal, Stagger, fadeUpChild } from "./motion";

const STATS = [
  { icon: <UsersIcon />, value: 500, decimals: 0, suffix: "+", label: ["Enterprise Clients", "Across 15+ industries"] },
  { icon: <ChartIcon />, value: 99.9, decimals: 1, suffix: "%", label: ["Uptime SLA", "Contractually Guaranteed"] },
  { icon: <StopwatchIcon />, value: 11, decimals: 0, suffix: "min", label: ["Avg. Response Time", "Industry avg is 4+ hours"] },
  { icon: <StarIcon />, value: 20, decimals: 0, suffix: "+", label: ["Years of Expertise", "Combined IT leadership"] },
];

export function Stats() {
  return (
    <section className="stats">
      <div className="stats__inner container">
        <Reveal>
          <h2 className="stats__title">
            Contractually
            <br />
            Commit To
          </h2>
        </Reveal>
        <Stagger className="stats__list" stagger={0.1}>
          {STATS.map((s, i) => (
            <Fragment key={s.label[0]}>
              {i > 0 && <motion.span className="stats__rule" aria-hidden="true" variants={fadeUpChild} />}
              <motion.div className="stat" variants={fadeUpChild}>
                {s.icon}
                <p className="stat__value">
                  <CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} />
                </p>
                <p className="stat__label">
                  {s.label[0]}
                  <br />
                  {s.label[1]}
                </p>
              </motion.div>
            </Fragment>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
