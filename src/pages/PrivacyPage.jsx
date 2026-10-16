export default function PrivacyPage() {
  return (
    <div className="py-10 max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight text-black mb-4">
        Privacy
      </h1>
      <div className="text-neutral-600 space-y-4 leading-relaxed text-[15px]">
        <p>
          <strong className="text-black">SheetlyPro</strong> is a curated
          directory of real AI agent use cases. This page explains what we
          collect and what we don't.
        </p>
        <p>
          <strong className="text-black">Email.</strong> We collect your email
          address only when you subscribe to the newsletter. We use it to send
          the newsletter and nothing else. Unsubscribe anytime with one click.
          We never sell your email or share it with third parties. Newsletter
          delivery is handled by Kit (ConvertKit).
        </p>
        <p>
          <strong className="text-black">Votes and saves.</strong> "I want this"
          votes and saved use cases are stored only in your own browser
          (localStorage). They never leave your device and we can't see them.
        </p>
        <p>
          <strong className="text-black">Submissions.</strong> If you submit a
          use case, we keep the link, description, and the name or handle you
          provide (if any) so we can review it and credit you.
        </p>
        <p>
          <strong className="text-black">Analytics.</strong> We use privacy-friendly,
          aggregate visitor statistics from our hosting provider. No
          advertising trackers, no cross-site cookies.
        </p>
        <p>
          <strong className="text-black">Contact.</strong> Questions about your
          data? Email{" "}
          <a
            href="mailto:contact@sheetlypro.com"
            className="underline text-black"
          >
            contact@sheetlypro.com
          </a>
          .
        </p>
        <p className="text-sm text-neutral-500">
          Last updated October 16, 2026.
        </p>
      </div>
    </div>
  );
}
