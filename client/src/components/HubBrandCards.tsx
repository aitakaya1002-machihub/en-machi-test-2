import { ArrowRight } from 'lucide-react';
import Link from '@/components/Link';

export default function HubBrandCards() {
  return (
    <section className="bg-[#f8f7f5] py-12 lg:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-5 bg-[#4a5c4a] rounded-full" />
          <h2 className="text-lg font-medium" style={{ fontFamily: '"Noto Serif JP", serif' }}>
            machi-hubが運営する拠点
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* moto-machi */}
          <div className="bg-white rounded-sm p-6 border border-gray-100 hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full border-2 border-[#4a5c4a]/30 flex items-center justify-center">
                <span className="text-[9px] font-bold text-[#4a5c4a]" style={{ fontFamily: '"Noto Serif JP", serif' }}>元</span>
              </div>
              <div>
                <h3 className="text-base font-medium" style={{ fontFamily: '"Noto Serif JP", serif' }}>moto-machi</h3>
              </div>
            </div>
            <p className="text-xs text-gray-500 mb-1 font-medium">アトリエガレージ・モトマチ</p>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              つくること、整えること、集うこと。ものづくりの拠点になるアトリエガレージ。
            </p>
            <Link href="/machi-hub" className="inline-flex items-center gap-1 text-xs text-[#4a5c4a] font-medium hover:gap-2 transition-all">
              詳しく見る <ArrowRight size={12} />
            </Link>
          </div>

          {/* yado-machi */}
          <div className="bg-white rounded-sm p-6 border border-gray-100 hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full border-2 border-[#4a5c4a]/30 flex items-center justify-center">
                <span className="text-[9px] font-bold text-[#4a5c4a]" style={{ fontFamily: '"Noto Serif JP", serif' }}>宿</span>
              </div>
              <div>
                <h3 className="text-base font-medium" style={{ fontFamily: '"Noto Serif JP", serif' }}>yado-machi</h3>
              </div>
            </div>
            <p className="text-xs text-gray-500 mb-1 font-medium">一棟貸しの宿・ヤドマチ</p>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              暮らすように泊まる、京都の宿。まちの時間をゆっくり味わえます。
            </p>
            <Link href="/machi-hub" className="inline-flex items-center gap-1 text-xs text-[#4a5c4a] font-medium hover:gap-2 transition-all">
              詳しく見る <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
