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
  title: "Managed Security Services | Folio3",
  description:
    "Protect your business with proactive security management, continuous monitoring, threat detection, and expert response designed to reduce risk before it becomes disruption",
};

export default function ManagedSecurityPage() {
  return (
    <>
      <Nav />
      <main className="inner-page">
        <PageHero
          image="/images/hero-managed-security.webp"
          fade={[33.8, 67.9]}
          copyWidth={632}
          title={["Security That Stays ", "Ahead of the Threat"]}
          lede="Protect your business with proactive security management, continuous monitoring, threat detection, and expert response designed to reduce risk before it becomes disruption"
          actions={[
            { label: "Get Your Security Assessment", href: ROUTES.contact, variant: "primary" },
            { label: "Talk to a Security Expert", href: ROUTES.contact, variant: "ghost" },
          ]}
        />

        <SplitFeature
          tag={{ label: "Find the Weaknesses Before Attackers Do", accent: "yellow" }}
          title={<>Vulnerability Assessment &amp;<br />Penetration Testing</>}
          lede="Identify vulnerabilities across your technology environment and validate which weaknesses could create real-world exposure. We combine automated assessment with expert validation and penetration testing to help you prioritize remediation based on risk."
          columns={[
            ["Vulnerability Assessment", "External & Internal Testing", "Vulnerability Prioritization"],
            ["Penetration Testing", "Web & Application Testing", "Remediation Guidance"],
          ]}
          cta={{ label: "Get Started with VAPT", href: ROUTES.contact }}
          image={{ src: "/images/ms-vapt.webp", alt: "Holographic padlock over a keyboard" }}
          stat={{ icon: "/icons/mit-stat-support.svg", value: "100%", label: "Significant Findings Validated", accent: "yellow" }}
        />

        <SplitFeature
          tone="soft"
          imageSide="left"
          tag={{ label: "Continuous security monitoring without building a SOC", accent: "green" }}
          title={<>Security Operations Center<br />(SOC)</>}
          lede="Security events can happen at any time. Our SOC provides continuous monitoring, alert triage, investigation, and escalation to help your organization maintain visibility across its security environment."
          columns={[
            ["24/7 Security Monitoring", "Security Event Investigation", "Security Event Correlation"],
            ["Security Alert Triage", "Threat Monitoring", "Incident Escalation"],
          ]}
          cta={{ label: "Get Started with SOC Services", href: ROUTES.soc }}
          image={{ src: "/images/ms-soc.webp", alt: "Magnifying glass over a security shield" }}
          stat={{ icon: "/icons/ms-stat-soc.svg", value: "24/7", label: "Security Monitoring", accent: "green" }}
        />

        <SplitFeature
          tag={{ label: "Detect Threats. Respond Faster. Reduce Impact.", accent: "blue" }}
          title={<>Threat Detection &amp;<br />Incident Response</>}
          lede="When suspicious activity appears, fast investigation and coordinated response can make the difference between a contained event and a larger security incident. Our team helps detect, investigate, contain, and respond to threats across your environment."
          columns={[
            ["Threat Detection", "Endpoint Threat Analysis", "Suspicious Activity Analysis", "Response Coordination"],
            ["Security Incident Investigation", "Malware Investigation", "Incident Containment", "Post-Incident Reporting"],
          ]}
          cta={{ label: "Strengthen Your Threat Response", href: ROUTES.contact }}
          image={{ src: "/images/ms-threat.webp", alt: "Analyst watching monitoring dashboards" }}
          stat={{ icon: "/icons/ms-stat-threat.svg", value: "95%", label: "Threat Visibility", accent: "blue" }}
        />

        <SplitFeature
          tone="soft"
          imageSide="left"
          tag={{ label: "Secure Your Cloud Environment From Configuration to Access", accent: "grey" }}
          title="Cloud Security"
          lede="Cloud environments introduce new security considerations across identities, workloads, configurations, applications, and data. We assess and strengthen cloud security controls to help reduce exposure and maintain a more secure environment."
          columns={[
            ["Cloud Security Assessments", "Cloud Identity & Access Security", "Security Monitoring"],
            ["Configuration Reviews", "Cloud Workload Protection", "Cloud Risk Management"],
          ]}
          cta={{ label: "Secure Your Cloud Environment", href: ROUTES.contact }}
          image={{ src: "/images/ms-cloud.webp", alt: "Files streaming from a cabinet into a cloud network" }}
          stat={{ icon: "/icons/ms-stat-cloud.svg", value: "360o", label: "Cloud Security Visibility", accent: "grey" }}
        />

        <SplitFeature
          tag={{ label: "Protect the Users and Devices at the Center of Your Environment", accent: "purple" }}
          title="Endpoint & Identity Security"
          lede="Endpoints and identities are common targets for attackers. We help strengthen the controls around users, devices, authentication, privileges, and access to reduce unauthorized activity and identity-based threats."
          columns={[
            ["Endpoint Security", "MFA & Conditional Access", "Device Security"],
            ["Identity Protection", "Privileged Access Management", "Identity Risk Management"],
          ]}
          cta={{ label: "Strengthen Endpoint & Identity Security", href: ROUTES.contact }}
          image={{ src: "/images/ms-endpoint.webp", alt: "Compliance audit log on a holographic screen" }}
          stat={{ icon: "/icons/ms-stat-endpoint.svg", value: "0 Trust", label: "Access Protection", accent: "purple" }}
        />

        <SplitFeature
          tone="soft"
          imageSide="left"
          tag={{ label: "Turn Security Requirements Into Actionable Improvements", accent: "grey" }}
          title="Security Compliance & Risk"
          lede="Compliance should do more than satisfy an audit. We assess your security controls, policies, processes, and evidence to identify gaps, prioritize risk, and create a practical path toward stronger security and compliance readiness."
          columns={[
            ["Security Risk Assessments", "SOC 2 Readiness", "Security Policy Reviews", "Compliance Gap Assessments"],
            ["ISO 27001 Assessments", "GDPR Compliance Audits", "Control Assessments", "Remediation Roadmaps"],
          ]}
          cta={{ label: "Assess Your Security & Compliance Readiness", href: ROUTES.contact }}
          image={{ src: "/images/ms-compliance.webp", alt: "Shield and padlock on a circuit board" }}
          stat={{ icon: "/icons/ms-stat-compliance.svg", value: "6+", label: "Compliance & Risk Areas", accent: "grey" }}
        />

        <IconCards
          tone="dark"
          tight
          eyebrow="What You Can Expect"
          title="From Assessment to Full Management in Days, Not Months"
          cta={{ label: "Start Your Security Assessment", href: ROUTES.contact }}
          cards={[
            {
              icon: "/icons/step-assessment.svg",
              title: "Security Assessment",
              text: "We begin by assessing your current security environment, identifying vulnerabilities, reviewing existing controls, and understanding the risks most relevant to your business.",
            },
            {
              icon: "/icons/step-roadmap.svg",
              title: "Security Roadmap",
              text: "We translate findings into a prioritized roadmap based on risk, business impact, compliance requirements, and your organization's security priorities.",
            },
            {
              icon: "/icons/step-onboarding.svg",
              title: "Security Onboarding",
              text: "Our team establishes monitoring, reporting, escalation paths, and security processes with minimal disruption to your existing environment.",
            },
            {
              icon: "/icons/step-protection.svg",
              title: "Continuous Protection",
              text: "We continuously monitor, investigate, report, and optimize your security environment while adapting your protection strategy as threats and business requirements evolve.",
            },
          ]}
        />

        <CardRail
          arrows
          title="Security Expertise Across Your Technology Environment"
          lede="Our managed security covers key risk areas—from vulnerabilities and identities to cloud, endpoints, threats, and compliance."
          cards={[
            {
              icon: "/icons/ms-area-assessments.svg",
              title: "Security Assessments",
              text: "Identify vulnerabilities and security gaps before they become larger business risks.",
            },
            {
              icon: "/icons/ms-area-monitoring.svg",
              title: "Security Monitoring",
              text: "Maintain continuous visibility into security events and activity across your environment.",
            },
            {
              icon: "/icons/ms-area-response.svg",
              title: "Threat Response",
              text: "Investigate suspicious activity and coordinate response when security incidents occur.",
            },
            {
              icon: "/icons/ms-area-cloud.svg",
              title: "Cloud Protection",
              text: "Strengthen cloud configurations, workloads, identities, and access controls.",
            },
            {
              icon: "/icons/ms-area-endpoint.svg",
              title: "Endpoint & Identity Protection",
              text: "Secure the devices and identities employees use to access business systems.",
            },
            {
              icon: "/icons/ms-area-compliance.svg",
              title: "Compliance & Risk",
              text: "Build measurable security controls and address compliance requirements with a prioritized roadmap.",
            },
          ]}
        />

        <CtaStrip
          title="Not Sure Where Your Security Gaps Are?"
          text="Start with a security assessment. We'll help identify your most important risks, understand where your current controls stand, and build a prioritized path toward stronger protection."
          cta={{ label: "Get Your Security Assessment", href: ROUTES.contact }}
        />
      </main>
      <Footer />
    </>
  );
}
