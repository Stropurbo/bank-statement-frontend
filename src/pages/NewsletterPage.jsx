import NewsletterSignup from "../components/NewsletterSignup";
import { usePageTitle } from "../lib/usePageTitle";
import { useCanonical } from "../lib/useCanonical";

export default function NewsletterPage() {
  usePageTitle("Newsletter");
  useCanonical("/newsletter");
  return (
    <div className="py-10 max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight text-black mb-3 dark:text-white">
        The daily newsletter
      </h1>
      <p className="text-neutral-600 mb-8 dark:text-neutral-300">
        5 real AI agent use cases every morning. Each one includes what was
        done and where it was posted. One email, 6:30am PT. Unsubscribe anytime.
      </p>
      <NewsletterSignup />
    </div>
  );
}
