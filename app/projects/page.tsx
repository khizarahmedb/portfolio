import ProjectSections from "../components/ProjectSections";

export default function ProjectsPage() {
  return (
    <section className="page-stack">
      <header className="hero-block compact">
        <p className="hero-kicker">Projects</p>
        <h1>Project Case Studies</h1>
        <p className="hero-summary">
          Each project includes description, goal, achievement, features, and
          delivery details with full case-study depth.
        </p>
      </header>

      <ProjectSections />
    </section>
  );
}
