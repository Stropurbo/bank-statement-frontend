import { Link } from "react-router-dom";
import { topics } from "../data/topics";
import { useCasesByTopic } from "../lib/usecases";
import NewsletterSignup from "../components/NewsletterSignup";

export default function TopicsPage() {
  return (
    <div className="py-8 max-w-2xl">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-500 mb-2 dark:text-neutral-400">
        Browse by kind of job
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-black mb-4 dark:text-white">
        Topics
      </h1>
      <p className="text-neutral-600 mb-8 leading-relaxed dark:text-neutral-300">
        These pages group the directory by the kind of job an agent was given.
        Each one lists the top use cases in that category. The full list for a
        category stays on its category page.
      </p>

      <div className="space-y-8">
        {topics.map((t) => {
          const items = useCasesByTopic(t.slug);
          const topAgents = [...new Set(items.flatMap((u) => u.agents || []))]
            .filter((a) => a !== "Custom agent")
            .slice(0, 3);
          return (
            <div key={t.slug}>
              <div className="flex items-baseline justify-between gap-4">
                <Link
                  to={`/topic/${t.slug}`}
                  className="font-bold text-black hover:underline dark:text-white"
                >
                  {t.name}
                </Link>
                <span className="text-sm text-neutral-500 font-mono shrink-0 dark:text-neutral-400">
                  {items.length}
                </span>
              </div>
              <p className="text-sm text-neutral-600 mt-1 dark:text-neutral-300">
                {t.blurb}
              </p>
              {topAgents.length > 0 && (
                <p className="text-xs text-neutral-500 mt-1 font-mono dark:text-neutral-400">
                  Most used named agents: {topAgents.join(" · ")}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-12">
        <NewsletterSignup />
      </div>
    </div>
  );
}
