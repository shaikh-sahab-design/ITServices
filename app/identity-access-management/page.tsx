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
  title: "Identity and Access Management Services | Folio3 Managed IT Services",
  description:
    "Identity and access management controls how users, administrators, devices and applications access your business systems.",
};

const C = ROUTES.contact;

const FAQS = [
  {
    q: "What do identity and access management services include?",
    a: "They can include directory management, MFA, Conditional Access, user lifecycle processes, privileged access, SSO and access reviews.",
  },
  {
    q: "Can Folio3 manage Microsoft Entra ID?",
    a: "Yes. The scope can include users, groups, administrator roles, MFA, Conditional Access, applications and reporting.",
  },
  {
    q: "Does the service include Active Directory?",
    a: "Yes. Folio3 supports Active Directory, Microsoft Entra ID and hybrid identity environments.",
  },
  {
    q: "Can Folio3 help implement MFA?",
    a: "Yes. MFA can be applied based on user role, application sensitivity, device condition and sign-in risk.",
  },
  {
    q: "What is Conditional Access?",
    a: "Conditional Access uses identity, device, location, application and risk signals to allow a sign-in, block it or require extra verification.",
  },
  {
    q: "Can onboarding and offboarding be automated?",
    a: "Many account, license, group, session and application-access tasks can be standardized or automated where supported.",
  },
  {
    q: "Does Folio3 review administrator accounts?",
    a: "Yes. Reviews can cover privileged roles, emergency accounts, permanent access, MFA and administrative activity.",
  },
  {
    q: "Can Folio3 help with single sign-on?",
    a: "Yes. Folio3 assesses application compatibility and configures supported applications for central sign-in.",
  },
  {
    q: "How often should user access be reviewed?",
    a: "It depends on your risk and compliance requirements. Administrator, guest and sensitive-application access should be reviewed more often.",
  },
  {
    q: "Can we start with identity and access management professional services only?",
    a: "Yes. Folio3 can assess your current environment and deliver a prioritized improvement plan before ongoing management begins.",
  },
];

