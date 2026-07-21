# en-machi

`en-machi` は、京都・円町エリアのローカル情報を発信する静的サイトです。  
Astro をベースに構築し、`microCMS` を更新した際に `Cloudflare Pages` を再デプロイすることで公開内容を反映する構成になっています。

この README は、クライアント納品用に「今回の変更点」「現在の仕様」「運用方法」をまとめたものです。

## 今回の主な変更点

- 旧 Vite 構成から `Astro` ベースへ移行
- `microCMS` 連携に対応
- `Cloudflare Pages` での静的公開を前提に再構成
- ヘッダー検索を実装
- `/area` ページに 6分類の横断フィルターを実装
- お問い合わせフォームを `SSGform` 連携で実装
- 送信完了ページ `/contact/thanks/` を追加
- SEO 基盤を強化
  - `canonical`
  - OGP / Twitter Card
  - JSON-LD
  - `robots.txt`
  - `sitemap.xml`
- 公開制御 `published` が `false` のコンテンツは一覧・詳細・検索・サイトマップから除外
- `about` ページを運営情報ページとして整理

## 公開ページ一覧

- `/`
- `/area`
- `/shops`
- `/shops/[slug]`
- `/events`
- `/events/[slug]`
- `/stories`
- `/stories/[slug]`
- `/notices`
- `/notices/[slug]`
- `/about`
- `/contact`
- `/contact/thanks/`
- `/privacy`
- `/404`

自動生成される補助ファイル:

- `/search.json`
- `/robots.txt`
- `/sitemap.xml`

## 現在の仕様

### 1. 公開方式

- `Astro` の静的サイト生成
- コンテンツ更新はリアルタイム反映ではなく、`microCMS -> Webhook -> Cloudflare Pages 再デプロイ` で反映
- `MICROCMS_SERVICE_DOMAIN` / `MICROCMS_API_KEY` が未設定、または接続失敗時は `client/src/content/**` のローカル Markdown をフォールバックとして利用

### 2. 検索

- ヘッダーの虫眼鏡アイコンから検索モーダルを開く仕様
- `Cmd + K` / `Ctrl + K` / `/` でも起動可能
- 初期表示時は以下を表示
  - 固定ページ: 全件
  - ストーリー / お店 / イベント / お知らせ: 各3件
- キーワード入力時は、タイトル・説明・セクション名・補助キーワードで部分一致検索

### 3. `/area` ページ

- 6分類での横断フィルターを実装
- 対象カテゴリ
  - `食べる`
  - `買う`
  - `泊まる`
  - `つくる`
  - `めぐる`
  - `暮らす`
- 対象コンテンツ
  - お店
  - ストーリー
  - イベント
  - お知らせ
- 初期状態では何も選択されていない状態
- `リセット` ボタンあり
- 上部に簡易エリアマップ SVG を配置
  - 現在は準地図寄りのデザインマップ
  - Google Maps / Leaflet のような実地図ではない

### 4. お店一覧

- `shops.category` の複数選択に対応
- `featured: true` の店舗を上位表示

### 5. お問い合わせフォーム

- `SSGform` 連携
- JavaScript 有効時は Ajax 送信後に `/contact/thanks/` へ遷移
- JavaScript 無効時も通常フォーム送信で送信可能
- 任意で `Cloudflare Turnstile` に対応

### 6. SEO

実装済み項目:

- ページごとの `title` / `description`
- `canonical`
- OGP / Twitter Card
- 構造化データ `JSON-LD`
  - `Organization`
  - `WebSite`
  - `WebPage`
  - `Article`
  - `Event`
  - `LocalBusiness`
- `robots.txt`
- `sitemap.xml`
- `search.json`

補足:

- `/contact/thanks/` は `noindex`
- `published: false` のコンテンツは SEO 対象外

### 7. アニメーション / UI

- ページ遷移時のフェードアニメーションを実装
- スマホ時は全画面バーガーメニュー
- モバイルメニューは実機スクロール対応済み

## 技術構成

- `Astro`
- `React` Islands
- `Tailwind CSS`
- `microCMS`
- `Cloudflare Pages`
- `SSGform`

基本方針:

- ページ本体は `.astro`
- インタラクションが必要な箇所のみ `.tsx`
  - 検索
  - フィルター
  - フォーム
  - モバイルメニュー

## 開発環境

### 推奨 Node.js

- `^20.19.0` または `>=22.12.0`

### 起動手順

