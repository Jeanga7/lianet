import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

export const getLocaleFromPathname = (pathname: string): Locale => {
  const firstSegment = pathname.split("/")[1];
  if (isLocale(firstSegment)) return firstSegment;
  return defaultLocale;
};

export const localizePathname = (pathname: string, targetLocale: Locale): string => {
  const segments = pathname.split("/");
  const first = segments[1];

  if (isLocale(first)) {
    segments[1] = targetLocale;
    return segments.join("/") || `/${targetLocale}`;
  }

  if (pathname === "/") return `/${targetLocale}`;
  return `/${targetLocale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
};
