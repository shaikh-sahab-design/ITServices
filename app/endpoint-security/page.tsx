import type { Metadata } from "next";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { PageHero } from "@/components/page/PageHero";
import { SocClosing, SocCompare, SocIntro, SocProcess, SocServices, SocUseCases, SocWhy } from "@/components/page/Soc";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Endpoint Security Service | Folio3 Managed IT Services",
  description:
    "Folio3’s endpoint security service monitors devices, identities and Microsoft 365 continuously, so threats get caught before they spread.",
};

const C = ROUTES.contact;

const FAQS = [
  {
    q: "What is an endpoint security service?",
    a: "An endpoint security service combines endpoint monitoring, identity security, Microsoft 365 security, privileged access monitoring and posture management to protect users, devices and access across your business.",
  },
  {
    q: "What does EDR/XDR monitoring include?",
    a: "EDR/XDR monitoring gives visibility into endpoint security events, suspicious activity, threat indicators and other activity that needs analysis or investigation.",
  },
  {
    q: "Can you secure our existing Microsoft 365 environment?",
    a: "Yes. Folio3 assesses your current Microsoft 365 setup to find gaps in security configuration, identity, authentication and policies.",
  },
  {
    q: "What does identity and access security cover?",
    a: "It covers authentication, MFA, Conditional Access, permissions, roles, access controls and identity-related risk.",
  },
  {
    q: "Why is privileged access monitoring important?",
    a: "Privileged accounts have elevated access to critical systems and data. Monitoring them shows how that access is used and where tighter controls are needed.",
  },
  {
    q: "Can you review our existing endpoint security posture?",
    a: "Yes. Posture reviews assess device configurations, security controls, protection tools, policies and other endpoint security requirements.",
  },
  {
    q: "Can this work alongside our existing IT or security team?",
    a: "Yes. Endpoint security as a service supports your internal team with extra monitoring, assessments, security expertise and ongoing improvement.",
  },
];

