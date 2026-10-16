import { useCallback, useEffect, useState } from "react";

const VOTES_KEY = "sheetlypro_votes";
const SAVED_KEY = "sheetlypro_saved";

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Per-device engagement state: one upvote per use case id, bookmark saves.
 * Persisted in localStorage. Counts shown are this device's own votes only.
 */
export function useEngagement() {
  const [votes, setVotes] = useState(() => readJson(VOTES_KEY, {}));
  const [saved, setSaved] = useState(() => readJson(SAVED_KEY, []));

  useEffect(() => {
    try {
      localStorage.setItem(VOTES_KEY, JSON.stringify(votes));
    } catch {
      /* ignore */
    }
  }, [votes]);

  useEffect(() => {
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
    } catch {
      /* ignore */
    }
  }, [saved]);

  const toggleVote = useCallback((id) => {
    setVotes((prev) => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = 1;
      return next;
    });
  }, []);

  const toggleSaved = useCallback((id) => {
    setSaved((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }, []);

  return { votes, saved, toggleVote, toggleSaved };
}
