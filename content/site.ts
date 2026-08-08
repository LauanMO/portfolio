/** This file is public. Only put here what belongs on a public page. */
export const site = {
  name: "Lauan Moreira",
  role: "Systems Analysis and Development Student",
  location: "Fortaleza, Brazil",

  intro:
    "I build things end to end — from the calculation engine that has to be right, " +
    "to the API that serves it, to the interface someone will actually use. " +
    "Currently studying systems analysis and development, and shipping side projects " +
    "that solve problems I have personally run into.",

  email: "moreiralauanpro@gmail.com",
  github: "https://github.com/LauanMO",
  /** Empty hides the link. */
  linkedin: "",

  /** Feeds canonical URLs, the sitemap and Open Graph. */
  url: "https://lauanmoreira.dev",

  skills: [
    { group: "Languages", items: ["TypeScript", "JavaScript", "Dart", "Python", "SQL"] },
    { group: "Frontend", items: ["React", "Next.js", "Flutter", "Tailwind CSS", "Vite"] },
    { group: "Backend", items: ["Node.js", "Express", "FastAPI", "REST APIs", "JWT"] },
    { group: "Data", items: ["PostgreSQL", "SQLite", "Supabase"] },
    { group: "Tooling", items: ["Git", "Docker", "Vercel", "Render"] },
  ],
} as const;
