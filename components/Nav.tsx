"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE_OUT_QUINT } from "./motion";
import { asset } from "@/lib/asset";

const LINKS = [
  { label: "Home", href: "#", active: true },
  { label: "Our Services", href: "#services" },
  { label: "About Us", href: "#about" },
  { label: "Blogs", href: "#blogs" },
  { label: "Case Studies", href: "#case-studies" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <motion.header
      className="nav"
      data-scrolled={scrolled}
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: EASE_OUT_QUINT }}
    >
      <div className="nav__inner">
        <a href="#" className="nav__logo" aria-label="Folio3 Managed IT & Cybersecurity Services, home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/images/logo-nav.png")} alt="" width={296} height={36} />
        </a>

        <nav className="nav__links" aria-label="Main">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} className="nav__link" aria-current={l.active ? "page" : undefined}>
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn btn--primary btn--sm nav__cta">
          Get Free Consultation
        </a>

        <button
          className="nav__burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span data-open={open} />
          <span data-open={open} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav__sheet"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15, ease: "easeIn" } }}
            transition={{ duration: 0.25, ease: EASE_OUT_QUINT }}
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } } }}
            >
              {LINKS.map((l) => (
                <motion.li
                  key={l.label}
                  variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }}
                  transition={{ duration: 0.25, ease: EASE_OUT_QUINT }}
                >
                  <a
                    href={l.href}
                    className="nav__sheet-link"
                    aria-current={l.active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            <a href="#contact" className="btn btn--primary nav__sheet-cta" onClick={() => setOpen(false)}>
              Get Free Consultation
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
