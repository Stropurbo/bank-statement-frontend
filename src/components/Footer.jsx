import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 mt-16">
      <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
        <div>
          <span className="font-semibold text-black">Agent Use Cases</span>
          <span className="mx-2">·</span>
          <span>What people actually do with AI agents.</span>
        </div>
        <div className="flex gap-5">
          <Link to="/advertise" className="hover:text-black">Advertise</Link>
          <Link to="/newsletter" className="hover:text-black">Newsletter</Link>
          <Link to="/about" className="hover:text-black">About</Link>
        </div>
      </div>
    </footer>
  );
}
