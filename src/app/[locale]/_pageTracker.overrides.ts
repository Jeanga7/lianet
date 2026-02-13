import type { DeliveryStatus } from "./_pageTracker";

type LocaleKey = "fr" | "en";

export interface TrackerOverride {
  area?: string;
  title?: string;
  status?: DeliveryStatus;
  notes?: string;
}

export interface TrackerOverrides {
  hiddenPaths?: string[];
  order?: string[];
  perLocale?: Record<LocaleKey, Partial<Record<string, TrackerOverride>>>;
}

export const trackerOverrides: TrackerOverrides = {
  hiddenPaths: [],
  order: [
    "/",
    "/solutions",
    "/solutions/talent",
    "/solutions/strategy",
    "/solutions/lab",
    "/experts",
    "/about",
    "/contact",
    "/insights",
    "/careers",
    "/case-studies",
  ],
  perLocale: {
    fr: {
      "/": {
        status: "in_progress",
        notes: "Hero + sections principales presentes, polish/navigation en cours.",
      },
      "/solutions": {
        status: "in_progress",
        notes: "Structure modulaire posee, contenu metier a produire.",
      },
      "/contact": {
        status: "in_progress",
        notes: "Utilisee comme destination CTA, formulaire a implementer.",
      },
    },
    en: {
      "/": {
        status: "in_progress",
        notes: "Hero + core sections available, navigation polish in progress.",
      },
      "/solutions": {
        status: "in_progress",
        notes: "Modular structure is ready, business content still missing.",
      },
      "/contact": {
        status: "in_progress",
        notes: "Used as CTA destination, form implementation still pending.",
      },
    },
  },
};
