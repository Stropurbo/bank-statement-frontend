import { Link } from "react-router-dom";
import { APP_POSTS } from "../data/appBlog";
import { usePageTitle } from "../lib/usePageTitle";
import { useCanonical } from "../lib/useCanonical";
import NewsletterSignup from "../components/NewsletterSignup";

export default function AppsPage() {
  usePageTitle("App Blog");
  useCanonical("/apps");

  return (
    <div className="py-10 max-w-4xl">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-500 mb-2 dark:text-neutral-400">
        App Blog
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-black mb-4 dark:text-white">
        App Blog
      </h1>
      <p className="text-neutral-600 leading-relaxed mb-8 dark:text-neutral-300 max-w-2xl">
        Practical guides and how-tos from the indie developer behind SheetlyPro —
        written for Android users who want tools that actually solve problems.
      </p>

      <div className="space-y-4 mb-10">
        {APP_POSTS.map((post) => (
          <Link
            key={post.slug}
            to={`/apps/${post.slug}`}
            className="block border border-neutral-200 rounded-2xl p-5 hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
          >
            <p className="text-xs text-neutral-500 mb-1.5 dark:text-neutral-400">
              {post.date}
            </p>
            <p className="text-lg font-bold text-black mb-1.5 dark:text-white">
              {post.title}
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed mb-3 dark:text-neutral-300">
              {post.description}
            </p>
            <span className="text-sm font-medium underline text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white">
              Read more →
            </span>
          </Link>
        ))}
      </div>

      <NewsletterSignup />
    </div>
  );
}
