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
  title: "AI Security Monitoring | Folio3 Managed IT Services",
  description:
    "AI Security Monitoring integrates relevant AI-related events and security signals into existing monitoring, detection, and incident response workflows.",
};

const C = ROUTES.contact;

const FAQS = [
  {
    q: "What is AI Security Monitoring?",
    a: "AI Security Monitoring integrates AI-related events and security signals into monitoring, detection, and incident response workflows.",
  },
  {
    q: "What does AI Security Monitoring cover?",
    a: "It can cover AI events, security signals, threat detection, event analysis, alerting, and integration with incident response workflows.",
  },
  {
    q: "Why do AI systems need additional monitoring?",
    a: "AI applications and workflows can generate new security-relevant activity that may require visibility beyond conventional monitoring.",
  },
  {
    q: "Can AI security signals be integrated with existing monitoring?",
    a: "Yes. Relevant AI security signals can be incorporated into broader security monitoring and operations workflows based on the environment and available telemetry.",
  },
  {
    q: "Can you monitor AI-related suspicious activity?",
    a: "Yes. Monitoring can include relevant AI activity and security signals that may indicate suspicious or potentially malicious behavior.",
  },
  {
    q: "Does AI Security Monitoring include incident response?",
    a: "AI-related security events can be connected to established investigation, escalation, and incident response workflows where appropriate.",
  },
  {
    q: "Does monitoring need to change as AI adoption grows?",
    a: "Yes. Monitoring requirements should evolve as organizations introduce new AI applications, integrations, workflows, and use cases.",
  },
];

