export default function ContactPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Contact</p>
        <h1 className="text-2xl font-semibold text-white">Let’s connect</h1>
        <p className="text-sm text-zinc-400">
          I’m open to freelance and full-time opportunities.
        </p>
      </header>
      <div className="space-y-4">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5">
          <p className="text-sm text-zinc-300">Email</p>
          <p className="text-base font-semibold text-white">hello@yourdomain.dev</p>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5">
          <p className="text-sm text-zinc-300">Location</p>
          <p className="text-base font-semibold text-white">Remote · EST/UTC-5</p>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-5">
          <p className="text-sm text-zinc-300">Response time</p>
          <p className="text-base font-semibold text-white">Within 48 hours</p>
        </div>
      </div>
    </section>
  );
}
