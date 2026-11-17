import Image from "next/image";
import type { CSSProperties } from "react";
import type { Project } from "@/content/projects";
import { asset } from "@/lib/asset";

type Shot = NonNullable<Project["image"]>;

/**
 * A project's real screenshot, set in a browser window (desktop apps) or a
 * phone (mobile apps) on a field of its own colour. The frame bleeds off the
 * right and bottom edges, so the screen reads as a crop of something larger.
 */
export function ProjectShot({
  image,
  demo,
  preload = false,
  className = "",
}: {
  image: Shot;
  demo?: string;
  preload?: boolean;
  className?: string;
}) {
  const style = { background: image.ground } as CSSProperties;

  if (image.frame === "phone") {
    return (
      <div className={`relative overflow-hidden ${className}`} style={style}>
        <div className="shot-lift absolute left-1/2 top-[12%] w-[34%] min-w-36 -translate-x-1/2 rounded-[1.75rem] border-[6px] border-ink bg-ink p-0.5">
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-2 z-10 h-1.5 w-12 -translate-x-1/2 rounded-full bg-ink"
          />
          <Image
            src={asset(image.src)}
            width={image.width}
            height={image.height}
            alt={image.alt}
            preload={preload}
            className="w-full rounded-[1.25rem]"
          />
        </div>
      </div>
    );
  }

  // The address bar shows where the project really lives, when it lives anywhere.
  const host = demo ? new URL(demo).host + new URL(demo).pathname.replace(/\/$/, "") : null;

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      <div className="shot-lift absolute left-[7%] top-[11%] w-[112%] overflow-hidden rounded-tl-xl border border-white/10 bg-ink">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
          <span aria-hidden="true" className="size-2.5 rounded-full bg-red-400/80" />
          <span aria-hidden="true" className="size-2.5 rounded-full bg-amber-400/80" />
          <span aria-hidden="true" className="size-2.5 rounded-full bg-emerald-400/80" />
          {host && (
            <span className="ml-3 truncate rounded-md bg-white/10 px-2.5 py-0.5 text-[13px] text-ink-muted">
              {host}
            </span>
          )}
        </div>
        <Image
          src={asset(image.src)}
          width={image.width}
          height={image.height}
          alt={image.alt}
          preload={preload}
          className="w-full"
        />
      </div>
    </div>
  );
}
