import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Analytics from '@/components/Analytics';
import ErrorBoundary from '@/components/ErrorBoundary';
import LoadingScreen from '@/components/LoadingScreen';

const HomePage = lazy(() => import('@/pages/HomePage'));
const InvitationPage = lazy(() => import('@/pages/InvitationPage'));
const RSVPPage = lazy(() => import('@/pages/RSVPPage'));
const CheckinPage = lazy(() => import('@/pages/CheckinPage'));
const LandingPage = lazy(() => import('@/pages/LandingPage'));
const AdminPage = lazy(() => import('@/pages/AdminPage'));

function App() {
  return (
    <HashRouter>
      <Analytics />
      <ErrorBoundary>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/:slug/admin" element={<AdminPage />} />
            <Route path="/:slug/invitation" element={<InvitationPage />} />
            <Route path="/:slug/rsvp" element={<RSVPPage />} />
            <Route path="/:slug/checkin" element={<CheckinPage />} />
            <Route path="/:slug" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </HashRouter>
  );
}

export default App;