import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { HelmetProvider } from 'react-helmet-async';

// Inisialisasi AOS - TIDAK DI-DISABLE DI MOBILE
AOS.init({
  duration: 800,
  once: true,
  easing: 'ease-in-out',
  offset: 100,
  // HAPUS atau ubah menjadi false
  disable: false,
});

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);