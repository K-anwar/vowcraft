import { useEffect, useState } from 'react';

const HEARTS = ['❤️', '💕', '💗', '💖', '💘', '💝', '🌸', '✨'] as const;

interface Particle {
  id: number;
  left: number;
  delay: number;
  duration: number;
  emoji: string;
}

interface ConfettiProps {
  active: boolean;
}

export default function Confetti({ active }: ConfettiProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    const newParticles: Particle[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 3,
      emoji: HEARTS[Math.floor(Math.random() * HEARTS.length)],
    }));
    setParticles(newParticles);

    const timer = setTimeout(() => {
      setParticles([]);
    }, 5000);

    return () => clearTimeout(timer);
  }, [active]);

  if (!active || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute text-2xl"
          style={{
            left: `${p.left}%`,
            animation: `fall ${p.duration}s ease-in ${p.delay}s forwards`,
            top: '-5%',
          }}
        >
          {p.emoji}
        </div>
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}