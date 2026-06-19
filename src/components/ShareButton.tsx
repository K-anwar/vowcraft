import { WeddingConfig } from '@/types';

interface ShareButtonProps {
  config: WeddingConfig;
  guest: string;
}

export default function ShareButton({ config, guest }: ShareButtonProps) {
  const invitationUrl = window.location.href;

  const shareText = `*${config.bride} & ${config.groom}*\n\nKepada Yth. ${guest}\n\nKami mengundang Anda untuk hadir di acara pernikahan kami:\n\n📅 ${new Date(config.eventDate).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}\n📍 ${config.location}\n\nBuka undangan digital:\n${invitationUrl}\n\nMohon konfirmasi kehadiran melalui link tersebut. Terima kasih 🙏`;

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-24 right-5 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg text-white text-2xl hover:scale-110 transition-transform"
      style={{ backgroundColor: '#25D366' }}
      aria-label="Share ke WhatsApp"
    >
      💬
    </a>
  );
}