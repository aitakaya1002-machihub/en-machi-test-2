export const SITE_NAME = 'en-machi';
export const ORGANIZATION_NAME = 'machi-hub';
export const DEFAULT_TITLE = 'en-machi | 円町の日常と、人と、滞在をつなぐ。';
export const DEFAULT_DESCRIPTION =
  '京都・円町エリアのローカル情報メディア。まちのこと、お店のこと、人のこと。訪れる人も、暮らす人も、それぞれの「円」がつながる場所へ。';
export const DEFAULT_SOCIAL_IMAGE = '/placeholders/enmachi-hero-street.webp';
export const DEFAULT_SOCIAL_IMAGE_ALT = '京都・円町の日常風景';
export const ORGANIZATION_LOGO = '/placeholders/en-machi_bymachihub.webp';

export function buildPageTitle(title?: string) {
  if (!title) {
    return DEFAULT_TITLE;
  }

  return title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
}

export function toAbsoluteUrl(pathOrUrl: string, base: URL | string) {
  return new URL(pathOrUrl, base).toString();
}

export function normalizeIsoDate(value?: string) {
  if (!value) {
    return undefined;
  }

  const normalizedValue = /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? `${value}T00:00:00+09:00`
    : value;
  const parsed = Date.parse(normalizedValue);

  if (Number.isNaN(parsed)) {
    return undefined;
  }

  return new Date(parsed).toISOString();
}
