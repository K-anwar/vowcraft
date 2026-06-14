import { useState, useEffect, useRef } from 'react';
import Confetti from './Confetti'; // Opsional, hapus jika tidak pakai

export default function Envelope({ config, guest, children, onOpenInvitation }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const audioRef = useRef(null);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    // Mainkan suara amplop jika ada
    if (config.envelopeSound && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
    // Tunda kemunculan konten sampai animasi flap selesai (700ms)
    setTimeout(() => {
      setShowContent(true);
    }, 600);
  };

  useEffect(() => {
    // Preload suara
    if (config.envelopeSound) {
      audioRef.current = new Audio(config.envelopeSound);
      audioRef.current.volume = 0.4;
    }
  }, [config.envelopeSound]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at center, var(--primary-light) 0%, var(--bg) 70%)`,
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* Dekorasi bunga */}
      <div className="absolute top-10 left-10 opacity-20 text-9xl select-none">🌸</div>
      <div className="absolute bottom-10 right-10 opacity-20 text-9xl select-none">🌹</div>

      <Confetti active={isOpen} />

      {/* Container amplop */}
      <div className="relative w-full max-w-md mx-auto" style={{ perspective: '1200px' }}>
        {/* Badan amplop (belakang) */}
        <div
          className="relative w-full rounded-2xl shadow-2xl overflow-hidden"
          style={{
            backgroundColor: 'var(--primary-light)',
            minHeight: '420px',
            boxShadow: 'var(--shadow), 0 15px 40px rgba(0,0,0,0.2)',
          }}
        >
          {/* Ornamen */}
          <div
            className="absolute inset-3 border-2 border-dashed rounded-xl opacity-30"
            style={{ borderColor: 'var(--primary)' }}
          ></div>

          {/* Isi amplop (muncul setelah buka) */}
          <div
            className={`p-8 transition-all duration-700 ease-in-out ${
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ maxHeight: '80vh', overflowY: 'auto' }}
          >
            {children}

            {/* Tombol ke undangan lengkap */}
            {showContent && onOpenInvitation && (
              <div className="mt-6 text-center">
                <button
                  onClick={onOpenInvitation}
                  className="px-8 py-3 rounded-full text-white font-semibold tracking-wide hover:opacity-90 transition-all transform hover:scale-105 shadow-lg"
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  Lihat Undangan Lengkap →
                </button>
              </div>
            )}
          </div>

          {/* Konten default sebelum dibuka (tampil di badan amplop) */}
          {!isOpen && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <p className="text-sm tracking-widest uppercase mb-2" style={{ color: 'var(--accent)' }}>
                The Wedding Of
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ fontFamily: 'var(--font-title)', color: 'var(--primary-dark)' }}
              >
                {config.bride} & {config.groom}
              </h2>
              <p className="text-md italic" style={{ color: 'var(--text-soft)' }}>
                {new Date(config.eventDate).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          )}
        </div>

        {/* Flap penutup amplop */}
        <div
          className={`absolute top-0 left-0 w-full h-full rounded-2xl transition-all duration-700 ease-in-out origin-top z-20 ${
            isOpen ? '-rotate-x-180 opacity-0 pointer-events-none' : 'rotate-x-0 opacity-100'
          }`}
          style={{
            background: `linear-gradient(135deg, var(--primary-light) 0%, var(--bg) 100%)`,
            boxShadow: 'var(--shadow)',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Segel / lak */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg cursor-pointer hover:scale-110 transition-transform"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'white',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              }}
              onClick={handleOpen}
            >
              💌
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: 'var(--primary)' }}></div>
        </div>

        {/* Tombol buka di luar (jika belum terbuka) */}
        {!isOpen && (
          <div className="mt-6 text-center">
            <button
              onClick={handleOpen}
              className="px-8 py-3 rounded-full text-white font-semibold tracking-wide hover:opacity-90 transition-all transform hover:scale-105 shadow-lg"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              ✉️ Buka Undangan
            </button>
            <p className="text-xs mt-2 opacity-70" style={{ color: 'var(--text-soft)' }}>
              Klik untuk membuka undangan
            </p>
          </div>
        )}
      </div>
    </div>
  );
}