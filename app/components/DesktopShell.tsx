"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  education,
  profile,
  projectCaseStudies,
  quickStats,
  skills,
  workExperience,
} from "../content/portfolio";

type WindowId =
  | "overview"
  | "projects"
  | "experience"
  | "skills"
  | "contact"
  | "cv";

type DesktopShortcut = {
  id: WindowId;
  label: string;
  subLabel?: string;
  top: string;
  left: string;
  iconClass: string;
};

const shortcutLayout: DesktopShortcut[] = [
  {
    id: "overview",
    label: "My PC",
    subLabel: "Overview",
    top: "1.2rem",
    left: "1rem",
    iconClass: "win-icon-pc",
  },
  {
    id: "projects",
    label: "Feature",
    subLabel: "Review",
    top: "1.2rem",
    left: "5.9rem",
    iconClass: "win-icon-projects",
  },
  {
    id: "experience",
    label: "Day In My",
    subLabel: "Life",
    top: "1.2rem",
    left: "10.8rem",
    iconClass: "win-icon-experience",
  },
  {
    id: "skills",
    label: "Public",
    top: "6.2rem",
    left: "1rem",
    iconClass: "win-icon-skills",
  },
  {
    id: "contact",
    label: "My Travel",
    subLabel: "Story",
    top: "6.2rem",
    left: "5.9rem",
    iconClass: "win-icon-contact",
  },
  {
    id: "cv",
    label: "Blog Posts",
    top: "11.2rem",
    left: "1rem",
    iconClass: "win-icon-cv",
  },
];

const windowTitles: Record<WindowId, string> = {
  overview: "My PC",
  projects: "Feature Review",
  experience: "Day In My Life",
  skills: "Public",
  contact: "My Travel Story",
  cv: "Blog Posts",
};

const windowRoutes: Record<WindowId, string> = {
  overview: "/",
  projects: "/projects",
  experience: "/experience",
  skills: "/skills",
  contact: "/contact",
  cv: "/",
};

const defaultWindowRects: Record<
  WindowId,
  { top: string; left: string; width: string; height: string }
> = {
  overview: {
    top: "8.5rem",
    left: "21rem",
    width: "min(700px, 70vw)",
    height: "min(470px, 58vh)",
  },
  projects: {
    top: "9.8rem",
    left: "26.5rem",
    width: "min(730px, 72vw)",
    height: "min(510px, 62vh)",
  },
  experience: {
    top: "10.3rem",
    left: "18rem",
    width: "min(650px, 66vw)",
    height: "min(450px, 56vh)",
  },
  skills: {
    top: "9.6rem",
    left: "23.2rem",
    width: "min(680px, 68vw)",
    height: "min(500px, 60vh)",
  },
  contact: {
    top: "11rem",
    left: "29rem",
    width: "min(620px, 64vw)",
    height: "min(470px, 56vh)",
  },
  cv: {
    top: "7.8rem",
    left: "24rem",
    width: "min(720px, 74vw)",
    height: "min(540px, 64vh)",
  },
};

const skillGroups = [
  { title: "Languages", items: skills.languages },
  { title: "Frontend", items: skills.frontend },
  { title: "Backend and APIs", items: skills.backend },
  { title: "Data and Storage", items: skills.dataAndStorage },
  { title: "Automation and Analytics", items: skills.automationAndAnalytics },
  { title: "QA and Security", items: skills.qaAndSecurity },
];

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

type DesktopShellProps = {
  initialWindow?: WindowId;
};

