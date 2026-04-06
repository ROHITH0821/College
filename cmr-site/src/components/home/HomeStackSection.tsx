import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Order from top — higher index draws on top of previous stickies. */
  stackIndex: number;
  /** First block under the hero gets the lifted card radius + shadow. */
  isFirst?: boolean;
  className?: string;
};

/**
 * Sticky stacking: each section pins below the shell until the next scrolls over it
 * (classic “cards stack” scroll pattern).
 */
export function HomeStackSection({ children, stackIndex, isFirst, className = "" }: Props) {
  return (
    <div
      className={`sticky isolate flex min-h-[100svh] scroll-mt-[var(--home-sticky-top)] flex-col ${isFirst ? "shadow-[0_-16px_48px_rgba(31,58,95,0.12)]" : ""} ${className}`}
      style={{
        top: "var(--home-sticky-top)",
        zIndex: 10 + stackIndex,
      }}
    >
      <div className="flex min-h-[100svh] w-full flex-col">{children}</div>
    </div>
  );
}
