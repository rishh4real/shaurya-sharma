import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Shaurya Sharma portfolio shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Shaurya Sharma - Web Design, AI Automations &amp; Strategy<\/title>/i);
  assert.match(html, /shaurya sharma/i);
  assert.match(html, /Branding, social media and web design/i);
  assert.match(html, />Home</);
  assert.match(html, />Projects</);
  assert.match(html, />Review</);
  assert.match(html, />Pricing</);
  assert.match(html, />Contact</);
  assert.match(html, /View my work/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site|react-loading-skeleton/i);
});

test("keeps mobile navigation and performance safeguards in source", async () => {
  const [page, css, canvas] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/components/LiveBackgroundCanvas.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(page, /href="#review"/);
  assert.match(page, /href="#pricing"/);
  assert.match(page, /setActiveTab\("review"\)/);
  assert.match(page, /data-active-tab=\{activeTab\}/);
  assert.match(page, /enabled=\{activeTab !== "projects"\}/);
  assert.match(page, /loading="lazy"/);
  assert.doesNotMatch(page, /navVisible|console\.log|>Team</);

  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /\.nav a\s*\{[\s\S]*display:\s*inline-flex/);
  assert.match(css, /\.preview-img:not\(:first-child\)\s*\{[\s\S]*display:\s*none/);
  assert.match(css, /\.project-card:hover \.scroll-canvas-track/);
  assert.match(css, /\.site-shell:not\(\[data-active-tab="hero"\]\)\s*\{[\s\S]*overflow:\s*visible/);
  assert.match(css, /\.site-shell\[data-active-tab="projects"\] \.projects-image/);
  assert.match(css, /\.site-shell\[data-active-tab="projects"\] \.room-projects::after/);
  assert.match(css, /\.addons-grid\s*\{[\s\S]*overflow-x:\s*auto/);
  assert.match(css, /\.addon-row-item\s*\{[\s\S]*scroll-snap-align:\s*start/);

  assert.match(canvas, /min-width: 761px/);
  assert.match(canvas, /enabled = true/);
  assert.match(canvas, /devicePixelRatio \|\| 1, 1\.25/);
  assert.match(canvas, /now - lastFrame < 33/);
});
