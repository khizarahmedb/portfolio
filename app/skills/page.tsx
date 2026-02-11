import { skills } from "../content/portfolio";

type SkillGroup = {
  title: string;
  description: string;
  items: string[];
};

const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    description: "Core programming languages used across product, automation, and backend delivery.",
    items: skills.languages,
  },
  {
    title: "Frontend Engineering",
    description: "UI frameworks, interaction systems, and app architecture patterns for web products.",
    items: skills.frontend,
  },
  {
    title: "Backend and APIs",
    description: "Server frameworks, API patterns, auth, and integration architecture.",
    items: skills.backend,
  },
  {
    title: "Data and Storage",
    description: "Databases, schema tooling, and analytics/reporting data modeling.",
    items: skills.dataAndStorage,
  },
  {
    title: "DevOps and Infra",
    description:
      "Deployment and server operations including Docker, Nginx, PM2, Linux ops, and CI/CD.",
    items: skills.devopsAndInfra,
  },
  {
    title: "Architecture Patterns",
    description: "Software architecture and system design patterns used in production work.",
    items: skills.architectureAndPatterns,
  },
  {
    title: "QA and Security",
    description: "QA execution, security validation, and remediation-oriented testing workflows.",
    items: skills.qaAndSecurity,
  },
  {
    title: "Automation and Analytics",
    description: "D2C marketing automation, reporting pipelines, and BI-oriented integrations.",
    items: skills.automationAndAnalytics,
  },
];

function SkillColumn({ title, description, items }: SkillGroup) {
  return (
    <article className="skills-card">
      <h2>{title}</h2>
      <p className="skills-description">{description}</p>
      <div className="chip-wrap">
        {items.map((item) => (
          <span key={item} className="chip">
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function SkillsPage() {
  return (
    <section className="page-stack">
      <header className="hero-block compact">
        <p className="hero-kicker">Skills</p>
        <h1>Engineering Capability Matrix</h1>
        <p className="hero-summary">
          Expanded from project work across this GitHub workspace, CV history,
          and shipped portfolio systems.
        </p>
      </header>

      <div className="skills-grid expanded">
        {skillGroups.map((group) => (
          <SkillColumn key={group.title} {...group} />
        ))}
      </div>
    </section>
  );
}
