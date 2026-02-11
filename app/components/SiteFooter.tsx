import Link from "next/link";
import { profile } from "../content/portfolio";

function isExternalUrl(url: string) {
  return url.startsWith("http://") || url.startsWith("https://");
}

const quickLinks = [
  { href: "/", label: "Overview" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/skills", label: "Skills" },
  { href: "/contact", label: "Contact" },
];

const profileLinks = [
  { href: profile.linkedin, label: "LinkedIn" },
  { href: profile.github, label: "GitHub" },
  { href: "/reports/khizar-ahmed-cv.pdf", label: "CV" },
  { href: `mailto:${profile.email}`, label: "Email" },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="site-footer-row">
        <p>Khizar Ahmed Portfolio</p>
        <div className="site-footer-links">
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="site-footer-row">
        <p>Profiles</p>
        <div className="site-footer-links">
          {profileLinks.map((link) => {
            if (isExternalUrl(link.href) || link.href.startsWith("mailto:")) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target={isExternalUrl(link.href) ? "_blank" : undefined}
                  rel={isExternalUrl(link.href) ? "noreferrer" : undefined}
                >
                  {link.label}
                </a>
              );
            }

            return (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
