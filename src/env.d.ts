/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly MICROCMS_SERVICE_DOMAIN?: string;
  readonly MICROCMS_API_KEY?: string;
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_SSGFORM_ENDPOINT?: string;
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
  readonly PUBLIC_ANALYTICS_ENDPOINT?: string;
  readonly PUBLIC_ANALYTICS_WEBSITE_ID?: string;
  readonly VITE_ANALYTICS_ENDPOINT?: string;
  readonly VITE_ANALYTICS_WEBSITE_ID?: string;
}
