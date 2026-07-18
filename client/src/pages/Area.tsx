import { useState } from 'react';
import Layout from '@/components/Layout';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHeader from '@/components/PageHeader';
import SectionHeading from '@/components/SectionHeading';
import StoryCard from '@/components/StoryCard';
import ShopCard from '@/components/ShopCard';
import EventCard from '@/components/EventCard';
import Link from '@/components/Link';
import type { AreaPageProps } from '@/lib/page-props';
import { MapPin, RotateCcw } from 'lucide-react';

const categories = [
  { label: '食べる', icon: '🍽' },
  { label: '買う', icon: '🛍' },
  { label: '泊まる', icon: '🏠' },
  { label: 'つくる', icon: '✂' },
  { label: 'めぐる', icon: '👣' },
  { label: '暮らす', icon: '🌿' },
];

export default function Area({
  currentPath,
  stories,
  shops,
  events,
  notices,
}: AreaPageProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredStories = activeCategory
    ? stories.filter((item) => item.frontmatter.areaCategories.includes(activeCategory))
    : [];
  const filteredShops = shops
    .filter((item) =>
      activeCategory ? item.frontmatter.areaCategories.includes(activeCategory) : false,
    )
    .sort(
      (a, b) => (b.frontmatter.featured ? 1 : 0) - (a.frontmatter.featured ? 1 : 0),
    );
  const filteredEvents = activeCategory
    ? events.filter((item) => item.frontmatter.areaCategories.includes(activeCategory))
    : [];
  const filteredNotices = activeCategory
    ? notices.filter((item) => item.frontmatter.areaCategories.includes(activeCategory))
    : [];
  const totalResults =
    filteredStories.length +
    filteredShops.length +
    filteredEvents.length +
    filteredNotices.length;

  return (
    <Layout currentPath={currentPath}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <Breadcrumbs items={[{ label: '円町を知る' }]} />
        <PageHeader
          title="円町を知る"
          description="京都市中京区・上京区にまたがる円町エリア。JR円町駅を中心に、住宅街と商店街が広がる静かなまちです。"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Map Area */}
          <div className="bg-gray-50 rounded-sm p-8 flex flex-col items-center justify-center min-h-[300px]">
            <MapPin size={48} className="text-[#4a5c4a] mb-4" />
            <p className="text-sm text-gray-600 text-center mb-4">
              円町エリアの見どころを<br />マップでご紹介します。
            </p>
            <p className="text-xs text-gray-400 text-center">
              （マップ機能は今後実装予定です）
            </p>
          </div>

          {/* Categories */}
          <div>
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-base font-medium">カテゴリーで探す</h2>
              <button
                type="button"
                onClick={() => setActiveCategory(null)}
                disabled={!activeCategory}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                  activeCategory
                    ? 'border-[#4a5c4a]/20 bg-[#4a5c4a]/5 text-[#4a5c4a] hover:bg-[#4a5c4a]/10 hover:border-[#4a5c4a]/30'
                    : 'border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed'
                }`}
              >
                <RotateCcw size={12} />
                リセット
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat.label}
                  onClick={() => setActiveCategory(cat.label)}
                  className={`flex items-center gap-3 p-4 border rounded-sm transition-colors text-left ${
                    activeCategory === cat.label
                      ? 'border-[#4a5c4a] bg-[#4a5c4a]/5 text-[#4a5c4a]'
                      : 'border-gray-100 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-lg">{cat.icon}</span>
                  <span className="text-sm">{cat.label}</span>
                </button>
              ))}
            </div>
            <p className="mt-4 text-xs text-gray-500 leading-relaxed">
              6つの分類から選ぶと、お店・イベント・ストーリー・お知らせを横断して絞り込めます。
            </p>
          </div>
        </div>

        <section className="mt-12 lg:mt-16">
          <SectionHeading title={activeCategory ? `「${activeCategory}」で探す` : 'カテゴリーを選んで探す'} />
          {activeCategory ? (
            <p className="text-sm text-gray-600 mb-6">
              該当するコンテンツは
              <span className="mx-1 font-medium text-[#4a5c4a]">{totalResults}</span>
              件です。
            </p>
          ) : (
            <div className="rounded-sm border border-dashed border-gray-200 bg-gray-50 px-5 py-8 text-sm text-gray-500">
              上の6分類から気になるテーマを選ぶと、関連するお店・イベント・ストーリー・お知らせが表示されます。
            </div>
          )}

          {activeCategory && totalResults === 0 && (
            <div className="rounded-sm border border-dashed border-gray-200 bg-gray-50 px-5 py-8 text-sm text-gray-500">
              この分類に紐づくコンテンツはまだありません。
            </div>
          )}

          {activeCategory && filteredShops.length > 0 && (
            <section className="mb-12">
              <SectionHeading title="お店" href="/shops" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredShops.map((item) => (
                  <ShopCard key={item.frontmatter.slug} shop={item.frontmatter} />
                ))}
              </div>
            </section>
          )}

          {activeCategory && filteredStories.length > 0 && (
            <section className="mb-12">
              <SectionHeading title="ストーリー" href="/stories" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredStories.map((item) => (
                  <StoryCard key={item.frontmatter.slug} story={item.frontmatter} />
                ))}
              </div>
            </section>
          )}

          {activeCategory && filteredEvents.length > 0 && (
            <section className="mb-12">
              <SectionHeading title="イベント" href="/events" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredEvents.map((item) => (
                  <EventCard key={item.frontmatter.slug} event={item.frontmatter} />
                ))}
              </div>
            </section>
          )}

          {activeCategory && filteredNotices.length > 0 && (
            <section>
              <SectionHeading title="お知らせ" href="/notices" />
              <div className="space-y-4">
                {filteredNotices.map((item) => (
                  <Link
                    key={item.frontmatter.slug}
                    href={`/notices/${item.frontmatter.slug}`}
                    className="block p-4 border border-gray-100 rounded-sm hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-1">
                      <span>{item.frontmatter.date}</span>
                      <span className="px-2 py-0.5 bg-gray-100 rounded-full">
                        {item.frontmatter.category}
                      </span>
                    </div>
                    <h3 className="text-sm font-medium mb-1">{item.frontmatter.title}</h3>
                    {item.frontmatter.excerpt && (
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {item.frontmatter.excerpt}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </section>

        {/* Area Description */}
        <div className="mt-12 max-w-2xl">
          <h2 className="text-base font-medium mb-4">円町エリアについて</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            円町は、京都市の西部に位置する住宅街です。JR嵯峨野線「円町」駅があり、京都駅から約10分。
            観光地としての華やかさはありませんが、地域に根ざした個人店や、静かな暮らしの風景が広がっています。
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            北野天満宮や金閣寺へのアクセスも良く、観光の拠点としても注目されつつあるエリアです。
            en-machiでは、そんな円町の日常にある魅力を発信しています。
          </p>
        </div>
      </div>
    </Layout>
  );
}
