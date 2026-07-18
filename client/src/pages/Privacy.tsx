import Layout from '@/components/Layout';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHeader from '@/components/PageHeader';
import type { RoutedPageProps } from '@/lib/page-props';

export default function Privacy({ currentPath }: RoutedPageProps) {
  return (
    <Layout currentPath={currentPath}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <Breadcrumbs items={[{ label: 'プライバシーポリシー' }]} />
        <PageHeader title="プライバシーポリシー" />
        <div className="max-w-2xl space-y-6">
          <p className="text-sm text-gray-600 leading-relaxed">
            株式会社machi-hub（以下「当社」）は、en-machi（以下「本サイト」）における個人情報の取り扱いについて、以下のとおりプライバシーポリシーを定めます。
          </p>
          <section>
            <h2 className="text-base font-medium mb-2">1. 個人情報の収集</h2>
            <p className="text-sm text-gray-600 leading-relaxed">本サイトでは、お問い合わせフォームの送信時に、お名前・メールアドレス等の個人情報をご提供いただく場合があります。</p>
          </section>
          <section>
            <h2 className="text-base font-medium mb-2">2. 個人情報の利用目的</h2>
            <p className="text-sm text-gray-600 leading-relaxed">収集した個人情報は、お問い合わせへの対応、サービスの改善、および重要なお知らせの連絡に利用いたします。</p>
          </section>
          <section>
            <h2 className="text-base font-medium mb-2">3. 個人情報の第三者提供</h2>
            <p className="text-sm text-gray-600 leading-relaxed">法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。</p>
          </section>
          <section>
            <h2 className="text-base font-medium mb-2">4. アクセス解析</h2>
            <p className="text-sm text-gray-600 leading-relaxed">本サイトでは、サイトの利用状況を把握するためにアクセス解析ツールを使用する場合があります。</p>
          </section>
          <section>
            <h2 className="text-base font-medium mb-2">5. ポリシーの変更</h2>
            <p className="text-sm text-gray-600 leading-relaxed">本ポリシーの内容は、必要に応じて変更することがあります。</p>
          </section>
          <p className="text-sm text-gray-500 pt-4">制定日：2024年4月1日　株式会社machi-hub</p>
        </div>
      </div>
    </Layout>
  );
}
