const projects = [
  {
    name: "Realtime Collaboration Suite",
    description:
      "Multi-tenant workspace with live cursors, shared canvases, and role-based permissions.",
    highlight: "Reduced customer onboarding time by 35%.",
  },
  {
    name: "AI Onboarding Platform",
    description:
      "Personalized product tours powered by adaptive prompts and behavioral analytics.",
    highlight: "Improved activation rate by 28%.",
  },
  {
    name: "Telemetry Insights Hub",
    description:
      "Dashboarding and alerting for distributed services with automated SLO reports.",
    highlight: "Cut incident resolution time by 40%.",
  },
];

export default function ProjectsPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Projects</p>
        <h1 className="text-2xl font-semibold text-white">Selected work</h1>
        <p className="text-sm text-zinc-400">
          A snapshot of products and platforms I’ve shipped recently.
        </p>
      </header>
      <div className="grid gap-4">
        {projects.map((project) => (
          <div
            key={project.name}
            className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5"
          >
            <h2 className="text-lg font-semibold text-white">{project.name}</h2>
            <p className="mt-2 text-sm text-zinc-400">{project.description}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-zinc-500">
              {project.highlight}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
