export const DEFAULTS = {
  GA_TRACKING_ID: import.meta.env.VITE_GA_TRACKING_ID || '',
  GOOGLE_SCRIPT_URL: import.meta.env.VITE_GOOGLE_SCRIPT_URL || '',
  APP_MODE: import.meta.env.VITE_APP_MODE || 'development',
  BASE_URL: '/digital-invitation/',
} as const;

export type AppMode = typeof DEFAULTS.APP_MODE;