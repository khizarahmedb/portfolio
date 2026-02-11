"use client";

import { useEffect } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export default function ScrollEffects() {
  useEffect(() => {
    const revealTargets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    revealTargets.forEach((target) => observer.observe(target));

    let frameId = 0;
    const updateScrollProgress = () => {
      frameId = 0;
      const scrollTop = window.scrollY;
      const scrollRange =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollRange > 0 ? scrollTop / scrollRange : 0;

      document.documentElement.style.setProperty(
        "--scroll-progress",
        clamp(progress, 0, 1).toFixed(4)
      );
    };

    const onScroll = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(updateScrollProgress);
    };

    updateScrollProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return null;
}
