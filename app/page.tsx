"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LiveBackgroundCanvas } from "./components/LiveBackgroundCanvas";

const headline = "unexpected";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<"hero" | "projects" | "review" | "pricing" | "contact">("hero");
  const [contactType, setContactType] = useState<"email" | "whatsapp">("email");
  const [copied, setCopied] = useState(false);
  const [navVisible, setNavVisible] = useState(true);

  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const heroImageRef = useRef<HTMLDivElement | null>(null);

  // Hide navbar on scroll down, show on scroll up instantly
  useEffect(() => {
    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          if (currentScrollY <= 60) {
            setNavVisible(true);
          } else if (currentScrollY > lastScrollY + 4 && currentScrollY > 80) {
            setNavVisible(false);
          } else if (currentScrollY < lastScrollY - 3) {
            setNavVisible(true);
          }

          lastScrollY = Math.max(0, currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync hash changes
  useEffect(() => {
    console.log("hero animation mounted");

    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === "#projects") {
        setActiveTab("projects");
      } else if (hash === "#review") {
        setActiveTab("review");
      } else if (hash === "#pricing") {
        setActiveTab("pricing");
      } else if (hash === "#contact") {
        setActiveTab("contact");
      } else {
        setActiveTab("hero");
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    const timer = window.setTimeout(() => setLoaded(true), 1700);

    let animationFrameId: number;
    let targetX = typeof window !== "undefined" ? window.innerWidth / 2 : 0;
    let targetY = typeof window !== "undefined" ? window.innerHeight / 2 : 0;
    let currentX = targetX;
    let currentY = targetY;
    let dotX = targetX;
    let dotY = targetY;

    const moveCursor = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const updatePosition = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      dotX += (targetX - dotX) * 0.45;
      dotY += (targetY - dotY) * 0.45;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      }

      if (heroImageRef.current) {
        const tiltX = (targetX / window.innerWidth - 0.5) * 6;
        const tiltY = (targetY / window.innerHeight - 0.5) * -4;
        heroImageRef.current.style.transform = `perspective(1000px) rotateX(${tiltY}deg) rotateY(${tiltX}deg)`;
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener("pointermove", moveCursor);
    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", moveCursor);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const getSliderX = () => {
    if (activeTab === "projects") return "-100vw";
    if (activeTab === "review") return "-200vw";
    if (activeTab === "pricing") return "-300vw";
    if (activeTab === "contact") return "-400vw";
    return "0vw";
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.0,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <main className={`site-shell ${loaded ? "is-loaded" : ""}`}>
      {/* Live Ambient Canvas Background */}
      <LiveBackgroundCanvas loaded={loaded} />

      {/* Subtle Grain Overlay */}
      <div className="grain" aria-hidden="true" />

      {/* Intro Loader */}
      <div className="intro" aria-hidden={loaded}>
        <div className="intro-cube" aria-hidden="true">
          {"SHAURYA".split("").slice(0, 6).map((letter, index) => (
            <span key={`${letter}-${index}`}>{letter}</span>
          ))}
        </div>
        <p>shaurya sharma</p>
        <small>Branding, social media and web design for memorable systems.</small>
      </div>

      {/* Hardware-Accelerated Custom Cursor */}
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />

      {/* Live Flying Birds Layer */}
      <div className="flying-birds-layer" aria-hidden="true">
        <div className="bird bird-1">
          <svg viewBox="0 0 50 30" className="bird-svg">
            <path className="wing left-wing" d="M25,15 Q12,2 2,12 Q15,14 25,15 Z" />
            <path className="wing right-wing" d="M25,15 Q38,2 48,12 Q35,14 25,15 Z" />
          </svg>
        </div>
        <div className="bird bird-2">
          <svg viewBox="0 0 50 30" className="bird-svg">
            <path className="wing left-wing" d="M25,15 Q12,2 2,12 Q15,14 25,15 Z" />
            <path className="wing right-wing" d="M25,15 Q38,2 48,12 Q35,14 25,15 Z" />
          </svg>
        </div>
        <div className="bird bird-3">
          <svg viewBox="0 0 50 30" className="bird-svg">
            <path className="wing left-wing" d="M25,15 Q12,2 2,12 Q15,14 25,15 Z" />
            <path className="wing right-wing" d="M25,15 Q38,2 48,12 Q35,14 25,15 Z" />
          </svg>
        </div>
        <div className="bird bird-4">
          <svg viewBox="0 0 50 30" className="bird-svg">
            <path className="wing left-wing" d="M25,15 Q12,2 2,12 Q15,14 25,15 Z" />
            <path className="wing right-wing" d="M25,15 Q38,2 48,12 Q35,14 25,15 Z" />
          </svg>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero" aria-label="Shaurya Sharma portfolio home">
        
        {/* ROOM TRANSITION BACKGROUND SLIDER (Hero -> Projects -> Review -> Pricing -> Contact) */}
        <motion.div
          className="rooms-slider"
          animate={{ x: getSliderX() }}
          transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
          style={{ willChange: "transform" }}
        >
          {/* Room 1: Main Hero Architectural Room */}
          <div ref={heroImageRef} className="room-viewport room-hero">
            <div className="hero-image" aria-hidden="true" />
            <div className="contact-light-blob blob-a" aria-hidden="true" />
            <div className="contact-light-blob blob-b" aria-hidden="true" />
            <div className="contact-blur-layer" aria-hidden="true" />
            <div className="contact-grain-overlay" aria-hidden="true" />
          </div>

          {/* Room 2: Projects Gallery Room */}
          <div className="room-viewport room-projects">
            <div className="projects-image" aria-hidden="true" />
            <div className="contact-light-blob blob-a" aria-hidden="true" />
            <div className="contact-light-blob blob-b" aria-hidden="true" />
            <div className="contact-blur-layer" aria-hidden="true" />
            <div className="contact-grain-overlay" aria-hidden="true" />
          </div>

          {/* Room 3: Review Architectural Pool Room */}
          <div className="room-viewport room-review">
            <div className="review-image" aria-hidden="true" />
            <div className="contact-light-blob blob-a" aria-hidden="true" />
            <div className="contact-light-blob blob-b" aria-hidden="true" />
            <div className="contact-blur-layer" aria-hidden="true" />
            <div className="contact-grain-overlay" aria-hidden="true" />
          </div>

          {/* Room 4: Pricing Study Room Closeup Room */}
          <div className="room-viewport room-pricing">
            <div className="pricing-image" aria-hidden="true" />
            <div className="contact-light-blob blob-a" aria-hidden="true" />
            <div className="contact-light-blob blob-b" aria-hidden="true" />
            <div className="contact-blur-layer" aria-hidden="true" />
            <div className="contact-grain-overlay" aria-hidden="true" />
          </div>

          {/* Room 5: Contact Architectural Room */}
          <div className="room-viewport room-contact">
            <div className="contact-image" aria-hidden="true" />
            <div className="contact-light-blob blob-a" aria-hidden="true" />
            <div className="contact-light-blob blob-b" aria-hidden="true" />
            <div className="contact-blur-layer" aria-hidden="true" />
            <div className="contact-grain-overlay" aria-hidden="true" />
          </div>
        </motion.div>

        {/* Full-Cover Animated Blob Overlay */}
        <div className="hero-overlay-blobs" aria-hidden="true">
          <div className="visible-blob blob-1" />
          <div className="visible-blob blob-2" />
          <div className="visible-blob blob-3" />
        </div>

        <div className="light-sweep" aria-hidden="true" />

        {/* Header Navigation (Auto-hides on scroll down) */}
        <header className={`topbar ${navVisible ? "" : "is-hidden"}`}>
          <a
            className="brand"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = "";
              setActiveTab("hero");
            }}
            aria-label="Shaurya Sharma home"
          >
            <div className="brand-logo-container">
              <svg className="brand-logo-svg" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="rose-gold-brand" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f43f5e" />
                    <stop offset="50%" stopColor="#fb7185" />
                    <stop offset="100%" stopColor="#fda4af" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="34" fill="none" stroke="url(#rose-gold-brand)" strokeWidth="3.5" strokeDasharray="150 50" strokeLinecap="round" />
                <path d="M62,33 C62,33 56,27 48,27 C38,27 34,33 34,40 C34,48 44,50 52,52 C62,55 66,60 66,68 C66,77 58,82 48,82 C38,82 32,75 32,75" fill="none" stroke="url(#rose-gold-brand)" strokeWidth="7" strokeLinecap="round" />
                <circle cx="62" cy="33" r="4" fill="#ffffff" />
              </svg>
            </div>
            <span className="brand-name">shaurya</span>
            <span className="brand-name font-italic">sharma</span>
            <sup className="brand-reg">®</sup>
          </a>
          <nav className="nav" aria-label="Primary navigation">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = "";
                setActiveTab("hero");
              }}
              className={activeTab === "hero" ? "is-active" : ""}
            >
              Home
            </a>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = "projects";
                setActiveTab("projects");
              }}
              className={activeTab === "projects" ? "is-active" : ""}
            >
              Projects
            </a>
            <a
              href="#review"
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = "review";
                setActiveTab("review");
              }}
              className={activeTab === "review" ? "is-active" : ""}
            >
              Review
            </a>
            <a
              href="#pricing"
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = "pricing";
                setActiveTab("pricing");
              }}
              className={activeTab === "pricing" ? "is-active" : ""}
            >
              Pricing
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = "contact";
                setActiveTab("contact");
              }}
              className={activeTab === "contact" ? "is-active nav-contact-pill" : "nav-contact-pill"}
            >
              Contact
            </a>
          </nav>
        </header>

        {/* Dynamic Content Views: Hero, Projects, Review, Pricing, or Contact */}
        <div className="viewports-content-container">
          <AnimatePresence mode="wait">
            {activeTab === "hero" && (
              /* HERO ROOM CONTENT */
              <motion.div
                key="hero-content"
                className="hero-copy"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="hero-tagline">
                  <motion.span
                    className="dot-indicator"
                    animate={{
                      scale: [1, 1.35, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 3,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                  />
                  web design, AI automations, strategy maker
                </p>

                <motion.h1
                  aria-label="Creating the unexpected"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* "Creating the" */}
                  <motion.span className="script-line-wrapper" variants={lineVariants}>
                    <span className="script-line">
                      {"Creating the".split("").map((char, index) => (
                        <motion.span
                          key={`script-${index}`}
                          animate={{
                            y: [0, -5, 0, 3, 0],
                            rotate: [0, -1.8, 0, 1.2, 0],
                          }}
                          transition={{
                            duration: 4.2,
                            ease: "easeInOut",
                            repeat: Infinity,
                            delay: index * 0.08,
                          }}
                          style={{ display: "inline-block" }}
                        >
                          {char === " " ? "\u00a0" : char}
                        </motion.span>
                      ))}
                    </span>
                  </motion.span>

                  {/* "unexpected" */}
                  <motion.span className="headline-word-wrapper" variants={lineVariants}>
                    <span className="headline-word">
                      {headline.split("").map((char, index) => (
                        <motion.span
                          key={`headline-${index}`}
                          className="live-char"
                          animate={{
                            y: [0, -7, 0, 4, 0],
                            scale: [1, 1.04, 1, 0.98, 1],
                          }}
                          transition={{
                            duration: 4.8,
                            ease: "easeInOut",
                            repeat: Infinity,
                            delay: index * 0.07,
                          }}
                          whileHover={{
                            y: -12,
                            scale: 1.12,
                            transition: { duration: 0.18 },
                          }}
                          style={{ display: "inline-block", cursor: "pointer" }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </span>
                  </motion.span>
                </motion.h1>

                <div className="hero-actions">
                  <a
                    className="work-button magnetic"
                    href="#projects"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.hash = "projects";
                      setActiveTab("projects");
                    }}
                  >
                    <span className="button-fill" aria-hidden="true" />
                    <span className="button-label">
                      View my work <span aria-hidden="true">↘</span>
                    </span>
                  </a>
                </div>
              </motion.div>
            )}

            {activeTab === "projects" && (
              /* PROJECTS GALLERY CONTENT (Unseen Studio Inspired Live Preview Cards) */
              <motion.div
                key="projects-content"
                className="projects-copy"
                initial={{ opacity: 0, scale: 0.95, y: 35 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -35 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="projects-header">
                  <h2 className="projects-title" aria-label="Selected Projects">
                    {"Selected Projects".split("").map((char, index) => (
                      <motion.span
                        key={`prj-${index}`}
                        animate={{
                          y: [0, -8, 0, 5, 0],
                          rotate: [0, -2.2, 0, 1.6, 0],
                        }}
                        transition={{
                          duration: 4.2,
                          ease: "easeInOut",
                          repeat: Infinity,
                          delay: index * 0.07,
                        }}
                        style={{ display: "inline-block" }}
                      >
                        {char === " " ? "\u00a0" : char}
                      </motion.span>
                    ))}
                  </h2>
                  <p className="projects-subtitle">FEATURED CLIENT WORK & LIVE DIGITAL EXPERIENCES</p>
                </div>

                {/* Filter Pills */}
                <div className="projects-pills">
                  <span className="prj-pill active">All 6</span>
                  <span className="prj-pill">Full Stack</span>
                  <span className="prj-pill">AI Platform</span>
                  <span className="prj-pill">Govt Legal AI</span>
                  <span className="prj-pill">Hackathon Winner</span>
                  <span className="prj-pill">Rapid 5hr Build</span>
                </div>

                {/* Projects Display Grid */}
                <div className="projects-grid">
                  
                  {/* Project Card 1: The Protein Drop */}
                  <motion.div
                    className="project-card"
                    whileHover={{ y: -8, scale: 1.015 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="project-preview-window">
                      <div className="browser-bar">
                        <div className="dot red" />
                        <div className="dot yellow" />
                        <div className="dot green" />
                        <span className="url-preview">theproteindrop.com</span>
                      </div>
                      
                      {/* Live Scrolling Web Page Canvas Frame */}
                      <div className="scroll-canvas-container">
                        <div className="scroll-canvas-track scroll-track-6">
                          <img
                            src="/projects/tpd-seq-1.jpg"
                            alt="The Protein Drop Hero - Protein, but make it chatkaara"
                            className="preview-img"
                          />
                          <img
                            src="/projects/tpd-seq-2.png"
                            alt="Two ways to make protein joyful & Better way to eat"
                            className="preview-img"
                          />
                          <img
                            src="/projects/tpd-seq-3.png"
                            alt="The Protein Drop Promise - Home Kitchen & Small Batch"
                            className="preview-img"
                          />
                          <img
                            src="/projects/tpd-seq-4.png"
                            alt="Voices of Our Customers - Verified Feedback"
                            className="preview-img"
                          />
                          <img
                            src="/projects/tpd-seq-5.png"
                            alt="Small-batch food cooked fresh"
                            className="preview-img"
                          />
                          <img
                            src="/projects/tpd-seq-6.png"
                            alt="The Protein Drop Footer & Gurgaon Contact"
                            className="preview-img"
                          />
                        </div>
                      </div>

                      <div className="preview-hover-overlay">
                        <a
                          href="https://www.theproteindrop.com/"
                          target="_blank"
                          rel="noreferrer"
                          className="visit-site-btn"
                        >
                          Visit Live Site ↗
                        </a>
                      </div>
                    </div>

                    <div className="project-card-footer">
                      <div className="project-meta">
                        <h3 className="project-name">The Protein Drop</h3>
                        <p className="project-category">Food business site with AI integrations</p>
                      </div>
                      <a
                        href="https://www.theproteindrop.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="project-arrow-link"
                        aria-label="Visit The Protein Drop website"
                      >
                        ↘
                      </a>
                    </div>
                  </motion.div>

                  {/* Project Card 2: Ikehu */}
                  <motion.div
                    className="project-card"
                    whileHover={{ y: -8, scale: 1.015 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="project-preview-window">
                      <div className="browser-bar">
                        <div className="dot red" />
                        <div className="dot yellow" />
                        <div className="dot green" />
                        <span className="url-preview">ikehu.in</span>
                      </div>
                      
                      {/* Live Scrolling Web Page Canvas Frame */}
                      <div className="scroll-canvas-container">
                        <div className="scroll-canvas-track scroll-track-4">
                          <img
                            src="/projects/ikehu-seq-1.png"
                            alt="Ikehu Hero - We are here"
                            className="preview-img"
                          />
                          <img
                            src="/projects/ikehu-seq-2.png"
                            alt="Ikehu - Why We Work & Insights not just Search"
                            className="preview-img"
                          />
                          <img
                            src="/projects/ikehu-seq-3.png"
                            alt="Ikehu - How We Work & Who We Work With"
                            className="preview-img"
                          />
                          <img
                            src="/projects/ikehu-seq-4.png"
                            alt="Ikehu Footer & Leadership Contact"
                            className="preview-img"
                          />
                        </div>
                      </div>

                      <div className="preview-hover-overlay">
                        <a
                          href="https://www.ikehu.in/"
                          target="_blank"
                          rel="noreferrer"
                          className="visit-site-btn"
                        >
                          Visit Live Site ↗
                        </a>
                      </div>
                    </div>

                    <div className="project-card-footer">
                      <div className="project-meta">
                        <h3 className="project-name">Ikehu</h3>
                        <p className="project-category">Talent search agency site with minimal premium feel</p>
                      </div>
                      <a
                        href="https://www.ikehu.in/"
                        target="_blank"
                        rel="noreferrer"
                        className="project-arrow-link"
                        aria-label="Visit Ikehu website"
                      >
                        ↘
                      </a>
                    </div>
                  </motion.div>

                  {/* Project Card 3: NudgeHQ (Under Construction) */}
                  <motion.div
                    className="project-card"
                    whileHover={{ y: -8, scale: 1.015 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="project-preview-window">
                      <div className="browser-bar">
                        <div className="dot red" />
                        <div className="dot yellow" />
                        <div className="dot green" />
                        <span className="url-preview">nudgehq.in</span>
                        <span className="status-pill-beta">IN DEV</span>
                      </div>
                      
                      {/* Live Scrolling Web Page Canvas Frame */}
                      <div className="scroll-canvas-container">
                        <div className="scroll-canvas-track scroll-track-10">
                          <img
                            src="/projects/nudgehq-seq-1.png"
                            alt="NudgeHQ Hero - Track Real Progress. Act at the Right Time."
                            className="preview-img"
                          />
                          <img
                            src="/projects/nudgehq-seq-2.png"
                            alt="NudgeHQ - Live work signals without manager chasing"
                            className="preview-img"
                          />
                          <img
                            src="/projects/nudgehq-seq-3.png"
                            alt="NudgeHQ Reports - Turn team signals into decisions"
                            className="preview-img"
                          />
                          <img
                            src="/projects/nudgehq-seq-4.png"
                            alt="NudgeHQ Dashboard Preview - One dashboard full visibility"
                            className="preview-img"
                          />
                          <img
                            src="/projects/nudgehq-seq-5.png"
                            alt="NudgeHQ - WhatsApp becomes front door for daily work"
                            className="preview-img"
                          />
                          <img
                            src="/projects/nudgehq-seq-6.png"
                            alt="NudgeHQ Early Feedback - Real words from HR leaders"
                            className="preview-img"
                          />
                          <img
                            src="/projects/nudgehq-seq-7.png"
                            alt="NudgeHQ FAQ - Frequently asked questions"
                            className="preview-img"
                          />
                          <img
                            src="/projects/nudgehq-seq-8.png"
                            alt="NudgeHQ Pricing - Simple flat pricing for early stage teams"
                            className="preview-img"
                          />
                          <img
                            src="/projects/nudgehq-seq-9.png"
                            alt="NudgeHQ Product Slides - What makes NudgeHQ feel exciting"
                            className="preview-img"
                          />
                          <img
                            src="/projects/nudgehq-seq-10.png"
                            alt="NudgeHQ Footer CTA - Stop chasing updates. Start knowing."
                            className="preview-img"
                          />
                        </div>
                      </div>

                      <div className="preview-hover-overlay">
                        <span className="visit-site-btn upcoming-badge">
                          🚧 Launching in 1–2 Months
                        </span>
                      </div>
                    </div>

                    <div className="project-card-footer">
                      <div className="project-meta">
                        <h3 className="project-name">
                          NudgeHQ <span className="dev-tag">Under Construction</span>
                        </h3>
                        <p className="project-category">Full stack AI platform · Premium look & automations</p>
                      </div>
                      <span className="project-arrow-link disabled-link" aria-label="Launching soon">
                        🔒
                      </span>
                    </div>
                  </motion.div>

                  {/* Project Card 4: GridSense.ai */}
                  <motion.div
                    className="project-card"
                    whileHover={{ y: -8, scale: 1.015 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="project-preview-window">
                      <div className="browser-bar">
                        <div className="dot red" />
                        <div className="dot yellow" />
                        <div className="dot green" />
                        <span className="url-preview">gridsense.ai</span>
                      </div>
                      
                      {/* Live Scrolling Web Page Canvas Frame */}
                      <div className="scroll-canvas-container">
                        <div className="scroll-canvas-track scroll-track-4">
                          <img
                            src="/projects/gridsense-seq-1.png"
                            alt="GridSense.ai Hero - Turn Chaos Into Command"
                            className="preview-img"
                          />
                          <img
                            src="/projects/gridsense-seq-2.png"
                            alt="GridSense.ai Core Capabilities - Four AI Modules One Unified Platform"
                            className="preview-img"
                          />
                          <img
                            src="/projects/gridsense-seq-3.png"
                            alt="GridSense.ai Smart Queue Manager Dashboard"
                            className="preview-img"
                          />
                          <img
                            src="/projects/gridsense-seq-4.png"
                            alt="GridSense.ai Footer - Make Your Next Event Truly Intelligent"
                            className="preview-img"
                          />
                        </div>
                      </div>

                      <div className="preview-hover-overlay">
                        <a
                          href="https://rishh4real.github.io/Gridsense.ai/"
                          target="_blank"
                          rel="noreferrer"
                          className="visit-site-btn"
                        >
                          Visit Live Site ↗
                        </a>
                      </div>
                    </div>

                    <div className="project-card-footer">
                      <div className="project-meta">
                        <h3 className="project-name">GridSense.ai</h3>
                        <p className="project-category">A frontend + static project delivered within 5 hours</p>
                      </div>
                      <a
                        href="https://rishh4real.github.io/Gridsense.ai/"
                        target="_blank"
                        rel="noreferrer"
                        className="project-arrow-link"
                        aria-label="Visit GridSense.ai website"
                      >
                        ↘
                      </a>
                    </div>
                  </motion.div>

                  {/* Project Card 5: CrisisGrid */}
                  <motion.div
                    className="project-card"
                    whileHover={{ y: -8, scale: 1.015 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="project-preview-window">
                      <div className="browser-bar">
                        <div className="dot red" />
                        <div className="dot yellow" />
                        <div className="dot green" />
                        <span className="url-preview">crisis-grid-ten.vercel.app</span>
                      </div>
                      
                      {/* Live Scrolling Web Page Canvas Frame */}
                      <div className="scroll-canvas-container">
                        <div className="scroll-canvas-track scroll-track-4">
                          <img
                            src="/projects/crisisgrid-seq-1.png"
                            alt="CrisisGrid Hero - Ground truth delivered to those who act"
                            className="preview-img"
                          />
                          <img
                            src="/projects/crisisgrid-seq-2.png"
                            alt="CrisisGrid - How It Works AI extraction and Who is it for"
                            className="preview-img"
                          />
                          <img
                            src="/projects/crisisgrid-seq-3.png"
                            alt="CrisisGrid Emergency Command Center Live Map"
                            className="preview-img"
                          />
                          <img
                            src="/projects/crisisgrid-seq-4.png"
                            alt="CrisisGrid - Submit Field Report AI Form"
                            className="preview-img"
                          />
                        </div>
                      </div>

                      <div className="preview-hover-overlay">
                        <a
                          href="https://crisis-grid-ten.vercel.app/"
                          target="_blank"
                          rel="noreferrer"
                          className="visit-site-btn"
                        >
                          Visit Live Site ↗
                        </a>
                      </div>
                    </div>

                    <div className="project-card-footer">
                      <div className="project-meta">
                        <h3 className="project-name">CrisisGrid</h3>
                        <p className="project-category">National level hackathon project with AI automations</p>
                      </div>
                      <a
                        href="https://crisis-grid-ten.vercel.app/"
                        target="_blank"
                        rel="noreferrer"
                        className="project-arrow-link"
                        aria-label="Visit CrisisGrid website"
                      >
                        ↘
                      </a>
                    </div>
                  </motion.div>

                  {/* Project Card 6: LexFlow (Protected Portal) */}
                  <motion.div
                    className="project-card"
                    whileHover={{ y: -8, scale: 1.015 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="project-preview-window">
                      <div className="browser-bar">
                        <div className="dot red" />
                        <div className="dot yellow" />
                        <div className="dot green" />
                        <span className="url-preview">lexflow-beta.vercel.app</span>
                        <span className="status-pill-beta">AUTH REQ</span>
                      </div>
                      
                      {/* Live Scrolling Web Page Canvas Frame */}
                      <div className="scroll-canvas-container">
                        <div className="scroll-canvas-track scroll-track-3">
                          <img
                            src="/projects/lexflow-seq-1.png"
                            alt="LexFlow Login Screen - AI Powered Court Judgment Intelligence"
                            className="preview-img"
                          />
                          <img
                            src="/projects/lexflow-seq-2.png"
                            alt="LexFlow Compliance Dashboard - Monitoring legal orders and student activity"
                            className="preview-img"
                          />
                          <img
                            src="/projects/lexflow-seq-3.png"
                            alt="LexFlow Admin Management - Oversee cases users and system integrity"
                            className="preview-img"
                          />
                        </div>
                      </div>

                      <div className="preview-hover-overlay">
                        <a
                          href="https://lexflow-beta.vercel.app/login"
                          target="_blank"
                          rel="noreferrer"
                          className="visit-site-btn"
                        >
                          Sign In Portal 🔒
                        </a>
                      </div>
                    </div>

                    <div className="project-card-footer">
                      <div className="project-meta">
                        <h3 className="project-name">
                          LexFlow <span className="dev-tag">Demo Login Required</span>
                        </h3>
                        <p className="project-category">Govt UP case management & law student internship portal</p>
                      </div>
                      <a
                        href="https://lexflow-beta.vercel.app/login"
                        target="_blank"
                        rel="noreferrer"
                        className="project-arrow-link"
                        aria-label="Visit LexFlow Portal"
                      >
                        ↘
                      </a>
                    </div>
                  </motion.div>

                </div>

                {/* Big Milestone Banner & GitHub Callout */}
                <motion.div
                  className="projects-milestone-banner"
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="milestone-badge-pill">2026 SHIPPED MILESTONE</div>
                  <h3 className="milestone-title">Have delivered 20+ sites within 2026</h3>
                  <p className="milestone-desc">
                    Explore open-source builds, web applications, AI tools, and full-stack repositories on GitHub.
                  </p>
                  <a
                    href="https://github.com/rishh4real"
                    target="_blank"
                    rel="noreferrer"
                    className="github-milestone-btn"
                  >
                    <svg className="github-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                    <span>Explore 20+ Repositories on GitHub ↗</span>
                  </a>
                </motion.div>
              </motion.div>
            )}

            {activeTab === "review" && (
              /* REVIEWS ROOM CONTENT */
              <motion.div
                key="reviews-content"
                className="reviews-copy"
                initial={{ opacity: 0, scale: 0.95, y: 35 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -35 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="reviews-header">
                  <h2 className="reviews-title" aria-label="Client Reviews">
                    {"Client Reviews".split("").map((char, index) => (
                      <motion.span
                        key={`rev-${index}`}
                        animate={{
                          y: [0, -8, 0, 5, 0],
                          rotate: [0, -2.5, 0, 1.8, 0],
                        }}
                        transition={{
                          duration: 4.0,
                          ease: "easeInOut",
                          repeat: Infinity,
                          delay: index * 0.08,
                        }}
                        style={{ display: "inline-block" }}
                      >
                        {char === " " ? "\u00a0" : char}
                      </motion.span>
                    ))}
                  </h2>
                  <p className="reviews-subtitle">TRUSTED BY INNOVATIVE FOUNDERS & CREATIVES</p>
                </div>

                {/* Floating Review Cards Grid */}
                <div className="floating-reviews-grid">
                  
                  {/* Floating Review 1 */}
                  <motion.div
                    className="floating-review-card card-1"
                    animate={{
                      y: [0, -14, 0, 10, 0],
                      rotate: [0, 1.2, 0, -1, 0],
                    }}
                    transition={{
                      duration: 5.8,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                    whileHover={{ scale: 1.03, y: -18, transition: { duration: 0.25 } }}
                  >
                    <div className="card-top">
                      <span className="service-tag">Web Design · Full Stack · AI & Automation</span>
                      <span className="rating-badge">★★★★★ 5/5</span>
                    </div>

                    <p className="testimonial-quote">
                      “Shaurya is hugely enthusiastic, bursting with energy and ideas, and extremely high on execution. He’s a solution provider and truly a one-stop shop.
                      <br /><br />
                      What I particularly love is the ownership he brings — he even puts reverse pressure on the client to move faster! Energetic, proactive, and always focused on getting things done.”
                    </p>

                    <div className="author-row">
                      <div className="author-info">
                        <strong className="author-name">Svetleena Choudhary</strong>
                        <span className="author-role">Ikehu & The Protein Drop</span>
                      </div>
                      <span className="verified-pill">
                        <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Verified Client
                      </span>
                    </div>
                  </motion.div>

                  {/* Floating Review 2 */}
                  <motion.div
                    className="floating-review-card card-2"
                    animate={{
                      y: [0, 12, 0, -15, 0],
                      rotate: [0, -1.4, 0, 1.1, 0],
                    }}
                    transition={{
                      duration: 6.4,
                      ease: "easeInOut",
                      repeat: Infinity,
                      delay: 0.6,
                    }}
                    whileHover={{ scale: 1.03, y: -18, transition: { duration: 0.25 } }}
                  >
                    <div className="card-top">
                      <span className="service-tag">Web Design · Freelance Portfolio</span>
                      <span className="rating-badge">★★★★★ 5/5</span>
                    </div>

                    <p className="testimonial-quote">
                      “Working with Shaurya was an excellent experience from start to finish. The website was delivered incredibly fast, and every change I requested was made promptly without any hassle. He paid close attention to every detail and translated my vision exactly the way I had imagined it.
                      <br /><br />
                      The final portfolio looks clean, professional, and perfectly reflects what I wanted. Highly recommend him to anyone looking for someone who is efficient, responsive, and genuinely committed to delivering quality work.”
                    </p>

                    <div className="author-row">
                      <div className="author-info">
                        <strong className="author-name">Aadishree Arora</strong>
                        <span className="author-role">Freelance Graphic Designer</span>
                      </div>
                      <span className="verified-pill">
                        <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Verified Client
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {activeTab === "pricing" && (
              /* PRICING ROOM CONTENT */
              <motion.div
                key="pricing-content"
                className="pricing-copy"
                initial={{ opacity: 0, scale: 0.95, y: 35 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -35 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="pricing-header">
                  <h2 className="pricing-title" aria-label="Pricing & Services">
                    {"Pricing & Services".split("").map((char, index) => (
                      <motion.span
                        key={`prc-${index}`}
                        animate={{
                          y: [0, -8, 0, 5, 0],
                          rotate: [0, -2.2, 0, 1.6, 0],
                        }}
                        transition={{
                          duration: 4.2,
                          ease: "easeInOut",
                          repeat: Infinity,
                          delay: index * 0.07,
                        }}
                        style={{ display: "inline-block" }}
                      >
                        {char === " " ? "\u00a0" : char}
                      </motion.span>
                    ))}
                  </h2>
                  <p className="pricing-subtitle">SIMPLE, TRANSPARENT TIERS & ADD-ON SERVICES</p>
                </div>

                {/* 3 Main Tiers Grid */}
                <div className="pricing-tiers-grid">
                  
                  {/* Tier 1: Starter */}
                  <motion.div
                    className="pricing-card"
                    animate={{
                      y: [0, -10, 0, 6, 0],
                    }}
                    transition={{
                      duration: 5.5,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                    whileHover={{ y: -12, scale: 1.02 }}
                  >
                    <div className="pricing-card-header">
                      <span className="card-badge">Starter</span>
                      <h3 className="card-title">Basic Site</h3>
                      <div className="card-price">₹12K</div>
                      <p className="card-subtitle-text">Simple business presence</p>
                    </div>
                    <p className="card-description">
                      A clean, responsive website for founders, freelancers, and local businesses that need to look credible fast.
                    </p>
                    <ul className="card-features">
                      <li><span>✓</span> Responsive pages</li>
                      <li><span>✓</span> Clean section structure</li>
                      <li><span>✓</span> Fast turnaround</li>
                      <li><span>✓</span> Basic content polish</li>
                    </ul>
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.hash = "contact";
                        setActiveTab("contact");
                      }}
                      className="pricing-cta-btn"
                    >
                      Start a build
                    </a>
                  </motion.div>

                  {/* Tier 2: Animated Experience (Popular) */}
                  <motion.div
                    className="pricing-card popular-card"
                    animate={{
                      y: [0, 8, 0, -10, 0],
                    }}
                    transition={{
                      duration: 6.0,
                      ease: "easeInOut",
                      repeat: Infinity,
                      delay: 0.3,
                    }}
                    whileHover={{ y: -12, scale: 1.025 }}
                  >
                    <div className="pricing-card-header">
                      <span className="card-badge popular-badge">Most Picked · Popular</span>
                      <h3 className="card-title">Animated Experience</h3>
                      <div className="card-price">₹18K</div>
                      <p className="card-subtitle-text">Premium presentation site</p>
                    </div>
                    <p className="card-description">
                      A richer visual website with motion, custom sections, and stronger storytelling for brands that need more impact.
                    </p>
                    <ul className="card-features">
                      <li><span>✓</span> Motion and transitions</li>
                      <li><span>✓</span> Custom visual direction</li>
                      <li><span>✓</span> Interactive UI moments</li>
                      <li><span>✓</span> Launch-ready polish</li>
                    </ul>
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.hash = "contact";
                        setActiveTab("contact");
                      }}
                      className="pricing-cta-btn highlight-btn"
                    >
                      Start a build
                    </a>
                  </motion.div>

                  {/* Tier 3: Custom (AI / Full Stack) */}
                  <motion.div
                    className="pricing-card"
                    animate={{
                      y: [0, -7, 0, 9, 0],
                    }}
                    transition={{
                      duration: 6.5,
                      ease: "easeInOut",
                      repeat: Infinity,
                      delay: 0.6,
                    }}
                    whileHover={{ y: -12, scale: 1.02 }}
                  >
                    <div className="pricing-card-header">
                      <span className="card-badge">Custom</span>
                      <h3 className="card-title">AI / Full Stack Build</h3>
                      <div className="card-price">₹20K-50K</div>
                      <p className="card-subtitle-text">According to requirements</p>
                    </div>
                    <p className="card-description">
                      Custom websites, dashboards, AI integrations, bots, and automations built around the exact workflow.
                    </p>
                    <ul className="card-features">
                      <li><span>✓</span> AI integrations</li>
                      <li><span>✓</span> Backend/API work</li>
                      <li><span>✓</span> Workflow automation</li>
                      <li><span>✓</span> Requirement-based scope</li>
                    </ul>
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.hash = "contact";
                        setActiveTab("contact");
                      }}
                      className="pricing-cta-btn"
                    >
                      Start a build
                    </a>
                  </motion.div>

                </div>

                {/* Add-ons Section */}
                <div className="addons-section">
                  <div className="addons-header">
                    <h3 className="addons-title">Add-ons · <span className="light-txt">Extra shop services</span></h3>
                    <p className="addons-subtitle-text">
                      Use these when the site needs content support, design edits, campaigns, or ongoing care after launch.
                    </p>
                  </div>

                  <div className="addons-grid">
                    
                    {/* Add-on 1 */}
                    <div className="addon-row-item">
                      <div className="addon-left">
                        <strong className="addon-name-txt">WP Catalog</strong>
                        <p className="addon-desc-txt">Product or service catalog setup with clean navigation.</p>
                      </div>
                      <div className="addon-right">
                        <span className="addon-price-tag">₹8K-20K</span>
                      </div>
                    </div>

                    {/* Add-on 2 */}
                    <div className="addon-row-item">
                      <div className="addon-left">
                        <strong className="addon-name-txt">Canva Editing</strong>
                        <p className="addon-desc-txt">Per-template edits for branded social or business visuals.</p>
                      </div>
                      <div className="addon-right">
                        <span className="addon-price-tag">₹1K-2K</span>
                      </div>
                    </div>

                    {/* Add-on 3 */}
                    <div className="addon-row-item">
                      <div className="addon-left">
                        <strong className="addon-name-txt">Canva Video Editing</strong>
                        <p className="addon-desc-txt">Short-form or campaign edits with better pacing and polish.</p>
                      </div>
                      <div className="addon-right">
                        <span className="addon-price-tag">₹1.5K-5K</span>
                      </div>
                    </div>

                    {/* Add-on 4 */}
                    <div className="addon-row-item">
                      <div className="addon-left">
                        <strong className="addon-name-txt">Email Marketing</strong>
                        <p className="addon-desc-txt">Campaign structure, setup, hosting support, and clean outreach flow.</p>
                      </div>
                      <div className="addon-right">
                        <span className="addon-price-tag">₹7K-10K</span>
                      </div>
                    </div>

                    {/* Add-on 5 */}
                    <div className="addon-row-item">
                      <div className="addon-left">
                        <strong className="addon-name-txt">Monthly Maintenance</strong>
                        <p className="addon-desc-txt">Content updates, small fixes, improvements, and priority support.</p>
                      </div>
                      <div className="addon-right">
                        <span className="addon-price-tag">₹4K-5K</span>
                      </div>
                    </div>

                  </div>
                </div>

              </motion.div>
            )}

            {activeTab === "contact" && (
              /* CONTACT ROOM CONTENT */
              <motion.div
                key="contact-content"
                className="contact-copy"
                initial={{ opacity: 0, scale: 0.95, y: 35 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -35 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="contact-header">
                  <h2 className="contact-title" aria-label="Say hello">
                    {"Say hello".split("").map((char, index) => (
                      <motion.span
                        key={`say-${index}`}
                        animate={{
                          y: [0, -10, 0, 6, 0],
                          rotate: [0, -3, 0, 2.2, 0],
                        }}
                        transition={{
                          duration: 3.6,
                          ease: "easeInOut",
                          repeat: Infinity,
                          delay: index * 0.08,
                        }}
                        style={{ display: "inline-block" }}
                      >
                        {char === " " ? "\u00a0" : char}
                      </motion.span>
                    ))}
                  </h2>

                  <motion.p
                    className="contact-subtitle"
                    animate={{
                      opacity: [0.6, 1, 0.6],
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 3.5,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }}
                  >
                    I LOOK FORWARD TO HEARING FROM YOU
                  </motion.p>
                </div>

                {/* Pill Selectors */}
                <div className="contact-pills">
                  <button
                    type="button"
                    className={`pill-btn ${contactType === "email" ? "is-active" : ""}`}
                    onClick={() => setContactType("email")}
                  >
                    Email ↘
                  </button>
                  <button
                    type="button"
                    className={`pill-btn ${contactType === "whatsapp" ? "is-active" : ""}`}
                    onClick={() => setContactType("whatsapp")}
                  >
                    WhatsApp ↘
                  </button>
                </div>

                {/* Contact Value Display */}
                <div className="contact-main">
                  <AnimatePresence mode="wait">
                    {contactType === "email" ? (
                      <motion.div
                        key="email-view"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                        className="contact-value-group"
                      >
                        <motion.a
                          href="mailto:rishh4work@gmail.com"
                          className="contact-value-link"
                          animate={{
                            scale: [1, 1.028, 1],
                          }}
                          transition={{
                            duration: 4.5,
                            ease: "easeInOut",
                            repeat: Infinity,
                          }}
                          whileHover={{
                            scale: 1.06,
                            y: -6,
                          }}
                        >
                          rishh4work@gmail.com
                        </motion.a>
                        <button
                          type="button"
                          className="copy-btn"
                          onClick={() => handleCopy("rishh4work@gmail.com")}
                        >
                          {copied ? "Copied! ✓" : "Copy Email"}
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="whatsapp-view"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                        className="contact-value-group"
                      >
                        <motion.a
                          href="https://wa.me/917018293100"
                          target="_blank"
                          rel="noreferrer"
                          className="contact-value-link"
                          animate={{
                            scale: [1, 1.028, 1],
                          }}
                          transition={{
                            duration: 4.5,
                            ease: "easeInOut",
                            repeat: Infinity,
                          }}
                          whileHover={{
                            scale: 1.06,
                            y: -6,
                          }}
                        >
                          +91 7018293100
                        </motion.a>
                        <div className="contact-btn-row">
                          <a
                            href="https://wa.me/917018293100"
                            target="_blank"
                            rel="noreferrer"
                            className="copy-btn action-link-btn"
                          >
                            Chat on WhatsApp ↗
                          </a>
                          <button
                            type="button"
                            className="copy-btn"
                            onClick={() => handleCopy("+91 7018293100")}
                          >
                            {copied ? "Copied! ✓" : "Copy Number"}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Social Media Links (LinkedIn & Instagram) */}
                <div className="contact-socials-row">
                  <motion.a
                    href="https://www.linkedin.com/in/shaurya-sharma-72ab8b376/"
                    target="_blank"
                    rel="noreferrer"
                    className="social-pill"
                    whileHover={{ y: -3, scale: 1.05 }}
                  >
                    <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z"/>
                    </svg>
                    <span>LinkedIn ↗</span>
                  </motion.a>

                  <motion.a
                    href="https://www.instagram.com/shauryaa.ai/"
                    target="_blank"
                    rel="noreferrer"
                    className="social-pill"
                    whileHover={{ y: -3, scale: 1.05 }}
                  >
                    <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span>Instagram ↗</span>
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <footer className="bottom-controls">
          <span className="year">©2026</span>
        </footer>
      </section>
    </main>
  );
}
