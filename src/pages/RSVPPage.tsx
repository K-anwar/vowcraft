import { useParams, useSearchParams } from 'react-router-dom';
import useCustomerConfig from '@/hooks/useCustomerConfig';
import RSVPForm from '@/components/RSVPForm';
import Ornament from '@/components/Ornament';
import LoadingScreen from '@/components/LoadingScreen';

export default function RSVPPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const guest = searchParams.get('guest') || 'Bapak/Ibu';
  const { config, loading, error } = useCustomerConfig(slug || '');

  if (loading) return <LoadingScreen />;
  if (error || !config) return <div className="min-h-screen flex items-center justify-center text-red-500">{error || 'Undangan tidak ditemukan'}</div>;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12 relative"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <Ornament />
      <div className="w-full max-w-md relative z-10">
        <RSVPForm guest={guest} slug={slug || ''} googleScriptUrl={config.googleScriptUrl} />
      </div>
    </div>
  );
}