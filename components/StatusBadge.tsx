import type { Project } from "@/content/projects";

const LABELS: Record<Project["status"], string> = {
  shipped: "Shipped",
  "in-progress": "In progress",
  prototype: "Prototype",
};

const STYLES: Record<Project["status"], { paper: string; ink: string }> = {
  shipped: {
    paper: "border-emerald-600/25 bg-emerald-600/10 text-emerald-700",
    ink: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  },
  "in-progress": {
    paper: "border-sky-600/25 bg-sky-600/10 text-sky-700",
    ink: "border-sky-400/30 bg-sky-400/10 text-sky-300",
  },
  prototype: {
    paper: "border-amber-600/25 bg-amber-600/10 text-amber-700",
    ink: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  },
};

export function StatusBadge({
  status,
  tone = "paper",
}: {
  status: Project["status"];
  tone?: "paper" | "ink";
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-3 py-0.5 text-xs font-medium ${STYLES[status][tone]}`}
    >
      {LABELS[status]}
    </span>
  );
}
