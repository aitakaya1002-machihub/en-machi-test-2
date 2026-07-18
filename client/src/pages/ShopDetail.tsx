import Layout from '@/components/Layout';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from '@/components/Link';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import type { ShopDetailPageProps } from '@/lib/page-props';
import { ArrowLeft, Clock, MapPin, Globe } from 'lucide-react';

export default function ShopDetail({ currentPath, shop }: ShopDetailPageProps) {
  if (!shop) {
    return (
      <Layout currentPath={currentPath}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-gray-500">店舗情報が見つかりませんでした。</p>
          <Link href="/shops" className="text-sm text-[#4a5c4a] mt-4 inline-block">お店一覧へ戻る</Link>
        </div>
      </Layout>
    );
  }

  const { frontmatter, content } = shop;
  const categories = frontmatter.categories.length > 0 ? frontmatter.categories : [frontmatter.category];

  return (
    <Layout currentPath={currentPath}>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <Breadcrumbs items={[{ label: 'お店を探す', href: '/shops' }, { label: frontmatter.name }]} />

        {frontmatter.image && (
          <div className="aspect-[16/9] overflow-hidden rounded-sm mb-8">
            <img src={frontmatter.image} alt={frontmatter.name} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-3">
          {categories.map((category) => (
            <span key={category} className="px-2 py-0.5 bg-gray-100 rounded-full">
              {category}
            </span>
          ))}
          <span>{frontmatter.area}</span>
        </div>

        <h1 className="text-2xl lg:text-3xl font-medium mb-4">{frontmatter.name}</h1>
        <p className="text-sm text-gray-600 mb-8">{frontmatter.excerpt}</p>

        {/* Shop Info */}
        <div className="bg-gray-50 rounded-sm p-5 mb-8 space-y-3">
          {frontmatter.address && (
            <div className="flex items-start gap-3 text-sm">
              <MapPin size={14} className="mt-0.5 text-gray-400 flex-shrink-0" />
              <span className="text-gray-700">{frontmatter.address}</span>
            </div>
          )}
          {frontmatter.hours && (
            <div className="flex items-start gap-3 text-sm">
              <Clock size={14} className="mt-0.5 text-gray-400 flex-shrink-0" />
              <span className="text-gray-700">{frontmatter.hours}</span>
            </div>
          )}
          {frontmatter.closed && (
            <div className="flex items-start gap-3 text-sm">
              <span className="text-gray-400 flex-shrink-0 w-3.5 text-center">休</span>
              <span className="text-gray-700">{frontmatter.closed}</span>
            </div>
          )}
          {frontmatter.website && (
            <div className="flex items-start gap-3 text-sm">
              <Globe size={14} className="mt-0.5 text-gray-400 flex-shrink-0" />
              <a href={frontmatter.website} target="_blank" rel="noopener noreferrer" className="text-[#4a5c4a] hover:underline">
                公式サイト
              </a>
            </div>
          )}
          {frontmatter.instagram && (
            <div className="flex items-start gap-3 text-sm">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-0.5 text-gray-400 flex-shrink-0"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <a href={frontmatter.instagram} target="_blank" rel="noopener noreferrer" className="text-[#4a5c4a] hover:underline">
                Instagram
              </a>
            </div>
          )}
        </div>

        <MarkdownRenderer content={content} />

        <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-sm">
          <p className="text-xs text-amber-800 leading-relaxed">
            掲載情報は公開時点のものです。最新情報は各店舗・施設の公式情報をご確認ください。
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link href="/shops" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#4a5c4a] transition-colors">
            <ArrowLeft size={14} />
            お店一覧へ戻る
          </Link>
        </div>
      </article>
    </Layout>
  );
}
