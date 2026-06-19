/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_TRACKING_ID?: string;
  readonly VITE_GOOGLE_SCRIPT_URL?: string;
  readonly VITE_APP_MODE?: 'development' | 'production' | string;
  readonly BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Global window interfaces
interface Window {
  gtag: (...args: unknown[]) => void;
  dataLayer: unknown[];
}