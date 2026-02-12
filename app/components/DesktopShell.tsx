"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
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
  top: string;
  left: string;
  icon: string;
};

const shortcutLayout: DesktopShortcut[] = [
  {
    id: "overview",
    label: "Overview",
    top: "1.2rem",
    left: "1rem",
    icon: "/win-icons/overview.svg",
  },
  {
    id: "projects",
    label: "Projects",
    top: "1.2rem",
    left: "5.9rem",
    icon: "/win-icons/projects.svg",
  },
  {
    id: "experience",
    label: "Experience",
    top: "1.2rem",
    left: "10.8rem",
    icon: "/win-icons/experience.svg",
  },
  {
    id: "skills",
    label: "Skills",
    top: "6.2rem",
    left: "1rem",
    icon: "/win-icons/skills.svg",
  },
  {
    id: "contact",
    label: "Contact",
    top: "6.2rem",
    left: "5.9rem",
    icon: "/win-icons/contact.svg",
  },
  {
    id: "cv",
    label: "CV",
    top: "11.2rem",
    left: "1rem",
    icon: "/win-icons/cv.svg",
  },
];

const windowTitles: Record<WindowId, string> = {
  overview: "Overview",
  projects: "Projects",
  experience: "Experience",
  skills: "Skills",
  contact: "Contact",
  cv: "CV",
};

const windowRoutes: Record<WindowId, string> = {
  overview: "/",
  projects: "/projects",
  experience: "/experience",
  skills: "/skills",
  contact: "/contact",
  cv: "/reports/khizar-ahmed-cv.pdf",
};

const defaultWindowRects: Record<
  WindowId,
  { x: number; y: number; width: number; height: number }
> = {
  overview: { x: 120, y: 52, width: 1060, height: 720 },
  projects: { x: 130, y: 58, width: 1180, height: 790 },
  experience: { x: 92, y: 54, width: 1080, height: 740 },
  skills: { x: 140, y: 56, width: 1100, height: 760 },
  contact: { x: 190, y: 70, width: 980, height: 700 },
  cv: { x: 150, y: 62, width: 1120, height: 760 },
};

const skillGroups = [
  { title: "Languages", items: skills.languages },
  { title: "Frontend", items: skills.frontend },
  { title: "Backend and APIs", items: skills.backend },
  { title: "Data and Storage", items: skills.dataAndStorage },
  { title: "DevOps and Infra", items: skills.devopsAndInfra },
  { title: "Architecture and Patterns", items: skills.architectureAndPatterns },
  { title: "Automation and Analytics", items: skills.automationAndAnalytics },
  { title: "QA and Security", items: skills.qaAndSecurity },
  { title: "Frameworks", items: skills.frameworks },
  { title: "Delivery", items: skills.delivery },
];

const windowShellStyles: Record<WindowId, string> = {
  overview: "is-control-panel",
  projects: "is-file-explorer",
  experience: "is-system-properties",
  skills: "is-program-manager",
  contact: "is-network-center",
  cv: "is-paint-lab",
};

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function getMinWindowWidth(viewportWidth: number) {
  return viewportWidth <= 760 ? 320 : 560;
}

function getMinWindowHeight(viewportWidth: number) {
  return viewportWidth <= 760 ? 240 : 360;
}

function isCompactViewport(viewportWidth: number) {
  return viewportWidth <= 760;
}

type DesktopShellProps = {
  initialWindow?: WindowId;
};

