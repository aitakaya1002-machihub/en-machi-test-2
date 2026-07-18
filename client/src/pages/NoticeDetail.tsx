import Layout from '@/components/Layout';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from '@/components/Link';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import type { NoticeDetailPageProps } from '@/lib/page-props';
import { ArrowLeft } from 'lucide-react';

export default function NoticeDetail({ currentPath, notice }: NoticeDetailPageProps) {
  if (!notice) {
    return (
      <Layout currentPath={currentPath}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-gray-500">お知らせが見つかりませんでした。</p>
          <Link href="/notices" className="text-sm text-[#4a5c4a] mt-4 inline-block">お知らせ一覧へ戻る</Link>
        </div>
      </Layout>
    );
  }

  const { frontmatter, content } = notice;

  return (
    <Layout currentPath={currentPath}>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <Breadcrumbs items={[{ label: 'お知らせ', href: '/notices' }, { label: frontmatter.title }]} />

        <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
          <span>{frontmatter.date}</span>
          <span className="px-2 py-0.5 bg-gray-100 rounded-full">{frontmatter.category}</span>
        </div>

        <h1 className="text-2xl lg:text-3xl font-medium mb-8">{frontmatter.title}</h1>

        <MarkdownRenderer content={content} />

        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link href="/notices" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#4a5c4a] transition-colors">
            <ArrowLeft size={14} />
            お知らせ一覧へ戻る
          </Link>
        </div>
      </article>
    </Layout>
  );
}
