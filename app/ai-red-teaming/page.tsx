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
  title: "AI Red Teaming Services | Folio3 Managed IT Services",
  description:
    "AI red teaming simulates realistic attacks against AI applications and workflows to uncover weaknesses that standard security assessments miss.",
};

const C = ROUTES.contact;

const FAQS = [
  {
    q: "What are AI red teaming services?",
    a: "AI red teaming services simulate adversarial attacks against AI applications and workflows to find exploitable weaknesses and test how well your security controls work.",
  },
  {
    q: "How is AI red teaming different from penetration testing?",
    a: "AI red teaming focuses on AI-specific attack scenarios, including manipulating AI behavior, adversarial inputs, data extraction and AI workflow risks.",
  },
  {
    q: "What types of attacks do you simulate?",
    a: "Scope can include prompt injection, jailbreaks, data extraction, workflow manipulation, application attacks and other relevant adversarial scenarios.",
  },
  {
    q: "Can you test an existing AI application?",
    a: "Yes. Existing AI applications and workflows can be tested to find current weaknesses and see how controls respond to adversarial activity.",
  },
  {
    q: "Can you test AI workflows and integrations?",
    a: "Yes. Testing can cover AI workflows, integrations, APIs, tools and connected systems within the agreed scope.",
  },
  {
    q: "Will red teaming affect our production AI system?",
    a: "Scope and test environments are agreed before testing begins, with boundaries set around your application’s architecture and operational needs.",
  },
  {
    q: "What happens after weaknesses are identified?",
    a: "Findings are validated and prioritized, followed by practical recommendations to fix vulnerabilities and strengthen AI security controls.",
  },
];