export default function IdentityAccessManagementPage() {
  return (
    <>
      <Nav />
      <main className="inner-page">
        <PageHero compact image="/images/hero-migration.webp" title={["Close Access Gaps", "With IAM Services"]} />

        <DefineSplit
          title="Identity and access management, explained simply"
          paragraphs={[
            "Identity and access management controls how users, administrators, devices and applications access your business systems.",
            "Managed identity controls bring together authentication, permissions, access policies, user lifecycle processes, privileged access and regular reviews.",
          ]}
          cta={{ label: "Explore IAM Coverage", href: C }}
          box={{
            title: "It answers four questions:",
            items: [
              "Who is requesting access?",
              "What are they allowed to use?",
              "Under which conditions should access be allowed?",
              "When should access be changed or removed?",
            ],
          }}
        />

        <div className="gut-72">
          <NumberCards
            layout="rail"
            title="Why choose Folio3"
            cta={{ label: "Talk to IAM Experts", href: C }}
            cards={[
              {
                title: "Microsoft identity expertise",
                text: "Folio3 supports Microsoft Entra ID, Active Directory, Microsoft 365 and hybrid identity environments.",
              },
              {
                title: "Security-aligned access controls",
                text: "Identity policies are reviewed alongside your cybersecurity, devices, applications, remote access and compliance needs.",
              },
              {
                title: "Controlled policy rollout",
                text: "MFA and Conditional Access policies are piloted and validated before wider deployment.",
              },
              {
                title: "Existing environment review",
                text: "Current directories, applications, licenses, roles and policies are reviewed before any change is recommended.",
              },
              {
                title: "Ongoing administration",
                text: "Managed identity and access management services keep controls up to date through user changes, access reviews, monitoring and policy updates.",
              },
            ]}
          />
        </div>

        <DetailPair
          title="Folio3’s identity and access coverage"
          cards={[
            {
              icon: "/icons/iam-assessment.svg",
              label: "Identity Audit",
              title: "Identity environment assessment",
              text: "Folio3 reviews your current identity environment to find access, authentication and configuration gaps.",
              scope: "The assessment can cover:",
              bullets: [
                "Microsoft Entra ID",
                "Active Directory",
                "Microsoft 365 identities",
                "Users and groups",
                "Administrator roles",
                "MFA coverage",
                "Conditional Access",
                "Guest accounts",
                "Service accounts",
                "Application assignments",
                "Joiner, mover and leaver processes",
              ],
              outcome: { text: "A prioritized view of your identity risks and the fixes needed." },
              cta: { label: "Audit Identity Risks", href: C },
            },
            {
              icon: "/icons/iam-directory.svg",
              label: "Directory Management",
              title: "Microsoft Entra ID and Active Directory management",
              text: "Folio3 supports cloud, on-premises and hybrid identity environments.",
              scope: "Management can include:",
              bullets: [
                "User and group administration",
                "Role assignments",
                "Directory sync reviews",
                "Domain configuration",
                "Authentication troubleshooting",
                "Device identity controls",
                "Hybrid identity support",
                "Application access",
                "Policy administration",
                "Identity reporting",
              ],
              outcome: { text: "Consistent control across users, devices and applications." },
              cta: { label: "Clean Up Directories", href: C },
            },
          ]}
        />

        <ImageFeature
          title="Multi-factor authentication"
          statements={["Passwords alone can’t protect sensitive accounts."]}
          scope="Folio3 implements MFA based on:"
          bullets={[
            "User roles",
            "Administrator access",
            "Application sensitivity",
            "Sign-in risk",
            "Device condition",
            "Working location",
            "Legacy authentication",
            "Emergency access requirements",
          ]}
          outcome="Stronger account security without adding friction to every sign-in."
          cta={{ label: "Enforce MFA", href: C }}
          image={{
            src: "/images/iam-mfa.webp",
            alt: "Hands typing on a keyboard beneath a glowing shield, password fields and protection labels",
          }}
        />

        <div className="gut-80">
          <DetailPair
            tight
            header="inline"
            tones={["dark", "soft"]}
            cards={[
              {
                icon: "/icons/iam-conditional.svg",
                label: "Risk-Based Access",
                title: "Conditional Access",
                text: "Conditional Access uses identity, device, location, application and risk signals to decide whether a sign-in is allowed.",
                scope: "Policies can cover:",
                bullets: [
                  "Administrator accounts",
                  "Remote access",
                  "Unmanaged devices",
                  "High-risk sign-ins",
                  "Sensitive applications",
                  "Guest users",
                  "Geographic restrictions",
                  "Legacy authentication",
                  "Session controls",
                  "Approved exclusions",
                ],
                note: "Every policy is tested with pilot users before wider rollout.",
                outcome: { text: "Access decisions based on risk and context, not passwords alone." },
                cta: { label: "Tighten Sign-In Rules", href: C },
              },
              {
                icon: "/icons/iam-lifecycle.svg",
                label: "Joiners, Movers, Leavers",
                title: "User lifecycle management",
                text: "Identity risk grows when account changes are late or handled inconsistently.",
                groups: [
                  {
                    title: "Joiners",
                    items: [
                      "Create approved accounts",
                      "Assign licenses",
                      "Add role-based groups",
                      "Apply authentication policies",
                      "Grant required application access",
                    ],
                  },
                  {
                    title: "Movers",
                    items: [
                      "Update permissions after role changes",
                      "Remove outdated access",
                      "Apply new department policies",
                      "Review privileged roles",
                    ],
                  },
                  {
                    title: "Leavers",
                    items: [
                      "Block sign-in",
                      "Revoke active sessions",
                      "Remove group memberships",
                      "Recover licenses",
                      "Transfer approved data ownership",
                      "Record completed actions",
                    ],
                  },
                ],
                outcome: { text: "Faster user changes and fewer accounts holding access they no longer need." },
                cta: { label: "Automate User Changes", href: C },
              },
            ]}
          />
        </div>

        <DetailPair
          cards={[
            {
              icon: "/icons/cs-team.svg",
              label: "Permission Structure",
              title: "Role-based access control",
              text: "Role-based access assigns permissions by job responsibility rather than one-off requests.",
              scope: "Folio3 can help you:",
              bullets: [
                "Define business roles",
                "Map current permissions",
                "Standardize group membership",
                "Remove duplicate access",
                "Reduce direct user assignments",
                "Separate administrative duties",
                "Document approval ownership",
                "Review high-risk roles",
              ],
              outcome: { text: "Consistent access with fewer unmanaged permissions." },
              cta: { label: "Fix Permissions", href: C },
            },
            {
              icon: "/icons/cs-shield-tick.svg",
              label: "Admin Security",
              title: "Privileged access management",
              text: "Administrator accounts can change systems, policies, users and data, so they need tighter controls than standard accounts.",
              scope: "Folio3 can review:",
              bullets: [
                "Global and domain administrators",
                "Application administrators",
                "Permanent role assignments",
                "Privileged group memberships",
                "Separate administrator accounts",
                "Emergency access accounts",
                "MFA enforcement",
                "Time-limited access",
                "Administrative activity logs",
                "Privileged access reviews",
              ],
              outcome: { text: "Less exposure from excessive or permanent admin access." },
              cta: { label: "Lock Down Admins", href: C },
            },
          ]}
        />

        <PanelRows
          rows={[
            {
              panel: {
                kind: "blue",
                title: "Single sign-on",
                text: "Single sign-on lets approved users reach connected applications through one central identity.",
              },
              scope: "Folio3 can support:",
              bullets: [
                "Application discovery",
                "Compatibility assessment",
                "Identity provider configuration",
                "User and group assignment",
                "Authentication policy alignment",
                "Pilot testing",
                "Rollout planning",
                "Sign-in troubleshooting",
                "Application removal",
                "Access reporting",
              ],
              outcome: { text: "Fewer passwords to manage and central control over application access.", tone: "blue" },
              cta: { label: "Enable SSO", href: C },
            },
            {
              panel: {
                kind: "blue",
                title: "Access reviews and reporting",
                text: "Access needs regular review, especially for administrators, guest users, sensitive applications and high-risk groups.",
              },
              scope: "Reviews can cover:",
              bullets: [
                "User permissions",
                "Group memberships",
                "Administrator roles",
                "Guest accounts",
                "Application assignments",
                "Inactive identities",
                "Service accounts",
                "Policy exclusions",
                "Review ownership",
                "License assignments",
              ],
              outcome: { text: "Clear evidence of who has access and whether they still need it.", tone: "blue" },
              cta: { label: "Review Access Now", href: C },
            },
          ]}
        />

        <CompareTable
          title="Manual access management vs. managed identity"
          head={["Area", "Manual access management", "Managed identity"]}
          rows={[
            ["Onboarding", "Separate account requests", "Role-based provisioning"],
            ["Role changes", "Old permissions may remain", "Access reviewed and updated"],
            ["Offboarding", "Relies on manual checklists", "Access removed through a defined workflow"],
            ["MFA", "Applied inconsistently", "Enforced through policy"],
            ["Administrator access", "Permanent roles are common", "Privileges restricted and reviewed"],
            ["Application access", "Managed app by app", "Centralized through groups and SSO"],
            ["Access reviews", "Irregular", "Scheduled and documented"],
            ["Reporting", "Collected manually", "Central identity visibility"],
          ]}
          note="Manual access management handles one request at a time. Managed identity keeps the right access in place across the whole user lifecycle."
          cta={{ label: "Stop Managing Access Manually", href: C }}
        />

        <div className="gut-72">
          <NumberCards
            layout="grid"
            flushTop
            title="Less access risk with managed identity"
            cta={{ label: "Cut Identity Risk", href: C }}
            cards={[
              {
                title: "Limits unnecessary access",
                text: "Users get only the permissions their current role requires.",
              },
              {
                title: "Strengthens sign-in security",
                text: "MFA and Conditional Access add protection even when a password is stolen.",
              },
              {
                title: "Protects administrator roles",
                text: "Privileged accounts get tighter restrictions, monitoring and review.",
              },
              {
                title: "Improves offboarding",
                text: "Accounts, sessions, licenses and application access are removed through a defined process.",
              },
              {
                title: "Centralizes application access",
                text: "Single sign-on and identity groups cut down on unmanaged credentials.",
              },
              {
                title: "Supports compliance reviews",
                text: "Access records and scheduled reviews give clear evidence of who owns each control.",
              },
            ]}
          />
        </div>

        <CompareTable
          title="What changes with managed identity"
          head={["Identity challenge", "Business outcome"]}
          rows={[
            ["Unnecessary user access", "Role-based permissions"],
            ["Weak authentication", "Managed MFA and Conditional Access"],
            ["Inconsistent onboarding", "Standard user provisioning"],
            ["Delayed offboarding", "Defined access-removal process"],
            ["Excessive administrator access", "Privileged access controls"],
            ["Separate application passwords", "Central SSO"],
            ["Unreviewed guest access", "Scheduled access reviews"],
            ["Limited visibility", "Central identity reporting"],
          ]}
          cta={{ label: "Get Identity Control", href: C }}
        />

        <Journey
          flush
          title="How Folio3 secures every identity"
          steps={[
            {
              icon: "/icons/iam-discover.svg",
              title: "Discover",
              body: "Document directories, users, roles, applications, authentication methods and current access processes.",
            },
            {
              icon: "/icons/iam-assess.svg",
              title: "Assess",
              body: "Find inactive accounts, excessive permissions, privileged access risks and policy gaps.",
            },
            {
              icon: "/icons/iam-design.svg",
              title: "Design",
              body: "Define business roles, authentication policies, access rules and review ownership.",
            },
            {
              icon: "/icons/iam-implement.svg",
              title: "Implement",
              body: "Roll out approved changes through pilot groups and in controlled stages.",
            },
            {
              icon: "/icons/iam-validate.svg",
              title: "Validate",
              body: "Test sign-ins, permissions, application access, exclusions and emergency accounts.",
            },
            {
              icon: "/icons/iam-manage.svg",
              title: "Manage",
              body: "Process user changes, monitor identity health, review access and update policies.",
            },
          ]}
          cta={{
            title: "Take back control of every user’s access",
            text: "Manage user access, strengthen authentication and protect administrator accounts with Folio3 identity and access management services.",
            label: "Book an IAM Consultation",
            href: C,
          }}
        />

        <div className="faq-section">
          <Faq items={FAQS} cta={{ label: "Ask an Identity Expert", href: C }} />
        </div>
      </main>
      <Footer />
    </>
  );
}
