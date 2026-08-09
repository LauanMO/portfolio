"use client";

import { useEffect, useRef, useState } from "react";

/** Decorative bars standing in for code. Not meant to be read. */
type Line = { w: string; tone: string; indent?: number };

const FILES: { name: string; project: string; lines: Line[] }[] = [
  {
    name: "motor_calculo.dart",
    project: "Liquido",
    lines: [
      { w: "58%", tone: "bg-sky-400/80" },
      { w: "40%", tone: "bg-fuchsia-400/70", indent: 1 },
      { w: "72%", tone: "bg-slate-400/45", indent: 2 },
      { w: "48%", tone: "bg-emerald-400/70", indent: 2 },
      { w: "64%", tone: "bg-slate-400/45", indent: 2 },
      { w: "34%", tone: "bg-amber-400/70", indent: 1 },
      { w: "56%", tone: "bg-sky-400/70", indent: 1 },
      { w: "26%", tone: "bg-slate-400/45" },
    ],
  },
  {
    name: "gemini.py",
    project: "MandaRim",
    lines: [
      { w: "44%", tone: "bg-amber-400/80" },
      { w: "66%", tone: "bg-slate-400/45" },
      { w: "52%", tone: "bg-emerald-400/75", indent: 1 },
      { w: "76%", tone: "bg-slate-400/45", indent: 2 },
      { w: "38%", tone: "bg-fuchsia-400/70", indent: 2 },
      { w: "60%", tone: "bg-sky-400/70", indent: 2 },
      { w: "30%", tone: "bg-amber-400/70", indent: 1 },
      { w: "48%", tone: "bg-slate-400/45" },
    ],
  },
  {
    name: "schema.js",
    project: "MandaRim",
    lines: [
      { w: "50%", tone: "bg-fuchsia-400/75" },
      { w: "36%", tone: "bg-sky-400/70", indent: 1 },
      { w: "62%", tone: "bg-slate-400/45", indent: 2 },
      { w: "44%", tone: "bg-slate-400/45", indent: 2 },
      { w: "70%", tone: "bg-emerald-400/70", indent: 2 },
      { w: "40%", tone: "bg-slate-400/45", indent: 2 },
      { w: "54%", tone: "bg-amber-400/70", indent: 1 },
      { w: "22%", tone: "bg-fuchsia-400/60" },
    ],
  },
  {
    name: "Exercise.tsx",
    project: "MandaRim",
    lines: [
      { w: "46%", tone: "bg-sky-400/80" },
      { w: "58%", tone: "bg-slate-400/45", indent: 1 },
      { w: "34%", tone: "bg-fuchsia-400/70", indent: 1 },
      { w: "68%", tone: "bg-emerald-400/70", indent: 2 },
      { w: "50%", tone: "bg-slate-400/45", indent: 3 },
      { w: "42%", tone: "bg-sky-400/70", indent: 2 },
      { w: "62%", tone: "bg-slate-400/45", indent: 1 },
      { w: "28%", tone: "bg-amber-400/70" },
    ],
  },
];

export function HeroVisual() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLButtonElement>(null);
  const [index, setIndex] = useState(0);

  const file = FILES[index];
  const next = () => setIndex((i) => (i + 1) % FILES.length);

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
      targetX = Math.max(-9, Math.min(9, relX * 18));
      targetY = Math.max(-7, Math.min(7, -relY * 14));
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
    <div ref={wrapRef} className="relative mx-auto w-full max-w-lg select-none">
      <div
        aria-hidden="true"
        className="animate-pulse-glow absolute -inset-10 rounded-full bg-brand/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="animate-pulse-glow absolute -inset-4 rounded-full bg-brand-glow/20 blur-2xl [animation-delay:2s]"
      />

      <div className="animate-float relative">
        <button
          ref={cardRef}
          type="button"
          onClick={next}
          // Sem `aria-label` de propósito. WCAG 2.5.3 exige que o nome acessível
          // contenha o rótulo visível — quem usa comando de voz fala o que lê na
          // tela. Um aria-label escrito à mão sempre corre atrás do texto
          // renderizado (o nome do projeto sai em uppercase por CSS, por
          // exemplo). Deixando o nome ser computado do conteúdo, mais o trecho
          // `sr-only` abaixo, a correspondência é garantida por construção.
          className="group block w-full cursor-pointer rounded-2xl border border-ink-line bg-ink-soft/90 text-left shadow-2xl shadow-brand/10 backdrop-blur-sm transition-[transform,border-color] duration-300 ease-out will-change-transform hover:border-brand/40"
        >
          <div className="flex items-center gap-2 border-b border-ink-line px-4 py-3">
            <span aria-hidden="true" className="size-3 rounded-full bg-red-400/70" />
            <span aria-hidden="true" className="size-3 rounded-full bg-amber-400/70" />
            <span aria-hidden="true" className="size-3 rounded-full bg-emerald-400/70" />

            {/* aria-live: announces the file change without stealing focus. */}
            <span
              aria-live="polite"
              className="ml-3 truncate font-mono text-xs text-ink-muted"
            >
              {file.name}
            </span>

            <span className="ml-auto shrink-0 font-mono text-[10px] uppercase tracking-wider text-ink-muted transition-colors group-hover:text-brand-bright">
              {file.project}
            </span>
          </div>

          {/* key: remounting on change replays the per-line entrance. */}
          <div key={index} className="flex flex-col gap-2.5 p-5">
            {file.lines.map((line, i) => (
              <div key={i} className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="w-4 shrink-0 text-right font-mono text-[10px] text-ink-muted/50"
                >
                  {i + 1}
                </span>
                <span
                  aria-hidden="true"
                  className={`animate-line-in h-2 rounded-full ${line.tone}`}
                  style={{
                    width: line.w,
                    marginLeft: `${(line.indent ?? 0) * 14}px`,
                    animationDelay: `${i * 45}ms`,
                  }}
                />
              </div>
            ))}

            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="w-4 shrink-0 text-right font-mono text-[10px] text-ink-muted/50"
              >
                {file.lines.length + 1}
              </span>
              <span aria-hidden="true" className="animate-caret h-4 w-[2px] bg-brand-bright" />
            </div>
          </div>

          {/* Completa o nome acessível do botão, que vem do texto visível acima. */}
          <span className="sr-only">code sample. Activate to show the next file.</span>
        </button>
      </div>

      <div className="relative mt-5 flex items-center justify-center gap-3">
        <div className="flex">
          {FILES.map((f, i) => (
            /* O ponto visível segue com 6px, mas o botão em volta tem 24x24 —
               o mínimo da WCAG 2.5.8. Antes o alvo era o próprio ponto de 6x6,
               que no celular exige mira de precisão. O espaçamento entre pontos
               agora vem do preenchimento do botão, não de um `gap`. */
            <button
              key={f.name}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show ${f.name}`}
              aria-current={i === index}
              className="group/dot flex size-6 cursor-pointer items-center justify-center"
            >
              <span
                aria-hidden="true"
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-5 bg-brand-bright"
                    : "w-1.5 bg-ink-line group-hover/dot:bg-ink-muted"
                }`}
              />
            </button>
          ))}
        </div>
        <span aria-hidden="true" className="font-mono text-[10px] text-ink-muted">
          click to browse
        </span>
      </div>
    </div>
  );
}
