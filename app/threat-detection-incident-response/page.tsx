import type { Metadata } from "next";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { PageHero } from "@/components/page/PageHero";
import { SocClosing, SocCompare, SocIntro, SocProcess, SocServices, SocUseCases, SocWhy } from "@/components/page/Soc";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Managed Detection and Response (MDR) Services | Folio3 Managed IT Services",
  description:
    "Managed detection and response (MDR) services find suspicious activity, investigate potential threats, contain security incidents and coordinate the right response.",
};

const C = ROUTES.contact;

const FAQS = [
  {
    q: "What are managed detection and response (MDR) services?",
    a: "MDR services find suspicious activity, investigate potential threats, contain incidents and coordinate response, delivered by an external security team.",
  },
  {
    q: "What is the difference between threat detection and incident response?",
    a: "Threat detection finds malicious activity. Incident response investigates and acts when a security event needs further action.",
  },
  {
    q: "What types of threats can you investigate?",
    a: "Investigations can cover suspicious identity activity, endpoint threats, malware, unusual network behavior, application activity, cloud events and other security events in your environment.",
  },
  {
    q: "What is threat hunting?",
    a: "Threat hunting is a proactive search for suspicious behaviors, indicators and attack patterns that haven’t triggered standard security alerts.",
  },
  {
    q: "Can MDR work with our existing security tools?",
    a: "It depends on your security platforms, telemetry, integrations and environment. Detection scope is set based on what you already have and what you need.",
  },
  {
    q: "What happens after a threat is detected?",
    a: "The event is triaged and investigated to confirm its significance. If needed, it’s escalated, contained and handled through the defined incident response process.",
  },
  {
    q: "Do you provide digital forensics support?",
    a: "Yes. Digital forensics is available when deeper investigation is needed to examine evidence, understand incident activity and establish timelines or attack paths.",
  },
];

