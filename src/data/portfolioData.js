export const projectProfiles = [
  {
    id: 'Nft',
    title: 'MUNIK XVI (munik.iba.edu.pk)',
    period: '2025 - 2026',
    projectType: 'Production Website / Event Platform',
    summary: 'Production conference website for MUNIK XVI covering delegate onboarding, committee discovery, registration, and sponsor visibility.',
    description: 'Built as a multi-page Next.js event platform with structured navigation, responsive sections, and motion-driven UI components.',
    goal: 'Make conference information and registration steps clear for local and international delegates while keeping content easy to maintain for future editions.',
    achievement: 'Delivered a complete public event website with dedicated registration tracks, committee pages, team/sponsor sections, and contact flows.',
    whatIBuilt: [
      'Landing and information architecture for event discovery and orientation.',
      'Registration pages for local and international delegates, with step-by-step process detail.',
      'Committees catalog pages with category grouping and study-guide-ready structure.',
      'Meet-the-team, sponsors, about, and contact experiences with shared layout patterns.',
      'Reusable motion-enabled sections (Hero, Section, FadeIn, marquee components) across pages.'
    ],
    outcomes: [
      'Improved onboarding clarity for delegates and head delegates.',
      'Created a maintainable page structure for future conference cycles.',
      'Preserved visual quality while keeping mobile/desktop usability strong.'
    ],
    skillsUsed: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    url: 'https://munik.iba.edu.pk',
    references: [
      { label: 'Live website', url: 'https://munik.iba.edu.pk' }
    ]
  },
  {
    id: 'Note',
    title: 'Invader Shop (invader.shop)',
    period: '2025',
    projectType: 'E-commerce / Full-Stack Frontend Platform',
    summary: 'Commerce frontend with full auth lifecycle, catalog/search flows, cart/checkout, support modules, and encrypted API transport.',
    description: 'Implemented on Next.js with route-based journeys and a large API client layer for product, auth, wallet, and checkout operations.',
    goal: 'Ship a reliable storefront journey from discovery to payment while improving transport security and auth/account robustness.',
    achievement: 'Delivered full customer flow: signup/login, 2FA/OTP and verification, product detail/search, cart, checkout success/failure, and support requests.',
    whatIBuilt: [
      'Auth journeys: signup, login, forgot password, OTP validation, two-factor auth, magic-link login, and email verification.',
      'Product experiences: category browsing, best-selling/new-arrivals, hash-based product pages, and search components.',
      'Purchase flow: cart, checkout, success/failure handling, and payment follow-up endpoints.',
      'Customer utilities: support/ticket and replacement request flows.',
      'Axios + crypto transport layer with encrypted payload handling and token propagation headers.'
    ],
    outcomes: [
      'Delivered complete customer journey from landing to purchase.',
      'Improved frontend security posture for data transport.',
      'Built a reusable client/API foundation for new storefront features.'
    ],
    skillsUsed: ['Next.js', 'React', 'TypeScript', 'Axios interceptors', 'State management'],
    url: 'https://invader.shop',
    references: [
      { label: 'Live website', url: 'https://invader.shop' }
    ]
  },
  {
    id: 'AiAgent',
    title: 'TripleWhale Assistant',
    period: '2026',
    projectType: 'Full-Stack Product / Analytics Assistant',
    summary: 'Store-scoped marketing analytics assistant with planning/runs/chat workflows, connector integrations, and dual inference backends.',
    description: 'Deployable Next.js + TypeScript app using App Router, tRPC + React Query, and scheduler workers for analytics operations.',
    goal: 'Unify planning, execution, and communication for analytics/reporting work without context switching across disconnected tools.',
    achievement: 'Shipped planner, task-run history, chat sessions, store switching, and API surfaces for metrics, tasks, runs, Slack preview/send, and backend status.',
    whatIBuilt: [
      'Task planner and run APIs (`/api/tasks`, `/api/tasks/plan`, `/api/tasks/:taskId/run`, preview/run history routes).',
      'Chat session/message flows with backend switching and status endpoints.',
      'Connector abstractions for TripleWhale and Shopify metrics pipelines.',
      'tRPC + TanStack React Query data flow for typed, batched UI operations.',
      'Scheduler and cron worker scripts for recurring operational tasks.'
    ],
    outcomes: [
      'Unified planning, execution, and reporting in one workspace.',
      'Reduced operator handoff friction with reusable automation flows.',
      'Created a deployable foundation for store-aware analytics operations.'
    ],
    skillsUsed: ['Next.js', 'TypeScript', 'API design', 'PostgreSQL', 'Scheduler workflows'],
    confidentialityNote: 'Connector credentials and live store payload details are intentionally private.'
  },
  {
    id: 'AgentConfig',
    title: 'Public AI Config (agents-config)',
    period: '2026',
    projectType: 'Developer Tooling / Configuration Architecture',
    summary: 'Reusable cross-repo configuration system for AI coding agents with deterministic setup and policy enforcement.',
    description: 'Published templates, setup instructions, and bootstrap scripts to standardize AGENTS behavior across repositories and tools.',
    goal: 'Reduce setup drift and make agent configuration consistent across local and remote repo contexts.',
    achievement: 'Documented copy-paste setup flow plus idempotent scripts for repo bootstrap, ignore policy, and consistency validation.',
    whatIBuilt: [
      'Canonical AGENTS templates and notes patterns.',
      'Tool-agnostic setup instructions for macOS/Linux, Ubuntu, and Windows.',
      'Bootstrap scripts (`apply_repo_agent_policy`) for consistent repo setup.',
      'Instruction precedence model for local/global behavior.',
      'Daily sync process for shared read-only standards.',
      'Validation scripts for setup consistency checks.'
    ],
    outcomes: [
      'Reduced configuration drift across repos.',
      'Faster onboarding for agent-assisted development workflows.',
      'Made multi-tool setup behavior predictable and auditable.'
    ],
    skillsUsed: ['Shell scripting', 'Configuration design', 'Git workflows', 'Developer enablement'],
    url: 'https://github.com/khizarahmedb/agents-config',
    references: [
      { label: 'Repository', url: 'https://github.com/khizarahmedb/agents-config' }
    ]
  },
  {
    id: 'BunBranch',
    title: 'Agents Config (bun branch)',
    period: '2026',
    projectType: 'Developer Tooling / Branch Variant',
    summary: 'Bun-focused variant of the agents-config system to preserve workflow parity across runtimes.',
    description: 'Extended core agent-config patterns with Bun-compatible setup paths while keeping behavior aligned with the main branch.',
    goal: 'Support teams using Bun without splitting operational behavior from the primary configuration standard.',
    achievement: 'Maintained branch-specific compatibility with shared templates, precedence rules, and setup expectations.',
    whatIBuilt: [
      'Bun runtime compatibility path for setup commands.',
      'Branch-specific instruction and bootstrap variants.',
      'Workflow parity checks against the main config branch.'
    ],
    outcomes: [
      'Expanded runtime support for contributors using Bun.',
      'Kept branch behavior aligned with core standards.'
    ],
    skillsUsed: ['Bun', 'Shell scripting', 'Config management'],
    url: 'https://github.com/khizarahmedb/agents-config/tree/bun',
    references: [
      { label: 'Bun branch', url: 'https://github.com/khizarahmedb/agents-config/tree/bun' }
    ]
  },
  {
    id: 'PortfolioV2',
    title: 'Portfolio v2 (khizarahmed.com)',
    period: '2026',
    projectType: 'Personal Website / Case Study Platform',
    summary: 'Personal domain portfolio with project case studies, role history, skills, and desktop-style interaction patterns.',
    description: 'Maintained as a multi-branch portfolio system (experimental layouts, structure-lab, windows95 shell) with shared project narratives.',
    goal: 'Provide a single public domain for clear technical storytelling and recruiter-friendly project visibility.',
    achievement: 'Consolidated project narratives, CV context, and interactive UI experiments into one domain-focused portfolio stack.',
    whatIBuilt: [
      'Reusable project profile data model used across branch variants.',
      'Windows95-style desktop navigation with draggable/resizable windows.',
      'Structured project detail windows with outcomes, skills, and links.',
      'Cross-branch content updates to keep role/project text aligned.'
    ],
    outcomes: [
      'Clearer communication of project scope and delivery impact.',
      'Single source of truth for profile, skills, and case studies.',
      'Public domain routing for direct portfolio access.'
    ],
    skillsUsed: ['React', 'Vite', 'Content architecture', 'UI design', 'Interaction design'],
    url: 'https://khizarahmed.com',
    references: [
      { label: 'Live domain', url: 'https://khizarahmed.com' },
      { label: 'Source repository', url: 'https://github.com/khizarahmedb/portfolio' }
    ]
  },
  {
    id: '3dObject',
    title: 'Decentralized Crypto Asset Insurance (FYP)',
    period: '2024',
    projectType: 'Final Year Project / Full-Stack Concept Build',
    summary: 'BSCS capstone prototype exploring transparent crypto-asset insurance workflows from cover purchase through claim handling.',
    description: 'Frontend React app connected to Node/Express backend services for auth, cover management, user handling, and claims.',
    goal: 'Prototype a practical insurance workflow that improves transparency for digital-asset cover and claim lifecycle handling.',
    achievement: 'Delivered complete academic capstone scope with production-style modules across frontend screens, backend APIs, and state management.',
    whatIBuilt: [
      'Frontend modules for Cover Purchase, Buy Covers, Submit Claim, Claim Assessment, Admin Covers, and User Home.',
      'State management modules for cover/admin/wallet workflows.',
      'Backend integration across auth, cover, claim, and user route groups.',
      'Academic delivery artifacts and demonstrable end-to-end feature flow.'
    ],
    outcomes: [
      'Delivered a complete BSCS capstone with practical implementation depth.',
      'Demonstrated end-to-end full-stack system design and execution.',
      'Established a base architecture extensible beyond academic scope.'
    ],
    skillsUsed: ['React', 'Node.js', 'Express', 'REST APIs', 'System design'],
    url: 'https://github.com/khizarahmedb/DecentralizedInsurance',
    references: [
      { label: 'Frontend repository', url: 'https://github.com/khizarahmedb/DecentralizedInsurance' },
      { label: 'Backend repository', url: 'https://github.com/khizarahmedb/decentralizedInsurance-backend' }
    ]
  },
  {
    id: 'Fortune',
    title: 'Insurance Backend API',
    period: '2024',
    projectType: 'Backend API / Claims + Covers',
    summary: 'Express + MongoDB API service for decentralized insurance admin/auth, cover CRUD, claim lifecycle, and user endpoints.',
    description: 'Backend powers the FYP insurance product with JWT auth, route controllers, and model-driven operations.',
    goal: 'Provide stable service endpoints for cover creation/updates, claim submissions, and user/account workflows.',
    achievement: 'Implemented route groups (`/auth`, `/cover`, `/claim`, `/user`) with dedicated controllers and MongoDB models.',
    whatIBuilt: [
      'Authentication flows using bcrypt password hashing and JWT issuance.',
      'Cover endpoints: create, list, update, and delete.',
      'Claim endpoints: create, fetch single/all, update status, and delete.',
      'User/admin models and controller organization for maintainable backend flow.'
    ],
    outcomes: [
      'Enabled complete backend workflow for capstone product scope.',
      'Established maintainable route/controller organization.',
      'Provided reusable service foundation for future product iterations.'
    ],
    skillsUsed: ['Node.js', 'Express', 'REST API design'],
    url: 'https://github.com/khizarahmedb/decentralizedInsurance-backend',
    references: [
      { label: 'Backend repository', url: 'https://github.com/khizarahmedb/decentralizedInsurance-backend' }
    ]
  },
  {
    id: 'PixelPic',
    title: 'QA + Application Security Audit Execution',
    period: '2026',
    projectType: 'QA / AppSec Execution',
    summary: 'Sanitized, portfolio-safe QA/AppSec engagement report covering discovery, exploitation validation, and remediation recheck.',
    description: 'Executed iterative QA and application security validation on web and API surfaces, then documented engineering-ready remediation guidance.',
    goal: 'Identify high-impact issues, verify exploitability, and provide actionable recheck-ready reports for engineering teams.',
    achievement: 'Closed a full test lifecycle: baseline recon, exploit confirmation, tooling-assisted validation, and remediation verification.',
    whatIBuilt: [
      'Risk-ranked finding register with exploit preconditions and impact narrative.',
      'Web/API validation notes with reproducible testing paths.',
      'Evidence index and redaction-safe report package.',
      'Pre-fix vs post-fix remediation recheck matrix.'
    ],
    outcomes: [
      'Verified 8 findings including 2 critical account-impact paths.',
      'Delivered implementation guidance for engineering follow-up.',
      'Produced reusable QA/AppSec report format for future engagements.'
    ],
    skillsUsed: ['QA strategy', 'API security testing', 'Authorization analysis', 'Remediation validation'],
    confidentialityNote: 'Sensitive report details are shared only on direct request.'
  },
  {
    id: 'D2CAutomation',
    title: 'D2C Marketing Automation Platform',
    period: '2025 - Present',
    projectType: 'Automation / Data Engineering / Marketing Ops',
    summary: 'Large script portfolio for paid-media analytics, PnL tracking, forecasting, indexing, and alerting across multiple operating cadences.',
    description: 'Built and operated JavaScript/Python automation scripts across daily, hourly, weekly, and backfill workflows.',
    goal: 'Replace manual reporting with reliable script-driven pipelines that deliver fast decision-ready metrics to growth and finance teams.',
    achievement: 'Standardized reporting outputs, reduced reporting latency by 90%, and established repeatable automation patterns for new metrics.',
    whatIBuilt: [
      'PnL extraction/backfill scripts (`PNL/fetch_*`, `backfill_*`) across regions/windows.',
      'Executive reporting workflows (`cmo-daily`, `cmo-reporting`, `cmo-reporting-weekly`, `looker-cmo-reporting`).',
      'Hourly monitoring and anomaly alert scripts (`hourlyreportingv2`, `alerts-engine`, `meta-threshold-alerts`).',
      'Indexing and attribution pipelines (`indexing/*`, rolling/prescient/post-purchase variants).',
      'Attach-rate and merchandising analysis automation (`flo-attach-rate-automation`).'
    ],
    features: [
      'Scheduled multi-frequency script orchestration',
      'Cross-source data normalization',
      'Alert routing for spend drops and tracking failures',
      'Executive summary generation for CMO and growth reviews'
    ],
    outcomes: [
      'Reduced reporting cycle time by 90%.',
      'Standardized decision metrics across finance and marketing.',
      'Improved operational visibility through scheduled alerting and compact report formats.'
    ],
    scriptUseCases: [
      { script: 'Daily PnL Reconciliation', useCase: 'Automates paid media spend, margin, and order-value reconciliation across stores.' },
      { script: 'Historical Backfill Jobs', useCase: 'Repairs delayed reporting windows so long-term trends remain decision-ready.' },
      { script: 'CMO Daily Report Pack', useCase: 'Generates leadership-ready daily snapshots of channel movement and risk signals.' },
      { script: 'Hourly Performance Monitor', useCase: 'Runs hourly checks for sudden spend/performance anomalies and sends alerts.' },
      { script: 'Attach-Rate Analysis Pack', useCase: 'Produces repeatable attach-rate and bundle-performance reviews for merchandising.' },
      { script: 'Forecast and Pacing Runner', useCase: 'Builds pacing and forecast snapshots for planning and inventory coordination.' }
    ],
    skillsUsed: ['JavaScript automation', 'Python scripting', 'Data transformation', 'Business intelligence'],
    confidentialityNote: 'Store/company identifiers are anonymized.'
  },
  {
    id: 'Ittefaq',
    title: 'Ittefaq Social Platform',
    period: '2025 - 2026',
    projectType: 'Full-Stack Social Product',
    summary: 'Map-first social platform (repo: `heystranger`, package: `ittefaq`) with story posts, nested comments, likes, bookmarks, and auth.',
    description: 'Next.js social app centered around geolocation-aware storytelling and lightweight engagement loops.',
    goal: 'Build a location-aware social MVP where users can post, discover, and interact safely through account-scoped actions.',
    achievement: 'Implemented full social data model with role-aware users, map flows, and API routes for posts/comments/likes/bookmarks/auth.',
    whatIBuilt: [
      'Map and story browsing flows (`/map`, `map-section`, location picker, story card flows).',
      'Post APIs for create/list/detail/update-ready routing and per-post retrieval (`/api/posts`, `/api/posts/[id]`).',
      'Interaction APIs for comments, likes, bookmarks, and user interaction snapshots.',
      'Auth endpoints for register/login/verify-email/settings and NextAuth integration.',
      'Prisma schema for users, posts, comments (with nested replies), bookmarks, likes, and OAuth accounts.'
    ],
    outcomes: [
      'Delivered complete social MVP architecture.',
      'Created foundation for scalable location-first interactions.',
      'Established reusable schema and route patterns for future moderation and growth features.'
    ],
    skillsUsed: ['Next.js', 'NextAuth', 'Prisma', 'PostgreSQL', 'Leaflet'],
    url: 'https://github.com/khizarahmedb/heystranger',
    references: [
      { label: 'Repository', url: 'https://github.com/khizarahmedb/heystranger' }
    ]
  },
  {
    id: 'Rocklist',
    title: 'Rocklist Marketplace',
    period: '2025',
    projectType: 'Marketplace / Admin + Moderation Platform',
    summary: 'Marketplace app with listing lifecycle, categories, reviews/reports, and a full admin moderation/control plane.',
    description: 'Next.js + Prisma platform with separated user/admin workflows and moderation-focused API surfaces.',
    goal: 'Enable listing-based commerce while keeping moderation and operational visibility first-class.',
    achievement: 'Implemented role-aware schema and route groups for admin users, listings, categories, reports, and overview dashboards.',
    whatIBuilt: [
      'Prisma schema for users, categories, listings, reports, reviews, sessions, and role-based status enums.',
      'Admin pages and APIs for users/listings/reports/categories/overview metrics.',
      'Auth workflows: register/login/verify-email and admin login separation.',
      'Moderation actions for report handling and listing governance.'
    ],
    outcomes: [
      'Delivered full user and admin workflows for marketplace operations.',
      'Improved moderation visibility and control surfaces.',
      'Provided scalable data model for future marketplace growth.'
    ],
    skillsUsed: ['Next.js', 'Prisma', 'PostgreSQL', 'API route architecture'],
    url: 'https://github.com/khizarahmedb/rocklist',
    references: [
      { label: 'Repository', url: 'https://github.com/khizarahmedb/rocklist' }
    ]
  },
  {
    id: 'ApiScrapper',
    title: 'API Scrapper (Security Research Dashboard)',
    period: '2025',
    projectType: 'Security Tooling / Flask Dashboard',
    summary: 'Flask dashboard for authorized API key leak discovery, pattern extraction, validation, and triage management.',
    description: 'Security research tool with explicit ethical use boundaries and OAuth-assisted GitHub scraping workflow.',
    goal: 'Provide a controlled workflow for permission-based key leak discovery and validation without ad-hoc scripts.',
    achievement: 'Delivered end-to-end flow for scraping, key testing, result filtering, and persistent finding management.',
    whatIBuilt: [
      'Flask dashboard with status feedback and workflow controls.',
      'GitHub OAuth integration for improved API access and scraping workflow.',
      'Key-pattern scraping/extraction for OpenAI, xAI, and Gemini style formats.',
      'Validation pipeline and manual retest flows for discovered keys.',
      'SQLite-backed storage for findings, status updates, and lifecycle actions.'
    ],
    outcomes: [
      'Faster triage for authorized leak detection workflows.',
      'Improved repeatability for ethical security checks.',
      'Embedded legal/ethical constraints into project documentation and usage flow.'
    ],
    skillsUsed: ['Python', 'Flask', 'SQLite', 'Security automation'],
    url: 'https://github.com/khizarahmedb/api-scrapper',
    references: [
      { label: 'Repository', url: 'https://github.com/khizarahmedb/api-scrapper' }
    ],
    confidentialityNote: 'Use restricted to authorized security research contexts.'
  },
  {
    id: 'Github',
    title: 'Khizar Ahmed - GitHub Profile',
    period: 'Active',
    projectType: 'Public Profile',
    summary: 'Primary profile for public repositories and engineering artifacts.',
    whatIBuilt: [
      'Maintained public repositories with portfolio-safe content.',
      'Published project references and branch variants where applicable.'
    ],
    outcomes: [
      'Provides a central public index for technical work.',
      'Supports recruiter and engineering review workflows.'
    ],
    skillsUsed: ['Git', 'Repository hygiene', 'Documentation'],
    url: 'https://github.com/khizarahmedb'
  },
  {
    id: 'LinkedIn',
    title: 'Khizar Ahmed - LinkedIn',
    period: 'Active',
    projectType: 'Professional Profile',
    summary: 'Professional profile with role history and contact channels.',
    whatIBuilt: [
      'Maintained up-to-date role and impact summaries.',
      'Published outreach-friendly profile for hiring workflows.'
    ],
    outcomes: [
      'Faster context for collaborators and hiring teams.',
      'Improved discoverability for relevant opportunities.'
    ],
    skillsUsed: ['Technical communication', 'Career narrative'],
    url: 'https://www.linkedin.com/in/khizar-ahmed-0a62841b5/'
  },
  {
    id: 'CV',
    title: 'Khizar Ahmed - CV Overview',
    period: '2026',
    projectType: 'Experience Summary',
    summary: 'In-app CV overview with experience, education, impact, and skills highlights.',
    whatIBuilt: [
      'Structured role history with timeline-ready bullet points.',
      'Impact snapshot sections and contact-ready summary blocks.'
    ],
    outcomes: [
      'Accessible profile details without downloading files.',
      'Cleaner portfolio UX for desktop-style navigation.'
    ],
    skillsUsed: ['Technical writing', 'Information architecture'],
    confidentialityNote: 'Detailed attachments are shared on direct request.'
  }
];

