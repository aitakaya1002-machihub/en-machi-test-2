export interface StoryFrontmatter {
  title: string;
  slug: string;
  category: string;
  areaCategories: string[];
  date: string;
  excerpt: string;
  image: string;
  tags: string[];
  published: boolean;
  relatedShop: string;
  relatedArea: string;
  author: string;
}

export interface ShopFrontmatter {
  name: string;
  slug: string;
  category: string;
  categories: string[];
  areaCategories: string[];
  area: string;
  address: string;
  hours: string;
  closed: string;
  excerpt: string;
  image: string;
  gallery: string[];
  website: string;
  instagram: string;
  mapUrl: string;
  published: boolean;
  featured: boolean;
}

export interface EventFrontmatter {
  title: string;
  slug: string;
  category: string;
  areaCategories: string[];
  date: string;
  startTime: string;
  endTime: string;
  place: string;
  address: string;
  excerpt: string;
  image: string;
  organizer: string;
  fee: string;
  reservationUrl: string;
  published: boolean;
  featured: boolean;
}

export interface NoticeFrontmatter {
  title: string;
  slug: string;
  category: string;
  areaCategories: string[];
  date: string;
  excerpt: string;
  published: boolean;
}

export interface ContentItem<T> {
  id: string;
  frontmatter: T;
  content: string;
}
