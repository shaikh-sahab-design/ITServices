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
  NumberCards,
  PanelRows,
} from "@/components/page/Detail";
import { PageHero } from "@/components/page/PageHero";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "IT Migration Services | Folio3 Managed IT Services",
  description:
    "Move servers, applications, databases, networks, storage and identity systems to modern platforms with Folio3 IT migration services, keeping risk and downtime low.",
};

const C = ROUTES.contact;

const FAQS = [
  {
    q: "How long does an IT migration take?",
    a: "It depends on the number of systems, data volume, dependencies, compatibility requirements and cutover approach.",
  },
  {
    q: "Can Folio3 migrate several systems together?",
    a: "Yes. One coordinated migration program can cover infrastructure, applications, data, email, identity, storage and network changes.",
  },
  {
    q: "Will migration cause downtime?",
    a: "Some migrations need a cutover window. Folio3 uses testing, staged migration, replication and rollback planning to keep disruption low.",
  },
  {
    q: "How is data protected during migration?",
    a: "Protection can include encryption, controlled access, backups, transfer validation and integrity checks after the move.",
  },
  {
    q: "Do IT network migration services include ISP and firewall changes?",
    a: "Yes. Network migrations can cover ISP changes, router and firewall replacement, IP readdressing, VLAN redesign and routing updates.",
  },
  {
    q: "Do you offer IT service management data migration services?",
    a: "Yes. Folio3 moves ITSM data such as tickets, assets, configuration items and knowledge articles between platforms, with mapping and integrity checks.",
  },
  {
    q: "Can legacy applications be migrated?",
    a: "Many legacy applications can be moved, replatformed or modernized. Whether yours can depends on compatibility, licensing, integrations and vendor support.",
  },
  {
    q: "Can Folio3 support Microsoft 365 tenant migrations?",
    a: "Yes. Tenant migrations can include mailboxes, users, domains, files, permissions, groups and supported services.",
  },
  {
    q: "Do you support Active Directory to Microsoft Entra ID migration?",
    a: "Yes. The scope can include users, devices, identity policies, application access, and hybrid or cloud-only identity setups.",
  },
  {
    q: "What happens if the migration fails?",
    a: "Every migration plan includes backups, validation checkpoints, escalation paths and documented rollback procedures.",
  },
  {
    q: "Do you provide support after migration?",
    a: "Yes. Post-migration support covers issue resolution, monitoring, documentation, optimization and handover to ongoing IT management.",
  },
];

