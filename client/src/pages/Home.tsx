import Layout from '@/components/Layout';
import SectionHeading from '@/components/SectionHeading';
import StoryCard from '@/components/StoryCard';
import ShopCard from '@/components/ShopCard';
import EventCard from '@/components/EventCard';
import HubBrandCards from '@/components/HubBrandCards';
import Link from '@/components/Link';
import type { HomePageProps } from '@/lib/page-props';
import { ArrowRight, MapPin } from 'lucide-react';

export default function Home({ currentPath, stories, shops, events, notices }: HomePageProps) {
  return (
    <Layout currentPath={currentPath}>
      {/* Hero Section */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="pt-4 lg:pt-8">
            {/* Thin vertical accent line */}
            <div className="w-px h-12 bg-[#4a5c4a] mb-8 opacity-60" />
            <h1 className="text-3xl sm:text-4xl lg:text-[2.8rem] leading-[1.3] mb-8" style={{ fontFamily: '"Noto Serif JP", serif', fontWeight: 500 }}>
              円町の日常と、<br />人と、滞在をつなぐ。
            </h1>
            <p className="text-sm text-gray-600 leading-[1.9] mb-10 max-w-sm">
              京都・円町エリアのローカル情報メディア。<br />
              まちのこと、お店のこと、人のこと。<br />
              訪れる人も、暮らす人も、<br />
              それぞれの"円"がつながる場所へ。
            </p>
            <Link
              href="/area"
              className="inline-flex items-center gap-2 text-sm text-[#4a5c4a] font-medium hover:gap-3 transition-all"
            >
              円町を知る <ArrowRight size={14} />
            </Link>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-sm">
              <img
                src="/placeholders/hero-street.svg"
                alt="円町の日常風景"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Area Map Overlay Card */}
            <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-sm shadow-sm border border-[#4a5c4a]/10 max-w-[200px]">
              <div className="flex items-center gap-2 mb-1.5">
                <MapPin size={13} className="text-[#4a5c4a]" />
                <span className="text-xs font-medium text-[#4a5c4a]">エリアマップ</span>
              </div>
              <p className="text-[10px] text-gray-500 leading-relaxed">
                円町の見どころを<br />マップで見る
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider - thin line with circle motif */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <div className="w-2 h-2 rounded-full border border-[#4a5c4a]/40" />
          <div className="flex-1 h-px bg-gray-200" />
        </div>
      </div>

      {/* Local Stories Section */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <SectionHeading title="ローカルストーリー" href="/stories" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {stories.map((item) => (
            <StoryCard key={item.frontmatter.slug} story={item.frontmatter} />
          ))}
        </div>
      </section>

      {/* Section Divider */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <div className="w-2 h-2 rounded-full border border-[#4a5c4a]/40" />
          <div className="flex-1 h-px bg-gray-200" />
        </div>
      </div>

      {/* Area Map + Featured Shops Section */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Area Map */}
          <div className="lg:col-span-1">
            <SectionHeading title="エリアマップ" href="/area" linkText="マップを見る" />
            <div className="bg-[#f8f7f5] rounded-sm p-6 aspect-square flex flex-col items-center justify-center text-center border border-gray-100">
              {/* Circle motif for map */}
              <div className="w-16 h-16 rounded-full border-2 border-[#4a5c4a]/30 flex items-center justify-center mb-4">
                <MapPin size={24} className="text-[#4a5c4a]" />
              </div>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                お店やスポット、宿泊施設など<br />
                円町エリアの見どころをマップでご紹介。
              </p>
              <Link
                href="/area"
                className="inline-flex items-center gap-1 text-xs text-[#4a5c4a] font-medium hover:gap-2 transition-all"
              >
                マップを見る <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Featured Shops */}
          <div className="lg:col-span-2">
            <SectionHeading title="注目のお店" href="/shops" />
            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              {shops.map((item) => (
                <ShopCard key={item.frontmatter.slug} shop={item.frontmatter} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <div className="w-2 h-2 rounded-full border border-[#4a5c4a]/40" />
          <div className="flex-1 h-px bg-gray-200" />
        </div>
      </div>

      {/* Events Section */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <SectionHeading title="イベント" href="/events" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {events.map((item) => (
            <EventCard key={item.frontmatter.slug} event={item.frontmatter} />
          ))}
        </div>
      </section>

      {/* Section Divider */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <div className="w-2 h-2 rounded-full border border-[#4a5c4a]/40" />
          <div className="flex-1 h-px bg-gray-200" />
        </div>
      </div>

      {/* Notices Section */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <SectionHeading title="お知らせ" href="/notices" />
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
              <h3 className="text-sm font-medium mb-1">{item.frontmatter.title}</h3>
              {item.frontmatter.excerpt && (
                <p className="text-xs text-gray-500 leading-relaxed">{item.frontmatter.excerpt}</p>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* Hub Brand Cards */}
      <HubBrandCards />

      {/* About Section */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="flex items-start gap-6">
          <div className="w-px h-16 bg-[#4a5c4a]/40 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-lg font-medium mb-4" style={{ fontFamily: '"Noto Serif JP", serif' }}>en-machiについて</h2>
            <p className="text-sm text-gray-600 leading-[1.9] max-w-2xl">
              en-machiは、株式会社machi-hubが運営する円町周辺エリアのローカルポータルです。
              お店、人、場所、イベント、滞在情報を通して、円町の日常にある魅力を発信していきます。
              暮らす人にとっては、まちを再発見するきっかけに。
              訪れる人にとっては、地域とつながる入口に。
              en-machiは、円町に生まれるさまざまな"縁"をつなぐメディアです。
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
