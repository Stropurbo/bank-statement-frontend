import { Link } from "react-router-dom";
import { agentCounts, useCasesByAgent, topicName } from "../lib/usecases";

export default function AgentsPage() {
  const agents = agentCounts();

  return (
    <div className="py-8">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-500 mb-2 dark:text-neutral-400">
        Browse by agent
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-black mb-2 dark:text-white">
        AI agents, and what people do with them
      </h1>
      <p className="text-neutral-600 mb-8 max-w-2xl dark:text-neutral-300">
        {agents.length} agents tracked. Pick one to see every real-world use
        case collected for it.
      </p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map(({ name, count, slug }) => {
          const items = useCasesByAgent(slug);
          const topTopics = [
            ...new Set(items.map((u) => u.topic)),
          ].slice(0, 3);
          return (
            <Link
              key={slug}
              to={`/agents/${slug}`}
              className="border border-neutral-200 rounded-xl p-5 hover:border-neutral-400 transition-colors bg-white dark:bg-neutral-950 dark:border-neutral-800"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-black text-white text-sm font-bold shrink-0 dark:bg-white dark:text-black">
                  {name.slice(0, 2).toUpperCase()}
                </span>
                <div className="min-w-0">
                  <p className="font-bold text-black truncate dark:text-white">{name}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {count} use case{count === 1 ? "" : "s"}
                  </p>
                </div>
              </div>
              {topTopics.length > 0 && (
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Most often: {topTopics.map(topicName).join(" · ")}
                </p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
