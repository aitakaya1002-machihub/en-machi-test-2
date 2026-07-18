import fm from 'front-matter';
import type {
  ContentItem,
  EventFrontmatter,
  NoticeFrontmatter,
  ShopFrontmatter,
  StoryFrontmatter,
} from '../../client/src/lib/content-types';

type CollectionName = 'stories' | 'shops' | 'events' | 'notices';
type RawContent = Record<string, unknown> & { id?: string };

interface MicrocmsListResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}

const storyFiles = import.meta.glob('../../client/src/content/stories/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const shopFiles = import.meta.glob('../../client/src/content/shops/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const eventFiles = import.meta.glob('../../client/src/content/events/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const noticeFiles = import.meta.glob('../../client/src/content/notices/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function normalizeMicrocmsServiceDomain(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return undefined;
  }

  try {
    const url = new URL(trimmed);
    return url.hostname.replace(/\.microcms\.io$/, '');
  } catch {
    return trimmed.replace(/^https?:\/\//, '').replace(/\.microcms\.io$/, '').replace(/\/$/, '');
  }
}

const microcmsServiceDomain = normalizeMicrocmsServiceDomain(
  import.meta.env.MICROCMS_SERVICE_DOMAIN,
);
const microcmsApiKey = import.meta.env.MICROCMS_API_KEY;
const hasMicrocmsConfig = Boolean(microcmsServiceDomain && microcmsApiKey);

function asString(value: unknown, fallback = ''): string {
  if (typeof value === 'string') {
    return value.trim();
  }

  if (typeof value === 'number') {
    return String(value);
  }

  return fallback;
}

function asBoolean(value: unknown, fallback = false): boolean {
  return typeof value === 'boolean' ? value : fallback;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((entry) => {
      if (typeof entry === 'string') {
        return entry.trim();
      }

      if (entry && typeof entry === 'object') {
        const record = entry as Record<string, unknown>;
        return asString(record.name ?? record.label ?? record.title ?? record.url);
      }

      return '';
    })
    .filter(Boolean);
}

function asStringList(value: unknown, fallback: string[] = []): string[] {
  if (Array.isArray(value)) {
    return asStringArray(value);
  }

  const singleValue = asString(value);
  return singleValue ? [singleValue] : fallback;
}

function asMediaUrl(value: unknown, fallback = ''): string {
  if (typeof value === 'string') {
    return value;
  }

  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    if (typeof record.url === 'string') {
      return record.url;
    }
  }

  return fallback;
}

function asMediaUrlArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((entry) => asMediaUrl(entry)).filter(Boolean);
}

function normalizeDate(value: unknown): string {
  const date = asString(value);
  if (!date) {
    return '';
  }

  return date.includes('T') ? date.slice(0, 10) : date;
}

function normalizeTime(value: unknown): string {
  const time = asString(value);
  if (/^\d{2}:\d{2}:\d{2}/.test(time)) {
    return time.slice(0, 5);
  }

  return time;
}

function getSlug(entry: RawContent): string {
  return asString(entry.slug, asString(entry.id, 'untitled'));
}

function getContentBody(entry: RawContent): string {
  return asString(entry.content ?? entry.body ?? entry.description);
}

function parseMarkdownFiles<T>(
  files: Record<string, string>,
  normalize: (entry: RawContent) => ContentItem<T>,
): ContentItem<T>[] {
  return Object.values(files).map((raw) => {
    const { attributes, body } = fm<Record<string, unknown>>(raw);
    return normalize({ ...(attributes as RawContent), content: body });
  });
}

async function fetchMicrocmsList(endpoint: CollectionName): Promise<RawContent[]> {
  if (!microcmsServiceDomain || !microcmsApiKey) {
    return [];
  }

  const contents: RawContent[] = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const url = new URL(`https://${microcmsServiceDomain}.microcms.io/api/v1/${endpoint}`);
    url.searchParams.set('limit', String(limit));
    url.searchParams.set('offset', String(offset));

    const response = await fetch(url, {
      headers: {
        'X-MICROCMS-API-KEY': microcmsApiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`microCMS request failed for "${endpoint}" (${response.status})`);
    }

    const data = (await response.json()) as MicrocmsListResponse<RawContent>;
    contents.push(...data.contents);

    offset += data.limit;
    if (offset >= data.totalCount) {
      return contents;
    }
  }
}

async function loadCollection<T>(
  endpoint: CollectionName,
  files: Record<string, string>,
  normalize: (entry: RawContent) => ContentItem<T>,
): Promise<ContentItem<T>[]> {
  if (hasMicrocmsConfig) {
    const contents = await fetchMicrocmsList(endpoint);
    return contents.map(normalize);
  }

  return parseMarkdownFiles(files, normalize);
}

