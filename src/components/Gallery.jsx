export default function Gallery({ images }) {
  if (!images || images.length === 0) return null;
  return (
    <div>
      <h3 className="text-center text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-title)', color: 'var(--primary-dark)' }}>
        Galeri Cinta
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((src, index) => (
          <div key={index} className="rounded-xl overflow-hidden shadow-md transition-transform hover:scale-105">
            <img src={src} alt={`Moment ${index + 1}`} className="w-full h-40 object-cover" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}