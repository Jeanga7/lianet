import { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { sitemapRoutes } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lianet.com";
  const lastModified = new Date();

  return locales.flatMap((locale) =>
    sitemapRoutes.map((route) => {
      const localizedPath = route === "/" ? `/${locale}` : `/${locale}${route}`;
      return {
        url: `${baseUrl}${localizedPath}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: route === "/" ? 1 : 0.8,
      };
    })
  );
}
