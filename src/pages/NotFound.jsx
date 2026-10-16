import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-4xl font-bold text-black mb-3 dark:text-white">404</h1>
      <p className="text-neutral-600 mb-6 dark:text-neutral-300">That page doesn't exist.</p>
      <Link to="/" className="underline text-black dark:text-white">
        Back to the feed
      </Link>
    </div>
  );
}
