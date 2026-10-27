import Link from "next/link";
import { Reveal } from "../motion";

type Props = { title: string; text: string; cta: { label: string; href: string }; note?: string; secondary?: { label: string; href: string }; tight?: boolean };

/** The dark "CTA" component from Figma, used as its own band near the foot of inner pages. */
export function CtaStrip({ title, text, cta, note, secondary, tight }: Props) {
  return (
    <section className="cta-strip">
      <div className="container">
        <Reveal className={`cta-band cta-band--strip${tight ? " cta-band--tight" : ""}`}>
          <div className="cta-band__copy">
            <p className="cta-band__title">{title}</p>
            <p className="cta-band__text">{text}</p>
            {note && <p className="cta-band__note">{note}</p>}
          </div>
          {secondary ? (
            <div className="cta-band__actions">
              <Link href={cta.href} className="btn btn--yellow">
                {cta.label}
              </Link>
              <Link href={secondary.href} className="btn btn--ghost">
                {secondary.label}
              </Link>
            </div>
          ) : (
            <Link href={cta.href} className="btn btn--yellow">
              {cta.label}
            </Link>
          )}
        </Reveal>
      </div>
    </section>
  );
}
