import { Link } from "react-router-dom";
import { allUseCases, groupByDate, dayLabel, agentsOf, fmtDate } from "../lib/usecases";
import { UseCaseLink } from "../components/FeedCard";
import NewsletterSignup from "../components/NewsletterSignup";
import { usePageTitle } from "../lib/usePageTitle";

export default function NewPage() {
  usePageTitle("New");
  const todayIso = new Date().toISOString().slice(0, 10);
  const groups = groupByDate(allUseCases);
  const totalNew = allUseCases.length;

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold tracking-tight text-black mb-2 dark:text-white">
        New today
      </h1>
      <p className="text-neutral-600 mb-8 max-w-2xl dark:text-neutral-300">
        Every day we collect new things people got an AI agent to do.
        Whatever we find lands here first.
      </p>

      <div className="max-w-2xl mb-10">
        <NewsletterSignup compact />
      </div>

      {groups.map(({ date, items }) => (
        <section key={date} className="mb-10">
          <div className="flex items-baseline gap-3 mb-4">
            <h2 className="text-xl font-bold text-black dark:text-white">{dayLabel(date, todayIso)}</h2>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              {fmtDate(date)} · {items.length} new
            </span>
          </div>
          <div className="grid gap-3">
            {items.map((u) => (
              <UseCaseLink
                key={u.id}
                id={u.id}
                className="border border-neutral-200 rounded-xl p-4 hover:border-neutral-400 transition-colors bg-white block dark:bg-neutral-950 dark:border-neutral-800"
              >
                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-100 text-neutral-600 text-xs font-bold shrink-0 dark:text-neutral-300 dark:bg-neutral-800">
                    {agentsOf(u)[0].slice(0, 2).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-black leading-snug mb-1 dark:text-white">
                      {u.title}
                    </p>
                    <p className="text-sm text-neutral-600 line-clamp-2 mb-2 dark:text-neutral-300">
                      {u.summary}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-neutral-500 flex-wrap dark:text-neutral-400">
                      <span>{agentsOf(u).join(", ")}</span>
                      <span>·</span>
                      <span>{u.source}</span>
                      {u.submittedBy && (
                        <>
                          <span>·</span>
                          <span>Submitted by {u.submittedBy}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </UseCaseLink>
            ))}
          </div>
        </section>
      ))}

      {groups.length === 0 && (
        <p className="text-neutral-500 dark:text-neutral-400">No use cases yet — check back tomorrow.</p>
      )}

      <p className="text-sm text-neutral-500 mt-8 dark:text-neutral-400">
        {totalNew} use cases total ·{" "}
        <Link to="/" className="underline hover:text-black dark:hover:text-white">
          browse all
        </Link>
      </p>
    </div>
  );
}
