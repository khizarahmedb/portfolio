import Link from "next/link";
import SiteFooter from "./SiteFooter";

type LayoutShellProps = {
  children: React.ReactNode;
};

export default function LayoutShell({ children }: LayoutShellProps) {
  return (
    <div className="alt-app">
      <header className="topbar">
        <div className="topbar-brand">
          <p>Khizar Ahmed</p>
          <span>Software Engineer</span>
        </div>
        <nav className="topbar-nav" aria-label="Global">
          <Link href="/">Overview</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/experience">Experience</Link>
          <Link href="/skills">Skills</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <a
          className="topbar-cta"
          href="/reports/khizar-ahmed-cv.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Resume
        </a>
      </header>
      <div className="topbar-marquee" aria-hidden="true">
        <p>
          product systems · automation workflows · marketing analytics · QA +
          security · product systems · automation workflows · marketing analytics
          · QA + security ·
        </p>
      </div>

      <div className="shell-wrap-alt">
        <main className="main-pane fade-up">
          {children}
          <SiteFooter />
        </main>
      </div>
    </div>
  );
}
