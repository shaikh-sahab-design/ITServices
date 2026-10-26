import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { StatsBand, Story, Testimonial, Timeline, ValuesBento } from "@/components/page/About";
import { PageHero } from "@/components/page/PageHero";
import { PHONE, ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "About Us | Folio3 Managed IT Services",
  description:
    "We close the gap between what technology promises and what businesses experience because you need IT that delivers.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="inner-page">
        <PageHero
          image="/images/hero-about.webp"
          tint="4, 16, 41"
          fade={[22.3, 70.6]}
          copyWidth={592}
          title={["One Mission.", "Built on Trust"]}
          lede="We close the gap between what technology promises and what businesses experience because you need IT that delivers."
          actions={[
            { label: "Get a Free Consultation", href: ROUTES.contact, variant: "primary" },
            { label: PHONE.label, href: PHONE.href, variant: "ghost" },
          ]}
        />

        <StatsBand
          stats={[
            {
              icon: "/icons/about-stat-years.svg",
              value: "20+",
              label: "Years of Engineering Excellence",
              note: "Folio3 founded in 2005",
            },
            {
              icon: "/icons/about-stat-clients.svg",
              value: "500+",
              label: "Enterprise Clients Served",
              note: "Across 15+ industries",
            },
            {
              icon: "/icons/about-stat-offices.svg",
              value: "08",
              label: "Global Office Locations",
              note: "US · UK · Canada · UAE · AU · PK · MX · BG",
            },
            {
              icon: "/icons/about-stat-people.svg",
              value: "1,200+",
              label: "Technology Professionals",
              note: "Combined across all Folio3 divisions",
            },
          ]}
        />

        <Story
          tag="Our Story"
          title={<>Built to Bridge the Gap<br />Between IT and Business</>}
          paragraphs={[
            "Folio3 was founded in 2005 with a belief that technology should drive business growth, not create friction. For 20 years, we’ve helped enterprises across industries build reliable technology environments.",
            "Our Managed IT division combines enterprise expertise with dedicated support, managing thousands of endpoints across 8 countries with a proven track record of zero client breaches.",
          ]}
          actions={[
            { label: "Work With Us", href: ROUTES.contact, variant: "primary" },
            { label: "Explore Services", href: ROUTES.services, variant: "outline" },
          ]}
          image={{ src: "/images/about-story.webp", alt: "Two people shaking hands over a glowing network of connections" }}
        />

        <Timeline
          title="Our Journey of Growth & Innovation"
          items={[
            {
              year: "2005",
              text: "Folio3 Software Inc. founded in San Jose, California",
              icon: "/icons/tl-2005.svg",
              badge: "/icons/tl-flag.svg",
              card: "top",
            },
            {
              year: "2010",
              text: "Expanded to UK & Pakistan; first international offices opened",
              icon: "/icons/tl-2010.svg",
              card: "bottom",
            },
            {
              year: "2015",
              text: "Reached 100+ enterprise clients across manufacturing and finance",
              icon: "/icons/tl-2015.svg",
              card: "top",
            },
            {
              year: "2018",
              text: "Launched dedicated Managed IT Services division",
              icon: "/icons/tl-2018.svg",
              card: "bottom",
            },
            {
              year: "2021",
              text: "Achieved ISO 27001 & SOC 2 Type II security certifications",
              icon: "/icons/tl-2021.svg",
              badge: "/icons/tl-verified.svg",
              card: "top",
            },
            {
              year: "2024",
              text: "Expanded to 8 global offices · 500+ managed IT clients worldwide",
              icon: "/icons/tl-2024.svg",
              card: "bottom",
            },
          ]}
        />

        <ValuesBento
          eyebrow="What We Stand For"
          title="The Principles Behind Every Decision"
          text="These aren't values on a wall. They're the standards we hold ourselves to in every client engagement."
          values={[
            {
              icon: "/icons/value-client.svg",
              title: "Client-First, Always",
              text: "We measure success by business outcomes, not ticket volume. Every recommendation, decision, and solution is aligned with your goals, priorities, and long-term technology needs.",
            },
            {
              icon: "/icons/value-improving.svg",
              title: "Continuously Improving",
              text: "We continuously refine systems through regular reviews, roadmap planning, and engineering improvements. Our approach helps businesses maintain reliable, secure, and scalable technology environments.",
            },
            {
              icon: "/icons/value-excellence.svg",
              title: "Uncompromising Excellence",
              text: "We maintain high standards across every engagement, focusing on quality delivery, technical accuracy, and solutions that improve infrastructure performance while supporting business objectives.",
            },
            {
              icon: "/icons/value-transparency.svg",
              title: "Radical Transparency",
              text: "We provide clear communication, straightforward reporting, and complete visibility into our work. You always understand what is being done, why it matters, and how it supports your goals.",
            },
            {
              icon: "/icons/value-security.svg",
              title: "Security-First Mindset",
              text: "Security is integrated into every engagement through proactive controls, risk awareness, and best practices. We help protect systems while maintaining operational efficiency and compliance readiness.",
            },
            {
              icon: "/icons/value-proactive.svg",
              title: "Proactive by Design",
              text: "We focus on preventing issues before they disrupt operations through continuous monitoring, proactive maintenance, and early identification of potential technology risks.",
            },
          ]}
        />

        <Testimonial
          eyebrow="Trusted IT Management Support"
          title="What Our Clients Say"
          lede="Real-world outcomes from organizations improving their support experience, security posture, and confidence in their systems."
          photo={{ src: "/images/testimonial-shahid.webp", alt: "Shahid Azeem" }}
          quote="“We’ve been extremely impressed with Folio3’s outsourced IT support team. They’ve taken the time to understand our people and operations, delivering seamless, reliable support and clear communication. Most importantly, they’ve become a true extension of our IT team, strengthening both our technical capabilities and the support experience we provide.”"
          name="Shahid Azeem"
          role="Managing Director, ArcomIT"
          logo={{ src: "/images/logo-arcom-mark.webp", alt: "ArcomIT" }}
        />
      </main>
      <Footer />
    </>
  );
}
