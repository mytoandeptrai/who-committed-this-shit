import { isProductionEnv, siteConfig } from '@/config/site';
import { ROUTES } from '@/utils/routes';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!isProductionEnv) return [];

  return Object.values(ROUTES).map((path) => ({
    url: `${siteConfig.canonicalUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === ROUTES.HOME ? 1 : 0.8,
  }));
}
