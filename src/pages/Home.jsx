import usecases from "../data/usecases.json";
import UseCaseCard from "../components/UseCaseCard";
import TopicNav from "../components/TopicNav";
import NewsletterSignup from "../components/NewsletterSignup";

const sorted = [...usecases].sort((a, b) => b.date.localeCompare(a.date));

export default function Home() {
  return (
    <div>
      <section className="py-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black mb-3">
          What people actually do with AI agents
        </h1>
        <p className="text-neutral-600 max-w-2xl">
          A curated feed of real-world AI agent use cases — collected from
          posts across the web, organized by topic, updated daily.
        </p>
      </section>

      <TopicNav />

      <section className="mt-8 grid gap-4">
        {sorted.map((u) => (
          <UseCaseCard key={u.id} item={u} />
        ))}
      </section>

      <section className="mt-12">
        <NewsletterSignup />
      </section>
    </div>
  );
}
