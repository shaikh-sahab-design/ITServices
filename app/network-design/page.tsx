import type { Metadata } from "next";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Journey } from "@/components/Journey";
import { Nav } from "@/components/Nav";
import {
  CompareTable,
  DefineSplit,
  DetailPair,
  ImageFeature,
  Infographic,
  NumberCards,
  PanelRows,
} from "@/components/page/Detail";
import { PageHero } from "@/components/page/PageHero";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Network Design and SD-WAN Services | Folio3 Managed IT Services",
  description:
    "Network design defines how devices, offices, users, internet connections, data centers, and applications communicate securely.",
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

export default function NetworkDesignPage() {
  return (
    <>
      <Nav />
      <main className="inner-page">
        <PageHero compact image="/images/hero-network.webp" title={["Network Issues?", "Build Better Connectivity."]} />

        <DefineSplit
          title="What Are SD-WAN And Network Design Services?"
          paragraphs={[
            "Network design defines how devices, offices, users, internet connections, data centers, and applications communicate securely.",
            "SD-WAN, or software-defined wide area networking, adds centralized control across multiple connections such as broadband, fiber, MPLS, and cellular links.",
          ]}
          cta={{ label: "Improve Branch Connectivity", href: C }}
          box={{
            title: "Together, network design and SD-WAN can help businesses:",
            items: [
              "Improve application performance",
              "Increase network availability",
              "Route traffic based on business priorities",
              "Apply policies across multiple locations",
              "Simplify branch management",
              "Reduce dependence on a single carrier",
              "Improve visibility into network traffic",
            ],
          }}
        />

        <div className="gut-72">
          <NumberCards
            layout="rail"
            title="How SD-WAN Improves Network Performance"
            cards={[
              {
                title: "Prioritizes Critical Applications",
                text: "Voice, video, ERP, and collaboration traffic can receive priority over less important traffic.",
              },
              {
                title: "Uses the Best Connection",
                text: "Traffic can move between links based on latency, packet loss, availability, and policy.",
              },
              {
                title: "Reduces Network Disruption",
                text: "Automated failover helps maintain connectivity when a connection becomes unavailable.",
              },
              {
                title: "Improves Branch Visibility",
                text: "IT teams can review connection status, traffic, and performance from a central platform.",
              },
              {
                title: "Simplifies Policy Management",
                text: "Network and security policies can be applied consistently across several locations",
              },
              {
                title: "Supports Business Growth",
                text: "Standardized designs make it easier to connect new offices, users, and applications.",
              },
            ]}
          />
        </div>

        <DetailPair
          title="Network Design and SD-WAN Services"
          cards={[
            {
              icon: "/icons/nd-architecture.svg",
              label: "Architecture",
              title: "Network Consultation And Architecture",
              text: "Folio3 reviews the current network, traffic patterns, business applications, branch requirements, and security controls.",
              scope: "The consultation may cover:",
              bullets: [
                "Network topology",
                "Internet and WAN connections",
                "Routers, switches, and firewalls",
                "Bandwidth utilization",
                "Application traffic",
                "Redundancy and failover",
                "Segmentation",
                "Remote access",
                "Branch connectivity",
              ],
              outcome: {
                text: "A clear network design based on performance, security, resilience, and business needs.",
                size: "sm",
              },
              cta: { label: "Get Expert Guidance", href: C },
            },
            {
              icon: "/icons/nd-implementation.svg",
              label: "Implementation",
              title: "SD-WAN Design And Implementation",
              text: "Folio3 designs and implements SD-WAN environments across offices, branches, cloud-hosted applications, and remote sites.",
              scope: "The service can include:",
              bullets: [
                "SD-WAN architecture",
                "Device and platform selection",
                "Connection planning",
                "Traffic policy design",
                "Application-aware routing",
                "Quality of service",
                "Secure tunneling",
                "Pilot deployment",
                "Branch rollout",
                "Migration from legacy WAN",
              ],
              outcome: { text: "Centralized WAN control with more flexible and resilient connectivity.", size: "lg" },
              cta: { label: "Start SD-WAN Review", href: C },
            },
          ]}
        />

        <ImageFeature
          title="Application-Aware Routing"
          statements={[
            "SD-WAN can identify application traffic and route it through the most suitable available connection.",
            "Business-critical traffic such as voice, video, ERP, and collaboration tools can receive higher priority than non-critical traffic.",
          ]}
          outcome="Better application performance and fewer disruptions during congestion or link failure."
          cta={{ label: "Optimize Application Performance", href: C }}
          image={{ src: "/images/nd-routing.webp", alt: "Light trails looping around a lit office tower" }}
        />

        <div className="gut-80">
          <DetailPair
            tight
            header="inline"
            tones={["dark", "soft"]}
            cards={[
              {
                icon: "/icons/nd-segmentation.svg",
                label: "Control network access",
                title: "Secure Network Segmentation",
                text: "Flat networks make it easier for threats to move between users, systems, and devices.\nFolio3 can design segmented network zones for:",
                scope: "Segmented zones for:",
                bullets: [
                  "Employees",
                  "Servers",
                  "Guest users",
                  "Voice systems",
                  "Voice systems",
                  "Business apps",
                  "Sensitive departments",
                  "Administrative systems",
                ],
                outcome: { text: "Better traffic control and reduced exposure between network areas." },
                cta: { label: "Build Network Resilience", href: C },
              },
              {
                icon: "/icons/nd-resilience.svg",
                label: "Keep connections available",
                title: "Network Resilience & Failover",
                text: "A single internet connection can create a single point of failure. Folio3 can design connectivity using multiple links and automated failover.",
                scope: "This may include:",
                bullets: [
                  "Dual internet circuits",
                  "Broadband and fiber combos",
                  "Cellular backup",
                  "Link-health monitoring",
                  "Automated failover",
                  "Load balancing",
                ],
                outcome: { text: "Reduced downtime when a carrier or connection fails." },
                cta: { label: "Reduce Network Downtime", href: C },
              },
            ]}
          />
        </div>

        <PanelRows
          rows={[
            {
              panel: {
                kind: "photo",
                image: { src: "/images/nd-branch.webp", alt: "Network rack with neatly bundled patch cables" },
                icon: "/icons/nd-branch.svg",
                caption: "Branch Network Deployment",
              },
              title: "Branch Network Deployment",
              text: "Opening or upgrading branch locations often requires separate configuration, testing, and troubleshooting.",
              scope: "Standardized network designs and SD-WAN templates can simplify:",
              bullets: [
                "Branch router deployment",
                "Firewall configuration",
                "Wireless connectivity",
                "WAN policy application",
                "Secure access",
                "Failover testing",
              ],
              outcome: { text: "Faster branch deployment with consistent network policies.", tone: "yellow" },
              cta: { label: "Upgrade Your Network", href: C },
            },
            {
              panel: {
                kind: "blue",
                title: "Network Monitoring and Optimization",
                text: "Folio3 can monitor network availability, connection health, latency, packet loss, bandwidth, and device status.",
              },
              title: "Monitoring can help identify",
              scope: "Monitoring can help identify:",
              bullets: [
                "Failing connections",
                "Poor application performance",
                "Unusual traffic patterns",
                "Congested links",
                "Device faults",
                "Capacity issues",
              ],
              outcome: { text: "Faster issue detection and better network performance over time.", tone: "blue" },
              cta: { label: "Optimize Network Performance", href: C },
            },
          ]}
        />

        <Infographic
          src="/images/nd-sdwan.webp"
          video="/videos/nd-sdwan"
          alt="How SD-WAN optimizes network connectivity, security, and performance: segmentation and security policies, a centralized control hub, automatic failover, bandwidth optimization, application-aware routing, and real-time monitoring."
          width={1312}
          height={718}
        />

        <CompareTable
          title="Traditional WAN vs. SD-WAN"
          head={["Area", "Traditional WAN", "SD-WAN"]}
          rows={[
            ["Management", "Configured device by device", "Centrally managed"],
            ["Connectivity", "Often depends on one carrier", "Uses multiple connection types"],
            ["Traffic routing", "Static routing", "Application-aware routing"],
            ["Failover", "Manual or limited", "Automated based on link health"],
            ["Branch deployment", "Separate configuration", "Standardized templates"],
            ["Visibility", "Limited traffic insight", "Centralized monitoring"],
            ["Scalability", "Slower to expand", "Easier branch rollout"],
            ["Cost control", "Often reliant on private circuits", "Supports mixed connectivity"],
          ]}
        />

        <div className="gut-72">
          <NumberCards
            layout="grid"
            flushTop
            title="Why Businesses Choose Folio3"
            cta={{ label: "Talk to Folio3 Experts", href: C }}
            cards={[
              { text: "Integrated network design aligned with security and access controls." },
              { text: "Experience supporting multi-site and distributed business environments." },
              { text: "Controlled rollouts with pilot testing, validation, and rollback plans." },
              { text: "Ongoing monitoring and management of network performance." },
            ]}
          />
        </div>

        <Journey
          flush
          title="Our Process"
          cta={{
            title: "Network Problems Limiting Growth? Fix the Foundation.",
            text: "Build a faster, more resilient, and easier-to-manage network with Folio3 network design and SD-WAN services.",
            label: "Get a Network consultation",
            href: C,
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
