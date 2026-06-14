import { useState, useEffect } from 'react';

export default function useCustomerConfig(slug) {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Sesuaikan base path (sama dengan di vite.config)
    fetch(`${import.meta.env.BASE_URL}config/${slug}.json`)
      .then((res) => {
        if (!res.ok) throw new Error('Undangan tidak ditemukan');
        return res.json();
      })
      .then((data) => {
        setConfig(data);
        // Set atribut tema global
        document.documentElement.setAttribute('data-theme', data.theme || 'romantic');
        // Ganti judul halaman
        document.title = `Undangan ${data.bride} & ${data.groom}`;
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  return { config, loading, error };
}