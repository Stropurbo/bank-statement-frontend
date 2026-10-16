import { topicBySlug } from "../data/topics";

export default function UseCaseCard({ item }) {
  const topic = topicBySlug(item.topic);
  const date = new Date(item.date + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return (
    <article className="border border-neutral-200 rounded-xl p-5 bg-white hover:border-neutral-400 transition-colors dark:bg-neutral-950 dark:border-neutral-800">
      <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2 dark:text-neutral-400">
        {topic && (
          <a
            href={`/topic/${topic.slug}`}
            className="bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded-full font-medium hover:bg-neutral-200 dark:text-neutral-300 dark:bg-neutral-800"
          >
            {topic.name}
          </a>
        )}
        <span>{date}</span>
        <span>·</span>
        <span>{item.source}</span>
      </div>
      <h3 className="font-semibold text-lg leading-snug text-black mb-1.5 dark:text-white">
        {item.title}
      </h3>
      <p className="text-neutral-600 text-sm leading-relaxed dark:text-neutral-300">{item.summary}</p>
      <a
        href={item.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-3 text-xs text-neutral-500 underline hover:text-black dark:text-neutral-400 dark:hover:text-white"
      >
        Source: {item.source} ↗
      </a>
    </article>
  );
}
