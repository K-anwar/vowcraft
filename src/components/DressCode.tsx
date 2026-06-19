import { DressCode as DressCodeType } from '@/types';

interface DressCodeProps {
  dressCode?: DressCodeType;
}

export default function DressCode({ dressCode }: DressCodeProps) {
  if (!dressCode) return null;

  return (
    <div className="text-center space-y-3">
      <h3
        className="text-2xl md:text-3xl font-semibold"
        style={{ fontFamily: 'var(--font-title)', color: 'var(--primary-dark)' }}
      >
        🎨 Dress Code
      </h3>
      <div
        className="inline-block px-6 py-4 rounded-2xl backdrop-blur-sm w-full md:w-auto"
        style={{ backgroundColor: 'var(--bg-card)', boxShadow: 'var(--shadow)' }}
      >
        <p className="text-base md:text-lg font-medium" style={{ color: 'var(--primary-dark)' }}>
          {dressCode.color}
        </p>
        <p className="text-sm mt-2 wrap-break-word" style={{ color: 'var(--text-soft)' }}>
          {dressCode.description}
        </p>
      </div>
    </div>
  );
}