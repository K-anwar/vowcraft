import { useState, useRef, useEffect } from 'react';

export default function MusicPlayer({ src }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(new Audio(src));

  const toggle = () => {
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  useEffect(() => {
    audioRef.current.volume = 0.4;
  }, []);

  return (
    <button
      onClick={toggle}
      className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg text-white text-xl"
      style={{ backgroundColor: playing ? 'var(--primary-dark)' : 'var(--primary)' }}
      aria-label="Toggle music"
    >
      {playing ? '🎵' : '🔇'}
    </button>
  );
}