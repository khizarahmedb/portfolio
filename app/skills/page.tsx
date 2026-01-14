const skills = [
  "React / Next.js",
  "TypeScript",
  "Node.js & API design",
  "Postgres / SQL",
  "Cloud deployments (Vercel, AWS)",
  "Observability & performance tuning",
];

export default function SkillsPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Skills</p>
        <h1 className="text-2xl font-semibold text-white">Toolbox</h1>
        <p className="text-sm text-zinc-400">
          Focused on product engineering, performance, and reliable delivery.
        </p>
      </header>
      <div className="grid gap-3">
        {skills.map((skill) => (
          <div
            key={skill}
            className="rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3 text-sm text-zinc-200"
          >
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}
