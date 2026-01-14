"use client";

import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

const footerLinks = [
  { href: "https://github.com/your-handle", label: "GitHub" },
  { href: "https://linkedin.com/in/your-handle", label: "LinkedIn" },
  { href: "mailto:hello@yourdomain.dev", label: "Email" },
];

type SidebarProps = {
  onClose?: () => void;
};

export default function Sidebar({ onClose }: SidebarProps) {
  return (
    <aside className="w-full max-w-xs">
      <div className="sticky top-6 flex h-[calc(100vh-3rem)] flex-col border border-zinc-800 bg-zinc-950/70">
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/40 px-3 py-2 text-xs text-zinc-500">
          <span># Sidebar</span>
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              className="border border-zinc-700 px-2 py-1 text-[11px] text-zinc-200 transition hover:border-purple-500 hover:text-purple-200 lg:hidden"
            >
              Close
            </button>
          ) : null}
        </div>
        <div className="space-y-4 p-3">
          <div className="space-y-1">
            <p className="text-xs text-zinc-500"># Software Dev Portfolio</p>
            <h2 className="text-sm font-semibold text-white">Khizar Ahmed</h2>
            <p className="text-xs text-zinc-400">
              Full-stack engineer building thoughtful, reliable products.
            </p>
          </div>
          <nav className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 border-l-2 border-transparent px-2 py-1 text-xs text-zinc-200 transition hover:border-purple-500 hover:bg-zinc-900"
              >
                <span className="text-zinc-500">•</span>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto border-t border-zinc-800 p-3 text-xs">
          <p className="text-xs text-zinc-500"># Connect</p>
          <div className="mt-2 space-y-1">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 border-l-2 border-transparent px-2 py-1 text-zinc-400 transition hover:border-cyan-500 hover:text-zinc-100"
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              >
                <span className="text-zinc-500">•</span>
                {link.label}
              </a>
            ))}
          </div>
          <p className="mt-3 text-xs text-zinc-600">© 2026 Khizar Ahmed</p>
        </div>
      </div>
    </aside>
  );
}
