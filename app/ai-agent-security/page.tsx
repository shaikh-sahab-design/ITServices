import type { Metadata } from "next";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import {
  AiaAdoption,
  AiaAudiences,
  AiaCoverage,
  AiaDefinition,
  AiaExposure,
  AiaProcess,
  AiaWhy,
} from "@/components/page/Aia";
import { CtaStrip } from "@/components/page/CtaStrip";
import { PageHero } from "@/components/page/PageHero";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "AI Agent Security | Folio3 Managed IT Services",
  description:
    "AI Agent Security assesses how agentic AI workflows interact with tools, identities, applications, data, and business systems.",
};

const C = ROUTES.contact;

const FAQS = [
  {
    q: "What is AI Agent Security?",
    a: "AI Agent Security focuses on protecting AI agents that can interact with tools, applications, data, and systems and perform actions with varying levels of autonomy.",
  },
  {
    q: "What does an AI Agent Security Assessment cover?",
    a: "It can assess agent workflows, tool access, permissions, identities, action boundaries, integrations, and monitoring.",
  },
  {
    q: "Why are AI agent permissions important?",
    a: "Excessive permissions can allow agents to access data or perform actions beyond their intended purpose.",
  },
  {
    q: "Can you assess what tools an AI agent can access?",
    a: "Yes. Tool and integration reviews can identify the applications, APIs, services, and other resources available to an agent.",
  },
  {
    q: "Can you review agent identities?",
    a: "Yes. Assessments can review how agents are identified, authenticated, authorized, and distinguished from human users or other services.",
  },
  {
    q: "What are AI agent action boundaries?",
    a: "Action boundaries define what an agent is allowed to do, where it can operate, and which actions may require additional authorization or approval.",
  },
  {
    q: "Can you assess agent monitoring?",
    a: "Yes. Agent activity, actions, events, and monitoring controls can be reviewed to identify visibility gaps and potential security risks.",
  },
];

