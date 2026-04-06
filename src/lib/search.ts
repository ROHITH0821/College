import type { SearchCategory, SearchItem } from "@/data/search-index";

const CATEGORY_ORDER: SearchCategory[] = [
  "page",
  "course",
  "faculty",
  "announcement",
];

const CATEGORY_LABEL: Record<SearchCategory, string> = {
  page: "Pages",
  course: "Courses",
  faculty: "Faculty",
  announcement: "Announcements",
};

export function getCategoryLabel(cat: SearchCategory): string {
  return CATEGORY_LABEL[cat];
}

export function searchItems(
  items: SearchItem[],
  query: string,
  categoryFilter: SearchCategory | "all"
): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const pool =
    categoryFilter === "all"
      ? items
      : items.filter((i) => i.category === categoryFilter);

  const tokens = q.split(/\s+/).filter(Boolean);

  const scored = pool
    .map((item) => {
      const blob = `${item.title} ${item.description} ${item.keywords.join(" ")}`.toLowerCase();
      let score = 0;
      const titleLower = item.title.toLowerCase();

      if (titleLower.includes(q)) score += 12;
      for (const t of tokens) {
        if (!t) continue;
        if (titleLower.includes(t)) score += 8;
        if (blob.includes(t)) score += 3;
        if (item.keywords.some((k) => k.toLowerCase().startsWith(t))) score += 5;
      }
      if (item.href.toLowerCase().includes(q.replace(/\s+/g, ""))) score += 2;

      return { item, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return CATEGORY_ORDER.indexOf(a.item.category) - CATEGORY_ORDER.indexOf(b.item.category);
    })
    .map((x) => x.item);

  return scored.slice(0, 40);
}

export function groupByCategory(items: SearchItem[]): Map<SearchCategory, SearchItem[]> {
  const map = new Map<SearchCategory, SearchItem[]>();
  for (const cat of CATEGORY_ORDER) {
    map.set(cat, []);
  }
  for (const item of items) {
    map.get(item.category)!.push(item);
  }
  return map;
}

export { CATEGORY_ORDER };
