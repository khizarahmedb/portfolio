import SiteFooter from "./SiteFooter";
import TopNav from "./TopNav";

type LayoutShellProps = {
  children: React.ReactNode;
};

export default function LayoutShell({ children }: LayoutShellProps) {
  return (
    <div className="app-bg">
      <div className="app-noise" aria-hidden="true" />
      <div className="ambient-shapes" aria-hidden="true">
        <span className="ambient-shape ambient-shape-a" />
        <span className="ambient-shape ambient-shape-b" />
        <span className="ambient-shape ambient-shape-c" />
      </div>
      <TopNav />
      <main className="content-card fade-up">
        {children}
        <SiteFooter />
      </main>
    </div>
  );
}
