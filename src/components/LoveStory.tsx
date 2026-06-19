import { LoveStoryItem } from '@/types';

interface LoveStoryProps {
  stories?: LoveStoryItem[];
}

export default function LoveStory({ stories }: LoveStoryProps) {
  if (!stories || stories.length === 0) return null;

  return (
    <div className="space-y-6">
      <h2
        className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8"
        style={{ fontFamily: 'var(--font-title)', color: 'var(--primary-dark)' }}
      >
        💕 Kisah Cinta Kami
      </h2>

      <div className="relative px-2 md:px-0">
        {/* Garis vertikal - di mobile di kiri, di desktop di tengah */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-pink-300 to-rose-400"></div>

        <div className="space-y-6 md:space-y-8">
          {stories.map((story, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className="flex-1 text-left md:text-right pl-8 md:pl-0">
                <div
                  className="bg-white rounded-2xl p-4 shadow-lg inline-block w-full md:w-auto"
                  style={{ backgroundColor: 'var(--bg-card)', boxShadow: 'var(--shadow)' }}
                >
                  <p className="text-xs md:text-sm font-semibold" style={{ color: 'var(--primary-dark)' }}>
                    {story.date}
                  </p>
                  <h4 className="text-base md:text-lg font-bold mt-1">{story.title}</h4>
                  <p className="text-sm mt-2" style={{ color: 'var(--text-soft)' }}>
                    {story.description}
                  </p>
                </div>
              </div>

              <div
                className="relative z-10 shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg mt-1"
                style={{ backgroundColor: 'var(--primary)' }}
                aria-hidden="true"
              >
                <span className="text-sm">💖</span>
              </div>

              <div className="flex-1 hidden md:block"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}