export const skillCatalog = {
  languages: ['JavaScript', 'TypeScript', 'Python', 'C', 'C#', 'C++', 'PHP', 'SQL', 'Bash', 'Java'],
  frontend: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'React Hook Form', 'Zustand', 'Leaflet / React-Leaflet', 'Responsive UI engineering', 'Component-driven UI architecture', 'App Router architecture (Next.js)'],
  backend: ['Node.js', 'Express.js', 'Flask', 'ASP.NET Core', 'EF Core', 'FastAPI', 'REST API design', 'JWT / OAuth2 authentication', 'NextAuth auth flows', 'Role-based access control (RBAC)', 'API connector architecture', 'Cron and worker services'],
  data: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite', 'Redis', 'Prisma ORM', 'SQL query optimization', 'Data normalization pipelines', 'Reporting data models', 'Analytics schema mapping'],
  qaSecurity: ['Application security testing', 'API security testing', 'Authorization boundary analysis', 'Exploit path validation', 'Vulnerability reporting and remediation rechecks', 'Test strategy design', 'Unit and integration testing', 'Cypress component and flow testing', 'Rate limiting and abuse protection patterns', 'Secure API transport handling'],
  automation: ['Marketing reporting automation', 'PnL automation workflows', 'Forecasting automation', 'Attribution/indexing pipelines', 'Slack alerting integrations', 'Shopify connector integration', 'TripleWhale connector integration', 'Google Ads data integration', 'Meta paid-media data integration', 'Looker-ready feed preparation', 'Executive dashboard reporting'],
  infra: ['Docker', 'Docker Compose', 'Nginx reverse proxy', 'PM2 process management', 'Linux server management', 'Vercel deployments', 'Netlify deployments', 'Environment and secret management', 'CI/CD with GitHub Actions', 'Build/release troubleshooting', 'Domain and SSL setup'],
  architecture: ['Modular monolith architecture', 'Service-layer backend design', 'Repository/data-access pattern', 'Adapter/connector pattern', 'API-first product design', 'Feature-driven frontend structure', 'State management patterns', 'Pipeline and scheduler architecture', 'Event/alert workflow orchestration', 'Scalability and maintainability planning'],
  frameworks: ['Next.js', 'React', 'Node.js', 'ASP.NET Core', 'EF Core', 'Cypress'],
  delivery: ['Technical documentation', 'Performance optimization', 'Accessibility']
};
