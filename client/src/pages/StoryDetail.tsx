import Layout from '@/components/Layout';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from '@/components/Link';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import type { StoryDetailPageProps } from '@/lib/page-props';
import { ArrowLeft } from 'lucide-react';

export default function StoryDetail({ currentPath, story }: StoryDetailPageProps) {
  if (!story) {
    return (
      <Layout currentPath={currentPath}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-gray-500">記事が見つかりませんでした。</p>
          <Link href="/stories" className="text-sm text-[#4a5c4a] mt-4 inline-block">ストーリー一覧へ戻る</Link>
        </div>
      </Layout>
    );
  }

  const { frontmatter, content } = story;

  return (
    <Layout currentPath={currentPath}>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <Breadcrumbs items={[{ label: 'ストーリー', href: '/stories' }, { label: frontmatter.title }]} />
        
        {frontmatter.image && (
          <div className="aspect-[16/9] overflow-hidden rounded-sm mb-8">
            <img src={frontmatter.image} alt={frontmatter.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
          <span className="px-2 py-0.5 bg-gray-100 rounded-full">{frontmatter.category}</span>
          <span>{frontmatter.date}</span>
          {frontmatter.author && <span>by {frontmatter.author}</span>}
        </div>

        <h1 className="text-2xl lg:text-3xl font-medium mb-6 leading-tight">{frontmatter.title}</h1>

        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {frontmatter.tags.map((tag) => (
              <span key={tag} className="text-xs text-gray-500">#{tag}</span>
            ))}
          </div>
        )}

        <MarkdownRenderer content={content} />

        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link href="/stories" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#4a5c4a] transition-colors">
            <ArrowLeft size={14} />
            ストーリー一覧へ戻る
          </Link>
        </div>
      </article>
    </Layout>
  );
}
