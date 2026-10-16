import { useState } from "react";
import { NEWSLETTER_ENDPOINT } from "../config";

export default function NewsletterSignup({ compact = false }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!NEWSLETTER_ENDPOINT) {
      setDone(true);
      return;
    }
    try {
      const res = await fetch(NEWSLETTER_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ email }),
      });
      if (!res.ok) throw new Error("subscribe failed");
      setDone(true);
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  if (done) {
    return (
      <div className="bg-neutral-100 rounded-xl p-6 text-center">
        <p className="font-semibold text-black">
          {NEWSLETTER_ENDPOINT
            ? "You're in! Check your inbox to confirm."
            : "Thanks for your interest! The newsletter is launching soon."}
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-neutral-100 rounded-xl ${compact ? "p-5" : "p-6"}`}>
      <p className="font-semibold text-black mb-1">
        5 agent use cases every morning
      </p>
      <p className="text-sm text-neutral-600 mb-4">
        Real examples of what people do with AI agents. One email, 6:30am PT.
      </p>
      <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-1 border border-neutral-300 rounded-lg px-3 py-2 text-sm bg-white text-black focus:outline-none focus:border-black"
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-800"
        >
          Subscribe
        </button>
      </form>
      {error && <p className="text-red-600 text-xs mt-2">{error}</p>}
    </div>
  );
}
