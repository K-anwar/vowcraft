export default function InvitationCard({ config, guest }) {
  return (
    <div
      className="p-8 md:p-10 rounded-3xl text-center backdrop-blur-sm relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-card)', boxShadow: 'var(--shadow)', borderRadius: 'var(--radius)' }}
    >
      <div className="absolute top-0 left-0 w-full h-1.5" style={{ backgroundColor: 'var(--primary)' }}></div>

      <p className="text-sm tracking-widest uppercase" style={{ color: 'var(--accent)' }}>We Are Getting Married</p>
      <h1 className="text-5xl md:text-6xl font-bold my-4" style={{ fontFamily: 'var(--font-title)', color: 'var(--primary-dark)' }}>
        {config.bride} <span className="text-3xl">&</span> {config.groom}
      </h1>
      <p className="italic opacity-80" style={{ color: 'var(--text-soft)' }}>Kepada Yth. <strong>{guest}</strong></p>

      <div className="mt-8 grid grid-cols-2 gap-4 text-left">
        <div>
          <p className="text-sm uppercase tracking-wide" style={{ color: 'var(--accent)' }}>Akad & Resepsi</p>
          <p className="font-semibold">
            {new Date(config.eventDate).toLocaleDateString('id-ID', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
          <p className="font-medium">
            {new Date(config.eventDate).toLocaleTimeString('id-ID', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <div>
          <p className="text-sm uppercase tracking-wide" style={{ color: 'var(--accent)' }}>Lokasi</p>
          <p className="font-semibold">{config.location}</p>
          <p className="text-sm" style={{ color: 'var(--text-soft)' }}>{config.address}</p>
        </div>
      </div>

      <a
        href={config.mapsUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-6 text-sm underline underline-offset-2"
        style={{ color: 'var(--primary-dark)' }}
      >
        Buka di Google Maps
      </a>
    </div>
  );
}