import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, var(--primary-light) 0%, var(--bg) 50%, var(--primary-light) 100%)',
      }}
    >
      <div className="relative">
        <div
          className="w-24 h-24 border-4 rounded-full animate-spin"
          style={{ borderColor: 'var(--primary)', borderTopColor: 'transparent' }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl">💍</span>
        </div>
      </div>
      <p
        className="mt-6 text-lg font-semibold animate-pulse"
        style={{ color: 'var(--primary-dark)', fontFamily: 'var(--font-title)' }}
      >
        Mempersiapkan Undangan...
      </p>
    </div>
  );
}