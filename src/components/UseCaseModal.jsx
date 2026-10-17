import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getUseCase,
  allUseCases,
  topicName,
  agentSlug,
  agentsOf,
  fmtDate,
} from "../lib/usecases";
import { useEngagement } from "../lib/engagement";

// Returns true for bare domain-root URLs (e.g. https://reddit.com) that are
// not real links to the original post — the "Read the original" button is
// hidden for those and plain "Via <source>" text is shown instead.
function isGenericSourceUrl(url) {
  try {
    const u = new URL(url);
    return u.pathname === "/" && !u.search && !u.hash;
  } catch {
    return true;
  }
}

function CopyPrompt({ prompt, agent }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = prompt;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="border border-neutral-200 dark:border-neutral-700 rounded-xl p-4 bg-neutral-50 dark:bg-neutral-900">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-semibold text-black dark:text-white">
          Try it yourself{agent ? ` with ${agent}` : ""}
        </p>
        <button
          onClick={copy}
          className="text-xs font-medium border border-neutral-200 dark:border-neutral-700 rounded-full px-3 py-1.5 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:border-neutral-400 transition-colors"
        >
          {copied ? "Copied!" : "Copy prompt"}
        </button>
      </div>
      <p className="text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed font-mono">
        {prompt}
      </p>
    </div>
  );
}

export default function UseCaseModal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = getUseCase(id);
  const { votes, saved, toggleVote, toggleSaved } = useEngagement();
  const [shared, setShared] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [navigate]);

  // Update URL is already /use-case/:id via the navigate that opened us.
  if (!item) return null;

  const idx = allUseCases.findIndex((u) => u.id === item.id);
  const next = allUseCases[idx + 1];
  const agents = agentsOf(item);
  const voted = !!votes[item.id];
  const isSaved = saved.includes(item.id);

  const close = () => navigate(-1);
  const openAsPage = () => navigate(`/use-case/${item.id}`, { replace: true });
  const goNext = () => {
    if (next) navigate(`/use-case/${next.id}`, { replace: true, state: { background: true } });
  };

  const share = async () => {
    const url = `${window.location.origin}/use-case/${item.id}`;
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
    <div
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-black/60" onClick={close} />
      <div className="relative bg-white dark:bg-neutral-950 rounded-2xl w-full max-w-2xl shadow-xl my-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 text-neutral-400 hover:text-black dark:hover:text-white text-xl leading-none bg-white dark:bg-neutral-950 rounded-full w-8 h-8"
        >
          ×
        </button>

        <div className="p-6 sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">
            {topicName(item.topic)}
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-black dark:text-white mb-3">
            {item.title}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 text-[15px] leading-relaxed mb-4">
            {item.summary}
          </p>

          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              Done with
            </span>
            {agents.map((a) => (
              <Link
                key={a}
                to={`/agents/${agentSlug(a)}`}
                onClick={close}
                className="inline-flex items-center gap-1.5 text-xs font-medium border border-neutral-200 dark:border-neutral-700 rounded-full px-2.5 py-1 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400"
              >
                <span className="w-4 h-4 rounded bg-neutral-200 dark:bg-neutral-700 inline-flex items-center justify-center text-[9px] font-bold">
                  {a.slice(0, 2).toUpperCase()}
                </span>
                {a}
              </Link>
            ))}
          </div>

          <div className="border-t border-dashed border-neutral-200 dark:border-neutral-800 pt-5 mb-5">
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">
              What they did
            </h3>
            <p className="text-neutral-800 dark:text-neutral-200 text-[15px] leading-relaxed">
              {item.summary}
            </p>
          </div>

          {item.prompt && (
            <div className="mb-6">
              <CopyPrompt prompt={item.prompt} agent={agents[0]} />
            </div>
          )}

          <div className="flex items-center gap-2 mb-6 flex-wrap">
            {isGenericSourceUrl(item.sourceUrl) ? (
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                Via {item.source}
              </span>
            ) : (
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black dark:bg-white text-white dark:text-black text-sm font-medium rounded-full px-4 py-2 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
              >
                Read the original ↗
              </a>
            )}
            <button
              onClick={() => toggleVote(item.id)}
              className={`text-sm font-medium rounded-full px-4 py-2 border transition-colors ${
                voted
                  ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                  : "border-neutral-300 dark:border-neutral-700 text-black dark:text-white hover:border-black dark:hover:border-white"
              }`}
            >
              ▲ I want this{voted ? " ✓" : ""}
            </button>
            <button
              onClick={() => toggleSaved(item.id)}
              className={`text-sm font-medium rounded-full px-4 py-2 border transition-colors ${
                isSaved
                  ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                  : "border-neutral-300 dark:border-neutral-700 text-black dark:text-white hover:border-black dark:hover:border-white"
              }`}
            >
              {isSaved ? "Saved ✓" : "Save"}
            </button>
          </div>

          <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-6">
            <span>
              Source: {item.source} · {fmtDate(item.date)}
              {item.submittedBy && ` · Submitted by ${item.submittedBy}`}
            </span>
            <button onClick={openAsPage} className="underline hover:text-black dark:hover:text-white">
              Open as a page
            </button>
          </div>

          <div className="flex items-center justify-between border-t border-dashed border-neutral-200 dark:border-neutral-800 pt-4">
            <button
              onClick={share}
              className="text-xs font-medium border border-neutral-200 dark:border-neutral-700 rounded-full px-3 py-1.5 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:border-neutral-400 transition-colors"
            >
              {shared ? "Copied!" : "Share"}
            </button>
            {next && (
              <button
                onClick={goNext}
                className="text-sm text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white"
              >
                Next <span className="font-medium">{next.title}</span> →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
