"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";
import { CaretDownIcon } from "./icons";
import { EASE_OUT_QUINT, Reveal, Stagger, fadeUpChild } from "./motion";

// Only the second answer exists in Figma. The others are draft copy to be replaced.
const FAQS = [
  {
    q: "What are IT Management Services?",
    a: "IT Management Services cover the day-to-day running of your technology: user support, monitoring, maintenance, security, and planning, handled by a dedicated team.",
  },
  {
    q: "How are IT Management Services different from basic IT support?",
    a: "Basic IT support is often reactive and focuses on fixing issues after they occur. IT Management Services are proactive and include monitoring, maintenance, cybersecurity, migration management, infrastructure support, reporting, and strategic guidance.",
  },
  {
    q: "What is included in Folio3’s IT Management Services?",
    a: "Service desk support, endpoint and network monitoring, patching, backup and disaster recovery, cybersecurity, migration management, and regular reporting.",
  },
  {
    q: "Is IT Management suitable for small and mid-sized businesses?",
    a: "Yes. Plans scale with your headcount and environment, so smaller teams get enterprise-grade support without hiring a full in-house department.",
  },
  {
    q: "Can Folio3 manage on-premise environments?",
    a: "Yes. We manage on-premise, cloud, and hybrid environments, including servers, networks, and the devices your teams use every day.",
  },
  {
    q: "Can IT Management Services help with cybersecurity and compliance?",
    a: "Yes. Security monitoring, endpoint protection, and compliance support for frameworks such as HIPAA, SOC 2, and ISO 27001 are part of the service.",
  },
  {
    q: "How do we get started?",
    a: "Book a free consultation. We start with an IT assessment, agree an action plan, and onboard your systems with minimal disruption.",
  },
];

type FaqItem = { q: string; a?: string };

/**
 * Accordion of questions. Service pages pass their own list; a question with no answer
 * in Figma is shown without one and doesn't expand.
 */
export function Faq({ items = FAQS, defaultOpen = 1 }: { items?: FaqItem[]; defaultOpen?: number }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();

  return (
    <section className="section container" id="faq">
      <Reveal className="section-head">
        <h2 className="h-display">Frequently Asked Questions</h2>
      </Reveal>
      <Stagger className="faq" stagger={0.05}>
        {items.map((item, i) => {
          const isOpen = open === i && Boolean(item.a);
          const panelId = `${baseId}-panel-${i}`;
          return (
            <motion.div key={`${item.q}-${i}`} className="faq__item" data-open={isOpen} variants={fadeUpChild}>
              <button
                className="faq__q"
                aria-expanded={item.a ? isOpen : undefined}
                aria-controls={item.a ? panelId : undefined}
                disabled={!item.a}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{item.q}</span>
                <motion.span
                  className="faq__caret"
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: [0.645, 0.045, 0.355, 1] }}
                >
                  <CaretDownIcon />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    className="faq__a"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }}
                    transition={{ duration: 0.3, ease: EASE_OUT_QUINT }}
                  >
                    <p>{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </Stagger>
    </section>
  );
}
