import { Link, useParams } from "react-router-dom";
import {
  agentBySlug,
  useCasesByAgent,
  topicName,
  fmtDate,
} from "../lib/usecases";
import { UseCaseLink } from "../components/FeedCard";
import NewsletterSignup from "../components/NewsletterSignup";
import { useCanonical } from "../lib/useCanonical";
import NotFound from "./NotFound";

export default function AgentPage() {
  const { slug } = useParams();
  const agent = agentBySlug(slug);
  useCanonical(slug ? `/agents/${slug}` : "/agents");

  if (!agent) return <NotFound />;

  const items = useCasesByAgent(slug);
  const topicsUsed = [...new Set(items.map((u) => u.topic))];

  return (
    <div className="py-8">
      <Link
        to="/agents"
        className="text-sm text-neutral-500 hover:text-black mb-6 inline-block dark:text-neutral-400 dark:hover:text-white"
      >
        ← All agents
      </Link>

      <div className="flex items-center gap-4 mb-2">
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-black text-white text-lg font-bold shrink-0 dark:bg-white dark:text-black">
          {agent.name.slice(0, 2).toUpperCase()}
        </span>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white">
            {agent.name}
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {agent.count} use case{agent.count === 1 ? "" : "s"} ·{" "}
            {topicsUsed.length} kind{topicsUsed.length === 1 ? "" : "s"} of job
          </p>
        </div>
      </div>

      <p className="text-neutral-600 mb-6 max-w-2xl dark:text-neutral-300">
        Real examples of what people actually do with {agent.name} — collected
        from public posts, summarized in our own words.
      </p>

      {topicsUsed.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {topicsUsed.map((t) => (
            <Link
              key={t}
              to={`/topic/${t}`}
              className="text-xs font-medium border border-neutral-200 rounded-full px-3 py-1.5 text-neutral-600 hover:text-black hover:border-neutral-400 transition-colors dark:text-neutral-300 dark:border-neutral-800 dark:hover:text-white"
            >
              {topicName(t)}
            </Link>
          ))}
        </div>
      )}

      <div className="grid gap-3 mb-10">
        {items.map((u) => (
          <UseCaseLink
            key={u.id}
            id={u.id}
            className="border border-neutral-200 rounded-xl p-4 hover:border-neutral-400 transition-colors bg-white block dark:bg-neutral-950 dark:border-neutral-800"
          >
            <p className="font-semibold text-black leading-snug mb-1 dark:text-white">{u.title}</p>
            <p className="text-sm text-neutral-600 line-clamp-2 mb-2 dark:text-neutral-300">{u.summary}</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {topicName(u.topic)} · {u.source} · {fmtDate(u.date)}
            </p>
          </UseCaseLink>
        ))}
      </div>

      <div className="max-w-2xl">
        <NewsletterSignup compact />
      </div>
    </div>
  );
}
