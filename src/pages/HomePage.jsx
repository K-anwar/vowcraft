import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import useCustomerConfig from '../hooks/useCustomerConfig';
import Envelope from '../components/Envelope';

export default function HomePage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const guest = searchParams.get('guest') || 'Bapak/Ibu';
  const { config, loading, error } = useCustomerConfig(slug);
  const navigate = useNavigate();

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
        <p className="text-lg animate-pulse">Memuat undangan...</p>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg)', color: 'red' }}>
        {error}
      </div>
    );

  const handleNavigateToInvitation = () => {
    navigate(`/${slug}/invitation?guest=${encodeURIComponent(guest)}`);
  };

  // Konten di dalam amplop setelah dibuka
  const envelopeContent = (
    <div className="text-center space-y-6">
      <div className="space-y-2">
        <p className="text-sm tracking-widest uppercase" style={{ color: 'var(--accent)' }}>
          Wedding Invitation
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold"
          style={{ fontFamily: 'var(--font-title)', color: 'var(--primary-dark)' }}
        >
          {config.bride} & {config.groom}
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--accent)' }}>
            Hari & Tanggal
          </p>
          <p className="font-semibold">
            {new Date(config.eventDate).toLocaleDateString('id-ID', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
          <p className="text-sm" style={{ color: 'var(--text-soft)' }}>
            Pukul{' '}
            {new Date(config.eventDate).toLocaleTimeString('id-ID', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--accent)' }}>
            Lokasi
          </p>
          <p className="font-semibold">{config.location}</p>
          <p className="text-sm" style={{ color: 'var(--text-soft)' }}>
            {config.address}
          </p>
        </div>
      </div>

      <p className="italic text-sm" style={{ color: 'var(--text-soft)' }}>
        Kepada Yth. <strong>{guest}</strong>
      </p>

      <a
        href={config.mapsUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-block text-sm underline underline-offset-2"
        style={{ color: 'var(--primary-dark)' }}
      >
        Buka di Google Maps
      </a>
    </div>
  );

  return (
    <Envelope config={config} guest={guest} onOpenInvitation={handleNavigateToInvitation}>
      {envelopeContent}
    </Envelope>
  );
}