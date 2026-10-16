import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    try {
      setDark(document.documentElement.classList.contains("dark"));
    } catch {
      /* ignore */
    }
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    try {
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("sheetlypro_theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
  };

  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 sticky top-0 z-10">
      <div className="max-w-4xl lg:max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-black dark:bg-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z"
                fill="white"
                stroke="white"
                strokeWidth="1.5"
                strokeLinejoin="round"
                className="dark:fill-black dark:stroke-black"
              />
            </svg>
          </span>
          <span className="font-bold text-xl tracking-tight text-black dark:text-white">
            SheetlyPro
          </span>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-5 text-sm">
          <NavLink
            to="/new"
            className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hidden sm:inline"
          >
            New
          </NavLink>
          <NavLink
            to="/agents"
            className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hidden sm:inline"
          >
            Agents
          </NavLink>
          <NavLink
            to="/newsletter"
            className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
          >
            Newsletter
          </NavLink>
          <button
            onClick={toggleDark}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white text-lg leading-none"
          >
            {dark ? "☀" : "☾"}
          </button>
          <Link
            to="/advertise"
            className="bg-black dark:bg-white text-white dark:text-black px-3 py-1.5 rounded-full font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200"
          >
            Advertise
          </Link>
        </nav>
      </div>
    </header>
  );
}
