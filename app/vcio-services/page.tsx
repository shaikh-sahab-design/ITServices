import type { Metadata } from "next";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Journey } from "@/components/Journey";
import { Nav } from "@/components/Nav";
import { PageHero } from "@/components/page/PageHero";
import {
  VcioBenefit,
  VcioChallenges,
  VcioFramework,
  VcioIntro,
  VcioOutcome,
  VcioTrust,
} from "@/components/page/Vcio";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Virtual CIO Consulting Services | Folio3 Managed IT Services",
  description:
    "A Virtual CIO (vCIO) is an outsourced technology executive who helps businesses plan IT strategy, manage technology investments, evaluate vendors, strengthen cybersecurity governance, and build long-term technology roadmaps.",
};

const C = ROUTES.contact;

// Only the open question has an answer in the Figma frame.
const FAQS = [
  { q: "How is a Virtual CIO different from Managed IT Services?" },
  {
    q: "Is a Virtual CIO right for small and mid-sized businesses?",
    a: "Yes. Many growing businesses need executive technology guidance but don't require a full-time CIO. A Virtual CIO provides access to senior technology expertise on a flexible basis, making it easier to plan for growth, manage risk, and align IT with business objectives.",
  },
  { q: "What industries do you support?" },
  { q: "Can a Virtual CIO help with cybersecurity and compliance?" },
  { q: "How do we get started?" },
  { q: "Ready to Build a Smarter Technology Strategy?" },
];

export default function VcioServicesPage() {
  return (
    <>
      <Nav />
      <main className="inner-page">
        <PageHero compact image="/images/hero-vcio.webp" title={["Virtual CIO Consulting for", "Smarter IT Decisions"]} />

        <VcioIntro
          why={{
            title: "Why businesses choose Folio3",
            items: [
              "Tech leadership without full-time CIO cost",
              "Expertise in cloud, cybersecurity, AI, and infrastructure",
              "Vendor-neutral advice aligned with your goals",
              "Flexible engagements that scale as your business evolves",
            ],
          }}
          what={{
            title: "What is a Virtual CIO?",
            text: "A Virtual CIO (vCIO) is an outsourced technology executive who helps businesses plan IT strategy, manage technology investments, evaluate vendors, strengthen cybersecurity governance, and build long-term technology roadmaps—without hiring a full-time CIO.",
            stat: { value: "20+ Years", label: "Delivering Enterprise Technology Solutions" },
          }}
        />

        <VcioChallenges
          title="When Technology Slows Growth, Strategic Leadership Matters"
          lede="You may already have capable IT staff or a managed services provider. But as the business grows, technology decisions become more complex, and someone needs to ensure those decisions support your long-term objectives."
          cards={[
            {
              icon: "/icons/vcio-ch-direction.svg",
              title: "Technology Lacks Strategic Direction",
              text: "A VCIO helps align initiatives with business goals and create a structured technology plan that supports growth, efficiency, and long-term business objectives.",
              note: "Technology investments can become disconnected without a clear roadmap.",
            },
            {
              icon: "/icons/vcio-ch-costs.svg",
              title: "Technology Costs Lack Clear Value",
              text: "A VCIO reviews your technology portfolio, identifies optimization opportunities, and ensures resources are focused on initiatives that deliver business value and operational improvement.",
              note: "Technology spending can increase without measurable outcomes.",
            },
            {
              icon: "/icons/vcio-ch-planning.svg",
              title: "Business Changes Require Planning",
              text: "A VCIO helps assess risks, define priorities, and guide initiatives such as modernization, migrations, and strategic technology improvements.",
              note: "Major technology changes require careful planning and execution.",
            },
            {
              icon: "/icons/vcio-ch-visibility.svg",
              title: "Leadership Needs Better Visibility",
              text: "A VCIO provides structured reporting and measurable objectives that help leadership make informed technology decisions with greater confidence.",
              note: "Executives require clear insight into technology performance, risks, investments, and priorities.",
            },
          ]}
        />

        <VcioBenefit
          image={{ src: "/images/vcio-benefit.webp", alt: "IT team working at monitoring desks under a wall-sized threat map" }}
          title="You may benefit from a Virtual CIO if:"
          items={[
            "IT spending continues to grow without clear ROI",
            "Cloud and software decisions are made department by department",
            "Vendor contracts renew without strategic review",
            "Leadership lacks a 12-month technology roadmap",
            "Cybersecurity planning is reactive instead of proactive",
          ]}
          cta={{ label: "Schedule a Free IT Strategy Review", href: C }}
          prompt={{
            title: "If these challenges sound familiar,",
            text: "it may be time to evaluate whether your business has the right level of technology leadership, not just the right technology.",
          }}
        />

        <VcioFramework
          eyebrow="Folio3 Strategic Framework"
          title="Optimize Business Outcomes with Folio3"
          cards={[
            { label: "Initiative", icon: "/icons/vcio-fw-rocket.svg", title: "Drive Innovation", text: "High impact strategic technology initiatives" },
            { label: "Execution", icon: "/icons/vcio-fw-chart.svg", title: "Scale Operations", text: "Executing high value operational improvements" },
            { label: "Planning", icon: "/icons/vcio-fw-target.svg", title: "Assess Risk", text: "Foundational planning for risk management" },
            { label: "Tactical", icon: "/icons/vcio-fw-award.svg", title: "Manage Vendors", text: "Tactical support for purchasing decisions" },
          ]}
        />

        <VcioOutcome
          title="The Outcome"
          text="By combining executive technology leadership with practical planning, our Virtual CIOs help your organization make smarter technology decisions, control IT spending, strengthen governance, and build a foundation that supports sustainable business growth."
          cta={{ label: "Book Your Free IT Strategy Review Today", href: C }}
          image={{ src: "/images/vcio-outcome.webp", alt: "Two business people shaking hands over a glowing digital network" }}
        />

        <VcioTrust
          title="Why Trust Folio3?"
          lede="Your Virtual CIO isn't working in isolation. Folio3 specialists collaborate with virtual CIOs across cybersecurity, networking, enterprise applications, AI, and managed IT services to provide well-rounded guidance for every initiative and to make well informed decisions."
          cards={[
            {
              tone: "yellow",
              image: { src: "/images/vcio-trust-expertise.webp", alt: "Robot hand working on server cabling" },
              icon: "/icons/vcio-trust-expertise.svg",
              title: "Backed by Cross-Functional Expertise",
              text: "Your Virtual CIO isn't working in isolation. Folio3 specialists collaborate with virtual CIOs across cybersecurity, networking, enterprise applications, AI, and managed IT services to provide well-rounded guidance for every initiative and to make well informed decisions.",
            },
            {
              tone: "blue",
              image: { src: "/images/vcio-trust-guidance.webp", alt: "Engineer holding a laptop in a server room" },
              icon: "/icons/vcio-trust-guidance.svg",
              title: "Practical Guidance, Not Generic Recommendations",
              text: "Every recommendation is based on your organization's goals, technology landscape, and operational priorities. We focus on practical strategies that your leadership team can implement, not lengthy reports filled with theoretical recommendations.",
            },
          ]}
        />

        <Journey
          flush
          title="Our Process"
          cta={{
            title: "Ready to strengthen your IT operations?",
            text: "We will continue to guide your business through planning, budgeting, projects, vendor management, and technology decisions.",
            label: "Get Started Today",
            href: C,
          }}
        />

        <div className="faq-section">
          <Faq items={FAQS} />
        </div>
      </main>
      <Footer />
    </>
  );
}
