export const appRoutes = {
  home: "/",
  solutions: "/solutions",
  network: "/network",
  about: "/about",
  contact: "/contact",
  insights: "/insights",
  caseStudies: "/case-studies",
} as const;

export const mainNavigationRoutes = [
  { path: appRoutes.solutions, labelKey: "navigation.solutions" },
  { path: appRoutes.network, labelKey: "navigation.network" },
  { path: appRoutes.about, labelKey: "navigation.about" },
  { path: appRoutes.contact, labelKey: "navigation.contact" },
] as const;

export const resourceNavigationRoutes = [
  { path: appRoutes.insights, labelKey: "fullMenu.resources.insights", suffixKey: undefined },
  { path: appRoutes.caseStudies, labelKey: "fullMenu.resources.caseStudies", suffixKey: "fullMenu.resources.caseStudiesSuffix" },
] as const;

export const sitemapRoutes = [
  appRoutes.home,
  appRoutes.solutions,
  appRoutes.network,
  appRoutes.about,
  appRoutes.contact,
  appRoutes.insights,
  appRoutes.caseStudies,
] as const;
