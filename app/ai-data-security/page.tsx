import type { Metadata } from "next";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import {
  AiaAdoption,
  AiaAudiences,
  AiaCoverage,
  AiaDefinition,
  AiaExposure,
  AiaProcess,
  AiaWhy,
} from "@/components/page/Aia";
import { CtaStrip } from "@/components/page/CtaStrip";
import { PageHero } from "@/components/page/PageHero";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "AI Data Security Services | Folio3 Managed IT Services",
  description:
    "AI data security protects sensitive, confidential and regulated information as it moves through AI applications, platforms, integrations and workflows.",
};

const C = ROUTES.contact;

const FAQS = [
  {
    q: "What are AI data security services?",
    a: "AI data security services protect the sensitive, confidential and regulated information used by AI systems and the applications, platforms and integrations connected to them.",
  },
  {
    q: "Why is AI data security important?",
    a: "AI systems create new ways for sensitive information to be processed, accessed, transferred and exposed.",
  },
  {
    q: "What does an AI data security assessment cover?",
    a: "It covers sensitive data, data flows, access controls, data exposure, protection measures and security requirements across your AI environment.",
  },
  {
    q: "Can you assess how data moves through our AI environment?",
    a: "Yes. Data flow assessments review how information moves between AI applications, platforms, integrations, users and other systems.",
  },
  {
    q: "Can you review access to AI-related data?",
    a: "Yes. Access reviews cover user, application, service and privileged access to the information used in your AI environment.",
  },
  {
    q: "Can you help identify sensitive data exposure?",
    a: "Yes. The assessment pinpoints where sensitive, confidential or regulated information could be unnecessarily exposed.",
  },
  {
    q: "What happens after the assessment?",
    a: "Findings are prioritized and turned into practical recommendations to improve AI data protection and cut unnecessary exposure.",
  },
];

