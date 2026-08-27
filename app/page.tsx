"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

const projects = ["Identity", "Digital", "Motion", "Spatial"];

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 1700);

    const moveCursor = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
      document.documentElement.style.setProperty("--tilt-x", `${(event.clientX / window.innerWidth - 0.5) * 10}deg`);
      document.documentElement.style.setProperty("--tilt-y", `${(event.clientY / window.innerHeight - 0.5) * -8}deg`);
    };

    window.addEventListener("pointermove", moveCursor);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pointermove", moveCursor);
    };
  }, []);

  return (
    <main className={`site-shell ${loaded ? "is-loaded" : ""}`}>
      <div className="intro" aria-hidden={loaded}>
        <div className="intro-cube" aria-hidden="true">
          {"ASQAUR".split("").map((letter, index) => (
            <span key={`${letter}-${index}`}>{letter}</span>
          ))}
        </div>
        <p>asqaure design</p>
        <small>A brand, digital and motion studio creating memorable design systems.</small>
      </div>

      <div className="cursor-ring" aria-hidden="true" />

      <section className="hero" aria-label="Asqaure Design agency home">
        <div className="hero-image" aria-hidden="true" />
        <div className="light-sweep" aria-hidden="true" />
        <div className="waterline" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />

        <div className="orb orb-large" aria-hidden="true" />
        <div className="orb orb-small" aria-hidden="true" />
        <div className="particle-field" aria-hidden="true">
          {Array.from({ length: 22 }).map((_, index) => (
            <span
              key={index}
              style={
                {
                  "--i": index,
                  "--duration": `${4 + (index % 5) * 0.8}s`,
                  "--size": `${2 + (index % 4)}px`,
                  "--x": `${(index * 37) % 100}%`,
                  "--y": `${(index * 23) % 100}%`,
                } as CSSProperties
              }
            />
          ))}
        </div>

        <header className="topbar">
          <a className="brand" href="#" aria-label="Asqaure Design home">
            asqaure<span>design</span><sup>®</sup>
          </a>
          <nav className="nav" aria-label="Primary navigation">
            <a href="#index">Index</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
            <button
              className="menu-dot"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
            </button>
          </nav>
        </header>

        <div className={`menu-panel ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
          <a href="#studio">Studio</a>
          <a href="#services">Services</a>
          <a href="#journal">Journal</a>
        </div>

        <div className="hero-copy">
          <p>A brand, digital & motion studio</p>
          <h1>
            <span>Creating the</span>
            unexpected
          </h1>
          <a className="work-button" href="#projects">
            View our work <span aria-hidden="true">↘</span>
          </a>
        </div>

        <aside className="project-strip" id="projects" aria-label="Studio disciplines">
          {projects.map((project) => (
            <span key={project}>{project}</span>
          ))}
        </aside>

        <footer className="bottom-controls">
          <button className="pill dark-pill" aria-label="Open sound settings">
            <span aria-hidden="true">•••••</span>
          </button>
          <a className="pill outline-pill" href="#index">
            Our 2026 Wrapped
          </a>
          <button className="globe" aria-label="Change language">
            <span aria-hidden="true">◎</span>
          </button>
          <span className="year">©2026</span>
        </footer>
      </section>
    </main>
  );
}
