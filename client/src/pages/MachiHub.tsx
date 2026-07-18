import Layout from '@/components/Layout';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageHeader from '@/components/PageHeader';
import type { RoutedPageProps } from '@/lib/page-props';

export default function MachiHub({ currentPath }: RoutedPageProps) {
  return (
    <Layout currentPath={currentPath}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <Breadcrumbs items={[{ label: 'machi-hubについて' }]} />
        <PageHeader title="machi-hubについて" />

        <div className="max-w-2xl space-y-8">
          <section>
            <h2 className="text-base font-medium mb-3">machi-hubとは</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              株式会社machi-hubは、京都・円町エリアを拠点に、地域の暮らしと人をつなぐ事業を展開しています。
              ものづくりの場、滞在の場、情報発信の場を通じて、まちの日常に新しい循環を生み出すことを目指しています。
            </p>
          </section>

          <section>
            <h2 className="text-base font-medium mb-4">運営する拠点</h2>
            <div className="space-y-4">
              <div className="p-5 border border-gray-100 rounded-sm">
                <h3 className="text-sm font-medium mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>moto-machi</h3>
                <p className="text-xs text-gray-500 mb-2">アトリエガレージ・モトマチ</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  つくること、整えること、集うこと。地域にひらかれたアトリエガレージです。
                </p>
              </div>
              <div className="p-5 border border-gray-100 rounded-sm">
                <h3 className="text-sm font-medium mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>yado-machi</h3>
                <p className="text-xs text-gray-500 mb-2">一棟貸しの宿・ヤドマチ</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  暮らすように泊まる、京都の一棟貸し宿。円町の日常を旅の一部に。
                </p>
              </div>
              <div className="p-5 border border-gray-100 rounded-sm">
                <h3 className="text-sm font-medium mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>en-machi</h3>
                <p className="text-xs text-gray-500 mb-2">地域との接点</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  円町の人・店・場所・出来事をつなぐ、machi-hub運営のローカルポータルです。
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-base font-medium mb-3">会社情報</h2>
            <dl className="text-sm space-y-2">
              <div className="flex gap-4">
                <dt className="text-gray-500 w-24 flex-shrink-0">会社名</dt>
                <dd className="text-gray-700">株式会社machi-hub</dd>
              </div>
              <div className="flex gap-4">
                <dt className="text-gray-500 w-24 flex-shrink-0">所在地</dt>
                <dd className="text-gray-700">京都市中京区（詳細は非公開）</dd>
              </div>
              <div className="flex gap-4">
                <dt className="text-gray-500 w-24 flex-shrink-0">事業内容</dt>
                <dd className="text-gray-700">地域メディア運営、宿泊施設運営、アトリエ運営</dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
    </Layout>
  );
}
