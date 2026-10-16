import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="border-b border-neutral-200 bg-white sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-black">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z"
                fill="white"
                stroke="white"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="font-bold text-xl tracking-tight text-black">
            SheetlyPro
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-sm">
          <NavLink to="/newsletter" className="text-neutral-600 hover:text-black">
            Newsletter
          </NavLink>
          <NavLink to="/about" className="text-neutral-600 hover:text-black">
            About
          </NavLink>
          <Link
            to="/advertise"
            className="bg-black text-white px-3 py-1.5 rounded-full font-medium hover:bg-neutral-800"
          >
            Advertise
          </Link>
        </nav>
      </div>
    </header>
  );
}
