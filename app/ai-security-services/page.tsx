import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { CardRail } from "@/components/page/CardRail";
import { CtaStrip } from "@/components/page/CtaStrip";
import { IconCards } from "@/components/page/IconCards";
import { PageHero } from "@/components/page/PageHero";
import { SplitFeature } from "@/components/page/SplitFeature";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "AI Security Services | Folio3",
  description:
    "Our AI security services help you assess AI risks, strengthen governance, protect sensitive data, secure AI applications and agents, and test AI systems against real-world attacks.",
};

export default function AiSecurityPage() {
  return (
    <>
      <Nav />
      <main className="inner-page">
        <PageHero
          image="/images/hero-ai-security.webp"
          fade={[36.5, 78]}
          copyWidth={782}
          title={["Secure AI.", "Move Innovation Forward."]}
          lede="AI is becoming part of how businesses build, operate, and make decisions—but new AI capabilities introduce new security risks. Our AI security services help you assess those risks, strengthen governance, protect sensitive data, secure AI applications and agents, and test AI systems against real-world attacks."
          actions={[{ label: "Book AI Security Consultation", href: ROUTES.contact, variant: "primary" }]}
        />

        <SplitFeature
          tag={{ label: "Know Where Your AI Security Risks Begin", accent: "yellow" }}
          title="AI Security Assessment"
          lede="Assess your AI environment, applications, data flows, models, integrations, and controls to identify security weaknesses before they become operational or business risks."
          columns={[
            ["AI Security Posture Assessment", "AI Data Flow Assessment", "AI Access & Permission Review"],
            ["AI Application & Model Review", "AI Architecture Review", "AI Risk Identification & Prioritization"],
          ]}
          cta={{ label: "Get Your AI Security Assessment", href: ROUTES.aiAssessment }}
          image={{ src: "/images/ai-assessment.webp", alt: "Robot and human hands meeting at a risk management dial" }}
          stat={{ icon: "/icons/ai-stat-assessment.svg", value: "<10min", label: "Initial AI Risk Assessment", accent: "yellow" }}
        />

        <SplitFeature
          tone="soft"
          imageSide="left"
          tag={{ label: "Build Guardrails Around AI Adoption", accent: "green" }}
          title="AI Governance & Risk"
          lede="AI adoption can move faster than your policies and controls. Establish practical governance that defines how AI is used, how risks are managed, and how security responsibilities are maintained as AI adoption expands."
          columns={[
            ["AI Risk Assessment", "AI Governance Frameworks", "AI Control Definition"],
            ["AI Security Policies", "AI Use Case Risk Reviews", "Risk Ownership & Accountability"],
          ]}
          cta={{ label: "Build Your AI Governance Framework", href: ROUTES.contact }}
          image={{ src: "/images/ai-governance.webp", alt: "AI governance panels floating above a keyboard" }}
          stat={{ icon: "/icons/ai-stat-governance.svg", value: "100%", label: "AI Use Case Governance Coverage", accent: "green" }}
        />

        <SplitFeature
          tag={{ label: "Protect the Data Behind Your AI", accent: "blue" }}
          title="AI Data Security"
          lede="AI systems can process sensitive business information, customer data, intellectual property, and confidential content. We assess how data moves through AI environments and help strengthen controls around access, handling, storage, and exposure."
          columns={[
            ["AI Data Flow Assessment", "Data Access Controls", "AI Data Exposure Assessment"],
            ["Sensitive Data Identification", "Data Protection Reviews", "Data Retention & Handling Reviews"],
          ]}
          cta={{ label: "Protect Your AI Data", href: ROUTES.contact }}
          image={{ src: "/images/ai-data.webp", alt: "AI agent sign beside a padlock on a server" }}
          stat={{ icon: "/icons/ai-stat-data.svg", value: "<24hrs", label: "Sensitive AI Data Review", accent: "blue" }}
        />

        <SplitFeature
          tone="soft"
          imageSide="left"
          tag={{ label: "Secure AI Applications Before They Become Attack Targets", accent: "grey" }}
          title="AI Application & LLM Security"
          lede="AI-powered applications and LLMs introduce attack paths that traditional application security may not fully address. We assess AI applications for weaknesses such as prompt injection, data exposure, insecure integrations, and unsafe model interactions."
          columns={[
            ["LLM Security Assessment", "AI Application Security Testing", "Model & Application Access Review"],
            ["Prompt Injection Testing", "Sensitive Data Exposure Testing", "AI Integration Security"],
          ]}
          cta={{ label: "Secure Your AI Applications", href: ROUTES.contact }}
          image={{ src: "/images/ai-llm.webp", alt: "Executive touching a glowing LLM diagram" }}
          stat={{ icon: "/icons/ai-stat-llm.svg", value: "50+", label: "AI Security Checks", accent: "grey" }}
        />

        <SplitFeature
          tag={{ label: "Secure AI Agents Before They Act on Your Behalf", accent: "purple" }}
          title="AI Agent Security"
          lede="AI agents can access systems, use tools, process information, and take actions with limited human intervention. We assess agent permissions, tools, workflows, integrations, and decision boundaries to identify risks before they can affect your environment."
          columns={[
            ["AI Agent Security Assessment", "Tool & Permission Assessment", "Integration Security"],
            ["Agent Identity & Access Review", "Agent Workflow Security", "Agent Action & Authorization Review"],
          ]}
          cta={{ label: "Assess Your AI Agents", href: ROUTES.contact }}
          image={{ src: "/images/ai-agent.webp", alt: "Glass cube labelled AI Agent on a glowing platform" }}
          stat={{ icon: "/icons/ai-stat-agent.svg", value: "25+", label: "Agent Controls Reviewed", accent: "purple" }}
        />

        <SplitFeature
          tone="soft"
          imageSide="left"
          tag={{ label: "Test AI Systems Like an Attacker Would", accent: "grey" }}
          title="AI Red Teaming"
          lede="AI red teaming puts your AI applications, models, agents, and controls under adversarial testing to uncover weaknesses that conventional security assessments may miss."
          columns={[
            ["Prompt Injection Testing", "Data Leakage Testing", "AI Agent Attack Testing"],
            ["Jailbreak Testing", "Model Manipulation Testing", "Adversarial Scenario Testing"],
          ]}
          cta={{ label: "Red Team Your AI", href: ROUTES.contact }}
          image={{ src: "/images/ai-redteam.webp", alt: "Analyst studying a neural network hologram" }}
          stat={{ icon: "/icons/ai-stat-redteam.svg", value: "30+", label: "Attack Scenarios Tested", accent: "grey" }}
        />

        <IconCards
          tone="dark"
          tight
          eyebrow="What You Can Expect"
          title="From Assessment to Full Management in Days, Not Months"
          cta={{ label: "Start Your AI Security Assessment", href: ROUTES.aiAssessment }}
          cards={[
            {
              icon: "/icons/step-assessment.svg",
              title: "AI Security Assessment",
              text: "We start by understanding your AI environment, use cases, architecture, data flows, applications, models, and existing security controls.",
            },
            {
              icon: "/icons/ai-step-mapping.svg",
              title: "Risk & Control Mapping",
              text: "We identify security risks and map them to the appropriate governance, technical, and organizational controls.",
            },
            {
              icon: "/icons/ai-step-testing.svg",
              title: "Security Testing",
              text: "Where required, we test AI applications, LLMs, agents, integrations, and controls to validate whether identified risks can be exploited.",
            },
            {
              icon: "/icons/step-protection.svg",
              title: "Remediation & Improvement",
              text: "We provide prioritized recommendations and practical guidance to strengthen your AI security posture.",
            },
          ]}
        />

        <CardRail
          title="AI Security Across the AI Lifecycle"
          lede="AI security needs to evolve as your AI capabilities evolve. Our approach helps address risk from initial assessment and governance through application deployment, agent adoption, and ongoing security testing."
          cards={[
            {
              icon: "/icons/ms-area-assessments.svg",
              title: "Assess",
              text: "Understand your AI environment, use cases, architecture, and security exposure.",
            },
            {
              icon: "/icons/ai-life-govern.svg",
              title: "Govern",
              text: "Establish policies, controls, responsibilities, and risk management processes.",
            },
            {
              icon: "/icons/ai-life-protect.svg",
              title: "Protect",
              text: "Strengthen the security of AI data, applications, models, agents, and integrations.",
            },
            {
              icon: "/icons/ai-life-test.svg",
              title: "Test",
              text: "Continuously challenge AI systems through adversarial testing and red teaming.",
            },
          ]}
        />

        <CtaStrip
          title="Not Sure Where Your AI Security Gaps Are?"
          text="Start with an AI Security Assessment. We'll help you understand your current exposure, identify the highest-priority risks, and establish a practical path toward more secure AI adoption."
          cta={{ label: "Get Your AI Security Assessment", href: ROUTES.aiAssessment }}
        />
      </main>
      <Footer />
    </>
  );
}
