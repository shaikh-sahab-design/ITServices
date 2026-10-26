// Content for the case study detail pages, copied from the Figma frames as written.

export type IconItem = { icon: string; title: string; text: string };
export type Outcome = { icon: string; title: string; points: string[] };
export type Logo = { src: string; alt: string; w: number; h: number };

export type CaseStudy = {
  slug: string;
  meta: { title: string; description: string };
  hero: { image: string; title: string[]; lede: string; copyWidth: number };
  facts: { company: Logo; size: string; industry: string; region: string };
  /** Optional "Managed IT Services" band with service pills. */
  services?: { title: string; lede: string; pills: string[] };
  challenge: { title: string; body: string[]; cards: IconItem[] };
  solution: { title: string; body: string; image: string; points: { title: string; text: string }[] };
  stack?: Logo[];
  outcomes: { title: string; lede: string; cards: Outcome[] };
  testimonial?: {
    lede: string;
    heading: string;
    quotes: string[];
    logo: Logo;
    watermark: string;
  };
};

const MANAGED_IT_LEDE =
  "Reliable managed IT support, helpdesk, technical support, and IT operations to keep your business running smoothly.";

const ARCOM_LOGO: Logo = { src: "/images/client-arcom.png", alt: "Arcom IT", w: 211, h: 50 };

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "arcom-it",
    meta: {
      title: "Arcom IT Case Study | Folio3 Managed IT Services",
      description:
        "Folio3 provides outsourced IT support for Arcom IT, working alongside its existing team to enhance technical capabilities, support end users, and strengthen day-to-day IT operations.",
    },
    hero: {
      image: "/images/hero-case-arcom.webp",
      title: ["Folio3 Became an ", "Extension of Arcom IT Team"],
      lede: "Folio3 provides outsourced IT support for Arcom IT, working alongside its existing team to enhance technical capabilities, support end users, and strengthen day-to-day IT operations.",
      copyWidth: 592,
    },
    facts: { company: ARCOM_LOGO, size: "500+ Employees", industry: " IT Services", region: "United Kingdom" },
    services: {
      title: "Managed IT Services",
      lede: MANAGED_IT_LEDE,
      pills: ["Managed IT Support", "Helpdesk Support", "IT Operations", "Technical Support"],
    },
    challenge: {
      title: "Expanding IT Capability Without Losing the Personal Touch",
      body: [
        "Arcom IT needed additional technical capability while continuing to provide the responsive and personal IT experience its users expected.",
        "The requirement went beyond simply adding another support resource. The team needed a partner that could understand its culture, how it worked, and what mattered to its people while working alongside the existing IT function.",
      ],
      cards: [
        {
          icon: "/icons/cs-capacity.svg",
          title: "Additional Technical Capacity",
          text: "Arcom IT needed additional technical capability to support its day-to-day IT operations and growing requirements.",
        },
        {
          icon: "/icons/cs-thumb.svg",
          title: "Maintaining the User Experience",
          text: "Extra support is needed to keep the approachable, responsive experience users expect from the IT team.",
        },
        {
          icon: "/icons/cs-team.svg",
          title: "Working as One Team",
          text: "The partner needed to integrate with Arcom IT rather than operate as a separate outsourced function.",
        },
        {
          icon: "/icons/cs-growth.svg",
          title: "Continuous Improvement",
          text: "Both teams needed to share knowledge, refine processes, and improve IT support delivery.",
        },
      ],
    },
    solution: {
      title: "A Collaborative Managed IT Model Built Around Arcom IT",
      body: "Folio3 worked alongside Arcom IT as an extension of its existing IT team, providing additional technical capability while maintaining a strong focus on users and collaboration.",
      image: "/images/solution-arcom.webp",
      points: [
        {
          title: "Dedicated IT Support",
          text: "Folio3 provided ongoing technical support to help Arcom IT manage day-to-day user and IT requirements.",
        },
        {
          title: "Technical Troubleshooting",
          text: "The team handled technical issues efficiently and professionally, helping resolve problems before they had a significant impact on day-to-day operations.",
        },
        {
          title: "User-Focused Support",
          text: "Folio3 focused on building relationships with end users so staff felt supported, listened to, and confident in the service they received.",
        },
        {
          title: "Collaborative Delivery",
          text: "Rather than operating independently, the Folio3 team worked closely with Arcom IT's existing IT function.",
        },
        {
          title: "Knowledge Sharing",
          text: "Both teams shared knowledge and learned from one another as processes and working practices continued to develop.",
        },
      ],
    },
    outcomes: {
      title: "A Stronger IT Function With Folio3\nas an Extension of the Team",
      lede: "The partnership strengthened Arcom IT's technical capabilities while maintaining the collaborative culture and user-focused service that are central to its IT operations.",
      cards: [
        {
          icon: "/icons/cs-bars.svg",
          title: "Enhanced Technical Capability",
          points: [
            "Additional technical expertise to support day-to-day IT operations.",
            "Extra capacity for troubleshooting and issue resolution.",
            "Improved cross-team collaboration and project delivery.",
          ],
        },
        {
          icon: "/icons/cs-thumb.svg",
          title: "Improved User Experience",
          points: [
            "Users receive responsive and professional technical support.",
            "Issues are handled efficiently, often before they have a significant impact on daily operations.",
            "Staff feel supported, listened to, and confident in the service they receive.",
          ],
        },
        {
          icon: "/icons/cs-growth.svg",
          title: "Continuous Improvement",
          points: [
            "Processes continue to be refined as the partnership develops.",
            "Knowledge sharing remains part of the ongoing relationship.",
            "The focus remains on strengthening both technical capability and the user experience.",
          ],
        },
        {
          icon: "/icons/cs-sync.svg",
          title: "Collaborative IT Operations",
          points: [
            "Folio3 operates as an extension of the existing IT team.",
            "Communication and collaboration remain central to the engagement.",
            "Both teams share knowledge and learn from one another.",
          ],
        },
      ],
    },
    testimonial: {
      lede: "The reference page doesn't need to repeat the entire case study after the outcomes. For Arcom, the existing testimonial can act as the strongest proof point here.",
      heading: "Folio3 Have Become a True Extension of Our IT Team",
      quotes: [
        "“We've been extremely impressed with the Folio3 outsourced IT support team & the value they've brought to our organisation Arcom IT. From the outset, they've made a genuine effort to understand our culture, how we work & what matters most to our people. That investment in building relationships with our end users has made a noticeable difference, staff feel supported, listened to & confident in the service they receive.”",
        "“The support itself feels seamless. Issues are handled efficiently & professionally, often before they have any real impact on day-to-day operations.”",
        "“They haven't just slotted in alongside our existing IT team, they've become a true extension of it.”",
      ],
      logo: ARCOM_LOGO,
      watermark: "/images/case-arcom-watermark.webp",
    },
  },
  {
    slug: "activecomply",
    meta: {
      title: "ActiveComply Case Study | Folio3 Managed IT Services",
      description:
        "ActiveComply is a compliance-focused organization that needed a reliable IT partner to strengthen security operations, improve endpoint management, and support ongoing IT requirements.",
    },
    hero: {
      image: "/images/hero-case-activecomply.webp",
      title: ["Strengthening IT Security,", "Support & Compliance Readiness"],
      lede: "ActiveComply is a compliance-focused organization that needed a reliable IT partner to strengthen security operations, improve endpoint management, and support ongoing IT requirements.",
      copyWidth: 726,
    },
    facts: {
      company: { src: "/images/client-activecomply.png", alt: "ActiveComply", w: 263, h: 50 },
      size: "500+ Employees",
      industry: "Compliance\n& Technology",
      region: "United States",
    },
    challenge: {
      title: "Strengthening IT Operations While Supporting SOC 2 Readiness",
      body: [
        "As ActiveComply continued to grow, it required additional technical expertise across its Microsoft environment, stronger security visibility, responsive user support, and technical support for SOC 2 compliance activities.",
      ],
      cards: [
        {
          icon: "/icons/cs-m365.svg",
          title: "Improving Microsoft 365 Operations",
          text: "Better administration, user lifecycle management, and ongoing support across the Microsoft environment.",
        },
        {
          icon: "/icons/cs-endpoint.svg",
          title: "Strengthening Endpoint Security",
          text: "Improved device visibility, endpoint management, and security controls across the organization.",
        },
        {
          icon: "/icons/cs-eye.svg",
          title: "Improving Identity & Access",
          text: "Stronger management of user identities, permissions, and access requirements.",
        },
        {
          icon: "/icons/cs-id.svg",
          title: "Supporting Compliance Requirements",
          text: "Technical documentation, remediation, and evidence preparation to support SOC 2 activities.",
        },
      ],
    },
    solution: {
      title: "A Managed IT & Security Model Built Around ActiveComply",
      body: "Folio3 partnered with ActiveComply as an extension of its internal IT team, providing managed IT and security operations support across daily operations, endpoints, identity, security, and compliance activities.",
      image: "/images/solution-activecomply.webp",
      points: [
        {
          title: "Microsoft 365 Administration",
          text: "Microsoft 365 administration, user lifecycle management, mailbox access, and ongoing operational support.",
        },
        {
          title: "Endpoint Management & Security",
          text: "Microsoft Intune and Microsoft Defender support to improve endpoint visibility, management, and security.",
        },
        {
          title: "Identity & Access Management",
          text: "Support for identity management, access requirements, and secure user lifecycle processes.",
        },
        {
          title: "Security Monitoring & Remediation",
          text: "Security monitoring, technical investigation, remediation, and ongoing security improvements.",
        },
        {
          title: "Tier-2 Technical Support",
          text: "Responsive troubleshooting and technical assistance for day-to-day user and IT requirements.",
        },
      ],
    },
    stack: [
      { src: "/images/tech-m365.webp", alt: "Microsoft 365", w: 183, h: 50 },
      { src: "/images/tech-defender.webp", alt: "Microsoft Defender", w: 139, h: 50 },
      { src: "/images/tech-entra.webp", alt: "Microsoft Entra ID", w: 154, h: 50 },
      { src: "/images/tech-vanta.webp", alt: "Vanta", w: 128, h: 50 },
      { src: "/images/tech-fieldguide.webp", alt: "Fieldguide", w: 178, h: 40 },
      { src: "/images/tech-intune.webp", alt: "Microsoft Intune", w: 239, h: 40 },
      { src: "/images/tech-jira.webp", alt: "Jira", w: 118, h: 50 },
    ],
    outcomes: {
      title: "A Stronger IT Function With Folio3",
      lede: "The partnership strengthened ActiveComply's technical capabilities while improving security visibility, support processes, and readiness for ongoing compliance activities.",
      cards: [
        {
          icon: "/icons/cs-eye.svg",
          title: "Enhanced Endpoint Visibility",
          points: ["Better device management", "Improved security visibility", "More consistent endpoint controls"],
        },
        {
          icon: "/icons/cs-shield-tick.svg",
          title: "Stronger Security Practices",
          points: ["Improved security oversight", "Faster technical remediation", "Better compliance monitoring"],
        },
        {
          icon: "/icons/cs-grid.svg",
          title: "Structured IT Operations",
          points: ["Tier-2 technical support", "Responsive troubleshooting", "Reduced internal workload"],
        },
        {
          icon: "/icons/cs-gauge.svg",
          title: "Improved Compliance Readiness",
          points: ["Evidence preparation support", "Technical documentation", "Faster identification of requirements"],
        },
      ],
    },
  },
  {
    slug: "opportune",
    meta: {
      title: "Opportune Case Study | Folio3 Managed IT Services",
      description:
        "Folio3 works alongside Opportune's internal IT team to provide additional technical capacity across IT support, Microsoft 365, security, infrastructure, compliance, and ongoing technology initiatives.",
    },
    hero: {
      image: "/images/hero-case-opportune.webp",
      title: ["Folio3 Strengthened ", "Opportune's IT Operations, Security & Infrastructure"],
      lede: "Folio3 works alongside Opportune's internal IT team to provide additional technical capacity across IT support, Microsoft 365, security, infrastructure, compliance, and ongoing technology initiatives.",
      copyWidth: 856,
    },
    facts: {
      company: { src: "/images/client-opportune.png", alt: "Opportune", w: 154, h: 50 },
      size: "500+ Employees",
      industry: "Energy Advisory &\nBusiness Process Outsourcing",
      region: "United States /\nGlobal Operations",
    },
    services: {
      title: "Managed IT Services",
      lede: MANAGED_IT_LEDE,
      pills: [
        "Managed IT Support",
        "Microsoft 365 Administration",
        "Endpoint Management",
        "Security Operations",
        "Network & Infrastructure Management",
        "Compliance Support",
      ],
    },
    challenge: {
      title: "Scaling IT Operations Across a Complex Environment",
      body: [
        "Opportune required additional technical capability across Microsoft 365, endpoints, infrastructure, security platforms, and compliance activities while maintaining consistent day-to-day IT operations.",
        "The requirement extended across multiple areas of the technology environment. Opportune needed additional operational capacity, stronger security visibility, infrastructure optimization, and technical support for ongoing compliance and governance activities.",
      ],
      cards: [
        {
          icon: "/icons/cs-id.svg",
          title: "Reliable IT Support",
          text: "Additional L1/L2/L3 technical capacity was required to manage growing operational requirements, technical issues, and escalations.",
        },
        {
          icon: "/icons/cs-shield.svg",
          title: "Security Visibility",
          text: "The environment required stronger security monitoring, endpoint visibility, email protection, and ongoing validation of security controls.",
        },
        {
          icon: "/icons/cs-grid.svg",
          title: "Infrastructure Optimization",
          text: "Opportunities existed to optimize server resources, connectivity, lifecycle management, and overall infrastructure efficiency.",
        },
        {
          icon: "/icons/cs-clipboard.svg",
          title: "Compliance & Governance",
          text: "Opportune required technical support for SOC 1/SOC 2 IT controls, audit readiness, documentation, access reviews, and technical verification.",
        },
      ],
    },
    solution: {
      title: "A Managed IT Model Built Around Opportune's Internal IT Team",
      body: "Folio3 operates as an extension of Opportune's internal IT organization, providing dedicated technical support and proactive improvements across Microsoft 365, endpoints, security, infrastructure, and daily IT operations.",
      image: "/images/solution-opportune.webp",
      points: [
        {
          title: "Microsoft 365 Operations",
          text: "Folio3 supports Exchange Online administration, mailbox management, user onboarding and offboarding, access management, and Microsoft 365 productivity requirements.",
        },
        {
          title: "Endpoint Management",
          text: "The team supports Microsoft Intune administration, device management, endpoint security, and the transition toward Omnissa UEM.",
        },
        {
          title: "Security Operations",
          text: "Folio3 supports Mimecast email security, CrowdStrike and SentinelOne environments, security logging validation, and ongoing security posture improvements.",
        },
        {
          title: "Infrastructure Management",
          text: "Folio3 provides Windows Server support, hosted environment management, backup activities, server lifecycle management, and network connectivity support.",
        },
        {
          title: "Compliance Support",
          text: "The team supports security control reviews, access reviews, evidence preparation, security logging validation, and technical verification for SOC 1/SOC 2 activities.",
        },
      ],
    },
    stack: [
      { src: "/images/tech-m365.webp", alt: "Microsoft 365", w: 183, h: 50 },
      { src: "/images/tech-exchange.webp", alt: "Exchange", w: 221, h: 50 },
      { src: "/images/tech-intune.webp", alt: "Microsoft Intune", w: 239, h: 40 },
      { src: "/images/tech-omnissa.webp", alt: "Omnissa", w: 128, h: 50 },
      { src: "/images/tech-mimecast.webp", alt: "Mimecast", w: 234, h: 40 },
      { src: "/images/tech-fortigate.webp", alt: "FortiGate", w: 277, h: 40 },
      { src: "/images/tech-crowdstrike.webp", alt: "CrowdStrike", w: 270, h: 50 },
      { src: "/images/tech-sentinelone.webp", alt: "SentinelOne", w: 263, h: 50 },
      { src: "/images/tech-windows-server.webp", alt: "Windows Server", w: 165, h: 50 },
      { src: "/images/tech-ninjaone.webp", alt: "NinjaOne", w: 185, h: 40 },
      { src: "/images/tech-datto.webp", alt: "Datto", w: 112, h: 40 },
      { src: "/images/tech-azure-vd.webp", alt: "Azure Virtual Desktop", w: 185, h: 50 },
    ],
    outcomes: {
      title: "A More Secure, Efficient & Resilient IT Function",
      lede: "Through its ongoing partnership with Opportune, Folio3 helped strengthen IT operations while improving security, compliance readiness, infrastructure efficiency, and technology governance.",
      cards: [
        {
          icon: "/icons/cs-shield-alt.svg",
          title: "Enhanced Security",
          points: [
            "Stronger email protection",
            "Improved endpoint visibility",
            "Security logging validation",
            "Improved security control oversight",
          ],
        },
        {
          icon: "/icons/cs-thumb.svg",
          title: "Stronger Compliance Readiness",
          points: ["IT control assistance", "Evidence preparation", "Access reviews", "Technical verification"],
        },
        {
          icon: "/icons/cs-growth.svg",
          title: "Improved IT Operations",
          points: ["L1/L2/L3 support", "Faster issue response", "Structured escalation", "Additional technical capacity"],
        },
        {
          icon: "/icons/cs-gauge.svg",
          title: "Optimized Infrastructure",
          points: ["New server deployments", "Resource optimization", "Improved connectivity", "Lifecycle management"],
        },
      ],
    },
  },
];

export const findCaseStudy = (slug: string) => CASE_STUDIES.find((c) => c.slug === slug);
