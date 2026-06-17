# 💍 Digital Wedding Invitation

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-8-purple)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4)

Undangan pernikahan digital premium dengan fitur lengkap: amplop digital, RSVP, QR check-in, wedding gift, 8 tema, dan admin dashboard.

---

## ✨ Fitur Premium

| Fitur | Deskripsi |
|-------|-----------|
| 💌 Amplop Digital | Animasi amplop pembuka dengan confetti |
| 🎨 8 Tema | Romantic, Elegant, Islami, Pastel, Rustic, Glamour, Minimalis, Tropical |
| 📝 RSVP Form | Konfirmasi kehadiran terintegrasi Google Sheets |
| 📱 QR Check-in | Scan QR untuk check-in otomatis saat hadir |
| 🎵 Musik Otomatis | Musik mulai saat amplop dibuka |
| 💕 Love Story | Timeline kisah cinta pasangan |
| 🎁 Wedding Gift | Hadiah dengan logo bank & e-wallet |
| 📊 Admin Dashboard | Pantau RSVP & check-in real-time |
| 🌸 Animasi AOS | Scroll animation yang elegan |
| 📈 Analytics | Google Analytics 4 terintegrasi |
| 🔍 SEO | Meta tags lengkap untuk sharing |

---

## 🚀 Quick Start

### Prasyarat
- Node.js 20+
- npm 10+

### Install

\`\`\`bash
# Clone repository
git clone https://github.com/k-anwar/digital-invitation.git
cd digital-invitation

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env dengan konfigurasi kamu

# Development
npm run dev

# Build
npm run build

# Preview
npm run preview
\`\`\`

---

## 📁 Struktur Proyek

\`\`\`
digital-invitation/
├── public/
│   ├── config/          # JSON customer (multi customer)
│   └── assets/          # Foto & musik
├── src/
│   ├── components/      # Komponen React
│   ├── pages/           # Halaman
│   ├── hooks/           # Custom hooks
│   ├── services/        # API services
│   └── themes/          # CSS variables (8 tema)
├── .github/workflows/   # Deploy otomatis
├── .env.example         # Template environment
├── vite.config.js
└── package.json
\`\`\`

---

## 👥 Multi Customer

Tambah customer baru dengan membuat file JSON di `public/config/`:

\`\`\`json
{
  "slug": "nama-pasangan",
  "bride": "Nama Pengantin Wanita",
  "groom": "Nama Pengantin Pria",
  "theme": "romantic",
  ...
}
\`\`\`

Link undangan: `https://username.github.io/digital-invitation/#/nama-pasangan?guest=Tamu`

---

## 🎨 Tema Tersedia

| Tema | Slug | Warna |
|------|------|-------|
| Romantic | `romantic` | Pink & Rose |
| Elegant | `elegant` | Red & Maroon |
| Islami | `islami` | Green & Gold |
| Pastel | `pastel` | Soft Blue |
| Rustic | `rustic` | Brown Earthy |
| Glamour | `glamour` | Black & Gold |
| Minimalis | `minimalis` | Grey & White |
| Tropical | `tropical` | Coral & Orange |

---

## 📊 Google Sheets Setup

1. Buat Google Sheet
2. **Ekstensi > Apps Script**
3. Copy script dari `docs/google-apps-script.js`
4. Deploy sebagai Web App (Anyone)
5. Copy URL ke `googleScriptUrl` di JSON customer

---

## 🚢 Deployment

### GitHub Pages (Manual)
1. Push ke branch `main`
2. Buka tab **Actions**
3. Jalankan workflow **Deploy to GitHub Pages**
4. Website live di `https://username.github.io/digital-invitation/`

---

## 🔒 Environment Variables

Copy `.env.example` ke `.env`:

\`\`\`env
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/.../exec
\`\`\`

---

## 📝 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---

## 👨‍💻 Author

**Khoirul Anwar**
- Instagram: [@rizza_lutfi](https://instagram.com/rizza_lutfi)
- WhatsApp: [0895384947265](https://wa.me/62895384947265)

---

## 🙏 Credits

- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [AOS](https://michalsnik.github.io/aos)
- [QRCode.react](https://www.npmjs.com/package/qrcode.react)