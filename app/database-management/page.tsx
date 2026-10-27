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
  title: "Database Management Services | Folio3 Managed IT Services",
  description:
    "Database management system services cover the monitoring, maintenance, security, optimization, backup and recovery of your business databases.",
};

const C = ROUTES.contact;

const FAQS = [
  {
    q: "Which database platforms can Folio3 support?",
    a: "Support depends on the database technology, version, hosting environment and scope you need. These are confirmed during the initial assessment.",
  },
  {
    q: "Can Folio3 fix slow database performance?",
    a: "Yes. The assessment can cover queries, indexes, execution plans, blocking, configuration, infrastructure resources and application behavior.",
  },
  {
    q: "Are database backups monitored?",
    a: "Yes. Backup monitoring and failure escalation can be included, along with restore testing and recovery planning.",
  },
  {
    q: "Can Folio3 migrate a database?",
    a: "Yes. Database migration can include version upgrades, platform changes, server moves or moves to hosted environments.",
  },
  {
    q: "Does database management include security?",
    a: "Yes. Reviews can cover access, privileges, authentication, encryption, logging, network exposure and patch status.",
  },
  {
    q: "Can Folio3 support database replication and failover?",
    a: "Yes, where the database platform and chosen architecture support it.",
  },
  {
    q: "Can we start with database management consulting services only?",
    a: "Yes. Folio3 can assess your current environment and deliver a prioritized improvement plan before ongoing management begins.",
  },
  {
    q: "How long does a database assessment take?",
    a: "It depends on the number of databases, platforms, dependencies and the assessment scope.",
  },
];

