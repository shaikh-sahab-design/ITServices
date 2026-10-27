import type { Metadata } from "next";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Journey } from "@/components/Journey";
import { Nav } from "@/components/Nav";
import { CompareTable, DefineSplit, DetailPair, ImageFeature, NumberCards } from "@/components/page/Detail";
import { PageHero } from "@/components/page/PageHero";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Backup and Disaster Recovery Services | Folio3 Managed IT Services",
  description:
    "Backup and disaster recovery services restore data, systems, applications and infrastructure after a disruption.",
};

const C = ROUTES.contact;

const FAQS = [
  {
    q: "What is included in backup disaster and recovery services?",
    a: "Services can include daily backup validation, RTO and RPO planning, multi-location backup design, ransomware recovery testing and business continuity planning.",
  },
  {
    q: "What is the difference between RTO and RPO?",
    a: "RTO is how quickly a system must be back online. RPO is how much recent data the business can afford to lose.",
  },
  {
    q: "How often should backups be validated?",
    a: "Critical backup jobs should be checked regularly. Folio3 runs automated daily validation to catch failures and missing recovery points.",
  },
  {
    q: "Does a successful backup guarantee recovery?",
    a: "No. Backups need testing to confirm that data, applications, permissions and dependencies restore correctly.",
  },
  {
    q: "Can Folio3 help with ransomware recovery?",
    a: "Yes. Planning can cover backup isolation, immutable copies, containment, clean recovery environments, restore order and testing.",
  },
  {
    q: "Do we need both on-site and off-site backups?",
    a: "Yes, ideally. Keeping backups in more than one location means a single incident can't take out every recovery copy.",
  },
  {
    q: "How often should disaster recovery plans be tested?",
    a: "It depends on how critical each system is and how much risk the business carries. Plans should also be retested after major infrastructure or application changes.",
  },
  {
    q: "What is a business continuity plan?",
    a: "It explains how essential operations continue while technology, facilities or normal processes are disrupted.",
  },
  {
    q: "Can recovery targets differ by application?",
    a: "Yes. Critical applications usually need shorter RTO and RPO targets than lower-priority systems.",
  },
  {
    q: "How quickly can Folio3 recover our systems?",
    a: "Recovery speed depends on system size, dependencies, backup design and the RTO agreed for each service. Those targets are set and tested with you before an incident happens.",
  },
];

