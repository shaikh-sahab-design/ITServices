import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { CtaStrip } from "@/components/page/CtaStrip";
import { ContactOptions, ThankYouHero } from "@/components/page/ThankYou";
import { PHONE } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Thank You | Folio3 Managed IT Services",
  description: "Your request has been received. Our team will get back to you within 2 business hours.",
  robots: { index: false },
};

export default function ThankYouPage() {
  return (
    <>
      <Nav />
      <main className="inner-page">
        <ThankYouHero />
        {/* Everything after the banner scrolls up over it while the banner stays pinned, as on Home. */}
        <div className="hero-cover ty-cover">
          <ContactOptions />
          <div className="ty-cta">
            <CtaStrip
              title="Still Have Questions?"
              text="Tell us where you're facing challenges, and we'll help identify the right services and next steps."
              cta={{ label: "Call Us Now", href: PHONE.href }}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
