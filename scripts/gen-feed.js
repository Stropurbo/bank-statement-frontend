// Generates public/feed.xml (RSS 2.0) from src/data/usecases.json.
// Run as part of `npm run build`.
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const usecases = JSON.parse(
  readFileSync(join(root, "src/data/usecases.json"), "utf-8")
);

const esc = (s) =>
  String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const items = [...usecases]
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 50)
  .map((u) => {
    const link = `https://www.sheetlypro.com/use-case/${u.id}`;
    const pubDate = new Date(u.date + "T12:00:00Z").toUTCString();
    const agents = (u.agents && u.agents.length ? u.agents : ["Custom agent"]).join(", ");
    return `    <item>
      <title>${esc(u.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${esc(u.summary)} (Agents: ${esc(agents)} · Source: ${esc(u.source)})</description>
    </item>`;
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>SheetlyPro — AI Agent Use Cases</title>
    <link>https://www.sheetlypro.com</link>
    <description>Real things people are doing with AI agents, collected every day.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;

writeFileSync(join(root, "public/feed.xml"), xml);
console.log(`feed.xml written (${usecases.length} use cases, ${items.split("<item>").length - 1} items)`);
