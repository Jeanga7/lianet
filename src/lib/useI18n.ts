"use client";

import { usePathname } from "next/navigation";
import { messages } from "@/i18n/messages";
import type { Locale } from "@/i18n/config";
import { getLocaleFromPathname } from "@/lib/locale";

const getValueByPath = (obj: unknown, path: string): string => {
  const value = path.split(".").reduce<unknown>((acc, key) => {
    if (typeof acc === "object" && acc !== null && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
  return typeof value === "string" ? value : path;
};

export const useI18n = () => {
  const pathname = usePathname() || "/";
  const locale = getLocaleFromPathname(pathname) as Locale;
  const dictionary = messages[locale];

  const t = (path: string): string => getValueByPath(dictionary, path);
  const tArray = (path: string): string[] => {
    const value = path.split(".").reduce<unknown>((acc, key) => {
      if (typeof acc === "object" && acc !== null && key in acc) {
        return (acc as Record<string, unknown>)[key];
      }
      return undefined;
    }, dictionary);
    return Array.isArray(value) ? (value as string[]) : [];
  };

  return {
    locale,
    dictionary,
    t,
    tArray,
  };
};

export type { Locale };
