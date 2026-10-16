import { Link } from "react-router-dom";
import usecases from "../data/usecases.json";
import { topics } from "../data/topics";
import { agentCounts } from "../lib/usecases";
import NewsletterSignup from "../components/NewsletterSignup";

export default function About() {
  const agents = agentCounts();

  return (
    <div className="py-10 max-w-2xl">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-500 mb-2 dark:text-neutral-400">
        About
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-black mb-4 dark:text-white">
        What people actually do with AI agents.
      </h1>
      <div className="text-neutral-600 space-y-4 leading-relaxed dark:text-neutral-300">
        <p>
          <strong className="text-black dark:text-white">SheetlyPro</strong> is a curated
          directory of what people actually do with AI agents — not demos, not
          hype, but real workflows people describe using in public posts.
        </p>

        <div className="grid grid-cols-3 gap-3 py-4">
          <div className="border border-neutral-200 rounded-xl p-4 text-center dark:border-neutral-800">
            <p className="text-2xl font-bold text-black dark:text-white">{usecases.length}</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">use cases</p>
          </div>
          <div className="border border-neutral-200 rounded-xl p-4 text-center dark:border-neutral-800">
            <p className="text-2xl font-bold text-black dark:text-white">{agents.length}</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">agents tracked</p>
          </div>
          <div className="border border-neutral-200 rounded-xl p-4 text-center dark:border-neutral-800">
            <p className="text-2xl font-bold text-black dark:text-white">{topics.length}</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">topics</p>
          </div>
        </div>

        <p>
          <strong className="text-black dark:text-white">How curation works:</strong> every day
          we scan public posts across Reddit, X, Substack, and dev communities
          for concrete agent workflows. Each entry is summarized in our own
          words and linked back to its source platform. We never invent quotes,
          numbers, or results.
        </p>
        <p>
          <strong className="text-black dark:text-white">Why it exists:</strong> agent tooling
          moves fast and marketing moves faster. A single place to see grounded,
          practical patterns helps builders skip the noise.
        </p>
        <p>
          <strong className="text-black dark:text-white">The Daily 5:</strong> every morning we
          send the five best new use cases to your inbox — each with the prompt
          to try it yourself. Free, no spam, unsubscribe anytime.
        </p>
        <p>
          Found a great use case we missed, or want something corrected? Email{" "}
          <a
            href="mailto:contact@sheetlypro.com"
            className="underline text-black dark:text-white"
          >
            contact@sheetlypro.com
          </a>
          .
        </p>
        <p>
          <Link to="/advertise" className="underline text-black dark:text-white">
            Sponsor SheetlyPro
          </Link>{" "}
          — reach readers who build with AI agents.
        </p>
      </div>

      <div className="mt-10">
        <NewsletterSignup />
      </div>
    </div>
  );
}
