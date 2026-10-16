import { useEffect } from "react";

const BASE = "SheetlyPro";

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — ${BASE}` : `${BASE} — AI Agent Use Cases: What People Actually Do With AI Agents`;
    return () => {
      document.title = `${BASE} — AI Agent Use Cases: What People Actually Do With AI Agents`;
    };
  }, [title]);
}
