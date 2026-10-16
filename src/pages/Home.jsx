import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import usecases from "../data/usecases.json";
import { topics } from "../data/topics";
import NewsletterSignup from "../components/NewsletterSignup";
import SubmitModal from "../components/SubmitModal";
import { FeedCard, TrendingCard } from "../components/FeedCard";
import { useEngagement } from "../lib/engagement";

const DAY_MS = 24 * 60 * 60 * 1000;

const agentsOf = (u) => u.agents && u.agents.length ? u.agents : ["Custom agent"];

const toggleIn = (list, v) =>
  list.includes(v) ? list.filter((x) => x !== v) : [...list, v];

function FilterPill({ label, count, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`text-xs font-medium rounded-full px-3 py-1.5 transition-colors ${
        active
          ? "bg-black text-white"
          : "border border-neutral-200 text-neutral-700 hover:border-neutral-400"
      }`}
    >
      {label} <span className={active ? "opacity-70" : "opacity-50"}>{count}</span>
    </button>
  );
}

function AgentRow({ name, count, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm transition-colors ${
        active ? "bg-neutral-100 text-black font-medium" : "text-neutral-600 hover:bg-neutral-50 hover:text-black"
      }`}
    >
      <span className="w-5 h-5 rounded-md bg-neutral-200 inline-flex items-center justify-center text-[10px] font-bold text-neutral-600 shrink-0">
        {name.slice(0, 2).toUpperCase()}
      </span>
      <span className="flex-1 text-left truncate">{name}</span>
      <span className="text-xs text-neutral-400 tabular-nums">{count}</span>
    </button>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [pill, setPill] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selAgents, setSelAgents] = useState([]);
  const [selTopics, setSelTopics] = useState([]);
  const [sortMode, setSortMode] = useState("new");
  const [submitOpen, setSubmitOpen] = useState(false);
  const searchRef = useRef(null);
  const { votes, saved, toggleVote, toggleSaved } = useEngagement();

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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

  const agentCounts = useMemo(() => {
    const m = {};
    sorted.forEach((u) =>
      agentsOf(u).forEach((a) => {
        m[a] = (m[a] || 0) + 1;
      })
    );
    return Object.entries(m).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [sorted]);

  const topicCounts = useMemo(
    () =>
      topics.map((t) => ({
        ...t,
        count: sorted.filter((u) => u.topic === t.slug).length,
      })),
    [sorted]
  );

  const trending = useMemo(() => sorted.slice(0, 6), [sorted]);

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
    if (selAgents.length) {
      items = items.filter((u) => agentsOf(u).some((a) => selAgents.includes(a)));
    }
    if (selTopics.length) {
      items = items.filter((u) => selTopics.includes(u.topic));
    }
    if (sortMode === "top") {
      items = [...items].sort(
        (a, b) => (saved.includes(b.id) ? 1 : 0) - (saved.includes(a.id) ? 1 : 0)
      );
    }
    return items;
  }, [pill, newThisWeek, sorted, query, selAgents, selTopics, sortMode, saved]);

  const searching = query.trim().length > 0;
  const activeFilters = selAgents.length + selTopics.length;
  const filtering = activeFilters > 0;

  const clearFilters = () => {
    setSelAgents([]);
    setSelTopics([]);
  };

  return (
    <div className="lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
      {/* ============ Desktop sidebar ============ */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 space-y-7 pb-10">
          <div>
            <p className="text-sm text-neutral-600 leading-relaxed mb-5">
              Real things people are doing with AI agents, collected every
              day. Steal an idea.
            </p>
            <div className="space-y-2.5">
              <a
                href="#newsletter"
                className="block bg-black text-white font-medium rounded-lg px-4 py-3 text-center text-sm hover:bg-neutral-800 transition-colors"
              >
                Get 5 use cases every morning
              </a>
              <button
                onClick={() => setSubmitOpen(true)}
                className="block w-full border border-neutral-300 text-black font-medium rounded-lg px-4 py-3 text-center text-sm hover:border-black transition-colors"
              >
                Submit a use case
              </button>
            </div>
          </div>

          <button
            onClick={() => setPill(pill === "new" ? "all" : "new")}
            className={`flex items-center gap-2 text-sm rounded-full px-3 py-1.5 border transition-colors ${
              pill === "new"
                ? "bg-blue-50 border-blue-200 text-blue-700 font-medium"
                : "border-neutral-200 text-neutral-600 hover:border-neutral-400"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            New Today
            <span className="text-xs opacity-60">{newThisWeek.length}</span>
          </button>

          <a
            href="/advertise"
            className="block border border-neutral-200 rounded-xl p-4 hover:border-neutral-400 transition-colors"
          >
            <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-1.5">
              Sponsor
            </p>
            <p className="font-semibold text-black text-sm">Your brand here</p>
            <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
              Reach readers who build with AI agents.
            </p>
            <p className="text-xs text-blue-600 mt-2 font-medium">
              Advertise →
            </p>
          </a>

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-500">
                Agents
              </p>
              {selAgents.length > 0 && (
                <button
                  onClick={() => setSelAgents([])}
                  className="text-[11px] text-neutral-400 hover:text-black underline"
                >
                  clear
                </button>
              )}
            </div>
            <div className="space-y-0.5">
              {agentCounts.slice(0, 10).map(([name, count]) => (
                <AgentRow
                  key={name}
                  name={name}
                  count={count}
                  active={selAgents.includes(name)}
                  onClick={() => setSelAgents((l) => toggleIn(l, name))}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-500">
                Categories
              </p>
              {selTopics.length > 0 && (
                <button
                  onClick={() => setSelTopics([])}
                  className="text-[11px] text-neutral-400 hover:text-black underline"
                >
                  clear
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {topicCounts.map((t) => (
                <FilterPill
                  key={t.slug}
                  label={t.name}
                  count={t.count}
                  active={selTopics.includes(t.slug)}
                  onClick={() => setSelTopics((l) => toggleIn(l, t.slug))}
                />
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* ============ Main column ============ */}
      <div className="min-w-0">
        {/* Mobile hero */}
        <section className="pt-6 pb-5 lg:hidden">
          <h1 className="text-lg text-neutral-600 font-normal mb-5">
            What people actually do with AI agents.
          </h1>
          <div className="grid grid-cols-2 gap-3">
            <a
              href="#newsletter"
              className="bg-black text-white font-medium rounded-lg px-4 py-3 text-center text-sm hover:bg-neutral-800 transition-colors"
            >
              Get the daily 5
            </a>
            <button
              onClick={() => setSubmitOpen(true)}
              className="border border-neutral-300 text-black font-medium rounded-lg px-4 py-3 text-center text-sm hover:border-black transition-colors"
            >
              Submit a use case
            </button>
          </div>
        </section>

        {/* Mobile filter */}
        <section className="mt-2 lg:hidden">
          <button
            onClick={() => setFilterOpen((o) => !o)}
            className="w-full border border-neutral-200 rounded-lg px-4 py-3 flex items-center justify-between text-sm hover:border-neutral-400 transition-colors bg-white"
          >
            <span className="font-medium text-black">Filter</span>
            <span className="text-neutral-500">
              {filterOpen ? "Close" : filtering ? `${activeFilters} active` : "All"}
            </span>
          </button>
          {filterOpen && (
            <div className="mt-4 border-t border-dashed border-neutral-200 pt-5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-500 mb-3">
                Agents
              </p>
              <div className="flex flex-wrap gap-2 mb-7">
                {agentCounts.map(([name, count]) => (
                  <FilterPill
                    key={name}
                    label={name}
                    count={count}
                    active={selAgents.includes(name)}
                    onClick={() => setSelAgents((l) => toggleIn(l, name))}
                  />
                ))}
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-500 mb-3">
                Categories
              </p>
              <div className="flex flex-wrap gap-2">
                {topicCounts.map((t) => (
                  <FilterPill
                    key={t.slug}
                    label={t.name}
                    count={t.count}
                    active={selTopics.includes(t.slug)}
                    onClick={() => setSelTopics((l) => toggleIn(l, t.slug))}
                  />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Search + pills */}
        <section className="mt-4 lg:mt-8 border-t border-dashed border-neutral-200 pt-4 lg:border-0 lg:pt-0">
          <div className="flex gap-2">
            <div className="relative flex-1">
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
                ref={searchRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search use cases"
                className="w-full border border-neutral-200 rounded-lg pl-9 pr-10 py-2.5 text-sm bg-neutral-50 text-black placeholder:text-neutral-400 focus:outline-none focus:border-black"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-neutral-400 border border-neutral-200 rounded px-1.5 py-0.5 bg-white hidden sm:block">
                ⌘K
              </kbd>
            </div>
            <div className="flex border border-neutral-200 rounded-lg p-0.5 bg-white shrink-0">
              {["top", "new"].map((m) => (
                <button
                  key={m}
                  onClick={() => setSortMode(m)}
                  className={`text-xs font-medium rounded-md px-3 py-2 capitalize transition-colors ${
                    sortMode === m ? "bg-neutral-100 text-black" : "text-neutral-500 hover:text-black"
                  }`}
                >
                  {m === "top" ? "Top" : "New"}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3 flex-wrap">
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
        {!searching && !filtering && (
          <section className="mt-8">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-500 mb-3">
              Trending today
            </p>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-3 lg:overflow-visible">
              {trending.map((u) => (
                <TrendingCard key={u.id} item={u} votes={votes} toggleVote={toggleVote} />
              ))}
            </div>
          </section>
        )}

        {/* New use cases feed */}
        <section className="mt-8 lg:mt-10 bg-indigo-50/60 rounded-2xl p-4 sm:p-6">
          <div className="flex items-baseline justify-between mb-1 gap-2">
            <h2 className="text-xl font-bold text-black">
              {searching || filtering
                ? `${feed.length} result${feed.length === 1 ? "" : "s"}`
                : `${feed.length} new use case${feed.length === 1 ? "" : "s"}`}
            </h2>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-blue-600 font-mono shrink-0">
              Latest finds
            </span>
          </div>
          {!searching && !filtering && (
            <p className="text-sm text-neutral-500 mb-4">Today · a few of them below</p>
          )}
          {filtering && (
            <p className="text-xs text-neutral-500 mb-4">
              {activeFilters} filter{activeFilters === 1 ? "" : "s"} active —{" "}
              <button
                onClick={clearFilters}
                className="underline hover:text-black"
              >
                clear
              </button>
            </p>
          )}
          <div className={`grid gap-4 ${filtering ? "" : "mt-4"}`}>
            {(searching || filtering ? feed : feed.slice(0, 5)).map((u) => (
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
                No use cases match — try a different search or clear the filters.
              </p>
            )}
          </div>
          {!searching && !filtering && feed.length > 5 && (
            <Link
              to="/new"
              className="inline-block mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              See all, day by day ↗
            </Link>
          )}
        </section>

        {/* Numbered category sections (reference-style) */}
        {!searching && !filtering && (
          <div className="mt-10 lg:mt-12 space-y-10">
            {topics.map((t, i) => {
              const items = sorted.filter((u) => u.topic === t.slug).slice(0, 3);
              if (!items.length) return null;
              return (
                <section key={t.slug}>
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-sm font-mono text-neutral-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-xl font-bold text-black dark:text-white">
                      {t.name}
                    </h2>
                    <Link
                      to={`/topic/${t.slug}`}
                      className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white font-mono"
                    >
                      Topic
                    </Link>
                  </div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                    {t.blurb}
                  </p>
                  <div className="grid gap-4">
                    {items.map((u) => (
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
                  </div>
                  <Link
                    to={`/topic/${t.slug}`}
                    className="inline-block mt-3 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Show more in {t.name} →
                  </Link>
                </section>
              );
            })}
          </div>
        )}

        {/* Newsletter */}
        <section id="newsletter" className="mt-10 lg:mt-12 scroll-mt-24">
          <NewsletterSignup />
        </section>

        {/* Sponsors */}
        <section className="mt-10 lg:mt-12 border-t border-neutral-200 pt-6">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-500 mb-3">
            Sponsors
          </p>
          <Link
            to="/advertise"
            className="block border border-dashed border-neutral-300 rounded-xl p-6 text-center hover:border-black transition-colors"
          >
            <p className="font-semibold text-black">Your brand here</p>
            <p className="text-sm text-neutral-500 mt-1">
              Reach AI-curious readers — sheetlypro.com/advertise
            </p>
          </Link>
        </section>
      </div>

      <SubmitModal open={submitOpen} onClose={() => setSubmitOpen(false)} />
    </div>
  );
}
