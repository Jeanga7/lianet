export const appRoutes = {
  home: "/",
  solutions: "/solutions",
  solutionsTalent: "/solutions/talent",
  solutionsStrategy: "/solutions/strategy",
  solutionsLab: "/solutions/lab",
  experts: "/experts",
  about: "/about",
  contact: "/contact",
  insights: "/insights",
  careers: "/careers",
  caseStudies: "/case-studies",
  pageTracker: "/page-tracker",
} as const;

export const mainNavigationRoutes = [
  { path: appRoutes.solutions, labelKey: "navigation.solutions" },
  { path: appRoutes.experts, labelKey: "navigation.experts" },
  { path: appRoutes.about, labelKey: "navigation.about" },
  { path: appRoutes.contact, labelKey: "navigation.contact" },
] as const;

export const resourceNavigationRoutes = [
  { path: appRoutes.insights, labelKey: "fullMenu.resources.insights", suffixKey: undefined },
  { path: appRoutes.careers, labelKey: "fullMenu.resources.careers", suffixKey: "fullMenu.resources.careersSuffix" },
  { path: appRoutes.caseStudies, labelKey: "fullMenu.resources.caseStudies", suffixKey: "fullMenu.resources.caseStudiesSuffix" },
] as const;

export const sitemapRoutes = [
  appRoutes.home,
  appRoutes.solutions,
  appRoutes.solutionsTalent,
  appRoutes.solutionsStrategy,
  appRoutes.solutionsLab,
  appRoutes.experts,
  appRoutes.about,
  appRoutes.contact,
  appRoutes.insights,
  appRoutes.careers,
  appRoutes.caseStudies,
  appRoutes.pageTracker,
] as const;
