import { useState, useEffect, useRef } from 'react';
import { WeddingConfig } from '@/types';

// Cache berdasarkan slug
const configCache = new Map<string, WeddingConfig>();

const fetchWithRetry = async (
  url: string,
  signal?: AbortSignal,
  retries = 2,
  delay = 1000
): Promise<Response> => {
  let lastError: Error | null = null;
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, { signal });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} - ${res.statusText}`);
      }
      return res;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
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
}

export default function useCustomerConfig(slug: string): UseCustomerConfigResult {
  const [config, setConfig] = useState<WeddingConfig | null>(() => {
    return configCache.get(slug) || null;
  });
  const [loading, setLoading] = useState<boolean>(!configCache.has(slug));
  const [error, setError] = useState<string | null>(null);
  const lastSlugRef = useRef(slug);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // Jika slug berubah dan ada di cache
    if (slug !== lastSlugRef.current) {
      lastSlugRef.current = slug;
      if (configCache.has(slug)) {
        setConfig(configCache.get(slug)!);
        setLoading(false);
        setError(null);
        return;
      }
    }

    // Batalkan request sebelumnya
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const baseUrl = import.meta.env.BASE_URL || '/';

    const loadConfig = async () => {
      if (!slug) {
        setError('Slug tidak valid');
        setLoading(false);
        return;
      }

      // Cek cache (race condition)
      if (configCache.has(slug)) {
        setConfig(configCache.get(slug)!);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetchWithRetry(
          `${baseUrl}config/${slug}.json`,
          controller.signal,
          2,
          1000
        );
        const data = (await response.json()) as WeddingConfig;

        // Validasi minimal
        if (!data.bride || !data.groom || !data.eventDate) {
          throw new Error('Konfigurasi tidak lengkap');
        }

        configCache.set(slug, data);
        setConfig(data);
        document.documentElement.setAttribute('data-theme', data.theme || 'romantic');
        document.title = `Undangan ${data.bride} & ${data.groom}`;
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          // Abort adalah normal
          return;
        }
        const message = err instanceof Error ? err.message : 'Gagal memuat undangan';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadConfig();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
    };
  }, [slug]);

  return { config, loading, error };
}