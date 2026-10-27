import type { Metadata } from "next";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { PageHero } from "@/components/page/PageHero";
import { SocClosing, SocCompare, SocIntro, SocProcess, SocServices, SocUseCases, SocWhy } from "@/components/page/Soc";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Managed Cloud Security Services | Folio3 Managed IT Services",
  description:
    "Cloud security managed services combine the controls, processes and expertise needed to protect your cloud identities, configurations, workloads, data and infrastructure.",
};

const C = ROUTES.contact;

const FAQS = [
  {
    q: "What are managed cloud security services?",
    a: "Managed cloud security services protect your cloud environments, identities, configurations, workloads and services through ongoing assessment, monitoring and incident response from an external security team.",
  },
  {
    q: "What do cloud security assessment managed services include?",
    a: "The scope can include cloud security posture, IAM and identity controls, configurations, workloads, containers, logging, monitoring and incident response readiness.",
  },
  {
    q: "Can you assess our existing cloud environment?",
    a: "Yes. Assessments run against your current environment to find security gaps and rank improvements based on your requirements.",
  },
  {
    q: "What cloud platforms do you support?",
    a: "Scope depends on the platforms, services, architecture and security requirements in your environment. These are reviewed during the initial assessment.",
  },
  {
    q: "Is cloud security different from cloud management?",
    a: "Yes. Cloud management operates and maintains cloud resources. Cloud security protects those resources from security risks.",
  },
  {
    q: "Can you review cloud identity and access controls?",
    a: "Yes. IAM reviews cover permissions, privileged access, authentication, roles and other cloud access controls.",
  },
  {
    q: "What happens if you find a serious cloud security issue?",
    a: "Findings are prioritized by relevance and impact, with remediation steps and, where needed, incident response or escalation guidance.",
  },
];

