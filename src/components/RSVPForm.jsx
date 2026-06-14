import { useState } from 'react';
import { submitRSVP } from '../services/googleSheets';

export default function RSVPForm({ guest, slug, googleScriptUrl }) {
  const [attending, setAttending] = useState('yes');
  const [pax, setPax] = useState(1);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!googleScriptUrl) {
      alert('URL Google Sheets belum dikonfigurasi.');
      return;
    }
    setLoading(true);
    try {
      await submitRSVP(googleScriptUrl, { guest, attending, pax, message, slug });
      setSubmitted(true);
    } catch (err) {
      alert('Gagal mengirim RSVP, silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted)
    return (
      <div
        className="p-8 text-center rounded-3xl"
        style={{ backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}
      >
        <p className="text-3xl mb-2">💖</p>
        <p className="text-xl font-semibold" style={{ color: 'var(--primary-dark)' }}>Terima kasih!</p>
        <p>RSVP Anda telah tercatat.</p>
      </div>
    );

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 p-8 rounded-3xl backdrop-blur-sm"
      style={{ backgroundColor: 'var(--bg-card)', boxShadow: 'var(--shadow)', borderRadius: 'var(--radius)' }}
    >
      <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-title)', color: 'var(--primary-dark)' }}>
        Konfirmasi Kehadiran
      </h2>
      <p className="text-lg">Nama: <strong>{guest}</strong></p>

      <div>
        <label className="block mb-1 font-medium">Kehadiran</label>
        <select
          value={attending}
          onChange={(e) => setAttending(e.target.value)}
          className="w-full p-3 rounded-lg border focus:ring-2"
          style={{ borderColor: 'var(--primary-light)', color: 'var(--text)' }}
        >
          <option value="yes">Ya, saya hadir</option>
          <option value="no">Maaf, tidak bisa hadir</option>
        </select>
      </div>

      {attending === 'yes' && (
        <div>
          <label className="block mb-1 font-medium">Jumlah orang</label>
          <input
            type="number"
            min="1"
            value={pax}
            onChange={(e) => setPax(parseInt(e.target.value) || 1)}
            className="w-full p-3 rounded-lg border"
            style={{ borderColor: 'var(--primary-light)' }}
          />
        </div>
      )}

      <div>
        <label className="block mb-1 font-medium">Ucapan & Doa</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="w-full p-3 rounded-lg border"
          style={{ borderColor: 'var(--primary-light)' }}
          placeholder="Selamat menempuh hidup baru..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-full text-white font-semibold tracking-wide transition hover:opacity-90 disabled:opacity-50"
        style={{ backgroundColor: 'var(--primary)' }}
      >
        {loading ? 'Mengirim...' : 'Kirim RSVP'}
      </button>
    </form>
  );
}