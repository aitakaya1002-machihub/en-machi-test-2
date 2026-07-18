# en-machi

Astro で構築した `en-machi` のフロントエンドです。  
microCMS を接続すると、`stories` / `shops` / `events` / `notices` をビルド時に取得し、Cloudflare Pages の再デプロイで公開内容を更新できます。

## 開発

1. 依存関係をインストールします。  
   `npm install` または `pnpm install`
2. 環境変数を用意します。  
   `.env.example` を元に `.env` を作成
3. ローカル起動します。  
   `npm run dev`

`MICROCMS_SERVICE_DOMAIN` と `MICROCMS_API_KEY` が未設定の場合は、`client/src/content/**` のローカル Markdown をフォールバックとして使います。

## 環境変数

- `MICROCMS_SERVICE_DOMAIN`: microCMS のサービスドメイン
- `MICROCMS_API_KEY`: Content API の GET 権限を持つ API キー
- `PUBLIC_SITE_URL`: 本番URL。canonical / OGP の絶対URL生成に使います
- `PUBLIC_SSGFORM_ENDPOINT`: SSGform のフォームURL
- `PUBLIC_TURNSTILE_SITE_KEY`: 任意。SSGform + Turnstile を使う場合の site key
- `PUBLIC_ANALYTICS_ENDPOINT`: 任意。Umami 等の計測エンドポイント
- `PUBLIC_ANALYTICS_WEBSITE_ID`: 任意。計測サイトID

## microCMS の API 設計

この実装は以下 4 つの API を前提にしています。

- `stories`
- `shops`
- `events`
- `notices`

各 API のフィールド名は、できるだけ今のフロントの構造に合わせています。

### stories

- `title`: テキスト
- `slug`: テキスト
- `category`: セレクト or テキスト
- `date`: 日付
- `excerpt`: テキストエリア
- `image`: メディア
- `tags`: 複数テキスト
- `author`: テキスト
- `relatedShop`: テキスト
- `relatedArea`: テキスト
- `content`: リッチエディタ or テキストエリア

### shops

- `name`: テキスト
- `slug`: テキスト
- `category`: セレクト or テキスト
- `area`: テキスト
- `address`: テキストエリア
- `hours`: テキスト
- `closed`: テキスト
- `excerpt`: テキストエリア
- `image`: メディア
- `gallery`: 複数メディア
- `website`: URL
- `instagram`: URL
- `mapUrl`: URL
- `featured`: 真偽値
- `content`: リッチエディタ or テキストエリア

### events

- `title`: テキスト
- `slug`: テキスト
- `category`: セレクト or テキスト
- `date`: 日付
- `startTime`: テキスト or 時刻
- `endTime`: テキスト or 時刻
- `place`: テキスト
- `address`: テキストエリア
- `excerpt`: テキストエリア
- `image`: メディア
- `organizer`: テキスト
- `fee`: テキスト
- `reservationUrl`: URL
- `featured`: 真偽値
- `content`: リッチエディタ or テキストエリア

### notices

- `title`: テキスト
- `slug`: テキスト
- `category`: セレクト or テキスト
- `date`: 日付
- `excerpt`: テキストエリア
- `content`: リッチエディタ or テキストエリア

## Cloudflare Pages の再デプロイ

1. Cloudflare Pages の対象プロジェクトで Deploy Hook を作成
2. microCMS の各 API で `API設定 > Webhook` を開く
3. `Cloudflare Pages` を選び、Deploy Hook URL を設定
4. 少なくとも `公開時・更新時` で通知する

公開停止や削除もサイトに反映したい場合は、そのイベント用 Webhook も追加しておくと安全です。

## お問い合わせフォーム

お問い合わせフォームは `SSGform` を前提にしています。

1. SSGform でフォームを作成
2. 発行されたフォームURLを `PUBLIC_SSGFORM_ENDPOINT` に設定
3. 送信後転送先URLの予備設定として `https://<your-domain>/contact/thanks/` を SSGform 側にも設定
4. Turnstile を使う場合は SSGform 側の設定と `PUBLIC_TURNSTILE_SITE_KEY` を両方設定

JavaScript が有効なときは Ajax 送信後に `/contact/thanks/` へ遷移し、無効なときも通常のフォーム送信で送れるようにしてあります。

## 補足

- いまの構成は SSG 前提です。microCMS の内容は公開後に即時反映されるのではなく、Webhook で再ビルドされて反映されます
- 下書きプレビューはまだ未実装です。必要なら Cloudflare 側で SSR / Preview 用ルートを追加できます
