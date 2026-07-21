import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site, url }) => {
  const baseSite = site ?? new URL(url.origin);
  const sitemapUrl = new URL('/sitemap.xml', baseSite).toString();

  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /contact/thanks',
    '',
    `Sitemap: ${sitemapUrl}`,
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
