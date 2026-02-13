import type { Locale } from "@/i18n/config";
import { appRoutes } from "@/lib/routes";
import { trackerOverrides, type TrackerOverride } from "./_pageTracker.overrides";

export type DeliveryStatus = "todo" | "in_progress" | "done";

export interface PageTrackerItem {
  path: string;
  area: string;
  title: string;
  status: DeliveryStatus;
  notes: string;
}

const localeMap = {
  fr: {
    area: {
      core: "Core",
      solutions: "Solutions",
      company: "Company",
      content: "Content",
    },
    notesAuto: "Scaffold detecte automatiquement. Completer les blocs metier.",
    titles: {
      home: "Accueil",
      solutions: "Solutions",
      solutionsTalent: "Talent Solutions",
      solutionsStrategy: "Digital Strategy",
      solutionsLab: "Innovation Lab",
      experts: "Experts",
      about: "A propos",
      contact: "Contact",
      insights: "Insights",
      careers: "Careers",
      caseStudies: "Case Studies",
    },
  },
  en: {
    area: {
      core: "Core",
      solutions: "Solutions",
      company: "Company",
      content: "Content",
    },
    notesAuto: "Scaffold detected automatically. Complete business sections.",
    titles: {
      home: "Home",
      solutions: "Solutions",
      solutionsTalent: "Talent Solutions",
      solutionsStrategy: "Digital Strategy",
      solutionsLab: "Innovation Lab",
      experts: "Experts",
      about: "About",
      contact: "Contact",
      insights: "Insights",
      careers: "Careers",
      caseStudies: "Case Studies",
    },
  },
} as const;

type RouteKey = keyof typeof appRoutes;
type TrackableRouteKey = Exclude<RouteKey, "pageTracker">;

const trackableEntries = (Object.entries(appRoutes) as Array<[RouteKey, string]>)
  .filter(([key]) => key !== "pageTracker") as Array<[TrackableRouteKey, string]>;

const inferArea = (path: string, locale: Locale) => {
  const labels = localeMap[locale].area;
  if (path === "/") return labels.core;
  if (path.startsWith("/solutions")) return labels.solutions;
  if (path === "/about" || path === "/contact" || path === "/experts") return labels.company;
  return labels.content;
};

const buildBaseItem = (key: TrackableRouteKey, path: string, locale: Locale): PageTrackerItem => ({
  path,
  area: inferArea(path, locale),
  title: localeMap[locale].titles[key],
  status: "todo",
  notes: localeMap[locale].notesAuto,
});

const applyOverride = (item: PageTrackerItem, override?: TrackerOverride): PageTrackerItem => {
  if (!override) return item;
  return {
    ...item,
    area: override.area ?? item.area,
    title: override.title ?? item.title,
    status: override.status ?? item.status,
    notes: override.notes ?? item.notes,
  };
};

const sortByConfiguredOrder = (rows: PageTrackerItem[]) => {
  const order = trackerOverrides.order ?? [];
  const ranked = new Map(order.map((path, index) => [path, index]));
  return [...rows].sort((a, b) => {
    const rankA = ranked.has(a.path) ? (ranked.get(a.path) as number) : Number.MAX_SAFE_INTEGER;
    const rankB = ranked.has(b.path) ? (ranked.get(b.path) as number) : Number.MAX_SAFE_INTEGER;
    if (rankA !== rankB) return rankA - rankB;
    return a.path.localeCompare(b.path);
  });
};

export const getPageTracker = (locale: Locale): ReadonlyArray<PageTrackerItem> => {
  const hidden = new Set(trackerOverrides.hiddenPaths ?? []);
  const perLocaleOverrides = trackerOverrides.perLocale?.[locale] ?? {};

  const rows = trackableEntries
    .filter(([, path]) => !hidden.has(path))
    .map(([key, path]) => applyOverride(buildBaseItem(key, path, locale), perLocaleOverrides[path]));

  return sortByConfiguredOrder(rows);
};
