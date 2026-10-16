export const topics = [
  { slug: "money-bills", name: "Money, Bills & Benefits", blurb: "Unclaimed money, refunds, billing disputes, taxes, and insurance." },
  { slug: "productivity", name: "Productivity", blurb: "Inbox triage, personal organization, and everyday automation." },
  { slug: "coding-dev", name: "Coding & Dev", blurb: "Agents writing code, tests, reviews, and migrations." },
  { slug: "marketing-sales", name: "Marketing & Sales", blurb: "Prospecting, outreach, content repurposing, and monitoring." },
  { slug: "business-ops", name: "Business Ops", blurb: "Onboarding, meetings, invoicing, and team workflows." },
  { slug: "learning", name: "Learning", blurb: "Study aids, practice partners, and skill building." },
  { slug: "creative", name: "Creative", blurb: "Film, audio, design, and brand work with agents." },
  { slug: "everyday-life", name: "Everyday Life", blurb: "Shopping, travel, home, and personal tasks." },
];

export const topicBySlug = (slug) => topics.find((t) => t.slug === slug);
