import { useRef, useState } from "react";
import { NEWSLETTER_ENDPOINT, NEWSLETTER_EMAIL_FIELD } from "../config";

export default function NewsletterSignup({ compact = false }) {
  const [done, setDone] = useState(false);
  const submittedRef = useRef(false);

  const submit = () => {
    // Plain HTML form POST (no fetch): avoids CORS issues with the
    // Kit subscribe endpoint. Response goes to a hidden iframe.
    // NOTE: do NOT hide the form here — removing the iframe from the DOM
    // cancels the in-flight POST. We show success only after the iframe
    // confirms the POST landed (onLoad), with a timed fallback.
    if (!NEWSLETTER_ENDPOINT) {
      setDone(true);
      return;
    }
    submittedRef.current = true;
    setTimeout(() => setDone(true), 5000);
  };

  const handleFrameLoad = () => {
    // Ignore the iframe's initial mount load; only the post-submit
    // navigation means the signup POST reached Kit.
    if (submittedRef.current) {
      setDone(true);
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
      <form
        action={NEWSLETTER_ENDPOINT || undefined}
        method="post"
        target="kit-hidden-frame"
        onSubmit={submit}
        className="flex flex-col sm:flex-row gap-2"
      >
        <input
          type="email"
          name={NEWSLETTER_EMAIL_FIELD || "email_address"}
          required
          placeholder="you@example.com"
          className="flex-1 border border-neutral-300 rounded-lg px-3 py-2 text-sm bg-white text-black focus:outline-none focus:border-black"
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-800"
        >
          Subscribe
        </button>
        <iframe
          name="kit-hidden-frame"
          title="newsletter signup"
          style={{ display: "none" }}
          onLoad={handleFrameLoad}
        />
      </form>
    </div>
  );
}
