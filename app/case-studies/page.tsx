import type { Metadata } from "next";
import { Clients } from "@/components/Clients";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { CaseGrid } from "@/components/page/CaseGrid";
import { PageHero } from "@/components/page/PageHero";
import { PHONE, ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Case Studies | Folio3 Managed IT Services",
  description:
    "Every organization has different technology requirements. Our case studies highlight how we work alongside client teams to address IT challenges, improve operations, and deliver dependable technology support.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <Nav />
      <main className="inner-page">
        <PageHero
          image="/images/hero-case-studies.webp"
          fade={[39.2, 90]}
          copyWidth={592}
          title={["OUR SUCCESS STORIES"]}
          lede="Every organization has different technology requirements. Our case studies highlight how we work alongside client teams to address IT challenges, improve operations, and deliver dependable technology support."
          actions={[
            { label: "Get a Free Consultation", href: ROUTES.contact, variant: "primary" },
            { label: PHONE.label, href: PHONE.href, variant: "ghost" },
          ]}
        />

        <CaseGrid
          cards={[
            {
              logo: { src: "/images/client-arcom.png", alt: "Arcom IT", w: 211, h: 50 },
              sector: "IT Services",
              image: "/images/case-arcom.webp",
              title: "Folio3 Becomes an Extension of Arcom IT's IT Team",
              text: "Folio3 provides outsourced IT support for Arcom IT, working alongside its existing team to enhance technical capabilities, support end users, and strengthen day-to-day IT operations.",
              tags: ["Managed IT Support", "Technical Support", "Service Desk"],
              href: ROUTES.caseArcom,
            },
            {
              logo: { src: "/images/client-activecomply.png", alt: "ActiveComply", w: 211, h: 40 },
              sector: "Compliance",
              image: "/images/case-activecomply.webp",
              title: "Strengthening IT Operations and Security for ActiveComply",
              text: "Folio3 supports ActiveComply across managed IT operations, endpoint management, security, compliance, and ongoing technology administration.",
              tags: ["Managed IT", "Defender", "Compliance", "Intune"],
              href: ROUTES.caseActiveComply,
            },
            {
              logo: { src: "/images/client-opportune.png", alt: "Opportune", w: 154, h: 50 },
              sector: "Prof. Services",
              image: "/images/case-opportune.webp",
              title: "Supporting IT Operations Across a Complex Business Environment",
              text: "Folio3 provides technical support across Microsoft 365, Azure, infrastructure, user administration, and day-to-day IT operations for Opportune.",
              tags: ["Microsoft 365", "Azure", "Infrastructure", "IT Support"],
              href: ROUTES.caseOpportune,
            },
            {
              logo: { src: "/images/client-io-solution.png", alt: "IO Solution", w: 142, h: 50 },
              sector: "IT Services",
              image: "/images/case-io-solution.webp",
              title: "Building Reliable IT Operations Through Technical Partnership",
              text: "A managed IT partnership focused on supporting users, maintaining technology environments, and providing additional technical expertise.",
              tags: ["Technical Support", "Infrastructure", "Managed IT"],
              // The design has no IO Solution detail page yet.
              href: ROUTES.contact,
            },
          ]}
        />

        <Clients className="section--pt80 section--pb80" />
        <ContactForm className="contact--flush" />
      </main>
      <Footer />
    </>
  );
}
