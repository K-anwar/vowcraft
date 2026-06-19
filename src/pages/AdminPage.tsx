import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useCustomerConfig from '@/hooks/useCustomerConfig';
import Ornament from '@/components/Ornament';
import LoadingScreen from '@/components/LoadingScreen';

interface Stats {
  totalRSVP: number;
  attending: number;
  notAttending: number;
  checkedIn: number;
  totalWishes: number;
}

interface StatCardProps {
  icon: string;
  label: string;
  value: number | string;
  color: string;
}

const StatCard = ({ icon, label, value, color }: StatCardProps) => (
  <div
    className="p-4 rounded-2xl text-center hover:scale-105 transition-transform"
    style={{ backgroundColor: 'var(--bg-card)', boxShadow: 'var(--shadow)' }}
  >
    <div className="text-2xl mb-2">{icon}</div>
    <div className="text-2xl font-bold" style={{ color }}>
      {value}
    </div>
    <div className="text-xs mt-1 opacity-70">{label}</div>
  </div>
);

export default function AdminPage() {
  const { slug } = useParams<{ slug: string }>();
  const { config, loading: configLoading } = useCustomerConfig(slug || '');
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Simulasi API call
        await new Promise((resolve) => setTimeout(resolve, 1200));
        setStats({
          totalRSVP: 150,
          attending: 120,
          notAttending: 30,
          checkedIn: 85,
          totalWishes: 45,
        });
      } catch {
        setError('Gagal memuat statistik');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const attendanceRate = useMemo(() => {
    if (!stats || stats.attending === 0) return 0;
    return Math.round((stats.checkedIn / stats.attending) * 100);
  }, [stats]);

  if (configLoading || loading) {
    return <LoadingScreen />;
  }

  if (error || !config || !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg)' }}>
        <p className="text-red-500">{error || 'Data tidak tersedia'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 relative" style={{ backgroundColor: 'var(--bg)' }}>
      <Ornament />
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-title)', color: 'var(--primary-dark)' }}>
            📊 Dashboard Admin
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-soft)' }}>
            {config.bride} & {config.groom}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <StatCard icon="📝" label="Total RSVP" value={stats.totalRSVP} color="#6366f1" />
          <StatCard icon="✅" label="Hadir" value={stats.attending} color="#22c55e" />
          <StatCard icon="❌" label="Tidak Hadir" value={stats.notAttending} color="#ef4444" />
          <StatCard icon="📍" label="Check-in" value={stats.checkedIn} color="#f59e0b" />
          <StatCard icon="💝" label="Ucapan" value={stats.totalWishes} color="#ec4899" />
          <StatCard icon="📊" label="Tamu Check-in" value={`${attendanceRate}%`} color="#8b5cf6" />
        </div>

        <div className="p-6 rounded-2xl" style={{ backgroundColor: 'var(--bg-card)', boxShadow: 'var(--shadow)' }}>
          <h3 className="text-lg font-semibold mb-4">Progress Kehadiran</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>RSVP Hadir</span>
                <span>{stats.attending} orang</span>
              </div>
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all duration-500 rounded-full"
                  style={{ width: `${(stats.attending / (stats.totalRSVP || 1)) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Sudah Check-in</span>
                <span>{stats.checkedIn} orang</span>
              </div>
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-500 transition-all duration-500 rounded-full"
                  style={{ width: `${(stats.checkedIn / (stats.attending || 1)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}