export default function CloudSecurityPage() {
  return (
    <>
      <Nav />
      <main className="inner-page">
        <PageHero
          compact
          image="/images/hero-soc.webp"
          title={["Managed Cloud Security Services", "That Close Gaps From Identity to Workload"]}
        />

        <SocIntro
          eyebrow="What are cloud security managed services?"
          title="Protect your cloud from first configuration to final response"
          text={[
            "Cloud security managed services combine the controls, processes and expertise needed to protect your cloud identities, configurations, workloads, data and infrastructure.",
            "Strong cloud security goes beyond securing individual workloads. It brings together posture management, identity protection, configuration reviews, workload and container security, monitoring and incident response, so risks get caught and your whole environment stays protected.",
          ]}
          cta={{ label: "Talk to a Security Expert", href: C }}
          heading="Fewer cloud risks, tighter access, clearer visibility"
          benefits={[
            {
              icon: "/icons/cloud-exposure.svg",
              title: "Reduce cloud security exposure",
              text: "Find weaknesses across configurations, identities, workloads and controls before they turn into bigger risks.",
            },
            {
              icon: "/icons/cloud-access.svg",
              title: "Strengthen cloud access",
              text: "Review identities, permissions, authentication and privileged access to control who reaches your cloud resources.",
            },
            {
              icon: "/icons/cloud-visibility.svg",
              title: "Improve security visibility",
              text: "Use cloud logging and monitoring to see activity across your entire environment.",
            },
            {
              icon: "/icons/cloud-workloads.svg",
              title: "Protect cloud workloads",
              text: "Find security weaknesses across workloads, containers, images, configurations and runtime environments.",
            },
            {
              icon: "/icons/cloud-respond.svg",
              title: "Respond with confidence",
              text: "Put clear processes in place for investigating, containing, escalating and responding to cloud incidents.",
            },
          ]}
          promo={{
            title: "Ready to Start?",
            text: "Connect with our security team to scope your monitoring environment.",
            cta: { label: "Strengthen Your Cloud Security", href: C },
          }}
        />

        <SocServices
          title="Managed cloud security services for every layer of your cloud"
          wide={[
            {
              tone: "navy",
              icon: "/icons/cloud-posture.svg",
              label: "Know Your Weak Spots",
              name: "Cloud Security Posture Management",
              title: "See your cloud security gaps before attackers do",
              text: "Cloud environments change fast as resources, configurations, identities and workloads grow. Cloud Security Posture Management finds security gaps and ranks the fixes across your environment.",
              includes: [
                "Cloud security posture assessment",
                "Security posture monitoring",
                "Cloud risk identification",
                "Security control assessment",
                "Security gap analysis",
                "Risk prioritization",
                "Security recommendations",
                "Posture improvement guidance",
              ],
              cta: { label: "Assess Your Cloud Posture", href: C },
            },
            {
              tone: "soft",
              icon: "/icons/cloud-iam.svg",
              label: "Control Cloud Access",
              name: "IAM & Identity Security",
              title: "Decide exactly who can reach your cloud",
              text: "Cloud identities often give direct access to critical resources. Reviewing permissions, authentication and access controls cuts unnecessary exposure and tightens control over cloud access.",
              includes: [
                "Cloud IAM assessment",
                "Identity and access reviews",
                "Privileged access review",
                "MFA assessment",
                "Role and permission analysis",
                "Access control review",
                "Identity risk assessment",
                "IAM recommendations",
              ],
              cta: { label: "Secure Cloud Identities", href: C },
            },
          ]}
          narrow={[
            {
              tone: "soft",
              icon: "/icons/cloud-config.svg",
              label: "Fix Risky Settings",
              name: "Cloud Configuration Reviews",
              title: "Catch misconfigurations before they become breaches",
              text: "Insecure or inconsistent configurations can quietly expose cloud resources. Configuration reviews find weaknesses across your cloud services and give practical steps to strengthen your controls.",
              includes: [
                "Cloud configuration reviews",
                "Security baseline assessment",
                "Configuration gap analysis",
                "Public exposure review",
                "Access configuration review",
                "Security control validation",
                "Misconfiguration identification",
                "Remediation recommendations",
              ],
              cta: { label: "Review Your Configuration", href: C },
            },
            {
              tone: "white",
              icon: "/icons/cloud-container.svg",
              label: "Protect What Runs",
              name: "Workload & Container Security",
              title: "Secure the workloads running inside your cloud",
              text: "Workloads and containers bring risks across images, configurations, access, runtime activity and deployments. Assessing them finds weaknesses before they reach production.",
              includes: [
                "Cloud workload security assessment",
                "Container security assessment",
                "Container configuration review",
                "Image security review",
                "Workload access assessment",
                "Runtime security review",
                "Workload risk analysis",
                "Security recommendations",
              ],
              cta: { label: "Secure Your Workloads", href: C },
            },
            {
              tone: "blue",
              icon: "/icons/cloud-logging.svg",
              label: "See Cloud Activity",
              name: "Cloud Logging & Monitoring",
              title: "Turn cloud activity into clear security visibility",
              text: "Your cloud generates valuable security events across identities, workloads, configurations and services. Monitoring and analyzing those logs exposes suspicious activity early.",
              includes: [
                "Cloud log monitoring",
                "Security event monitoring",
                "Cloud activity analysis",
                "Identity event monitoring",
                "Workload event monitoring",
                "Log correlation",
                "Security alert analysis",
                "Monitoring recommendations",
              ],
              cta: { label: "Improve Cloud Visibility", href: C },
            },
          ]}
        />

        <SocProcess
          title="How Folio3 secures your cloud, step by step"
          cta={{ label: "Plan Your Cloud Assessment", href: C }}
          image={{
            src: "/images/cloud-validation.webp",
            alt: "Hand touching a glowing shield and padlock linked to connected security icons above a tablet",
          }}
          stages={[
            {
              title: "Cloud environment assessment",
              text: "Folio3 reviews your cloud environment, security architecture, identities, configurations, workloads and existing controls to establish your current posture.",
              outcome: "A clear view of your cloud security environment.",
            },
            {
              title: "Risk and configuration analysis",
              text: "Configurations, access controls, workloads and security controls are reviewed to find weaknesses and exposure.",
              outcome: "Prioritized cloud security findings.",
            },
            {
              title: "Security validation",
              text: "Each risk is reviewed in the context of your environment to confirm its relevance, impact and fix priority.",
              outcome: "Full context around your cloud risks.",
            },
            {
              title: "Remediation and response planning",
              text: "Practical recommendations are built to strengthen controls, close gaps and set up the right response processes.",
              outcome: "A structured path to stronger cloud security.",
            },
            {
              title: "Monitoring and improvement",
              text: "Controls, monitoring needs and risks are reviewed over time as your environment and business change.",
              outcome: "Cloud security that holds up long term.",
            },
          ]}
        />

        <SocCompare
          title="Why a well-run cloud can still be an insecure one"
          text={[
            "Cloud management keeps your infrastructure running. Cloud security makes sure it’s protected.",
            "A well-managed cloud can still have excessive permissions, exposed resources, insecure configurations, gaps in logging or vulnerable workloads.",
            "The two work best together, but they solve different problems.",
          ]}
          head={["Cloud management", "Cloud security"]}
          rows={[
            ["Focuses on availability", "Focuses on security risk"],
            ["Manages cloud resources", "Assesses security configurations"],
            ["Supports infrastructure operations", "Reviews identities and access"],
            ["Maintains workloads", "Assesses workload security"],
            ["Monitors performance", "Monitors security activity"],
            ["Supports daily management", "Supports incident response"],
          ]}
          cta={{ label: "Assess Your Cloud Security", href: C }}
        />

        <SocUseCases
          title="Security expertise that covers your cloud and beyond"
          text="Cloud security doesn’t exist apart from the rest of your technology. With Folio3 managed security services, cloud risks are assessed alongside your infrastructure, identities and applications, never in isolation."
          cases={[
            {
              title: "Cloud security posture expertise",
              text: "Find gaps across cloud configurations, controls, resources and environments.",
            },
            {
              title: "Identity and access expertise",
              text: "Review cloud identities, permissions, authentication and privileged access in the context of your environment.",
            },
            {
              title: "Workload and container security",
              text: "Assess the security of workloads, containers, images and deployment environments.",
              dark: true,
            },
            {
              title: "Cloud monitoring and response",
              text: "Improve visibility into cloud activity and set up structured incident response.",
              dark: true,
            },
          ]}
          cta={{ label: "Talk to a Security Expert", href: C }}
        />

        <SocWhy
          eyebrow="Why teams choose Folio3 cloud managed security services"
          title="Cloud security backed by broader technology expertise"
          paragraphs={[
            "Strong cloud security takes more than reviewing configurations. Folio3 combines security and technology expertise to understand cloud risks in the context of your identities, applications, infrastructure, workloads, integrations and business operations.",
            "That links every finding to the systems and users involved, giving your team a practical base for prioritizing risks and strengthening controls.",
          ]}
          highlight={{
            title: "Proactive Cloud Protection",
            text: "Continuously strengthen cloud configurations, workloads, identities, and access controls.",
          }}
          footer={{
            title: "From Configuration to Cloud Security",
            text: "Secure cloud environments through stronger controls, visibility, and ongoing monitoring.",
          }}
        />

        <div className="faq-section">
          <Faq items={FAQS} cta={{ label: "Get Cloud Security Guidance", href: C }} />
        </div>

        <SocClosing
          title="Know exactly where your cloud security stands"
          text="Find where your cloud risks are, strengthen the controls around them and build a clear path to ongoing protection with Folio3 managed cloud security services."
          primary={{ label: "Get a Free Cloud Security Assessment", href: C }}
          note="A Folio3 specialist will review your cloud environment and security requirements, then recommend the most practical next step."
        />
      </main>
      <Footer />
    </>
  );
}
