"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

const headline = "unexpected";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

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
        <small>Branding, social media and web design for memorable systems.</small>
      </div>

      <div className="cursor-ring" aria-hidden="true" />
      <div className="cursor-dot" aria-hidden="true" />
      <div className="cursor-aura" aria-hidden="true" />

      <section className="hero" aria-label="Asqaure Design agency home">
        <div className="hero-image" aria-hidden="true" />
        <div className="light-sweep" aria-hidden="true" />
        <div className="waterline" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />

        <div className="orb orb-large" aria-hidden="true" />
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
            <span>asqaure</span>
            <span>design</span>
            <sup>®</sup>
          </a>
          <nav className="nav" aria-label="Primary navigation">
            <a href="#projects">Projects</a>
            <a href="#team">Team</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <div className="hero-copy">
          <p>branding,socialmedia,webdesign</p>
          <h1 aria-label="Creating the unexpected">
            <span className="script-line" aria-hidden="true">
              {"Creating the".split("").map((letter, index) => (
                <span
                  key={`${letter}-${index}`}
                  style={{ "--letter-index": index } as CSSProperties}
                >
                  {letter === " " ? "\u00a0" : letter}
                </span>
              ))}
            </span>
            <span className="headline-word" aria-hidden="true">
              {headline.split("").map((letter, index) => (
                <span
                  key={`${letter}-${index}`}
                  style={{ "--letter-index": index } as CSSProperties}
                >
                  {letter}
                </span>
              ))}
            </span>
          </h1>
          <a className="work-button magnetic" href="#projects">
            <span className="button-fill" aria-hidden="true" />
            <span className="button-label">
              View our work <span aria-hidden="true">↘</span>
            </span>
          </a>
        </div>

        <footer className="bottom-controls">
          <span className="year">©2026</span>
        </footer>
      </section>
    </main>
  );
}
