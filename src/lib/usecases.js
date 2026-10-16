import usecases from "../data/usecases.json";
import { topics, topicBySlug } from "../data/topics";

export const allUseCases = [...usecases].sort((a, b) =>
  b.date.localeCompare(a.date)
);

export const getUseCase = (id) => usecases.find((u) => u.id === id);

export const agentSlug = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "custom-agent";

const agentsOf = (u) =>
  u.agents && u.agents.length ? u.agents : ["Custom agent"];

export function agentCounts() {
  const m = {};
  usecases.forEach((u) =>
    agentsOf(u).forEach((a) => {
      m[a] = (m[a] || 0) + 1;
    })
  );
  return Object.entries(m)
    .map(([name, count]) => ({ name, count, slug: agentSlug(name) }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function agentBySlug(slug) {
  return agentCounts().find((a) => a.slug === slug);
}

export function useCasesByAgent(slug) {
  return allUseCases.filter((u) =>
    agentsOf(u).some((a) => agentSlug(a) === slug)
  );
}

export function useCasesByTopic(slug) {
  return allUseCases.filter((u) => u.topic === slug);
}

export function topicName(slug) {
  const t = topicBySlug(slug);
  return t ? t.name : slug;
}

/** Up to n related use cases: same topic first, then same agent. */
export function relatedUseCases(item, n = 4) {
  const others = allUseCases.filter((u) => u.id !== item.id);
  const sameTopic = others.filter((u) => u.topic === item.topic);
  const itemAgents = new Set(agentsOf(item).map(agentSlug));
  const sameAgent = others.filter(
    (u) =>
      u.topic !== item.topic &&
      agentsOf(u).some((a) => itemAgents.has(agentSlug(a)))
  );
  const rest = others.filter(
    (u) =>
      u.topic !== item.topic &&
      !agentsOf(u).some((a) => itemAgents.has(agentSlug(a)))
  );
  return [...sameTopic, ...sameAgent, ...rest].slice(0, n);
}

/** Group use cases by date desc: [{ date, items }] */
export function groupByDate(items) {
  const m = {};
  items.forEach((u) => {
    (m[u.date] = m[u.date] || []).push(u);
  });
  return Object.keys(m)
    .sort((a, b) => b.localeCompare(a))
    .map((date) => ({ date, items: m[date] }));
}

export function fmtDate(iso) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function dayLabel(iso, todayIso) {
  if (iso === todayIso) return "Today";
  const d = new Date(iso + "T00:00:00");
  const t = new Date(todayIso + "T00:00:00");
  const diff = Math.round((t - d) / (24 * 60 * 60 * 1000));
  if (diff === 1) return "Yesterday";
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export { topics, topicBySlug, agentsOf };