export default function DisasterRecoveryPage() {
  return (
    <>
      <Nav />
      <main className="inner-page">
        <PageHero
          compact
          image="/images/hero-migration.webp"
          title={["Stop Downtime With", "Backup & Disaster Recovery"]}
        />

        <DefineSplit
          title="What are backup and disaster recovery services?"
          paragraphs={[
            "Backup and disaster recovery services restore data, systems, applications and infrastructure after a disruption.",
            "Having backups is only part of it. The real goal is proof that critical services can be restored within agreed recovery targets.",
          ]}
          cta={{ label: "Map Recovery Priorities", href: C }}
          box={{
            title: "A complete recovery plan should define:",
            items: [
              "Which systems are business-critical",
              "How much downtime is acceptable",
              "How much data loss you can tolerate",
              "Where backups are stored",
              "How recovery will be validated",
              "Who is responsible during an incident",
            ],
          }}
        />

        <div className="gut-72">
          <NumberCards
            layout="rail"
            title="How tested backups keep business running"
            cards={[
              {
                title: "Prioritizes critical business services",
                text: "Recovery plans focus on the systems, workloads and data your operations depend on.",
              },
              {
                title: "Validates backup readiness",
                text: "Backup jobs and recoverability are checked regularly, so problems surface early.",
              },
              {
                title: "Sets recovery expectations",
                text: "RTO and RPO targets make downtime and data-loss limits clear before an incident.",
              },
              {
                title: "Plans for ransomware scenarios",
                text: "Recovery strategies cover isolated backups, compromised credentials, clean restores and validation.",
              },
              {
                title: "Tests recovery procedures",
                text: "Regular recovery exercises prove whether documented plans work when systems fail.",
              },
              {
                title: "Improves recovery over time",
                text: "Plans are updated as infrastructure, applications, workloads and business needs change.",
              },
            ]}
          />
        </div>

        <DetailPair
          title="Folio3's Disaster recovery services"
          cards={[
            {
              icon: "/icons/dr-monitor.svg",
              label: "Backup Monitoring",
              title: "Automated Daily Backup Validation",
              text: "A backup job marked \"complete\" isn't always a backup you can restore. Folio3 managed backup and disaster recovery services check backup activity every day to catch:",
              bullets: [
                "Failed or incomplete jobs",
                "Missing recovery points",
                "Backup agent issues",
                "Storage capacity problems",
                "Retention policy gaps",
                "Systems left out of protection",
              ],
              note: "Alerts are reviewed, and unresolved failures are escalated for action.",
              outcome: { text: "Backup problems found and fixed long before you need to recover." },
              cta: { label: "Check Backup Health", href: C },
            },
            {
              icon: "/icons/dr-targets.svg",
              label: "Recovery Targets",
              title: "Defined RTO And RPO Commitments",
              text: "Recovery planning starts with clear targets.\nRecovery Time Objective (RTO) is how quickly a service must be restored.\nRecovery Point Objective (RPO) is how much recent data the business can afford to lose.",
              scope: "Folio3 helps set RTO and RPO commitments based on:",
              bullets: [
                "Business impact",
                "System criticality",
                "How often data changes",
                "Application dependencies",
                "Recovery technology",
                "Regulatory requirements",
                "Available budget",
              ],
              outcome: { text: "Recovery priorities set by business need, not assumptions." },
              cta: { label: "Set Recovery Targets", href: C },
            },
          ]}
        />

        <ImageFeature
          title="Data Backup Service"
          statements={["Keeping every backup in one place puts all of them at risk from a single incident."]}
          scope="Folio3 designs layered backup protection using:"
          bullets={[
            "Off-site backup storage",
            "Hosted backup environments",
            "Encrypted data transfer",
            "Retention policies",
            "Immutable backup options",
            "Geographic separation",
            "Access restrictions",
          ]}
          note="The design can follow the 3-2-1 backup rule: three copies of your data, on two types of media, with one copy kept off-site."
          outcome="Stronger protection against site loss and ransomware."
          cta={{ label: "Close Backup Gaps", href: C }}
          image={{
            src: "/images/dr-backup.webp",
            alt: "Data protection core surrounded by backup, replication and recovery arrows linking servers, laptops and cloud storage",
          }}
        />

        <div className="gut-80">
          <DetailPair
            tight
            header="inline"
            tones={["dark", "soft"]}
            cards={[
              {
                icon: "/icons/dr-ransomware.svg",
                label: "Ransomware Readiness",
                title: "Ransomware Recovery Planning And Testing",
                text: "Ransomware recovery takes more than restoring a few files.",
                scope: "Folio3 prepares you for ransomware incidents by reviewing:",
                bullets: [
                  "Backup isolation",
                  "Immutable recovery points",
                  "Privileged access",
                  "Recovery order",
                  "Containment procedures",
                  "Clean restore environments",
                  "Communication responsibilities",
                  "Recovery testing",
                ],
                note: "Planned exercises confirm that systems can be restored without bringing back infected files or compromised accounts.",
                outcome: { text: "A tested recovery plan for ransomware attacks." },
                cta: { label: "Test Ransomware Readiness", href: C },
              },
              {
                icon: "/icons/dr-continuity.svg",
                label: "Continuity Planning",
                title: "Business Continuity Plan Development",
                text: "Disaster recovery restores technology. A business continuity plan sets out how your organization keeps operating while systems are down.",
                scope: "Folio3 helps document:",
                bullets: [
                  "Critical business processes",
                  "Recovery priorities",
                  "Department responsibilities",
                  "Alternative working arrangements",
                  "Communication procedures",
                  "Technology dependencies",
                  "Vendor contacts",
                  "Escalation paths",
                ],
                outcome: { text: "Clear steps for keeping essential operations running during a disruption." },
                cta: { label: "Build a BCP", href: C },
              },
            ]}
          />
        </div>

        <CompareTable
          title="RTO vs. RPO"
          head={["Recovery metric", "What it measures", "Example"]}
          rows={[
            ["RTO", "Maximum acceptable service downtime", "Restore the application within 30 minutes"],
            ["RPO", "Maximum acceptable service downtime", "Recover data from no more than 15 minutes before the incident"],
          ]}
          note="A system may need a short RTO but tolerate a longer RPO, or the reverse. Set recovery targets for each critical service rather than one target for the whole environment."
          cta={{ label: "Set the Right Recovery Targets", href: C }}
        />

        <div className="gut-72">
          <NumberCards
            layout="grid"
            flushTop
            title="Why businesses choose Folio3"
            cta={{ label: "Find Hidden Recovery Gaps", href: C }}
            cards={[
              {
                text: "Recovery plans built around critical services, downtime limits, data-loss tolerance and business impact",
              },
              { text: "Backup activity monitored daily, so failures are caught before you need to recover" },
              { text: "RTO and RPO targets agreed before an incident, not during one" },
              { text: "Ransomware recovery tested with isolated backups, clean restores and validation" },
            ]}
          />
        </div>

        <Journey
          flush
          title="How Folio3 builds recovery readiness"
          steps={[
            {
              icon: "/icons/dr-assess.svg",
              title: "Assess",
              body: "Review systems, applications, data, backup tools, dependencies and current recovery gaps.",
            },
            {
              icon: "/icons/dr-prioritize.svg",
              title: "Prioritize",
              body: "Rank workloads by business impact and recovery urgency.",
            },
            {
              icon: "/icons/dr-define.svg",
              title: "Define",
              body: "Set RTO, RPO, retention, recovery order, ownership and escalation requirements.",
            },
            {
              icon: "/icons/dr-protect.svg",
              title: "Protect",
              body: "Configure the right on-site, off-site and hosted backup controls.",
            },
            {
              icon: "/icons/dr-test.svg",
              title: "Test",
              body: "Run recovery exercises to validate data, systems, access and dependencies.",
            },
            {
              icon: "/icons/dr-improve.svg",
              title: "Improve",
              body: "Update the plan when infrastructure, applications, staff or business needs change.",
            },
          ]}
          cta={{
            title: "Be ready before your systems fail",
            text: "Protect critical data, cut downtime and restore operations fast with tested disaster recovery and data backup services from Folio3.",
            label: "Book a Free Consultation",
            href: C,
          }}
        />

        <div className="faq-section">
          <Faq items={FAQS} cta={{ label: "Ask a Recovery Expert", href: C }} />
        </div>
      </main>
      <Footer />
    </>
  );
}
