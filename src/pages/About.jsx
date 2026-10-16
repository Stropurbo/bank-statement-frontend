export default function About() {
  return (
    <div className="py-10 max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight text-black mb-4">About</h1>
      <div className="text-neutral-600 space-y-4 leading-relaxed">
        <p>
          <strong className="text-black">Agent Use Cases</strong> is a curated
          directory of what people actually do with AI agents — not demos, not
          hype, but real workflows people describe using in public posts.
        </p>
        <p>
          <strong className="text-black">How curation works:</strong> every day
          we scan public posts across Reddit, X, Substack, and dev communities
          for concrete agent workflows. Each entry is summarized in our own
          words and linked back to its source platform. We never invent quotes,
          numbers, or results.
        </p>
        <p>
          <strong className="text-black">Why it exists:</strong> agent tooling
          moves fast and marketing moves faster. A single place to see grounded,
          practical patterns helps builders skip the noise.
        </p>
        <p>
          Found a great use case we missed, or want something corrected? Email{" "}
          <a
            href="mailto:sabbir.hasan.ca@gmail.com"
            className="underline text-black"
          >
            sabbir.hasan.ca@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
