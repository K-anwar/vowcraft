import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// GANTI dengan Measurement ID asli kamu
const GA_TRACKING_ID = 'G-H1JYV4M9YM';

export default function Analytics() {
  const location = useLocation();

  useEffect(() => {
    if (!GA_TRACKING_ID || GA_TRACKING_ID === 'G-H1JYV4M9YM') {
      console.warn('Google Analytics ID belum dikonfigurasi');
      return;
    }

    // Load Google Analytics script
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

  }, []);

  // Track page views
  useEffect(() => {
    if (window.gtag && GA_TRACKING_ID !== 'G-H1JYV4M9YM') {
      window.gtag('config', GA_TRACKING_ID, {
        page_path: location.pathname + location.hash,
        page_title: document.title
      });
    }
  }, [location]);

  return null;
}