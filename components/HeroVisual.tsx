"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Real code, copied line for line from the projects' public repositories, so
 * each line can be checked against the file it names. `// …` marks the one
 * place where lines in between were skipped.
 */
const SNIPPETS: { project: string; path: string; code: string }[] = [
  {
    project: "MandaRim",
    path: "backend/src/routes/user.js",    code: `const INTERVALS = [0, 1, 2, 4, 7, 15];
const MAX_BOX = INTERVALS.length - 1;
// …
  if (correct) {
    box = Math.min(box + 1, MAX_BOX);
    correctCount += 1;
  } else {
    box = Math.max(box - 1, 0);
    wrongCount += 1;
  }`,
  },
  {
    project: "Plantão Vet",
    path: "src/modelo/caso.ts",    code: `export const casoSchema = z
  .strictObject({
    id: texto,
    materia: texto,
    tema: texto,
    dificuldade: z.number().int().min(1),
    cenario: z.enum(['consultorio', 'campo']),
    paciente: z.strictObject({
      nome: texto,
      especie: z.enum(['cão', 'gato', 'bovino', 'equino']),`,
  },
  {
    project: "Circula",
    path: "api/src/rotas.ts",    code: `const filtros = z.object({
  categoria: z.enum(CATEGORIAS).optional(),
  usuarioId: usuarioId.optional(),
  limite: z.coerce.number().int().positive().max(100).optional(),
});

export async function rotasAnuncios(app: FastifyInstance) {
  // Sonda de saúde. Útil no deploy e para conferir rapidamente se a API subiu.
  app.get('/health', async () => ({ status: 'ok' }));`,
  },
];

const KEYWORDS = new Set(["const", "let", "if", "else", "return", "export", "async", "await", "function", "new", "true", "false", "null"]);

const COLOURS = {
  keyword: "text-fuchsia-300",
  string: "text-emerald-300",
  number: "text-amber-300",
  comment: "text-ink-muted",
  call: "text-sky-300",
  plain: "text-ink-text/90",
};

/** Just enough highlighting for these snippets: no parser, one pass per line. */
function highlight(line: string) {
  const at = line.indexOf("//");
  const code = at === -1 ? line : line.slice(0, at);
  const parts: { text: string; tone: keyof typeof COLOURS }[] = [];

  for (const match of code.matchAll(/('(?:[^'\\]|\\.)*')|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)|([^'A-Za-z_$\d]+)/g)) {
    const [text, string, number, word] = match;
    if (string) parts.push({ text, tone: "string" });
    else if (number) parts.push({ text, tone: "number" });
    else if (word && KEYWORDS.has(word)) parts.push({ text, tone: "keyword" });
    else if (word && code[(match.index ?? 0) + word.length] === "(") parts.push({ text, tone: "call" });
    else parts.push({ text, tone: "plain" });
  }
  if (at !== -1) parts.push({ text: line.slice(at), tone: "comment" });
  return parts;
}

const AUTO_ADVANCE_MS = 7000;

export function HeroVisual() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const snippet = SNIPPETS[index];
  const next = () => setIndex((i) => (i + 1) % SNIPPETS.length);

  // Turns the page on its own, unless the visitor is reading or asked for less motion.
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setTimeout(() => setIndex((i) => (i + 1) % SNIPPETS.length), AUTO_ADVANCE_MS);
    return () => clearTimeout(timer);
  }, [index, paused]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const card = cardRef.current;
    if (!wrap || !card) return;

    // No tilt for reduced-motion users, and none on touch — there is no hover.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduced || !finePointer) return;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;

    // Cached: measuring inside the move handler forces a layout recalc on
    // every pointer event across the whole page.
    let rect = wrap.getBoundingClientRect();
    const measure = () => {
      rect = wrap.getBoundingClientRect();
    };

    const apply = () => {
      frame = 0;
      card.style.transform = `perspective(1100px) rotateY(${targetX}deg) rotateX(${targetY}deg)`;
    };

    const onMove = (event: PointerEvent) => {
      if (!rect.width || !rect.height) return;
      const relX = (event.clientX - rect.left) / rect.width - 0.5;
      const relY = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = Math.max(-8, Math.min(8, relX * 16));
      targetY = Math.max(-6, Math.min(6, -relY * 12));
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    wrap.addEventListener("pointerleave", onLeave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto w-full max-w-xl select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        aria-hidden="true"
        className="animate-pulse-glow absolute -inset-10 rounded-full bg-brand/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="animate-pulse-glow absolute -inset-4 rounded-full bg-brand-glow/20 blur-2xl [animation-delay:2s]"
      />

      <div className="animate-float relative">
        {/* A click anywhere on the window shows the next file, for the mouse;
            the buttons underneath do the same for everyone else. */}
        <div
          ref={cardRef}
          onClick={next}
          className="group cursor-pointer overflow-hidden rounded-2xl border border-ink-line bg-ink-soft/90 shadow-2xl shadow-brand/10 backdrop-blur-sm transition-[transform,border-color] duration-300 ease-out will-change-transform hover:border-brand/40"
        >
          <div className="flex items-center gap-2 border-b border-ink-line px-4 py-3">
            <span aria-hidden="true" className="size-3 shrink-0 rounded-full bg-red-400/70" />
            <span aria-hidden="true" className="size-3 shrink-0 rounded-full bg-amber-400/70" />
            <span aria-hidden="true" className="size-3 shrink-0 rounded-full bg-emerald-400/70" />
            <span className="ml-3 truncate font-mono text-[13px] text-ink-muted">{snippet.path}</span>
            <span className="ml-auto shrink-0 text-[13px] font-medium text-brand-bright">{snippet.project}</span>
          </div>

          {/* key: remounting on change replays the per-line entrance. */}
          <pre
            key={index}
            aria-label={`Code from ${snippet.project}, ${snippet.path}`}
            className="overflow-hidden px-4 py-5 font-mono text-[13px] leading-6"
          >
            <code>
              {snippet.code.split("\n").map((line, i) => (
                <span
                  key={i}
                  className="animate-line-in flex"
                  style={{ animationDelay: `${i * 45}ms` }}
                >
                  <span aria-hidden="true" className="w-6 shrink-0 select-none pr-4 text-right text-ink-muted/60">
                    {i + 1}
                  </span>
                  <span className="whitespace-pre">
                    {highlight(line).map((part, j) => (
                      <span key={j} className={COLOURS[part.tone]}>
                        {part.text}
                      </span>
                    ))}
                  </span>
                </span>
              ))}
            </code>
          </pre>
        </div>
      </div>

      <div className="relative mt-5 flex items-center justify-center gap-3">
        <div className="flex">
          {SNIPPETS.map((s, i) => (
            /* The dot stays 6px, but the button around it is 24x24, the WCAG
               2.5.8 minimum target. */
            <button
              key={s.path}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show code from ${s.project}`}
              aria-current={i === index}
              className="group/dot flex size-6 cursor-pointer items-center justify-center"
            >
              <span
                aria-hidden="true"
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-5 bg-brand-bright" : "w-1.5 bg-ink-line group-hover/dot:bg-ink-muted"
                }`}
              />
            </button>
          ))}
        </div>
        <span aria-hidden="true" className="text-[13px] text-ink-muted">
          Real code from my projects
        </span>
      </div>
    </div>
  );
}
