import { useMemo, useState } from "react";
import usecases from "../data/usecases.json";
import TopicNav from "../components/TopicNav";
import NewsletterSignup from "../components/NewsletterSignup";
import { FeedCard, TrendingCard } from "../components/FeedCard";
import { useEngagement } from "../lib/engagement";

const DAY_MS = 24 * 60 * 60 * 1000;

export default function Home() {
  const [query, setQuery] = useState("");
  const [pill, setPill] = useState("all");
  const { votes, saved, toggleVote, toggleSaved } = useEngagement();

  const sorted = useMemo(
    () => [...usecases].sort((a, b) => b.date.localeCompare(a.date)),
    []
  );
  const maxDate = sorted.length ? sorted[0].date : "2026-10-16";

  const newThisWeek = useMemo(
    () =>
      sorted.filter(
        (u) =>
          new Date(maxDate + "T00:00:00") - new Date(u.date + "T00:00:00") <=
          7 * DAY_MS
      ),
    [sorted, maxDate]
  );

  const trending = useMemo(() => sorted.slice(0, 4), [sorted]);

  const feed = useMemo(() => {
    let items = pill === "new" ? newThisWeek : sorted;
    const q = query.trim().toLowerCase();
    if (q) {
      items = items.filter(
        (u) =>
          u.title.toLowerCase().includes(q) ||
          u.summary.toLowerCase().includes(q)
      );
    }
    return items;
  }, [pill, newThisWeek, sorted, query]);

  const searching = query.trim().length > 0;

  return (
    <div>
      {/* Hero */}
      <section className="py-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black mb-3">
          What people actually do with AI agents
        </h1>
        <p className="text-neutral-600 max-w-2xl mb-6">
          A curated feed of real-world AI agent use cases — collected from
          posts across the web, organized by topic, updated daily.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="#newsletter"
            className="bg-black text-white font-medium rounded-lg px-6 py-3 text-center text-sm hover:bg-neutral-800 transition-colors"
          >
            Get the daily 5
          </a>
          <a
            href="mailto:contact@sheetlypro.com?subject=Use%20case%20submission"
            className="border border-neutral-300 text-black font-medium rounded-lg px-6 py-3 text-center text-sm hover:border-black transition-colors"
          >
            Submit a use case
          </a>
        </div>
      </section>

      <TopicNav />

      {/* Search + pills */}
      <section className="mt-8">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search use cases"
            className="w-full border border-neutral-200 rounded-lg pl-9 pr-10 py-2.5 text-sm bg-neutral-50 text-black placeholder:text-neutral-400 focus:outline-none focus:border-black"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-neutral-400 border border-neutral-200 rounded px-1.5 py-0.5 bg-white">
            ⌘K
          </kbd>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={() => setPill("all")}
            className={`text-xs font-medium rounded-full px-3 py-1.5 transition-colors ${
              pill === "all"
                ? "bg-black text-white"
                : "border border-neutral-200 text-neutral-600 hover:border-neutral-400"
            }`}
          >
            All {sorted.length}
          </button>
          <button
            onClick={() => setPill("new")}
            className={`text-xs font-medium rounded-full px-3 py-1.5 transition-colors ${
              pill === "new"
                ? "bg-black text-white"
                : "border border-neutral-200 text-neutral-600 hover:border-neutral-400"
            }`}
          >
            New this week {newThisWeek.length}
          </button>
        </div>
      </section>

      {/* Trending today */}
      {!searching && (
        <section className="mt-8">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-500 mb-3">
            Trending today
          </p>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
            {trending.map((u) => (
              <TrendingCard key={u.id} item={u} votes={votes} toggleVote={toggleVote} />
            ))}
          </div>
        </section>
      )}

      {/* New use cases feed */}
      <section className="mt-10">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-xl font-bold text-black">
            {searching
              ? `${feed.length} result${feed.length === 1 ? "" : "s"}`
              : `${feed.length} new use case${feed.length === 1 ? "" : "s"}`}
          </h2>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
            Latest finds
          </span>
        </div>
        <div className="grid gap-4">
          {feed.map((u) => (
            <FeedCard
              key={u.id}
              item={u}
              maxDate={maxDate}
              votes={votes}
              saved={saved}
              toggleVote={toggleVote}
              toggleSaved={toggleSaved}
            />
          ))}
          {feed.length === 0 && (
            <p className="text-neutral-500 text-sm">
              No use cases match — try a different search.
            </p>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="mt-12 scroll-mt-24">
        <NewsletterSignup />
      </section>

      {/* Sponsors */}
      <section className="mt-12 border-t border-neutral-200 pt-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-500 mb-3">
          Sponsors
        </p>
        <a
          href="/advertise"
          className="block border border-dashed border-neutral-300 rounded-xl p-6 text-center hover:border-black transition-colors"
        >
          <p className="font-semibold text-black">Your brand here</p>
          <p className="text-sm text-neutral-500 mt-1">
            Reach AI-curious readers — sheetlypro.com/advertise
          </p>
        </a>
      </section>
    </div>
  );
}
