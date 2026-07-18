import { useState } from 'react';
import Layout from '@/components/Layout';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHeader from '@/components/PageHeader';
import FilterTabs from '@/components/FilterTabs';
import ShopCard from '@/components/ShopCard';
import type { ShopsPageProps } from '@/lib/page-props';

export default function Shops({ currentPath, shops: allShops }: ShopsPageProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = Array.from(
    new Set(
      allShops.flatMap((shop) =>
        shop.frontmatter.categories.length > 0
          ? shop.frontmatter.categories
          : [shop.frontmatter.category],
      ),
    ),
  );
  const filtered = activeCategory === 'all'
    ? allShops
    : allShops.filter((shop) =>
        shop.frontmatter.categories.length > 0
          ? shop.frontmatter.categories.includes(activeCategory)
          : shop.frontmatter.category === activeCategory,
      );

  // Sort featured first
  const sorted = [...filtered].sort((a, b) => (b.frontmatter.featured ? 1 : 0) - (a.frontmatter.featured ? 1 : 0));

  return (
    <Layout currentPath={currentPath}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <Breadcrumbs items={[{ label: 'お店を探す' }]} />
        <PageHeader
          title="お店を探す"
          description="円町エリアのお店をご紹介します。"
        />
        <FilterTabs categories={categories} activeCategory={activeCategory} onSelect={setActiveCategory} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {sorted.map((item) => (
            <ShopCard key={item.frontmatter.slug} shop={item.frontmatter} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
