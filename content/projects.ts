export type Project = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  year: string;
  status: "shipped" | "in-progress" | "prototype";
  /** Two short areas, e.g. "Mobile · Maps". Shown on the card and the project page. */
  disciplines: string;
  /** Omit when the repository is private — the page renders a label instead. */
  repo?: string;
  demo?: string;
  /**
   * A real screenshot of the running project (in public/), shown on its card
   * and its page inside a browser window or a phone. `ground` is the colour
   * around it, taken from the screenshot (for a phone, from the app's brand
   * colour, so the screen still reads as a screen). Without one, the card
   * shows the project's name on the dark gradient instead.
   */
  image?: {
    src: string;
    width: number;
    height: number;
    alt: string;
    ground: string;
    frame: "desktop" | "phone";
  };
  stack: string[];
  highlights: string[];
  details: { heading: string; body: string }[];
};

export const projects: Project[] = [
  {
    slug: "elasegura",
    name: "ElaSegura",
    tagline: "Women's safety app with a live risk map and one-tap SOS",
    summary:
      "A team-built mobile app for women's safety. An SOS button shares the user's live location with " +
      "trusted contacts, and a community map pins every reported occurrence by its coordinates, so risky " +
      "areas become visible to everyone nearby.",
    year: "2026",
    status: "prototype",
    disciplines: "Mobile · Maps",
    repo: "https://github.com/EdersonSouzaa/ElaSegura",
    image: {
      src: "/images/projects/elasegura.webp",
      width: 640,
      height: 1385,
      alt: "ElaSegura's welcome screen on a phone: “Sua segurança, nossa prioridade”, with a button to begin.",
      ground: "#a52a5c",
      frame: "phone",
    },
    stack: [
      "React Native",
      "Expo",
      "Leaflet",
      "PostgreSQL",
      "expo-location",
      "geofire-common",
      "Node.js",
      "Express",
      "JWT",
    ],
    highlights: [
      "SOS alert that sends the user's real-time location to trusted contacts.",
      "Interactive safety map where occurrences are pinned by coordinates and risk areas are marked by the community.",
      "Geolocation on the device with expo-location and geohash-based location queries with geofire-common.",
      "Express + PostgreSQL API with JWT sessions and bcrypt-hashed passwords.",
    ],
    details: [
      {
        heading: "Location is the core of the product",
        body:
          "Every main flow starts from where the user is. The same coordinates feed the SOS alert sent to " +
          "contacts, the occurrences saved to the database and the map that shows them, so one source of " +
          "location data powers the whole app.",
      },
      {
        heading: "Built as a team",
        body:
          "Four one-week sprints with Scrum and Kanban, tasks tracked in GitHub Projects and Trello, and " +
          "meetings twice a week to keep the whole team aligned on the code.",
      },
    ],
  },
  {
    slug: "organiza",
    name: "Organiza+",
    tagline: "Real-time order flow for street-food kitchens",
    summary:
      "A web system that connects whoever takes the order with whoever cooks it, in real time, for food " +
      "trucks and small food stalls. An extension project at UNIFOR, free for the businesses. I am the code " +
      "owner of the Supabase layer: every schema change, migration and database version goes through my review.",
    year: "2026",
    status: "in-progress",
    disciplines: "Database · Realtime",
    repo: "https://github.com/SerialSX/Organiza-",
    image: {
      src: "/images/projects/organiza.webp",
      width: 1600,
      height: 1000,
      alt: "Organiza+ taking a new order: eight tables, the menu with prices and the order panel filling up.",
      ground: "#0b192e",
      frame: "desktop",
    },
    stack: [
      "Supabase",
      "PostgreSQL",
      "React",
      "Realtime",
      "Vite",
      "Tailwind CSS",
      "PGlite",
      "Vitest",
      "Playwright",
    ],
    highlights: [
      "Orders travel from the counter to the kitchen in real time over Supabase Realtime.",
      "Code owner of the database: CODEOWNERS routes every change under supabase/ to my review.",
      "Dated SQL migrations, plus database tests that run the real schema on PGlite (Postgres in WebAssembly).",
      "Demo mode with zero setup: data stays in the browser, so anyone can try the full order flow.",
    ],
    details: [
      {
        heading: "Owning the database",
        body:
          "The repository's CODEOWNERS file assigns the supabase/ folder, the database-version check in the " +
          "client and the CODEOWNERS file itself to me. Schema changes ship as dated migrations, and the site " +
          "checks which database version it expects, so the front end and the schema never drift apart silently.",
      },
      {
        heading: "Tested against real Postgres",
        body:
          "The order flow, half-and-half items, sizes, ingredients, the public page and the audit trail each " +
          "have a script that loads the schema into PGlite and exercises it. A migration that breaks the flow " +
          "fails there, before production. Playwright covers the screens end to end, with accessibility checks by axe.",
      },
    ],
  },
  {
    slug: "mandarim",
    name: "MandaRim",
    tagline: "Mandarin learning platform built as three integrated services",
    summary:
      "A spaced-repetition platform for learning Mandarin vocabulary from the HSK syllabus. " +
      "Built as three independently deployable services — a React client, a Node API, and a " +
      "Python AI service — communicating over REST, so that the integration boundaries are real " +
      "rather than folders in a monolith.",
    year: "2026",
    status: "shipped",
    disciplines: "Full stack · AI",
    repo: "https://github.com/LauanMO/MandaRim",
    demo: "https://mandarim-seven.vercel.app",
    image: {
      src: "/images/projects/mandarim.webp",
      width: 1600,
      height: 1000,
      alt: "A MandaRim multiple-choice exercise asking what 学生 (xuésheng) means, with four answers to pick from.",
      ground: "#0d0c14",
      frame: "desktop",
    },
    stack: [
      "React 18",
      "TypeScript",
      "Vite 6",
      "Node.js 22",
      "Express",
      "SQLite",
      "Python 3.12",
      "FastAPI",
      "Gemini",
      "Docker",
    ],
    highlights: [
      "Leitner-box spaced repetition schedules each word's next review from the user's own hit rate.",
      "AI-generated multiple-choice exercises and example sentences, grounded in the word being studied.",
      "Native zh-CN pronunciation through the Web Speech API, with no audio files to ship.",
      "JWT authentication, per-user progress tracking, and a study streak.",
    ],
    details: [
      {
        heading: "Three services, one contract",
        body:
          "The React client talks only to the Node API; the Node API is the sole caller of the Python " +
          "AI service. That single-direction rule keeps the AI service free of auth concerns and lets it " +
          "be swapped, scaled, or taken offline without the client noticing. Docker Compose brings all " +
          "three up with one command.",
      },
      {
        heading: "Degrading gracefully without an API key",
        body:
          "Every Gemini call is wrapped so that a missing key, a quota error, or malformed JSON falls back " +
          "to a deterministic mock generator. The app stays fully usable with no credentials configured — " +
          "which is what makes it clonable and reviewable by anyone.",
      },
      {
        heading: "Structured output instead of prompt parsing",
        body:
          "Exercise and flashcard generation use Gemini's response schema to get typed JSON back directly, " +
          "rather than parsing prose. Model thinking is disabled for these calls: the tasks are simple and " +
          "latency matters more than reasoning depth in a flashcard loop.",
      },
      {
        heading: "Zero-dependency persistence",
        body:
          "Storage uses node:sqlite, the SQLite driver built into Node 22, so the API has no native build " +
          "step and no database container. Three tables — users, vocabulary, progress — with the review " +
          "schedule expressed directly in the schema.",
      },
    ],
  },
  {
    slug: "liquido",
    name: "Liquido",
    tagline: "Real take-home earnings for rideshare drivers",
    summary:
      "Rideshare drivers read gross fares and call it profit. Liquido subtracts what the platform never " +
      "shows them — fuel burned, maintenance accruing per kilometre, and fixed monthly costs amortised " +
      "per working day — to answer one question honestly: what did today actually pay?",
    year: "2026",
    status: "prototype",
    disciplines: "Flutter · Finance",
    stack: [
      "Flutter",
      "Dart",
      "Riverpod",
      "go_router",
      "Supabase",
      "Material 3",
    ],
    highlights: [
      "Per-day net profit after fuel, maintenance provisioning, and amortised fixed costs.",
      "Maintenance items accrue silently per kilometre, so a tyre change is already paid for when it arrives.",
      "Vehicle templates seeded with real consumption figures rather than invented averages.",
      "Guided onboarding that gets a driver from install to a first accurate reading in a few taps.",
    ],
    details: [
      {
        heading: "The calculation engine is the product",
        body:
          "MotorCalculo is pure Dart with no Flutter or network imports — it takes entities in and returns a " +
          "day summary out. Keeping it free of dependencies means the part that must not be wrong is the part " +
          "that is trivial to test, and the UI can be rebuilt around it without touching a single formula.",
      },
      {
        heading: "Layered so the backend is replaceable",
        body:
          "Domain defines repository interfaces; the data layer implements them. Features never reach for " +
          "Supabase.instance directly — the client is injected through a Riverpod provider. Swapping Supabase " +
          "for a custom API would touch the data layer and nothing else.",
      },
      {
        heading: "Provisioning instead of accounting",
        body:
          "Most driver apps log expenses after the fact, which tells you what you already spent. Liquido works " +
          "forward: each maintenance item declares its interval and cost, and every kilometre driven sets aside " +
          "its share. The number on screen is money already committed, not a surprise waiting in the future.",
      },
      {
        heading: "Where it stands",
        body:
          "Authentication runs against Supabase and the UI, navigation, and calculation engine are complete. " +
          "The data layer is still mock-backed — persisting to Supabase means implementing the four repository " +
          "interfaces the domain already declares. That is the remaining work before daily use.",
      },
    ],
  },
  {
    slug: "take-a-bath",
    name: "Take a Bath",
    tagline: "Co-op cleaning game for Roblox, built with a professional pipeline",
    summary:
      "A cooperative cleaning game for Roblox, written in strictly typed Luau and synced into Studio with Rojo. " +
      "The engineering is the point: every push runs formatting, linting, type checks, unit tests and a secret " +
      "scan, and pull requests are held to Gitflow and Conventional Commits.",
    year: "2026",
    status: "in-progress",
    disciplines: "Roblox · CI",
    stack: ["Luau", "Roblox", "Rojo", "GitHub Actions", "Wally", "Lune", "StyLua", "Selene"],
    highlights: [
      "--!strict typing everywhere, enforced by a repository check script.",
      "Unit tests that run outside Roblox Studio with Lune.",
      "CI on every push and PR: StyLua, Selene, type check, wally.lock in sync, rojo build and a gitleaks secret scan.",
      "PRs validated for Gitflow branches and Conventional Commits; labelled PRs merge themselves once checks pass.",
    ],
    details: [
      {
        heading: "Game rules kept testable",
        body:
          "Shared logic and config modules may not require other modules, a rule the repository check enforces. " +
          "That keeps the core rules pure, so they run in plain tests with Lune instead of only inside Studio.",
      },
    ],
  },
  {
    slug: "plantao-vet",
    name: "Plantão Vet",
    tagline: "Clinical-case simulator game for veterinary students",
    summary:
      "A browser game where the player runs a veterinary shift: patients arrive, and the player takes the " +
      "history, examines the animal, orders tests, picks a diagnosis and writes the prescription. Cases live " +
      "in data files, so new ones are added without touching the code.",
    year: "2026",
    status: "in-progress",
    disciplines: "Game · PWA",
    repo: "https://github.com/LauanMO/plantao-vet",
    demo: "https://lauanmo.github.io/plantao-vet/",
    image: {
      src: "/images/projects/plantao-vet.webp",
      width: 1600,
      height: 1000,
      alt: "Plantão Vet in pixel art: the student at the exam table with Faísca the cat, and the owner describing the symptoms.",
      ground: "#1b1a26",
      frame: "desktop",
    },
    stack: ["React", "TypeScript", "Vite", "PWA", "Zod", "Vitest", "Playwright"],
    highlights: [
      "Follows the real consultation order: history, physical exam, tests, diagnosis and prescription.",
      "Study mode by subject and a shift mode with random cases from the subjects already unlocked.",
      "Cases are content files validated with Zod, kept apart from the game code.",
      "Installable PWA, with unit tests in Vitest and end-to-end tests in Playwright.",
    ],
    details: [
      {
        heading: "Content outside the code",
        body:
          "Each subject and each clinical case is a data file. The person who teaches the content can add cases " +
          "as the course moves on, and validation catches a malformed case before it reaches the player.",
      },
    ],
  },
  {
    slug: "radar-vagas",
    name: "Radar de Vagas",
    tagline: "Job-search bot that ranks openings against a résumé",
    summary:
      "A Python bot that reads a résumé, scans new developer openings on Gupy, Himalayas and community job " +
      "boards on GitHub, scores each one from 0 to 100 and sends the best matches to Telegram, with an HTML " +
      "report of the skills the market asks for and the résumé still lacks.",
    year: "2026",
    status: "shipped",
    disciplines: "Python · AI",
    stack: ["Python", "Claude API", "Telegram", "pytest"],
    highlights: [
      "Collectors for Gupy, Himalayas, GitHub job repositories and, optionally, Adzuna.",
      "Match score from 0 to 100 per opening, with filters for level, location and work model.",
      "The best matches go through Claude, which explains what fits, what is missing and what to adjust.",
      "It never applies on its own, by design.",
    ],
    details: [
      {
        heading: "A report, not just a list",
        body:
          "Besides the links, each run produces an HTML report: openings sorted by score, the share of openings " +
          "that ask for each skill and which of those skills the résumé does not show yet.",
      },
    ],
  },
  {
    slug: "circula",
    name: "Circula",
    tagline: "Campus marketplace for donating and reselling, as an installable PWA",
    summary:
      "Built for the technical challenge of an internship selection at UNIFOR's Vortex lab. Students who are " +
      "leaving campus list what they no longer use, for donation or a fair price. A Fastify + TypeScript API " +
      "with Zod validation and SQLite, and a React PWA.",
    year: "2026",
    status: "shipped",
    disciplines: "API · PWA",
    repo: "https://github.com/LauanMO/Circula",
    demo: "https://vortexlm.vercel.app",
    image: {
      src: "/images/projects/circula.webp",
      width: 1600,
      height: 1000,
      alt: "Circula's home page: the pitch to students leaving campus, and live counts of the items listed.",
      ground: "#f6f8f7",
      frame: "desktop",
    },
    stack: ["React 19", "TypeScript", "Fastify", "Zod", "SQLite", "Vite", "PWA"],
    highlights: [
      "Installable PWA with a hand-written service worker.",
      "REST API in Fastify with Zod validation on the routes.",
      "A route test script that exercises the running API.",
      "Seed data, so the app is usable on the first run.",
    ],
    details: [
      {
        heading: "Small on purpose",
        body:
          "node:sqlite instead of a database server and a service worker written by hand instead of a plugin: " +
          "fewer moving parts, so the code a reviewer reads is the code that runs.",
      },
    ],
  },
  {
    slug: "alexandria",
    name: "Alexandria",
    tagline: "Mobile reading app, my capstone project, where I lead the back-end",
    summary:
      "A personal library on the phone: search books on Open Library, track reading status, rate and comment, " +
      "with a profile photo and password recovery by a code sent by e-mail. My team's capstone project at " +
      "UNIFOR, a React Native app on Expo with a Node.js API deployed on Railway. I lead the back-end.",
    year: "2026",
    status: "in-progress",
    disciplines: "Mobile · Back end",
    repo: "https://github.com/Dragoneto/Alexandria",
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "JWT",
      "Nodemailer",
      "Railway",
    ],
    highlights: [
      "Password recovery with a 6-digit code, from the API to the app's screens, with the code sent through Gmail.",
      "The routes that read ratings and the data layer for comments.",
      "Graceful handling when the Open Library search fails.",
      "A GitHub Actions workflow that merges approved pull requests in the team's Git Flow.",
    ],
    details: [
      {
        heading: "Leading the back-end",
        body:
          "As back-end lead I review the team's back-end pull requests. Sessions are JWTs, passwords are " +
          "hashed with bcrypt, and a local mode keeps the data in a file, so anyone can run the API without " +
          "installing PostgreSQL.",
      },
      {
        heading: "A second safety net in my fork",
        body:
          "My fork adds a CI that runs the API tests, the app's type check, tests and lint, and a smoke test " +
          "of the API on every push and pull request to main and dev.",
      },
    ],
  },
  {
    slug: "minha-luz",
    name: "Minha Luz",
    tagline: "Educational 2D game about negative and positive thoughts",
    summary:
      "A Godot game for children, built as a team. The character only sees inside a bubble of light that is " +
      "also her emotional state: good phrases glow and add light, bad ones take it away, and each of the three " +
      "levels generates a new map on every run.",
    year: "2026",
    status: "in-progress",
    disciplines: "Godot · Education",
    repo: "https://github.com/SerialSX/MinhaLuz",
    stack: ["Godot", "GDScript", "Procedural maps"],
    highlights: [
      "Light works as both vision and health, so the core mechanic teaches the theme.",
      "Three levels, each with a new map on every run.",
      "Clearing the last dark cloud lights up the whole world.",
    ],
    details: [
      {
        heading: "Mechanic as message",
        body:
          "Instead of explaining that negative thoughts narrow what we see, the game makes the player feel it: " +
          "the darker it gets, the less of the map is visible.",
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
