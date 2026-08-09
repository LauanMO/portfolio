"use client";

import { useEffect } from "react";

/**
 * Eased scrolling for same-page anchors.
 *
 * The browser's own `scroll-behavior: smooth` already worked, but its curve and
 * duration are fixed and rather brisk. This runs the scroll on rAF instead, so
 * the motion can borrow the site's own easing.
 *
 * Delegated from `document` rather than wired into each link: the header nav,
 * the hero button and the skip link all become anchors that behave the same,
 * and anything added later is covered without being wrapped.
 *
 * Without JS the native hash jump plus the CSS rule still work — this only
 * sharpens behaviour that already exists.
 */

/**
 * `cubic-bezier(0.65, 0, 0.35, 1)` — an ease-in-out.
 *
 * Not the `cubic-bezier(0.16, 1, 0.3, 1)` the rest of the site animates on:
 * that curve is a hard ease-out, which suits a 28px reveal but measured badly
 * here. Over ~800px it covers 85% of the distance in the first quarter of the
 * time, so it reads as a jump followed by a crawl — the very thing this is
 * meant to replace. Easing in as well as out keeps the page legible while it
 * travels.
 */
const CURVE = { x1: 0.65, y1: 0, x2: 0.35, y2: 1 } as const;

/**
 * A cubic-bezier easing has no closed form: the curve is parameterised by `t`,
 * but the value needed is at a given `x` (elapsed fraction). Newton-Raphson
 * recovers `t` from `x`, then the same polynomial yields `y`. Few iterations
 * suffice at this precision, and the alternative — eyeballing a lookalike
 * exponential — would drift from the CSS curve the rest of the site animates on.
 */
function bezierEasing(x: number) {
  const { x1, y1, x2, y2 } = CURVE;
  const curve = (a: number, b: number, t: number) =>
    3 * (1 - t) * (1 - t) * t * a + 3 * (1 - t) * t * t * b + t * t * t;
  const slope = (a: number, b: number, t: number) =>
    3 * (1 - t) * (1 - t) * (a) + 6 * (1 - t) * t * (b - a) + 3 * t * t * (1 - b);

  let t = x;
  for (let i = 0; i < 6; i++) {
    const dx = curve(x1, x2, t) - x;
    const d = slope(x1, x2, t);
    if (Math.abs(dx) < 1e-5 || d === 0) break;
    t -= dx / d;
  }
  return curve(y1, y2, Math.min(1, Math.max(0, t)));
}

/**
 * Scales with distance so a short hop is not padded out and a long one is not
 * rushed, then clamps at both ends: below the floor the motion is not read as
 * motion, and above the ceiling the page feels slow to answer. The full-page
 * span here lands near the ceiling.
 */
function durationFor(distance: number) {
  return Math.min(1200, Math.max(450, Math.abs(distance) * 0.9));
}

export function SmoothAnchorScroll() {
  useEffect(() => {
    let frame = 0;
    let cancelAnimation: (() => void) | null = null;

    /**
     * Native hash navigation moves focus to the target; scrolling by script does
     * not, which would strand keyboard and screen-reader users at the top of the
     * document. Section elements are not focusable, so `tabindex` is added for
     * this one interaction and removed on blur to keep it out of tab order.
     */
    function focusTarget(target: HTMLElement) {
      if (!target.hasAttribute("tabindex")) {
        target.setAttribute("tabindex", "-1");
        target.addEventListener("blur", () => target.removeAttribute("tabindex"), {
          once: true,
        });
      }
      target.focus({ preventScroll: true });
    }

    function scrollTo(target: HTMLElement, hash: string) {
      cancelAnimation?.();

      const start = window.scrollY;
      const end = Math.round(target.getBoundingClientRect().top + start);
      const distance = end - start;

      const settle = () => {
        // `pushState`, not `location.hash`: assigning the hash would make the
        // browser jump to the element, undoing the animation that just ran.
        history.pushState(null, "", hash);
        focusTarget(target);
      };

      // Honour the same preference the stylesheet does. A scroll driven by rAF
      // is invisible to `prefers-reduced-motion`, so it has to be checked here
      // or this component would reintroduce exactly the motion that setting
      // exists to remove.
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced || Math.abs(distance) < 2) {
        window.scrollTo({ top: end, behavior: "instant" });
        settle();
        return;
      }

      const duration = durationFor(distance);
      const startedAt = performance.now();

      // Wheel or touch during the animation means the user took over. Fighting
      // them for the remaining frames feels broken, so bail out and leave the
      // page wherever they put it.
      const abort = () => {
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
        cleanup();
      };
      const cleanup = () => {
        window.removeEventListener("wheel", abort);
        window.removeEventListener("touchstart", abort);
        window.removeEventListener("keydown", abort);
        cancelAnimation = null;
      };
      cancelAnimation = abort;

      window.addEventListener("wheel", abort, { passive: true, once: true });
      window.addEventListener("touchstart", abort, { passive: true, once: true });
      window.addEventListener("keydown", abort, { once: true });

      const step = (now: number) => {
        const progress = Math.min(1, (now - startedAt) / duration);
        // `instant` overrides the stylesheet's `scroll-behavior: smooth`, which
        // would otherwise animate every one of these frames against this loop.
        window.scrollTo({
          top: start + distance * bezierEasing(progress),
          behavior: "instant",
        });

        if (progress < 1) {
          frame = requestAnimationFrame(step);
          return;
        }
        frame = 0;
        cleanup();
        settle();
      };

      frame = requestAnimationFrame(step);
    }

    function onClick(event: MouseEvent) {
      // Let the browser own modified clicks — they open tabs and windows.
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest?.("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      // A different route still needs the router: let Next navigate, and the
      // hash is applied by its own scroll handling on arrival.
      if (url.pathname !== window.location.pathname) return;
      if (!url.hash || url.hash === "#") return;

      let target: HTMLElement | null = null;
      try {
        target = document.querySelector<HTMLElement>(url.hash);
      } catch {
        return; // a hash that is not a valid selector
      }
      if (!target) return;

      event.preventDefault();
      // Stops the event before React sees it. `next/link` registers its own
      // handler, which runs during bubbling and would otherwise start a router
      // navigation for what is only a scroll within the current page — and,
      // because it calls `preventDefault` first, this listener would bail out
      // on its own `defaultPrevented` guard if it waited its turn.
      event.stopPropagation();
      scrollTo(target, url.hash);
    }

    // Capture, so this runs ahead of React's delegated handlers rather than
    // after them.
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      if (frame) cancelAnimationFrame(frame);
      cancelAnimation?.();
    };
  }, []);

  return null;
}
