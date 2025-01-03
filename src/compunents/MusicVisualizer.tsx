import React from 'react';

export const MusicVisualizerBars: React.FC = () => (
  <div className="absolute inset-0 flex items-center justify-center gap-1">
    {Array.from({ length: 4 }).map((_, i) => (
      <div
        key={i}
        className="w-1 bg-white/40 rounded-full"
        style={{
          height: '16px',
          animation: `musicBar ${0.5 + Math.random() * 0.5}s ease-in-out infinite alternate`,
          animationDelay: `${i * 0.1}s`
        }}
      />
    ))}
  </div>
);