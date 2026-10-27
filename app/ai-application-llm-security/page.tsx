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
  title: "AI Application & LLM Security Services | Folio3 Managed IT Services",
  description:
    "AI application security evaluates how LLM-powered applications respond to malicious inputs, interact with data and integrations, manage access and generate outputs.",
};

const C = ROUTES.contact;

const FAQS = [
  {
    q: "What are AI application security services?",
    a: "AI application security services assess AI-powered applications for risks involving prompts, data disclosure, integrations, permissions, outputs and other AI-specific attack paths.",
  },
  {
    q: "What is prompt injection?",
    a: "Prompt injection is an attack that tries to manipulate an AI application’s instructions or behavior through crafted inputs.",
  },
  {
    q: "Can you test for sensitive information disclosure?",
    a: "Yes. Assessments check whether AI applications can expose sensitive or unauthorized information through prompts, responses, connected data or workflows.",
  },
  {
    q: "Do you assess AI integrations and APIs?",
    a: "Yes. Integrations, APIs, tools, plugins and connected services are reviewed for security weaknesses and excessive access.",
  },
  {
    q: "Can you assess AI application permissions?",
    a: "Yes. The assessment reviews user, application, tool and data permissions to find unnecessary or excessive access.",
  },
  {
    q: "Do you test AI outputs?",
    a: "Yes. AI-generated outputs are assessed for unsafe, manipulated or otherwise risky behavior.",
  },
  {
    q: "When should an AI application be assessed?",
    a: "Ideally before deployment or a major integration, but existing AI applications can also be assessed to find current weaknesses.",
  },
];

