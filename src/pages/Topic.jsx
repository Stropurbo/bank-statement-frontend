import { useParams, Link } from "react-router-dom";
import usecases from "../data/usecases.json";
import { topicBySlug } from "../data/topics";
import UseCaseCard from "../components/UseCaseCard";
import TopicNav from "../components/TopicNav";
import NewsletterSignup from "../components/NewsletterSignup";
import NotFound from "./NotFound";

export default function Topic() {
  const { slug } = useParams();
  const topic = topicBySlug(slug);
  if (!topic) return <NotFound />;

  const items = usecases
    .filter((u) => u.topic === slug)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div>
      <section className="py-10">
        <Link to="/" className="text-sm text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white">
          ← All use cases
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-black mt-2 mb-2 dark:text-white">
          {topic.name}
        </h1>
        <p className="text-neutral-600 dark:text-neutral-300">{topic.blurb}</p>
      </section>

      <TopicNav active={slug} />

      <section className="mt-8 grid gap-4">
        {items.length === 0 && (
          <p className="text-neutral-500 dark:text-neutral-400">No use cases here yet — check back soon.</p>
        )}
        {items.map((u) => (
          <UseCaseCard key={u.id} item={u} />
        ))}
      </section>

      <section className="mt-12">
        <NewsletterSignup />
      </section>
    </div>
  );
}