export default function MigrationServicesPage() {
  return (
    <>
      <Nav />
      <main className="inner-page">
        <PageHero
          compact
          image="/images/hero-migration.webp"
          title={["IT Migration Services That", "Protect Your Data at Every Step"]}
        />

        <DefineSplit
          title="What are IT migration services?"
          paragraphs={[
            "IT migration services move systems, data, users, applications or infrastructure from one environment to another.",
            "Copying data is the smallest part of the job. A successful migration also needs discovery, dependency mapping, testing, cutover planning, validation and a rollback plan.",
          ]}
          cta={{ label: "Plan Your Migration", href: C }}
          box={{
            title: "A migration may involve:",
            items: [
              "Domain Migration",
              "Email Migration",
              "On-Premises Migration",
              "P2V Migration",
              "V2V Migration",
              "Tenant Migration",
              "Data Migration",
              "Application Migration",
            ],
          }}
        />

        <div className="gut-72">
          <NumberCards
            layout="rail"
            title="How IT migration services reduce business disruption"
            cards={[
              {
                title: "Maps dependencies before migration",
                text: "Applications, users, infrastructure, data and integrations are mapped before any system moves.",
              },
              {
                title: "Uses controlled rollouts",
                text: "Pilot tests, staged cutovers, validation checks and rollback plans lower the risk at every step.",
              },
              {
                title: "Protects data and access",
                text: "Identity, permissions, backups, security controls and data integrity are built into the plan from day one.",
              },
              {
                title: "Validates the new environment",
                text: "Testing after the move confirms that systems, applications, users and workloads work as expected.",
              },
              {
                title: "Supports multiple migration scenarios",
                text: "Covers on-premises, tenant-to-tenant, server, database, email and workload migrations.",
              },
              {
                title: "Provides post-migration support",
                text: "Ongoing monitoring and support keep the new environment stable after go-live.",
              },
            ]}
          />
        </div>

        <DetailPair
          title="Folio3 IT migration services"
          cards={[
            {
              icon: "/icons/mig-server.svg",
              label: "Server Modernization",
              title: "Server And Operating System Migration",
              text: "Move workloads to new virtual servers, or upgrade operating systems that are no longer supported.",
              scope: "This can include:",
              bullets: [
                "Windows Server upgrades and migrations",
                "Linux distribution upgrades",
                "Virtual machine deployment and migration",
                "Server roles and services migration",
                "Application compatibility assessments",
                "Security configuration and hardening",
                "Backup and recovery validation",
                "Cutover and rollback planning",
              ],
              example: "Moving from Windows Server 2012 to Windows Server 2022.",
              outcome: { text: "Updated infrastructure that is supported, faster and more secure." },
              cta: { label: "Upgrade Your Servers", href: C },
            },
            {
              icon: "/icons/mig-data.svg",
              label: "Data Transfer",
              title: "Data Migration",
              text: "Transfer business data between storage platforms, systems, databases or file formats. This includes IT service management data migration services that move tickets, assets, knowledge articles and configuration records between ITSM platforms.",
              scope: "The service can include:",
              bullets: [
                "Data discovery and assessment",
                "Data classification and mapping",
                "File server and storage migrations",
                "Database and application data migration",
                "Secure data transfer",
                "Data deduplication and cleanup",
                "Data integrity and consistency checks",
                "Access permissions and post-migration validation",
              ],
              outcome: { text: "Data moved accurately, with permissions, structure and integrity intact." },
              cta: { label: "Move Your Data", href: C },
            },
          ]}
        />

        <ImageFeature
          title="Database migration"
          statements={["Move databases between platforms, hosting environments or software versions."]}
          scope="Folio3 can support:"
          bullets={[
            "Database inventory",
            "Schema conversion",
            "Data-type mapping",
            "Dependency analysis",
            "Stored procedure review",
            "Performance testing",
            "Replication planning",
            "Cutover validation",
          ]}
          example="Moving from MySQL to PostgreSQL, or upgrading your current database platform."
          outcome="A tested database environment with lower risk of compatibility problems and data loss."
          cta={{ label: "Plan Database Migration", href: C }}
          image={{
            src: "/images/mig-database.webp",
            alt: "Streams of light carrying data from a server row to four cloud databases",
          }}
        />

        <div className="gut-80">
          <DetailPair
            tight
            header="inline"
            tones={["dark", "soft"]}
            cards={[
              {
                icon: "/icons/mig-app.svg",
                label: "App Modernization",
                title: "Application Migration",
                text: "Move business applications to new infrastructure or modern platforms.",
                scope: "Migration approaches can include:",
                bullets: [
                  "Lift and shift",
                  "Re-platforming",
                  "Application refactoring",
                  "Legacy platform replacement",
                  "Dependency fixes",
                  "Configuration migration",
                  "Integration testing",
                  "Performance validation",
                ],
                note: "This includes moving applications from on-premises servers to Azure, AWS, Google Cloud or another hosted platform.",
                outcome: {
                  text: "Applications moved with every dependency, configuration and integration accounted for.",
                },
                cta: { label: "Migrate Your Applications", href: C },
              },
              {
                icon: "/icons/mig-email.svg",
                label: "Email & Collaboration",
                title: "Email Migration",
                text: "Move mailboxes, domains, calendars, contacts and email data between providers.",
                scope: "Folio3 can support:",
                bullets: [
                  "Exchange to Microsoft 365",
                  "Google Workspace to Microsoft 365",
                  "Microsoft 365 tenant-to-tenant migration",
                  "Domain transfer",
                  "Mailbox mapping",
                  "Shared mailbox migration",
                  "Calendar and contact migration",
                  "Mail-flow configuration",
                ],
                outcome: { text: "Email moved with minimal disruption to users and business communication." },
                cta: { label: "Plan Email Migration", href: C },
              },
            ]}
          />
        </div>

        <DetailPair
          cards={[
            {
              icon: "/icons/mig-network.svg",
              label: "Network Transformation",
              title: "IT Network Migration Services",
              text: "Change network infrastructure, IP addressing, internet providers or routing design without losing control of connectivity.",
              scope: "The service can cover:",
              bullets: [
                "IP address changes",
                "VLAN redesign",
                "ISP migration",
                "Router and firewall replacement",
                "DNS and DHCP changes",
                "Site connectivity",
                "Routing updates",
                "Network segmentation",
              ],
              outcome: {
                text: "Network changes completed with clear control over connectivity, security and downtime.",
              },
              cta: { label: "Review Your Network", href: C },
            },
            {
              icon: "/icons/mig-storage.svg",
              label: "Storage & File Services",
              title: "Storage Migration",
              text: "Move data between storage arrays, NAS platforms, file servers or hosted storage.",
              scope: "Folio3 can support:",
              bullets: [
                "Storage assessment",
                "Capacity planning",
                "File and permission mapping",
                "NAS migration",
                "SAN migration",
                "File server consolidation",
                "Data transfer scheduling",
                "Integrity validation",
              ],
              outcome: { text: "Storage moved with data structure, access and availability intact." },
              cta: { label: "Assess Storage Migration", href: C },
            },
          ]}
        />

        <PanelRows
          rows={[
            {
              panel: {
                kind: "photo",
                image: {
                  src: "/images/mig-ad.webp",
                  alt: "Glowing server stack inside a circular sync arrow above a tablet",
                },
                icon: "/icons/mig-ad.svg",
                caption: "Active Directory And Domain Migration",
              },
              title: "Active Directory and domain migration",
              text: "Move users, groups, devices, policies, domains or forests between identity environments.",
              scope: "This can include:",
              bullets: [
                "Active Directory domain migration",
                "Forest consolidation",
                "User and group migration",
                "Password migration",
                "Device rejoining",
                "Group Policy review",
                "Microsoft Entra ID transition",
                "Hybrid identity planning",
              ],
              outcome: {
                text: "Identity and access moved with less disruption to users, devices and business applications.",
                tone: "yellow",
              },
              cta: { label: "Plan Domain Migration", href: C },
            },
            {
              panel: {
                kind: "blue",
                title: "Virtualization migration",
                text: "Move workloads between physical, virtual and hosted environments.",
              },
              scope: "Supported approaches can include:",
              bullets: [
                "Physical-to-virtual (P2V) migration",
                "Virtual-to-virtual (V2V) migration",
                "Virtual-to-hosted-platform migration",
                "Hypervisor migration",
                "Virtual machine conversion",
                "Resource resizing",
                "Network reconfiguration",
                "Storage remapping",
              ],
              outcome: {
                text: "Workloads running on a better-suited virtualization platform, with performance and connectivity tested.",
                tone: "blue",
              },
              cta: { label: "Migrate Virtual Workloads", href: C },
            },
            {
              panel: {
                kind: "photo",
                image: {
                  src: "/images/mig-workload.webp",
                  alt: "Files flowing into a large database cylinder in a server room",
                },
                icon: "/icons/mig-workload.svg",
                caption: "Workload And Tenant Migration",
              },
              title: "Workload and tenant migration",
              text: "Move complete environments between managed tenants or platforms.",
              scope: "These migrations are common during:",
              bullets: [
                "Mergers and acquisitions",
                "Business separation",
                "MSP transition",
                "Platform consolidation",
                "Tenant restructuring",
                "Regional expansion",
              ],
              note: "The scope can include users, devices, mailboxes, applications, permissions, policies, data and integrations.",
              outcome: {
                text: "A controlled move between environments, with ownership, access and service continuity maintained.",
                tone: "yellow",
              },
              cta: { label: "Review Tenant Migration", href: C },
            },
          ]}
        />

        <CompareTable
          title="Migration approaches"
          head={["Approach", "Best used for", "Main consideration"]}
          rows={[
            ["Upgrade", "Replacing an unsupported version", "Compatibility"],
            ["Lift and shift", "Moving quickly with few application changes", "Existing technical debt"],
            ["Replatform", "Improving the environment during migration", "Testing and configuration"],
            ["Refactor", "Modernizing application architecture", "Cost and project scope"],
            ["Consolidate", "Combining systems or tenants", "Data and access mapping"],
            ["Separate", "Divestments or business restructuring", "Ownership and dependency control"],
          ]}
          note="The right approach depends on your timeline, risk tolerance, technical dependencies and the condition of your current environment."
          cta={{ label: "Choose Your Migration Approach", href: C }}
        />

        <div className="gut-72">
          <NumberCards
            layout="grid"
            flushTop
            title="Why businesses choose Folio3"
            cards={[
              {
                text: "One team coordinates infrastructure, identity, networking, data, applications, storage and email",
              },
              { text: "Security, access, encryption, backup and validation requirements are part of every plan" },
              { text: "Migrations run on pilots, runbooks, rollback plans and validation checkpoints" },
              { text: "Current environments are assessed up front, with stabilization and support after go-live" },
            ]}
          />
        </div>

        <Journey
          flush
          title="The Folio3 IT migration process"
          steps={[
            {
              icon: "/icons/mig-assess.svg",
              title: "Assess",
              body: "Review the source environment, target platform, dependencies, security requirements and business constraints.",
            },
            {
              icon: "/icons/mig-design.svg",
              title: "Design",
              body: "Create the migration architecture, data flows, access model, timeline and cutover strategy.",
            },
            {
              icon: "/icons/mig-prepare.svg",
              title: "Prepare",
              body: "Configure target systems, back up data, fix compatibility issues and complete pre-migration testing.",
            },
            {
              icon: "/icons/mig-migrate.svg",
              title: "Migrate",
              body: "Move systems, users, applications or data according to the approved runbook.",
            },
            {
              icon: "/icons/mig-validate.svg",
              title: "Validate",
              body: "Confirm data integrity, performance, user access, integrations, monitoring and security controls.",
            },
            {
              icon: "/icons/mig-stabilize.svg",
              title: "Stabilize",
              body: "Fix post-migration issues, update documentation and hand the environment over to ongoing support.",
            },
          ]}
          cta={{
            title: "Ready to move? Migrate with control.",
            text: "Modernize systems, consolidate environments and move critical workloads with a structured plan from Folio3 IT migration services.",
            label: "Book a Consultation",
            href: C,
          }}
        />

        <div className="faq-section">
          <Faq items={FAQS} cta={{ label: "Talk to a Migration Expert", href: C }} />
        </div>
      </main>
      <Footer />
    </>
  );
}
