import { ContactForm } from "@/components/ContactForm";
import { CurveDivider } from "@/components/CurveDivider";
import { HeroVisual } from "@/components/HeroVisual";
import { PageTurn } from "@/components/PageTurn";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export default function Home() {
  return (
    <PageTurn>
      <section className="relative overflow-hidden bg-ink">
        <div
          aria-hidden="true"
          className="absolute -left-40 -top-40 size-[34rem] rounded-full bg-brand/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -right-32 top-40 size-[28rem] rounded-full bg-brand-glow/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_30%_40%,black_20%,transparent_70%)]"
        />

        {/* minmax(0, …): the code window's long lines are clipped inside it;
            without the zero minimum they would widen the column instead and
            push the text off the side of a phone. */}
        <div className="relative mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-16 px-6 pb-24 pt-36 sm:px-8 sm:pb-32 sm:pt-44 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
          <div>
            <p className="animate-rise inline-flex items-center gap-2.5 rounded-full border border-ink-line bg-ink-soft/70 py-1.5 pl-3 pr-4 text-sm text-ink-muted [animation-delay:0ms]">
              <span aria-hidden="true" className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              Open to internships · {site.location}
            </p>

            <h1 className="animate-rise mt-6 text-5xl font-semibold leading-[1.02] tracking-tight text-ink-text [animation-delay:120ms] sm:text-6xl lg:text-7xl">
              <span className="text-sheen">{site.name}</span>
              <span className="mt-3 block text-3xl font-medium tracking-tight text-ink-muted sm:text-4xl">
                Full-stack developer
              </span>
            </h1>

            <p className="animate-rise mt-7 max-w-xl text-lg leading-relaxed text-ink-muted [animation-delay:240ms]">
              {site.intro}
            </p>

            <div className="animate-rise mt-10 flex flex-wrap items-center gap-4 [animation-delay:360ms]">
              <a
                href="#work"
                className="rounded-xl bg-brand px-6 py-3 text-sm font-medium text-white transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-10px] hover:shadow-brand/80"
              >
                See my work
              </a>
              <a
                href={`mailto:${site.email}`}
                className="rounded-xl border border-ink-line px-6 py-3 text-sm font-medium text-ink-text transition-colors duration-300 hover:border-brand/50 hover:text-brand-bright"
              >
                Get in touch
              </a>
            </div>
          </div>

          <div className="animate-rise [animation-delay:420ms]">
            <HeroVisual />
          </div>
        </div>

        <CurveDivider className="-mb-px" fill="var(--paper)" />
      </section>

      <section id="work" className="scroll-mt-8 bg-paper py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <Reveal className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">My work</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-paper-muted">
              Solo projects and team projects where I own a clear part, from the
              database to the screen. Each one solves a real problem.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 120} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="stack" className="scroll-mt-8 bg-paper-soft py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <Reveal>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Stack</h2>
            <p className="mt-4 max-w-xl text-lg text-paper-muted">
              What I reach for, roughly in order of how much I have used it.
            </p>
          </Reveal>

          <dl className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {site.skills.map((group, i) => (
              <Reveal key={group.group} delay={i * 90}>
                <dt className="text-sm font-semibold uppercase tracking-widest text-brand">
                  {group.group}
                </dt>
                <dd className="mt-3 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-paper-line bg-paper px-2.5 py-1 font-mono text-sm text-paper-muted transition-colors duration-300 hover:border-brand/40 hover:text-paper-text"
                    >
                      {item}
                    </span>
                  ))}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink">
        <CurveDivider flip className="-mt-px" fill="var(--paper-soft)" />

        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 size-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/15 blur-3xl"
        />

        <div className="relative mx-auto max-w-2xl px-6 py-24 sm:px-8 sm:py-28">
          <Reveal className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-ink-text sm:text-5xl">
              Let&rsquo;s build something
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-ink-muted">
              Open to internships and junior developer roles. Leave a message
              below, or email me at{" "}
              <a
                href={`mailto:${site.email}`}
                /* Sublinhado sempre, não só no hover: contra o texto ao redor
                   este azul dá 1,23:1, então a cor sozinha não distingue o
                   link para quem não percebe a diferença de matiz. */
                className="text-brand-bright underline underline-offset-4"
              >
                {site.email}
              </a>
              .
            </p>
          </Reveal>

          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </PageTurn>
  );
}
