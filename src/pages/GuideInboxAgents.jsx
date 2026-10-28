import { Link } from "react-router-dom";
import { usePageTitle } from "../lib/usePageTitle";
import { useCanonical } from "../lib/useCanonical";

const ROWS = [
  {
    job: "Turn a messy inbox into a morning brief",
    tools: "Claude",
    does: "Triages overnight email into a short brief: what needs a reply, what is FYI, and draft responses for the routine ones.",
    shape: "A chat assistant producing a daily brief. No workflow tool named.",
    limit:
      "Drafts are prepared for routine replies; the entry does not state that anything is sent automatically.",
  },
  {
    job: "Sort a busy inbox so only the important emails reach you",
    tools: "n8n + Claude Haiku",
    does: "A freelance consultant's daily inbox is mostly noise. The workflow sorts incoming mail, drafts replies, and only surfaces the small share that truly needs attention, so urgent messages stop getting buried.",
    shape: "A scheduled workflow (n8n) with a language model (Claude Haiku) doing the sorting and drafting.",
    limit: "Only the small share needing attention is surfaced; replies are drafted, not stated as auto-sent.",
  },
  {
    job: "Put a personal AI agent on inbox, calendar and CRM duty for a week",
    tools: "OpenAI (Dot)",
    does: "A South African newsletter team tested the agent for seven days. It learned which emails matter and pinged on arrival, prompted when a promised meeting was never booked, spotted leads in email and WhatsApp and nudged follow-ups, and drafted a Slack reply for approval while its owner was driving.",
    shape: "A personal agent running across inbox, calendar and CRM, tested for one week.",
    limit:
      "Stated caveats from the test: it acts as you unless told to introduce itself as an assistant, and it keeps everything in one long chat thread. The Slack reply was drafted for approval.",
  },
  {
    job: "Filter freelance inbox scams with a local LLM watchdog",
    tools: "Custom agent (self-built)",
    does: "A Fiverr seller was losing twenty minutes a day to inbox spam and scam messages. They built a small watcher — a headless browser plus cron plus a local LLM — that reads new messages hourly, classifies each as legitimate or scam, and sends a Telegram alert only for real inquiries. Scams get logged silently.",
    shape: "Self-built watcher: headless browser + cron + local language model. No commercial tool named.",
    limit:
      "Alerts go out only for real inquiries; scams are logged silently. The seller reports roughly ten hours a month saved and faster replies to genuine customers — the seller's own reported figure, not independently verified.",
  },
  {
    job: "Auto-file receipts for expense reports",
    tools: "Custom agent (self-built)",
    does: "An agent watches a dedicated inbox folder, extracts vendor, date, and total from each receipt, and files them for month-end reports.",
    shape: "A folder-watching agent. No commercial tool named.",
    limit: "No human checkpoint is stated in the entry.",
  },
  {
    job: "End the monthly invoice scavenger hunt with n8n (adjacent job, not inbox triage)",
    tools: "n8n",
    does: "A small business owner built a workflow that watches for new invoice emails, saves each invoice as a PDF in a year/month Google Drive folder (creating missing folders automatically), logs supplier, VAT code, date, amount, and currency in a spreadsheet, and labels the email so nothing is filed twice.",
    shape: "A scheduled workflow (n8n). No language model named.",
    limit: "Labelling prevents double-filing; no approval step is stated in the entry.",
  },
];

