import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID || 'G-XXXXXXXXXX';

export default function Analytics() {
  const location = useLocation();

  useEffect(() => {
    if (!GA_TRACKING_ID || GA_TRACKING_ID === 'G-XXXXXXXXXX') {
      // Nonaktifkan di production jika tidak ada ID
      if (import.meta.env.PROD) {
        console.warn('⚠️ Google Analytics ID belum dikonfigurasi');
      }
      return;
    }

    // Hapus script yang sudah ada untuk menghindari duplikasi
    const existingScript = document.querySelector(
      `script[src*="googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}"]`
    );
    if (existingScript) {
      existingScript.remove();
    }

    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_TRACKING_ID}', {
        page_path: window.location.pathname + window.location.hash,
        send_page_view: false
      });
    `;
    document.head.appendChild(script2);

    return () => {
      if (script1.parentNode) script1.parentNode.removeChild(script1);
      if (script2.parentNode) script2.parentNode.removeChild(script2);
    };
  }, []);

  useEffect(() => {
    if (
      typeof window.gtag === 'function' &&
      GA_TRACKING_ID !== 'G-XXXXXXXXXX'
    ) {
      window.gtag('config', GA_TRACKING_ID, {
        page_path: location.pathname + location.hash,
        page_title: document.title,
      });
    }
  }, [location]);

  return null;
}