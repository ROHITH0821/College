type Props = {
  hero: React.ReactNode;
  children: React.ReactNode;
};

/**
 * Pins the hero to the viewport while the rest of the page scrolls up over it.
 * Hero is full viewport width (z-0) so the image runs under the fixed sidebar (z-50);
 * previously [left:var(--sidebar-offset)] left a permanent light strip when the sidebar
 * was still fading in after the intro.
 */
export function HomeScrollLayout({ hero, children }: Props) {
  return (
    <div className="relative min-w-0">
      <div className="fixed inset-x-0 top-0 z-0 h-[100svh] min-w-0 overflow-hidden">
        {hero}
      </div>
      <div className="relative z-10 mt-[100svh] min-h-min bg-transparent">
        {children}
      </div>
    </div>
  );
}
