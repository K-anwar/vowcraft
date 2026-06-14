export default function Cover({ config, onOpen }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--primary-light) 0%, var(--bg) 100%)',
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* Dekorasi bunga */}
      <div className="absolute top-10 left-10 opacity-20 text-9xl">🌸</div>
      <div className="absolute bottom-10 right-10 opacity-20 text-9xl">🌹</div>

      <div
        className="relative z-10 max-w-md w-full bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-lg"
        style={{ boxShadow: 'var(--shadow)', borderRadius: 'var(--radius)' }}
      >
        <p className="text-sm tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
          The Wedding Of
        </p>
        <h1
          className="text-5xl font-bold mt-4 mb-2"
          style={{ fontFamily: 'var(--font-title)', color: 'var(--primary-dark)' }}
        >
          {config.bride} & {config.groom}
        </h1>
        <p className="text-md italic" style={{ color: 'var(--text-soft)' }}>
          {new Date(config.eventDate).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <button
          onClick={onOpen}
          className="mt-8 px-8 py-3 rounded-full text-white font-semibold tracking-wide hover:opacity-90 transition-all transform hover:scale-105"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          Buka Undangan
        </button>
      </div>
    </div>
  );
}