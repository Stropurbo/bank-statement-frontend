import usecases from "../data/usecases.json";

const SPONSOR_BAR_URL = "https://bookloverreview.gumroad.com/l/xmshou";
const BANNER_URL = "https://bookloverreview.gumroad.com/l/uulffc";

function BarMockup() {
  return (
    <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
      <div className="bg-white dark:bg-neutral-950 border-t-2 border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 px-3 py-2 shrink-0 border-r border-neutral-200 dark:border-neutral-800">
            Sponsors
          </span>
          <div className="flex-1 overflow-hidden">
            <div className="flex gap-6 whitespace-nowrap py-2 px-3">
              <span className="text-xs text-neutral-600 dark:text-neutral-400">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-[13px] mr-1.5 align-middle">
                  ✦
                </span>
                <span className="font-semibold text-black dark:text-white">
                  Your brand:
                </span>{" "}
                your pitch, about 40 characters
              </span>
            </div>
          </div>
        </div>
      </div>
      <p className="text-xs text-neutral-500 dark:text-neutral-400 px-4 py-2 bg-neutral-50 dark:bg-neutral-900">
        The sponsor bar, at the bottom of every page
      </p>
    </div>
  );
}

function EmailMockup() {
  return (
    <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
      <div className="p-4 bg-white dark:bg-neutral-950">
        <p className="text-sm font-bold text-black dark:text-white mb-1">
          The Daily 5 — 5 things people did with AI agents
        </p>
        <div className="border-t border-dashed border-neutral-200 dark:border-neutral-800 my-3 pt-3">
          <p className="text-[11px] uppercase tracking-widest text-neutral-400 mb-1">
            Sponsored by
          </p>
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            <span className="font-semibold text-black dark:text-white">
              Your brand:
            </span>{" "}
            your pitch, about 40 characters →
          </p>
        </div>
        <p className="text-xs text-neutral-400">
          1. Let a team of agents run a social account…
        </p>
        <p className="text-xs text-neutral-400">2. Negotiate a billing credit…</p>
      </div>
      <p className="text-xs text-neutral-500 dark:text-neutral-400 px-4 py-2 bg-neutral-50 dark:bg-neutral-900">
        The Daily 5 email, every day of your week
      </p>
    </div>
  );
}

export default function Advertise() {
  const count = usecases.length;

  return (
    <div className="py-10 max-w-2xl">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">
        Sponsors
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white mb-3">
        A spot on the site, in front of people who open it because they want an
        AI agent to do something real.
      </h1>

      <h2 className="text-xl font-bold text-black dark:text-white mt-10 mb-2">
        Who visits
      </h2>
      <p className="text-neutral-600 dark:text-neutral-300 mb-6">
        People actively looking for AI agent use cases — builders, founders,
        and operators hunting for their next automation. They come to steal an
        idea, and they notice the tools in front of them.
      </p>

      <div className="grid grid-cols-3 gap-3 mb-2">
        <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-black dark:text-white">{count}</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            use cases curated
          </p>
        </div>
        <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-black dark:text-white">3–5</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            new every day
          </p>
        </div>
        <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-black dark:text-white">Daily</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            newsletter (Daily 5)
          </p>
        </div>
      </div>
      <p className="text-xs text-neutral-400 dark:text-neutral-500 mb-10">
        Real numbers from the site itself. Traffic is growing from zero —
        launch rates reflect that, honestly.
      </p>

      <h2 className="text-xl font-bold text-black dark:text-white mb-4">
        How it looks
      </h2>
      <div className="grid gap-4 mb-10">
        <BarMockup />
        <EmailMockup />
      </div>

      <h2 className="text-xl font-bold text-black dark:text-white mb-4">
        What you get
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 mb-10">
        <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 bg-white dark:bg-neutral-950">
          <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
            Featured slot
          </p>
          <p className="text-3xl font-bold text-black dark:text-white mb-3">
            $99
            <span className="text-base font-normal text-neutral-500 dark:text-neutral-400">
              /week
            </span>
          </p>
          <ul className="text-sm text-neutral-600 dark:text-neutral-300 space-y-1.5 mb-5">
            <li>· One week in the sponsor bar on every page</li>
            <li>· Your name, icon, pitch (~40 chars) + link</li>
            <li>· "Sponsored by" line in every Daily 5 email that week</li>
            <li>· Goes live on approval, 7 full days</li>
          </ul>
          <a
            href={SPONSOR_BAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-black dark:bg-white text-white dark:text-black text-sm font-medium rounded-full px-5 py-2.5 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
          >
            Sponsor for $99/week
          </a>
        </div>
        <div className="border-2 border-black dark:border-white rounded-xl p-6 bg-white dark:bg-neutral-950">
          <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">
            Homepage banner
          </p>
          <p className="text-3xl font-bold text-black dark:text-white mb-3">
            $249
            <span className="text-base font-normal text-neutral-500 dark:text-neutral-400">
              /week
            </span>
          </p>
          <ul className="text-sm text-neutral-600 dark:text-neutral-300 space-y-1.5 mb-5">
            <li>· Everything in Featured, plus:</li>
            <li>· Top banner placement on the homepage</li>
            <li>· Logo + tagline + link, above the fold</li>
            <li>· Newsletter top placement that week</li>
          </ul>
          <a
            href={BANNER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-black dark:bg-white text-white dark:text-black text-sm font-medium rounded-full px-5 py-2.5 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
          >
            Sponsor for $249/week
          </a>
        </div>
      </div>

      <div className="bg-neutral-100 dark:bg-neutral-900 rounded-xl p-6 mb-6">
        <p className="font-semibold text-black dark:text-white mb-1">
          Prefer email?
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          Write to{" "}
          <a
            href="mailto:contact@sheetlypro.com"
            className="underline text-black dark:text-white"
          >
            contact@sheetlypro.com
          </a>{" "}
          with your product link and preferred week. We reply within 48 hours.
        </p>
      </div>

      <p className="text-xs text-neutral-400 dark:text-neutral-500">
        Launch rates — honest note: traffic is growing from zero, priced
        accordingly. No fake stats, ever.
      </p>
    </div>
  );
}
