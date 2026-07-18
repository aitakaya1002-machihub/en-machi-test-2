import Layout from '@/components/Layout';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from '@/components/Link';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import type { EventDetailPageProps } from '@/lib/page-props';
import { ArrowLeft, Calendar, Clock, MapPin, User, Ticket } from 'lucide-react';

export default function EventDetail({ currentPath, event }: EventDetailPageProps) {
  if (!event) {
    return (
      <Layout currentPath={currentPath}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-gray-500">イベント情報が見つかりませんでした。</p>
          <Link href="/events" className="text-sm text-[#4a5c4a] mt-4 inline-block">イベント一覧へ戻る</Link>
        </div>
      </Layout>
    );
  }

  const { frontmatter, content } = event;

  return (
    <Layout currentPath={currentPath}>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <Breadcrumbs items={[{ label: 'イベント', href: '/events' }, { label: frontmatter.title }]} />

        {frontmatter.image && (
          <div className="aspect-[16/9] overflow-hidden rounded-sm mb-8">
            <img src={frontmatter.image} alt={frontmatter.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <span className="px-2 py-0.5 bg-gray-100 rounded-full">{frontmatter.category}</span>
        </div>

        <h1 className="text-2xl lg:text-3xl font-medium mb-6">{frontmatter.title}</h1>

        {/* Event Info */}
        <div className="bg-gray-50 rounded-sm p-5 mb-8 space-y-3">
          <div className="flex items-start gap-3 text-sm">
            <Calendar size={14} className="mt-0.5 text-gray-400 flex-shrink-0" />
            <span className="text-gray-700">{frontmatter.date}</span>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <Clock size={14} className="mt-0.5 text-gray-400 flex-shrink-0" />
            <span className="text-gray-700">{frontmatter.startTime} − {frontmatter.endTime}</span>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <MapPin size={14} className="mt-0.5 text-gray-400 flex-shrink-0" />
            <span className="text-gray-700">{frontmatter.place}</span>
          </div>
          {frontmatter.fee && (
            <div className="flex items-start gap-3 text-sm">
              <Ticket size={14} className="mt-0.5 text-gray-400 flex-shrink-0" />
              <span className="text-gray-700">{frontmatter.fee}</span>
            </div>
          )}
          {frontmatter.organizer && (
            <div className="flex items-start gap-3 text-sm">
              <User size={14} className="mt-0.5 text-gray-400 flex-shrink-0" />
              <span className="text-gray-700">{frontmatter.organizer}</span>
            </div>
          )}
        </div>

        <MarkdownRenderer content={content} />

        <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-sm">
          <p className="text-xs text-amber-800 leading-relaxed">
            イベント内容は変更になる場合があります。最新情報は主催者の案内をご確認ください。
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link href="/events" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#4a5c4a] transition-colors">
            <ArrowLeft size={14} />
            イベント一覧へ戻る
          </Link>
        </div>
      </article>
    </Layout>
  );
}
