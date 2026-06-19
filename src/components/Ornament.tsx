import { useEffect, useState } from 'react';

export default function Ornament() {
  const [ornament, setOrnament] = useState('🌸');
  const [ornament2, setOrnament2] = useState('💮');

  useEffect(() => {
    const style = getComputedStyle(document.documentElement);
    const value = style.getPropertyValue('--ornament').trim().replace(/['"]/g, '');
    const value2 = style.getPropertyValue('--ornament-2').trim().replace(/['"]/g, '');
    if (value) setOrnament(value);
    if (value2) setOrnament2(value2);
  }, []);

  return (
    <>
      <div className="fixed top-8 left-8 opacity-15 text-7xl select-none pointer-events-none z-0 animate-float">
        {ornament}
      </div>
      <div
        className="fixed bottom-8 right-8 opacity-15 text-7xl select-none pointer-events-none z-0 animate-float"
        style={{ animationDelay: '1.5s' }}
      >
        {ornament}
      </div>
      <div
        className="fixed top-1/3 right-12 opacity-8 text-6xl select-none pointer-events-none z-0 animate-float"
        style={{ animationDelay: '0.7s' }}
      >
        {ornament2}
      </div>
      <div
        className="fixed bottom-1/3 left-12 opacity-8 text-6xl select-none pointer-events-none z-0 animate-float"
        style={{ animationDelay: '2.2s' }}
      >
        {ornament2}
      </div>
    </>
  );
}