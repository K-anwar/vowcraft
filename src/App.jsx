import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InvitationPage from './pages/InvitationPage';
import RSVPPage from './pages/RSVPPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Halaman cover pembuka */}
        <Route path="/:slug" element={<HomePage />} />
        {/* Undangan lengkap */}
        <Route path="/:slug/invitation" element={<InvitationPage />} />
        {/* Halaman RSVP terpisah */}
        <Route path="/:slug/rsvp" element={<RSVPPage />} />
        {/* Jika slug tidak ditemukan, redirect ke contoh */}
        <Route path="*" element={<Navigate to="/wedding-romantic" />} />
      </Routes>
    </HashRouter>
  );
}

export default App;