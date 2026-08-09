import { ViewTransition } from "react";

/**
 * Wraps a page so navigating to or from it turns like a leaf in a book.
 *
 * The direction is not inferred — a link declares it with `transitionTypes`,
 * because only the app knows which way is deeper. Anything untyped, which
 * includes the browser's own back button and `router.refresh()`, maps to
 * `none` and swaps without animating.
 *
 * This has to sit inside each `page.tsx` rather than the layout: layouts
 * persist across navigation, so a `ViewTransition` there would never see its
 * children enter or leave.
 *
 * Browsers without the View Transitions API navigate normally and skip the
 * animation, so nothing here needs a fallback.
 */
/**
 * Which of the two pages is the moving leaf depends on the direction, so enter
 * and exit cannot share a map.
 *
 * Going forward, the page being left behind is the leaf that turns away and the
 * arriving one waits underneath. Going back, that reverses: the returning page
 * is the leaf, turning in to cover the one being left.
 *
 * The two pages get separate `view-transition-name`s rather than forming an
 * old/new pair, so they are independent groups. Which one paints on top is
 * decided by z-index on the group, keyed off these classes.
 */
const exiting = {
  "nav-forward": "leaf",
  "nav-back": "under",
  default: "none",
} as const;

const entering = {
  "nav-forward": "under",
  "nav-back": "leaf",
  default: "none",
} as const;

export function PageTurn({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter={entering} exit={exiting} default="none">
      {/* The wrapper is load-bearing. React names every top-level child of a
          ViewTransition separately, so a page returning several sections turned
          as several independent leaves, each pivoting on its own edge. One
          element means one leaf. */}
      <div>{children}</div>
    </ViewTransition>
  );
}
