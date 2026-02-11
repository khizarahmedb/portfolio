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

const externalLinks = [
  { href: profile.linkedin, label: "LinkedIn" },
  { href: profile.github, label: "GitHub" },
  { href: "/reports/khizar-ahmed-cv.pdf", label: "CV" },
  { href: "/reports/thesis-report-khizar-ahmed.pdf", label: "Thesis Report" },
];

function isExternalUrl(url: string) {
  return url.startsWith("http://") || url.startsWith("https://");
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="side-card fade-up stagger-1">
      <div className="side-head">
        <p className="side-kicker">Khizar Ahmed</p>
        <h1>{profile.title}</h1>
        <p className="side-sub">{profile.location}</p>
      </div>

      <nav className="side-nav" aria-label="Primary">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`side-nav-item ${isActive ? "is-active" : ""}`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="side-footer">
        <p className="side-kicker">profile links</p>
        <div className="side-links">
          {externalLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={isExternalUrl(link.href) ? "_blank" : undefined}
              rel={isExternalUrl(link.href) ? "noreferrer" : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>
        <a className="side-email" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <a className="side-email" href={`tel:${profile.phone.replace(/\s+/g, "")}`}>
          {profile.phone}
        </a>
      </div>
    </aside>
  );
}
