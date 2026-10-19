import { Link } from "react-router-dom";
import { APPS, APP_POSTS } from "../data/appBlog";
import { usePageTitle } from "../lib/usePageTitle";
import NewsletterSignup from "../components/NewsletterSignup";

export default function AppsPage() {
  usePageTitle("Our Apps");

  return (
    <div className="py-10 max-w-4xl">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-500 mb-2 dark:text-neutral-400">
        Our Apps
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-black mb-4 dark:text-white">
        Android apps actually worth installing
      </h1>
      <p className="text-neutral-600 leading-relaxed mb-8 dark:text-neutral-300 max-w-2xl">
        SheetlyPro tracks what people do with AI agents — but the person behind
        it also builds Android apps. Four hand-picked tools, no bloat, no
        ad-spam, just things that solve real problems.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        {APPS.map((app) => (
          <div
            key={app.id}
            className="border border-neutral-200 rounded-2xl p-5 dark:border-neutral-800"
          >
            <span
              className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-full mb-3 ${
                app.price === "FREE"
                  ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
                  : "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
              }`}
            >
              {app.price}
            </span>
            <h2 className="text-xl font-bold text-black mb-2 dark:text-white">
              {app.name}
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed mb-4 dark:text-neutral-300">
              {app.pitch}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={app.playUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-black text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
              >
                ▶ Get it on Google Play
              </a>
              <Link
                to={`/apps/${app.postSlug}`}
                className="text-sm font-medium underline text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white self-center"
              >
                How it works →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold tracking-tight text-black mb-4 dark:text-white">
        From the app blog
      </h2>
      <div className="space-y-3 mb-10">
        {APP_POSTS.map((post) => (
          <Link
            key={post.slug}
            to={`/apps/${post.slug}`}
            className="block border border-neutral-200 rounded-xl p-4 hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
          >
            <p className="font-semibold text-black dark:text-white">
              {post.title}
            </p>
            <p className="text-sm text-neutral-500 mt-1 dark:text-neutral-400">
              {post.description}
            </p>
          </Link>
        ))}
      </div>

      <NewsletterSignup />
    </div>
  );
}
