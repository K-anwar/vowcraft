import { useState, useCallback, memo } from 'react';
import { WeddingGiftItem } from '@/types';

interface WeddingGiftProps {
  giftConfig?: WeddingGiftItem[];
}

function WeddingGift({ giftConfig }: WeddingGiftProps) {
  const [selected, setSelected] = useState<WeddingGiftItem | null>(null);
  const [copied, setCopied] = useState(false);
  const baseUrl = import.meta.env.BASE_URL || '/';

  if (!giftConfig || giftConfig.length === 0) return null;

  const handleSelect = useCallback((gift: WeddingGiftItem) => {
    setSelected(gift);
  }, []);

  const handleCopy = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  const isAddress = selected?.type === 'Alamat Rumah';

  return (
    <div className="space-y-6">
      <h2
        className="text-3xl font-bold text-center mb-8"
        style={{ fontFamily: 'var(--font-title)', color: 'var(--primary-dark)' }}
      >
        🎁 Wedding Gift
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {giftConfig.map((gift, index) => (
          <button
            key={index}
            onClick={() => handleSelect(gift)}
            className="p-4 rounded-2xl text-center transition-all hover:scale-105 shadow-md flex flex-col items-center gap-2"
            style={{
              backgroundColor: 'var(--bg-card)',
              boxShadow: 'var(--shadow)',
              border: selected?.type === gift.type ? '2px solid var(--primary)' : '2px solid transparent',
            }}
          >
            {gift.logo ? (
              <img
                src={
                  gift.logo.startsWith('http')
                    ? gift.logo
                    : `${baseUrl}${gift.logo.replace(/^\.\//, '').replace(/^\//, '')}`
                }
                alt={gift.bank || gift.type}
                className="w-12 h-12 object-contain"
                loading="lazy"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            ) : (
              <span className="text-3xl">{gift.icon || '💝'}</span>
            )}
            <span className="text-xs font-semibold">{gift.type}</span>
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="mt-6 p-6 rounded-2xl text-center animate-fadeIn"
          style={{ backgroundColor: 'var(--bg-card)', boxShadow: 'var(--shadow)' }}
        >
          <div className="mb-4">
            {selected.logo ? (
              <img
                src={
                  selected.logo.startsWith('http')
                    ? selected.logo
                    : `${baseUrl}${selected.logo.replace(/^\.\//, '').replace(/^\//, '')}`
                }
                alt={selected.bank || selected.type}
                className="w-20 h-20 mx-auto object-contain"
                loading="lazy"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            ) : (
              <span className="text-5xl">{selected.icon || '💝'}</span>
            )}
          </div>

          <p className="text-lg font-semibold mb-2" style={{ color: 'var(--primary-dark)' }}>
            {selected.type}
          </p>
          {selected.bank && <p className="text-sm font-medium opacity-70 mb-3">{selected.bank}</p>}

          <div className="space-y-3 mb-4">
            <p className="text-xs uppercase tracking-wider opacity-70">
              {isAddress ? 'Alamat' : 'No. Rekening'}
            </p>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <p
                className={`tracking-wider select-all bg-gray-50 px-4 py-2 rounded-lg ${
                  isAddress ? 'text-base font-normal' : 'text-xl font-mono font-bold'
                }`}
              >
                {selected.number}
              </p>
              <button
                onClick={() => handleCopy(selected.number)}
                className="px-4 py-2 rounded-full text-sm text-white transition hover:opacity-80 flex items-center gap-1"
                style={{ backgroundColor: 'var(--primary)' }}
                aria-label="Salin nomor rekening"
              >
                {copied ? '✅ Tersalin' : '📋 Salin'}
              </button>
            </div>
          </div>

          {selected.name && (
            <p className="text-sm font-semibold mt-2">a.n. {selected.name}</p>
          )}
        </div>
      )}

      <p className="text-center text-sm italic opacity-70 mt-6" style={{ color: 'var(--text-soft)' }}>
        Doa restu Anda merupakan karunia yang sangat berarti bagi kami.
        {selected && ' Terima kasih atas kebaikan hati Anda.'}
      </p>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default memo(WeddingGift);