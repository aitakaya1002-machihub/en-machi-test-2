import type { APIRoute } from 'astro';
import {
  getAllEvents,
  getAllNotices,
  getAllShops,
  getAllStories,
} from '../lib/content';

interface SitemapEntry {
  path: string;
  lastmod?: string;
}

function toIsoDate(value?: string) {
  if (!value) {
    return undefined;
  }

  const normalizedValue = /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? `${value}T00:00:00+09:00`
    : value;
  const parsed = Date.parse(normalizedValue);

  if (Number.isNaN(parsed)) {
    return undefined;
  }

  return new Date(parsed).toISOString();
}

function renderUrl(entry: SitemapEntry, site: URL) {
  const url = new URL(entry.path, site).toString();

  return [
    '<url>',
    `<loc>${url}</loc>`,
    entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : '',
    '</url>',
  ]
    .filter(Boolean)
    .join('');
}

export const GET: APIRoute = async ({ site, url }) => {
  const baseSite = site ?? new URL(url.origin);
  const [stories, shops, events, notices] = await Promise.all([
    getAllStories(),
    getAllShops(),
    getAllEvents(),
    getAllNotices(),
  ]);

  const staticRoutes: SitemapEntry[] = [
    { path: '/' },
    { path: '/area' },
    { path: '/stories' },
    { path: '/shops' },
    { path: '/events' },
    { path: '/notices' },
    { path: '/contact' },
    { path: '/about' },
    { path: '/privacy' },
  ];

  const dynamicRoutes: SitemapEntry[] = [
    ...stories.map((story) => ({
      path: `/stories/${story.frontmatter.slug}`,
      lastmod: toIsoDate(story.frontmatter.date),
    })),
    ...shops.map((shop) => ({
      path: `/shops/${shop.frontmatter.slug}`,
    })),
    ...events.map((event) => ({
      path: `/events/${event.frontmatter.slug}`,
      lastmod: toIsoDate(event.frontmatter.date),
    })),
    ...notices.map((notice) => ({
      path: `/notices/${notice.frontmatter.slug}`,
      lastmod: toIsoDate(notice.frontmatter.date),
    })),
  ];

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...[...staticRoutes, ...dynamicRoutes].map((entry) => renderUrl(entry, baseSite)),
    '</urlset>',
  ].join('');

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
