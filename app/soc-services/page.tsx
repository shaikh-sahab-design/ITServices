import type { Metadata } from "next";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { PageHero } from "@/components/page/PageHero";
import { SocCompare, SocIntro, SocProcess, SocServices, SocUseCases, SocWhy } from "@/components/page/Soc";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "SOC Managed Security Services | Folio3 Managed IT Services",
  description:
    "A Security Operations Center (SOC) continuously monitors your technology environment for suspicious activity and potential threats.",
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

export default function SocServicesPage() {
  return (
    <>
      <Nav />
      <main className="inner-page">
        <PageHero compact image="/images/hero-soc.webp" title={["Stay Ahead of Threats With", "24×7 Security Monitoring"]} />

        <SocIntro
          eyebrow="What Is SOC Managed Security Services?"
          title="Continuous Security Monitoring for a More Defensible Environment"
          text="A Security Operations Center (SOC) continuously monitors your technology environment for suspicious activity and potential threats. It combines SIEM analysis, threat detection, alert triage, log correlation, and incident escalation to identify meaningful security events and determine when further action is required."
          heading="How Continuous SOC Monitoring Strengthens Your Security"
          benefits={[
            {
              icon: "/icons/soc-visibility.svg",
              title: "Improve Security Visibility",
              text: "Understand what is happening across the systems, applications, identities, and environments within your monitoring scope.",
            },
            {
              icon: "/icons/soc-alerts.svg",
              title: "Prioritize Meaningful Alerts",
              text: "Reduce the noise around security events by focusing investigation on activity that warrants attention.",
            },
            {
              icon: "/icons/soc-detect.svg",
              title: "Detect Suspicious Activity Earlier",
              text: "Identify potentially malicious activity through continuous monitoring, event analysis, and detection use cases.",
            },
            {
              icon: "/icons/soc-context.svg",
              title: "Respond With Better Context",
              text: "Provide relevant event information and escalation details so security teams can make better-informed response decisions.",
            },
            {
              icon: "/icons/soc-strengthen.svg",
              title: "Strengthen Security Over Time",
              text: "Use monitoring insights, detection trends, and recurring findings to improve security controls and detection coverage.",
            },
          ]}
          promo={{
            title: "Ready to Start?",
            text: "Connect with our security team to scope your monitoring environment.",
            cta: { label: "Improve Your Security Monitoring", href: C },
          }}
        />

        <SocServices
          title="SOC Managed Security Services"
          wide={[
            {
              tone: "navy",
              icon: "/icons/soc-monitoring.svg",
              label: "24×7 Security Monitoring",
              title: "Keep Watch Over Your Security Environment",
              text: "Security events don't follow business hours. Continuous monitoring helps maintain visibility into relevant security activity and ensures potential threats can be identified for further analysis.",
              includes: [
                "24×7 Security Monitoring",
                "Security Event Monitoring",
                "Alert Review",
                "Security Activity Visibility",
                "Monitoring Coverage Management",
                "Security Reporting",
              ],
              cta: { label: "Get Started with 24×7 Monitoring", href: C },
            },
            {
              tone: "soft",
              icon: "/icons/soc-siem.svg",
              label: "SIEM Monitoring & Use-Case Management",
              title: "Turn Security Data Into Meaningful Detection",
              text: "A SIEM can collect enormous amounts of security data, but its value depends on how effectively that data is monitored and converted into useful detection scenarios.",
              includes: [
                "SIEM Monitoring",
                "Detection Use-Case Management",
                "Detection Rule Review",
                "Use-Case Tuning",
                "Alert Contextualization",
                "Detection Coverage Review",
              ],
              cta: { label: "Strengthen Your SIEM Monitoring", href: C },
            },
          ]}
          narrow={[
            {
              tone: "soft",
              icon: "/icons/soc-triage.svg",
              label: "Threat Detection & Alert Triage",
              title: "Separate Meaningful Threats From Alert Noise",
              text: "Not every alert represents an active threat. Alert triage helps determine which events require investigation, which can be deprioritized, and which should be escalated for further action.",
              includes: [
                "Threat Detection",
                "Security Alert Triage",
                "Suspicious Activity Review",
                "Alert Prioritization",
                "Threat Investigation",
                "Detection Analysis",
              ],
              cta: { label: "Improve Your Threat Detection", href: C },
            },
            {
              tone: "white",
              icon: "/icons/soc-log.svg",
              label: "Log Monitoring & Correlation",
              title: "Connect the Events That Matter",
              text: "Security information is often distributed across endpoints, networks, applications, identities, and cloud environments. Log correlation helps connect related events and provide greater context around suspicious activity.",
              includes: [
                "Security Log Monitoring",
                "Event Correlation",
                "Authentication Log Analysis",
                "Endpoint Event Analysis",
                "Network Event Monitoring",
                "Cloud Event Monitoring",
              ],
              cta: { label: "Improve Your Security Visibility", href: C },
            },
            {
              tone: "blue",
              icon: "/icons/soc-escalation.svg",
              label: "Security Incident Escalation",
              title: "Make Sure Important Security Events Get Attention",
              text: "When monitoring identifies an event that requires further investigation or response, a clear escalation process helps move it to the appropriate team with relevant context.",
              includes: [
                "Security Incident Escalation",
                "Alert Severity Assessment",
                "Incident Context",
                "Escalation Workflows",
                "Security Notifications",
                "Incident Documentation",
              ],
              cta: { label: "Strengthen Your Incident Escalation", href: C },
            },
          ]}
        />

        <SocProcess
          title="How Our SOC Managed Security Services Process Works"
          cta={{ label: "Plan Your Security Monitoring", href: C }}
          image={{
            src: "/images/soc-triage.webp",
            alt: "Security analysts reviewing alerts on a wall of monitoring dashboards",
            caption: "Prioritized security alerts.",
          }}
          stages={[
            {
              title: "Environment & Monitoring Scope",
              text: "We identify the systems, platforms, logs, and security events that should be included in the monitoring scope.",
              outcome: "A clearly defined monitoring environment.",
            },
            {
              title: "Monitoring & SIEM Configuration",
              text: "We establish monitoring coverage and review relevant SIEM data, detection use cases, and event sources.",
              outcome: "Security telemetry linked to monitoring.",
            },
            {
              title: "Detection & Alert Triage",
              text: "Security events are reviewed to identify suspicious activity and determine which alerts require further investigation.",
              outcome: "Prioritized security alerts.",
            },
            {
              title: "Investigation & Correlation",
              text: "Events are analyzed and correlated across sources to provide context around threats.",
              outcome: "Clearer insight into key security events.",
            },
            {
              title: "Escalation & Reporting",
              text: "Events needing action are escalated with relevant information documented for investigation.",
              outcome: "Clear security escalation and reporting.",
            },
          ]}
        />

        <SocCompare
          title="Why SOC Managed Security Services Is More Than Watching Alerts"
          text="A monitoring service is only useful when security data can be turned into meaningful action."
          head={["Basic Alert Monitoring", "SOC & Security Monitoring"]}
          rows={[
            ["Generates security notifications", "Monitors and analyzes security activity"],
            ["Focuses on individual alerts", "Correlates events across available sources"],
            ["Limited context", "Adds investigation and event context"],
            ["Can overwhelm internal teams", "Prioritizes meaningful security events"],
            ["Reactive review", "Continuous monitoring and escalation"],
            ["Limited detection improvement", "Supports ongoing use-case and detection tuning"],
          ]}
          cta={{ label: "Move Beyond Basic Alert Monitoring", href: C }}
        />

        <SocUseCases
          title="Built for Security Visibility Across Your Environment"
          text="SOC Managed Security Services can be particularly valuable when your organization is:"
          cases={[
            {
              title: "Managing a Growing Technology Environment",
              text: "More applications, users, devices, and systems mean more security events to monitor.",
            },
            {
              title: "Using Multiple Security Platforms",
              text: "Bring security event visibility together across relevant systems and platforms.",
            },
            {
              title: "Receiving More Alerts Than Your Team Can Review",
              text: "Add structured triage and prioritization to help internal teams focus on meaningful events.",
              dark: true,
            },
            {
              title: "Expanding Cloud or Remote Operations",
              text: "Maintain security visibility as users, workloads, and infrastructure become more distributed.",
              dark: true,
            },
          ]}
          banner={{
            title: "Strengthening Security Operations",
            text: "Establish a more structured approach to monitoring, detection, investigation, and escalation.",
            cta: { label: "Discuss Your Monitoring Environment", href: C },
          }}
        />

        <SocWhy
          eyebrow="Why Choose Folio3 for SOC Managed Security Services"
          title="Security Monitoring Backed by Broader Technology Expertise"
          paragraphs={[
            "Folio3 combines security and technology expertise to analyze security events within the context of your applications, infrastructure, and business operations, helping your team maintain visibility, prioritize meaningful alerts, and escalate threats with the right context.",
            "Our approach helps reduce alert fatigue by focusing attention on events that require investigation.",
          ]}
          cta={{ label: "Get Started with SOC Services", href: C }}
          highlight={{
            title: "Continuous Vigilance",
            text: "Always-on monitoring aligned with your technology environment and security priorities.",
          }}
          stats={[
            { value: "24×7", label: "Around-the-Clock Coverage", tone: "blue" },
            { value: "5", label: "Core Service Capabilities", tone: "red" },
          ]}
          footer={{
            title: "End-to-End Security Operations",
            text: "From detection and triage through escalation and reporting — managed as a continuous operation.",
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
