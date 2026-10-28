import { Link } from "react-router-dom";
import { usePageTitle } from "../lib/usePageTitle";
import { useCanonical } from "../lib/useCanonical";

export default function GuideByNumbers() {
  usePageTitle("SheetlyPro by the numbers: 132 real-world AI agent use cases");
  useCanonical("/guides/sheetlypro-by-the-numbers");

  return (
    <div className="py-10 max-w-2xl">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-500 mb-2 dark:text-neutral-400">
        Guides
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-black mb-4 dark:text-white">
        SheetlyPro by the numbers: 132 real-world AI agent use cases
      </h1>
      <p className="my-4 text-neutral-600 leading-relaxed dark:text-neutral-300">
        Every finding below is a complete sentence, and every number comes from
        one source: the SheetlyPro directory itself. Nothing here is imported
        from another study, and no external statistic is used.
      </p>

      <h2 className="text-xl font-bold text-black mt-8 mb-3 dark:text-white">
        How these numbers were counted
      </h2>
      <ul className="list-disc pl-5 space-y-2 my-4 text-neutral-600 dark:text-neutral-300">
        <li>
          <strong>Source file:</strong> <code>src/data/usecases.json</code> on
          the main branch of the SheetlyPro repository, read on 29 October 2026.
        </li>
        <li>
          <strong>What was counted:</strong> all 132 entries in that file.
        </li>
        <li>
          <strong>Dates:</strong> each entry carries the date it was added to
          the directory (11 September to 28 October 2026), not the date of the
          original source post.
        </li>
        <li>
          <strong>Topics:</strong> each entry carries exactly one of the
          directory&apos;s own 8 topic slugs, so topic counts sum to 132.
        </li>
        <li>
          <strong>Agents:</strong> each agent string in an entry&apos;s agents
          list counts once for that string, exactly as written. An entry naming
          two tools counts once for each. Agent name variants (for example
          Gemma, Gemma 2 and Gemma 3) are counted separately, as written, not
          merged — so the distinct-string count below is an upper bound on
          distinct products, not a count of distinct products.
        </li>
        <li>
          <strong>Sources:</strong> each entry carries exactly one source
          label, so source counts sum to 132.
        </li>
      </ul>

      <h2 className="text-xl font-bold text-black mt-8 mb-3 dark:text-white">
        The findings
      </h2>
      <ul className="list-disc pl-5 space-y-2 my-4 text-neutral-600 dark:text-neutral-300">
        <li>
          SheetlyPro listed 132 real-world AI agent use cases between 11
          September and 28 October 2026.
        </li>
        <li>Productivity is the largest topic, with 26 of 132 use cases (19.7%).</li>
        <li>Coding &amp; Dev is the second-largest topic, with 25 of 132 use cases (18.9%).</li>
        <li>Marketing &amp; Sales and Business Ops tie at 18 use cases each (13.6% each).</li>
        <li>Everyday Life accounts for 15 of 132 use cases (11.4%).</li>
        <li>Creative accounts for 13 of 132 use cases (9.8%).</li>
        <li>Money, Bills &amp; Benefits accounts for 12 of 132 use cases (9.1%).</li>
        <li>Learning is the smallest topic, with 5 of 132 use cases (3.8%).</li>
        <li>
          42 of 132 use cases (31.8%) name no specific commercial tool and are
          listed as &ldquo;Custom agent&rdquo;.
        </li>
        <li>
          Among named tools, Claude appears in 19 use cases, Claude Code appears
          in 19 use cases, n8n appears in 18 use cases, and ChatGPT appears in
          15 use cases.
        </li>
        <li>
          Counting the Claude name variants together (Claude, Claude Code,
          Claude Haiku and Claude Sonnet) gives 40 agent mentions, noting that
          one entry naming two variants counts twice in that total.
        </li>
        <li>26 of 132 use cases (19.7%) combine two or more tools in a single workflow.</li>
        <li>
          The directory&apos;s entries come from 28 sources, and the top five
          sources (dev.to with 39 entries, Reddit with 22, Medium with 16, X
          with 14 and Substack with 10) account together for 101 of 132 use
          cases (76.5%).
        </li>
        <li>
          In the most recent 10 directory days (19 to 28 October 2026), 68 use
          cases were added, an average of 6.8 per day.
        </li>
        <li>
          The directory uses 37 distinct agent strings as written, and variant
          spellings of the same product family are counted separately, so 37 is
          an upper bound on distinct products rather than a count of them.
        </li>
      </ul>

      <h2 className="text-xl font-bold text-black mt-8 mb-3 dark:text-white">
        What this does not show
      </h2>
      <ul className="list-disc pl-5 space-y-2 my-4 text-neutral-600 dark:text-neutral-300">
        <li>
          These counts describe what the directory has collected, not what the
          whole world does with AI agents. Topics with more entries may reflect
          what the directory&apos;s sources publish, not what is most common in
          practice.
        </li>
        <li>
          The directory date is the date an entry was added, so the recent pace
          (6.8 per day) describes publishing speed, not a change in how many
          people use agents.
        </li>
        <li>
          No outcome, revenue or time-saved figure is claimed here, because the
          directory&apos;s entries do not measure outcomes consistently.
        </li>
      </ul>

      <h2 className="text-xl font-bold text-black mt-8 mb-3 dark:text-white">
        Suggested citation
      </h2>
      <p className="my-4 text-neutral-600 leading-relaxed dark:text-neutral-300">
        When quoting these findings, link to{" "}
        <a href="https://www.sheetlypro.com" className="text-blue-600 hover:underline dark:text-blue-400">
          https://www.sheetlypro.com
        </a>{" "}
        and describe the source as &ldquo;SheetlyPro, a curated directory of
        real-world AI agent use cases (132 entries, 11 September to 28 October
        2026)&rdquo;.
      </p>
      <p className="my-4 text-neutral-600 leading-relaxed dark:text-neutral-300">
        See also:{" "}
        <Link to="/guides/inbox-ai-agents-compared" className="text-blue-600 hover:underline dark:text-blue-400">
          AI agents for inbox management, compared
        </Link>{" "}
        — one buyer task from this directory, compared across the tools people
        actually used. Browse all use cases by{" "}
        <Link to="/topics" className="text-blue-600 hover:underline dark:text-blue-400">
          topic
        </Link>{" "}
        or by{" "}
        <Link to="/agents" className="text-blue-600 hover:underline dark:text-blue-400">
          agent
        </Link>
        .
      </p>
    </div>
  );
}
