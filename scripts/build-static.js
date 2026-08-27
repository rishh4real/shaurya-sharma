import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

async function generateStaticHtml() {
  console.log("Generating static index.html from server bundle...");
  const serverPath = resolve(process.cwd(), "dist/server/index.js");
  const { default: worker } = await import(`file://${serverPath}`);

  const res = await worker.fetch(
    new Request("http://localhost/"),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    }
  );

  const html = await res.text();
  const outputPath = resolve(process.cwd(), "dist/client/index.html");
  await writeFile(outputPath, html, "utf8");
  console.log(`✓ Saved static HTML to ${outputPath} (${html.length} bytes)`);
}

generateStaticHtml().catch((err) => {
  console.error("Failed to generate static HTML:", err);
  process.exit(1);
});
