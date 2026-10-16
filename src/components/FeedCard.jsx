import { useState } from "react";

const AGENT_COLORS = [
  { bg: "bg-purple-500", dot: "bg-purple-500" },
  { bg: "bg-green-500", dot: "bg-green-500" },
  { bg: "bg-red-500", dot: "bg-red-500" },
  { bg: "bg-blue-500", dot: "bg-blue-500" },
  { bg: "bg-orange-500", dot: "bg-orange-500" },
  { bg: "bg-teal-500", dot: "bg-teal-500" },
];

function agentColor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return AGENT_COLORS[h % AGENT_COLORS.length];
}

function agentInitials(name) {
  const words = name.split(/\s+/).filter(Boolean);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

function fmtMonthYear(iso) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function AgentBadge({ name }) {
  const color = agentColor(name);
  return (
    <span
      className={`inline-flex items-center justify-center w-7 h-7 rounded-md ${color.bg} text-white text-[11px] font-bold shrink-0`}
    >
      {agentInitials(name)}
    </span>
  );
}

function isNew(iso, maxDate) {
  const d = new Date(iso + "T00:00:00");
  const m = new Date(maxDate + "T00:00:00");
  return m - d <= 7 * 24 * 60 * 60 * 1000;
}

function shareUrl(id) {
  const origin =
    typeof window !== "undefined" ? window.location.origin : "https://sheetlypro.com";
  return `${origin}/#uc-${id}`;
}

function Upvote({ count, active, onToggle, small, inline }) {
  return (
    <button
      onClick={onToggle}
      aria-label={active ? "Remove upvote" : "Upvote"}
      className={`${
        inline ? "flex items-center gap-1.5" : "flex flex-col items-center gap-0.5"
      } rounded-lg px-2 py-1 transition-colors ${
        active ? "text-black" : "text-neutral-500 hover:text-black"
      }`}
    >
      <svg
        width={small ? 16 : 22}
        height={small ? 16 : 22}
        viewBox="0 0 24 24"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={active ? 0 : 2}
      >
        <path d="M12 5l9 14H3z" strokeLinejoin="round" />
      </svg>
      <span className={`${small ? "text-sm" : "text-sm"} font-semibold`}>{count}</span>
    </button>
  );
}

function Bookmark({ active, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={active ? "Remove bookmark" : "Save"}
      title="Save"
      className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg transition-colors ${
        active ? "text-black" : "text-neutral-400 hover:text-black"
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" strokeLinejoin="round" />
      </svg>
      <span className="text-[10px] font-medium">Save</span>
    </button>
  );
}

function ShareButton({ id }) {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl(id));
    } catch {
      const ta = document.createElement("textarea");
      ta.value = shareUrl(id);
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={share}
      className="text-xs font-medium border border-neutral-200 rounded-full px-3 py-1.5 text-neutral-600 hover:text-black hover:border-neutral-400 transition-colors"
    >
      {copied ? "Copied!" : "Share"}
    </button>
  );
}

/** Full feed card for the "New use cases" list. */
export function FeedCard({ item, maxDate, votes, saved, toggleVote, toggleSaved }) {
  const [showPrompt, setShowPrompt] = useState(false);
  const isSaved = saved.includes(item.id);
  const agents = item.agents && item.agents.length ? item.agents : ["Custom agent"];
  const isNewItem = isNew(item.date, maxDate);

  return (
    <article
      id={`uc-${item.id}`}
      className="border border-neutral-200 rounded-xl p-5 bg-white hover:border-neutral-400 transition-colors scroll-mt-24"
    >
      <div className="flex gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2.5 mb-1.5">
            <AgentBadge name={agents[0]} />
            <h3 className="font-bold text-lg leading-snug text-black">
              {item.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2 flex-wrap">
            {agents.map((a) => (
              <span key={a} className="inline-flex items-center gap-1.5">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${agentColor(a).dot}`}
                />
                <span>{a}</span>
              </span>
            ))}
            {isNewItem && (
              <span className="text-blue-600 font-semibold">New</span>
            )}
            <span>·</span>
            <span>{item.source}</span>
            <span>·</span>
            <span>{fmtMonthYear(item.date)}</span>
          </div>

          <p className="text-neutral-600 text-sm leading-relaxed">{item.summary}</p>

          {showPrompt && item.prompt && (
            <div className="mt-3 bg-neutral-100 rounded-lg p-3 text-sm text-neutral-800">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500 mb-1">
                Try it
              </p>
              <p className="leading-relaxed">“{item.prompt}”</p>
            </div>
          )}

          <div className="mt-3 flex items-center gap-2">
            {item.prompt && (
              <button
                onClick={() => setShowPrompt((s) => !s)}
                className="text-xs font-medium border border-neutral-200 rounded-full px-3 py-1.5 text-neutral-600 hover:text-black hover:border-neutral-400 transition-colors"
              >
                {showPrompt ? "Hide prompt" : "View prompt"}
              </button>
            )}
            <ShareButton id={item.id} />
          </div>
        </div>

        <div className="flex flex-col items-center gap-1 shrink-0">
          <Bookmark active={isSaved} onToggle={() => toggleSaved(item.id)} />
        </div>
      </div>
    </article>
  );
}

/** Compact card for the "Trending today" row/grid. */
export function TrendingCard({ item }) {
  return (
    <div className="shrink-0 w-64 sm:w-72 lg:w-auto border border-neutral-200 rounded-xl p-4 bg-neutral-100 hover:border-neutral-400 transition-colors flex flex-col">
      <a href={`#uc-${item.id}`} className="font-semibold text-sm leading-snug text-black mb-1.5 line-clamp-2 hover:underline">
        {item.title}
      </a>
      <p className="text-neutral-600 text-xs leading-relaxed line-clamp-3 mb-3 flex-1">
        {item.summary}
      </p>
      <div>
        <ShareButton id={item.id} />
      </div>
    </div>
  );
}