export default function AiSecurityMonitoringPage() {
  return (
    <>
      <Nav />
      <main className="inner-page">
        <PageHero
          compact
          image="/images/hero-ai-assessment.webp"
          title={["Keep Continuous Visibility", "Into Your AI Environment"]}
        />

        <AiaExposure
          title="AI Activity Can Be Difficult to Monitor"
          lead="AI environments can generate security-relevant activity across applications, models, users, integrations, data, and connected systems."
          cta={{ label: "Understand Your AI Security Visibility", href: C }}
          box={{
            title: "Without appropriate monitoring, it can be difficult to know:",
            items: [
              "Which AI-related events are occurring",
              "Whether unusual AI activity indicates a security risk",
              "Which security signals require investigation",
              "How AI activity connects with broader security events",
              "Whether suspicious behavior is being detected",
              "When an AI-related event requires incident response",
            ],
          }}
        />

        <AiaDefinition
          title="What Is AI Security Monitoring?"
          lead="Bring AI Security Signals Into Your Security Operations"
          paragraphs={[
            "AI Security Monitoring integrates relevant AI-related events and security signals into existing monitoring, detection, and incident response workflows.",
            "The approach helps connect AI activity, security events, threat detection, alert analysis, and incident response to provide greater visibility into potential security risks across your AI environment.",
          ]}
          band={{
            title: "The goal is straightforward:",
            text: "See the activity. Detect the risk. Respond when it matters.",
            cta: { label: "Assess Your AI Security Monitoring", href: C },
          }}
        />

        <AiaWhy
          title="Why Does Your AI Environment Need Security Monitoring?"
          aside="AI adoption can create new security signals that may not be visible through traditional monitoring alone."
          cta={{ label: "Assess Your AI Security Visibility", href: C }}
          rows={[
            {
              title: "AI Generates New Security Events",
              text: "AI applications, users, integrations, and workflows can generate activity that requires security visibility.",
            },
            {
              title: "Suspicious Activity Can Blend Into Normal Use",
              text: "Unusual AI behavior can be difficult to distinguish without appropriate monitoring and contextual analysis.",
            },
            {
              title: "AI Signals Can Connect to Broader Threats",
              text: "AI-related activity may be connected to identity, endpoint, application, or infrastructure security events.",
            },
            {
              title: "Security Teams Need Relevant Context",
              text: "Raw events are more useful when analyzed alongside other security signals and activity.",
            },
            {
              title: "AI Monitoring Needs to Evolve",
              text: "As AI applications, integrations, and workflows expand, monitoring requirements need to evolve with them.",
            },
          ]}
        />

        <AiaCoverage
          title="What Does Our AI Security Monitoring Service Cover?"
          cta={{ label: "Strengthen Your AI Security Monitoring", href: C }}
          aside={{
            title: "Monitor AI Activity From Security Signal to Response",
            text: "Folio3 helps integrate relevant AI-related events and security signals into broader security monitoring and response workflows.",
          }}
          areas={[
            {
              title: "AI Event Monitoring",
              text: "Monitor relevant events generated by AI applications, platforms, users, and connected workflows.",
              focus: ["AI activity", "AI events", "Application events", "User activity", "Security events"],
            },
            {
              title: "Security Signal Integration",
              text: "Bring relevant AI security signals into broader monitoring and security operations workflows.",
              focus: ["Security signals", "Event integration", "Security telemetry", "Detection sources", "Monitoring workflows"],
            },
            {
              title: "AI Threat Detection",
              text: "Identify suspicious or unusual activity within monitored AI environments.",
              focus: ["Threat detection", "Suspicious activity", "Behavioral indicators", "Security alerts", "Threat signals"],
            },
            {
              title: "Security Event Analysis",
              text: "Review AI-related events in context to determine which activity may require investigation.",
              focus: ["Event analysis", "Alert analysis", "Activity correlation", "Threat indicators", "Security context"],
            },
            {
              title: "AI Security Alerting",
              text: "Establish relevant alerting around AI security events and activity requiring attention.",
              focus: ["Security alerts", "Alert prioritization", "Event severity", "Escalation criteria", "Alert review"],
            },
            {
              title: "Incident Response Integration",
              text: "Connect relevant AI security events with established investigation, escalation, and incident response workflows.",
              focus: ["Incident escalation", "Response workflows", "Incident investigation", "Response coordination", "Security reporting"],
            },
          ]}
        />

        <AiaProcess
          title="How Our AI Security Monitoring Process Works"
          lead="From AI Signals to Security Response"
          cta={{ label: "Start Your AI Security Monitoring Assessment", href: C }}
          steps={[
            {
              title: "Understand Your AI Environment",
              text: "We identify relevant AI applications, platforms, integrations, users, workflows, and existing monitoring capabilities.",
              outcome: "A defined view of your AI monitoring environment.",
            },
            {
              title: "Identify Relevant Security Signals",
              text: "We determine which AI-related events and activity should be incorporated into security monitoring.",
              outcome: "A clearer view of relevant AI security signals.",
            },
            {
              title: "Establish Monitoring & Detection",
              text: "We define appropriate monitoring, detection, alerting, and analysis requirements around identified AI activity.",
              outcome: "Greater visibility into AI-related security events.",
            },
            {
              title: "Connect Detection to Response",
              text: "Relevant security events can be connected to established investigation, escalation, and incident response processes.",
              outcome: "A structured path from AI security detection to response.",
            },
            {
              title: "Improve Monitoring Over Time",
              text: "Monitoring requirements can evolve as AI applications, integrations, workflows, and security risks change.",
              outcome: "A more sustainable AI security monitoring approach.",
            },
          ]}
        />

        <AiaAdoption
          title="Build Monitoring Into Your AI Journey"
          text="AI security monitoring should evolve as your environment generates new applications, workflows, integrations, and security signals."
          stages={[
            {
              icon: "/icons/mon-before.svg",
              title: "Before AI Deployment",
              text: "Define relevant AI security events, signals, and monitoring requirements.",
            },
            {
              icon: "/icons/mon-during.svg",
              title: "During AI Integration",
              text: "Connect AI activity with existing detection, monitoring, and incident response workflows.",
            },
            {
              icon: "/icons/mon-expands.svg",
              title: "As AI Expands",
              text: "Extend monitoring as new applications, integrations, users, and AI workflows are introduced.",
            },
          ]}
          cta={{ label: "Build a Stronger AI Monitoring Foundation", href: C }}
        />

        <AiaAudiences
          title="Who Should Consider AI Security Monitoring?"
          cta={{ label: "Assess Your AI Security Monitoring", href: C }}
          items={[
            {
              title: "Organizations Operating AI Applications",
              text: "Gain visibility into security-relevant activity across AI environments.",
            },
            {
              title: "Teams Integrating AI With Business Systems",
              text: "Monitor AI-related activity across applications, APIs, data, and connected systems.",
            },
            {
              title: "Organizations Expanding AI Use",
              text: "Extend security visibility as new AI applications and workflows are introduced.",
            },
            {
              title: "Security Operations Teams",
              text: "Bring relevant AI security signals into existing monitoring, detection, and response workflows.",
            },
          ]}
        />

        <div className="faq-section aia-faq">
          <Faq items={FAQS} cta={{ label: "Discuss Your AI Security Monitoring Requirements", href: C }} />
        </div>

        <CtaStrip
          title="See What Your AI Environment Is Telling You"
          text="Bring AI security signals into your monitoring and response workflows to improve visibility, detection, and security response."
          cta={{ label: "Talk to an AI Security Expert", href: C }}
          note="We'll review your AI environment, understand your monitoring requirements, and recommend the most practical next step."
        />
      </main>
      <Footer />
    </>
  );
}
