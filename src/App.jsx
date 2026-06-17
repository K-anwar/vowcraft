import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Analytics from './components/Analytics';
import HomePage from './pages/HomePage';
import InvitationPage from './pages/InvitationPage';
import RSVPPage from './pages/RSVPPage';
import CheckinPage from './pages/CheckinPage';
import LandingPage from './pages/LandingPage';
import AdminPage from './pages/AdminPage'; // ← Tambahkan

function App() {
  return (
    <HashRouter>
      <Analytics />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/:slug" element={<HomePage />} />
        <Route path="/:slug/invitation" element={<InvitationPage />} />
        <Route path="/:slug/rsvp" element={<RSVPPage />} />
        <Route path="/:slug/checkin" element={<CheckinPage />} />
        <Route path="/:slug/admin" element={<AdminPage />} /> {/* ← Tambahkan */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
}

export default App;