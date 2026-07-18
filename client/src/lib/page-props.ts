import type {
  ContentItem,
  EventFrontmatter,
  NoticeFrontmatter,
  ShopFrontmatter,
  StoryFrontmatter,
} from '@/lib/content-types';

export interface RoutedPageProps {
  currentPath?: string;
}

export interface HomePageProps extends RoutedPageProps {
  stories: ContentItem<StoryFrontmatter>[];
  shops: ContentItem<ShopFrontmatter>[];
  events: ContentItem<EventFrontmatter>[];
  notices: ContentItem<NoticeFrontmatter>[];
}

export interface AreaPageProps extends RoutedPageProps {
  stories: ContentItem<StoryFrontmatter>[];
  shops: ContentItem<ShopFrontmatter>[];
  events: ContentItem<EventFrontmatter>[];
  notices: ContentItem<NoticeFrontmatter>[];
}

export interface StoriesPageProps extends RoutedPageProps {
  stories: ContentItem<StoryFrontmatter>[];
}

export interface StoryDetailPageProps extends RoutedPageProps {
  story?: ContentItem<StoryFrontmatter>;
}

export interface ShopsPageProps extends RoutedPageProps {
  shops: ContentItem<ShopFrontmatter>[];
}

export interface ShopDetailPageProps extends RoutedPageProps {
  shop?: ContentItem<ShopFrontmatter>;
}

export interface EventsPageProps extends RoutedPageProps {
  events: ContentItem<EventFrontmatter>[];
}

export interface EventDetailPageProps extends RoutedPageProps {
  event?: ContentItem<EventFrontmatter>;
}

export interface NoticesPageProps extends RoutedPageProps {
  notices: ContentItem<NoticeFrontmatter>[];
}

export interface NoticeDetailPageProps extends RoutedPageProps {
  notice?: ContentItem<NoticeFrontmatter>;
}
