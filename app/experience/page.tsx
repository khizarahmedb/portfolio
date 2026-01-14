const experience = [
  {
    role: "Senior Software Engineer · Aurora Labs",
    period: "2023 — Present",
    summary:
      "Led a platform rebuild, introduced typed API contracts, and coached a growing frontend team.",
  },
  {
    role: "Full-Stack Engineer · Fieldstone",
    period: "2021 — 2023",
    summary:
      "Built data ingestion pipelines and a unified insights dashboard for enterprise clients.",
  },
  {
    role: "Frontend Engineer · Willow Studio",
    period: "2019 — 2021",
    summary:
      "Shipped a design system and improved page performance across a multi-brand SaaS suite.",
  },
];

export default function ExperiencePage() {
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Experience</p>
        <h1 className="text-2xl font-semibold text-white">Career highlights</h1>
        <p className="text-sm text-zinc-400">
          A quick timeline of the teams and outcomes I’ve contributed to.
        </p>
      </header>
      <div className="grid gap-4">
        {experience.map((item) => (
          <div
            key={item.role}
            className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5"
          >
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-zinc-500">
              <span>{item.period}</span>
            </div>
            <h2 className="mt-2 text-lg font-semibold text-white">{item.role}</h2>
            <p className="mt-2 text-sm text-zinc-400">{item.summary}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
