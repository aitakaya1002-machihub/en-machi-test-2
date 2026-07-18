import { useState, type FormEvent } from 'react';
import Layout from '@/components/Layout';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from '@/components/Link';
import PageHeader from '@/components/PageHeader';
import type { RoutedPageProps } from '@/lib/page-props';

const formEndpoint = import.meta.env.PUBLIC_SSGFORM_ENDPOINT;
const turnstileSiteKey = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY;

export default function Contact({ currentPath }: RoutedPageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (!formEndpoint) {
      event.preventDefault();
      setStatusMessage('フォーム送信先の設定が未完了です。SSGform のURLをご確認ください。');
      return;
    }

    event.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: formData,
      });

      if (response.status === 200) {
        window.location.assign('/contact/thanks/');
        return;
      }

      if (response.status === 204) {
        setStatusMessage('認証の確認に失敗しました。時間をおいてもう一度お試しください。');
        return;
      }

      setStatusMessage('送信に失敗しました。入力内容をご確認のうえ、もう一度お試しください。');
    } catch {
      setStatusMessage('通信に失敗しました。ネットワーク接続をご確認ください。');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Layout currentPath={currentPath}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <Breadcrumbs items={[{ label: 'お問い合わせ' }]} />
        <PageHeader
          title="お問い合わせ"
          description="en-machiへのお問い合わせは、以下のフォームよりお送りください。"
        />
        <div className="max-w-xl">
          <form
            className="space-y-6"
            action={formEndpoint}
            method="post"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="フォーム名" value="en-machi お問い合わせ" />
            <input
              type="text"
              name="wana"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium mb-1.5">お名前</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                className="w-full px-3 py-2.5 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#4a5c4a] transition-colors"
                placeholder="山田 太郎"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium mb-1.5">メールアドレス</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                className="w-full px-3 py-2.5 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#4a5c4a] transition-colors"
                placeholder="example@email.com"
              />
            </div>
            <div>
              <label htmlFor="contact-category" className="block text-sm font-medium mb-1.5">お問い合わせ種別</label>
              <select
                id="contact-category"
                name="category"
                required
                defaultValue="一般的なお問い合わせ"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#4a5c4a] transition-colors"
              >
                <option value="一般的なお問い合わせ">一般的なお問い合わせ</option>
                <option value="掲載に関するお問い合わせ">掲載に関するお問い合わせ</option>
                <option value="掲載情報の修正・削除依頼">掲載情報の修正・削除依頼</option>
                <option value="取材・コラボレーション">取材・コラボレーション</option>
                <option value="その他">その他</option>
              </select>
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium mb-1.5">メッセージ</label>
              <textarea
                id="contact-message"
                name="message"
                rows={6}
                required
                className="w-full px-3 py-2.5 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-[#4a5c4a] transition-colors resize-none"
                placeholder="お問い合わせ内容をご記入ください"
              />
            </div>
            {turnstileSiteKey && (
              <>
                <script
                  src="https://challenges.cloudflare.com/turnstile/v0/api.js"
                  async
                  defer
                />
                <div className="cf-turnstile" data-sitekey={turnstileSiteKey} />
              </>
            )}
            <label className="flex items-start gap-3 text-sm text-gray-600">
              <input
                name="privacy-consent"
                type="checkbox"
                value="yes"
                required
                className="mt-1 size-4 border border-gray-300 rounded-sm text-[#4a5c4a] focus:ring-[#4a5c4a]"
              />
              <span className="leading-relaxed">
                <Link href="/privacy" className="text-[#4a5c4a] hover:underline">
                  プライバシーポリシー
                </Link>
                に同意のうえ送信します。
              </span>
            </label>
            {statusMessage && (
              <p className="text-sm text-red-600 leading-relaxed" role="status">
                {statusMessage}
              </p>
            )}
            {!formEndpoint && (
              <p className="text-sm text-amber-700 leading-relaxed">
                送信先URLが未設定です。`.env` の `PUBLIC_SSGFORM_ENDPOINT` を設定してください。
              </p>
            )}
            <button
              type="submit"
              disabled={isSubmitting || !formEndpoint}
              className="px-6 py-2.5 bg-[#4a5c4a] text-white text-sm rounded-sm hover:bg-[#3d4d3d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '送信中...' : '送信する'}
            </button>
          </form>
          <p className="mt-8 text-xs text-gray-500 leading-relaxed">
            ※ お問い合わせへの返信には数日いただく場合がございます。
          </p>
        </div>
      </div>
    </Layout>
  );
}
