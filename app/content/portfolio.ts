export type ExternalLink = {
  label: string;
  href: string;
  note?: string;
};

export type WorkExperience = {
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
};

export type ProjectScriptUseCase = {
  script: string;
  useCase: string;
};

export type ProjectCaseStudy = {
  slug: string;
  title: string;
  period: string;
  projectType: string;
  summary: string;
  description: string;
  goal: string;
  achievement: string;
  whatIBuilt: string[];
  features: string[];
  outcomes: string[];
  skillsUsed: string[];
  links: ExternalLink[];
  scriptUseCases?: ProjectScriptUseCase[];
  confidentialityNote?: string;
};

export const profile = {
  name: "Khizar Ahmed",
  title: "Software Engineer",
  location: "Karachi, Pakistan",
  email: "khizar18ahmed@gmail.com",
  phone: "+92 345 3666623",
  linkedin: "https://www.linkedin.com/in/khizar-ahmed-0a62841b5/",
  github: "https://github.com/khizarahmedb",
  summary:
    "I build full-stack software and production automation systems that connect marketing data, business performance analytics, and decision workflows.",
};

export const quickStats = [
  {
    label: "Reporting Time Reduction",
    value: "90%",
    detail: "Cut reporting turnaround using automation pipelines in current role.",
  },
  {
    label: "Verified Security Findings",
    value: "8",
    detail: "Confirmed exploitable QA/AppSec issues in thesis case study reporting.",
  },
  {
    label: "Primary Delivery Stack",
    value: "Next.js + TypeScript",
    detail: "Used across multiple production projects and internal tooling.",
  },
];

export const workExperience: WorkExperience[] = [
  {
    role: "Head of Automations for Marketing",
    company: "Nysonian Inc",
    location: "Islamabad",
    period: "Sep 2025 - Present",
    highlights: [
      "Built cross-channel automation pipelines for paid marketing, reporting, and finance visibility.",
      "Integrated ad and commerce signals into unified dashboards for faster decisions.",
      "Reduced report processing time by 90% and removed major manual workload.",
      "Worked across Finance, Operations, and Support with production-grade scripts and handoff docs.",
    ],
  },
  {
    role: "Software Team Lead",
    company: "TFG Solutions",
    location: "Karachi",
    period: "Jan 2025 - Aug 2025",
    highlights: [
      "Delivered full-stack web applications with production deployment ownership.",
      "Led planning and day-to-day implementation with designers and engineers.",
      "Focused delivery on performance, scalability, and maintenance readiness.",
    ],
  },
  {
    role: "Junior Engineer",
    company: "CodeCargo",
    location: "Remote",
    period: "Oct 2024 - Dec 2024",
    highlights: [
      "Developed .NET Core APIs with EF Core, PostgreSQL, and gRPC services.",
      "Integrated API surfaces into Next.js frontend modules.",
      "Contributed tests across unit, integration, and Cypress component coverage.",
    ],
  },
  {
    role: "Web Developer",
    company: "Split Creatives",
    location: "Karachi",
    period: "Apr 2024 - Sep 2024",
    highlights: [
      "Built and maintained client projects across Next.js, React, WordPress, and Shopify.",
      "Coordinated execution with design teams and junior developers.",
      "Handled delivery from implementation through deployment support.",
    ],
  },
  {
    role: "Software Engineer Intern",
    company: "Simation Studios",
    location: "Karachi",
    period: "Sep 2023 - Mar 2024",
    highlights: [
      "Built React interfaces with reusable component patterns.",
      "Worked on dynamic state-driven UI behavior and interactive flows.",
      "Improved frontend quality through consistent implementation standards.",
    ],
  },
];

export const education = {
  school: "SZABIST, Karachi",
  degree: "BS Computer Science",
  year: "2024",
  gpa: "3.40",
};