export default function AiDataSecurityPage() {
  return (
    <>
      <Nav />
      <main className="inner-page">
        <PageHero
          compact
          image="/images/hero-ai-assessment.webp"
          title={["AI Data Security Services That", "Keep Sensitive Data Out of the Wrong Hands"]}
        />

        <AiaExposure
          title="AI puts your data in places it was never meant to go"
          lead="AI systems can process information that was never supposed to leave your core business systems."
          text="Sensitive business data, customer records, intellectual property and regulated information now move through AI applications, platforms, integrations and workflows."
          cta={{ label: "Uncover Your AI Data Risks", href: C }}
          box={{
            title: "Without clear data security controls, it’s hard to know:",
            items: [
              "What sensitive data your AI is using",
              "Where your AI data is flowing",
              "Who or what can access it",
              "Whether data is exposed through AI applications or integrations",
              "How AI data is handled and stored",
              "Which data security risks need immediate attention",
            ],
          }}
        />

        <AiaDefinition
          title="What is AI data security?"
          lead="Protect sensitive data at every stage of the AI lifecycle"
          paragraphs={[
            "AI data security protects sensitive, confidential and regulated information as it moves through AI applications, platforms, integrations and workflows.",
            "Data security isn’t looked at in isolation. Folio3 connects data flows, access controls, exposure risks, handling practices and security requirements to protect the information your AI uses.",
          ]}
          band={{
            title: "The goal is simple:",
            text: "Know what data is in use, control who can access it and cut unnecessary exposure.",
            cta: { label: "Get an AI Data Security Assessment", href: C },
          }}
        />

        <AiaWhy
          title="Why more AI means more places for data to leak"
          aside="AI adoption multiplies the places where sensitive information gets processed and accessed."
          cta={{ label: "Assess Your AI Data Security", href: C }}
          rows={[
            {
              title: "Sensitive data enters AI workflows",
              text: "Business, customer, employee and confidential information gets submitted to AI applications and processes.",
            },
            {
              title: "Data moves across multiple systems",
              text: "AI applications connect with platforms, APIs, applications, storage and other data sources.",
            },
            {
              title: "Access gets hard to track",
              text: "Many users, applications and services can interact with AI data at once.",
            },
            {
              title: "Integrations open new exposure paths",
              text: "Connected applications and third-party services create extra routes for data to be accessed or transferred.",
            },
            {
              title: "Data security must keep pace with AI",
              text: "As AI applications and use cases grow, data security controls need to grow with them.",
            },
          ]}
        />

        <AiaCoverage
          title="What’s Covered"
          cta={{ label: "Protect Your AI Data", href: C }}
          aside={{
            title: "AI data security services from access to exposure",
            text: "Folio3 assesses how sensitive information is accessed, processed, transferred and protected across your AI environment.",
          }}
          areas={[
            {
              label: "Know What’s at Stake",
              title: "Sensitive Data Identification",
              text: "Find the sensitive, confidential and regulated information your AI systems process or could expose.",
              focus: ["Sensitive data", "Confidential information", "Regulated data", "AI data usage"],
            },
            {
              label: "Follow the Data",
              title: "AI Data Flow Assessment",
              text: "Review how information moves between AI applications, platforms, integrations, users and other systems.",
              focus: ["AI data flows", "Data movement", "Data sources", "Data destinations"],
            },
            {
              label: "Control Who Sees It",
              title: "Data Access Controls",
              text: "Review who and what can access the information used in your AI environment.",
              focus: ["User access", "Application access", "Permissions", "Authentication"],
            },
            {
              label: "Find the Leaks",
              title: "Data Exposure Assessment",
              text: "Pinpoint where sensitive information could be unnecessarily exposed through AI applications, integrations or workflows.",
              focus: ["Data exposure", "Unauthorized access", "External access", "AI application exposure"],
            },
            {
              label: "Test Your Safeguards",
              title: "Data Protection Reviews",
              text: "Review the controls and practices that protect information across your AI workflows.",
              focus: ["Data protection", "Security controls", "Data handling", "Storage"],
            },
            {
              label: "Fix What Matters",
              title: "AI Data Security Recommendations",
              text: "Turn findings into practical steps that strengthen AI data protection.",
              focus: ["Risk prioritization", "Security recommendations", "Control improvements", "Data protection guidance"],
            },
          ]}
        />

        <AiaProcess
          eyebrow="How It Works"
          title="From data discovery to a clear protection plan"
          cta={{ label: "Start Your AI Data Security Assessment", href: C }}
          steps={[
            {
              title: "Understand your AI data environment",
              text: "Folio3 identifies the AI applications, platforms, data sources, integrations, users and workflows in scope.",
              outcome: "A clear view of where AI touches your data.",
            },
            {
              title: "Map data flows",
              text: "The way information moves into, through and out of your AI environment is examined.",
              outcome: "Visibility into AI data movement and potential exposure.",
            },
            {
              title: "Assess data controls",
              text: "Access controls, handling practices, protection measures and security requirements are reviewed.",
              outcome: "A clear picture of your existing AI data protections.",
            },
            {
              title: "Identify and prioritize risks",
              text: "Data exposure and unauthorized-use risks are identified and ranked by relevance and impact.",
              outcome: "A prioritized view of AI data security risks.",
            },
            {
              title: "Recommend next steps",
              text: "Findings become practical recommendations to strengthen protection and cut unnecessary exposure.",
              outcome: "A structured path to stronger AI data security.",
            },
          ]}
        />

        <AiaAdoption
          title="Data protection that keeps up with how you use AI"
          text="AI data protection should grow with the way your organization uses AI. Through Folio3 managed security services, AI data protection becomes an ongoing practice, not a one-off review."
          stages={[
            {
              icon: "/icons/ads-before.svg",
              title: "Before AI adoption",
              text: "Decide what information can be used with AI and set the right data security requirements.",
            },
            {
              icon: "/icons/ads-during.svg",
              title: "During AI integration",
              text: "Review how AI connects with data sources, applications, APIs and users.",
            },
            {
              icon: "/icons/ads-expands.svg",
              title: "As AI Expands",
              text: "Reassess data flows, access and exposure as new AI applications and use cases appear.",
            },
          ]}
          cta={{ label: "Build a Stronger AI Data Security Foundation", href: C }}
        />

        <AiaAudiences
          title="Who needs AI data security most"
          cta={{ label: "Assess Your AI Data Security", href: C }}
          items={[
            {
              title: "Organizations using sensitive data with AI",
              text: "Assess how confidential and regulated information is handled in your AI environment.",
            },
            {
              title: "Teams connecting AI to business data",
              text: "Review data flows and access across AI applications and connected systems.",
            },
            {
              title: "Organizations expanding AI workflows",
              text: "Understand how new AI use cases could create new data exposure.",
            },
            {
              title: "Security and data protection teams",
              text: "Gain clear visibility into AI-related data security risks and controls.",
            },
          ]}
        />

        <div className="faq-section aia-faq">
          <Faq items={FAQS} cta={{ label: "Discuss Your AI Data Security Needs", href: C }} />
        </div>

        <CtaStrip
          title="Know exactly where your AI data is going"
          text="Map your AI data environment, find exposure risks and put stronger controls around the information your AI depends on with Folio3 AI data security services."
          cta={{ label: "Get an AI Data Security Assessment", href: C }}
          note="A Folio3 specialist will review your AI data environment and security requirements, then recommend the most practical next step."
        />
      </main>
      <Footer />
    </>
  );
}
