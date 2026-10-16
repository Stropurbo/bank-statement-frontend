import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const KEY = "sheetlypro_sponsorbar_dismissed";

// Fixed bottom sponsor marquee. Dismiss persists for 7 days.
export default function SponsorBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw || Date.now() - parseInt(raw, 10) > 7 * 24 * 60 * 60 * 1000) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  const sponsors = [
    { name: "Your brand", text: "Reach AI-curious readers." },
    { name: "Your brand", text: "Featured in front of builders." },
  ];

  const row = [...sponsors, ...sponsors, ...sponsors];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-neutral-200">
      <div className="flex items-center">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 px-3 py-2 shrink-0 border-r border-neutral-200">
          Sponsors
        </span>
        <div className="flex-1 overflow-hidden">
          <div className="flex gap-8 whitespace-nowrap py-2 animate-marquee w-max">
            {row.map((s, i) => (
              <Link
                key={i}
                to="/advertise"
                className="text-xs text-neutral-600 hover:text-black"
              >
                <span className="font-semibold text-black">{s.name}:</span>{" "}
                {s.text}
              </Link>
            ))}
          </div>
        </div>
        <button
          onClick={dismiss}
          aria-label="Hide sponsors"
          className="px-3 py-2 text-neutral-400 hover:text-black shrink-0"
        >
          ×
        </button>
      </div>
    </div>
  );
}
