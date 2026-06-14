import { useParams, useSearchParams } from 'react-router-dom';
import useCustomerConfig from '../hooks/useCustomerConfig';
import RSVPForm from '../components/RSVPForm';

export default function RSVPPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const guest = searchParams.get('guest') || 'Bapak/Ibu';
  const { config, loading, error } = useCustomerConfig(slug);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Memuat...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <div className="w-full max-w-md">
        <RSVPForm guest={guest} slug={slug} googleScriptUrl={config.googleScriptUrl} />
      </div>
    </div>
  );
}