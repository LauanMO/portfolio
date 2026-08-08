export type Project = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  year: string;
  status: "shipped" | "in-progress" | "prototype";
  /** Omit when the repository is private — the page renders a label instead. */
  repo?: string;
  demo?: string;
  /** Only the first four render on the home card. */
  stack: string[];
  highlights: string[];
  details: { heading: string; body: string }[];
};

export const projects: Project[] = [
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
    repo: "https://github.com/LauanMO/TesteItegra-o",
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
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
