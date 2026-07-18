import Layout from '@/components/Layout';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from '@/components/Link';
import PageHeader from '@/components/PageHeader';
import type { NoticesPageProps } from '@/lib/page-props';

export default function Notices({ currentPath, notices }: NoticesPageProps) {
  return (
    <Layout currentPath={currentPath}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <Breadcrumbs items={[{ label: 'お知らせ' }]} />
        <PageHeader title="お知らせ" />
        <div className="space-y-4">
          {notices.map((item) => (
            <Link
              key={item.frontmatter.slug}
              href={`/notices/${item.frontmatter.slug}`}
              className="block p-4 border border-gray-100 rounded-sm hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-1">
                <span>{item.frontmatter.date}</span>
                <span className="px-2 py-0.5 bg-gray-100 rounded-full">{item.frontmatter.category}</span>
              </div>
              <h3 className="text-sm font-medium">{item.frontmatter.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
