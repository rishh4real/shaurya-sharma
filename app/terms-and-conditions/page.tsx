import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions - Shaurya Sharma",
  description: "Freelance web development terms and conditions for quoted projects by Shaurya Sharma.",
};

const termsSections = [
  {
    number: "01",
    title: "Payment & Go-Live",
    body:
      "A 50% advance confirms the project and starts the work. The remaining balance is cleared before the final site goes live on the client domain.",
    points: [
      "Until full payment is complete, the site is shared through a local or Vercel preview link.",
      "Quoted prices stay valid for 7 days from the quote date.",
    ],
  },
  {
    number: "02",
    title: "Content & Assets",
    body:
      "Project timelines begin once the advance is received and the required text, images, logos, and brand assets are shared.",
    points: [
      "Content should be shared within 3 days of project start.",
      "Delays in content create matching delivery delays.",
      "Final quality depends on the quality of client-provided images and assets.",
    ],
  },
  {
    number: "03",
    title: "Revisions",
    body:
      "Every quoted project includes 2 rounds of revisions so the final site feels sharp without turning feedback into an endless loop.",
    points: [
      "Extra revision rounds are charged separately at ₹500 per round.",
      "Revision requests are handled through the WhatsApp group.",
      "Revisions cover existing content, not new features or new sections.",
    ],
  },
  {
    number: "04",
    title: "Ownership & Portfolio",
    body:
      "Full ownership of the completed work transfers to the client after complete payment. Domain and hosting accounts should stay in the client's name.",
    points: ["Shaurya may show the project in the portfolio unless the client requests otherwise."],
  },
  {
    number: "05",
    title: "Cancellation",
    body:
      "If the client cancels after work begins, the advance is non-refundable. If Shaurya cancels the project, the full advance is refunded.",
    points: ["No final files, handover, or live deployment are provided until full payment is cleared."],
  },
  {
    number: "06",
    title: "Post Delivery",
    body:
      "Delivered work includes 25 days of free support for bugs and fixes connected to the agreed project scope.",
    points: [
      "New features or new sections after delivery are quoted separately.",
      "Support is handled through WhatsApp with response within 24 hours.",
    ],
  },
  {
    number: "07",
    title: "Legal",
    body:
      "Shaurya is not responsible for third-party service downtime, including hosting, domains, payment tools, or WhatsApp API services.",
    points: [
      "The client is responsible for copyright of client-provided text, images, and brand material.",
      "Disputes should be resolved mutually before legal action.",
    ],
  },
];

export default function TermsAndConditions() {
  return (
    <main className="terms-room">
      <div className="terms-room-bg" aria-hidden="true" />
      <div className="terms-room-light" aria-hidden="true" />
      <div className="terms-room-grain" aria-hidden="true" />

      <nav className="terms-room-nav" aria-label="Terms page navigation">
        <Link href="/" className="terms-room-brand">
          shaurya <em>sharma</em>
        </Link>
        <div className="terms-room-links">
          <Link href="/#projects">Projects</Link>
          <Link href="/#review">Review</Link>
          <Link href="/#pricing">Pricing</Link>
          <Link href="/terms-and-conditions" aria-current="page">
            Terms
          </Link>
          <Link href="/#contact">Contact</Link>
        </div>
      </nav>

      <section className="terms-room-hero" aria-labelledby="terms-page-title">
        <p className="terms-room-kicker">Freelance T&amp;C / Updated 11 September 2026</p>
        <h1 id="terms-page-title">Terms that keep the build clear.</h1>
        <p>
          Simple working terms for every quoted website project: payment, content, revisions,
          handover, support, and the boundaries that keep the process clean.
        </p>
        <div className="terms-room-meta" aria-label="Document details">
          <span>Shaurya Sharma</span>
          <span>Web Designer &amp; AI Automation Specialist</span>
          <span>Applies to all quoted projects</span>
        </div>
      </section>

      <section className="terms-writing" aria-label="Terms and conditions">
        {termsSections.map((section) => (
          <article className="terms-writing-block" key={section.title}>
            <span className="terms-writing-number">{section.number}</span>
            <div>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
              <ul>
                {section.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>

      <footer className="terms-room-footer">
        <p>This document forms part of every invoice/quotation issued by Shaurya Sharma unless stated otherwise.</p>
        <div>
          <a href="mailto:rishh4work@gmail.com">rishh4work@gmail.com</a>
          <a href="https://wa.me/917018293100" target="_blank" rel="noreferrer">
            +91 7018293100
          </a>
        </div>
      </footer>
    </main>
  );
}
