import { Link } from "react-router-dom";
import { topics } from "../data/topics";

export default function TopicNav({ active }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        to="/"
        className={`px-3 py-1.5 rounded-full text-sm border ${
          !active
            ? "bg-black text-white border-black"
            : "border-neutral-300 text-neutral-700 hover:border-black"
        }`}
      >
        All
      </Link>
      {topics.map((t) => (
        <Link
          key={t.slug}
          to={`/topic/${t.slug}`}
          className={`px-3 py-1.5 rounded-full text-sm border ${
            active === t.slug
              ? "bg-black text-white border-black"
              : "border-neutral-300 text-neutral-700 hover:border-black"
          }`}
        >
          {t.name}
        </Link>
      ))}
    </div>
  );
}
