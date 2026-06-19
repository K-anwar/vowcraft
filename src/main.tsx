import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { HelmetProvider } from 'react-helmet-async';

// Inisialisasi AOS
AOS.init({
  duration: 800,
  once: true,
  easing: 'ease-in-out',
  offset: 100,
  disable: window.innerWidth < 768 ? true : false, // Nonaktif di mobile untuk performa
});

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);