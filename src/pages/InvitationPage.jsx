import { useParams, useSearchParams, Link } from 'react-router-dom';
import useCustomerConfig from '../hooks/useCustomerConfig';
import InvitationCard from '../components/InvitationCard';
import Countdown from '../components/Countdown';
import Gallery from '../components/Gallery';
import MusicPlayer from '../components/MusicPlayer';
import QRCodeGenerator from '../components/QRCodeGenerator';

export default function InvitationPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const guest = searchParams.get('guest') || 'Bapak/Ibu';
  const { config, loading, error } = useCustomerConfig(slug);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Memuat...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

  // Link RSVP dengan nama tamu
  const rsvpUrl = `${window.location.origin}${window.location.pathname}#/${slug}/rsvp?guest=${encodeURIComponent(guest)}`;

  return (
    <div
      className="min-h-screen py-10 px-4"
      style={{
        backgroundColor: 'var(--bg)',
        color: 'var(--text)',
        fontFamily: 'var(--font-body)',
        backgroundImage: 'radial-gradient(circle at 20% 30%, var(--primary-light) 0%, transparent 50%)',
      }}
    >
      {/* Tombol Musik */}
      <MusicPlayer src={config.music} />

      <div className="max-w-2xl mx-auto space-y-10">
        {/* Kartu Undangan */}
        <InvitationCard config={config} guest={guest} />

        {/* Countdown */}
        <Countdown targetDate={config.eventDate} />

        {/* Galeri */}
        <Gallery images={config.gallery} />

        {/* QR Code RSVP */}
        <div className="flex flex-col items-center gap-4">
          <div className="bg-white p-3 rounded-2xl shadow-lg">
            <QRCodeGenerator value={rsvpUrl} size={160} />
          </div>
          <p className="text-sm opacity-80">Scan QR untuk RSVP</p>
          <Link
            to={`/${slug}/rsvp?guest=${encodeURIComponent(guest)}`}
            className="px-6 py-2 rounded-full text-white font-semibold transition hover:opacity-90"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            Buka Form RSVP
          </Link>
        </div>

        <p className="text-center text-sm italic opacity-75" style={{ color: 'var(--text-soft)' }}>
          “Merupakan suatu kehormatan apabila Bapak/Ibu/Saudara/i berkenan hadir.”
        </p>
      </div>
    </div>
  );
}