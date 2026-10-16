import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const KEY = "sheetlypro_sponsorbar_dismissed";

// Fixed bottom marquee: user's own apps + an "advertise here" slot.
// When a paying sponsor is booked, replace the advertise slot (or an app slot)
// with the sponsor's name/pitch/link.
const ITEMS = [
  {
    name: "CalyFit",
    text: "AI calorie tracker — 4.3★ on Google Play.",
    url: "https://play.google.com/store/apps/details?id=com.sabbir.myboguraa",
    icon: "🎃",
  },
  {
    name: "TV Cast",
    text: "Mirror your phone to any TV.",
    url: "https://play.google.com/store/apps/details?id=com.sabbir.tvcastscreenmirroring",
    icon: "📺",
  },
  {
    name: "Your brand",
    text: "Reach AI-curious readers. Sponsor us →",
    url: "/advertise",
    internal: true,
    icon: "✦",
  },
];

function ItemIcon({ icon }) {
  return (
    <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-[13px] leading-none shrink-0">
      {icon}
    </span>
  );
}

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

  const row = [...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800">
      <div className="flex items-center">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 px-3 py-2 shrink-0 border-r border-neutral-200 dark:border-neutral-800">
          Sponsors
        </span>
        <div className="flex-1 overflow-hidden">
          <div className="flex gap-8 whitespace-nowrap py-2 animate-marquee w-max">
            {row.map((s, i) =>
              s.internal ? (
                <Link
                  key={i}
                  to={s.url}
                  className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white inline-flex items-center gap-1.5"
                >
                  <ItemIcon icon={s.icon} />
                  <span>
                    <span className="font-semibold text-black dark:text-white">
                      {s.name}:
                    </span>{" "}
                    {s.text}
                  </span>
                </Link>
              ) : (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white inline-flex items-center gap-1.5"
                >
                  <ItemIcon icon={s.icon} />
                  <span>
                    <span className="font-semibold text-black dark:text-white">
                      {s.name}:
                    </span>{" "}
                    {s.text}
                  </span>
                </a>
              )
            )}
          </div>
        </div>
        <button
          onClick={dismiss}
          aria-label="Hide sponsors"
          className="px-3 py-2 text-neutral-400 hover:text-black dark:hover:text-white shrink-0"
        >
          ×
        </button>
      </div>
    </div>
  );
}
