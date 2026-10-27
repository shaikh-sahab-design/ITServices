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
  title: "AI Security Assessment | Folio3 Managed IT Services",
  description:
    "An AI Security Assessment evaluates the security of your AI applications, platforms, integrations, data flows, access controls, and supporting environment to identify weaknesses and security risks.",
};

const C = ROUTES.contact;

// The Figma frame reuses the Virtual CIO questions here; only the open one has an answer.
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

export default function AiSecurityAssessmentPage() {
  return (
    <>
      <Nav />
      <main className="inner-page">
        <PageHero
          compact
          image="/images/hero-ai-assessment.webp"
          title={["Identify AI Security Risks Before", "They Become Business Risks"]}
        />

        <AiaExposure
          title="AI Introduces Security Risks Across the Entire AI Environment"
          lead="AI security isn't limited to the model itself."
          text="An AI application may connect to business data, external APIs, internal systems, users, applications, and third-party platforms. Each connection can introduce another point where security controls need to be evaluated."
          cta={{ label: "Understand Your AI Security Risks", href: C }}
          box={{
            title: "Without a clear assessment, it can be difficult to know:",
            items: [
              "Where sensitive data enters or leaves AI workflows",
              "Which users, applications, or systems can access AI resources",
              "Whether integrations introduce unnecessary exposure",
              "Whether AI applications have appropriate security controls",
              "Which risks require immediate attention",
            ],
          }}
        />

        <AiaDefinition
          title="What Is an AI Security Assessment?"
          lead="A Security Review Built Around How Your AI Actually Works"
          paragraphs={[
            "An AI Security Assessment evaluates the security of your AI applications, platforms, integrations, data flows, access controls, and supporting environment to identify weaknesses and security risks.",
            "Rather than assessing AI as a standalone technology, the assessment looks at how AI interacts with users, data, applications, systems, and integrations.",
          ]}
          band={{
            title: "The goal is straightforward:",
            text: "Understand the risks. Prioritize what matters. Know what to address next.",
            cta: { label: "Get Your AI Security Assessment", href: C },
          }}
        />

        <AiaWhy
          title="Why Does Your AI Environment Need a Security Assessment?"
          aside="AI adoption can move quickly. Security reviews need to keep pace."
          cta={{ label: "Assess Your AI Security Posture", href: C }}
          rows={[
            {
              title: "AI Connects to Sensitive Data",
              text: "AI applications may interact with confidential business information, customer data, intellectual property, and other sensitive content.",
            },
            {
              title: "AI Expands the Application Attack Surface",
              text: "AI applications introduce additional components, integrations, APIs, prompts, workflows, and interactions that may require security review.",
            },
            {
              title: "Access Can Extend Across Multiple Systems",
              text: "AI applications and platforms may interact with users, applications, services, and business systems, making access controls an important part of the security assessment.",
            },
            {
              title: "Existing Security Reviews May Not Cover AI-Specific Risks",
              text: "Traditional application, infrastructure, or cloud assessments may not evaluate how AI-specific components behave or interact.",
            },
            {
              title: "AI Security Risks Are Difficult to See in Isolation",
              text: "A configuration may appear secure individually while creating risk when connected to another application, integration, data source, or user.",
            },
          ]}
        />

        <AiaCoverage
          title="What Does Our AI Security Assessment Cover?"
          cta={{ label: "Assess Your AI Environment", href: C }}
          aside={{
            title: "Assess the AI Environment From Application to Access",
            text: "Folio3 evaluates the security of the AI environment across the components that influence how AI is deployed, accessed, integrated, and used.",
          }}
          areas={[
            {
              title: "AI Applications",
              text: "Assess AI-powered applications and workflows for security weaknesses, access risks, and areas of potential exposure.",
              focus: ["AI application security", "Application architecture", "AI workflow security", "Application access controls"],
            },
            {
              title: "AI Platforms",
              text: "Review the security controls surrounding the platforms supporting AI applications and workloads.",
              focus: ["AI platform architecture", "Security configurations", "Platform access", "Security controls"],
            },
            {
              title: "Integrations",
              text: "Assess how AI applications connect with APIs, applications, services, and other systems.",
              focus: ["API integrations", "Third-party integrations", "Application connections", "Integration access"],
            },
            {
              title: "Data Flows",
              text: "Review how information moves into, through, and out of AI environments.",
              focus: ["AI data flows", "Sensitive data movement", "Data access", "Data exposure"],
            },
            {
              title: "Access Controls",
              text: "Review how users, applications, services, and other identities interact with AI environments.",
              focus: ["User access", "Application access", "Permissions", "Authentication controls"],
            },
            {
              title: "AI Security Risks",
              text: "Bring assessment findings together to identify, prioritize, and contextualize the security risks affecting your AI environment.",
              focus: ["Risk identification", "Risk prioritization", "Security gaps", "Business impact"],
            },
          ]}
        />

        <AiaProcess
          eyebrow="How Our AI Security Assessment Works"
          title="How Our AI Security Assessment Works"
          lead="A Structured Review From AI Discovery to Security Recommendations"
          cta={{ label: "Start Your AI Security Assessment", href: C }}
          steps={[
            {
              title: "Understand Your AI Environment",
              text: "We establish what AI applications, platforms, integrations, data flows, and access controls are within the assessment scope.",
              outcome: "A defined view of your AI environment and assessment scope.",
            },
            {
              title: "Map AI Security Exposure",
              text: "We examine how AI components interact with applications, users, systems, integrations, and data to identify potential areas of exposure.",
              outcome: "Greater visibility into where security risks can occur.",
            },
            {
              title: "Assess Security Controls",
              text: "We review relevant security controls around applications, platforms, integrations, data flows, and access.",
              outcome: "A clearer understanding of existing security controls and potential gaps.",
            },
            {
              title: "Prioritize AI Security Risks",
              text: "We organize findings according to their relevance, potential impact, and priority so your team can focus on the areas that matter most.",
              outcome: "A prioritized view of AI security risks.",
            },
            {
              title: "Recommend Next Steps",
              text: "We translate findings into practical security recommendations that can guide remediation and future AI security improvements.",
              outcome: "A clear path from identified risks to action.",
            },
          ]}
        />

        <AiaAdoption
          title="Build Security Into Your AI Journey"
          text="Assessing AI environments early can help security and technology teams understand risks before AI becomes deeply embedded into business workflows."
          stages={[
            {
              icon: "/icons/aia-before.svg",
              title: "Before Deployment",
              text: "Identify security considerations before an AI application or platform enters production.",
            },
            {
              icon: "/icons/aia-during.svg",
              title: "During Integration",
              text: "Review how AI connects with applications, APIs, data, and users.",
            },
            {
              icon: "/icons/aia-expands.svg",
              title: "As AI Expands",
              text: "Reassess security as new AI applications, platforms, integrations, and workflows are introduced.",
            },
            {
              icon: "/icons/aia-changes.svg",
              title: "As Your Environment Changes",
              text: "Keep security considerations aligned with changes to applications, data, access, and AI architecture.",
            },
          ]}
          cta={{ label: "Build a Stronger AI Security Foundation", href: C }}
        />

        <AiaAudiences
          title="Who Should Consider an AI Security Assessment?"
          cta={{ label: "Assess Your AI Environment", href: C }}
          items={[
            {
              title: "Organizations Deploying AI Applications",
              text: "Assess security before AI applications become part of critical business workflows.",
            },
            {
              title: "Teams Integrating AI With Business Systems",
              text: "Understand the security implications of connecting AI to applications, APIs, data, and internal systems.",
            },
            {
              title: "Organizations Handling Sensitive Data With AI",
              text: "Review how sensitive information moves through AI applications and supporting environments.",
            },
            {
              title: "Security Teams Building AI Oversight",
              text: "Establish greater visibility into AI security risks alongside existing cybersecurity practices.",
            },
            {
              title: "Businesses Expanding AI Adoption",
              text: "Create a clearer security baseline before introducing additional AI applications, platforms, and integrations.",
            },
          ]}
        />

        <div className="faq-section aia-faq">
          <Faq items={FAQS} />
        </div>

        <CtaStrip
          title="Know Where Your AI Security Risks Begin"
          text="AI can create new connections between applications, data, users, platforms, and business systems. Before those connections become difficult to secure, understand how your AI environment is exposed."
          cta={{ label: "Get Your AI Security Assessment", href: C }}
        />
      </main>
      <Footer />
    </>
  );
}
