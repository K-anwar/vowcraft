import { useEffect, useState } from 'react';

export default function Ornament() {
  const [ornament, setOrnament] = useState('🌸');

  useEffect(() => {
    const style = getComputedStyle(document.documentElement);
    const value = style.getPropertyValue('--ornament').trim().replace(/['"]/g, '');
    if (value) setOrnament(value);
  }, []);

  return (
    <>
      {/* Kiri atas */}
      <div className="fixed top-5 left-5 opacity-10 text-8xl select-none pointer-events-none z-0">
        {ornament}
      </div>
      
      {/* Kanan bawah */}
      <div className="fixed bottom-5 right-5 opacity-10 text-8xl select-none pointer-events-none z-0">
        {ornament}
      </div>
      
      {/* Kanan tengah */}
      <div className="fixed top-1/3 right-10 opacity-5 text-7xl select-none pointer-events-none z-0">
        {ornament}
      </div>
      
      {/* Kiri tengah */}
      <div className="fixed bottom-1/3 left-10 opacity-5 text-6xl select-none pointer-events-none z-0">
        {ornament}
      </div>
    </>
  );
}