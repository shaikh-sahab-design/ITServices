import { Reveal } from "./motion";

const CERTS = [
  { src: "/images/cert-microsoft-gold.png", alt: "Microsoft Gold Partner", w: 132, h: 40, pill: 185 },
  { src: "/images/cert-aws.png", alt: "AWS Partner, Advanced Tier Services", w: 46, h: 46, pill: 110 },
  { src: "/images/cert-azure-msp.png", alt: "Microsoft Partner, Azure Expert MSP", w: 71, h: 40, pill: 129 },
  { src: "/images/cert-iso.png", alt: "ISO 27701 certified", w: 40, h: 40, pill: 90 },
  { src: "/images/cert-google-cloud.png", alt: "Google Cloud Partner", w: 118, h: 40, pill: 140 },
  { src: "/images/cert-hipaa.png", alt: "HIPAA compliant", w: 84, h: 40, pill: 126 },
  { src: "/images/cert-soc2.png", alt: "SOC 2 Type II certified", w: 89, h: 50, pill: 129 },
];

export function TrustStrip() {
  // The row is rendered twice so the CSS marquee can loop seamlessly.
  const row = (hidden: boolean) => (
    <ul className="marquee__row" aria-hidden={hidden || undefined}>
      {CERTS.map((c) => (
        <li key={c.src} className="cert-pill" style={{ width: c.pill }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={c.src} alt={hidden ? "" : c.alt} width={c.w} height={c.h} loading="lazy" />
        </li>
      ))}
    </ul>
  );

  return (
    <section className="trust" aria-label="Trust and certification">
      <Reveal className="trust__intro">
        <h2 className="trust__title">TRUST / CERTIFICATION</h2>
        <p className="trust__sub">
          Trusted by <strong className="t-red">500+</strong> Organisations · Certified Partners
        </p>
      </Reveal>
      <div className="trust__divider" aria-hidden="true" />
      <div className="marquee">
        <div className="marquee__track">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
