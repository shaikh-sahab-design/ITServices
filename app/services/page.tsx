import type { Metadata } from "next";
import { Clients } from "@/components/Clients";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { CtaStrip } from "@/components/page/CtaStrip";
import { IconCards } from "@/components/page/IconCards";
import { PageHero } from "@/components/page/PageHero";
import { ServicePortfolio } from "@/components/page/ServicePortfolio";
import { SplitFeature } from "@/components/page/SplitFeature";
import { PHONE, ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Managed IT, Security and AI Security Services | Folio3",
  description:
    "Managed services that bring cybersecurity, AI security and IT under one team, so your technology runs reliably, stays protected, and is ready for AI.",
};

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main className="inner-page">
        <PageHero
          image="/images/services-hero.webp"
          tint="4, 16, 41"
          title={["Managed Services That Close", "Every IT, Security and AI Gap"]}
          lede="Managed services that bring cybersecurity, AI security and IT under one team, so your technology runs reliably, stays protected, and is ready for AI."
          actions={[
            { label: "Get a Free Consultation", href: "#contact", variant: "primary" },
            { label: PHONE.label, href: PHONE.href, variant: "ghost" },
          ]}
        />

        <ServicePortfolio />

        <SplitFeature
          flushTop
          title="Managed IT services that keep every system running"
          columns={[
            ["Network and infrastructure", "Migration services", "Backup and disaster recovery"],
            ["IT strategy and vCIO", "Database management", "Identity and access management"],
          ]}
          cta={{ label: "Explore Managed IT Services", href: ROUTES.managedIt }}
          image={{ src: "/images/split-managed-it.webp", alt: "Engineer typing beside a holographic AI dashboard" }}
        />

        <SplitFeature
          tone="soft"
          imageSide="left"
          title="Managed security services that catch threats before they spread"
          columns={[
            [
              "Vulnerability assessment and penetration testing",
              "SOC and security monitoring",
              "Threat detection and incident response",
            ],
            ["Cloud security", "Endpoint and identity security", "Security compliance and risk"],
          ]}
          cta={{ label: "Explore Managed Security Services", href: ROUTES.managedSecurity }}
          image={{ src: "/images/split-managed-security.webp", alt: "Data center with connected security icons" }}
        />

        <SplitFeature
          title="AI security services for the tools your teams already use"
          columns={[
            ["AI security assessment", "AI governance and risk", "AI data security", "AI application and LLM security"],
            ["AI agent security", "AI red teaming", "AI security monitoring"],
          ]}
          cta={{ label: "Explore AI Security Services", href: ROUTES.aiSecurity }}
          image={{ src: "/images/split-ai-security.webp", alt: "AI core connected to data, users, cloud and security" }}
        />

        <IconCards
          tone="dark"
          eyebrow="What You Can Expect"
          title="Why one managed services provider beats three separate vendors"
          lede="With Folio3, these capabilities can work together under one broader technology partnership."
          cta={{ label: "Talk to a Managed Services Expert", href: "#contact" }}
          cards={[
            {
              icon: "/icons/why-view.svg",
              title: "One Technology View",
              text: "IT operations, security, and AI requirements are considered together rather than in isolation.",
            },
            {
              icon: "/icons/why-expertise.svg",
              title: "Connected Expertise",
              text: "Access specialists across managed IT, cybersecurity, infrastructure, identity, compliance, and AI security.",
            },
            {
              icon: "/icons/why-flexible.svg",
              title: "Flexible Engagement",
              text: "Start with one service and expand into other areas as your requirements change.",
            },
            {
              icon: "/icons/why-partnership.svg",
              title: "Ongoing Partnership",
              text: "Get continued technical support, monitoring, management, and guidance—not just one-off projects.",
            },
          ]}
        />

        <IconCards
          tone="outline"
          title="Start with one service or bring everything together"
          lede="Engage Folio3 for a single service, a full service category, or a combination built around your environment."
          cards={[
            {
              icon: "/icons/engage-it.svg",
              title: "Managed IT Services",
              text: "For ongoing IT operations, infrastructure, support and technology management.",
              cta: { label: "Explore Managed IT Services", href: ROUTES.managedIt },
            },
            {
              icon: "/icons/engage-security.svg",
              title: "Managed Security Services",
              text: "For cybersecurity assessment, monitoring, detection, response and compliance.",
              cta: { label: "Explore Managed Security Services", href: ROUTES.managedSecurity },
            },
            {
              icon: "/icons/engage-ai.svg",
              title: "AI Security Services",
              text: "For AI assessment, governance, data security, application security, agent security and red teaming.",
              cta: { label: "Explore AI Security Services", href: ROUTES.aiSecurity },
            },
          ]}
        />

        <CtaStrip
          title="See exactly where your IT and security stand today"
          text="Tell Folio3 what you need to manage, secure, improve or prepare for. A specialist will help you identify the services that fit your environment."
          cta={{ label: "Talk to a Managed Services Expert", href: "#contact" }}
        />

        <Clients title="Trusted by businesses worldwide" className="section--flush section--pb80" />

        <ContactForm className="contact--flush" />
      </main>
      <Footer />
    </>
  );
}
