import { useParams, useSearchParams, Link } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import useCustomerConfig from '../hooks/useCustomerConfig';
import InvitationCard from '../components/InvitationCard';
import FlipCountdown from '../components/FlipCountdown';
import Gallery from '../components/Gallery';
import MusicPlayer from '../components/MusicPlayer';
import QRCodeGenerator from '../components/QRCodeGenerator';
import LoveStory from '../components/LoveStory';
import ShareButton from '../components/ShareButton';
import DressCode from '../components/DressCode';
import SEO from '../components/SEO';
import Ornament from '../components/Ornament';

const WishesWall = lazy(() => import('../components/WishesWall'));
const WeddingGift = lazy(() => import('../components/WeddingGift'));

export default function InvitationPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const guest = searchParams.get('guest') || 'Bapak/Ibu';
  const { config, loading, error } = useCustomerConfig(slug);
  const baseUrl = import.meta.env.BASE_URL;

  if (loading) return <div className="min-h-screen flex items-center justify-center">Memuat...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

  const checkinUrl = `${window.location.origin}/digital-invitation/#/${slug}/checkin?guest=${encodeURIComponent(guest)}`;
  const seoImage = config.gallery?.[0]?.startsWith('http') 
    ? config.gallery[0] 
    : `${window.location.origin}${baseUrl}${config.gallery?.[0]?.replace(/^\.\//, '').replace(/^\//, '') || ''}`;

  return (
    <div
      className="min-h-screen py-10 px-4 relative overflow-hidden"
      style={{
        backgroundColor: 'var(--bg)',
        color: 'var(--text)',
        fontFamily: 'var(--font-body)',
        backgroundImage: 'radial-gradient(circle at 20% 30%, var(--primary-light) 0%, transparent 50%)',
      }}
    >
      <SEO 
        title={`Undangan Pernikahan ${config.bride} & ${config.groom}`}
        description={`Kepada Yth. ${guest}, kami mengundang Anda untuk hadir di acara pernikahan ${config.bride} & ${config.groom}`}
        image={seoImage}
      />

      {/* Ornamen tema */}
      <Ornament />

      <ShareButton config={config} guest={guest} />
      <MusicPlayer src={config.music} />

      <div className="max-w-2xl mx-auto space-y-12 relative z-10">
        {/* Quote Pembuka */}
        {config.openingQuote && (
          <div data-aos="fade-down" className="text-center px-4 py-6 rounded-2xl"
            style={{ backgroundColor: 'var(--bg-card)', boxShadow: 'var(--shadow)' }}>
            <p className="text-lg italic leading-relaxed" style={{ color: 'var(--text-soft)' }}>
              "{config.openingQuote}"
            </p>
          </div>
        )}

        {/* Kartu Undangan */}
        <div data-aos="fade-up">
          <InvitationCard config={config} guest={guest} />
        </div>

        {/* Orang Tua */}
        <div data-aos="fade-up" data-aos-delay="100">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 rounded-2xl" style={{ backgroundColor: 'var(--bg-card)' }}>
              <p className="text-xs uppercase tracking-wide" style={{ color: 'var(--accent)' }}>Orang Tua Mempelai Wanita</p>
              <p className="font-semibold mt-1">{config.brideParents}</p>
            </div>
            <div className="p-4 rounded-2xl" style={{ backgroundColor: 'var(--bg-card)' }}>
              <p className="text-xs uppercase tracking-wide" style={{ color: 'var(--accent)' }}>Orang Tua Mempelai Pria</p>
              <p className="font-semibold mt-1">{config.groomParents}</p>
            </div>
          </div>
        </div>

        {/* Countdown Flip */}
        <div data-aos="zoom-in" data-aos-delay="200">
          <FlipCountdown targetDate={config.eventDate} />
        </div>

        {/* Love Story */}
        <div data-aos="fade-right">
          <LoveStory stories={config.loveStory} />
        </div>

        {/* Galeri */}
        <div data-aos="fade-up">
          <Gallery images={config.gallery} />
        </div>

        {/* Google Maps */}
        {config.mapsEmbedUrl && (
          <div data-aos="fade-up" className="space-y-3">
            <h3 className="text-2xl font-bold text-center"
              style={{ fontFamily: 'var(--font-title)', color: 'var(--primary-dark)' }}>
              📍 Lokasi Acara
            </h3>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <iframe src={config.mapsEmbedUrl} width="100%" height="300" style={{ border: 0 }}
                allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <a href={config.mapsUrl} target="_blank" rel="noreferrer"
              className="block text-center text-sm underline" style={{ color: 'var(--primary-dark)' }}>
              Buka di Google Maps
            </a>
          </div>
        )}

        {/* Dress Code */}
        {config.dressCode && (
          <div data-aos="fade-up">
            <DressCode dressCode={config.dressCode} />
          </div>
        )}

        {/* Wedding Gift */}
        <Suspense fallback={<div className="text-center py-8">Memuat...</div>}>
          {config.weddingGift && (
            <div data-aos="fade-up">
              <WeddingGift giftConfig={config.weddingGift} />
            </div>
          )}
        </Suspense>

        {/* QR Code Check-in */}
        <div data-aos="zoom-in" className="flex flex-col items-center gap-4 bg-white/50 backdrop-blur-sm p-6 rounded-2xl">
          <h3 className="text-xl font-semibold" style={{ color: 'var(--primary-dark)' }}>
            Scan QR Code Saat Hadir
          </h3>
          <div className="bg-white p-4 rounded-2xl shadow-lg">
            <QRCodeGenerator value={checkinUrl} size={180} />
          </div>
          <p className="text-sm opacity-80 text-center">Scan QR code ini saat tiba di lokasi</p>
        </div>

        {/* Tombol RSVP */}
        <div data-aos="fade-up" className="flex flex-col items-center gap-3">
          <Link to={`/${slug}/rsvp?guest=${encodeURIComponent(guest)}`}
            className="px-8 py-4 rounded-full text-white font-semibold transition hover:opacity-90 shadow-lg text-lg"
            style={{ backgroundColor: 'var(--primary)' }}>
            📝 Konfirmasi Kehadiran
          </Link>
        </div>

        {/* Ucapan & Doa */}
        <Suspense fallback={<div className="text-center py-8">Memuat...</div>}>
          <div data-aos="fade-up">
            <WishesWall googleScriptUrl={config.googleScriptUrl} />
          </div>
        </Suspense>

        {/* Footer */}
        <div data-aos="fade-up" className="text-center py-8 border-t border-gray-200 space-y-3">
          <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-title)', color: 'var(--primary-dark)' }}>
            {config.bride} & {config.groom}
          </p>
          {config.instagram && (
            <p className="text-sm" style={{ color: 'var(--text-soft)' }}>Instagram: @{config.instagram}</p>
          )}
          {config.contactPerson && (
            <p className="text-sm" style={{ color: 'var(--text-soft)' }}>Kontak: {config.contactPerson}</p>
          )}
          <p className="text-xs opacity-50 mt-4">© 2026 Wedding Invitation. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}