export default function AiApplicationLlmSecurityPage() {
  return (
    <>
      <Nav />
      <main className="inner-page">
        <PageHero
          compact
          image="/images/hero-ai-assessment.webp"
          title={["AI Application Security Services", "That Stop Attacks Before They Reach Your Users"]}
        />

        <AiaExposure
          title="AI apps open attack paths traditional apps never had"
          lead="LLM-powered applications interact with users, business data, APIs, external services and internal systems in ways traditional applications don’t."
          cta={{ label: "Uncover Your AI App Risks", href: C }}
          box={{
            title: "Without a focused security assessment, it’s hard to know:",
            items: [
              "Whether prompts can manipulate how the application behaves",
              "Whether sensitive information can leak through AI responses",
              "Whether integrations create extra attack paths",
              "Whether users or AI components have excessive permissions",
              "Whether model outputs create security or operational risks",
              "Which AI-specific vulnerabilities need attention",
            ],
          }}
        />

        <AiaDefinition
          title="What is AI application security?"
          lead="See how your AI app holds up under real attack"
          paragraphs={[
            "AI application security evaluates how LLM-powered applications respond to malicious inputs, interact with data and integrations, manage access and generate outputs.",
            "The assessment focuses on prompt injection, information disclosure, insecure integrations, permissions and unsafe outputs, uncovering weaknesses that standard application security testing misses.",
          ]}
          band={{
            title: "The goal is simple:",
            text: "Test the application, expose the weaknesses and strengthen the controls.",
            cta: { label: "Get an AI Application Security Assessment", href: C },
          }}
        />

        <AiaWhy
          title="Why standard app testing misses AI-specific attacks"
          aside="AI applications create attack paths that traditional application security testing doesn’t fully cover."
          cta={{ label: "Assess Your AI App Security", href: C }}
          rows={[
            {
              title: "Prompts can hijack behavior",
              text: "Attackers can manipulate instructions or inputs to change how an AI application responds.",
            },
            {
              title: "Sensitive information can leak",
              text: "AI applications can expose confidential information through prompts, responses, connected data or workflows.",
            },
            {
              title: "Integrations widen the attack surface",
              text: "APIs, plugins, tools and external services all add security risk.",
            },
            {
              title: "Permissions can run too deep",
              text: "AI applications often have access to more data, tools or systems than their job requires.",
            },
            {
              title: "Outputs can cause damage downstream",
              text: "Unsafe or manipulated outputs can affect connected applications, users or business processes.",
            },
          ]}
        />

        <AiaCoverage
          title="What’s Covered"
          cta={{ label: "Secure Your AI Application", href: C }}
          aside={{
            title: "AI application security services from input to output",
            text: "Folio3 assesses how your LLM applications process inputs, interact with data and systems, manage access and generate outputs.",
          }}
          areas={[
            {
              label: "Block Malicious Prompts",
              title: "Prompt Injection Testing",
              text: "Test whether malicious or manipulated prompts can change application behavior or bypass intended controls.",
              focus: ["Direct prompt injection", "Indirect prompt injection", "Instruction manipulation", "Context manipulation"],
            },
            {
              label: "Stop Data Leaks",
              title: "Sensitive Information Disclosure",
              text: "Check whether your AI application can expose confidential, sensitive or unauthorized information through its interactions.",
              focus: ["Sensitive data disclosure", "Confidential information exposure", "Prompt-based data leakage", "Response exposure"],
            },
            {
              label: "Secure Every Connection",
              title: "Insecure Integrations",
              text: "Review how your AI application interacts with APIs, tools, plugins and external systems.",
              focus: ["API integrations", "Third-party services", "Tool connections", "Integration permissions"],
            },
            {
              label: "Limit What AI Can Reach",
              title: "Excessive Permissions",
              text: "Check whether AI applications, users or connected components have more access than they need.",
              focus: ["Application permissions", "User access", "Tool permissions", "Data access"],
            },
            {
              label: "Control What AI Says",
              title: "Unsafe Outputs",
              text: "Assess AI-generated outputs for risks that could affect users, applications, data or downstream workflows.",
              focus: ["Unsafe responses", "Manipulated outputs", "Output handling", "Downstream risks"],
            },
            {
              label: "Rank What Matters",
              title: "AI Application Security Risks",
              text: "Bring all findings together to identify, prioritize and add context to the risks facing your AI application.",
              focus: ["Risk identification", "Vulnerability prioritization", "Security gaps", "Business impact"],
            },
          ]}
        />

        <AiaProcess
          eyebrow="How It Works"
          title="From application discovery to clear security fixes"
          cta={{ label: "Start Your AI App Security Assessment", href: C }}
          steps={[
            {
              title: "Understand your AI application",
              text: "Folio3 maps the application’s architecture, LLM components, integrations, data flows, users and access in scope.",
              outcome: "A clear view of your AI application’s security environment.",
            },
            {
              title: "Map attack paths",
              text: "The way prompts, users, data, integrations, permissions and outputs interact is examined to find potential attack paths.",
              outcome: "Visibility into where AI-specific attacks can happen.",
            },
            {
              title: "Test security controls",
              text: "Controls are tested against prompt manipulation, information disclosure, insecure integrations, excessive permissions and unsafe outputs.",
              outcome: "A clear picture of your application’s security weaknesses.",
            },
            {
              title: "Prioritize AI security risks",
              text: "Findings are ranked by severity, relevance and potential impact on your application and environment.",
              outcome: "A prioritized view of AI application security risks.",
            },
            {
              title: "Recommend next steps",
              text: "Findings become practical recommendations to strengthen application controls and reduce risk.",
              outcome: "A structured path to stronger AI application security.",
            },
          ]}
        />

        <AiaAdoption
          title="Security that grows with your AI app, from build to scale"
          text="AI application security should keep pace as LLM applications move from development to production and connect to more systems."
          stages={[
            {
              icon: "/icons/llm-before.svg",
              title: "Before deployment",
              text: "Test for prompt injection, data exposure, permissions and other AI-specific risks.",
            },
            {
              icon: "/icons/llm-during.svg",
              title: "During integration",
              text: "Assess APIs, tools, data, permissions and connected systems.",
            },
            {
              icon: "/icons/llm-expands.svg",
              title: "As your AI application expands",
              text: "Reassess security as capabilities, integrations, workflows and data sources change.",
            },
          ]}
          cta={{ label: "Build a Stronger AI App Security Foundation", href: C }}
        />

        <AiaAudiences
          title="Who needs AI application security most"
          cta={{ label: "Assess Your AI App Security", href: C }}
          items={[
            {
              title: "Organizations deploying LLM applications",
              text: "Assess AI applications before they become part of critical business processes.",
            },
            {
              title: "Teams building AI-powered applications",
              text: "Find AI-specific weaknesses across applications, models, integrations and workflows.",
            },
            {
              title: "Organizations connecting LLMs to business systems",
              text: "Review the risks created by APIs, tools, data and application access.",
            },
            {
              title: "Security and application teams",
              text: "Add AI-specific testing to your existing application security practices.",
            },
          ]}
        />

        <div className="faq-section aia-faq">
          <Faq items={FAQS} cta={{ label: "Discuss Your AI App Security Needs", href: C }} />
        </div>

        <CtaStrip
          title="Know exactly how your AI app can be attacked"
          text="Find AI-specific risks, understand your attack paths and get practical recommendations to strengthen your application with Folio3 AI application security services."
          cta={{ label: "Get an AI Application Security Assessment", href: C }}
          secondary={{ label: "Talk to an AI Security Expert", href: C }}
          note="A Folio3 specialist will review your AI application and its security requirements, then recommend the most practical next step."
        />
      </main>
      <Footer />
    </>
  );
}
