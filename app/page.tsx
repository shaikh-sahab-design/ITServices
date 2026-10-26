import { CaseStudies } from "@/components/CaseStudies";
import { Clients } from "@/components/Clients";
import { ContactForm } from "@/components/ContactForm";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Journey } from "@/components/Journey";
import { Nav } from "@/components/Nav";
import { Services } from "@/components/Services";
import { Stats } from "@/components/Stats";
import { Testimonials } from "@/components/Testimonials";
import { TrustStrip } from "@/components/TrustStrip";
import { Verticals } from "@/components/Verticals";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        {/* Everything after the banner scrolls up over it while the banner stays pinned. */}
        <div className="hero-cover">
          <TrustStrip />
          <Services />
          <Verticals />
          <Stats />
          <Clients />
          <CaseStudies />
          <Journey />
          <Testimonials />
          <Faq />
          <ContactForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
