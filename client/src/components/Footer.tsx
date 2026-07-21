import Link from "@/components/Link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <img
                src="/placeholders/en-machi_bymachihub.webp"
                alt="en-machi by machi-hub"
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-xs text-gray-500 leading-relaxed">
              en-machiは、株式会社machi-hubが独自に運営するローカルメディアです。
              掲載情報は公開時点のものです。最新情報は各店舗・施設の公式情報をご確認ください。
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-6">
              <nav className="space-y-2.5">
                <Link
                  href="/"
                  className="block text-sm text-gray-700 hover:text-[#4a5c4a] transition-colors"
                >
                  ホーム
                </Link>
                <Link
                  href="/area"
                  className="block text-sm text-gray-700 hover:text-[#4a5c4a] transition-colors"
                >
                  円町を知る
                </Link>
                <Link
                  href="/shops"
                  className="block text-sm text-gray-700 hover:text-[#4a5c4a] transition-colors"
                >
                  お店を探す
                </Link>
                <Link
                  href="/events"
                  className="block text-sm text-gray-700 hover:text-[#4a5c4a] transition-colors"
                >
                  イベント
                </Link>
              </nav>
              <nav className="space-y-2.5">
                <Link
                  href="/notices"
                  className="block text-sm text-gray-700 hover:text-[#4a5c4a] transition-colors"
                >
                  お知らせ
                </Link>
                <Link
                  href="/stories"
                  className="block text-sm text-gray-700 hover:text-[#4a5c4a] transition-colors"
                >
                  ストーリー
                </Link>
                <Link
                  href="/about"
                  className="block text-sm text-gray-700 hover:text-[#4a5c4a] transition-colors"
                >
                  machi-hubについて
                </Link>
                <Link
                  href="/contact"
                  className="block text-sm text-gray-700 hover:text-[#4a5c4a] transition-colors"
                >
                  お問い合わせ
                </Link>
                <Link
                  href="/privacy"
                  className="block text-sm text-gray-700 hover:text-[#4a5c4a] transition-colors"
                >
                  プライバシーポリシー
                </Link>
              </nav>
            </div>
          </div>

          {/* Social */}
          <div className="lg:col-span-1 flex lg:justify-end items-start">
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-gray-500 hover:text-[#4a5c4a] transition-colors"
                aria-label="Instagram"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-[#4a5c4a] transition-colors"
                aria-label="Facebook"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">&copy; machi-hub</p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#4a5c4a]/30" />
            <span className="text-[10px] text-gray-400 tracking-wider">
              円町の日常を編む
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#4a5c4a]/30" />
          </div>
        </div>
      </div>
    </footer>
  );
}
