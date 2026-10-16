import { useEffect, useState } from "react";

// "Submit a use case" modal — lets visitors send in use cases they found.
// Submissions are emailed to the owner for review (via formsubmit.co,
// free, no backend needed). No page reload.
export default function SubmitModal({ open, onClose }) {
  const [link, setLink] = useState("");
  const [what, setWhat] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | done | error

  useEffect(() => {
    if (open) {
      setStatus("idle");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formsubmit.co/ajax/sabbirnew103@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `New use case submission — ${link || "(no link)"}`,
          Link: link,
          "What did the agent do": what,
          "Name or handle": name || "(anonymous)",
          _template: "table",
        }),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Submit a use case"
    >
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl w-full max-w-lg p-6 sm:p-8 shadow-xl max-h-[90vh] overflow-y-auto dark:bg-neutral-950">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-neutral-400 hover:text-black text-xl leading-none dark:hover:text-white"
        >
          ×
        </button>

        {status === "done" ? (
          <div className="text-center py-8">
            <p className="text-2xl mb-3">✓</p>
            <p className="font-bold text-black text-lg mb-2 dark:text-white">Thanks!</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              Your submission is in. We review everything before publishing —
              you'll be credited on the entry.
            </p>
            <button
              onClick={onClose}
              className="mt-6 bg-black text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="font-bold text-black text-xl mb-2 dark:text-white">Submit a use case</h2>
            <p className="text-sm text-neutral-600 mb-6 leading-relaxed dark:text-neutral-300">
              Got an agent to do something useful, or seen someone who did?
              Send the link and you'll be credited on the entry. Submissions
              are reviewed before they're published.
            </p>
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-black mb-1.5 dark:text-white">
                  Link
                </label>
                <input
                  type="url"
                  required
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://"
                  className="w-full border border-neutral-200 rounded-lg px-3 py-2.5 text-sm bg-neutral-50 text-black placeholder:text-neutral-400 focus:outline-none focus:border-black dark:text-white dark:bg-neutral-900 dark:border-neutral-800"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-1.5 dark:text-white">
                  What did the agent do?
                </label>
                <textarea
                  required
                  value={what}
                  onChange={(e) => setWhat(e.target.value)}
                  placeholder="Which agent, what job, and how it went."
                  rows={4}
                  className="w-full border border-neutral-200 rounded-lg px-3 py-2.5 text-sm bg-neutral-50 text-black placeholder:text-neutral-400 focus:outline-none focus:border-black resize-y dark:text-white dark:bg-neutral-900 dark:border-neutral-800"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-black mb-1.5 dark:text-white">
                  Name or handle{" "}
                  <span className="font-normal text-neutral-500 dark:text-neutral-400">
                    (optional, for credit)
                  </span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-neutral-200 rounded-lg px-3 py-2.5 text-sm bg-neutral-50 text-black placeholder:text-neutral-400 focus:outline-none focus:border-black dark:text-white dark:bg-neutral-900 dark:border-neutral-800"
                />
              </div>
              {status === "error" && (
                <p className="text-sm text-red-600">
                  Couldn't send — please try again in a moment.
                </p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="bg-black text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-neutral-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
              >
                {status === "sending" ? "Sending…" : "Submit"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