export default function DatabaseManagementPage() {
  return (
    <>
      <Nav />
      <main className="inner-page">
        <PageHero
          compact
          image="/images/hero-migration.webp"
          title={["Stop Downtime With", "Database Management Services"]}
        />

        <DefineSplit
          title="What are Database Management Services?"
          paragraphs={[
            "Database management system services cover the monitoring, maintenance, security, optimization, backup and recovery of your business databases.",
            "Scope depends on your database platform, workload, hosting environment and recovery requirements.",
          ]}
          cta={{ label: "See What's Covered", href: C }}
          box={{
            title: "The service can include:",
            items: [
              "Database health monitoring",
              "Query and performance optimization",
              "Backup validation",
              "Restore testing",
              "Access reviews",
              "Capacity management",
              "Replication monitoring",
              "Database migration",
            ],
          }}
        />

        <div className="gut-72">
          <NumberCards
            layout="rail"
            title="Faster, more reliable databases without constant firefighting"
            cards={[
              {
                title: "Links database and application performance",
                text: "Database health is reviewed alongside your applications, servers, storage, networks and integrations.",
              },
              {
                title: "Monitors database health proactively",
                text: "Errors, capacity, backups, replication and performance are tracked before issues grow.",
              },
              {
                title: "Strengthens database security controls",
                text: "Access, encryption, patching, exposure and logging are reviewed as part of ongoing management.",
              },
              {
                title: "Improves recovery readiness",
                text: "Backup monitoring is paired with restore planning and recovery validation.",
              },
              {
                title: "Keeps performance steady as workloads grow",
                text: "Performance and capacity are reviewed as data volumes and workloads increase.",
              },
              {
                title: "Supports day-to-day database operations",
                text: "Proactive management keeps databases reliable, secure and fast over time.",
              },
            ]}
          />
        </div>

        <DetailPair
          title="Complete database coverage"
          cards={[
            {
              icon: "/icons/db-monitor.svg",
              label: "Health Monitoring",
              title: "Database Monitoring",
              text: "Folio3 monitors the conditions that affect database availability and application performance.",
              scope: "Monitoring can cover:",
              bullets: [
                "Availability",
                "Connection failures",
                "Long-running queries",
                "Locking and blocking",
                "CPU and memory usage",
                "Storage thresholds",
                "Replication health",
                "Backup status",
              ],
              outcome: { text: "Database problems caught before users report them." },
              cta: { label: "Monitor Database Health", href: C },
            },
            {
              icon: "/icons/db-performance.svg",
              label: "Query Tuning",
              title: "Performance Optimization",
              text: "Slow performance can come from inefficient queries, poor indexing, resource limits or application behavior.",
              scope: "Folio3 reviews:",
              bullets: [
                "Slow queries",
                "Execution plans",
                "Index usage",
                "Locking and blocking",
                "Memory configuration",
                "Connection handling",
                "Table growth",
                "Maintenance routines",
              ],
              outcome: { text: "Faster queries and more efficient use of database resources." },
              cta: { label: "Speed Up Queries", href: C },
            },
          ]}
        />

        <ImageFeature
          title="Backup and Recovery"
          statements={["A completed backup job doesn't guarantee the database can be restored."]}
          scope="Folio3 can manage:"
          bullets={[
            "Backup scheduling",
            "Job monitoring",
            "Failure escalation",
            "Retention policies",
            "Encrypted copies",
            "Off-site protection",
            "Point-in-time recovery",
            "Restore testing",
          ]}
          outcome="Proven confidence that critical data can be recovered."
          cta={{ label: "Test Database Restores", href: C }}
          image={{
            src: "/images/db-backup.webp",
            alt: "Database cylinder on a glowing platform beneath a network cloud in a server hall",
          }}
        />

        <div className="gut-80">
          <DetailPair
            tight
            header="inline"
            tones={["dark", "soft"]}
            cards={[
              {
                icon: "/icons/db-security.svg",
                label: "Access Control",
                title: "Database Security",
                text: "Database security comes down to controlling who can access data and what they can do with it.",
                scope: "Security reviews can cover:",
                bullets: [
                  "User accounts",
                  "Administrator privileges",
                  "Service accounts",
                  "Authentication settings",
                  "Encryption",
                  "Network access",
                  "Audit logging",
                  "Unused accounts",
                ],
                outcome: { text: "Lower risk of unauthorized access and data exposure." },
                cta: { label: "Lock Down Access", href: C },
              },
              {
                icon: "/icons/db-maintenance.svg",
                label: "Routine Upkeep",
                title: "Database Maintenance",
                text: "Regular maintenance prevents avoidable performance and stability problems.",
                scope: "Folio3 can support:",
                bullets: [
                  "Patch planning",
                  "Version reviews",
                  "Index maintenance",
                  "Statistics updates",
                  "Integrity checks",
                  "Log management",
                  "Storage cleanup",
                  "Upgrade planning",
                ],
                outcome: { text: "A more stable database environment that stays supported." },
                cta: { label: "Schedule Database Maintenance", href: C },
              },
            ]}
          />
        </div>

        <PanelRows
          rows={[
            {
              panel: {
                kind: "photo",
                image: {
                  src: "/images/db-ha.webp",
                  alt: "Server stack wired to a glowing cloud beside rows of server racks",
                },
                icon: "/icons/db-ha.svg",
                caption: "High Availability And Replication",
              },
              title: "High availability and replication",
              text: "Critical databases often need more protection than standard backups provide.",
              scope: "Folio3 can review or support:",
              bullets: [
                "Database replication",
                "Read replicas",
                "Availability groups",
                "Failover",
                "Clustering",
                "Replication monitoring",
                "Recovery priorities",
                "Failover testing",
              ],
              outcome: { text: "Less dependence on a single database instance.", tone: "yellow" },
              cta: { label: "Add Failover", href: C },
            },
            {
              panel: {
                kind: "blue",
                title: "Capacity management",
                text: "Uncontrolled database growth slows performance and drives up backup times, storage costs and recovery times.",
              },
              scope: "Capacity planning can include:",
              bullets: [
                "Storage growth analysis",
                "Table-size review",
                "Transaction-log growth",
                "Retention requirements",
                "Archiving options",
                "Resource thresholds",
              ],
              outcome: {
                text: "Room planned for future demand, with fewer surprise capacity issues.",
                tone: "blue",
              },
              cta: { label: "Forecast Database Growth", href: C },
            },
            {
              panel: {
                kind: "photo",
                image: {
                  src: "/images/db-migration.webp",
                  alt: "Streams of light carrying data from a server row to four cloud databases",
                },
                icon: "/icons/db-migration.svg",
                caption: "Database Migration",
              },
              title: "Database migration",
              text: "Folio3 moves databases between versions, platforms, servers or hosted environments.",
              scope: "Migration planning can include:",
              bullets: [
                "Source assessment",
                "Schema mapping",
                "Data-type compatibility",
                "Dependency review",
                "Migration tooling",
                "Data synchronization",
                "Performance testing",
                "Cutover planning",
              ],
              outcome: {
                text: "A controlled database move, with data integrity and application dependencies protected.",
                tone: "yellow",
              },
              cta: { label: "Plan Database Migration", href: C },
            },
          ]}
        />

        <CompareTable
          title="Reactive support vs. managed database services"
          head={["Area", "Reactive support", "Managed database services"]}
          rows={[
            ["Monitoring", "Starts after something breaks", "Ongoing health visibility"],
            ["Performance", "Tuned after complaints", "Reviewed proactively"],
            ["Backups", "Checked after a failure", "Monitored and validated"],
            ["Capacity", "Addressed when storage fills", "Tracked against thresholds"],
            ["Security", "Reviewed occasionally", "Access and exposure monitored"],
            ["Maintenance", "Done inconsistently", "Scheduled and documented"],
            ["Recovery", "Assumed to work", "Tested and validated"],
          ]}
          note="Reactive support fixes database problems after they hit users. Managed database services catch and reduce those problems earlier."
          cta={{ label: "Stop Waiting for Failures", href: C }}
        />

        <div className="gut-72">
          <NumberCards
            layout="grid"
            flushTop
            title="Why businesses choose Folio3"
            cta={{ label: "Talk to a DBA", href: C }}
            cards={[
              { text: "Database performance reviewed alongside applications, infrastructure and integrations" },
              { text: "Health, backups, replication, errors and capacity monitored proactively" },
              { text: "Security strengthened through access control, encryption, patching and logging" },
              { text: "Recovery readiness maintained through restore planning, validation and tuning" },
            ]}
          />
        </div>

        <Journey
          flush
          title="How Folio3 stabilizes your databases"
          steps={[
            {
              icon: "/icons/db-assess.svg",
              title: "Assess",
              body: "Review database platforms, versions, workloads, infrastructure, backups, access and dependencies.",
            },
            {
              icon: "/icons/db-baseline.svg",
              title: "Baseline",
              body: "Document current performance, capacity, availability and recurring issues.",
            },
            {
              icon: "/icons/db-prioritize.svg",
              title: "Prioritize",
              body: "Rank the most urgent security, recovery, performance and capacity risks.",
            },
            {
              icon: "/icons/db-stabilize.svg",
              title: "Stabilize",
              body: "Fix critical configuration, access, backup and reliability issues.",
            },
            {
              icon: "/icons/db-monitorstep.svg",
              title: "Monitor",
              body: "Track health, queries, storage, replication, backups and errors.",
            },
            {
              icon: "/icons/db-optimize.svg",
              title: "Optimize",
              body: "Improve performance, resilience, recovery readiness and resource usage.",
            },
          ]}
          cta={{
            title: "Fix database issues before users notice",
            text: "Improve database performance, security, recovery and availability with Folio3 database management services.",
            label: "Book a Database Review",
            href: C,
          }}
        />

        <div className="faq-section">
          <Faq items={FAQS} cta={{ label: "Ask a Database Expert", href: C }} />
        </div>
      </main>
      <Footer />
    </>
  );
}
