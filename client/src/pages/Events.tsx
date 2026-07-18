import { useState } from 'react';
import Layout from '@/components/Layout';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHeader from '@/components/PageHeader';
import FilterTabs from '@/components/FilterTabs';
import EventCard from '@/components/EventCard';
import type { EventsPageProps } from '@/lib/page-props';

export default function Events({ currentPath, events: allEvents }: EventsPageProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = Array.from(new Set(allEvents.map((e) => e.frontmatter.category)));
  const filtered = activeCategory === 'all'
    ? allEvents
    : allEvents.filter((e) => e.frontmatter.category === activeCategory);

  return (
    <Layout currentPath={currentPath}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <Breadcrumbs items={[{ label: 'イベント' }]} />
        <PageHeader
          title="イベント"
          description="円町エリアで開催されるイベント情報です。"
        />
        <FilterTabs categories={categories} activeCategory={activeCategory} onSelect={setActiveCategory} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filtered.map((item) => (
            <EventCard key={item.frontmatter.slug} event={item.frontmatter} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
