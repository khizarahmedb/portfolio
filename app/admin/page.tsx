"use client";

export default function AdminPage() {
  return (
    <div className="border border-zinc-800 bg-zinc-950/60 px-4 py-6">
      <header className="border-b border-zinc-800 bg-zinc-900/40 px-4 py-2 text-xs text-zinc-400">
        <span># Admin Login</span>
      </header>
      <main className="flex flex-col items-center justify-center py-12">
        <form action="/admin/login" method="POST" className="space-y-4 w-full max-w-sm">
          <div className="space-y-2">
            <label htmlFor="username" className="block text-xs text-zinc-400">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              autoComplete="username"
              className="w-full border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-100 outline-none"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-xs text-zinc-400">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-100 outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs text-zinc-200 transition hover:border-zinc-700 hover:bg-zinc-800"
          >
            Login
          </button>
        </form>
      </main>
    </div>
  );
}
