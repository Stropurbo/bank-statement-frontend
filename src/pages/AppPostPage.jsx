import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getPost, getApp, APP_POSTS } from "../data/appBlog";
import { usePageTitle } from "../lib/usePageTitle";
import NewsletterSignup from "../components/NewsletterSignup";
import NotFound from "./NotFound";

function renderBody(body) {
  return body.map((block, i) => {
    if (block.h2) {
      return (
        <h2
          key={i}
          className="text-xl font-bold text-black mt-8 mb-3 dark:text-white"
        >
          {block.h2}
        </h2>
      );
    }
    if (block.ul) {
      return (
        <ul
          key={i}
          className="list-disc pl-5 space-y-2 my-4 text-neutral-600 dark:text-neutral-300"
        >
          {block.ul.map((item, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      );
    }
    if (block.ol) {
      return (
        <ol
          key={i}
          className="list-decimal pl-5 space-y-2 my-4 text-neutral-600 dark:text-neutral-300"
        >
          {block.ol.map((item, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ol>
      );
    }
    return (
      <p
        key={i}
        className="my-4 text-neutral-600 leading-relaxed dark:text-neutral-300"
        dangerouslySetInnerHTML={{ __html: block.p }}
      />
    );
  });
}

export default function AppPostPage() {
  const { slug } = useParams();
  const post = getPost(slug);
  usePageTitle(post ? post.title : "Not found");

  // Inject JSON-LD BlogPosting for SEO (SPA: no SSR, so add it dynamically)
  useEffect(() => {
    if (!post) return;
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = "app-post-jsonld";
    el.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      datePublished: post.date,
      author: { "@type": "Organization", name: "SheetlyPro" },
      mainEntityOfPage: `https://www.sheetlypro.com/apps/${post.slug}/`,
    });
    document.head.appendChild(el);
    return () => {
      document.getElementById("app-post-jsonld")?.remove();
    };
  }, [post]);

  if (!post) return <NotFound />;
  const app = getApp(post.appId);
  const related = APP_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="py-10 max-w-2xl">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-500 mb-2 dark:text-neutral-400">
        <Link to="/apps" className="hover:underline">
          Our Apps
        </Link>{" "}
        · {app.name}
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-black mb-2 dark:text-white">
        {post.title}
      </h1>
      <p className="text-sm text-neutral-500 mb-6 dark:text-neutral-400">
        {post.date}
      </p>

      {renderBody(post.body)}

      <div className="mt-8 border border-neutral-200 rounded-2xl p-5 dark:border-neutral-800">
        <span
          className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-full mb-2 ${
            app.price === "FREE"
              ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
              : "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
          }`}
        >
          {app.price}
        </span>
        <p className="font-semibold text-black mb-3 dark:text-white">
          {app.name}
        </p>
        <a
          href={app.playUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-black text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
        >
          ▶ Get it on Google Play
        </a>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold text-black mb-3 dark:text-white">
          More from the app blog
        </h2>
        <div className="space-y-3">
          {related.map((p) => (
            <Link
              key={p.slug}
              to={`/apps/${p.slug}`}
              className="block border border-neutral-200 rounded-xl p-4 hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
            >
              <p className="font-semibold text-black dark:text-white">
                {p.title}
              </p>
              <p className="text-sm text-neutral-500 mt-1 dark:text-neutral-400">
                {p.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <NewsletterSignup />
      </div>
    </div>
  );
}
