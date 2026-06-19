import { useState, useEffect, useRef, useCallback, memo, ReactNode } from 'react';
import Confetti from './Confetti';
import Ornament from './Ornament';
import { WeddingConfig } from '@/types';

interface EnvelopeProps {
  config: WeddingConfig;
  children: ReactNode;
  onOpenInvitation?: () => void;
}

function Envelope({ config, children, onOpenInvitation }: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const baseUrl = import.meta.env.BASE_URL || '/';

  const audioSrc = useCallback(() => {
    if (!config?.music) return null;
    return config.music.startsWith('http')
      ? config.music
      : `${baseUrl}${config.music.replace(/^\.\//, '').replace(/^\//, '')}`;
  }, [config?.music, baseUrl]);

  useEffect(() => {
    const src = audioSrc();
    if (!src) return;

    const audio = new Audio(src);
    audio.volume = 0.5;
    audio.loop = true;
    audio.addEventListener('error', () => setAudioError(true));
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, [audioSrc]);

  const handleOpen = useCallback(() => {
    if (isOpen) return;
    setIsOpen(true);

    if (audioRef.current && !audioError) {
      audioRef.current.play().catch(() => {
        // Autoplay diblokir browser, tidak perlu error
        console.debug('Autoplay diblokir');
      });
    }

    setTimeout(() => {
      setShowContent(true);
    }, 600);
  }, [isOpen, audioError]);

  const handleInvitationClick = useCallback(() => {
    if (onOpenInvitation) onOpenInvitation();
  }, [onOpenInvitation]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at center, var(--primary-light) 0%, var(--bg) 70%)`,
        fontFamily: 'var(--font-body)',
      }}
    >
      <Ornament />
      <Confetti active={isOpen} />

      <div className="relative w-full max-w-md mx-auto z-10" style={{ perspective: '1200px' }}>
        <div
          className="relative w-full rounded-2xl shadow-2xl overflow-hidden"
          style={{
            backgroundColor: 'var(--primary-light)',
            minHeight: '420px',
            boxShadow: 'var(--shadow), 0 15px 40px rgba(0,0,0,0.2)',
          }}
        >
          <div
            className="absolute inset-3 border-2 rounded-xl opacity-30"
            style={{
              borderColor: 'var(--primary)',
              borderStyle: 'var(--border-style, dashed)',
            }}
          />

          <div
            className={`p-8 transition-all duration-700 ease-in-out ${
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ maxHeight: '80vh', overflowY: 'auto' }}
          >
            {children}

            {showContent && onOpenInvitation && (
              <div className="mt-6 text-center">
                <button
                  onClick={handleInvitationClick}
                  className="px-8 py-3 rounded-full text-white font-semibold tracking-wide hover:opacity-90 transition-all transform hover:scale-105 shadow-lg"
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  Lihat Undangan Lengkap →
                </button>
              </div>
            )}
          </div>

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
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg cursor-pointer hover:scale-110 transition-transform"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'white',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              }}
              onClick={handleOpen}
              role="button"
              tabIndex={0}
              aria-label="Buka undangan"
              onKeyDown={(e) => e.key === 'Enter' && handleOpen()}
            >
              💌
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: 'var(--primary)' }} />
        </div>

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

export default memo(Envelope);