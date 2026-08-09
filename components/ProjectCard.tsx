import Link from "next/link";
import type { Project } from "@/content/projects";
import { StatusBadge } from "./StatusBadge";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-paper-line bg-paper shadow-[0_1px_2px] shadow-paper-text/[0.04] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1.5 hover:border-brand/35 hover:shadow-[0_18px_40px_-18px] hover:shadow-brand/35">
      <div className="relative h-32 overflow-hidden bg-ink">
        <div className="absolute -inset-8 bg-linear-to-br from-brand/45 via-brand-glow/25 to-transparent blur-2xl transition-opacity duration-300 group-hover:opacity-80" />
        <div className="relative flex h-full items-center justify-center">
          <span className="font-mono text-2xl font-semibold tracking-tight text-ink-text/90">
            {project.name}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold tracking-tight">
            {/* after:inset-0 stretches the hit area over the whole card, which
                needs the article to stay `relative`. */}
            <Link
              href={`/projects/${project.slug}`}
              transitionTypes={["nav-forward"]}
              className="after:absolute after:inset-0"
            >
              {project.name}
            </Link>
          </h3>
          <StatusBadge status={project.status} />
        </div>

        <p className="mt-3 text-sm leading-relaxed text-paper-muted">{project.tagline}</p>

        <ul
          className="mt-5 flex flex-wrap gap-1.5"
          aria-label={`${project.name} tech stack`}
        >
          {project.stack.slice(0, 4).map((tech) => (
            <li
              key={tech}
              className="rounded-md bg-paper-soft px-2 py-0.5 font-mono text-xs text-paper-muted"
            >
              {tech}
            </li>
          ))}
          {project.stack.length > 4 && (
            <li className="px-1 py-0.5 font-mono text-xs text-paper-muted">
              +{project.stack.length - 4}
            </li>
          )}
        </ul>

        <div className="mt-6 flex items-center justify-between gap-3">
          <p className="flex items-center gap-1.5 text-sm font-medium text-brand">
            Read more
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </p>

          {project.repo ? (
            /* `relative z-10` is not decoration: the stretched link above covers
               the whole card, so without lifting this out from under it the
               repository link cannot be clicked at all. */
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex min-h-6 items-center gap-1.5 rounded-lg border border-paper-line px-2.5 py-1.5 text-xs font-medium text-paper-muted transition-colors hover:border-brand/40 hover:text-brand"
            >
              <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5 fill-current">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
              GitHub
              {/* Every card would otherwise announce the same bare "GitHub".
                  Appending rather than replacing keeps the accessible name
                  containing the visible one, which WCAG 2.5.3 requires.
                  The explicit space survives JSX trimming the line break. */}
              {" "}
              <span className="sr-only">— {project.name} source code</span>
            </a>
          ) : (
            /* Matches the project page, which says the same thing rather than
               offering a link that goes nowhere. */
            <span className="text-xs text-paper-muted/80">Private repo</span>
          )}
        </div>
      </div>
    </article>
  );
}