export default function DesktopShell({
  initialWindow = "overview",
}: DesktopShellProps) {
  const [clock, setClock] = useState(() => new Date());
  const [openWindows, setOpenWindows] = useState<WindowId[]>([initialWindow]);
  const [minimizedWindows, setMinimizedWindows] = useState<WindowId[]>([]);
  const [zOrder, setZOrder] = useState<WindowId[]>([initialWindow]);
  const [windowRects, setWindowRects] =
    useState<Record<WindowId, (typeof defaultWindowRects)[WindowId]>>(
      defaultWindowRects
    );
  const windowRectsRef = useRef(windowRects);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const startMenuRef = useRef<HTMLDivElement | null>(null);
  const startButtonRef = useRef<HTMLButtonElement | null>(null);
  const dragStateRef = useRef<{
    windowId: WindowId;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);
  const resizeStateRef = useRef<{
    windowId: WindowId;
    startX: number;
    startY: number;
    originWidth: number;
    originHeight: number;
    originX: number;
    originY: number;
  } | null>(null);
  const dragEndHandlerRef = useRef<(() => void) | null>(null);
  const resizeEndHandlerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const interval = window.setInterval(() => setClock(new Date()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    windowRectsRef.current = windowRects;
  }, [windowRects]);

  useEffect(() => {
    if (!startMenuOpen) {
      return;
    }

    const onPointerDown = (event: globalThis.PointerEvent) => {
      const target = event.target as Node;
      const clickedMenu = startMenuRef.current?.contains(target);
      const clickedStartButton = startButtonRef.current?.contains(target);

      if (!clickedMenu && !clickedStartButton) {
        setStartMenuOpen(false);
      }
    };

    window.addEventListener("pointerdown", onPointerDown as EventListener);
    return () =>
      window.removeEventListener("pointerdown", onPointerDown as EventListener);
  }, [startMenuOpen]);

  useEffect(() => {
    const clampWindowsToViewport = () => {
      setWindowRects((currentRects) => {
        const adjustedEntries = Object.entries(currentRects).map(([windowId, rect]) => {
          const minWidth = getMinWindowWidth(window.innerWidth);
          const minHeight = getMinWindowHeight(window.innerWidth);
          const maxWidth = Math.max(minWidth, window.innerWidth - 16);
          const maxHeight = Math.max(minHeight, window.innerHeight - 74);

          const nextWidth = clamp(rect.width, minWidth, maxWidth);
          const nextHeight = clamp(rect.height, minHeight, maxHeight);
          const nextX = clamp(rect.x, 8, Math.max(8, window.innerWidth - nextWidth - 8));
          const nextY = clamp(rect.y, 8, Math.max(8, window.innerHeight - nextHeight - 56));

          return [windowId, { ...rect, x: nextX, y: nextY, width: nextWidth, height: nextHeight }];
        });

        return Object.fromEntries(adjustedEntries) as Record<
          WindowId,
          (typeof defaultWindowRects)[WindowId]
        >;
      });
    };

    clampWindowsToViewport();
    window.addEventListener("resize", clampWindowsToViewport);
    return () => window.removeEventListener("resize", clampWindowsToViewport);
  }, []);

  const visibleWindows = useMemo(
    () =>
      zOrder.filter(
        (id) => openWindows.includes(id) && !minimizedWindows.includes(id)
      ),
    [minimizedWindows, openWindows, zOrder]
  );

  const activeWindowId = visibleWindows[visibleWindows.length - 1] ?? null;
  const shortcutById = useMemo(
    () =>
      Object.fromEntries(
        shortcutLayout.map((shortcut) => [shortcut.id, shortcut])
      ) as Record<WindowId, DesktopShortcut>,
    []
  );

  const bringToFront = useCallback((windowId: WindowId) => {
    setZOrder((current) => [...current.filter((id) => id !== windowId), windowId]);
  }, []);

  const openWindow = (windowId: WindowId) => {
    setOpenWindows((current) =>
      current.includes(windowId) ? current : [...current, windowId]
    );
    setMinimizedWindows((current) => current.filter((id) => id !== windowId));
    bringToFront(windowId);
    setStartMenuOpen(false);
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

  const onDragPointerMove = useCallback((event: globalThis.PointerEvent) => {
    const dragState = dragStateRef.current;
    if (!dragState) {
      return;
    }

    const dx = event.clientX - dragState.startX;
    const dy = event.clientY - dragState.startY;

    setWindowRects((currentRects) => {
      const currentRect = currentRects[dragState.windowId];
      const nextX = clamp(
        dragState.originX + dx,
        8,
        Math.max(8, window.innerWidth - currentRect.width - 8)
      );
      const nextY = clamp(
        dragState.originY + dy,
        8,
        Math.max(8, window.innerHeight - currentRect.height - 56)
      );

      return {
        ...currentRects,
        [dragState.windowId]: {
          ...currentRect,
          x: nextX,
          y: nextY,
        },
      };
    });
  }, []);

  const stopDrag = useCallback(() => {
    dragStateRef.current = null;
    document.body.classList.remove("win-dragging");
    window.removeEventListener("pointermove", onDragPointerMove);
    const dragEndHandler = dragEndHandlerRef.current;
    if (dragEndHandler) {
      window.removeEventListener("pointerup", dragEndHandler);
      window.removeEventListener("pointercancel", dragEndHandler);
      dragEndHandlerRef.current = null;
    }
  }, [onDragPointerMove]);

  const startDrag = useCallback((
    windowId: WindowId,
    event: ReactPointerEvent<HTMLElement>
  ) => {
    if (isCompactViewport(window.innerWidth)) {
      return;
    }

    if (event.button !== 0) {
      return;
    }

    if ((event.target as HTMLElement).closest(".win-window-controls")) {
      return;
    }

    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);

    const currentRect = windowRectsRef.current[windowId];
    dragStateRef.current = {
      windowId,
      startX: event.clientX,
      startY: event.clientY,
      originX: currentRect.x,
      originY: currentRect.y,
    };

    bringToFront(windowId);
    document.body.classList.add("win-dragging");

    const endDrag = () => {
      stopDrag();
    };
    dragEndHandlerRef.current = endDrag;

    window.addEventListener("pointermove", onDragPointerMove);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
  }, [bringToFront, onDragPointerMove, stopDrag]);

  const onResizePointerMove = useCallback((event: globalThis.PointerEvent) => {
    const resizeState = resizeStateRef.current;
    if (!resizeState) {
      return;
    }

    const dx = event.clientX - resizeState.startX;
    const dy = event.clientY - resizeState.startY;

    setWindowRects((currentRects) => {
      const currentRect = currentRects[resizeState.windowId];
      const minWidth = getMinWindowWidth(window.innerWidth);
      const minHeight = getMinWindowHeight(window.innerWidth);
      const maxWidth = Math.max(
        minWidth,
        window.innerWidth - resizeState.originX - 8
      );
      const maxHeight = Math.max(
        minHeight,
        window.innerHeight - resizeState.originY - 56
      );

      const nextWidth = clamp(resizeState.originWidth + dx, minWidth, maxWidth);
      const nextHeight = clamp(
        resizeState.originHeight + dy,
        minHeight,
        maxHeight
      );

      return {
        ...currentRects,
        [resizeState.windowId]: {
          ...currentRect,
          width: nextWidth,
          height: nextHeight,
        },
      };
    });
  }, []);

  const stopResize = useCallback(() => {
    resizeStateRef.current = null;
    document.body.classList.remove("win-resizing");
    window.removeEventListener("pointermove", onResizePointerMove);
    const resizeEndHandler = resizeEndHandlerRef.current;
    if (resizeEndHandler) {
      window.removeEventListener("pointerup", resizeEndHandler);
      window.removeEventListener("pointercancel", resizeEndHandler);
      resizeEndHandlerRef.current = null;
    }
  }, [onResizePointerMove]);

  const startResize = useCallback((
    windowId: WindowId,
    event: ReactPointerEvent<HTMLButtonElement>
  ) => {
    if (isCompactViewport(window.innerWidth)) {
      return;
    }

    if (event.button !== 0) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture?.(event.pointerId);

    const currentRect = windowRectsRef.current[windowId];
    resizeStateRef.current = {
      windowId,
      startX: event.clientX,
      startY: event.clientY,
      originWidth: currentRect.width,
      originHeight: currentRect.height,
      originX: currentRect.x,
      originY: currentRect.y,
    };

    bringToFront(windowId);
    document.body.classList.add("win-resizing");

    const endResize = () => {
      stopResize();
    };
    resizeEndHandlerRef.current = endResize;

    window.addEventListener("pointermove", onResizePointerMove);
    window.addEventListener("pointerup", endResize);
    window.addEventListener("pointercancel", endResize);
  }, [bringToFront, onResizePointerMove, stopResize]);

  useEffect(
    () => () => {
      stopDrag();
      stopResize();
    },
    [stopDrag, stopResize]
  );

  const renderWindowContent = (windowId: WindowId) => {
    if (windowId === "overview") {
      return (
        <div className="win-pane">
          <header className="win-pane-head">
            <p className="win-pane-kicker">Classic Control Panel</p>
            <h2 className="win-pane-title">System Overview</h2>
          </header>

          <details className="win-drop" open>
            <summary>
              <span>System Profile</span>
              <span>{profile.location}</span>
            </summary>
            <div className="win-drop-body">
              <p className="win-muted">{profile.title}</p>
              <p>{profile.summary}</p>
              <p>
                I build paid-media and commerce automation systems that compress
                reporting latency and expose decision-ready signals every day.
              </p>
            </div>
          </details>

          <details className="win-drop" open>
            <summary>
              <span>Impact Snapshot</span>
              <span>{quickStats.length} indicators</span>
            </summary>
            <div className="win-drop-body">
              <div className="win-stat-grid">
                {quickStats.map((stat) => (
                  <article key={stat.label} className="win-stat-card">
                    <p className="win-muted">{stat.label}</p>
                    <h3>{stat.value}</h3>
                    <p>{stat.detail}</p>
                  </article>
                ))}
              </div>
            </div>
          </details>

          <details className="win-drop">
            <summary>
              <span>Quick Actions</span>
              <span>Launch shortcuts</span>
            </summary>
            <div className="win-drop-body">
              <div className="win-link-row">
                <button type="button" onClick={() => openWindow("projects")}>
                  Open Projects
                </button>
                <button type="button" onClick={() => openWindow("experience")}>
                  Open Experience
                </button>
                <button type="button" onClick={() => openWindow("skills")}>
                  Open Skills
                </button>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </div>
            </div>
          </details>
        </div>
      );
    }

    if (windowId === "projects") {
      return (
        <div className="win-pane">
          <header className="win-pane-head">
            <p className="win-pane-kicker">File Explorer</p>
            <h2 className="win-pane-title">Project Case Studies</h2>
          </header>

          {projectCaseStudies.map((project, index) => (
            <details key={project.slug} className="win-drop win-drop-project" open={index === 0}>
              <summary>
                <span>{project.title}</span>
                <span>
                  {project.period} · {project.projectType}
                </span>
              </summary>

              <div className="win-drop-body">
                <p className="win-drop-lead">{project.summary}</p>

                <div className="win-project-grid">
                  <section>
                    <h4>Description</h4>
                    <p>{project.description}</p>
                  </section>
                  <section>
                    <h4>Goal</h4>
                    <p>{project.goal}</p>
                  </section>
                  <section>
                    <h4>Achievement</h4>
                    <p>{project.achievement}</p>
                  </section>
                  <section>
                    <h4>What I Built</h4>
                    <ul>
                      {project.whatIBuilt.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>
                  <section>
                    <h4>Features</h4>
                    <ul>
                      {project.features.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>
                  <section>
                    <h4>Outcomes</h4>
                    <ul>
                      {project.outcomes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>
                </div>

                <section className="win-inline-section">
                  <h4>Skills Used</h4>
                  <div className="win-chip-grid">
                    {project.skillsUsed.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </section>

                {project.scriptUseCases?.length ? (
                  <section className="win-inline-section">
                    <h4>Script Use Cases</h4>
                    <ul>
                      {project.scriptUseCases.map((scriptUseCase) => (
                        <li key={scriptUseCase.script}>
                          <strong>{scriptUseCase.script}:</strong> {scriptUseCase.useCase}
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}

                {project.disclosures?.length ? (
                  <section className="win-inline-section">
                    <h4>Disclosures</h4>
                    <ul>
                      {project.disclosures.map((disclosure) => (
                        <li key={disclosure.title}>
                          <strong>{disclosure.title}:</strong> {disclosure.detail}
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}

                {project.confidentialityNote ? (
                  <section className="win-inline-section">
                    <h4>Confidentiality Note</h4>
                    <p>{project.confidentialityNote}</p>
                  </section>
                ) : null}

                <div className="win-link-row">
                  <span className="win-muted">{project.period}</span>
                  <button type="button" onClick={() => openWindow("skills")}>
                    Skills Window
                  </button>
                  {project.links.map((link) => (
                    <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </details>
          ))}
        </div>
      );
    }

    if (windowId === "experience") {
      return (
        <div className="win-pane">
          <header className="win-pane-head">
            <p className="win-pane-kicker">System Properties</p>
            <h2 className="win-pane-title">Experience + Education</h2>
          </header>

          {workExperience.map((item, index) => (
            <details
              key={`${item.company}-${item.period}`}
              className="win-drop"
              open={index < 2}
            >
              <summary>
                <span>{item.role}</span>
                <span>{item.period}</span>
              </summary>
              <div className="win-drop-body">
                <p className="win-muted">
                  {item.company} · {item.location}
                </p>
                <ul>
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </details>
          ))}

          <details className="win-drop" open>
            <summary>
              <span>Education</span>
              <span>{education.year}</span>
            </summary>
            <div className="win-drop-body">
              <p className="win-muted">{education.school}</p>
              <p>{education.degree}</p>
              <p>Graduated: {education.year}</p>
              <p>GPA: {education.gpa}</p>
            </div>
          </details>
        </div>
      );
    }

    if (windowId === "skills") {
      return (
        <div className="win-pane">
          <header className="win-pane-head">
            <p className="win-pane-kicker">Program Manager</p>
            <h2 className="win-pane-title">Engineering Capability Matrix</h2>
          </header>

          {skillGroups.map((group, index) => (
            <details key={group.title} className="win-drop" open={index < 3}>
              <summary>
                <span>{group.title}</span>
                <span>{group.items.length} entries</span>
              </summary>
              <div className="win-drop-body">
                <div className="win-chip-grid">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </details>
          ))}

          <details className="win-drop">
            <summary>
              <span>Work Surfaces</span>
              <span>Portfolio links</span>
            </summary>
            <div className="win-drop-body">
              <div className="win-link-row">
                <button type="button" onClick={() => openWindow("projects")}>
                  Open Projects Window
                </button>
                <button type="button" onClick={() => openWindow("experience")}>
                  Open Experience Window
                </button>
                <a href={profile.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </div>
            </div>
          </details>
        </div>
      );
    }

    if (windowId === "contact") {
      return (
        <div className="win-pane">
          <header className="win-pane-head">
            <p className="win-pane-kicker">Network and Sharing Center</p>
            <h2 className="win-pane-title">Contact + Quick Launch</h2>
          </header>

          <div className="win-two-column">
            <details className="win-drop" open>
              <summary>
                <span>Profiles</span>
                <span>Direct links</span>
              </summary>
              <div className="win-drop-body">
                <div className="win-link-column">
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                  <a href={`tel:${profile.phone.replace(/\s+/g, "")}`}>
                    {profile.phone}
                  </a>
                  <a href={profile.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                  <a href={profile.github} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                </div>
              </div>
            </details>

            <details className="win-drop" open>
              <summary>
                <span>Quick Launch</span>
                <span>Window actions</span>
              </summary>
              <div className="win-drop-body">
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
              </div>
            </details>
          </div>

          <details className="win-drop" open>
            <summary>
              <span>Work With Me</span>
              <span>Open roles + consulting</span>
            </summary>
            <div className="win-drop-body">
              <p>
                Open to engineering roles, consulting, and contract work where
                full-stack product delivery meets marketing and business analytics.
                I build systems that connect paid-media, commerce, and operational
                data into decision-ready reporting and automation workflows.
              </p>
              <div className="win-link-row">
                <button type="button" onClick={() => openWindow("overview")}>
                  Open Overview
                </button>
                <button type="button" onClick={() => openWindow("skills")}>
                  Open Skills
                </button>
              </div>
            </div>
          </details>
        </div>
      );
    }

    return (
      <section className="win-pane">
        <header className="win-pane-head">
          <p className="win-pane-kicker">Paint and Notes</p>
          <h2 className="win-pane-title">Curriculum Vitae</h2>
        </header>

        <div className="win-paint-toolbar">
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Image</span>
          <span>Colors</span>
        </div>

        <div className="win-paint-canvas">
          <details className="win-drop" open>
            <summary>
              <span>Resume Snapshot</span>
              <span>Current profile</span>
            </summary>
            <div className="win-drop-body">
              <p className="win-muted">{profile.name}</p>
              <p>{profile.title}</p>
              <p>{profile.location}</p>
              <p>Latest degree: {education.degree}</p>
            </div>
          </details>

          <details className="win-drop" open>
            <summary>
              <span>Quick Route</span>
              <span>Open resources</span>
            </summary>
            <div className="win-drop-body">
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
            </div>
          </details>

          <details className="win-drop">
            <summary>
              <span>Links</span>
              <span>External profiles</span>
            </summary>
            <div className="win-drop-body">
              <div className="win-link-row">
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <a href={profile.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </div>
            </div>
          </details>
        </div>
      </section>
    );
  };

  return (
    <div className="win-desktop">
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
            <span className="win-shortcut-icon">
              <img
                src={shortcut.icon}
                alt=""
                aria-hidden="true"
                className="win-shortcut-icon-image"
              />
            </span>
            <span className="win-shortcut-label">{shortcut.label}</span>
          </button>
        ))}

        <div className="win-window-layer">
          {visibleWindows.map((windowId, index) => {
            const windowRect = windowRects[windowId];
            const isActive = activeWindowId === windowId;
            const shortcut = shortcutById[windowId];

            return (
              <article
                key={windowId}
                className={`win-window ${windowShellStyles[windowId]} ${isActive ? "is-active" : ""}`}
                style={{
                  top: `${windowRect.y}px`,
                  left: `${windowRect.x}px`,
                  width: `${windowRect.width}px`,
                  height: `${windowRect.height}px`,
                  zIndex: 10 + index,
                }}
                onMouseDown={() => bringToFront(windowId)}
              >
                <header
                  className="win-window-titlebar"
                  onPointerDown={(event) => startDrag(windowId, event)}
                >
                  <div className="win-window-title">
                    <span className="win-window-app-icon" aria-hidden="true">
                      <img
                        src={shortcut.icon}
                        alt=""
                        className="win-window-app-icon-image"
                      />
                    </span>
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
                <button
                  type="button"
                  className="win-resize-handle"
                  aria-label={`Resize ${windowTitles[windowId]} window`}
                  onPointerDown={(event) => startResize(windowId, event)}
                />
              </article>
            );
          })}
        </div>
      </div>

      <footer className="win-taskbar">
        <button
          ref={startButtonRef}
          type="button"
          className="win-start-button"
          aria-label="Open Start menu"
          onClick={() => setStartMenuOpen((current) => !current)}
        >
          <span aria-hidden="true">⧉</span>
          <span>Start</span>
        </button>
        <button type="button" className="win-search-button" aria-label="Search">
          <span aria-hidden="true">⌕</span>
          <span>Find</span>
        </button>
        <div className="win-task-items">
          {openWindows.map((windowId) => (
            <button
              key={`task-${windowId}`}
              type="button"
              className={`win-task-item ${activeWindowId === windowId ? "is-active" : ""}`}
              onClick={() => onTaskButtonClick(windowId)}
            >
              <img
                src={shortcutById[windowId].icon}
                alt=""
                aria-hidden="true"
                className="win-task-icon"
              />
              {windowTitles[windowId]}
            </button>
          ))}
        </div>
        <p className="win-task-clock">{formatTime(clock)}</p>
      </footer>

      {startMenuOpen ? (
        <aside
          ref={startMenuRef}
          className="win-start-menu"
          aria-label="Start menu"
          role="menu"
        >
          <div className="win-start-menu-head">
            <p>{profile.name}</p>
            <span>{profile.title}</span>
          </div>

          <div className="win-start-menu-section">
            <h3>Pages</h3>
            <div className="win-start-menu-links">
              {shortcutLayout.map((shortcut) => (
                <button
                  key={`menu-${shortcut.id}`}
                  type="button"
                  onClick={() => openWindow(shortcut.id)}
                >
                  <img
                    src={shortcut.icon}
                    alt=""
                    aria-hidden="true"
                    className="win-task-icon"
                  />
                  {shortcut.label}
                </button>
              ))}
            </div>
          </div>

          <div className="win-start-menu-section">
            <h3>Quick Links</h3>
            <div className="win-start-menu-links">
              <Link href="/">Overview</Link>
              <Link href="/projects">Projects</Link>
              <Link href="/experience">Experience</Link>
              <Link href="/skills">Skills</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>

          <div className="win-start-menu-section">
            <h3>Profiles</h3>
            <div className="win-start-menu-links">
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href="/reports/khizar-ahmed-cv.pdf" target="_blank" rel="noreferrer">
                CV
              </a>
              <a href={`mailto:${profile.email}`}>Email</a>
            </div>
          </div>
        </aside>
      ) : null}
    </div>
  );
}
