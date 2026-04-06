/** `id` on the homepage hero (`HeroSection`) — first screen, above Trust & Recognition. */
export const HOME_HERO_SECTION_ID = "hero";

/**
 * Scroll the document to the top of the homepage and clear any hash.
 * Uses `window.scrollTo` because the hero lives in a fixed layer (`HomeScrollLayout`), so
 * `scrollIntoView` on `#hero` does not reliably move the main scroll position.
 */
export function scrollToHomeHeroTop() {
  if (typeof window === "undefined") return;
  window.history.replaceState(null, "", "/");
  const prefersReduced =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({
    top: 0,
    behavior: prefersReduced ? "auto" : "smooth",
  });
}