export default function DesktopShell({
  initialWindow = "overview",
}: DesktopShellProps) {
  const pathname = usePathname();
  const [clock, setClock] = useState(() => new Date());
  const [openWindows, setOpenWindows] = useState<WindowId[]>([initialWindow]);
  const [minimizedWindows, setMinimizedWindows] = useState<WindowId[]>([]);
  const [zOrder, setZOrder] = useState<WindowId[]>([initialWindow]);

  useEffect(() => {
    const interval = window.setInterval(() => setClock(new Date()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const visibleWindows = useMemo(
    () =>
      zOrder.filter(
        (id) => openWindows.includes(id) && !minimizedWindows.includes(id)
      ),
    [minimizedWindows, openWindows, zOrder]
  );

  const activeWindowId = visibleWindows[visibleWindows.length - 1] ?? null;

  const bringToFront = (windowId: WindowId) => {
    setZOrder((current) => [...current.filter((id) => id !== windowId), windowId]);
  };

  const openWindow = (windowId: WindowId) => {
    setOpenWindows((current) =>
      current.includes(windowId) ? current : [...current, windowId]
    );
    setMinimizedWindows((current) => current.filter((id) => id !== windowId));
    bringToFront(windowId);
  };

  const closeWindow = (windowId: WindowId) => {
    setOpenWindows((current) => current.filter((id) => id !== windowId));
    setMinimizedWindows((current) => current.filter((id) => id !== windowId));
    setZOrder((current) => current.filter((id) => id !== windowId));
  };

  const minimizeWindow = (windowId: WindowId) => {
    setMinimizedWindows((current) =>
      current.includes(windowId) ? current : [...current, windowId]
    );
  };

  const onTaskButtonClick = (windowId: WindowId) => {
    const isMinimized = minimizedWindows.includes(windowId);
    if (isMinimized) {
      setMinimizedWindows((current) => current.filter((id) => id !== windowId));
      bringToFront(windowId);
      return;
    }

    if (activeWindowId === windowId) {
      minimizeWindow(windowId);
      return;
    }

    bringToFront(windowId);
  };

  const renderWindowContent = (windowId: WindowId) => {
    if (windowId === "overview") {
      return (
        <div className="win-content-grid">
          <section>
            <h2>{profile.name}</h2>
            <p className="win-muted">{profile.title}</p>
            <p>{profile.summary}</p>
            <p className="win-muted">{profile.location}</p>
            <div className="win-link-row">
              <button type="button" onClick={() => openWindow("projects")}>
                Open Projects
              </button>
              <button type="button" onClick={() => openWindow("experience")}>
                Open Experience
              </button>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </section>
          <section className="win-stat-grid">
            {quickStats.map((stat) => (
              <article key={stat.label} className="win-stat-card">
                <p className="win-muted">{stat.label}</p>
                <h3>{stat.value}</h3>
                <p>{stat.detail}</p>
              </article>
            ))}
          </section>
        </div>
      );
    }

    if (windowId === "projects") {
      return (
        <div className="win-list-grid">
          {projectCaseStudies.slice(0, 6).map((project) => (
            <article key={project.slug} className="win-list-card">
              <p className="win-muted">{project.projectType}</p>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <div className="win-link-row">
                <span>{project.period}</span>
                <button type="button" onClick={() => openWindow("skills")}>
                  Skills Used
                </button>
              </div>
            </article>
          ))}
        </div>
      );
    }

    if (windowId === "experience") {
      return (
        <div className="win-list-grid">
          {workExperience.map((item) => (
            <article key={`${item.company}-${item.period}`} className="win-list-card">
              <p className="win-muted">{item.period}</p>
              <h3>{item.role}</h3>
              <p className="win-muted">
                {item.company} · {item.location}
              </p>
              <ul>
                {item.highlights.slice(0, 3).map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          ))}
          <article className="win-list-card">
            <p className="win-muted">Education</p>
            <h3>{education.degree}</h3>
            <p>{education.school}</p>
            <p>Graduated: {education.year}</p>
            <p>GPA: {education.gpa}</p>
          </article>
        </div>
      );
    }

    if (windowId === "skills") {
      return (
        <div className="win-list-grid">
          {skillGroups.map((group) => (
            <article key={group.title} className="win-list-card">
              <h3>{group.title}</h3>
              <div className="win-chip-grid">
                {group.items.slice(0, 12).map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      );
    }

    if (windowId === "contact") {
      return (
        <div className="win-content-grid">
          <section>
            <h2>Work With Me</h2>
            <p>
              Open to software engineering and automation roles where product
              delivery and analytics workflows need to move fast.
            </p>
            <div className="win-link-column">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <a href={`tel:${profile.phone.replace(/\s+/g, "")}`}>{profile.phone}</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </section>
          <section className="win-list-card">
            <h3>Quick Launch</h3>
            <div className="win-link-column">
              <button type="button" onClick={() => openWindow("projects")}>
                Open Projects Window
              </button>
              <button type="button" onClick={() => openWindow("experience")}>
                Open Experience Window
              </button>
              <a href="/reports/khizar-ahmed-cv.pdf" target="_blank" rel="noreferrer">
                Open CV PDF
              </a>
            </div>
          </section>
        </div>
      );
    }

    return (
      <section className="win-content-grid">
        <article className="win-list-card">
          <h2>Blog Posts</h2>
          <p>
            Keeping this folder as a launcher to the CV plus profile links.
            Open the resume file or jump into specific windows.
          </p>
          <div className="win-link-column">
            <a href="/reports/khizar-ahmed-cv.pdf" target="_blank" rel="noreferrer">
              Resume PDF
            </a>
            <button type="button" onClick={() => openWindow("overview")}>
              Open My PC
            </button>
            <button type="button" onClick={() => openWindow("contact")}>
              Open Contact
            </button>
          </div>
        </article>
      </section>
    );
  };

  return (
    <div className="win-desktop">
      <header className="win-browser-bar">
        <span className="win-browser-dot" aria-hidden="true" />
        <div className="win-browser-address">{`https://khizar.dev${pathname}`}</div>
      </header>

      <div className="win-workspace" role="application" aria-label="Desktop workspace">
        {shortcutLayout.map((shortcut) => (
          <button
            key={shortcut.id}
            type="button"
            className="win-shortcut"
            style={{ top: shortcut.top, left: shortcut.left }}
            onDoubleClick={() => openWindow(shortcut.id)}
            onClick={() => openWindow(shortcut.id)}
          >
            <span className={`win-shortcut-icon ${shortcut.iconClass}`} aria-hidden="true" />
            <span className="win-shortcut-label">
              {shortcut.label}
              {shortcut.subLabel ? <small>{shortcut.subLabel}</small> : null}
            </span>
          </button>
        ))}

        <div className="win-window-layer">
          {visibleWindows.map((windowId, index) => {
            const windowRect = defaultWindowRects[windowId];
            const isActive = activeWindowId === windowId;

            return (
              <article
                key={windowId}
                className={`win-window ${isActive ? "is-active" : ""}`}
                style={{
                  top: windowRect.top,
                  left: windowRect.left,
                  width: windowRect.width,
                  height: windowRect.height,
                  zIndex: 10 + index,
                }}
                onMouseDown={() => bringToFront(windowId)}
              >
                <header className="win-window-titlebar">
                  <div className="win-window-title">
                    <span
                      className={`win-shortcut-icon ${shortcutLayout.find((item) => item.id === windowId)?.iconClass ?? ""}`}
                      aria-hidden="true"
                    />
                    <span>{windowTitles[windowId]}</span>
                  </div>

                  <div className="win-window-controls">
                    <button
                      type="button"
                      aria-label={`Minimize ${windowTitles[windowId]}`}
                      onClick={() => minimizeWindow(windowId)}
                    >
                      _
                    </button>
                    <button
                      type="button"
                      aria-label={`Close ${windowTitles[windowId]}`}
                      onClick={() => closeWindow(windowId)}
                    >
                      X
                    </button>
                  </div>
                </header>

                <div className="win-window-body">{renderWindowContent(windowId)}</div>

                <footer className="win-window-footer">
                  <Link href={windowRoutes[windowId]}>Open Route</Link>
                </footer>
              </article>
            );
          })}
        </div>
      </div>

      <footer className="win-taskbar">
        <button type="button" className="win-start-button">
          π
        </button>
        <button type="button" className="win-search-button" aria-label="Search">
          ○
        </button>
        <div className="win-task-items">
          {openWindows.map((windowId) => (
            <button
              key={`task-${windowId}`}
              type="button"
              className={`win-task-item ${activeWindowId === windowId ? "is-active" : ""}`}
              onClick={() => onTaskButtonClick(windowId)}
            >
              {windowTitles[windowId]}
            </button>
          ))}
        </div>
        <p className="win-task-clock">{formatTime(clock)}</p>
      </footer>
    </div>
  );
}
