import React from 'react';
import moodLogo from '../assests/mood.png';

export const MoodLogo: React.FC = () => (
  <div className="flex items-center">
    <img 
      src={moodLogo} 
      alt="Mood" 
      className="h-8 w-auto"
    />
  </div>
);