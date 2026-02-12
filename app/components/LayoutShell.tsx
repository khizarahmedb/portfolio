import SiteFooter from "./SiteFooter";
import Sidebar from "./Sidebar";

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
        <a
          className="topbar-cta"
          href="/reports/khizar-ahmed-cv.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Resume
        </a>
      </header>

      <div className="shell-wrap-alt">
        <Sidebar />
        <main className="main-pane fade-up">
          {children}
          <SiteFooter />
        </main>
      </div>
    </div>
  );
}
