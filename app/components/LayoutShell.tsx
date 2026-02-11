import Sidebar from "./Sidebar";
import SiteFooter from "./SiteFooter";

type LayoutShellProps = {
  children: React.ReactNode;
};

export default function LayoutShell({ children }: LayoutShellProps) {
  return (
    <div className="app-bg">
      <div className="app-noise" aria-hidden="true" />
      <div className="shell-wrap">
        <Sidebar />
        <main className="content-card fade-up">
          {children}
          <SiteFooter />
        </main>
      </div>
    </div>
  );
}