function getTimestamp(date: string): number {
  const timestamp = Date.parse(date);
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

function normalizeStory(entry: RawContent): ContentItem<StoryFrontmatter> {
  const slug = getSlug(entry);

  return {
    id: asString(entry.id, slug),
    frontmatter: {
      title: asString(entry.title, 'タイトル未設定'),
      slug,
      category: asString(entry.category, 'ストーリー'),
      areaCategories: asStringList(entry.areaCategories),
      date: normalizeDate(entry.date),
      excerpt: asString(entry.excerpt),
      image: asMediaUrl(entry.image),
      tags: asStringArray(entry.tags),
      published: asBoolean(entry.published, true),
      relatedShop: asString(entry.relatedShop),
      relatedArea: asString(entry.relatedArea),
      author: asString(entry.author),
    },
    content: getContentBody(entry),
  };
}

function normalizeShop(entry: RawContent): ContentItem<ShopFrontmatter> {
  const slug = getSlug(entry);
  const categories = asStringList(entry.category);

  return {
    id: asString(entry.id, slug),
    frontmatter: {
      name: asString(entry.name, '店舗名未設定'),
      slug,
      category: categories[0] ?? '未分類',
      categories,
      areaCategories: asStringList(entry.areaCategories),
      area: asString(entry.area, '円町'),
      address: asString(entry.address),
      hours: asString(entry.hours),
      closed: asString(entry.closed),
      excerpt: asString(entry.excerpt),
      image: asMediaUrl(entry.image),
      gallery: asMediaUrlArray(entry.gallery),
      website: asString(entry.website),
      instagram: asString(entry.instagram),
      mapUrl: asString(entry.mapUrl),
      published: asBoolean(entry.published, true),
      featured: asBoolean(entry.featured, false),
    },
    content: getContentBody(entry),
  };
}

function normalizeEvent(entry: RawContent): ContentItem<EventFrontmatter> {
  const slug = getSlug(entry);

  return {
    id: asString(entry.id, slug),
    frontmatter: {
      title: asString(entry.title, 'イベント名未設定'),
      slug,
      category: asString(entry.category, 'イベント'),
      areaCategories: asStringList(entry.areaCategories),
      date: normalizeDate(entry.date),
      startTime: normalizeTime(entry.startTime),
      endTime: normalizeTime(entry.endTime),
      place: asString(entry.place),
      address: asString(entry.address),
      excerpt: asString(entry.excerpt),
      image: asMediaUrl(entry.image),
      organizer: asString(entry.organizer),
      fee: asString(entry.fee),
      reservationUrl: asString(entry.reservationUrl),
      published: asBoolean(entry.published, true),
      featured: asBoolean(entry.featured, false),
    },
    content: getContentBody(entry),
  };
}

function normalizeNotice(entry: RawContent): ContentItem<NoticeFrontmatter> {
  const slug = getSlug(entry);

  return {
    id: asString(entry.id, slug),
    frontmatter: {
      title: asString(entry.title, 'お知らせ'),
      slug,
      category: asString(entry.category, 'お知らせ'),
      areaCategories: asStringList(entry.areaCategories),
      date: normalizeDate(entry.date),
      excerpt: asString(entry.excerpt),
      published: asBoolean(entry.published, true),
    },
    content: getContentBody(entry),
  };
}

export async function getAllStories(): Promise<ContentItem<StoryFrontmatter>[]> {
  const stories = await loadCollection('stories', storyFiles, normalizeStory);
  return stories.sort(
    (a, b) => getTimestamp(b.frontmatter.date) - getTimestamp(a.frontmatter.date),
  );
}

export async function getAllShops(): Promise<ContentItem<ShopFrontmatter>[]> {
  return loadCollection('shops', shopFiles, normalizeShop);
}

export async function getFeaturedShops(): Promise<ContentItem<ShopFrontmatter>[]> {
  const shops = await getAllShops();
  return shops.filter((shop) => shop.frontmatter.featured);
}

export async function getAllEvents(): Promise<ContentItem<EventFrontmatter>[]> {
  const events = await loadCollection('events', eventFiles, normalizeEvent);
  return events.sort(
    (a, b) => getTimestamp(a.frontmatter.date) - getTimestamp(b.frontmatter.date),
  );
}

export async function getAllNotices(): Promise<ContentItem<NoticeFrontmatter>[]> {
  const notices = await loadCollection('notices', noticeFiles, normalizeNotice);
  return notices.sort(
    (a, b) => getTimestamp(b.frontmatter.date) - getTimestamp(a.frontmatter.date),
  );
}