export default function AiRedTeamingPage() {
  return (
    <>
      <Nav />
      <main className="inner-page">
        <PageHero
          compact
          image="/images/hero-ai-assessment.webp"
          title={["AI Red Teaming Services That Attack", "Your AI Before Real Attackers Do"]}
        />

        <AiaExposure
          title="AI can fail in ways no one planned for"
          lead="AI applications behave differently when they meet malicious inputs, manipulated instructions, unexpected workflows or adversarial scenarios."
          cta={{ label: "Map Your AI Attack Surface", href: C }}
          box={{
            title: "Without adversarial testing, it’s hard to know:",
            items: [
              "Whether crafted inputs can manipulate your AI applications",
              "Whether security controls can be bypassed",
              "Whether sensitive information can be extracted",
              "Whether AI workflows can be pushed into unsafe actions",
              "Whether connected systems create exploitable attack paths",
              "Which weaknesses create real security exposure",
            ],
          }}
        />

        <AiaDefinition
          title="What is AI red teaming?"
          lead="Put your AI defenses under real adversarial pressure"
          paragraphs={[
            "AI red teaming simulates realistic attacks against AI applications and workflows to uncover weaknesses that standard security assessments miss.",
            "Testing shows how your AI responds to adversarial inputs, manipulation attempts, control bypasses, data extraction techniques and other attack scenarios. Unlike many AI red teaming service providers that stop at prompt testing, Folio3 tests the full chain: applications, workflows, integrations and the controls around them.",
          ]}
          band={{
            title: "The goal is simple:",
            text: "Simulate the attack, expose the weakness and strengthen the defense.",
            cta: { label: "Get an AI Red Team Assessment", href: C },
          }}
        />

        <AiaWhy
          title="Why standard security testing can’t break your AI the way attackers will"
          aside="Compared with traditional red teaming services, AI security testing has to cover new ways of interacting with applications and workflows."
          cta={{ label: "Test Your AI Resilience", href: C }}
          rows={[
            {
              title: "AI can be manipulated",
              text: "Adversarial inputs can change AI behavior or bypass intended instructions.",
            },
            {
              title: "Controls need real-world testing",
              text: "Attack simulations show whether your safeguards hold up against realistic bypass attempts.",
            },
            {
              title: "Sensitive information is a target",
              text: "Adversarial testing checks whether AI systems reveal information they shouldn’t.",
            },
            {
              title: "AI workflows create attack paths",
              text: "Connected applications, integrations, tools and workflows add new openings for exploitation.",
            },
            {
              title: "Known weaknesses aren’t the whole picture",
              text: "Red teaming shows how several small weaknesses can combine into serious exposure.",
            },
          ]}
        />

        <AiaCoverage
          title="What’s Covered"
          cta={{ label: "Red Team Your AI", href: C }}
          aside={{
            title: "AI red teaming services across your entire AI environment",
            text: "Folio3 uses adversarial testing to see how your AI applications and workflows hold up against realistic attack scenarios.",
          }}
          areas={[
            {
              label: "Hijack the Instructions",
              title: "Prompt Injection Testing",
              text: "Test whether crafted instructions can manipulate AI behavior or bypass intended controls.",
              focus: ["Direct prompt injection", "Indirect prompt injection", "Instruction manipulation", "Context manipulation", "Control bypass"],
            },
            {
              label: "Break the Guardrails",
              title: "Jailbreak Testing",
              text: "Check whether AI systems can be pushed into bypassing their restrictions or security controls.",
              focus: ["Restriction bypass", "Adversarial prompting", "Instruction conflicts", "Safety control testing", "Response manipulation"],
            },
            {
              label: "Pull Out Secrets",
              title: "Data Extraction Testing",
              text: "Test whether sensitive or restricted information can be pulled out through adversarial interactions.",
              focus: ["Sensitive data extraction", "Information disclosure", "Confidential data exposure", "Response analysis", "Data access controls"],
            },
            {
              label: "Derail the Workflow",
              title: "AI Workflow Testing",
              text: "Check whether adversarial inputs can manipulate AI-driven workflows or connected application behavior.",
              focus: ["Workflow manipulation", "Application interactions", "Integration behavior", "Tool interactions", "Workflow controls"],
            },
            {
              label: "Attack the App",
              title: "AI Application Attack Testing",
              text: "Simulate attacks against AI applications to find exploitable weaknesses across their components and interactions.",
              focus: ["AI application attacks", "Integration weaknesses", "Access controls", "Application behavior", "Security controls"],
            },
            {
              label: "Chain the Weaknesses",
              title: "Adversarial Scenario Testing",
              text: "Combine realistic attack scenarios to see how multiple weaknesses interact across your AI environment.",
              focus: ["Attack scenarios", "Attack paths", "Control validation", "Exploitability", "Security findings"],
            },
          ]}
        />

        <AiaProcess
          eyebrow="How It Works"
          title="From attack planning to stronger AI defenses"
          cta={{ label: "Start Your AI Red Team Assessment", href: C }}
          steps={[
            {
              title: "Understand your AI environment",
              text: "Folio3 identifies the AI applications, workflows, integrations, data, users and security controls in scope.",
              outcome: "A clear view of the AI environment being tested.",
            },
            {
              title: "Develop attack scenarios",
              text: "Realistic adversarial scenarios are built around your application’s architecture, workflows and attack surface.",
              outcome: "A targeted AI red team testing plan.",
            },
            {
              title: "Run adversarial testing",
              text: "Relevant attacks are simulated to see how your AI environment responds to manipulation and exploitation attempts.",
              outcome: "Evidence of how your AI security controls perform under attack.",
            },
            {
              title: "Validate and prioritize findings",
              text: "Each weakness is analyzed for exploitability, relevance and potential impact.",
              outcome: "A prioritized view of exploitable AI security weaknesses.",
            },
            {
              title: "Recommend next steps",
              text: "Findings become practical recommendations to strengthen AI applications, workflows and security controls.",
              outcome: "A structured path to stronger AI security.",
            },
          ]}
        />

        <AiaAdoption
          title="Keep testing your AI as fast as it changes"
          text="AI security should be tested again every time your applications, workflows, integrations and capabilities change."
          stages={[
            {
              icon: "/icons/red-before.svg",
              title: "Before deployment",
              text: "Test AI applications and workflows against relevant adversarial scenarios.",
            },
            {
              icon: "/icons/red-during.svg",
              title: "During integration",
              text: "See how prompts, data, APIs, tools and connected systems respond under attack.",
            },
            {
              icon: "/icons/red-expands.svg",
              title: "As AI expands",
              text: "Retest as new capabilities, integrations and workflows open new attack paths.",
            },
          ]}
          cta={{ label: "Build a Stronger AI Security Foundation", href: C }}
        />

        <AiaAudiences
          title="Who needs AI red teaming most"
          cta={{ label: "Red Team Your AI", href: C }}
          items={[
            {
              title: "Organizations deploying AI applications",
              text: "Validate AI security controls before applications become business-critical.",
            },
            {
              title: "Teams running LLM applications",
              text: "Test how applications respond to manipulation, data extraction and other adversarial techniques.",
            },
            {
              title: "Organizations with connected AI workflows",
              text: "Evaluate attack paths across AI applications, integrations, tools and systems.",
            },
            {
              title: "Security teams validating AI controls",
              text: "Challenge your existing defenses with realistic adversarial testing.",
            },
          ]}
        />

        <div className="faq-section aia-faq">
          <Faq items={FAQS} cta={{ label: "Discuss Your AI Red Teaming Needs", href: C }} />
        </div>

        <CtaStrip
          title="Know exactly how your AI holds up under attack"
          text="Find exploitable weaknesses, see where your defenses could fail and build stronger AI security with Folio3 AI red teaming services."
          cta={{ label: "Get an AI Red Team Assessment", href: C }}
          note="A Folio3 specialist will review your AI environment, define the right testing scope and recommend the most practical next step."
        />
      </main>
      <Footer />
    </>
  );
}
