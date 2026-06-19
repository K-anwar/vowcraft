import { useState, useEffect } from 'react';
import SEO from '@/components/SEO';
import type { LandingConfig } from '@/types';

export default function LandingPage() {
  const [config, setConfig] = useState<LandingConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const baseUrl = import.meta.env.BASE_URL || '/';
    const controller = new AbortController();

    fetch(`${baseUrl}config/landing.json`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<LandingConfig>;
      })
      .then((data) => setConfig(data))
      .catch((err) => {
        if (err.name === 'AbortError') return;
        console.error('Landing load error:', err);
        setError('Gagal memuat halaman. Silakan refresh.');
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <div className="animate-spin text-4xl">💍</div>
      </div>
    );
  }

  if (error || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50 text-red-500">
        {error || 'Data tidak tersedia'}
      </div>
    );
  }

  const whatsappLink = `https://wa.me/${config.contact.whatsapp}?text=Halo%20Digital%20Wedding%20Invitation,%20saya%20ingin%20pesan%20undangan%20pernikahan`;

  return (
    <div className="min-h-screen bg-linear-to-b from-pink-50 to-white">
      <SEO
        title={`${config.brandName} - ${config.tagline}`}
        description={config.description}
        image={config.heroImage}
        keywords="undangan pernikahan digital, wedding invitation online, undangan online"
      />

      <header className="relative overflow-hidden bg-linear-to-r from-pink-100 to-rose-100">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif', color: '#b56576' }}>
              {config.brandName}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">{config.tagline}</p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10">{config.description}</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition shadow-lg text-lg"
              >
                💬 Pesan Sekarang
              </a>
              <a
                href="#pricing"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-white text-pink-600 rounded-full font-semibold hover:shadow-lg transition border-2 border-pink-200 text-lg"
              >
                Lihat Paket
              </a>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-1 w-full">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 50C240 0 480 100 720 50C960 0 1200 100 1440 50V100H0V50Z" fill="white" />
          </svg>
        </div>
      </header>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ fontFamily: 'Playfair Display, serif', color: '#b56576' }}>
            Fitur Premium
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {config.features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-pink-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ fontFamily: 'Playfair Display, serif', color: '#b56576' }}>
            Cara Pemesanan
          </h2>
          <div className="space-y-6">
            {config.howToOrder.map((item) => (
              <div key={item.step} className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow">
                <div className="w-12 h-12 rounded-full bg-pink-200 flex items-center justify-center text-xl font-bold text-pink-600 shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-gray-500">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#b56576' }}>
            Pilih Paket
          </h2>
          <p className="text-center text-gray-500 mb-12">Sesuaikan dengan kebutuhan acara Anda</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {config.pricing.map((pkg, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-xl p-8 relative ${pkg.popular ? 'ring-2 ring-pink-400 scale-105' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    POPULER
                  </div>
                )}
                <h3 className="text-2xl font-bold text-center mb-2">{pkg.name}</h3>
                <p className="text-4xl font-bold text-center mb-6" style={{ color: pkg.color }}>
                  {pkg.price}
                </p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-center py-3 rounded-full text-white font-semibold hover:opacity-90 transition"
                  style={{ backgroundColor: pkg.color }}
                >
                  Pilih Paket
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-pink-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ fontFamily: 'Playfair Display, serif', color: '#b56576' }}>
            Testimoni
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {config.testimonials.map((testi, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow">
                <div className="flex items-center gap-2 mb-3">
                  {[...Array(testi.rating)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4">"{testi.message}"</p>
                <p className="font-semibold">{testi.name}</p>
                <p className="text-sm text-gray-400">{testi.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-linear-to-r from-pink-400 to-rose-400">
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Siap Membuat Undangan Impian Anda?
          </h2>
          <p className="text-lg mb-8 opacity-90">Pesan sekarang dan dapatkan undangan digital premium dalam 1-3 hari kerja</p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-block px-8 py-4 bg-white text-pink-600 rounded-full font-semibold hover:shadow-lg transition text-lg"
          >
            💬 Pesan via WhatsApp
          </a>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-lg font-bold mb-2">{config.brandName}</p>
          <div className="flex justify-center gap-4 mb-4 flex-wrap">
            <a href={`https://instagram.com/${config.contact.instagram}`} target="_blank" rel="noreferrer" className="hover:text-pink-400 transition">
              📸 Instagram
            </a>
            <a href={`https://wa.me/${config.contact.whatsapp}`} target="_blank" rel="noreferrer" className="hover:text-pink-400 transition">
              💬 WhatsApp
            </a>
            <a href={`mailto:${config.contact.email}`} className="hover:text-pink-400 transition">
              📧 Email
            </a>
          </div>
          <p className="text-sm opacity-70">© 2026 {config.brandName}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}