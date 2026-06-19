import { useState, useEffect } from 'react';

interface FlipUnitProps {
  value: number;
  label: string;
}

function FlipUnit({ value, label }: FlipUnitProps) {
  const [prevValue, setPrevValue] = useState(value);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (value !== prevValue) {
      setFlip(true);
      setPrevValue(value);
      setTimeout(() => setFlip(false), 300);
    }
  }, [value, prevValue]);

  return (
    <div className="flex flex-col items-center gap-1 md:gap-2">
      <div className="relative w-14 h-18 md:w-20 md:h-24">
        <div
          className="absolute inset-0 rounded-xl flex items-center justify-center text-xl md:text-4xl font-bold shadow-lg"
          style={{
            background: 'var(--primary-gradient)',
            color: 'white',
            fontFamily: 'var(--font-title)',
          }}
        >
          <span className="relative z-10">{String(value).padStart(2, '0')}</span>
          {flip && (
            <div
              className="absolute inset-0 animate-flip rounded-xl"
              style={{
                backgroundColor: 'rgba(255,255,255,0.3)',
                transformOrigin: 'bottom',
              }}
            />
          )}
          <div className="absolute inset-x-0 top-1/2 h-px bg-white/20 z-20" />
        </div>
      </div>
      <span className="text-[10px] md:text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--text-soft)' }}>
        {label}
      </span>
    </div>
  );
}

interface FlipCountdownProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function FlipCountdown({ targetDate }: FlipCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  function calculateTimeLeft(date: string): TimeLeft {
    const difference = +new Date(date) - +new Date();
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  const units = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds },
  ];

  return (
    <div className="space-y-4">
      <h3 className="section-title text-2xl md:text-3xl">Menuju Hari Bahagia</h3>
      <div className="flex justify-center gap-2 md:gap-5">
        {units.map((unit) => (
          <FlipUnit key={unit.label} value={unit.value} label={unit.label} />
        ))}
      </div>
    </div>
  );
}