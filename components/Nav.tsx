"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ROUTES } from "@/lib/routes";
import { SERVICE_GROUPS, SERVICE_PATHS } from "@/lib/services";
import { EASE_OUT_QUINT } from "./motion";
import { asset } from "@/lib/asset";

const LINKS = [
  { label: "Home", href: ROUTES.home, match: (p: string) => p === ROUTES.home },
  { label: "Our Services", href: ROUTES.services, match: (p: string) => SERVICE_PATHS.includes(p), mega: true },
  { label: "About Us", href: ROUTES.about, match: (p: string) => p === ROUTES.about },
  { label: "Blogs", href: ROUTES.blog, match: (p: string) => p.startsWith(ROUTES.blog) },
  { label: "Case Studies", href: ROUTES.caseStudies, match: (p: string) => p.startsWith(ROUTES.caseStudies) },
];

// Small delay before closing, so the pointer can cross from the nav link into the panel.
const CLOSE_DELAY = 140;

function Chevron() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** A sub-service only counts as the current page when it has its own page, not its main page as fallback. */
const isCurrent = (href: string, pathname: string, parent?: string) =>
  href === pathname && href !== parent ? "page" : undefined;

function MegaPanel({ pathname, onNavigate }: { pathname: string; onNavigate: () => void }) {
  return (
    <motion.div
      id="mega-services"
      className="mega"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6, transition: { duration: 0.12, ease: "easeIn" } }}
      transition={{ duration: 0.22, ease: EASE_OUT_QUINT }}
    >
      <motion.div
        className="mega__inner"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
      >
        {SERVICE_GROUPS.map((g) => (
          <motion.div
            key={g.title}
            className="mega__col"
            variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.25, ease: EASE_OUT_QUINT }}
          >
            <Link href={g.href} className="mega__head" aria-current={isCurrent(g.href, pathname)} onClick={onNavigate}>
              <span className="mega__title">
                {g.title} <Arrow />
              </span>
              <span className="mega__tagline">{g.tagline}</span>
            </Link>
            <ul className="mega__list">
              {g.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="mega__link"
                    aria-current={isCurrent(l.href, pathname, g.href)}
                    onClick={onNavigate}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
        <motion.div
          className="mega__aside"
          variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.25, ease: EASE_OUT_QUINT }}
        >
          <p className="mega__aside-title">Our Services</p>
          <p className="mega__aside-text">
            Managed services that bring cybersecurity, AI security and IT under one team, so your technology runs
            reliably, stays protected, and is ready for AI.
          </p>
          <Link href={ROUTES.services} className="btn btn--yellow btn--sm" onClick={onNavigate}>
            View All Services
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [sheetServices, setSheetServices] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const megaItem = useRef<HTMLDivElement>(null);
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

  // Close everything after navigating.
  useEffect(() => {
    setMega(false);
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mega) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMega(false);
      megaItem.current?.querySelector<HTMLElement>(".nav__link")?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mega]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const openMega = () => {
    clearTimeout(closeTimer.current);
    setMega(true);
  };
  const closeMegaSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMega(false), CLOSE_DELAY);
  };

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
          {LINKS.map((l) =>
            l.mega ? (
              <div
                key={l.label}
                ref={megaItem}
                className="nav__item"
                onPointerEnter={(e) => e.pointerType === "mouse" && openMega()}
                onPointerLeave={(e) => e.pointerType === "mouse" && closeMegaSoon()}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setMega(false);
                }}
              >
                <Link href={l.href} className="nav__link" aria-current={l.match(pathname) ? "page" : undefined}>
                  {l.label}
                </Link>
                <button
                  type="button"
                  className="nav__toggle"
                  data-open={mega}
                  aria-label="Show all services"
                  aria-expanded={mega}
                  aria-controls="mega-services"
                  onClick={() => setMega((m) => !m)}
                >
                  <Chevron />
                </button>
                <AnimatePresence>
                  {mega && <MegaPanel pathname={pathname} onNavigate={() => setMega(false)} />}
                </AnimatePresence>
              </div>
            ) : (
              <Link key={l.label} href={l.href} className="nav__link" aria-current={l.match(pathname) ? "page" : undefined}>
                {l.label}
              </Link>
            ),
          )}
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
                  {l.mega ? (
                    <>
                      <div className="nav__sheet-row">
                        <Link
                          href={l.href}
                          className="nav__sheet-link"
                          aria-current={l.match(pathname) ? "page" : undefined}
                          onClick={() => setOpen(false)}
                        >
                          {l.label}
                        </Link>
                        <button
                          type="button"
                          className="nav__sheet-toggle"
                          data-open={sheetServices}
                          aria-label={sheetServices ? "Hide services" : "Show all services"}
                          aria-expanded={sheetServices}
                          aria-controls="sheet-services"
                          onClick={() => setSheetServices((s) => !s)}
                        >
                          <Chevron />
                        </button>
                      </div>
                      <AnimatePresence initial={false}>
                        {sheetServices && (
                          <motion.div
                            id="sheet-services"
                            className="nav__sheet-services"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: EASE_OUT_QUINT }}
                          >
                            {SERVICE_GROUPS.map((g) => (
                              <div key={g.title} className="nav__sheet-group">
                                <Link
                                  href={g.href}
                                  className="nav__sheet-group-title"
                                  aria-current={isCurrent(g.href, pathname)}
                                  onClick={() => setOpen(false)}
                                >
                                  {g.title} <Arrow />
                                </Link>
                                <ul>
                                  {g.links.map((s) => (
                                    <li key={s.label}>
                                      <Link
                                        href={s.href}
                                        className="nav__sheet-sublink"
                                        aria-current={isCurrent(s.href, pathname, g.href)}
                                        onClick={() => setOpen(false)}
                                      >
                                        {s.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={l.href}
                      className="nav__sheet-link"
                      aria-current={l.match(pathname) ? "page" : undefined}
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </Link>
                  )}
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
