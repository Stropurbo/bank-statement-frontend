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
  slug: "warhound-cloned-working-dogs-science-explained",
  title:
    "A $200M Startup Is Cloning America's Best Working Dogs — Here's the Science",
  date: "2026-10-23",
  description:
    "Warhound, a new company from Colossal's Ben Lamm and Anduril's Palmer Luckey, raised $200M to clone elite working dogs for the military and police. Here's how the genetics and cloning work, what the fine print says, and why it matters for future vets.",
  appId: "horse-anatomy",
  body: [
    {
      p: "On Thursday, October 22, a new company called Warhound came out of stealth with $200 million in seed funding. Its founders are Ben Lamm, the co-founder of the genetics company Colossal Biosciences, and Palmer Luckey, the founder of the defense tech company Anduril. Their plan: clone America's top-performing working dogs — the military, police, and rescue dogs that detect explosives and find survivors — and use gene editing to remove the health problems that cut many working dogs' careers short.",
    },
    { h2: "The problem Warhound is trying to solve" },
    {
      p: "According to the company's launch announcement, more than 80% of the working dogs used by the US military come from Europe. And fewer than half of the dogs purchased ever make it through training, which takes about three years. That means buyers must find and train roughly 200 dogs to end up with 100 that are fit for service. Warhound's goal is to rebuild a domestic supply of elite working dogs and reduce dependence on a shrinking European supply chain.",
    },
    { h2: "Clone the best, edit out the worst" },
    {
      p: "The idea is simple to state and hard to do: start with dogs that have already proven themselves in the field, and copy what works. Warhound says it has collected blood samples from selected top-performing military, police, and first-responder dogs, with the goal of cloning them. The breeds will be mostly Belgian Malinois, with some Labrador retrievers and shepherds, and the company expects its first puppies to arrive in early 2027.",
    },
    {
      p: "Cloning is only half the story. The other half is gene editing. Lamm told WIRED that the first round of editing will focus on removing common health problems in these breeds, such as hip dysplasia — the painful joint condition that ends many working dogs' careers early. Many dogs wash out of training because of genetic dispositions toward poor eyesight, cancer risk, or muscle atrophy. Later, Lamm said, the company could explore adding wolf olfactory receptor genes to sharpen the dogs' sense of smell.",
    },
    { h2: "High-tech gear — but not cyborg dogs" },
    {
      p: "Warhound's dogs will also carry equipment from Anduril, including eye and ear protection and the company's Eagle Eye system, plus software for battlefield awareness. When WIRED asked whether that made the dogs cyborgs, Lamm said the current plan is tools like advanced body armor — not a computer inside the dog. So no, no dogs with lasers.",
    },
    { h2: "The questions worth asking" },
    {
      ul: [
        "<strong>Cloning does not copy training.</strong> A clone is a genetic twin, not the same dog. Temperament and behavior still depend on upbringing and training — which is why Warhound is building a training program certified by the American Humane Society.",
        "<strong>A narrow gene pool is a real risk.</strong> Cloning a small group of \"top\" dogs concentrates the gene pool, which can lock in exactly the health problems the company wants to edit out.",
        "<strong>Oversight matters.</strong> The American Humane Society will certify Warhound's training and enhancement programs, help reunite retired dogs with their former handlers, and support adoption efforts.",
        "<strong>This is defense tech.</strong> Warhound's investors include In-Q-Tel, and its dogs are meant for the military and law enforcement. That is the business model, not a footnote.",
      ],
    },
    { h2: "Why this story matters for future vets" },
    {
      p: "Strip away the $200 million and the defense framing, and Warhound is fundamentally a bet on animal biology: that deep knowledge of genetics and anatomy can produce healthier, longer-lived working animals. That is the same foundation every veterinarian builds in school. If stories like this pull you toward animal medicine, our guide explains how <a href=\"/apps/best-3d-horse-anatomy-app-vet-students\">interactive 3D anatomy tools help vet students learn</a> — because understanding structure is how breeders, trainers, and vets understand function.",
    },
    { h2: "Curious about the biology? Explore anatomy in 3D" },
    {
      p: "Stories like Warhound's start with knowing how animals are built. <strong>Horse Anatomy 3D</strong> is a paid Android app for vet students, equine vets, trainers, and horse owners: explore muscles, bones, and organs in detailed interactive 3D — rotate, zoom, and study every structure. The Play Store card below takes you straight to it.",
    },
  ],
},

  {
    slug: "perplexity-local-ai-agent-mac-pc-control",
    title:
      "Perplexity Just Taught Your Mac to Click Its Own Mouse — Here's What That Means for You",
    date: "2026-10-22",
    description:
      "Perplexity's AI agent can now run fully on your Mac — clicking, typing, and organizing files without the cloud. Here's what local AI agents mean for how we control our computers, and simple ways to stay in the driver's seat without a subscription.",
    appId: "wireless-mouse",
    body: [
      {
        p: "On October 20, 2026, Perplexity announced something that would have sounded like science fiction five years ago: its Computer agent — an AI that can click, type, and work inside your apps for you — can now run entirely on your Mac. The model, the planning, and the task execution all happen on-device, so your private files never leave the machine unless you say so. It is the clearest sign yet that we are entering the age of AI agents that drive our computers for us.",
      },
      { h2: "What Perplexity's local AI agent actually does" },
      {
        p: "Perplexity Computer is an AI agent built into the Perplexity Mac app. You give it a task, and it takes over: opening apps, reading your emails and messages, spotting deadlines, and writing up an action list in Notes. It uses the computer the way you do — clicking buttons, typing into fields, moving between windows. Until now, that kind of power ran in the cloud. With the new local mode, the AI model and the agent that directs each task both live on your Mac. Perplexity offers two on-device models to choose from: Qwen 3.6, and PPLX Pro, a version of Qwen that Perplexity trained further itself. Sensitive code and tool actions run in isolated sandboxes — sealed-off spaces with controlled access to your files and apps — and anything that needs the web or an online service only goes to the cloud with your approval.",
      },
      { h2: "The catches nobody leads with" },
      {
        ul: [
          "<strong>You need serious hardware.</strong> Perplexity recommends 36GB of unified memory — more than most MacBook Air and iMac models can even be configured with.",
          "<strong>It is not for free users.</strong> Fully local mode is open to Pro, Max, and Enterprise subscribers only.",
          "<strong>It is Mac-only.</strong> If you live on a Windows PC or a Chromebook, this particular future is not for you.",
          "<strong>&quot;Fully local&quot; has fine print.</strong> Web research and connected services still need a cloud step, and the agent can call on more than 15 larger cloud models for harder problems.",
        ],
      },
      { h2: "AI agents are learning to drive — most of us just need a better remote" },
      {
        p: "Here is the part the announcements skip: most of us do not need an AI to take over our computer. We just want to be comfortably in control of it. When you are presenting slides, running a movie night, or working from the couch, the bottleneck is not intelligence. It is reach. Your computer sits on a desk. You sit somewhere else.",
      },
      {
        p: "That is the gap simple tools still fill better than any agent. A few low-tech wins that work on the computer you already own: turn your phone into a wireless mouse and keyboard so you can present, browse, and control media from anywhere in the room; learn ten keyboard shortcuts for the apps you use most; and dictate instead of typing when you are leaning back. No subscription, no 36GB of RAM, no waiting for the cloud.",
      },
      { h2: "Try this: your phone as a wireless mouse" },
      {
        p: 'If the Perplexity news has you thinking about computer control, start with the free, instant version. Turn your phone into a wireless mouse, keyboard, and trackpad for your PC — run presentations, browse the web, and control music and video from anywhere in the room. Our guide <a href="/apps/use-phone-as-wireless-mouse-pc">explains how to set it up in minutes</a>. <strong>Wireless Mouse: Remote Mouse</strong> is free on Android, and the Play Store card below takes you straight to it.',
      },
    ],
  },
  {
    slug: "calorie-tracking-mistakes-stall-weight-loss",
    title:
      "7 Calorie Tracking Mistakes That Stall Your Weight Loss (and How to Fix Them)",
    date: "2026-10-21",
    description:
      "Logging your food but not losing weight? These 7 common calorie tracking mistakes — forgotten cooking oils, unlogged drinks, skipped bad days — quietly add hundreds of calories. Here's how to fix each one.",
    appId: "calyfit",
    body: [
      {
        p: "You log your meals, stay under your calorie target, and the scale still won't move. Frustrating — and far more common than you think. The problem usually isn't your willpower. It's small logging mistakes that quietly add hundreds of calories a day. Here are the seven most common ones, and the simple fix for each.",
      },
      { h2: "1. Forgetting cooking oils and butter" },
      {
        p: "A tablespoon of olive oil is around 120 calories, and most people pour two or three into the pan without thinking — then log the vegetables as if they were steamed. Butter, ghee, and cooking sprays add up the same way. Fix: log your cooking fat first, before you log anything else. Measure it once with a spoon so you know what your usual pour looks like.",
      },
      { h2: "2. Eyeballing portions" },
      {
        p: 'Studies on food journaling consistently find that people underestimate how much they eat — especially with calorie-dense foods like rice, pasta, peanut butter, and cheese. A "tablespoon" of peanut butter from the jar is often two. Fix: weigh or measure your food for two weeks. You don\'t have to do it forever — two weeks is enough to recalibrate your eye.',
      },
      { h2: "3. Not logging drinks" },
      {
        p: 'That morning latte with whole milk and syrup, the "healthy" orange juice, the two beers on Friday — drinks are the easiest calories to forget because they don\'t feel like food. A single sugary coffee can carry 200+ calories. Fix: log every drink like a meal. Black coffee, tea, and water are free; everything else counts.',
      },
      { h2: "4. Skipping the bites, tastes, and finishes" },
      {
        p: "The spoonful of curry you taste while cooking. The crusts you finish off your kid's plate. The handful of nuts while waiting for dinner. None of them feel like eating, so none get logged — but together they can be a full snack. Fix: if it goes in your mouth, it goes in the log. No exceptions for the first month.",
      },
      { h2: "5. Only tracking on good days" },
      {
        p: 'This is the big one. People log diligently Monday to Friday, then "take the weekend off" — and the weekend erases the week\'s deficit. An untracked Saturday can undo five tracked days. Fix: log every day, especially the bad ones. The log is data, not a report card. You can\'t fix what you can\'t see.',
      },
      { h2: "6. Picking the generic entry instead of your actual food" },
      {
        p: '"Chicken salad" in a tracking app can range from 300 to 900 calories depending on the dressing, cheese, and portion. When you pick the first generic result, you\'re guessing — and guesses skew low. Fix: build your own saved meals for foods you eat often, with the real ingredients and amounts. It takes ten minutes once and pays off daily.',
      },
      { h2: "7. Judging one day instead of the weekly average" },
      {
        p: "Weight fluctuates daily with water, salt, and digestion — a single day's number means almost nothing. People who panic over Tuesday's spike often slash calories recklessly or quit entirely. Fix: compare weekly averages, not daily readings. Seven days of honest logging tells the true story; one day never does.",
      },
      { h2: "Make logging effortless" },
      {
        p: 'Here\'s the thing about all seven mistakes: they\'re not discipline problems, they\'re friction problems. The easier logging is, the more honest it becomes. That\'s why a <a href="/apps/calyfit-free-calorie-macro-tracker">free calorie tracker</a> that lets you snap your meal, scan a barcode, or just speak your food out loud beats a spreadsheet every time. <strong>CalyFit</strong> is free on Android: log calories and macros in seconds, track water, steps and sleep in the same place, and get personalized targets based on your body and goal. Fix the mistakes, keep the habit, and let the weekly average do the talking.',
      },
    ],
  },
  {
    slug: "gta-vi-launch-trailer-big-screen-guide",
    title:
      "GTA VI's Launch Trailer Is Out — One Month to Go: Make It a Big-Screen Event",
    date: "2026-10-20",
    description:
      "Rockstar dropped the GTA VI launch trailer on October 15 — 90 seconds of Jason and Lucia, Vice City and Leonida. With the November 19 launch one month away, here's what the trailer tells us and how to enjoy the hype on the biggest screen in your home.",
    appId: "tv-cast",
    body: [
      {
        p: "After years of waiting and two delays, the biggest game of the decade finally has a launch trailer. On October 15, 2026, <strong>Rockstar Games released the official launch trailer for Grand Theft Auto VI</strong> — roughly 90 seconds of story-focused footage, captured in-game on PlayStation 5, and it pulled 13.8 million views and 1.1 million likes in its first eight hours (per EGamers.io). With launch confirmed for <strong>November 19, 2026</strong> on PlayStation 5 and Xbox Series X|S, the countdown is officially down to one month.",
      },
      { h2: "What the launch trailer shows" },
      {
        p: "The trailer puts protagonists <strong>Jason Duval and Lucia Caminos</strong> front and center — a criminal partnership in the style of Bonnie and Clyde. An easy score goes wrong, and the pair get pulled into a criminal conspiracy that stretches across the fictional state of Leonida, with Vice City looming throughout. Shootouts, police pursuits, piles of cash — and the pair's relationship holding it all together.",
      },
      {
        ul: [
          "<strong>Captured on PS5</strong> — Rockstar says all footage was captured in-game on PlayStation 5, carrying the \"Plays Best On PS5\" marketing tag.",
          "<strong>New music debut</strong> — the trailer premieres <em>Flower in a Hurricane</em>, a new track from French electronic duo <strong>Justice</strong> featuring Tame Impala, SZA and King Gizzard & The Lizard Wizard. Justice also composed the game's full original score.",
          "<strong>Only the third trailer</strong> — the first was rushed out in December 2023 after a major leak, the second arrived in May 2025, and this one closes the teaser chapter.",
          "<strong>Pre-orders live</strong> — Standard Edition at $79.99, Ultimate Edition at $99.99; no PC version announced yet.",
        ],
      },
      { h2: "Why the big screen matters for this one" },
      {
        p: "A trailer like this deserves more than a phone screen. The whole point of GTA VI's launch window is that it's a shared cultural moment — friends dissecting every frame, comparing reactions, replaying that Justice track at volume. A phone can't do that justice (pun intended). But you don't need to buy anything new to make your TV the stage.",
      },
      { h2: "4 ways to enjoy the GTA VI hype on the big screen" },
      {
        ol: [
          "<strong>Watch the trailer on your TV tonight.</strong> Pull up the 90-second launch trailer on your TV and watch it properly — the Vice City skyline shots were built for a big panel, not a 6-inch screen.",
          "<strong>Mirror your phone for frame-by-frame debates.</strong> Gaming forums and video essays are exploding with trailer breakdowns. <a href=\"/apps/mirror-android-to-tv-without-chromecast\">Mirror your Android phone to the TV</a> and scrub through reaction videos and analysis clips together instead of huddling around a phone.",
          "<strong>Play mobile games on the big screen.</strong> While you wait for November 19, run your favorite mobile games on the TV — same game, cinema-scale.",
          "<strong>Host a launch-night countdown.</strong> When the 19th rolls around, your TV becomes the hub: trailer marathons, soundtrack listening party (Justice's score deserves speakers), and the wait together.",
        ],
      },
      { h2: "Try this: mirror your phone to the TV in seconds" },
      {
        p: "<strong>TV Cast — Screen Mirroring</strong> is a paid Android app built for one job: put your phone on the big screen in seconds, with no Chromecast, no cables and no dongles. Connect phone and TV (or PC) to the same Wi-Fi, pick your TV from the list, tap to connect — and your trailer breakdown, mobile game or photo gallery is suddenly cinematic. It's a paid app ($1.99): no subscription, no ad spam — it just works.",
      },
    ],
  },
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
