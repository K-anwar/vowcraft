import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import useCustomerConfig from '@/hooks/useCustomerConfig';
import Envelope from '@/components/Envelope';
import LoadingScreen from '@/components/LoadingScreen';

export default function HomePage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const guest = searchParams.get('guest') || 'Bapak/Ibu';
  const { config, loading, error } = useCustomerConfig(slug || '');
  const navigate = useNavigate();
  const baseUrl = import.meta.env.BASE_URL || '/';

  const bridePhotoUrl = useMemo(() => {
    if (!config?.bridePhoto) return '';
    return config.bridePhoto.startsWith('http')
      ? config.bridePhoto
      : `${baseUrl}${config.bridePhoto.replace(/^\.\//, '').replace(/^\//, '')}`;
  }, [config?.bridePhoto, baseUrl]);

  const groomPhotoUrl = useMemo(() => {
    if (!config?.groomPhoto) return '';
    return config.groomPhoto.startsWith('http')
      ? config.groomPhoto
      : `${baseUrl}${config.groomPhoto.replace(/^\.\//, '').replace(/^\//, '')}`;
  }, [config?.groomPhoto, baseUrl]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg)', color: 'red' }}>
        {error || 'Undangan tidak ditemukan'}
      </div>
    );
  }

  const handleNavigateToInvitation = () => {
    navigate(`/${slug}/invitation?guest=${encodeURIComponent(guest)}`);
  };

  const envelopeContent = (
    <div className="text-center space-y-6">
      {(bridePhotoUrl || groomPhotoUrl) && (
        <div className="flex justify-center items-center gap-3">
          {bridePhotoUrl && (
            <div
              className="w-20 h-20 rounded-full overflow-hidden border-2 shadow-md"
              style={{ borderColor: 'var(--primary-light)' }}
            >
              <img src={bridePhotoUrl} alt={config.bride} className="w-full h-full object-cover" />
            </div>
          )}
          <div className="text-xl text-pink-400">&</div>
          {groomPhotoUrl && (
            <div
              className="w-20 h-20 rounded-full overflow-hidden border-2 shadow-md"
              style={{ borderColor: 'var(--primary-light)' }}
            >
              <img src={groomPhotoUrl} alt={config.groom} className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      )}

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
    <>
      <Envelope config={config} onOpenInvitation={handleNavigateToInvitation}>
        {envelopeContent}
      </Envelope>
    </>
  );
}