export default function EndpointSecurityPage() {
  return (
    <>
      <Nav />
      <main className="inner-page">
        <PageHero
          compact
          image="/images/hero-soc.webp"
          title={["Endpoint Security Service That Protects", "Every User, Device and Login"]}
        />

        <SocIntro
          eyebrow="What is endpoint security as a service?"
          title="Protect the people, devices and access your business runs on"
          text={[
            "Endpoint security as a service combines endpoint monitoring, identity protection, Microsoft 365 security, privileged access oversight and device posture reviews. Together they protect the technology your employees use to reach business systems.",
            "Devices and identities aren’t treated as separate problems. Folio3 connects endpoint monitoring, Microsoft 365 security, access controls, privileged access monitoring and posture reviews, so risks are spotted and protection gets stronger across your whole user environment.",
          ]}
          cta={{ label: "Talk to a Security Expert", href: C }}
          heading="Fewer weak devices, safer logins, stronger defenses"
          benefits={[
            {
              icon: "/icons/ep-exposure.svg",
              title: "Reduce endpoint exposure",
              text: "Find security gaps across devices, configurations, protection controls and endpoint activity before they grow into bigger risks.",
            },
            {
              icon: "/icons/ep-identity.svg",
              title: "Strengthen identity protection",
              text: "Review authentication, access controls, permissions and identity risks to block unauthorized access.",
            },
            {
              icon: "/icons/ep-m365.svg",
              title: "Protect Microsoft 365 access",
              text: "Tighten the controls around the users, identities, applications, email and data connected through Microsoft 365.",
            },
            {
              icon: "/icons/ep-privileged.svg",
              title: "Monitor privileged activity",
              text: "Keep elevated access visible and flag activity that needs investigation.",
            },
            {
              icon: "/icons/ep-posture.svg",
              title: "Improve security posture",
              text: "Use continuous monitoring and regular reviews to strengthen endpoint and identity controls as your environment changes.",
            },
          ]}
          promo={{
            title: "Ready to Start?",
            text: "Connect with our security team to scope your monitoring environment.",
            cta: { label: "Strengthen Endpoint Security", href: C },
          }}
        />

        <SocServices
          title="An endpoint security service that covers every entry point"
          wide={[
            {
              tone: "navy",
              icon: "/icons/ep-edr.svg",
              label: "Catch Device Threats",
              name: "EDR/XDR Monitoring",
              title: "Spot suspicious device activity before it escalates",
              text: "Endpoint detection and response finds suspicious activity across your devices and exposes malicious behavior that would otherwise go unnoticed.",
              includes: [
                "EDR/XDR monitoring",
                "Endpoint threat detection",
                "Suspicious activity analysis",
                "Endpoint event analysis",
                "Threat indicator review",
                "Security alert analysis",
                "Endpoint investigation",
                "Detection recommendations",
              ],
              cta: { label: "Strengthen Endpoint Monitoring", href: C },
            },
            {
              tone: "soft",
              icon: "/icons/ep-m365card.svg",
              label: "Lock Down Microsoft 365",
              name: "Microsoft 365 Security",
              title: "Close the security gaps in your Microsoft 365 setup",
              text: "Microsoft 365 connects your users to email, files, applications, identities and business data. Security reviews find the weaknesses in the controls protecting it.",
              includes: [
                "Microsoft 365 security assessment",
                "Microsoft 365 security configuration review",
                "Exchange Online security review",
                "Microsoft 365 identity security",
                "Security policy review",
                "Authentication security review",
                "Security control assessment",
              ],
              cta: { label: "Secure Microsoft 365", href: C },
            },
          ]}
          narrow={[
            {
              tone: "soft",
              icon: "/icons/ep-access.svg",
              label: "Control User Access",
              name: "Identity & Access Security",
              title: "Decide exactly who gets into your business systems",
              text: "Identity controls access across every modern environment. Reviewing authentication, permissions, roles and access controls cuts unnecessary exposure and tightens control over user access.",
              includes: [
                "Identity security assessment",
                "Access control reviews",
                "Authentication review",
                "MFA assessment",
                "Conditional Access review",
                "Role and permission analysis",
                "Identity risk assessment",
                "Access security recommendations",
              ],
              cta: { label: "Strengthen Identity Security", href: C },
            },
            {
              tone: "white",
              icon: "/icons/ep-admin.svg",
              label: "Watch Admin Activity",
              name: "Privileged Access Monitoring",
              title: "Keep high-risk admin access under close watch",
              text: "Privileged accounts can reach critical systems and data. Monitoring their activity flags unusual behavior and shows how elevated access is actually used.",
              includes: [
                "Privileged access monitoring",
                "Privileged account review",
                "Administrative activity monitoring",
                "Elevated access analysis",
                "Privileged identity assessment",
                "Suspicious privileged activity review",
                "Access risk analysis",
                "Privileged access recommendations",
              ],
              cta: { label: "Secure Privileged Access", href: C },
            },
            {
              tone: "blue",
              icon: "/icons/ep-health.svg",
              label: "Know Device Health",
              name: "Endpoint Security Posture Reviews",
              title: "Find out how secure your devices really are",
              text: "Posture reviews assess device configurations, security controls, policies and protection levels to find the gaps that raise your exposure.",
              includes: [
                "Endpoint security posture assessment",
                "Device configuration review",
                "Security policy review",
                "Endpoint protection assessment",
                "Device compliance review",
                "Security control validation",
                "Endpoint risk identification",
                "Remediation recommendations",
              ],
              cta: { label: "Review Device Security", href: C },
            },
          ]}
        />

        <SocProcess
          title="How Folio3 secures your users and devices, step by step"
          cta={{ label: "Plan Your Security Assessment", href: C }}
          image={{
            src: "/images/ep-validation.webp",
            alt: "Hand tapping a tablet beneath a glowing cloud showing a software update deploying to connected devices",
          }}
          stages={[
            {
              title: "Environment assessment",
              text: "Folio3 reviews your endpoints, identities, Microsoft 365 environment, privileged access, security controls and policies to establish your current posture.",
              outcome: "A clear view of your endpoint and identity environment.",
            },
            {
              title: "Risk and security analysis",
              text: "Endpoint configurations, identity controls, permissions, privileged activity and Microsoft 365 settings are reviewed to find weaknesses.",
              outcome: "Prioritized endpoint and identity findings.",
            },
            {
              title: "Security validation",
              text: "Each risk is reviewed in the context of your environment to confirm its relevance, impact and fix priority.",
              outcome: "Full context around your security risks.",
            },
            {
              title: "Monitoring and remediation",
              text: "Monitoring and fixes are set up around the areas that need more visibility or improvement.",
              outcome: "A structured path to stronger endpoint and identity protection.",
            },
            {
              title: "Ongoing improvement",
              text: "Endpoint activity, identity controls, privileged access and posture are reviewed over time as users, devices and business needs change.",
              outcome: "Endpoint security that holds up long term.",
            },
          ]}
        />

        <SocCompare
          title="Why managing devices isn’t the same as securing them"
          text={[
            "Managing devices and user accounts keeps your environment running. It doesn’t give you the visibility to spot suspicious endpoint activity, excessive permissions, compromised identities or risky admin access.",
            "An endpoint security service adds security-focused monitoring, assessment and controls around the technology your users rely on every day.",
            "The two work best together, but they solve different problems.",
          ]}
          head={["Basic IT management", "Endpoint security service"]}
          rows={[
            ["Manages user devices", "Assesses endpoint security posture"],
            ["Supports user accounts", "Reviews identity security"],
            ["Maintains Microsoft 365 services", "Assesses Microsoft 365 security controls"],
            ["Handles access requests", "Reviews access risk and permissions"],
            ["Supports admin accounts", "Monitors privileged access"],
            ["Focuses on operations", "Focuses on security exposure"],
          ]}
          cta={{ label: "Assess Your Endpoint Security", href: C }}
        />

        <SocUseCases
          title="Security expertise that covers users, devices and beyond"
          text="Endpoint security doesn’t exist apart from the rest of your environment. Folio3 brings security, Microsoft, infrastructure, identity and managed IT expertise together to tackle risk across your whole user environment."
          cases={[
            {
              title: "Endpoint security expertise",
              text: "Find gaps across devices, endpoint controls, configurations and suspicious activity.",
            },
            {
              title: "Microsoft 365 security expertise",
              text: "Review controls across Microsoft 365 and the users and identities connected to it.",
            },
            {
              title: "Identity and access expertise",
              text: "Assess authentication, permissions, roles and access controls to strengthen identity security.",
              dark: true,
            },
            {
              title: "Privileged access and monitoring",
              text: "Improve visibility into elevated access and find areas that need tighter oversight.",
              dark: true,
            },
          ]}
          cta={{ label: "Talk to a Security Expert", href: C }}
        />

        <SocWhy
          eyebrow="Why teams choose Folio3’s endpoint security service"
          title="Endpoint and identity security backed by broader technology expertise"
          paragraphs={[
            "Endpoint and identity risks are closely linked. A compromised device can expose an identity, and a compromised account can open your business systems.",
            "Folio3 combines security and technology expertise to understand both risks in the context of your Microsoft 365 environment, applications, infrastructure, access controls and business operations.",
          ]}
          highlight={{
            title: "Proactive Endpoint & Identity Protection",
            text: "Strengthen protection across users, devices, identities, and access with security controls designed to reduce unauthorized access and endpoint-based risks.",
          }}
          footer={{ title: "From Access to Endpoint Security" }}
        />

        <div className="faq-section">
          <Faq items={FAQS} cta={{ label: "Get Endpoint Security Guidance", href: C }} />
        </div>

        <SocClosing
          title="Find out which users, devices and logins need attention"
          text="Strengthen protection across every user, device and login with continuous monitoring, security assessments and identity protection from Folio3’s endpoint security service."
          primary={{ label: "Get a Free Endpoint Security Assessment", href: C }}
          note="A Folio3 specialist will review your endpoint and identity environment and security requirements, then recommend the most practical next step."
        />
      </main>
      <Footer />
    </>
  );
}
