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
  title: "AI Governance Consulting Services | Folio3 Managed IT Services",
  description:
    "Consulting services for AI governance set the policies, responsibilities, controls and security requirements that guide how AI is adopted and used across your organization.",
};

const C = ROUTES.contact;

const FAQS = [
  {
    q: "What are AI governance consulting services?",
    a: "AI governance consulting services set the policies, responsibilities, controls and processes that manage AI adoption and its risks across your organization.",
  },
  {
    q: "Why does an organization need AI governance?",
    a: "Governance gives structure to acceptable use, risk ownership, security requirements, approvals and ongoing oversight as AI adoption grows.",
  },
  {
    q: "What does AI governance consulting cover?",
    a: "It can cover governance frameworks, risk management, AI policies, acceptable use, security requirements and AI use-case reviews.",
  },
  {
    q: "Do you offer AI data governance consulting?",
    a: "Yes. Folio3 defines what data can be used with AI tools, how sensitive information is handled and which controls protect it across AI workflows.",
  },
  {
    q: "Who should own AI risks?",
    a: "Ownership should be assigned based on your organization’s structure, AI use cases, business responsibilities and security requirements.",
  },
  {
    q: "Can you help develop AI policies?",
    a: "Yes. Policy development or review sets practical requirements for acceptable use, data handling, security, responsibilities and governance.",
  },
  {
    q: "Can AI governance align with our existing security framework?",
    a: "Yes. AI governance can be aligned with your existing cybersecurity, risk management, compliance and security practices.",
  },
  {
    q: "When should we set up AI governance?",
    a: "Ideally before AI adoption expands, but governance can also be put in place or improved in an existing AI environment.",
  },
];

