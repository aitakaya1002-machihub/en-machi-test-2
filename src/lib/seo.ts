export const SITE_NAME = 'en-machi';
export const DEFAULT_TITLE = 'en-machi | 円町の日常と、人と、滞在をつなぐ。';
export const DEFAULT_DESCRIPTION =
  '京都・円町エリアのローカル情報メディア。まちのこと、お店のこと、人のこと。訪れる人も、暮らす人も、それぞれの「円」がつながる場所へ。';

export function buildPageTitle(title?: string) {
  if (!title) {
    return DEFAULT_TITLE;
  }

  return title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
}
