"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatCheckTile, MailIcon, PhoneIcon, PinIcon } from "./icons";
import { PHONE, ROUTES } from "@/lib/routes";
import { EASE_OUT_QUINT, Reveal } from "./motion";

const SIZES = ["1–50 Employees", "51–200 Employees", "201–500 Employees", "501–1,000 Employees", "1,000+ Employees"];
const NEEDS = [
  "Managed IT Support",
  "Endpoint Protection",
  "Migration Services",
  "Network Design",
  "Disaster Recovery",
  "IT Consulting / vCTO",
  "Cybersecurity",
  "Other",
];

/** `page` is the standalone Contact page: shorter intro copy plus a "Get In Touch" list. */
export function ContactForm({ className = "", variant = "home" }: { className?: string; variant?: "home" | "page" }) {
  const [size, setSize] = useState(SIZES[1]);
  const [needs, setNeeds] = useState<string[]>([NEEDS[0]]);
  const [sent, setSent] = useState(false);
  const router = useRouter();

  const toggleNeed = (n: string) =>
    setNeeds((cur) => (cur.includes(n) ? cur.filter((x) => x !== n) : [...cur, n]));

  return (
    <section className={`contact${variant === "page" ? " contact--page" : ""} ${className}`} id="contact">
      <div className="contact__inner container">
        <Reveal className="contact__intro" y={32}>
          <div className="contact__intro-copy">
            <p className="eyebrow">
              <span className="eyebrow__dot" aria-hidden="true" />
              Let’s Talk IT
            </p>
            <h2 className="contact__title">Tell Us About Your IT Environment</h2>
            {variant === "page" ? (
              <>
                <p className="contact__text">
                  If you need more IT capacity, better security, infrastructure help, migration support, or a proactive
                  model, share details with our team.
                </p>
                <div className="contact__touch">
                  <p className="contact__touch-title">Get In Touch</p>
                  <ul className="contact__touch-list">
                    <li>
                      <PhoneIcon />
                      <a href={PHONE.href}>{PHONE.label}</a>
                    </li>
                    <li>
                      <MailIcon />
                      <a href="mailto:support-mspit@folio3.com">support-mspit@folio3.com</a>
                    </li>
                    <li>
                      <PinIcon />
                      <span>4010 Moorpark Ave, Suite 101, San Jose, CA 95117</span>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <p className="contact__text">
                  Whether you need additional IT capacity, stronger security, infrastructure support, migration assistance,
                  or a more proactive operating model, share a few details with our team.
                </p>
                <p className="contact__text">
                  We’ll use the information to understand your current setup and connect you with the right Managed IT
                  specialists.
                </p>
              </>
            )}
          </div>
          <div className="promise">
            <ChatCheckTile className="promise__icon" />
            <div>
              <p className="promise__title">The right team, from day one</p>
              <p className="promise__text">Your inquiry is routed to a specialist who understands your priorities.</p>
            </div>
          </div>
        </Reveal>

        <Reveal className="contact__form-wrap" delay={0.1} y={32}>
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              router.push(ROUTES.thankYou);
            }}
          >
            <div className="form__row">
              <label className="field">
                <span className="field__label">Full Name *</span>
                <input className="field__input" name="name" placeholder="Enter Name" required autoComplete="name" />
              </label>
              <label className="field">
                <span className="field__label">Business Email *</span>
                <input className="field__input" name="email" type="email" placeholder="Enter business email" required autoComplete="email" />
              </label>
            </div>
            <div className="form__row">
              <label className="field">
                <span className="field__label">Company Name *</span>
                <input className="field__input" name="company" placeholder="Enter company name" required autoComplete="organization" />
              </label>
              <label className="field">
                <span className="field__label">Phone Number</span>
                <input className="field__input" name="phone" type="tel" placeholder="Enter phone number" autoComplete="tel" />
              </label>
            </div>

            <fieldset className="field">
              <legend className="field__label">Company Size</legend>
              <div className="chips" role="radiogroup">
                {SIZES.map((s) => (
                  <button
                    type="button"
                    key={s}
                    role="radio"
                    aria-checked={size === s}
                    className="chip"
                    data-active={size === s}
                    onClick={() => setSize(s)}
                  >
                    {size === s && (
                      <motion.span
                        layoutId="size-highlight"
                        className="chip__highlight"
                        transition={{ type: "spring", stiffness: 500, damping: 38 }}
                      />
                    )}
                    <span className="chip__label">{s}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="field">
              <legend className="field__label">What Do You Need Help With?</legend>
              <div className="options">
                {NEEDS.map((n) => {
                  const on = needs.includes(n);
                  return (
                    <button
                      type="button"
                      key={n}
                      role="checkbox"
                      aria-checked={on}
                      className="option"
                      data-active={on}
                      onClick={() => toggleNeed(n)}
                    >
                      <span className="option__box" aria-hidden="true">
                        <AnimatePresence initial={false}>
                          {on && (
                            <motion.span
                              className="option__check"
                              initial={{ scale: 0.4, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.4, opacity: 0, transition: { duration: 0.1 } }}
                              transition={{ type: "spring", stiffness: 600, damping: 30 }}
                            >
                              ✓
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                      {n}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <label className="field">
              <span className="field__label">Tell Us About Your Current IT Challenges</span>
              <textarea
                className="field__input field__input--area"
                name="challenges"
                placeholder="Tell us what you’re looking to improve, migrate, secure, or manage."
              />
            </label>

            <div className="form__footer">
              <p className="form__micro">
                Our team will review your request and connect you with the appropriate Managed IT specialist.
              </p>
              <button type="submit" className="btn btn--primary form__submit">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={sent ? "sent" : "idle"}
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -16, opacity: 0 }}
                    transition={{ duration: 0.2, ease: EASE_OUT_QUINT }}
                  >
                    {sent ? "Inquiry Sent" : "Submit Inquiry"}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