export const d2cAutomationScriptUseCases: ProjectScriptUseCase[] = [
  {
    script: "Daily PnL Reconciliation",
    useCase:
      "Automated daily reconciliation of paid media spend, order value, and margin-level profitability signals.",
  },
  {
    script: "Historical PnL Backfill Jobs",
    useCase:
      "Rebuilt delayed and missing reporting windows to keep long-term finance trends reliable.",
  },
  {
    script: "Executive Summary Automation",
    useCase:
      "Prepared concise daily and weekly growth snapshots for marketing and leadership teams.",
  },
  {
    script: "Daily CMO Reporting Pipeline",
    useCase:
      "Built daily CMO report packs blending paid-channel, commerce, and operational metrics.",
  },
  {
    script: "Weekly Growth and Efficiency Reviews",
    useCase:
      "Automated weekly views for spend efficiency, growth deltas, and KPI movement.",
  },
  {
    script: "Channel Mix and Attribution Reporting",
    useCase:
      "Created channel-level performance and attribution indexing reports for budget decisions.",
  },
  {
    script: "Forecasting and Sales Pacing",
    useCase:
      "Generated forecast outputs and pacing checks to support planning and inventory conversations.",
  },
  {
    script: "Hourly Performance Monitoring",
    useCase:
      "Built hourly refresh jobs for fast-response campaign monitoring and issue detection.",
  },
  {
    script: "Anomaly and Threshold Alerts",
    useCase:
      "Triggered operational alerts for spend anomalies, performance drops, and tracking issues.",
  },
  {
    script: "Tracking Integrity Checks",
    useCase:
      "Implemented recurring checks to validate attribution events and data continuity.",
  },
  {
    script: "Attach-Rate Analysis Packs",
    useCase:
      "Created reusable analysis packs for variant-level subscription and bundle behavior.",
  },
  {
    script: "Slack Ops Notifications",
    useCase:
      "Automated routing of campaign-health reminders and alerts to the right stakeholder channels.",
  },
];