export default function AiGovernancePage() {
  return (
    <>
      <Nav />
      <main className="inner-page">
        <PageHero
          compact
          image="/images/hero-ai-assessment.webp"
          title={["AI Governance Consulting Services", "That Put Clear Rules Around Every AI Tool"]}
        />

        <AiaExposure
          title="AI moves fast, and governance often falls behind"
          lead="AI can become part of daily operations almost overnight."
          text="Teams bring in new tools, applications and use cases before policies, ownership and security requirements exist."
          cta={{ label: "Uncover Your AI Governance Gaps", href: C }}
          box={{
            title: "Without a governance framework, it’s hard to know:",
            items: [
              "Which AI tools and use cases are approved",
              "Who owns AI-related risks",
              "What information can be used with AI",
              "Which security requirements apply to AI systems",
              "Who should approve new AI use cases",
              "How AI risks should be managed as adoption grows",
            ],
          }}
        />

        <AiaDefinition
          title="What are consulting services for AI governance?"
          lead="A governance framework built around how your teams actually use AI"
          paragraphs={[
            "Consulting services for AI governance set the policies, responsibilities, controls and security requirements that guide how AI is adopted and used across your organization.",
            "Governance isn’t treated as a stack of policy documents. Folio3 connects risk ownership, acceptable use, security requirements, policies and use-case reviews, so AI is managed consistently everywhere.",
          ]}
          band={{
            title: "The goal is simple:",
            text: "Define the rules, assign responsibility and manage AI risk with confidence.",
            cta: { label: "Get an AI Governance Assessment", href: C },
          }}
        />

        <AiaWhy
          title="Why AI without governance becomes a business risk"
          aside="AI adoption moves quickly. Governance has to keep up."
          cta={{ label: "Assess Your AI Governance Posture", href: C }}
          rows={[
            {
              title: "AI use spreads fast",
              text: "Employees and teams adopt new AI tools faster than formal governance can adapt.",
            },
            {
              title: "AI risks need clear owners",
              text: "Without defined accountability, AI-related security, operational and business risks are hard to manage.",
            },
            {
              title: "AI use needs clear boundaries",
              text: "Employees need practical guidance on approved tools, acceptable use, data handling and prohibited activities.",
            },
            {
              title: "Security requirements must be defined",
              text: "AI applications and use cases need security expectations that match your organization’s risk level.",
            },
            {
              title: "Governance must grow with AI",
              text: "As AI applications and use cases multiply, governance needs to grow alongside them.",
            },
          ]}
        />

        <AiaCoverage
          title="What’s Covered"
          cta={{ label: "Build Your AI Governance Framework", href: C }}
          aside={{
            title: "AI governance consulting services from use case to security rule",
            text: "Folio3 sets practical governance across the policies, responsibilities, risks and security requirements that shape AI adoption in your organization.",
          }}
          areas={[
            {
              label: "Set the Structure",
              title: "AI Governance Frameworks",
              text: "Put the structure and responsibilities in place to govern AI across your organization.",
              focus: ["AI governance framework", "Governance structure", "Roles and responsibilities", "AI oversight"],
            },
            {
              label: "Own Every Risk",
              title: "AI Risk Management",
              text: "Identify AI-related risks and decide how each one is assessed, owned and managed.",
              focus: ["AI risk identification", "Risk assessment", "Risk ownership", "Risk prioritization"],
            },
            {
              label: "Write the Rules",
              title: "AI Policies",
              text: "Develop or review policies that set clear expectations for how AI is used across the organization.",
              focus: ["AI security policies", "AI usage policies", "Policy requirements", "Employee responsibilities"],
            },
            {
              label: "Draw Clear Lines",
              title: "Acceptable AI Use",
              text: "Define approved use cases, data restrictions, permitted activities and prohibited uses. AI data governance consulting sets what information can and can’t go into AI tools.",
              focus: ["Approved AI use", "Prohibited AI activities", "Data usage requirements", "Employee guidance"],
            },
            {
              label: "Secure by Default",
              title: "Security Requirements",
              text: "Set security expectations for AI applications, platforms, integrations, data and access.",
              focus: ["AI security requirements", "Access controls", "Data security", "Application security"],
            },
            {
              label: "Approve With Confidence",
              title: "AI Use Case Reviews",
              text: "Review proposed AI use cases against governance, security, risk and business requirements.",
              focus: ["Use-case assessment", "Risk review", "Security review", "Approval requirements"],
            },
          ]}
        />

        <AiaProcess
          eyebrow="How It Works"
          title="From AI discovery to a governance plan you can act on"
          cta={{ label: "Start Your AI Governance Assessment", href: C }}
          steps={[
            {
              title: "Understand your AI landscape",
              text: "Folio3 identifies your AI applications, use cases, stakeholders, existing policies and current governance practices.",
              outcome: "A clear view of your current AI governance.",
            },
            {
              title: "Identify AI risks",
              text: "Security, operational, data, access and governance risks are assessed across your AI use cases.",
              outcome: "A prioritized view of AI-related risks.",
            },
            {
              title: "Define governance requirements",
              text: "Policies, responsibilities, acceptable-use controls and security requirements are set.",
              outcome: "Clear governance expectations for AI adoption.",
            },
            {
              title: "Assign risk ownership",
              text: "Owners are defined for managing AI risks, approving use cases and maintaining governance controls.",
              outcome: "Clear accountability across AI initiatives.",
            },
            {
              title: "Recommend next steps",
              text: "Findings and requirements become practical recommendations for putting governance in place and improving it.",
              outcome: "A structured path to stronger AI governance.",
            },
          ]}
        />

        <AiaAdoption
          title="Set the rules before AI spreads, not after"
          text="AI governance shouldn’t start only after AI is embedded across the organization. Setting governance early lets security, technology and business teams know their responsibilities before adoption becomes hard to manage."
          stages={[
            {
              icon: "/icons/gov-before.svg",
              title: "Before AI adoption",
              text: "Define policies, responsibilities, acceptable-use requirements and security expectations.",
            },
            {
              icon: "/icons/gov-during.svg",
              title: "During AI adoption",
              text: "Review new tools and use cases against your governance requirements.",
            },
            {
              icon: "/icons/gov-expands.svg",
              title: "As AI expands",
              text: "Update governance as new applications, users, integrations and risks appear.",
            },
            {
              icon: "/icons/gov-changes.svg",
              title: "As your environment changes",
              text: "Keep policies, responsibilities and security requirements aligned with how AI use is changing.",
            },
          ]}
          cta={{ label: "Build a Stronger AI Governance Foundation", href: C }}
        />

        <AiaAudiences
          title="Who needs AI governance consulting most"
          cta={{ label: "Assess Your AI Governance", href: C }}
          items={[
            {
              title: "Organizations expanding AI adoption",
              text: "Put governance in place before AI applications and use cases spread across the business.",
            },
            {
              title: "Organizations introducing AI at scale",
              text: "Set clear requirements for how AI is selected, approved and used.",
            },
            {
              title: "Teams handling sensitive data with AI",
              text: "Define data-handling requirements and controls for AI use.",
            },
            {
              title: "Security teams building AI oversight",
              text: "Set clear ownership and governance around AI-related security risks.",
            },
            {
              title: "Organizations formalizing AI policies",
              text: "Create practical policies and acceptable-use controls that support responsible AI adoption.",
            },
          ]}
        />

        <div className="faq-section aia-faq">
          <Faq items={FAQS} cta={{ label: "Discuss Your AI Governance Needs", href: C }} />
        </div>

        <CtaStrip
          title="Give every AI tool a clear set of rules"
          text="Build a practical framework for AI policies, risk ownership, acceptable use, security requirements and ongoing oversight with Folio3 AI governance consulting services."
          cta={{ label: "Get an AI Governance Assessment", href: C }}
          secondary={{ label: "Talk to an AI Security Expert", href: C }}
          note="A Folio3 specialist will review your AI governance setup and requirements, then recommend the most practical next step."
        />
      </main>
      <Footer />
    </>
  );
}
