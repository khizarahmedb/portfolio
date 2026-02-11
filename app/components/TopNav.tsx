"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "../content/portfolio";

const navLinks = [
  { href: "/", label: "Overview" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/skills", label: "Skills" },
  { href: "/contact", label: "Contact" },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <>
      <header className="top-nav-shell">
        <div className="top-nav-shape">
          <Link href="/" className="top-nav-brand" aria-label="Go to homepage">
            <span>Khizar Ahmed</span>
            <small>Software Engineer</small>
          </Link>

          <nav className="top-nav-links" aria-label="Primary">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={pathname === link.href ? "is-active" : ""}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="top-nav-actions">
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="/reports/khizar-ahmed-cv.pdf" target="_blank" rel="noreferrer">
              CV
            </a>
          </div>
        </div>
      </header>

      <nav className="mobile-dock" aria-label="Mobile navigation">
        {navLinks.map((link) => (
          <Link
            key={`dock-${link.href}`}
            href={link.href}
            className={pathname === link.href ? "is-active" : ""}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