export default function GuideInboxAgents() {
  usePageTitle("AI agents for inbox management, compared");
  useCanonical("/guides/inbox-ai-agents-compared");

  return (
    <div className="py-10 max-w-4xl">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-500 mb-2 dark:text-neutral-400">
        Guides
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-black mb-4 dark:text-white">
        AI agents for inbox management, compared
      </h1>
      <p className="my-4 text-neutral-600 leading-relaxed dark:text-neutral-300">
        Six real workflows from the SheetlyPro directory, all trying to fix the
        same problem — an inbox that eats the day — with different tools and
        different shapes. There is no single winner in the data: the entries
        differ by job, not by ranking. Pick by the job you actually have.
      </p>

      <h2 className="text-xl font-bold text-black mt-8 mb-3 dark:text-white">
        The comparison
      </h2>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left">
              <th className="border border-neutral-200 p-2 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
                Job in the directory
              </th>
              <th className="border border-neutral-200 p-2 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
                Tool(s) named
              </th>
              <th className="border border-neutral-200 p-2 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
                What it does (as described in the entry)
              </th>
              <th className="border border-neutral-200 p-2 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
                Setup shape (as described)
              </th>
              <th className="border border-neutral-200 p-2 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
                Human checkpoint / stated limit
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.job}>
                <td className="border border-neutral-200 p-2 align-top dark:border-neutral-800">
                  {r.job}
                </td>
                <td className="border border-neutral-200 p-2 align-top dark:border-neutral-800">
                  {r.tools}
                </td>
                <td className="border border-neutral-200 p-2 align-top dark:border-neutral-800">
                  {r.does}
                </td>
                <td className="border border-neutral-200 p-2 align-top dark:border-neutral-800">
                  {r.shape}
                </td>
                <td className="border border-neutral-200 p-2 align-top dark:border-neutral-800">
                  {r.limit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-bold text-black mt-8 mb-3 dark:text-white">
        Which shape fits which job
      </h2>
      <ul className="list-disc pl-5 space-y-2 my-4 text-neutral-600 dark:text-neutral-300">
        <li>
          <strong>You want a daily brief, not a system.</strong> The
          morning-brief pattern (Claude) is the lightest shape in the data:
          triage plus drafts, no workflow tool named.
        </li>
        <li>
          <strong>Your inbox is mostly noise and urgent mail gets buried.</strong>{" "}
          The triage workflow pattern (n8n + Claude Haiku) is built for exactly
          that: sort, draft, and surface only what needs you.
        </li>
        <li>
          <strong>You want one agent across inbox, calendar and CRM.</strong>{" "}
          The personal-agent test (OpenAI Dot) is the only entry in the data
          covering all three — with the stated caveat that it acts as you
          unless told to introduce itself as an assistant.
        </li>
        <li>
          <strong>Your problem is scams, not volume.</strong> The local
          watchdog pattern is the only entry that classifies messages as
          legitimate or scam, and it runs on a local model rather than a
          commercial assistant.
        </li>
        <li>
          <strong>Your problem is filing, not triage.</strong> The receipt and
          invoice patterns watch an inbox folder and file things away; they do
          not decide what needs a reply.
        </li>
      </ul>

      <h2 className="text-xl font-bold text-black mt-8 mb-3 dark:text-white">
        What the data does not say
      </h2>
      <ul className="list-disc pl-5 space-y-2 my-4 text-neutral-600 dark:text-neutral-300">
        <li>
          <strong>Price:</strong> no price is stated in any of these entries,
          so this page claims none. Tool pricing must be checked on the
          vendor&apos;s own page before buying.
        </li>
        <li>
          <strong>Measured outcomes:</strong> only two entries report a number
          — the Fiverr seller&apos;s &ldquo;roughly ten hours a month
          saved&rdquo; (self-reported) and the seven-day test window of the
          personal agent. Everything else is described, not measured.
        </li>
        <li>
          <strong>Sending:</strong> no entry in this comparison states that
          replies are sent automatically. Every entry that mentions replies
          describes them as drafted or prepared.
        </li>
      </ul>

      <h2 className="text-xl font-bold text-black mt-8 mb-3 dark:text-white">
        Source entries on SheetlyPro
      </h2>
      <ul className="list-disc pl-5 space-y-2 my-4 text-neutral-600 dark:text-neutral-300">
        <li>
          <Link to="/use-case/morning-email-brief" className="text-blue-600 hover:underline dark:text-blue-400">
            Turn a messy inbox into a morning brief
          </Link>
        </li>
        <li>
          <Link to="/use-case/email-triage-auto-reply-n8n-claude" className="text-blue-600 hover:underline dark:text-blue-400">
            Sort a busy inbox so only the important emails reach you
          </Link>
        </li>
        <li>
          <Link to="/use-case/personal-ai-agent-inbox-crm-week" className="text-blue-600 hover:underline dark:text-blue-400">
            Put a personal AI agent on inbox, calendar and CRM duty for a week
          </Link>
        </li>
        <li>
          <Link to="/use-case/fiverr-inbox-scam-filter" className="text-blue-600 hover:underline dark:text-blue-400">
            Filter freelance inbox scams with a local LLM watchdog
          </Link>
        </li>
        <li>
          <Link to="/use-case/receipt-auto-file" className="text-blue-600 hover:underline dark:text-blue-400">
            Auto-file receipts for expense reports
          </Link>
        </li>
        <li>
          <Link to="/use-case/invoice-admin-n8n-inbox" className="text-blue-600 hover:underline dark:text-blue-400">
            End the monthly invoice scavenger hunt with n8n
          </Link>
        </li>
      </ul>
      <p className="my-4 text-neutral-600 leading-relaxed dark:text-neutral-300">
        Browse the full directory by{" "}
        <Link to="/topics" className="text-blue-600 hover:underline dark:text-blue-400">
          topic
        </Link>{" "}
        or by{" "}
        <Link to="/agents" className="text-blue-600 hover:underline dark:text-blue-400">
          agent
        </Link>
        . See also:{" "}
        <Link to="/guides/sheetlypro-by-the-numbers" className="text-blue-600 hover:underline dark:text-blue-400">
          SheetlyPro by the numbers
        </Link>{" "}
        — how these counts were produced.
      </p>
    </div>
  );
}
