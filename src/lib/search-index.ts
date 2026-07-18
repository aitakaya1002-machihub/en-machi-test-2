import type { SearchItem } from '../../client/src/lib/search';
import {
  getAllEvents,
  getAllNotices,
  getAllShops,
  getAllStories,
} from './content';

const staticItems: SearchItem[] = [
  {
    title: 'ホーム',
    href: '/',
    section: '固定ページ',
    description: '円町の日常と、人と、滞在をつなぐトップページです。',
    keywords: ['top', 'home', 'en-machi'],
  },
  {
    title: '円町を知る',
    href: '/area',
    section: '固定ページ',
    description: '円町エリアの紹介と見どころをまとめたページです。',
    keywords: ['area', 'map', '円町'],
  },
  {
    title: 'お問い合わせ',
    href: '/contact',
    section: '固定ページ',
    description: '掲載に関する相談や取材依頼などのお問い合わせフォームです。',
    keywords: ['contact', 'form', '取材', '掲載'],
  },
  {
    title: 'プライバシーポリシー',
    href: '/privacy',
    section: '固定ページ',
    description: '個人情報の取り扱い方針についてご案内しています。',
    keywords: ['privacy', 'policy'],
  },
  {
    title: 'machi-hubについて',
    href: '/machi-hub',
    section: '固定ページ',
    description: '運営会社 machi-hub についてご紹介します。',
    keywords: ['about', 'company', '運営'],
  },
];

let cachedSearchItems: SearchItem[] | undefined;

export async function getSearchItems(): Promise<SearchItem[]> {
  if (cachedSearchItems) {
    return cachedSearchItems;
  }

  const [stories, shops, events, notices] = await Promise.all([
    getAllStories(),
    getAllShops(),
    getAllEvents(),
    getAllNotices(),
  ]);

  cachedSearchItems = [
    ...staticItems,
    ...stories.map(({ frontmatter }) => ({
      title: frontmatter.title,
      href: `/stories/${frontmatter.slug}`,
      section: 'ストーリー',
      description: frontmatter.excerpt,
      keywords: [
        frontmatter.category,
        ...frontmatter.areaCategories,
        ...frontmatter.tags,
        frontmatter.author,
      ],
    })),
    ...shops.map(({ frontmatter }) => ({
      title: frontmatter.name,
      href: `/shops/${frontmatter.slug}`,
      section: 'お店',
      description: frontmatter.excerpt,
      keywords: [
        ...frontmatter.categories,
        ...frontmatter.areaCategories,
        frontmatter.area,
        frontmatter.address,
        frontmatter.hours,
      ],
    })),
    ...events.map(({ frontmatter }) => ({
      title: frontmatter.title,
      href: `/events/${frontmatter.slug}`,
      section: 'イベント',
      description: frontmatter.excerpt,
      keywords: [
        frontmatter.category,
        ...frontmatter.areaCategories,
        frontmatter.place,
        frontmatter.address,
        frontmatter.organizer,
      ],
    })),
    ...notices.map(({ frontmatter }) => ({
      title: frontmatter.title,
      href: `/notices/${frontmatter.slug}`,
      section: 'お知らせ',
      description: frontmatter.excerpt,
      keywords: [frontmatter.category, ...frontmatter.areaCategories, frontmatter.date],
    })),
  ];

  return cachedSearchItems;
}
