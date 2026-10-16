import { useEffect, useRef } from "react";

// Newsletter signup via Kit's official embed. We use Kit's own script
// (not a hand-rolled POST) because Kit's bot protection silently drops
// raw form POSTs from some networks.
const KIT_EMBED_SRC = "https://sheetlypro.kit.com/9f87f8a337/index.js";
const KIT_UID = "9f87f8a337";

export default function NewsletterSignup({ compact = false }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    // Avoid double-injecting under React StrictMode / re-renders.
    if (mount.querySelector(`script[data-kit-uid="${KIT_UID}"]`)) return;
    const s = document.createElement("script");
    s.async = true;
    s.setAttribute("data-uid", KIT_UID);
    s.setAttribute("data-kit-uid", KIT_UID);
    s.src = KIT_EMBED_SRC;
    mount.appendChild(s);
    return () => {
      s.remove();
    };
  }, []);

  return (
    <div className={`bg-neutral-100 dark:bg-neutral-900 rounded-xl ${compact ? "p-5" : "p-6"}`}>
      <p className="font-semibold text-black mb-1 dark:text-white">
        5 agent use cases every morning
      </p>
      <p className="text-sm text-neutral-600 mb-4 dark:text-neutral-300">
        Real examples of what people do with AI agents. One email, 6:30am PT.
      </p>
      <div ref={mountRef} className="kit-embed" />
    </div>
  );
}
