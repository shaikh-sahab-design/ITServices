import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { CtaStrip } from "@/components/page/CtaStrip";
import { IconCards } from "@/components/page/IconCards";
import { PageHero } from "@/components/page/PageHero";
import { SplitFeature } from "@/components/page/SplitFeature";
import { PHONE, ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Managed IT Services | Folio3",
  description:
    "From helpdesk to cloud architecture - a fully managed technology stack that lets your business move faster, safer, and smarter.",
};

export default function ManagedItPage() {
  return (
    <>
      <Nav />
      <main className="inner-page">
        <PageHero
          image="/images/hero-managed-it.webp"
          fade={[23.9, 65.2]}
          copyWidth={592}
          title={["Comprehensive IT", "Zero Compromises"]}
          lede="From helpdesk to cloud architecture - a fully managed technology stack that lets your business move faster, safer, and smarter."
          actions={[
            { label: "Get a Free Consultation", href: ROUTES.contact, variant: "primary" },
            { label: PHONE.label, href: PHONE.href, variant: "ghost" },
          ]}
        />

        <SplitFeature
          tag={{ label: "Managed IT Support", accent: "yellow" }}
          title={<>Stop Fighting Fires<br />Start Preventing Them</>}
          lede="Most IT teams spend their days reacting to problems that could have been prevented. Our proactive monitoring resolves 87% of issues before users are impacted - silently, efficiently, around the clock."
          columns={[
            ["24/7/365 Proactive Help Desk", "Automated Patch & Update Management", "Vendor Management & Procurement"],
            ["Remote & On-site Technical Support", "Hardware Lifecycle & Asset Tracking", "Monthly Performance & Health Reports"],
          ]}
          cta={{ label: "Get Started with Managed IT Support", href: ROUTES.contact }}
          image={{ src: "/images/mit-support.webp", alt: "Technician working at a desk beside server racks" }}
          stat={{ icon: "/icons/mit-stat-support.svg", value: "87%", label: "Issues resolved proactively", accent: "yellow" }}
        />

        <SplitFeature
          tone="soft"
          imageSide="left"
          tag={{ label: "Cybersecurity", accent: "red" }}
          title={<>Enterprise Security Without<br />Enterprise Complexity</>}
          lede="A single breach can cost millions and erase years of trust. Our zero-trust architecture, 24/7 SOC monitoring, and compliance frameworks harden every layer of your environment - endpoints, network, cloud, and human."
          columns={[
            ["Zero-Trust Security Architecture", "Managed Firewall & VPN Services", "24/7 SOC Monitoring & Incident Response"],
            [
              "Advanced Endpoint Detection (EDR)",
              "Security Awareness & Phishing Training",
              "Regulatory Compliance (HIPAA · SOC 2 · GDPR)",
            ],
          ]}
          cta={{ label: "Get Started with Cybersecurity", href: ROUTES.managedSecurity }}
          image={{ src: "/images/mit-cybersecurity.webp", alt: "Compliance audit log on a holographic screen" }}
          stat={{ icon: "/icons/mit-stat-security.svg", value: "00", label: "Client breaches in 2025", accent: "red" }}
        />

        <SplitFeature
          tag={{ label: "Cloud Services", accent: "blue" }}
          title={<>Cloud Infrastructure That<br />Grows With You</>}
          lede="Cloud migrations fail when they're treated as lift-and-shift exercises. We architect for your specific workloads, optimise costs from day one, and manage the ongoing complexity so you get agility without the chaos."
          columns={[
            ["Strategic Cloud Migration Planning", "Multi-Cloud Cost Optimisation", "Business Continuity & Disaster Recovery"],
            ["Azure, AWS & GCP Management", "Enterprise SaaS Administration", "Cloud Security & Governance"],
          ]}
          cta={{ label: "Get Started with Cloud Services", href: ROUTES.migration }}
          image={{ src: "/images/mit-cloud.webp", alt: "Glowing cloud above a circuit board" }}
          stat={{ icon: "/icons/mit-stat-cloud.svg", value: "35%", label: "avg cloud cost reduction", accent: "blue" }}
        />

        <SplitFeature
          tone="soft"
          imageSide="left"
          tag={{ label: "IT Strategy & vCTO", accent: "green" }}
          title={<>Technology Aligned With<br />Your Business Goals</>}
          lede="Technology without strategy is just expensive infrastructure. Our vCTO and vCISO advisory services help you build an IT roadmap that directly supports your business objectives with a clear ROI at every step."
          columns={[
            ["vCISO & vCTO Advisory Services", "Scalable Infrastructure Design", "Board-Level Technology Reporting"],
            ["IT Budgeting & Total Cost of Ownership", "Digital Transformation Roadmap", "Vendor Selection & Contract Negotiation"],
          ]}
          cta={{ label: "Get Started with IT Strategy & vCTO", href: ROUTES.vcio }}
          image={{ src: "/images/mit-strategy.webp", alt: "Business owner working on a laptop in a warehouse" }}
          stat={{ icon: "/icons/mit-stat-strategy.svg", value: "3x", label: "avg ROI on IT investments", accent: "green" }}
        />

        <SplitFeature
          tag={{ label: "Network Design & SD-WAN", accent: "purple" }}
          title={<>Networks Built for<br />Performance and Resilience</>}
          lede="A slow or unreliable network is a hidden tax on your entire business. We design, deploy, and manage enterprise-grade wired, wireless, and software-defined networks that deliver consistent performance across every site, every user, every device."
          columns={[
            [
              "Enterprise LAN/WAN Architecture & Design",
              "Wireless Network Planning & Optimisation",
              "Firewall, Routing & Switching Management",
            ],
            [
              "SD-WAN Deployment & Management",
              "Network Monitoring & Performance Analytics",
              "Multi-Site & Branch Office Connectivity",
            ],
          ]}
          cta={{ label: "Get Started with Network Design", href: ROUTES.networkDesign }}
          image={{ src: "/images/mit-network.webp", alt: "Network engineer between cabled server racks" }}
          stat={{ icon: "/icons/mit-stat-network.svg", value: "99.9%", label: "Network uptime SLA", accent: "purple" }}
        />

        <SplitFeature
          tone="soft"
          imageSide="left"
          tag={{ label: "Disaster Recovery", accent: "grey" }}
          title={<>Your Business Continuity<br />is Our Priority</>}
          lede="When systems fail - whether from ransomware, hardware failure, or a natural disaster - every minute offline costs real money. Our disaster recovery solutions ensure your data is protected, your recovery time is measured in minutes, and your business never misses a beat."
          columns={[
            [
              "Automated Daily Backup Validation",
              "On-site, Off-site & Cloud Backup Solutions",
              "Business Continuity Plan (BCP) Development",
            ],
            ["Defined RTO & RPO Commitments", "Ransomware Recovery Planning & Testing", "Regular DR Drills & Failover Testing"],
          ]}
          cta={{ label: "Get Started with Disaster Recovery", href: ROUTES.disasterRecovery }}
          image={{ src: "/images/mit-dr.webp", alt: "Glowing padlock above a server in a data center" }}
          stat={{ icon: "/icons/mit-stat-dr.svg", value: "<15min", label: "Avg recovery time objective", accent: "grey" }}
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

        <IconCards
          tone="outline"
          title="Sector-Specific IT Expertise Across Every Vertical"
          lede="We understand that a healthcare clinic and a manufacturing plant have fundamentally different IT requirements. Our teams are specialised, not generalised."
          cards={[
            {
              icon: "/icons/sector-healthcare.svg",
              title: "Healthcare",
              text: "HIPAA-compliant infrastructure management for hospitals, clinics, and health-tech platforms.",
            },
            {
              icon: "/icons/sector-manufacturing.svg",
              title: "Manufacturing",
              text: "OT/IT convergence, ERP protection, and 24/7 uptime for production-critical environments.",
            },
            {
              icon: "/icons/sector-technology.svg",
              title: "Technology",
              text: "Scalable migration management for fast-growing SaaS and software companies.",
            },
            {
              icon: "/icons/sector-professional.svg",
              title: "Professional Services",
              text: "Secure, compliant IT infrastructure for law firms, consultancies, and advisory groups.",
            },
          ]}
        />

        <CtaStrip
          tight
          title="Not Sure Where to Start?"
          text="Our free consultation identifies your biggest risks and opportunities with a prioritised action plan, delivered in 48 hours."
          cta={{ label: "Book Free Consultation", href: ROUTES.contact }}
        />
      </main>
      <Footer />
    </>
  );
}