1. 依存関係をインストール  
   `npm install` または `pnpm install`
2. `.env.example` を元に `.env` を作成
3. ローカル起動  
   `npm run dev`

### 利用コマンド

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run check`
- `npm run format`

## 環境変数

- `MICROCMS_SERVICE_DOMAIN`
  - microCMS のサービスドメイン
- `MICROCMS_API_KEY`
  - Content API の GET 権限を持つ API キー
- `PUBLIC_SITE_URL`
  - 本番URL
  - `canonical` や OGP の絶対URL生成に利用
- `PUBLIC_SSGFORM_ENDPOINT`
  - SSGform の送信先 URL
- `PUBLIC_TURNSTILE_SITE_KEY`
  - 任意
  - Turnstile を使う場合に設定
- `PUBLIC_ANALYTICS_ENDPOINT`
  - 任意
  - Umami 等の解析エンドポイント
- `PUBLIC_ANALYTICS_WEBSITE_ID`
  - 任意
  - 解析サイト ID

## microCMS API 設計

このサイトは以下 4 API を前提にしています。

- `stories`
- `shops`
- `events`
- `notices`

### stories

- `title`: テキスト
- `slug`: テキスト
- `category`: セレクト or テキスト
- `areaCategories`: 複数選択
- `date`: 日付
- `excerpt`: テキストエリア
- `image`: メディア
- `tags`: 複数テキスト
- `author`: テキスト
- `relatedShop`: テキスト
- `relatedArea`: テキスト
- `published`: 真偽値
- `content`: リッチエディタ or テキストエリア

### shops

- `name`: テキスト
- `slug`: テキスト
- `category`: 複数選択推奨
- `areaCategories`: 複数選択
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
- `published`: 真偽値
- `featured`: 真偽値
- `content`: リッチエディタ or テキストエリア

### events

- `title`: テキスト
- `slug`: テキスト
- `category`: セレクト or テキスト
- `areaCategories`: 複数選択
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
- `published`: 真偽値
- `featured`: 真偽値
- `content`: リッチエディタ or テキストエリア

### notices

- `title`: テキスト
- `slug`: テキスト
- `category`: セレクト or テキスト
- `areaCategories`: 複数選択
- `date`: 日付
- `excerpt`: テキストエリア
- `published`: 真偽値
- `content`: リッチエディタ or テキストエリア

## microCMS フィールド運用メモ

- `published`
  - `false` にするとサイト上に出ません
  - 一覧、詳細、検索、サイトマップから除外されます
- `areaCategories`
  - `/area` の横断フィルターで使用します
- `shops.category`
  - 複数選択に対応しています
- `shops.featured`
  - お店一覧やトップの掲載順に利用
- `events.featured`
  - フィールドは保持していますが、現時点では表示順制御に未使用です
- `mapUrl`
  - 現時点では保存用フィールドです
- `reservationUrl`
  - 現時点では保存用フィールドです
- `relatedShop` / `relatedArea`
  - 現時点では保存用フィールドです

## Cloudflare Pages 設定

### ビルド設定

- Build command: `npm run build`
- Output directory: `dist`

### 再デプロイ Webhook

1. Cloudflare Pages で Deploy Hook を作成
2. microCMS の各 API で `API設定 > Webhook` を開く
3. 作成した Deploy Hook URL を登録
4. 少なくとも以下を通知対象に設定
   - 公開
   - 更新
   - 非公開
   - 削除

## SSGform 設定

1. SSGform でフォームを作成
2. 発行されたフォームURLを `PUBLIC_SSGFORM_ENDPOINT` に設定
3. SSGform 側の送信後URLとして `https://<本番ドメイン>/contact/thanks/` を設定
4. Turnstile を使う場合は SSGform 側設定と `PUBLIC_TURNSTILE_SITE_KEY` を両方設定

## 納品時の注意点

- `PUBLIC_SITE_URL` は本番ドメインに必ず変更すること
- microCMS のサービスドメインと API キーが未設定だと、ローカル Markdown を使ってビルドされます
- 本番公開前に以下を確認すること
  - `robots.txt`
  - `sitemap.xml`
  - OGP 表示
  - フォーム送信
  - Webhook 再デプロイ

## 補足

- `/about` が運営情報ページの正式URLです
- `/machi-hub` は現行構成では使用していません
- 将来的に地図を本格化する場合は、`SVG地図 + React island` または `Leaflet` への拡張が可能です
