import { useEffect } from "react";
import { SITE_URL } from "../config";

// Keeps the <link rel="canonical"> in sync with the current SPA route.
// Without this, every client-side route shares index.html's homepage
// canonical, which makes Google pick its own canonical ("Duplicate,
// Google chose different canonical than user" in Search Console).
export function useCanonical(path) {
  useEffect(() => {
    const href = `${SITE_URL}${path || "/"}`;
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", href);
    return () => {
      const home = document.querySelector('link[rel="canonical"]');
      if (home) home.setAttribute("href", `${SITE_URL}/`);
    };
  }, [path]);
}
