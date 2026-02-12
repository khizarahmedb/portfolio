export const projectProfiles = [
  {
    id: 'Nft',
    title: 'MUNIK XVI (munik.iba.edu.pk)',
    period: '2025 - 2026',
    projectType: 'Production Website / Event Platform',
    summary: 'Conference website with registration journeys, committees, team pages, and sponsor visibility.',
    whatIBuilt: [
      'Landing and information architecture for event discovery.',
      'Registration pages for local and international delegates.',
      'Committees, team, sponsors, and contact flows.',
      'Reusable motion-enabled UI sections across pages.'
    ],
    outcomes: [
      'Improved onboarding clarity for participants.',
      'Delivered responsive, maintainable pages for future editions.'
    ],
    skillsUsed: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    url: 'https://munik.iba.edu.pk'
  },
  {
    id: 'Note',
    title: 'Invader Shop (invader.shop)',
    period: '2025',
    projectType: 'E-commerce / Full-Stack Frontend Platform',
    summary: 'Modern commerce frontend with auth, catalog, cart/checkout, and secure API handling.',
    whatIBuilt: [
      'Signup/login/forgot-password/verification journeys.',
      'Product listing, details, categories, and cart flow.',
      'Checkout pages and order success/failure handling.',
      'Encrypted API transport layer with token propagation.'
    ],
    outcomes: [
      'Delivered complete customer journey from landing to purchase.',
      'Improved frontend security posture for data transport.'
    ],
    skillsUsed: ['Next.js', 'React', 'TypeScript', 'Axios interceptors', 'State management'],
    url: 'https://invader.shop'
  },
  {
    id: 'AiAgent',
    title: 'TripleWhale Assistant',
    period: '2026',
    projectType: 'Full-Stack Product / Analytics Assistant',
    summary: 'Analytics assistant with task planning, report runs, chat sessions, and connector-backed workflows.',
    whatIBuilt: [
      'Task planning and run APIs with persistent state.',
      'Chat sessions and message APIs for context-aware assistance.',
      'Connector abstractions for analytics and store data.',
      'Scheduler and worker scripts for recurring ops workflows.'
    ],
    outcomes: [
      'Unified planning, execution, and reporting in one workspace.',
      'Reduced operator handoff friction with reusable automation flows.'
    ],
    skillsUsed: ['Next.js', 'TypeScript', 'API design', 'PostgreSQL', 'Scheduler workflows'],
    confidentialityNote: 'Product details are available on request.'
  },
  {
    id: 'AgentConfig',
    title: 'Public AI Config (agents-config)',
    period: '2026',
    projectType: 'Developer Tooling / Configuration Architecture',
    summary: 'Reusable cross-repo configuration standard for AI coding agents.',
    whatIBuilt: [
      'Canonical AGENTS templates and notes patterns.',
      'Tool-agnostic bootstrap setup script.',
      'Instruction precedence model for local/global behavior.',
      'Daily sync process for shared read-only standards.'
    ],
    outcomes: [
      'Reduced configuration drift across repos.',
      'Faster onboarding for agent-assisted development workflows.'
    ],
    skillsUsed: ['Shell scripting', 'Configuration design', 'Git workflows', 'Developer enablement'],
    url: 'https://github.com/khizarahmedb/agents-config'
  },
  {
    id: 'BunBranch',
    title: 'Agents Config (bun branch)',
    period: '2026',
    projectType: 'Developer Tooling / Branch Variant',
    summary: 'Bun-focused branch variant of the agent configuration workflow.',
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
    url: 'https://github.com/khizarahmedb/agents-config/tree/bun'
  },
  {
    id: 'PortfolioV2',
    title: 'Portfolio v2',
    period: '2026',
    projectType: 'Personal Website / Next.js',
    summary: 'Case-study portfolio with role history, skills, and project breakdowns.',
    whatIBuilt: [
      'Narrative portfolio sections for projects and experience.',
      'Reusable content-driven architecture for updates.',
      'Responsive layout and motion-enhanced interactions.'
    ],
    outcomes: [
      'Clearer communication of project scope and delivery impact.',
      'Single source of truth for profile, skills, and case studies.'
    ],
    skillsUsed: ['Next.js', 'TypeScript', 'Content architecture', 'UI design'],
    url: 'https://github.com/khizarahmedb/portfolio'
  },
  {
    id: '3dObject',
    title: 'Decentralized Crypto Asset Insurance (FYP)',
    period: '2024',
    projectType: 'Final Year Project / Full-Stack Concept Build',
    summary: 'Capstone prototype exploring transparent insurance workflows for crypto assets.',
    whatIBuilt: [
      'Frontend modules for cover purchase, claims, and user home.',
      'Backend endpoints for auth, claims, covers, and users.',
      'State modules for cover and wallet interactions.'
    ],
    outcomes: [
      'Delivered a complete BSCS capstone with practical implementation depth.',
      'Demonstrated end-to-end full-stack system design and execution.'
    ],
    skillsUsed: ['React', 'Node.js', 'Express', 'REST APIs', 'System design'],
    confidentialityNote: 'Repository links can be shared during screening on request.'
  },
  {
    id: 'Fortune',
    title: 'Insurance Backend API',
    period: '2024',
    projectType: 'Backend API / Claims + Covers',
    summary: 'Service layer for decentralized insurance workflows and claim processing.',
    whatIBuilt: [
      'Claim submission and assessment endpoints.',
      'User and policy data API routes.',
      'Operational backend modules for insurance lifecycle.'
    ],
    outcomes: [
      'Enabled complete backend workflow for capstone product scope.',
      'Established maintainable route/controller organization.'
    ],
    skillsUsed: ['Node.js', 'Express', 'REST API design'],
    confidentialityNote: 'Repository links can be shared during screening on request.'
  },
  {
    id: 'PixelPic',
    title: 'QA + Application Security Audit Execution',
    period: '2026',
    projectType: 'QA / AppSec Execution',
    summary: 'End-to-end QA and AppSec execution from finding discovery to remediation verification.',
    whatIBuilt: [
      'Risk-ranked finding catalog with exploit paths and impact context.',
      'Reproducible web and API validation notes.',
      'Pre-fix and post-fix remediation recheck matrix.'
    ],
    outcomes: [
      'Verified 8 findings including 2 critical account-impact paths.',
      'Delivered implementation guidance for engineering follow-up.'
    ],
    skillsUsed: ['QA strategy', 'API security testing', 'Authorization analysis', 'Remediation validation'],
    confidentialityNote: 'Sensitive report details are shared only on direct request.'
  },
  {
    id: 'D2CAutomation',
    title: 'D2C Marketing Automation Platform',
    period: '2025 - Present',
    projectType: 'Automation / Data Engineering / Marketing Ops',
    summary: 'Production automation for paid media, PnL reporting, forecasting, and alerting workflows.',
    whatIBuilt: [
      'PnL extraction and backfill scripts across reporting windows.',
      'Daily/weekly executive reporting workflows.',
      'Anomaly and threshold alerts with operational notifications.',
      'Reusable script catalog for rapid metric rollout.'
    ],
    outcomes: [
      'Reduced reporting cycle time by 90%.',
      'Standardized decision metrics across finance and marketing.'
    ],
    skillsUsed: ['JavaScript automation', 'Python scripting', 'Data transformation', 'Business intelligence'],
    confidentialityNote: 'Store/company identifiers are anonymized.'
  },
  {
    id: 'Ittefaq',
    title: 'Ittefaq Social Platform',
    period: '2025 - 2026',
    projectType: 'Full-Stack Social Product',
    summary: 'Map-first social app with posts, comments, likes, bookmarks, and auth flows.',
    whatIBuilt: [
      'Location-aware map browsing and story flows.',
      'Post/comment/like/bookmark APIs.',
      'Auth, verification, and account settings endpoints.',
      'Prisma schema for social interactions and relations.'
    ],
    outcomes: [
      'Delivered complete social MVP architecture.',
      'Created foundation for scalable location-first interactions.'
    ],
    skillsUsed: ['Next.js', 'NextAuth', 'Prisma', 'PostgreSQL', 'Leaflet'],
    confidentialityNote: 'Repository and deployment details available on request.'
  },
  {
    id: 'Rocklist',
    title: 'Rocklist Marketplace',
    period: '2025',
    projectType: 'Marketplace / Admin + Moderation Platform',
    summary: 'Marketplace with seller listings, category management, reports, reviews, and admin moderation tools.',
    whatIBuilt: [
      'Role-aware schema for users, listings, reports, and reviews.',
      'Admin dashboards for moderation and operations visibility.',
      'Auth and verification workflows for marketplace access.'
    ],
    outcomes: [
      'Delivered full user and admin workflows for marketplace operations.',
      'Improved moderation visibility and control surfaces.'
    ],
    skillsUsed: ['Next.js', 'Prisma', 'PostgreSQL', 'API route architecture'],
    confidentialityNote: 'Repository and deployment details available on request.'
  },
  {
    id: 'ApiScrapper',
    title: 'API Scrapper (Security Research Dashboard)',
    period: '2025',
    projectType: 'Security Tooling / Flask Dashboard',
    summary: 'Dashboard for authorized key-leak discovery, validation, and result management.',
    whatIBuilt: [
      'Flask dashboard with status feedback and workflow controls.',
      'Key-pattern scraping and extraction routines.',
      'Validation pipeline for key format checks.',
      'SQLite-backed storage for findings and retesting.'
    ],
    outcomes: [
      'Faster triage for authorized leak detection workflows.',
      'Improved repeatability for ethical security checks.'
    ],
    skillsUsed: ['Python', 'Flask', 'SQLite', 'Security automation'],
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
  infra: ['Docker', 'Docker Compose', 'Nginx reverse proxy', 'PM2 process management', 'Linux server management', 'Vercel deployments', 'Netlify deployments', 'Environment and secret management', 'CI/CD with GitHub Actions', 'Build/release troubleshooting', 'Domain and SSL setup']
};
