export const i18n = {
  defaultLocale: 'vi',
  locales: ['vi', 'cn', 'en'],
} as const;

export type Locale = (typeof i18n)['locales'][number];
