import { useState, useEffect } from 'react';

function FlipUnit({ value, label }) {
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
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-16 h-20 md:w-20 md:h-24">
        {/* Background static number */}
        <div 
          className="absolute inset-0 rounded-xl flex items-center justify-center text-2xl md:text-4xl font-bold shadow-lg"
          style={{ 
            backgroundColor: 'var(--bg-card)', 
            color: 'var(--primary-dark)',
            boxShadow: 'var(--shadow), inset 0 2px 4px rgba(0,0,0,0.1)',
            fontFamily: 'var(--font-title)'
          }}
        >
          <span className="relative z-10">{String(value).padStart(2, '0')}</span>
          
          {/* Flip animation overlay */}
          {flip && (
            <div className="absolute inset-0 animate-flip rounded-xl" 
              style={{ 
                backgroundColor: 'var(--primary-light)',
                transformOrigin: 'bottom',
              }}
            />
          )}
          
          {/* Center line */}
          <div className="absolute inset-x-0 top-1/2 h-px bg-black/10 z-20" />
        </div>
      </div>
      <span 
        className="text-xs uppercase tracking-wider font-semibold"
        style={{ color: 'var(--text-soft)' }}
      >
        {label}
      </span>
    </div>
  );
}

export default function FlipCountdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  function calculateTimeLeft(date) {
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
      <h3 
        className="text-center text-2xl font-bold mb-6"
        style={{ fontFamily: 'var(--font-title)', color: 'var(--primary-dark)' }}
      >
        Menuju Hari Bahagia
      </h3>
      <div className="flex justify-center gap-3 md:gap-5">
        {units.map((unit) => (
          <FlipUnit key={unit.label} value={unit.value} label={unit.label} />
        ))}
      </div>
    </div>
  );
}