export const projectCaseStudies: ProjectCaseStudy[] = [
  {
    slug: "qa-security-thesis-report",
    title: "QA + Application Security Thesis Report",
    period: "2026",
    projectType: "QA / AppSec / Technical Reporting",
    summary:
      "End-to-end QA and security audit with reproducible findings, remediation rechecks, and a formal thesis-style deliverable.",
    description:
      "A portfolio-safe report package documenting a QA and application-security engagement on a live SaaS web platform and API surface.",
    goal:
      "Run a complete QA/AppSec cycle from discovery to risk validation and remediation re-verification, then package results as leadership-ready and technical documents.",
    achievement:
      "Verified 8 findings including 2 critical account-impact paths; completed remediation recheck and delivered a structured thesis report with actionable fix guidance.",
    whatIBuilt: [
      "Risk-ranked finding catalog with exploit preconditions and impact narratives.",
      "Reproducible validation notes for web and API abuse paths.",
      "Recheck matrix comparing pre-fix and post-fix behavior.",
      "Final PDF report and portfolio-safe summary outputs.",
    ],
    features: [
      "Structured vulnerability workflow",
      "Severity tagging and evidence capture",
      "Authorization and session-flow testing",
      "Remediation verification protocol",
    ],
    outcomes: [
      "Delivered report pack suitable for engineering and stakeholder audiences.",
      "Improved defect visibility and prioritization for remediation planning.",
      "Created reusable QA/AppSec report format for future engagements.",
    ],
    skillsUsed: [
      "QA strategy",
      "API security testing",
      "Authorization analysis",
      "Risk scoring",
      "Technical writing",
      "Remediation validation",
    ],
    links: [
      {
        label: "Read thesis report (PDF)",
        href: "/reports/thesis-report-khizar-ahmed.pdf",
      },
    ],
    confidentialityNote:
      "Target system identifiers and sensitive payload details are intentionally removed in this public version.",
  },
  {
    slug: "d2c-marketing-automation",
    title: "D2C Marketing Automation Platform",
    period: "2025 - Present",
    projectType: "Automation / Data Engineering / Marketing Ops",
    summary:
      "Script-driven automation platform for paid media, PnL reporting, indexing, forecasting, and Slack alerting across multiple stores.",
    description:
      "A large production automation portfolio where I designed and operated reporting and decision pipelines for D2C growth and finance teams.",
    goal:
      "Replace manual spreadsheets and disconnected reports with reliable scheduled jobs that deliver channel, PnL, forecasting, and anomaly signals quickly.",
    achievement:
      "Reduced reporting cycle time by 90%, standardized decision metrics, and built a reusable script ecosystem that supports daily, hourly, and weekly execution.",
    whatIBuilt: [
      "PnL extraction and backfill scripts with regional coverage.",
      "CMO daily and weekly reporting workflows for leadership decisioning.",
      "Forecasting and indexing pipelines for trend and attribution analysis.",
      "Slack-driven alerting and reminders for operating cadence.",
      "Attach-rate analysis pack automation for merchandising reviews.",
    ],
    features: [
      "Scheduled multi-frequency script orchestration",
      "Cross-source data normalization",
      "Alerting and notification integration",
      "Anomaly and threshold monitoring",
      "Executive summary generation",
    ],
    outcomes: [
      "Faster cross-functional reporting for Finance, Marketing, and Operations.",
      "Reduced manual reconciliation effort and improved consistency.",
      "Reusable script catalog that supports rapid new metric rollout.",
    ],
    skillsUsed: [
      "JavaScript automation",
      "Python scripting",
      "Data transformation",
      "Marketing analytics",
      "Business intelligence",
      "Operational reliability",
    ],
    links: [],
    scriptUseCases: d2cAutomationScriptUseCases,
    confidentialityNote:
      "All names and script labels here are anonymized to keep company/store identity private while preserving scope of work.",
  },
  {
    slug: "triplewhale-assistant",
    title: "TripleWhale Assistant",
    period: "2026",
    projectType: "Full-Stack Product / Analytics Assistant",
    summary:
      "Analytics assistant with task planning, report runs, chat sessions, and connector-backed store data workflows.",
    description:
      "A TypeScript + Next.js system for analytics operations, supporting chat-assisted planning and task execution with store-aware context.",
    goal:
      "Provide one workspace for marketing analytics teams to plan report tasks, run them, and communicate outcomes without tool hopping.",
    achievement:
      "Delivered API endpoints for planning/runs/chat, multi-backend inference support, connector integration, and task/run history flow in a deployable app.",
    whatIBuilt: [
      "Task planning and run APIs with persistent state.",
      "Chat session and message APIs for context-aware assistance.",
      "TripleWhale and Shopify connector abstractions.",
      "Backend inference gateway with Codex and OpenCode support.",
      "Scheduler/worker scripts for periodic operations.",
    ],
    features: [
      "Task planner",
      "Run history",
      "Chat sessions",
      "Connector integrations",
      "Backend switching",
    ],
    outcomes: [
      "Unified analytics workflow across planning, execution, and reporting.",
      "Reduced handoff friction between operators and analysts.",
      "Created a foundation for store-scoped AI-assisted operations.",
    ],
    skillsUsed: [
      "Next.js",
      "TypeScript",
      "API design",
      "Connector architecture",
      "PostgreSQL",
      "Scheduler workflows",
    ],
    links: [],
  },
  {
    slug: "public-ai-config",
    title: "Public AI Config (agents-config)",
    period: "2026",
    projectType: "Developer Tooling / Configuration Architecture",
    summary:
      "Reusable cross-repo configuration standard for AI coding agents, with bootstrap scripts and sync-safe workflow patterns.",
    description:
      "A public configuration system to keep AI tooling setup consistent across repositories and team environments.",
    goal:
      "Remove configuration drift and make setup idempotent for multi-repo engineering workflows.",
    achievement:
      "Published portable templates and setup scripts used across local repos, including daily sync and policy-driven instruction hierarchy.",
    whatIBuilt: [
      "Canonical AGENTS templates and notes patterns.",
      "Tool-agnostic setup bootstrap script.",
      "Instruction precedence model for local/global context.",
      "Daily sync process for read-only shared standards.",
    ],
    features: [
      "Template-driven configuration",
      "Cross-tool compatibility",
      "Repo bootstrap behavior",
      "Drift prevention workflow",
    ],
    outcomes: [
      "Faster repo onboarding for agent-assisted development.",
      "Clear operating standard for instruction and notes management.",
      "Reduced setup mistakes across repositories.",
    ],
    skillsUsed: [
      "Shell scripting",
      "Configuration design",
      "Documentation systems",
      "Git workflows",
      "Developer enablement",
    ],
    links: [
      {
        label: "GitHub repository",
        href: "https://github.com/khizarahmedb/agents-config",
      },
    ],
  },
  {
    slug: "munik",
    title: "MUNIK XVI (munik.iba.edu.pk)",
    period: "2025 - 2026",
    projectType: "Production Website / Event Platform",
    summary:
      "Conference website for Model United Nations IBA Karachi with registration journeys, committee pages, team pages, and sponsor visibility.",
    description:
      "A production-facing event website built for a high-traffic student conference experience.",
    goal:
      "Create a clear, fast site for delegates to understand committees, register by track, and navigate event details without friction.",
    achievement:
      "Delivered a multi-page Next.js site with dedicated registration flows, responsive layouts, and animated sections across all key information pages.",
    whatIBuilt: [
      "Landing and informational page architecture.",
      "Registration path pages for local and international delegates.",
      "Committees, team, sponsors, and contact page flows.",
      "Reusable motion-enabled UI sections for consistency.",
    ],
    features: [
      "Responsive design",
      "Registration information architecture",
      "Structured navigation",
      "Motion-enhanced sections",
    ],
    outcomes: [
      "Improved user clarity for event onboarding and participation.",
      "Maintained a strong visual identity while preserving performance.",
      "Delivered a maintainable content structure for future conference editions.",
    ],
    skillsUsed: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "UI architecture",
    ],
    links: [
      {
        label: "Live website",
        href: "https://munik.iba.edu.pk",
      },
    ],
  },
  {
    slug: "ittefaq",
    title: "Ittefaq Social Platform",
    period: "2025 - 2026",
    projectType: "Full-Stack Social Product",
    summary:
      "Map-first social app for missed-connections storytelling, with posting, comments, likes, bookmarks, and authentication.",
    description:
      "A community platform built around location-aware posts and social engagement mechanics.",
    goal:
      "Combine geolocation discovery with lightweight social interactions so users can discover nearby stories and engage safely.",
    achievement:
      "Built map browsing, post creation/editing APIs, NextAuth + credential auth paths, and Prisma-backed models for posts, comments, bookmarks, and likes.",
    whatIBuilt: [
      "Map page and location-aware story browsing.",
      "Post, comment, like, and bookmark API routes.",
      "Auth flows: registration, login, email verification, and settings endpoints.",
      "Prisma schema design for social content and relations.",
    ],
    features: [
      "Interactive map discovery",
      "Social engagement actions",
      "Authentication and profile settings",
      "Content APIs with moderation-ready data model",
    ],
    outcomes: [
      "Delivered a complete social MVP with scalable data modeling.",
      "Enabled richer user retention loops through interactions.",
      "Created a reusable foundation for location-first social products.",
    ],
    skillsUsed: [
      "Next.js",
      "NextAuth",
      "Prisma",
      "PostgreSQL",
      "Leaflet",
      "REST API development",
    ],
    links: [],
  },
  {
    slug: "api-scrapper",
    title: "API Scrapper (Security Research Dashboard)",
    period: "2025",
    projectType: "Security Tooling / Flask Dashboard",
    summary:
      "Dashboard for authorized key-leak discovery workflows: repository scraping, key pattern detection, validation, and result management.",
    description:
      "A Flask + SQLite security workflow tool created for ethical, permission-based leak detection and API key validation research.",
    goal:
      "Provide a controlled interface to scan public code sources for leaked key patterns and validate findings in an auditable way.",
    achievement:
      "Built end-to-end flow including GitHub OAuth auth, scraper workers, key validators, filtering, and dashboard state management.",
    whatIBuilt: [
      "Flask application with dashboard and status feedback.",
      "Key pattern scraping and extraction routines.",
      "Validation pipeline for multiple API key formats.",
      "SQLite-backed result storage and management controls.",
    ],
    features: [
      "GitHub OAuth",
      "Pattern-based discovery",
      "Automated key validation",
      "Result filtering and retesting",
    ],
    outcomes: [
      "Faster detection and triage of exposed key patterns.",
      "Improved repeatability for authorized security checks.",
      "Clear ethical guardrails documented in-product and in repository.",
    ],
    skillsUsed: [
      "Python",
      "Flask",
      "SQLite",
      "Security automation",
      "Validation workflow design",
      "Frontend dashboard integration",
    ],
    links: [],
    confidentialityNote:
      "Tool usage is restricted to authorized security research contexts only.",
  },
  {
    slug: "invader-shop",
    title: "Invader Shop (invader.shop)",
    period: "2025",
    projectType: "E-commerce / Full-Stack Frontend Platform",
    summary:
      "Modern Next.js commerce frontend with auth journeys, product catalog, cart/checkout, support flows, and analytics integrations.",
    description:
      "Production e-commerce platform focused on customer experience, conversion flows, and secure API communication.",
    goal:
      "Ship a responsive storefront with a smooth end-to-end purchase flow and reliable customer account management.",
    achievement:
      "Implemented product browsing, account and verification flows, cart/checkout pages, and encrypted API request/response handling in the frontend client layer.",
    whatIBuilt: [
      "Auth flow pages: signup, login, forgot-password, OTP, and verification steps.",
      "Product listing/detail and category navigation components.",
      "Cart and checkout journey with success/failure endpoints.",
      "Axios client interceptors for encrypted payload handling and token propagation.",
      "Support/contact and UX modules including chat and CAPTCHA hooks.",
    ],
    features: [
      "Customer auth lifecycle",
      "Catalog + product detail experience",
      "Cart and checkout flow",
      "Encrypted API transport layer",
      "Support and trust UX components",
    ],
    outcomes: [
      "Delivered full customer journey from landing to purchase confirmation.",
      "Improved frontend security posture for transport data.",
      "Built reusable components for long-term storefront iteration.",
    ],
    skillsUsed: [
      "Next.js",
      "React",
      "TypeScript",
      "Axios interceptors",
      "State management",
      "E-commerce UX architecture",
    ],
    links: [
      {
        label: "Live website",
        href: "https://invader.shop",
      },
    ],
  },
  {
    slug: "rocklist",
    title: "Rocklist Marketplace",
    period: "2025",
    projectType: "Marketplace / Admin + Moderation Platform",
    summary:
      "Marketplace application with seller listings, category management, reviews, report workflows, and admin moderation dashboards.",
    description:
      "A marketplace web app combining user-side listing workflows and an admin control plane for quality and safety.",
    goal:
      "Enable listing-based commerce while keeping moderation, abuse handling, and admin visibility built into the product core.",
    achievement:
      "Implemented role-aware data model and API surfaces for users, listings, categories, reports, and admin operations across the Next.js app.",
    whatIBuilt: [
      "Prisma schema for users, categories, ad listings, reports, and review relations.",
      "Admin dashboard pages for users, listings, reports, and overview metrics.",
      "Admin API routes for moderation actions and operational controls.",
      "Auth workflows with registration, verification, and session layers.",
    ],
    features: [
      "Marketplace listing lifecycle",
      "Category management",
      "Reporting/moderation flows",
      "Admin analytics and controls",
    ],
    outcomes: [
      "Delivered both user marketplace workflows and operational moderation tooling.",
      "Created scalable schema for future marketplace feature growth.",
      "Reduced operational blind spots by surfacing report and listing states.",
    ],
    skillsUsed: [
      "Next.js",
      "Prisma",
      "PostgreSQL",
      "Admin workflow design",
      "Auth and authorization",
      "API route architecture",
    ],
    links: [],
  },
  {
    slug: "decentralized-insurance-fyp",
    title: "Decentralized Crypto Asset Insurance (FYP)",
    period: "2024",
    projectType: "Final Year Project / Full-Stack Concept Build",
    summary:
      "University capstone exploring decentralized insurance workflows for crypto assets with claim and cover-management modules.",
    description:
      "A final-year BSCS project prototype addressing trust and process transparency in crypto asset insurance.",
    goal:
      "Design and prototype an insurance workflow with digital cover management and claim assessment pathways.",
    achievement:
      "Delivered complete frontend and backend project modules including user/admin cover flows, claim submission, and supporting API endpoints.",
    whatIBuilt: [
      "React-based frontend screens for cover purchase, claims, and user home.",
      "Node backend controllers and routes for auth, claims, covers, and users.",
      "State modules for cover and wallet interactions.",
      "Project documentation and presentation for academic evaluation.",
    ],
    features: [
      "Cover purchase flow",
      "Claim submission and assessment modules",
      "Admin cover management",
      "User/account endpoints",
    ],
    outcomes: [
      "Successfully delivered BSCS capstone with practical implementation depth.",
      "Demonstrated system design and full-stack execution for a complex domain.",
      "Provided a foundation for extending into production-grade architecture.",
    ],
    skillsUsed: [
      "React",
      "Node.js",
      "Express",
      "REST APIs",
      "State management",
      "System design",
    ],
    links: [
      {
        label: "Frontend repository",
        href: "https://github.com/khizarahmedb/DecentralizedInsurance",
      },
      {
        label: "Backend repository",
        href: "https://github.com/khizarahmedb/decentralizedInsurance-backend",
      },
    ],
  },
];

