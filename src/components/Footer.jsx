import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 mt-16">
      <div className="max-w-4xl lg:max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-500 dark:text-neutral-400">
        <div>
          <span className="font-semibold text-black dark:text-white">SheetlyPro</span>
          <span className="mx-2">·</span>
          <span>What people actually do with AI agents.</span>
        </div>
        <div className="flex gap-5 flex-wrap justify-center">
          <Link to="/new" className="hover:text-black dark:hover:text-white">New</Link>
          <Link to="/agents" className="hover:text-black dark:hover:text-white">Agents</Link>
          <Link to="/advertise" className="hover:text-black dark:hover:text-white">Advertise</Link>
          <Link to="/newsletter" className="hover:text-black dark:hover:text-white">Newsletter</Link>
          <Link to="/about" className="hover:text-black dark:hover:text-white">About</Link>
          <Link to="/apps" className="hover:text-black dark:hover:text-white">App Blog</Link>
          <Link to="/privacy" className="hover:text-black dark:hover:text-white">Privacy</Link>
          <a href="/feed.xml" className="hover:text-black dark:hover:text-white">RSS</a>
        </div>
      </div>
    </footer>
  );
}
