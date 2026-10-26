import { MailIcon, PhoneIcon, PinIcon } from "./icons";
import { Reveal } from "./motion";
import { asset } from "@/lib/asset";

const COLUMNS = [
  {
    title: "Managed IT",
    links: [
      "Managed IT Support",
      "Network & Infrastructure",
      "Migration Services",
      "Backup & Disaster Recovery",
      "IT Strategy & vCIO",
      "Database Management",
      "Identity & Access Management",
    ],
  },
  {
    title: "Managed Security",
    links: [
      "Vulnerability Assessment & Penetration Testing",
      "Security Operations Center (SOC)",
      "Threat Detection & Incident Response",
      "Cloud Security",
      "Endpoint & Identity Security",
      "Security Compliance & Risk",
    ],
  },
  {
    title: "AI Security",
    links: [
      "AI Security Assessment",
      "AI Governance & Risk",
      "AI Data Security",
      "AI Application & LLM Security",
      "AI Agent Security",
      "AI Red Teaming",
    ],
  },
  { title: "Company", links: ["About", "Careers", "Contact Us"] },
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
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="footer__link">{l}</a>
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
