import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions - Shaurya Sharma",
  description: "Freelance web development terms and conditions for quoted projects by Shaurya Sharma.",
};

const quickTerms = [
  { label: "Advance", value: "50%", note: "before work starts" },
  { label: "Revisions", value: "2 rounds", note: "included in quoted price" },
  { label: "Support", value: "25 days", note: "for bugs and fixes" },
  { label: "Quote Validity", value: "7 days", note: "from quoted date" },
];

const termsSections = [
  {
    title: "Payment & Go-Live",
    eyebrow: "Before work starts",
    items: [
      "A 50% advance is required before work begins; the remaining balance is due before go-live.",
      "Until full payment is cleared, the site is shared through a Vercel/local preview link only.",
      "The live domain is connected only after complete payment.",
      "Quoted prices stay valid for 7 days.",
    ],
  },
  {
    title: "Timeline & Content",
    eyebrow: "What I need from you",
    items: [
      "The timeline starts after the advance is received and all required content is shared.",
      "Client is responsible for providing all text, images, logos, and brand assets.",
      "Content should be shared within 3 days of project start.",
      "Delays in content create equivalent delivery delays and are not counted as my delay.",
      "If client-provided images are low quality, final output quality cannot be guaranteed.",
    ],
  },
  {
    title: "Revisions",
    eyebrow: "Clean feedback loop",
    items: [
      "Every quoted project includes 2 rounds of revisions.",
      "Extra revision rounds are charged separately at ₹500 per round.",
      "Revision requests are handled through the WhatsApp group only.",
      "Revisions cover changes to existing content, not new sections or new features.",
    ],
  },
  {
    title: "Ownership & Portfolio",
    eyebrow: "After final payment",
    items: [
      "Full ownership transfers to the client only after complete payment.",
      "Shaurya can show the project in the portfolio unless the client requests otherwise.",
      "Domain and hosting accounts should be in the client's name.",
    ],
  },
  {
    title: "Cancellation",
    eyebrow: "If plans change",
    items: [
      "Advance is non-refundable if the client cancels after work begins.",
      "If Shaurya cancels, the full advance is refunded.",
      "No work is handed over until full payment is cleared.",
    ],
  },
  {
    title: "Post Delivery",
    eyebrow: "Support window",
    items: [
      "Delivered work includes 25 days of free support for bugs and fixes.",
      "New features or new sections after delivery are quoted separately.",
      "Support is handled through the WhatsApp group, with response within 24 hours.",
    ],
  },
];

export default function TermsAndConditions() {
  return (
    <main className="terms-page">
      <nav className="terms-site-nav" aria-label="Terms page navigation">
        <Link href="/" className="terms-brand">
          shaurya <em>sharma</em>
        </Link>
        <div className="terms-nav-links">
          <Link href="/#projects">Projects</Link>
          <Link href="/#pricing">Pricing</Link>
          <Link href="/#contact">Contact</Link>
        </div>
      </nav>

      <section className="terms-hero" aria-labelledby="terms-page-title">
        <div className="terms-hero-copy">
          <p className="terms-kicker">Freelance Web Development Terms</p>
          <h1 id="terms-page-title">Clear terms before we start building.</h1>
          <p>
            These terms keep every quoted website project simple: what is included, when payment happens,
            how revisions work, and what happens after delivery.
          </p>
        </div>
        <aside className="terms-document-panel" aria-label="Document details">
          <div>
            <span>Document</span>
            <strong>Freelance T&amp;C</strong>
          </div>
          <div>
            <span>Last updated</span>
            <strong>11 September 2026</strong>
          </div>
          <div>
            <span>Validity</span>
            <strong>Applies to all quoted projects</strong>
          </div>
          <div>
            <span>From</span>
            <strong>Shaurya Sharma</strong>
            <small>Web Designer &amp; AI Automation Specialist</small>
          </div>
        </aside>
      </section>

      <section className="terms-quick-grid" aria-label="Key project terms">
        {quickTerms.map((term) => (
          <article key={term.label} className="terms-quick-card">
            <span>{term.label}</span>
            <strong>{term.value}</strong>
            <p>{term.note}</p>
          </article>
        ))}
      </section>

      <section className="terms-content-section" aria-label="Detailed terms">
        <div className="terms-section-heading">
          <p>Project Rules</p>
          <h2>Everything a client should know upfront.</h2>
        </div>

        <div className="terms-grid">
          {termsSections.map((section) => (
            <article className="terms-card" key={section.title}>
              <span>{section.eyebrow}</span>
              <h3>{section.title}</h3>
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="terms-legal-band" aria-labelledby="terms-legal-title">
        <div>
          <p>Legal</p>
          <h2 id="terms-legal-title">A few final boundaries.</h2>
        </div>
        <ul>
          <li>Shaurya is not responsible for third-party service downtime, including hosting, domain, or WhatsApp API issues.</li>
          <li>Client is responsible for copyright of client-provided content, including text and images.</li>
          <li>Disputes should be resolved mutually before legal action.</li>
        </ul>
      </section>

      <footer className="terms-footer">
        <div>
          <strong>Shaurya Sharma</strong>
          <span>Web Designer &amp; AI Automation Specialist</span>
        </div>
        <div>
          <a href="mailto:rishh4work@gmail.com">rishh4work@gmail.com</a>
          <a href="https://wa.me/917018293100" target="_blank" rel="noreferrer">
            +91 7018293100
          </a>
        </div>
        <small>This document forms part of every invoice/quotation issued by Shaurya Sharma unless stated otherwise.</small>
      </footer>
    </main>
  );
}
