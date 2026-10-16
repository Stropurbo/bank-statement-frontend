import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="border-b border-neutral-200 bg-white sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl tracking-tight text-black">
          Agent Use Cases
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
