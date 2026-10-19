// "Our Apps" — the indie developer's own Android apps, with SEO blog posts.
// Audience: worldwide except Bangladesh. International English. No Bangladesh references.

export const APPS = [
  {
    id: "wireless-mouse",
    name: "Wireless Mouse: Remote Mouse",
    price: "FREE",
    playUrl:
      "https://play.google.com/store/apps/details?id=com.sabbir.wirelessmouse",
    pitch:
      "Turn your phone into a wireless mouse, keyboard and trackpad for your PC. Run presentations, control media, browse from the couch — from your phone.",
    postSlug: "use-phone-as-wireless-mouse-pc",
  },
  {
    id: "tv-cast",
    name: "TV Cast — Screen Mirroring",
    price: "PAID",
    playUrl:
      "https://play.google.com/store/apps/details?id=com.sabbir.tvcastscreenmirroring",
    pitch:
      "Mirror your Android phone to any TV or PC in seconds. No Chromecast needed — works with smart TVs, Fire TV and browsers. A paid app that just works.",
    postSlug: "mirror-android-to-tv-without-chromecast",
  },
  {
    id: "calyfit",
    name: "CalyFit",
    price: "FREE",
    playUrl:
      "https://play.google.com/store/apps/details?id=com.sabbir.myboguraa",
    pitch:
      "Free calorie and macro tracker: snap your meal, log calories, water, steps and sleep — and hit your goals with personalized plans.",
    postSlug: "calyfit-free-calorie-macro-tracker",
  },
  {
    id: "horse-anatomy",
    name: "Horse Anatomy 3D",
    price: "PAID",
    playUrl:
      "https://play.google.com/store/apps/details?id=com.sabbir.horseanatomy",
    pitch:
      "Interactive 3D equine anatomy for vet students, equine vets and horse owners. Explore muscles, bones and organs in detailed 3D.",
    postSlug: "best-3d-horse-anatomy-app-vet-students",
  },
];

