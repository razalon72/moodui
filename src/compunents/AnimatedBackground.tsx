import React from 'react';

export const AnimatedBackground: React.FC = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    {/* Dark gradient background */}
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
    
    {/* Gradient Orbs with larger blur and opacity */}
    <div className="absolute top-0 left-0 w-full h-full">
      <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-purple-500/10 rounded-full 
        animate-pulse transform -translate-x-1/2 -translate-y-1/2 blur-[100px]" />
      <div className="absolute top-3/4 right-1/4 w-[40rem] h-[40rem] bg-blue-500/10 rounded-full 
        animate-pulse transform translate-x-1/2 translate-y-1/2 blur-[100px]" />
      <div className="absolute bottom-1/4 left-1/2 w-[40rem] h-[40rem] bg-emerald-500/10 rounded-full 
        animate-pulse delay-700 transform -translate-x-1/2 translate-y-1/2 blur-[100px]" />
    </div>

    {/* Subtle radial gradient overlay */}
    <div 
      className="absolute inset-0 opacity-50"
      style={{
        background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)'
      }}
    />
  </div>
);