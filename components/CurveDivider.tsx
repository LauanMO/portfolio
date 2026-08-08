export function CurveDivider({
  flip = false,
  className = "",
  fill = "var(--paper)",
}: {
  flip?: boolean;
  className?: string;
  fill?: string;
}) {
  return (
    <div aria-hidden="true" className={`pointer-events-none w-full leading-none ${className}`}>
      {/* preserveAspectRatio="none" keeps the arc at a fixed height instead of
          growing absurdly tall on wide screens. */}
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className={`block h-[60px] w-full sm:h-[90px] ${flip ? "rotate-180" : ""}`}
        role="presentation"
        focusable="false"
      >
        <path d="M0 90 C 360 0, 1080 0, 1440 90 L1440 90 L0 90 Z" fill={fill} />
      </svg>
    </div>
  );
}