// Body blocks: { p: "..." } | { h2: "..." } | { ul: ["..."] } | { ol: ["..."] }
// Keep <strong> tags inside strings for emphasis. Keep Play URLs exact.
export const APP_POSTS = [
  {
    slug: "gemini-4-argon-smarter-desk-setup",
    title:
      "Google's Gemini 4 Argon Is Here — 5 Ways to Make Your Desk Setup Smarter Too",
    date: "2026-10-19",
    description:
      "Google just launched Gemini 4 Argon, now powering AI Mode in Search. Here's what the new AI model changes — and how to build a smarter, more comfortable PC setup around it, including a free phone-as-mouse trick.",
    appId: "wireless-mouse",
    body: [
      {
        p: "On October 13, Google released its new flagship AI model, <strong>Gemini 4 Argon</strong>, to developers and businesses worldwide (via Reuters). If you're on Google's AI Pro or Ultra plan, it's also powering your Gemini app and <strong>AI Mode in Search</strong> — meaning paying users' AI answers now run on a different, more capable model than the free tier.",
      },
      { h2: "What Gemini 4 Argon actually changes" },
      {
        p: "According to Google, Argon is built for \"deep work\" — complex, multi-step tasks in coding, finance, law, cybersecurity and science. Early results look strong: teams using it in Google's Antigravity coding tool submitted more than 35% more agentic code while cutting rollbacks by nearly a third, the company says. It's available via the Gemini platform API at $2 per million input tokens and $10 per million output tokens — an introductory rate that doubles after November 30.",
      },
      {
        ul: [
          "<strong>AI Mode in Search gets smarter</strong> — subscribers now get Argon-powered answers in Google's AI search.",
          "<strong>Better at long, multi-step work</strong> — drafting, debugging, research and analysis in fewer passes.",
          "<strong>A sharper divide between free and paid AI</strong> — paying users and free users may now get noticeably different answers.",
        ],
      },
      { h2: "Your AI got an upgrade — your desk deserves one too" },
      {
        p: "Here's the thing: as AI takes over more of the thinking, the way you <em>work</em> with your computer matters more, not less. You'll spend more time reviewing AI-drafted documents, running long research sessions, presenting results to colleagues — and less time typing. A smarter desk setup means less friction between you and the screen, whether that screen is a laptop or the TV on your wall.",
      },
      { h2: "5 ways to make your desk setup smarter" },
      {
        ol: [
          "<strong>Control your PC from anywhere in the room.</strong> This is the single biggest upgrade most people skip — see the last section.",
          "<strong>Put your screen at eye level.</strong> A laptop stand or a mirrored display on your TV saves your neck during long sessions.",
          "<strong>Mirror to your TV for presentations.</strong> Reviewing AI-generated slides with a colleague? <a href=\"/apps/mirror-android-to-tv-without-chromecast\">Mirror your phone or PC to the big screen</a> instead of crowding around a laptop.",
          "<strong>Learn five keyboard shortcuts.</strong> Alt+Tab, Ctrl+Shift+T, Win+D — tiny habits that compound daily.",
          "<strong>Keep one tool, not five.</strong> Your phone can already be your mouse, keyboard and trackpad (see below) — no dongles, no batteries.",
        ],
      },
      { h2: "Try this: control your PC from the couch with your phone" },
      {
        p: "The easiest desk upgrade costs nothing: install <strong>Wireless Mouse: Remote Mouse</strong>, a free Android app that turns your phone into a wireless mouse, keyboard and trackpad for your PC. Connect phone and computer to the same Wi-Fi, pair once — and your phone screen is a trackpad. Ask AI Mode a research question from your desk, then scroll through the answer from the couch. Run a full presentation without standing next to the laptop. It's the kind of small, practical upgrade that matches the AI era: let the software do the thinking, and remove every bit of friction in between.",
      },
    ],
  },
  {
    slug: "use-phone-as-wireless-mouse-pc",
    title: "How to Use Your Phone as a Wireless Mouse for PC (Free)",
    date: "2026-10-19",
    description:
      "Turn your Android phone into a free wireless mouse, keyboard and trackpad for your PC. No dongle, no batteries — set up in under a minute with Wireless Mouse.",
    appId: "wireless-mouse",
    body: [
      {
        p: "Forgot your mouse at home? Batteries dead mid-presentation? Your phone is already the best wireless mouse you own — you just need the right free app.",
      },
      { h2: "Why a phone works better than a cheap mouse" },
      {
        ul: [
          "<strong>It's always with you</strong> — no extra device to carry, charge or lose.",
          "<strong>Full keyboard included</strong> — type from the couch, search, enter passwords.",
          "<strong>Trackpad + scroll</strong> — precise cursor control with multi-touch gestures.",
          "<strong>Presentation mode</strong> — advance slides and control media from across the room.",
        ],
      },
      { h2: "Set it up in under a minute" },
      {
        ol: [
          "Install <strong>Wireless Mouse: Remote Mouse</strong> on your Android phone — it's free on Google Play.",
          "Connect your phone and PC to the same Wi-Fi network.",
          "Open the app and pair with your computer — no account, no sign-up.",
          "Your phone's screen is now a trackpad. Move your finger to move the cursor.",
        ],
      },
      { h2: "Everyday uses" },
      {
        ul: [
          "Control Netflix or YouTube on your TV-connected PC from the couch.",
          "Run a full presentation without standing next to the laptop.",
          "Emergency mouse when your real one dies at the worst moment.",
          "Type long searches or URLs from across the room.",
        ],
      },
    ],
  },
  {
    slug: "mirror-android-to-tv-without-chromecast",
    title: "How to Mirror Android to TV Without Chromecast",
    date: "2026-10-19",
    description:
      "Mirror your Android phone screen to any smart TV, Fire TV or PC without a Chromecast. TV Cast makes screen mirroring simple — a paid app that just works.",
    appId: "tv-cast",
    body: [
      {
        p: "You don't need a Chromecast to show your phone on the big screen. Most smart TVs, Fire TV sticks and even PCs can receive a screen mirror directly — you just need an app that speaks their language.",
      },
      { h2: "What screen mirroring is good for" },
      {
        ul: [
          "Watch phone videos, photos and slideshows on the TV with family.",
          "Play mobile games on a big screen.",
          "Give presentations straight from your phone.",
          "Video calls on the TV so everyone fits in frame.",
        ],
      },
      { h2: "The simplest way: TV Cast" },
      {
        p: "<strong>TV Cast — Screen Mirroring</strong> is a paid Android app built for one job: mirror your phone to TV and PC in seconds, with no extra hardware.",
      },
      {
        ol: [
          "Install TV Cast on your Android phone.",
          "Make sure your phone and TV (or PC) are on the same Wi-Fi.",
          "Open the app, pick your TV from the list, and tap to connect.",
          "Your phone screen appears on the TV — that's it.",
        ],
      },
      { h2: "Why a dedicated mirroring app" },
      {
        ul: [
          "Works with smart TVs, Fire TV, Android TV and PC browsers.",
          "No Chromecast, cables or dongles required.",
          "Honest pricing: it's a paid app, no subscriptions, no ad spam.",
        ],
      },
    ],
  },
  {
    slug: "calyfit-free-calorie-macro-tracker",
    title: "CalyFit: Free Calorie & Macro Tracker",
    date: "2026-10-19",
    description:
      "CalyFit is a free Android calorie and macro tracker: snap your meal, log calories, water, steps and sleep, with personalized goals. Quick tour + install link.",
    appId: "calyfit",
    body: [
      {
        p: "Tracking what you eat is the single highest-leverage habit for weight goals — but most trackers make logging a chore. CalyFit keeps it simple and free.",
      },
      { h2: "What CalyFit does" },
      {
        ul: [
          "<strong>Meal logging</strong> — snap your food and log calories plus macros in seconds.",
          "<strong>Personalized goals</strong> — calorie and macro targets based on your body and goal.",
          "<strong>Water, steps and sleep</strong> — the full daily picture in one dashboard.",
          "<strong>Voice and barcode logging</strong> — log the way that's fastest for you.",
          "<strong>Health Connect sync</strong> — nutrition and hydration data flows to your other apps.",
        ],
      },
      { h2: "Who it's for" },
      {
        p: "Anyone who wants an honest, free tracker without paywalled basics: students, gym-goers, and anyone starting a recomposition or fat-loss journey.",
      },
      { h2: "Want the deep guides?" },
      {
        p: 'We publish in-depth fitness and nutrition articles on the CalyFit blog — <a href="https://calyfit.site/blog">read them at calyfit.site/blog</a>.',
      },
    ],
  },
  {
    slug: "best-3d-horse-anatomy-app-vet-students",
    title: "Best 3D Horse Anatomy App for Vet Students",
    date: "2026-10-19",
    description:
      "Studying equine anatomy? An interactive 3D horse anatomy app beats flat textbook diagrams. Here's what to look for — and why Horse Anatomy 3D is built for vet students.",
    appId: "horse-anatomy",
    body: [
      {
        p: "Equine anatomy is one of the hardest subjects in vet school — the structures are complex, and flat textbook diagrams don't show how muscles, bones and organs actually sit together. Interactive 3D changes that.",
      },
      { h2: "What to look for in a 3D anatomy app" },
      {
        ul: [
          "<strong>True 3D models</strong> — rotate, zoom and peel away layers, not just pictures.",
          "<strong>Labeled structures</strong> — every muscle, bone and organ clearly named.",
          "<strong>Offline study</strong> — revise anywhere, even without signal.",
          "<strong>Built for the equine focus</strong> — horse-specific, not a generic animal atlas.",
        ],
      },
      { h2: "Horse Anatomy 3D" },
      {
        p: "<strong>Horse Anatomy 3D</strong> is a paid Android app made for exactly this: interactive 3D equine anatomy for vet students, equine veterinarians, trainers and horse owners. Explore the musculoskeletal system, organs and more in detailed 3D — perfect for exam prep and clinical reference.",
      },
    ],
  },
];

export function getApp(id) {
  return APPS.find((a) => a.id === id);
}

export function getPost(slug) {
  return APP_POSTS.find((p) => p.slug === slug);
}