export default function ThreatDetectionPage() {
  return (
    <>
      <Nav />
      <main className="inner-page">
        <PageHero
          compact
          image="/images/hero-soc.webp"
          title={["Managed Detection and Response (MDR)", "Services That Stop Threats Fast"]}
        />

        <SocIntro
          eyebrow="What are managed detection and response MDR services?"
          title="Turn security signals into fast, confident action"
          text={[
            "Managed detection and response (MDR) services find suspicious activity, investigate potential threats, contain security incidents and coordinate the right response across your technology environment.",
            "MDR goes past alerts. It connects detection, investigation, response, threat hunting and reporting, so your team knows what happened, what needs action and how to strengthen controls over time.",
          ]}
          cta={{ label: "Talk to a Security Expert", href: C }}
          heading="Catch threats sooner and shut them down faster"
          benefits={[
            {
              icon: "/icons/mdr-early.svg",
              title: "Detect threats earlier",
              text: "Spot suspicious activity before it grows into a major security incident.",
            },
            {
              icon: "/icons/mdr-context.svg",
              title: "Investigate with full context",
              text: "Connect events, users, devices and systems to build a clear picture of what happened.",
            },
            {
              icon: "/icons/mdr-structure.svg",
              title: "Respond with structure",
              text: "Follow defined investigation, escalation, containment and response steps when an event needs action.",
            },
            {
              icon: "/icons/mdr-hidden.svg",
              title: "Uncover hidden threats",
              text: "Use proactive threat hunting to find activity that standard detection misses.",
            },
            {
              icon: "/icons/mdr-improve.svg",
              title: "Strengthen security over time",
              text: "Use investigation findings and incident insights to improve detection, response and controls.",
            },
          ]}
          promo={{
            title: "Ready to Start?",
            text: "Connect with our security team to scope your monitoring environment.",
            cta: { label: "Strengthen Threat Response", href: C },
          }}
        />

        <SocServices
          title="MDR services that cover every stage of an attack"
          wide={[
            {
              tone: "navy",
              icon: "/icons/mdr-detect.svg",
              label: "Spot Threats Early",
              name: "Threat Detection",
              title: "Catch suspicious activity before it escalates",
              text: "Find malicious activity across your environment and decide which security events need investigation or response.",
              includes: [
                "Threat detection",
                "Suspicious activity analysis",
                "Security event analysis",
                "Threat indicator review",
                "Detection monitoring",
                "Alert prioritization",
                "Threat identification",
                "Security findings",
              ],
              cta: { label: "Strengthen Threat Detection", href: C },
            },
            {
              tone: "soft",
              icon: "/icons/mdr-investigate.svg",
              label: "Get the Full Story",
              name: "Incident Investigation",
              title: "Learn what happened and where the risk lies",
              text: "Investigate suspicious events to understand the affected users, devices, systems, activity patterns and potential impact.",
              includes: [
                "Security incident investigation",
                "Event analysis",
                "User activity review",
                "Endpoint threat analysis",
                "Authentication activity review",
                "Incident timeline development",
                "Threat analysis",
                "Investigation findings",
              ],
              cta: { label: "Investigate an Incident", href: C },
            },
          ]}
          narrow={[
            {
              tone: "soft",
              icon: "/icons/mdr-respond.svg",
              label: "Contain Threats Fast",
              name: "Incident Response",
              title: "Go from threat found to threat contained",
              text: "When an event needs action, structured response processes coordinate investigation, containment, escalation and next steps.",
              includes: [
                "Incident response",
                "Threat containment",
                "Response coordination",
                "Incident escalation",
                "Threat severity assessment",
                "Response workflow support",
                "Incident documentation",
                "Recovery recommendations",
              ],
              cta: { label: "Strengthen Incident Response", href: C },
            },
            {
              tone: "white",
              icon: "/icons/mdr-hunt.svg",
              label: "Find Hidden Attackers",
              name: "Threat Hunting",
              title: "Hunt down threats that never set off an alert",
              text: "Threat hunting actively searches for suspicious behaviors, indicators and activity patterns that standard security alerts miss.",
              includes: [
                "Threat hunting",
                "Indicator analysis",
                "Behavioral analysis",
                "Suspicious activity investigation",
                "Endpoint threat hunting",
                "Identity threat hunting",
                "Network activity analysis",
                "Threat hunting findings",
              ],
              cta: { label: "Start Threat Hunting", href: C },
            },
            {
              tone: "blue",
              icon: "/icons/mdr-report.svg",
              label: "Clear Incident Records",
              name: "Security Incident Reporting",
              title: "Turn investigations into findings leaders can act on",
              text: "Clear incident reports show security and leadership teams what happened, how it was handled and where security needs to improve.",
              includes: [
                "Security incident reporting",
                "Incident summaries",
                "Investigation findings",
                "Incident timeline documentation",
                "Impact assessment",
                "Response documentation",
                "Security recommendations",
                "Post-incident reporting",
              ],
              cta: { label: "Improve Incident Reporting", href: C },
            },
          ]}
        />

        <SocProcess
          title="How Folio3 Moves From First Alert to Full Resolution"
          cta={{ label: "Plan Your Threat Response", href: C }}
          image={{
            src: "/images/mdr-validation.webp",
            alt: "Analyst pointing at a flagged alert in an audit log on a transparent compliance dashboard",
          }}
          stages={[
            {
              title: "Detection and triage",
              text: "Security events and suspicious activity are reviewed to spot potential threats and decide which need investigation.",
              outcome: "Prioritized security events that need attention.",
            },
            {
              title: "Investigation and analysis",
              text: "Users, devices, systems, logs and activity are analyzed to understand the nature and scope of the event.",
              outcome: "Full context around the security event.",
            },
            {
              title: "Threat validation",
              text: "Suspicious activity is analyzed further, where needed, to confirm whether it’s a real threat.",
              outcome: "Confidence in the identified threat.",
            },
            {
              title: "Containment and response",
              text: "Response actions are coordinated to contain the threat, escalate the incident and limit the impact.",
              outcome: "A structured path to containment and response.",
            },
            {
              title: "Reporting and improvement",
              text: "Findings and response actions are documented, with recommendations to strengthen future detection and controls.",
              outcome: "Clear incident records and security improvement priorities.",
            },
          ]}
        />

        <SocCompare
          title="Why alerts alone won’t stop an attack"
          text="Security tools generate alerts at scale, but an alert doesn’t tell you whether it’s a real threat or what to do next. Managed detection and response MDR services providers add investigation, context, threat hunting and response, turning signals into action."
          head={["Security alerts alone", "Folio3 MDR services"]}
          rows={[
            ["Generates potential security events", "Identifies and investigates real threats"],
            ["Focuses on individual alerts", "Connects activity across systems"],
            ["Limited context", "Adds investigation and threat context"],
            ["Needs internal interpretation", "Provides structured triage and investigation"],
            ["May stop at detection", "Connects detection to response"],
            ["Limited incident records", "Includes investigation and reporting"],
          ]}
          cta={{ label: "Go Beyond Alerts", href: C }}
        />

        <SocUseCases
          title="Security expertise that sees the whole attack"
          text="Security incidents rarely stay in one technology layer. Folio3 brings security, infrastructure, cloud, identity and application expertise together, so threats are understood across your whole environment."
          cases={[
            {
              title: "Threat detection expertise",
              text: "Spot suspicious activity across applications, identities, endpoints, infrastructure and cloud environments.",
            },
            {
              title: "Investigation and response support",
              text: "Move from potential threats to structured investigation, containment, escalation and response.",
            },
            {
              title: "Broader technology perspective",
              text: "See each security event alongside the systems, users, applications and infrastructure involved.",
              dark: true,
            },
            {
              title: "Security improvement guidance",
              text: "Use incident findings to strengthen detection, security controls and response processes.",
              dark: true,
            },
          ]}
          cta={{ label: "Talk to a Security Expert", href: C }}
        />

        <SocWhy
          eyebrow="Why teams choose Folio3 for MDR services"
          title="Security operations backed by broader technology expertise"
          paragraphs={[
            "Stopping threats takes more than spotting suspicious activity. Folio3 combines security and technology expertise to understand each threat in the context of your applications, identities, endpoints, infrastructure, cloud and business operations.",
            "That links every security event to the systems and users involved, giving your team a practical base for investigation, response and lasting improvement.",
          ]}
          highlight={{
            title: "Proactive Threat Detection",
            text: "Continuously detect, investigate, and respond to threats across your environment.",
          }}
          footer={{
            title: "From Detection to Response",
            text: "Turn security signals into faster investigation, containment, and response.",
          }}
        />

        <div className="faq-section">
          <Faq items={FAQS} cta={{ label: "Get MDR Guidance", href: C }} />
        </div>

        <SocClosing
          title="Know what’s happening and exactly what to do next"
          text="Folio3 managed detection and response services help you spot suspicious activity, investigate real threats and move from detection to action without delay."
          primary={{ label: "Get a Free Security Assessment", href: C }}
          secondary={{ label: "Talk to a Security Expert", href: C }}
          note="A Folio3 specialist will review your security environment and detection and response needs, then recommend the right next step."
        />
      </main>
      <Footer />
    </>
  );
}
