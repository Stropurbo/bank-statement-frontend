// One-line descriptions for agents, reference-style.
export const agentDescriptions = {
  "chatgpt": "OpenAI's general assistant, and the agent features built around it.",
  "claude": "Anthropic's general assistant.",
  "claude-code": "Anthropic's coding agent, including the non-coding jobs people give it.",
  "n8n": "The workflow automation tool people build agents on.",
  "zapier": "Zapier's automation platform and its AI agents.",
  "make": "The workflow automation tool, also written Make.com.",
  "cursor": "The AI code editor and its background agents.",
  "custom-agent": "Agents people built themselves, lesser-known products, and ones not named.",
};

export function agentDescription(slug) {
  return agentDescriptions[slug] || null;
}
