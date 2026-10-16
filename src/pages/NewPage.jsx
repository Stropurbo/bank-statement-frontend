import { Link } from "react-router-dom";
import { allUseCases, groupByDate, dayLabel, agentsOf, fmtDate } from "../lib/usecases";
import NewsletterSignup from "../components/NewsletterSignup";

export default function NewPage() {
  const todayIso = new Date().toISOString().slice(0, 10);
  const groups = groupByDate(allUseCases);
  const totalNew = allUseCases.length;

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold tracking-tight text-black mb-2">
        New today
      </h1>
      <p className="text-neutral-600 mb-8 max-w-2xl">
        Every day we collect new things people got an AI agent to do.
        Whatever we find lands here first.
      </p>

      <div className="max-w-2xl mb-10">
        <NewsletterSignup compact />
      </div>

      {groups.map(({ date, items }) => (
        <section key={date} className="mb-10">
          <div className="flex items-baseline gap-3 mb-4">
            <h2 className="text-xl font-bold text-black">{dayLabel(date, todayIso)}</h2>
            <span className="text-sm text-neutral-500">
              {fmtDate(date)} · {items.length} new
            </span>
          </div>
          <div className="grid gap-3">
            {items.map((u) => (
              <Link
                key={u.id}
                to={`/use-case/${u.id}`}
                className="border border-neutral-200 rounded-xl p-4 hover:border-neutral-400 transition-colors bg-white"
              >
                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-100 text-neutral-600 text-xs font-bold shrink-0">
                    {agentsOf(u)[0].slice(0, 2).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-black leading-snug mb-1">
                      {u.title}
                    </p>
                    <p className="text-sm text-neutral-600 line-clamp-2 mb-2">
                      {u.summary}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-neutral-500 flex-wrap">
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
              </Link>
            ))}
          </div>
        </section>
      ))}

      {groups.length === 0 && (
        <p className="text-neutral-500">No use cases yet — check back tomorrow.</p>
      )}

      <p className="text-sm text-neutral-500 mt-8">
        {totalNew} use cases total ·{" "}
        <Link to="/" className="underline hover:text-black">
          browse all
        </Link>
      </p>
    </div>
  );
}
