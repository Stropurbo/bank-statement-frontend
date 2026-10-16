export default function Advertise() {
  return (
    <div className="py-10 max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight text-black mb-3">
        Advertise
      </h1>
      <p className="text-neutral-600 mb-8">
        Reach readers who build with AI agents. We are growing fast — lock in
        launch rates while we grow.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="border border-neutral-200 rounded-xl p-6">
          <p className="text-sm font-medium text-neutral-500 mb-1">Featured slot</p>
          <p className="text-3xl font-bold text-black mb-2">
            $99<span className="text-base font-normal text-neutral-500">/week</span>
          </p>
          <ul className="text-sm text-neutral-600 space-y-1.5 mb-4">
            <li>· Your tool featured as a use-case card</li>
            <li>· Pinned in the feed for 7 days</li>
            <li>· Included in the daily newsletter</li>
          </ul>
          <a
            href="https://bookloverreview.gumroad.com/l/xmshou"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-black text-white text-sm font-medium rounded-full px-5 py-2.5 hover:bg-neutral-800 transition-colors"
          >
            Book now — $99
          </a>
        </div>
        <div className="border-2 border-black rounded-xl p-6">
          <p className="text-sm font-medium text-neutral-500 mb-1">Homepage banner</p>
          <p className="text-3xl font-bold text-black mb-2">
            $249<span className="text-base font-normal text-neutral-500">/week</span>
          </p>
          <ul className="text-sm text-neutral-600 space-y-1.5 mb-4">
            <li>· Top banner on every page</li>
            <li>· Logo + tagline + link</li>
            <li>· Newsletter top placement</li>
          </ul>
          <a
            href="https://bookloverreview.gumroad.com/l/uulffc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-black text-white text-sm font-medium rounded-full px-5 py-2.5 hover:bg-neutral-800 transition-colors"
          >
            Book now — $249
          </a>
        </div>
      </div>

      <div className="mt-8 bg-neutral-100 rounded-xl p-6">
        <p className="font-semibold text-black mb-1">Book a slot</p>
        <p className="text-sm text-neutral-600">
          Email{" "}
          <a
            href="mailto:contact@sheetlypro.com"
            className="underline text-black"
          >
            contact@sheetlypro.com
          </a>{" "}
          with your product link and preferred week. We reply within 48 hours.
        </p>
      </div>

      <p className="text-xs text-neutral-400 mt-6">
        Launch rates — honest note: traffic is growing from zero, priced
        accordingly. No fake stats, ever.
      </p>
    </div>
  );
}

