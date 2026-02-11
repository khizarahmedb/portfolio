import Sidebar from "./Sidebar";

type LayoutShellProps = {
  children: React.ReactNode;
};

export default function LayoutShell({ children }: LayoutShellProps) {
  return (
    <div className="app-bg">
      <div className="app-noise" aria-hidden="true" />
      <div className="shell-wrap">
        <Sidebar />
        <main className="content-card fade-up">{children}</main>
      </div>
    </div>
  );
}
