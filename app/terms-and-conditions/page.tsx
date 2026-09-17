import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions - Shaurya Sharma",
  description: "Freelance web development terms and conditions for quoted projects by Shaurya Sharma.",
};

const termsSections = [
  {
    title: "Payment & Delivery",
    items: [
      <>
        <strong>50% advance</strong> before work starts, balance before go-live
      </>,
      <>Site shown on Vercel/local link only — live domain only after full payment</>,
      <>Timeline starts only after advance received AND all content shared</>,
      <>
        Prices quoted are valid for <strong>7 days</strong> only
      </>,
    ],
  },
  {
    title: "Revisions",
    items: [
      <>
        <strong>2 rounds</strong> of revisions included in quoted price
      </>,
      <>
        Each extra round charged separately <strong>(₹500/round)</strong>
      </>,
      <>Revision requests only through WhatsApp group</>,
      <>Revision scope = changes to existing content, NOT new sections/features</>,
    ],
  },
  {
    title: "Content & Assets",
    items: [
      <>Client responsible for providing all text, images, logos</>,
      <>
        Content must be shared within <strong>3 days</strong> of project start
      </>,
      <>Delays in content = equivalent delay in delivery (not Shaurya&apos;s fault)</>,
      <>If client-provided images are low quality, final output quality not guaranteed</>,
    ],
  },
  {
    title: "Ownership & Rights",
    items: [
      <>Full ownership transfers to client only after complete payment</>,
      <>Shaurya retains right to show project in portfolio unless client requests otherwise</>,
      <>Domain, hosting accounts should be in client&apos;s name</>,
    ],
  },
  {
    title: "Cancellation",
    items: [
      <>Advance is non-refundable if client cancels after work begins</>,
      <>If Shaurya cancels, full advance refunded</>,
      <>No work handed over until full payment cleared</>,
    ],
  },
  {
    title: "Post Delivery",
    items: [
      <>
        <strong>25 days</strong> free support for bugs/fixes on delivered work
      </>,
      <>New features/sections after delivery quoted separately</>,
      <>Support only via WhatsApp group, response within 24 hours</>,
    ],
  },
];

export default function TermsAndConditions() {
  return (
    <main className="terms-page">
      <div className="terms-shell">
        <nav className="terms-topbar" aria-label="Terms page navigation">
          <Link href="/" className="terms-back-link">
            Back to portfolio
          </Link>
          <span>Web Development Services</span>
          <strong>Shaurya Sharma</strong>
        </nav>

        <header className="terms-summary">
          <div>
            <span>Document</span>
            <strong>Freelance T&amp;C</strong>
          </div>
          <div>
            <span>Last Updated On</span>
            <strong>11 September 2026</strong>
          </div>
          <div>
            <span>Validity</span>
            <strong>Applies to all quoted projects</strong>
          </div>
        </header>

        <section className="terms-from" aria-labelledby="terms-from-title">
          <span id="terms-from-title">From</span>
          <h1>Shaurya Sharma</h1>
          <p>Web Designer &amp; AI Automation Specialist</p>
          <p>rishh4work@gmail.com&nbsp;&nbsp; | &nbsp;&nbsp;+91 7018293100</p>
        </section>

        <section className="terms-grid" aria-label="Freelance terms and conditions">
          {termsSections.map((section) => (
            <article className="terms-card" key={section.title}>
              <h2>{section.title}</h2>
              <ul>
                {section.items.map((item, index) => (
                  <li key={`${section.title}-${index}`}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="terms-card terms-legal" aria-labelledby="terms-legal-title">
          <h2 id="terms-legal-title">Legal</h2>
          <ul>
            <li>Shaurya not responsible for third-party service downtime (hosting, domain, WhatsApp API etc.)</li>
            <li>Client is responsible for copyright of client-provided content (text, images)</li>
            <li>Disputes to be resolved mutually before legal action</li>
          </ul>
        </section>

        <footer className="terms-footer">
          <p>Shaurya Sharma — Web Designer &amp; AI Automation Specialist</p>
          <p>rishh4work@gmail.com | +91 7018293100</p>
          <small>This document forms part of every invoice/quotation issued by Shaurya Sharma unless stated otherwise.</small>
        </footer>
      </div>
    </main>
  );
}
