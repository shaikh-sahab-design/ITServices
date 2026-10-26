"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ROUTES } from "@/lib/routes";
import { EASE_OUT_QUINT } from "./motion";
import { asset } from "@/lib/asset";

const SERVICE_PATHS: string[] = [
  ROUTES.services, ROUTES.managedIt, ROUTES.managedSecurity, ROUTES.aiSecurity, ROUTES.aiAssessment, ROUTES.soc,
  ROUTES.networkDesign, ROUTES.migration, ROUTES.disasterRecovery, ROUTES.vcio, ROUTES.database,
];

const LINKS = [
  { label: "Home", href: ROUTES.home, match: (p: string) => p === ROUTES.home },
  { label: "Our Services", href: ROUTES.services, match: (p: string) => SERVICE_PATHS.includes(p) },
  { label: "About Us", href: ROUTES.about, match: (p: string) => p === ROUTES.about },
  { label: "Blogs", href: ROUTES.blog, match: (p: string) => p.startsWith(ROUTES.blog) },
  { label: "Case Studies", href: ROUTES.caseStudies, match: (p: string) => p.startsWith(ROUTES.caseStudies) },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = (usePathname() ?? "/").replace(/(.)\/$/, "$1");

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
        <Link href={ROUTES.home} className="nav__logo" aria-label="Folio3 Managed IT & Cybersecurity Services, home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/images/logo-nav.png")} alt="" width={296} height={36} />
        </Link>

        <nav className="nav__links" aria-label="Main">
          {LINKS.map((l) => (
            <Link key={l.label} href={l.href} className="nav__link" aria-current={l.match(pathname) ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>

        <Link href={ROUTES.contact} className="btn btn--primary btn--sm nav__cta">
          Get Free Consultation
        </Link>

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
                  <Link
                    href={l.href}
                    className="nav__sheet-link"
                    aria-current={l.match(pathname) ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
            <Link href={ROUTES.contact} className="btn btn--primary nav__sheet-cta" onClick={() => setOpen(false)}>
              Get Free Consultation
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