export default function AiAgentSecurityPage() {
  return (
    <>
      <Nav />
      <main className="inner-page">
        <PageHero
          compact
          image="/images/hero-ai-assessment.webp"
          title={["Secure AI Agents Before", "They Act on Your Behalf"]}
        />

        <AiaExposure
          title="AI Agents Can Act Across Your Environment"
          lead="AI agents can move beyond generating responses."
          text="They can access tools, interact with applications, retrieve information, and take actions with varying levels of autonomy."
          cta={{ label: "Understand Your AI Agent Risks", href: C }}
          box={{
            title: "Without focused security controls, it can be difficult to know:",
            items: [
              "Which tools an AI agent can access",
              "What permissions an agent has",
              "Which identity operates on its behalf",
              "What actions it can perform",
              "Whether actions stay within defined boundaries",
              "How agent activity is monitored and reviewed",
            ],
          }}
        />

        <AiaDefinition
          title="What Is AI Agent Security?"
          lead="Evaluate What Your AI Agents Can Access and Do"
          paragraphs={[
            "AI Agent Security assesses how agentic AI workflows interact with tools, identities, applications, data, and business systems.",
            "The approach focuses on tool access, permissions, identities, action boundaries, workflows, and monitoring to identify risks that can emerge when AI systems are given the ability to act.",
          ]}
          band={{
            title: "The goal is straightforward:",
            text: "Know what your agents can access. Control what they can do. Monitor what they actually do.",
            cta: { label: "Get Your AI Agent Security Assessment", href: C },
          }}
        />

        <AiaWhy
          title="Why Do Your AI Agents Need Security Assessment?"
          aside="Agentic AI introduces security considerations that go beyond traditional AI applications."
          cta={{ label: "Assess Your AI Agent Security", href: C }}
          rows={[
            {
              title: "Agents Can Access Business Tools",
              text: "AI agents may interact with APIs, applications, databases, and other tools to complete tasks.",
            },
            {
              title: "Permissions Can Extend Beyond Intended Use",
              text: "Excessive permissions can allow agents to access information or perform actions beyond what their purpose requires.",
            },
            {
              title: "Agent Identities Need Clear Controls",
              text: "Agents need appropriately defined identities and access controls to distinguish automated activity from human users.",
            },
            {
              title: "Actions Need Defined Boundaries",
              text: "Without clear limits, an agent may perform actions that exceed its intended role or workflow.",
            },
            {
              title: "Agent Activity Needs Visibility",
              text: "Monitoring helps organizations understand what agents are accessing, executing, and interacting with across the environment.",
            },
          ]}
        />

        <AiaCoverage
          title="What Does Our AI Agent Security Service Cover?"
          cta={{ label: "Secure Your AI Agents", href: C }}
          aside={{
            title: "Assess Agentic AI From Identity to Action",
            text: "Folio3 evaluates how AI agents interact with users, tools, applications, data, and systems to identify security risks across agentic workflows.",
          }}
          areas={[
            {
              title: "Agentic AI Workflows",
              text: "Assess how agents operate, make decisions, interact with tools, and move through defined workflows.",
              focus: ["Agent workflows", "Task execution", "Agent interactions", "Workflow controls", "Agent behavior"],
            },
            {
              title: "Tool Access",
              text: "Review the tools, APIs, applications, and services available to AI agents.",
              focus: ["Tool access", "API access", "Application connections", "External services", "Tool permissions"],
            },
            {
              title: "Agent Permissions",
              text: "Assess whether agents have the appropriate level of access required for their intended functions.",
              focus: ["Agent permissions", "Data access", "Application permissions", "Privileged access", "Least-privilege controls"],
            },
            {
              title: "Agent Identity",
              text: "Review how AI agents are identified, authenticated, and separated from human users or other services.",
              focus: ["Agent identity", "Authentication", "Service identities", "Identity controls", "Access attribution"],
            },
            {
              title: "Action Boundaries",
              text: "Evaluate the controls defining what actions an AI agent can perform and where those actions are permitted.",
              focus: ["Action limits", "Authorization controls", "Approval requirements", "Workflow boundaries", "High-risk actions"],
            },
            {
              title: "Agent Monitoring",
              text: "Review how agent activity is logged, monitored, and evaluated for suspicious or unexpected behavior.",
              focus: ["Agent activity", "Action monitoring", "Event logging", "Behavior analysis", "Security alerts"],
            },
          ]}
        />

        <AiaProcess
          title="How Our AI Agent Security Process Works"
          lead="From Agent Discovery to Security Recommendations"
          cta={{ label: "Start Your AI Agent Security Assessment", href: C }}
          steps={[
            {
              title: "Understand Your Agent Environment",
              text: "We identify AI agents, workflows, tools, identities, permissions, integrations, and systems within the assessment scope.",
              outcome: "A defined view of your agentic AI environment.",
            },
            {
              title: "Map Agent Access & Actions",
              text: "We examine how agents interact with tools, data, applications, identities, and business systems.",
              outcome: "Greater visibility into agent access and action paths.",
            },
            {
              title: "Assess Security Controls",
              text: "We review permissions, identities, action boundaries, authorization controls, and monitoring capabilities.",
              outcome: "A clearer understanding of agent security weaknesses.",
            },
            {
              title: "Identify & Prioritize Risks",
              text: "We identify potential risks and prioritize them according to relevance and potential impact.",
              outcome: "A prioritized view of AI agent security risks.",
            },
            {
              title: "Recommend Next Steps",
              text: "We translate findings into practical recommendations for strengthening agent security and controlling autonomous actions.",
              outcome: "A structured path toward safer AI agent operations.",
            },
          ]}
        />

        <AiaAdoption
          title="Build Security Into Your AI Agent Journey"
          text="AI agent security should evolve as agents gain access to more tools, systems, data, and autonomous capabilities."
          stages={[
            {
              icon: "/icons/agent-before.svg",
              title: "Before Agent Deployment",
              text: "Define identities, permissions, tools, and action boundaries before agents go into production.",
            },
            {
              icon: "/icons/agent-during.svg",
              title: "During Agent Integration",
              text: "Assess how agents interact with APIs, applications, data, and business systems.",
            },
            {
              icon: "/icons/agent-expands.svg",
              title: "As Agent Capabilities Expand",
              text: "Review new tools, permissions, workflows, and autonomous actions as agents become more capable.",
            },
          ]}
          cta={{ label: "Build a Stronger AI Agent Security Foundation", href: C }}
        />

        <AiaAudiences
          title="Who Should Consider AI Agent Security?"
          cta={{ label: "Assess Your AI Agent Security", href: C }}
          items={[
            {
              title: "Organizations Deploying AI Agents",
              text: "Assess agent security before autonomous workflows become business-critical.",
            },
            {
              title: "Teams Giving AI Access to Business Systems",
              text: "Review tools, permissions, identities, and connected applications.",
            },
            {
              title: "Organizations Automating Business Workflows",
              text: "Establish appropriate boundaries around AI-driven actions and decisions.",
            },
            {
              title: "Security & Identity Teams",
              text: "Strengthen visibility and control over agent identities, permissions, and activity.",
            },
          ]}
        />

        <div className="faq-section aia-faq">
          <Faq items={FAQS} cta={{ label: "Discuss Your AI Agent Security Requirements", href: C }} />
        </div>

        <CtaStrip
          title="Know What Your AI Agents Can Do"
          text="Assess your agentic AI environment, understand its access and action risks, and establish stronger boundaries around autonomous activity."
          cta={{ label: "Talk to an AI Security Expert", href: C }}
          note="We'll review your AI agent environment, understand its security requirements, and recommend the most practical next step."
        />
      </main>
      <Footer />
    </>
  );
}
