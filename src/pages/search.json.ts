import type { APIRoute } from 'astro';
import { getSearchItems } from '../lib/search-index';

export const prerender = true;

export const GET: APIRoute = async () => {
  const items = await getSearchItems();

  return new Response(JSON.stringify(items), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  });
};
