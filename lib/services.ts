import { ROUTES } from "./routes";

const R = ROUTES;

export type ServiceLink = { label: string; href: string };
export type ServiceGroup = { title: string; href: string; tagline: string; links: ServiceLink[] };

// The three main service pages and the sub-services under each, shared by the mega menu and the footer.
// A sub-service without its own page yet links to its main page; point it at its route once that page is built.
export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    title: "Managed IT",
    href: R.managedIt,
    tagline: "Managed IT services that keep every system running",
    links: [
      { label: "Managed IT Support", href: R.managedIt },
      { label: "Network & Infrastructure", href: R.networkDesign },
      { label: "Migration Services", href: R.migration },
      { label: "Backup & Disaster Recovery", href: R.managedIt },
      { label: "IT Strategy & vCIO", href: R.vcio },
      { label: "Database Management", href: R.managedIt },
      { label: "Identity & Access Management", href: R.managedIt },
    ],
  },
  {
    title: "Managed Security",
    href: R.managedSecurity,
    tagline: "Managed security services that catch threats before they spread",
    links: [
      { label: "Vulnerability Assessment & Penetration Testing", href: R.managedSecurity },
      { label: "Security Operations Center (SOC)", href: R.soc },
      { label: "Threat Detection & Incident Response", href: R.managedSecurity },
      { label: "Cloud Security", href: R.managedSecurity },
      { label: "Endpoint & Identity Security", href: R.managedSecurity },
      { label: "Security Compliance & Risk", href: R.managedSecurity },
    ],
  },
  {
    title: "AI Security",
    href: R.aiSecurity,
    tagline: "AI security services for the tools your teams already use",
    links: [
      { label: "AI Security Assessment", href: R.aiAssessment },
      { label: "AI Governance & Risk", href: R.aiSecurity },
      { label: "AI Data Security", href: R.aiSecurity },
      { label: "AI Application & LLM Security", href: R.aiSecurity },
      { label: "AI Agent Security", href: R.aiSecurity },
      { label: "AI Red Teaming", href: R.aiSecurity },
    ],
  },
];

/** Every URL that belongs to the services area, for the nav's active state. */
export const SERVICE_PATHS: string[] = [
  R.services,
  ...new Set(SERVICE_GROUPS.flatMap((g) => [g.href, ...g.links.map((l) => l.href)])),
];
