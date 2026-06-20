import { useMemo } from 'react';
import type { WeddingConfig } from '@/types';
import { getMediaUrl, getCloudinaryThumbnail } from '@/utils/imageHelper';

interface InvitationCardProps {
  config: WeddingConfig;
  guest: string;
}

export default function InvitationCard({ config, guest }: InvitationCardProps) {
  const baseUrl = import.meta.env.BASE_URL || '/';

  // AMAN: gunakan fallback jika foto tidak ada
  const bridePhotoUrl = useMemo(() => {
    if (!config?.bridePhoto) return '';
    try {
      const url = getMediaUrl(config.bridePhoto, baseUrl);
      return getCloudinaryThumbnail(url, 300, 300);
    } catch {
      return '';
    }
  }, [config?.bridePhoto, baseUrl]);

  const groomPhotoUrl = useMemo(() => {
    if (!config?.groomPhoto) return '';
    try {
      const url = getMediaUrl(config.groomPhoto, baseUrl);
      return getCloudinaryThumbnail(url, 300, 300);
    } catch {
      return '';
    }
  }, [config?.groomPhoto, baseUrl]);

  // AMAN: format tanggal dengan fallback
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return dateStr || '';
    }
  };

  const formatTime = (dateStr?: string) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return '';
      return date.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return '';
    }
  };

  // AMAN: gunakan fallback jika akadDate/resepsiDate tidak ada
  const akadDate = config?.akadDate || config?.eventDate || '';
  const resepsiDate = config?.resepsiDate || config?.eventDate || '';
  const isAkadDifferent = config?.akadDate && config?.akadDate !== config?.eventDate;
  const isResepsiDifferent = config?.resepsiDate && config?.resepsiDate !== config?.eventDate;

  // Jika tidak ada data, tampilkan pesan minimal
  if (!config) {
    return (
      <div className="p-6 text-center text-gray-500">
        <p>Data undangan tidak tersedia</p>
      </div>
    );
  }

  return (
    <div
      className="p-6 md:p-10 text-center relative overflow-hidden glass-card"
      style={{ borderRadius: 'var(--radius-lg)' }}
      role="article"
      aria-label="Kartu undangan pernikahan"
    >
      <div className="absolute top-0 left-0 w-full h-1.5" style={{ background: 'var(--primary-gradient)' }}></div>

      <p className="text-xs md:text-sm tracking-widest uppercase mb-4 md:mb-6" style={{ color: 'var(--accent)', letterSpacing: '0.3em' }}>
        We Are Getting Married
      </p>

      {(bridePhotoUrl || groomPhotoUrl) && (
        <div className="flex justify-center items-center gap-3 md:gap-4 my-6 md:my-8">
          {bridePhotoUrl && (
            <div
              className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden animate-border-glow"
              style={{
                border: '3px var(--border-style) var(--border-color)',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <img
                src={bridePhotoUrl}
                alt={config.bride || 'Pengantin Wanita'}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  console.warn('Foto pengantin wanita gagal dimuat');
                }}
              />
            </div>
          )}
          <span className="text-2xl md:text-3xl gradient-text font-bold" aria-hidden="true">&</span>
          {groomPhotoUrl && (
            <div
              className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden animate-border-glow"
              style={{
                border: '3px var(--border-style) var(--border-color)',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <img
                src={groomPhotoUrl}
                alt={config.groom || 'Pengantin Pria'}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  console.warn('Foto pengantin pria gagal dimuat');
                }}
              />
            </div>
          )}
        </div>
      )}

      <h1
        className="text-3xl md:text-5xl lg:text-7xl font-bold my-4 md:my-6 gradient-text text-balance"
        style={{ fontFamily: 'var(--font-title)' }}
      >
        {config.bride || 'Pengantin Wanita'} <span className="text-2xl md:text-4xl" style={{ color: 'var(--primary)' }}>&</span> {config.groom || 'Pengantin Pria'}
      </h1>

      <p className="italic text-base md:text-lg mb-2" style={{ color: 'var(--text-soft)' }}>
        Kepada Yth.
      </p>
      <p className="text-lg md:text-xl font-semibold mb-6 md:mb-8 wrap-break-word" style={{ color: 'var(--primary-dark)' }}>
        {guest || 'Tamu Undangan'}
      </p>

      <hr className="premium-divider" />

      <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {/* Akad */}
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>
            Akad Nikah
          </p>
          <p className="font-bold text-base md:text-lg" style={{ color: 'var(--text)' }}>
            {formatDate(akadDate)}
          </p>
          <p className="text-sm mt-1" style={{ color: 'var(--text-soft)' }}>
            Pukul {formatTime(akadDate)}
          </p>
          {isAkadDifferent && (
            <p className="text-xs mt-1 opacity-60" style={{ color: 'var(--text-light)' }}>
              *Berbeda dengan resepsi
            </p>
          )}
        </div>

        {/* Resepsi */}
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>
            Resepsi
          </p>
          <p className="font-bold text-base md:text-lg" style={{ color: 'var(--text)' }}>
            {formatDate(resepsiDate)}
          </p>
          <p className="text-sm mt-1" style={{ color: 'var(--text-soft)' }}>
            Pukul {formatTime(resepsiDate)}
          </p>
          {isResepsiDifferent && (
            <p className="text-xs mt-1 opacity-60" style={{ color: 'var(--text-light)' }}>
              *Berbeda dengan akad
            </p>
          )}
        </div>

        {/* Lokasi */}
        <div className="sm:col-span-2 text-center pt-2 border-t" style={{ borderColor: 'var(--border-color)' }}>
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>
            Lokasi
          </p>
          <p className="font-bold text-base md:text-lg" style={{ color: 'var(--text)' }}>
            {config.location || 'Lokasi belum ditentukan'}
          </p>
          <p className="text-sm mt-1 wrap-break-word" style={{ color: 'var(--text-soft)' }}>
            {config.address || 'Alamat belum diisi'}
          </p>
        </div>
      </div>

      <a
        href={config.mapsUrl || '#'}
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-6 md:mt-8 text-sm font-medium hover:opacity-70 transition"
        style={{ color: 'var(--primary)' }}
        aria-label="Buka lokasi di Google Maps"
      >
        📍 Buka di Google Maps
      </a>
    </div>
  );
}