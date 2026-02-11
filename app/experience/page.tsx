import { education, workExperience } from "../content/portfolio";

export default function ExperiencePage() {
  return (
    <section className="page-stack">
      <header className="hero-block compact">
        <p className="hero-kicker">Experience</p>
        <h1>Career Timeline</h1>
        <p className="hero-summary">
          Software, automation, and product delivery roles across agency,
          startup, and growth environments, with strong ownership of marketing
          analytics and business performance reporting.
        </p>
      </header>

      <div className="experience-grid">
        {workExperience.map((item) => (
          <article key={`${item.company}-${item.period}`} className="experience-card">
            <div className="experience-head">
              <p>{item.period}</p>
              <span>{item.location}</span>
            </div>
            <h2>{item.role}</h2>
            <p className="experience-company">{item.company}</p>
            <ul>
              {item.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <article className="card-block">
        <div className="section-head">
          <p className="section-kicker">Education</p>
          <h2>{education.degree}</h2>
        </div>
        <p className="meta-line">{education.school}</p>
        <p className="meta-line">Year: {education.year}</p>
        <p className="meta-line">GPA: {education.gpa}</p>
      </article>
    </section>
  );
}
