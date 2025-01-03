import React from 'react';

interface GlowEffectProps {
  color: string;
}

export const GlowEffect: React.FC<GlowEffectProps> = ({ color }) => (
  <div 
    className={`absolute -inset-4 ${color} opacity-20 blur-xl rounded-full animate-pulse`}
  />
);