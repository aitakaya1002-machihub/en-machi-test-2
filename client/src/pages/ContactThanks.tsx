import Layout from '@/components/Layout';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from '@/components/Link';
import PageHeader from '@/components/PageHeader';
import type { RoutedPageProps } from '@/lib/page-props';

export default function ContactThanks({ currentPath }: RoutedPageProps) {
  return (
    <Layout currentPath={currentPath}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="max-w-2xl">
          <Breadcrumbs items={[{ label: 'お問い合わせ', href: '/contact' }, { label: '送信完了' }]} />
          <PageHeader
            title="送信ありがとうございました"
            description="お問い合わせを受け付けました。内容を確認のうえ、必要に応じてご連絡いたします。"
          />

          <div className="border border-gray-100 rounded-sm p-6 sm:p-8 bg-white">
            <p className="text-sm text-gray-600 leading-[1.9]">
              ご入力いただいた内容は正常に送信されました。
              返信には数日ほどお時間をいただく場合があります。
            </p>
            <p className="mt-4 text-xs text-gray-500 leading-relaxed">
              自動返信が届かない場合は、迷惑メールフォルダもあわせてご確認ください。
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/"
                className="px-5 py-2.5 bg-[#4a5c4a] text-white text-sm rounded-sm hover:bg-[#3d4d3d] transition-colors"
              >
                ホームへ戻る
              </Link>
              <Link
                href="/contact"
                className="px-5 py-2.5 border border-gray-200 text-sm rounded-sm hover:bg-gray-50 transition-colors"
              >
                フォームに戻る
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
