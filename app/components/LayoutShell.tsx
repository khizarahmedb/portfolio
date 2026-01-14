"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";

type LayoutShellProps = {
  children: React.ReactNode;
};

export default function LayoutShell({ children }: LayoutShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 lg:flex-row">
        <main className="flex-1 border border-zinc-800 bg-zinc-950/60">
          <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/40 px-4 py-2 text-xs text-zinc-400">
            <span># New session — {new Date().toISOString()}</span>
            <button
              type="button"
              onClick={() => setIsSidebarOpen((open) => !open)}
              className="border border-zinc-700 px-2 py-1 text-[11px] text-zinc-200 transition hover:border-purple-500 hover:text-purple-200 lg:hidden"
            >
              {isSidebarOpen ? "Hide" : "Sidebar"}
            </button>
          </div>
          <div className="p-4">{children}</div>
        </main>
        <div className={`${isSidebarOpen ? "block" : "hidden"} lg:block`}>
          {isSidebarOpen ? (
            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              aria-label="Close sidebar"
            />
          ) : null}
          <div className="fixed right-4 top-6 z-50 w-[calc(100%-2rem)] max-w-xs lg:static lg:w-auto">
            <Sidebar onClose={() => setIsSidebarOpen(false)} />
          </div>
        </div>
      </div>
    </div>
  );
}
