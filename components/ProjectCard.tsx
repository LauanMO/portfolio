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
            <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0">
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

        <p className="mt-6 flex items-center gap-1.5 text-sm font-medium text-brand">
          Read more
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </p>
      </div>
    </article>
  );
}
