import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUseCase, relatedUseCases, topicName, agentSlug, agentsOf, fmtDate } from "../lib/usecases";
import { UseCaseLink } from "../components/FeedCard";
import { useEngagement } from "../lib/engagement";
import NotFound from "./NotFound";

function CopyPrompt({ prompt }) {
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
    <button
      onClick={copy}
      className="text-xs font-medium bg-black text-white rounded-full px-4 py-2 hover:bg-neutral-800 transition-colors"
    >
      {copied ? "Copied!" : "Copy prompt"}
    </button>
  );
}

export default function UseCasePage() {
  const { id } = useParams();
  const item = getUseCase(id);
  const { votes, saved, toggleVote, toggleSaved } = useEngagement();
  const [shared, setShared] = useState(false);

  if (!item) return <NotFound />;

  const related = relatedUseCases(item, 4);
  const isSaved = saved.includes(item.id);
  const voted = !!votes[item.id];
  const agents = agentsOf(item);

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
    <div className="py-8 max-w-2xl mx-auto">
      <Link
        to="/"
        className="text-sm text-neutral-500 hover:text-black mb-6 inline-block"
      >
        ← All use cases
      </Link>

      <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-500 mb-2">
        <Link to={`/topic/${item.topic}`} className="hover:text-black hover:underline">
          {topicName(item.topic)}
        </Link>
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-black mb-4">
        {item.title}
      </h1>

      <div className="flex items-center gap-2 text-xs text-neutral-500 mb-6 flex-wrap">
        <span>{item.source}</span>
        <span>·</span>
        <span>{fmtDate(item.date)}</span>
        {item.submittedBy && (
          <>
            <span>·</span>
            <span>Submitted by {item.submittedBy}</span>
          </>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {agents.map((a) => (
          <Link
            key={a}
            to={`/agents/${agentSlug(a)}`}
            className="text-xs font-medium border border-neutral-200 rounded-full px-3 py-1.5 text-neutral-600 hover:text-black hover:border-neutral-400 transition-colors"
          >
            {a}
          </Link>
        ))}
      </div>

      <section className="mb-8">
        <h2 className="text-[11px] font-semibold uppercase tracking-widest text-neutral-500 mb-2">
          What they did
        </h2>
        <p className="text-neutral-800 leading-relaxed">{item.summary}</p>
      </section>

      {item.prompt && (
        <section className="mb-8 bg-neutral-100 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[11px] font-semibold uppercase tracking-widest text-neutral-500">
              Try it yourself
            </h2>
            <CopyPrompt prompt={item.prompt} />
          </div>
          <p className="text-sm text-neutral-800 leading-relaxed font-mono">
            “{item.prompt}”
          </p>
        </section>
      )}

      <div className="flex items-center gap-2 mb-10 flex-wrap">
        <button
          onClick={() => toggleVote(item.id)}
          className={`text-sm font-medium rounded-full px-4 py-2 border transition-colors ${
            voted
              ? "bg-black text-white border-black"
              : "border-neutral-300 text-black hover:border-black"
          }`}
        >
          ▲ I want this{voted ? " ✓" : ""}
        </button>
        <button
          onClick={() => toggleSaved(item.id)}
          className={`text-sm font-medium rounded-full px-4 py-2 border transition-colors ${
            isSaved
              ? "bg-black text-white border-black"
              : "border-neutral-300 text-black hover:border-black"
          }`}
        >
          {isSaved ? "Saved ✓" : "Save"}
        </button>
        <button
          onClick={share}
          className="text-sm font-medium rounded-full px-4 py-2 border border-neutral-300 text-black hover:border-black transition-colors"
        >
          {shared ? "Link copied!" : "Share"}
        </button>
        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline ml-1"
        >
          Read the original ↗
        </a>
      </div>

      {related.length > 0 && (
        <section className="border-t border-neutral-200 pt-8">
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-neutral-500 mb-4">
            Related use cases
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {related.map((r) => (
              <UseCaseLink
                key={r.id}
                id={r.id}
                className="border border-neutral-200 rounded-xl p-4 hover:border-neutral-400 transition-colors block"
              >
                <p className="font-semibold text-sm text-black leading-snug mb-1">
                  {r.title}
                </p>
                <p className="text-xs text-neutral-500 line-clamp-2">{r.summary}</p>
              </UseCaseLink>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
