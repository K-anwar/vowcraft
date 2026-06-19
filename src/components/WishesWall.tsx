import { useState, useEffect, memo } from 'react';

interface Wish {
  name: string;
  message: string;
  date: string;
}

function WishesWall() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulasi data ucapan (karena Google Sheets tidak bisa di-read dari frontend dengan CORS)
    const demoWishes: Wish[] = [
      { name: 'Keluarga Budi', message: 'Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.', date: '2026-06-15' },
      { name: 'Sahabat Ani', message: 'Happy wedding! Semoga langgeng sampai kakek nenek 💕', date: '2026-06-16' },
      { name: 'Rekan Kerja', message: 'Selamat ya Rizza & Anwar! Semoga bahagia selalu 🎉', date: '2026-06-16' },
    ];

    const timer = setTimeout(() => {
      setWishes(demoWishes);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <div className="text-center py-8">Memuat ucapan...</div>;

  return (
    <div className="space-y-6">
      <h2
        className="text-3xl font-bold text-center mb-8"
        style={{ fontFamily: 'var(--font-title)', color: 'var(--primary-dark)' }}
      >
        💝 Ucapan & Doa
      </h2>

      <div className="grid gap-4">
        {wishes.map((wish, index) => (
          <div
            key={index}
            className="bg-white/90 rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform"
            style={{ boxShadow: 'var(--shadow)' }}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                style={{ backgroundColor: 'var(--primary-light)' }}
              >
                💌
              </div>
              <div className="flex-1">
                <p className="font-semibold" style={{ color: 'var(--primary-dark)' }}>
                  {wish.name}
                </p>
                <p className="text-sm mt-2" style={{ color: 'var(--text-soft)' }}>
                  "{wish.message}"
                </p>
                <p className="text-xs mt-2 opacity-50">{wish.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(WishesWall);