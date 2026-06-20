import { useState, useEffect, useRef } from 'react';
import { WeddingConfig } from '@/types';

const configCache = new Map<string, WeddingConfig>();

const fetchWithRetry = async (
  url: string,
  signal?: AbortSignal,
  retries = 3,
  delay = 1000
): Promise<Response> => {
  let lastError: Error | null = null;
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`📡 Fetch attempt ${i + 1}/${retries}:`, url);
      const res = await fetch(url, { signal });
      if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);
      console.log(`📡 Fetch success!`);
      return res;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      console.warn(`📡 Fetch attempt ${i + 1} failed:`, lastError.message);
      if (i === retries - 1) break;
      await new Promise((resolve) => setTimeout(resolve, delay * (i + 1)));
    }
  }
  throw lastError || new Error('Gagal memuat konfigurasi');
};

interface UseCustomerConfigResult {
  config: WeddingConfig | null;
  loading: boolean;
  error: string | null;
  retry: () => void;
}

export default function useCustomerConfig(slug: string): UseCustomerConfigResult {
  const [config, setConfig] = useState<WeddingConfig | null>(() => {
    return configCache.get(slug) || null;
  });
  const [loading, setLoading] = useState<boolean>(!configCache.has(slug));
  const [error, setError] = useState<string | null>(null);
  const lastSlugRef = useRef(slug);
  const abortControllerRef = useRef<AbortController | null>(null);
  const retryCountRef = useRef(0);

  const loadConfig = async (forceRefresh = false) => {
    if (!slug) {
      setError('Slug tidak valid');
      setLoading(false);
      return;
    }

    console.log(`📡 loadConfig - slug: ${slug}, forceRefresh: ${forceRefresh}`);

    if (!forceRefresh) {
      const cached = configCache.get(slug);
      if (cached) {
        console.log('📡 Cache hit!');
        setConfig(cached);
        setLoading(false);
        setError(null);
        return;
      }
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const baseUrl = import.meta.env.BASE_URL || '/';
    console.log('📡 BASE_URL:', baseUrl);

    setLoading(true);
    setError(null);

    try {
      const url = `${baseUrl}config/${slug}.json?t=${Date.now()}`;
      console.log('📡 Fetching:', url);

      const response = await fetchWithRetry(url, controller.signal, 3, 1000);
      const data = (await response.json()) as WeddingConfig;

      console.log('📡 Data received:', data);

      if (!data.bride || !data.groom || !data.eventDate) {
        throw new Error('Konfigurasi tidak lengkap');
      }

      configCache.set(slug, data);
      setConfig(data);
      document.documentElement.setAttribute('data-theme', data.theme || 'romantic');
      document.title = `Undangan ${data.bride} & ${data.groom}`;
      retryCountRef.current = 0;
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        console.log('📡 Request aborted');
        return;
      }
      const message = err instanceof Error ? err.message : 'Gagal memuat undangan';
      console.error('📡 Error:', message);
      setError(message);
      
      if (retryCountRef.current < 2) {
        retryCountRef.current++;
        console.log(`📡 Auto-retry ${retryCountRef.current}/2...`);
        setTimeout(() => loadConfig(true), 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug !== lastSlugRef.current) {
      lastSlugRef.current = slug;
      retryCountRef.current = 0;
    }
    loadConfig();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
    };
  }, [slug]);

  const retry = () => {
    console.log('📡 Manual retry triggered');
    retryCountRef.current = 0;
    loadConfig(true);
  };

  return { config, loading, error, retry };
}