import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

/** Link that opens a use case in a modal over the current page. */
export function UseCaseLink({ id, className, children }) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <a
      href={`/use-case/${id}`}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        navigate(`/use-case/${id}`, { state: { background: location } });
      }}
    >
      {children}
    </a>
  );
}

function shareUrl(id) {
  const origin =
    typeof window !== "undefined" ? window.location.origin : "https://sheetlypro.com";
  return `${origin}/use-case/${id}`;
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
  const [shared, setShared] = useState(false);
  const isSaved = saved.includes(item.id);
  const voted = !!votes[item.id];
  const agents = item.agents && item.agents.length ? item.agents : ["Custom agent"];
  const isNewItem = isNew(item.date, maxDate);

  const share = async () => {
    const url = shareUrl(item.id);
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setShared(true);
    setTimeout(() => setShared(false), 1500);
  };

  return (
    <article
      id={`uc-${item.id}`}
      className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 bg-white dark:bg-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors scroll-mt-24"
    >
      <div className="flex gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2.5 mb-1.5">
            <AgentBadge name={agents[0]} />
            <UseCaseLink
              id={item.id}
              className="font-bold text-lg leading-snug text-black dark:text-white hover:underline"
            >
              {item.title}
            </UseCaseLink>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mb-2 flex-wrap">
            {agents.map((a) => (
              <span key={a} className="inline-flex items-center gap-1.5">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${agentColor(a).dot}`}
                />
                <span>{a}</span>
              </span>
            ))}
            {isNewItem && (
              <span className="text-blue-600 dark:text-blue-400 font-semibold">New</span>
            )}
            <span>·</span>
            <span>{item.source}</span>
            <span>·</span>
            <span>{fmtMonthYear(item.date)}</span>
            {item.submittedBy && (
              <>
                <span>·</span>
                <span>Submitted by {item.submittedBy}</span>
              </>
            )}
          </div>

          <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">{item.summary}</p>

          {showPrompt && item.prompt && (
            <div className="mt-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3 text-sm text-neutral-800 dark:text-neutral-200">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400 mb-1">
                Try it
              </p>
              <p className="leading-relaxed">“{item.prompt}”</p>
            </div>
          )}

          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <UseCaseLink
              id={item.id}
              className="text-xs font-medium border border-neutral-200 dark:border-neutral-700 rounded-full px-3 py-1.5 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:border-neutral-400 transition-colors"
            >
              View details
            </UseCaseLink>
            {item.prompt && (
              <button
                onClick={() => setShowPrompt((s) => !s)}
                className="text-xs font-medium border border-neutral-200 dark:border-neutral-700 rounded-full px-3 py-1.5 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:border-neutral-400 transition-colors"
              >
                {showPrompt ? "Hide prompt" : "View prompt"}
              </button>
            )}
            <button
              onClick={share}
              className="text-xs font-medium border border-neutral-200 dark:border-neutral-700 rounded-full px-3 py-1.5 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:border-neutral-400 transition-colors"
            >
              {shared ? "Copied!" : "Share"}
            </button>
            <button
              onClick={() => toggleVote(item.id)}
              className={`text-xs font-medium rounded-full px-3 py-1.5 border transition-colors ${
                voted
                  ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                  : "border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:border-neutral-400"
              }`}
            >
              ▲ I want this{voted ? " ✓" : ""}
            </button>
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
    <div className="shrink-0 w-64 sm:w-72 lg:w-auto border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 bg-neutral-100 dark:bg-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors flex flex-col">
      <UseCaseLink id={item.id} className="font-semibold text-sm leading-snug text-black dark:text-white mb-1.5 line-clamp-2 hover:underline">
        {item.title}
      </UseCaseLink>
      <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed line-clamp-3 mb-3 flex-1">
        {item.summary}
      </p>
      <div>
        <ShareButton id={item.id} />
      </div>
    </div>
  );
}
