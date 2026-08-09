import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CurveDivider } from "@/components/CurveDivider";
import { PageTurn } from "@/components/PageTurn";
import { Reveal } from "@/components/Reveal";
import { StatusBadge } from "@/components/StatusBadge";
import { getProject, projects } from "@/content/projects";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

/** Any slug outside generateStaticParams is a 404, never a runtime render. */
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Project not found" };

  return {
    title: project.name,
    description: project.tagline,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.name,
      description: project.tagline,
      url: `/projects/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return (
    <PageTurn>
      <article>
        <header className="relative overflow-hidden bg-ink">
          <div
            aria-hidden="true"
            className="absolute -left-32 -top-40 size-[30rem] rounded-full bg-brand/20 blur-3xl"
          />

          <div className="relative mx-auto max-w-4xl px-6 pb-24 pt-36 sm:px-8 sm:pb-28 sm:pt-40">
            {/* `nav-back` turns the leaf the other way. The type is declared on
                the link because only the app knows this goes back up, not deeper. */}
            <Link
              href="/#work"
              transitionTypes={["nav-back"]}
              className="animate-rise inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-brand-bright"
            >
              <span aria-hidden="true">←</span> Back to work
            </Link>

            <div className="animate-rise mt-8 flex flex-wrap items-center gap-4 [animation-delay:100ms]">
              <h1 className="text-4xl font-semibold tracking-tight text-ink-text sm:text-6xl">
                {project.name}
              </h1>
              <StatusBadge status={project.status} tone="ink" />
            </div>

            <p className="animate-rise mt-5 max-w-2xl text-xl text-ink-muted [animation-delay:200ms]">
              {project.tagline}
            </p>

            <div className="animate-rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm [animation-delay:300ms]">
              <span className="font-mono text-ink-muted">{project.year}</span>
              {project.repo ? (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brand-bright underline-offset-4 hover:underline"
                >
                  Source code ↗
                </a>
              ) : (
                <span className="text-ink-muted/70">Private repository</span>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brand-bright underline-offset-4 hover:underline"
                >
                  Live demo ↗
                </a>
              )}
            </div>
          </div>

          <CurveDivider className="-mb-px" fill="var(--paper)" />
        </header>

        <div className="bg-paper py-20 sm:py-24">
          <div className="mx-auto flex max-w-4xl flex-col gap-16 px-6 sm:px-8">
            <Reveal>
              <p className="text-xl leading-relaxed text-paper-text">{project.summary}</p>
            </Reveal>

            <Reveal as="section">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-brand">
                What it does
              </h2>
              <ul className="mt-6 flex flex-col gap-4">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-4 leading-relaxed">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand"
                    />
                    <span className="text-paper-muted">{highlight}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <section>
              <Reveal>
                <h2 className="text-sm font-semibold uppercase tracking-widest text-brand">
                  How it is built
                </h2>
              </Reveal>
              <div className="mt-6 flex flex-col gap-6">
                {project.details.map((detail, i) => (
                  <Reveal key={detail.heading} delay={i * 90}>
                    <div className="rounded-2xl border border-paper-line bg-paper-soft p-6 transition-colors duration-300 hover:border-brand/30">
                      <h3 className="text-lg font-semibold tracking-tight">{detail.heading}</h3>
                      <p className="mt-2 leading-relaxed text-paper-muted">{detail.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            <Reveal as="section">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-brand">
                Stack
              </h2>
              <ul className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-lg border border-paper-line bg-paper-soft px-3 py-1.5 font-mono text-sm text-paper-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </article>
    </PageTurn>
  );
}
