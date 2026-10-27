import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { SERVICE_GROUPS } from "@/lib/services";
import { MailIcon, PhoneIcon, PinIcon } from "./icons";
import { Reveal } from "./motion";
import { asset } from "@/lib/asset";

const R = ROUTES;

const COLUMNS = [
  ...SERVICE_GROUPS.map((g) => ({ title: g.title, links: g.links.map((l) => [l.label, l.href]) })),
  {
    title: "Company",
    links: [
      ["About", R.about],
      ["Careers", R.about],
      ["Contact Us", R.contact],
    ],
  },
];

const STANDARDS = ["ISO/IEC 27001", "NIST", "CIS Controls", "OWASP", "SOC 2", "GDPR"];

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <Reveal className="footer__top" y={16}>
          <div className="footer__brand">
            <div className="footer__logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset("/images/folio3-mark.png")} alt="folio3" width={74} height={36} />
              <span className="footer__logo-rule" aria-hidden="true" />
              <span className="footer__logo-text">
                Managed IT &amp;
                <br />
                Cybersecurity Services
              </span>
            </div>
            <p className="footer__name">Folio3 Managed IT Services</p>
            <p className="footer__about">
              Managed IT, Managed Security, and AI Security, all connected to help your business run reliably, stay
              protected, and adopt new technology with confidence.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <nav key={col.title} className="footer__col" aria-label={col.title}>
              <p className="footer__heading">{col.title}</p>
              <ul>
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="footer__link">{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </Reveal>
      </div>

      <div className="footer__mid">
        <div className="container footer__mid-inner">
          <ul className="footer__contact">
            <li>
              <PhoneIcon />
              <a href="tel:+14084123813">+1 (408) 412-3813</a>
            </li>
            <li>
              <MailIcon />
              <a href="mailto:support-mspit@folio3.com">support-mspit@folio3.com</a>
            </li>
            <li>
              <PinIcon />
              <span>
                4010 Moorpark Ave, Suite 101,
                <br />
                San Jose, CA 95117
              </span>
            </li>
          </ul>
          <ul className="footer__standards" aria-label="Trust and security standards">
            {STANDARDS.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>

      <p className="footer__legal container">
        © 2026 Folio3 Software Inc. All rights reserved. Folio3 Managed IT services provides managed IT, managed
        security, and AI security services.
      </p>
    </footer>
  );
}
