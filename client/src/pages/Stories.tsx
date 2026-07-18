import { useState } from 'react';
import Layout from '@/components/Layout';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHeader from '@/components/PageHeader';
import FilterTabs from '@/components/FilterTabs';
import StoryCard from '@/components/StoryCard';
import type { StoriesPageProps } from '@/lib/page-props';

export default function Stories({ currentPath, stories: allStories }: StoriesPageProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = Array.from(new Set(allStories.map((s) => s.frontmatter.category)));
  const filtered = activeCategory === 'all'
    ? allStories
    : allStories.filter((s) => s.frontmatter.category === activeCategory);

  return (
    <Layout currentPath={currentPath}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <Breadcrumbs items={[{ label: 'ストーリー' }]} />
        <PageHeader
          title="ローカルストーリー"
          description="円町の人・店・場所の背景にある物語を紹介します。"
        />
        <FilterTabs categories={categories} activeCategory={activeCategory} onSelect={setActiveCategory} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filtered.map((item) => (
            <StoryCard key={item.frontmatter.slug} story={item.frontmatter} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