export const skills = {
  languages: [
    "JavaScript",
    "TypeScript",
    "Python",
    "C",
    "C#",
    "C++",
    "PHP",
    "SQL",
    "Bash",
    "Go",
    "Java",
  ],
  frontend: [
    "React",
    "Next.js",
    "Tailwind CSS",
    "Framer Motion",
    "React Hook Form",
    "Zustand",
    "Leaflet / React-Leaflet",
    "Responsive UI engineering",
    "Component-driven UI architecture",
    "App Router architecture (Next.js)",
  ],
  backend: [
    "Node.js",
    "Express.js",
    "Flask",
    "ASP.NET Core",
    "EF Core",
    "FastAPI",
    "REST API design",
    "JWT / OAuth2 authentication",
    "NextAuth auth flows",
    "Role-based access control (RBAC)",
    "API connector architecture",
    "Cron and worker services",
  ],
  dataAndStorage: [
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "SQLite",
    "Redis",
    "Prisma ORM",
    "SQL query optimization",
    "Data normalization pipelines",
    "Reporting data models",
    "Analytics schema mapping",
  ],
  devopsAndInfra: [
    "Docker",
    "Docker Compose",
    "Kubernetes",
    "Nginx reverse proxy",
    "PM2 process management",
    "Linux server management",
    "Vercel deployments",
    "Netlify deployments",
    "Environment and secret management",
    "CI/CD with GitHub Actions",
    "Build/release troubleshooting",
    "Domain and SSL setup",
  ],
  architectureAndPatterns: [
    "Modular monolith architecture",
    "Service-layer backend design",
    "Repository/data-access pattern",
    "Adapter/connector pattern",
    "API-first product design",
    "Feature-driven frontend structure",
    "State management patterns",
    "Pipeline and scheduler architecture",
    "Event/alert workflow orchestration",
    "Scalability and maintainability planning",
  ],
  qaAndSecurity: [
    "Application security testing",
    "API security testing",
    "Authorization boundary analysis",
    "Exploit path validation",
    "Vulnerability reporting and remediation rechecks",
    "Test strategy design",
    "Unit and integration testing",
    "Cypress component and flow testing",
    "Rate limiting and abuse protection patterns",
    "Secure API transport handling",
  ],
  automationAndAnalytics: [
    "Marketing reporting automation",
    "PnL automation workflows",
    "Forecasting automation",
    "Attribution/indexing pipelines",
    "Slack alerting integrations",
    "Shopify connector integration",
    "TripleWhale connector integration",
    "Google Ads data integration",
    "Meta paid-media data integration",
    "Looker-ready feed preparation",
    "Executive dashboard reporting",
  ],
  frameworks: [
    "Next.js",
    "React",
    "Node.js",
    "ASP.NET Core",
    "EF Core",
    "Cypress",
  ],
  delivery: ["Technical documentation", "Performance optimization", "Accessibility"],
};
