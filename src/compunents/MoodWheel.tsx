import React, { useState, useRef, useEffect } from 'react';
import { Music, User, RefreshCw } from 'lucide-react';
import { MOODS, WHEEL_RADIUS, CENTER_CIRCLE_SIZE, getWheelSize, getWheelRadius } from '../constants/moods';
import { Position, Mood } from '../types';
import { AnimatedBackground } from './AnimatedBackground';
import { MusicVisualizerBars } from './MusicVisualizer';
import { GlowEffect } from './GlowEffect';
import { MoodLogo } from './MoodLogo';
import { MoodOption } from './MoodOption';
import { ResetButton } from './ResetButton';
import { UserMenu } from './UserMenu';

export const MoodWheel: React.FC = () => {
  const [bottomMoodText, setBottomMoodText] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [wheelSize, setWheelSize] = useState(288); // Default size
  const [wheelRadius, setWheelRadius] = useState(140);
  
  useEffect(() => {
    const updateSize = () => {
      const newWheelSize = getWheelSize();
      setWheelSize(newWheelSize);
      setWheelRadius(getWheelRadius(newWheelSize));
    };

    // Initial size
    updateSize();

    // Update on resize
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const getMoodPosition = (index: number, total: number): Position => {
    const angle = (index * (2 * Math.PI)) / total - (Math.PI / 2);
    const radius = wheelSize / 2; // Use the full radius to position on the border
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle)
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setPosition({ x: 0, y: 0 }); // Only reset position, keep the mood
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedMood(null);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const centerX = container.width / 2;
    const centerY = container.height / 2;
    
    const mouseX = e.clientX - container.left - centerX;
    const mouseY = e.clientY - container.top - centerY;
    const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
    
    let closestMood: Mood | null = null;
    let closestDistance = Infinity;
    
    MOODS.forEach((mood, index) => {
      const moodPos = getMoodPosition(index, MOODS.length);
      const dx = moodPos.x - mouseX;
      const dy = moodPos.y - mouseY;
      const moodDistance = Math.sqrt(dx * dx + dy * dy);
      
      if (moodDistance < closestDistance) {
        closestDistance = moodDistance;
        closestMood = mood;
      }
    });

    if (closestMood && distance > CENTER_CIRCLE_SIZE / 2) {
      const moodIndex = MOODS.findIndex(m => m.name === closestMood?.name);
      const moodPosition = getMoodPosition(moodIndex, MOODS.length);
      setPosition(moodPosition);
      setSelectedMood(closestMood);
    } else {
      setPosition({ x: mouseX, y: mouseY });
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <AnimatedBackground />

      <div className="relative w-full min-h-screen p-4 flex flex-col backdrop-blur-sm">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 p-4 rounded-lg bg-white/5 backdrop-blur-md">
          <MoodLogo />
          <UserMenu />
        </div>

        {/* Wheel Container */}
        <div 
          ref={containerRef}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            width: `${wheelSize}px`,
            height: `${wheelSize}px`
          }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-xl" />
          <div className="absolute inset-0 border-4 border-gray-700/80 rounded-full overflow-visible backdrop-blur-sm" />
          
          {/* Center Circle */}
          <div className="absolute top-0 left-0 w-full h-full">
            {selectedMood && <GlowEffect color={selectedMood.color} />}
            <div 
              className={`absolute top-1/2 left-1/2 w-32 h-32 rounded-full flex flex-col items-center justify-center cursor-grab active:cursor-grabbing transition-all duration-300 ${
                selectedMood ? selectedMood.color : 'bg-white/90'
              } backdrop-blur-sm shadow-lg ${
                selectedMood ? 'shadow-' + selectedMood.color.replace('bg-', '') + '/50' : ''
              }`}
              style={{
                transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`
              }}
              onMouseDown={handleMouseDown}
            >
              <input
                type="text"
                value={selectedMood?.name || ''}
                className={`w-20 text-center bg-transparent ${selectedMood ? 'text-white' : 'text-gray-900'} text-sm relative z-10`}
                placeholder="What's your Mood?!"
                readOnly
              />
              <Music className={`w-6 h-6 mt-1 ${selectedMood ? 'text-white' : 'text-gray-900'} relative z-10`} />
              {selectedMood && <MusicVisualizerBars />}
              {selectedMood && <ResetButton onReset={handleReset} />}
            </div>
          </div>

          {/* Mood Options */}
          {MOODS.map((mood, index) => {
            const moodPos = getMoodPosition(index, MOODS.length);
            const finalPos = {
              x: (wheelSize / 2) + moodPos.x,  // Center horizontally
              y: (wheelSize / 2) + moodPos.y   // Center vertically
            };
            return (
              <MoodOption
                key={mood.name}
                mood={mood}
                position={finalPos}
                isSelected={selectedMood?.name === mood.name}
                wheelSize={wheelSize}
              />
            );
          })}
        </div>

        {/* Bottom Input */}
        <div className="fixed bottom-12 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
          <div className="text-center mb-4">
            <h2 className="text-white text-lg">Or type the music you wanna hear</h2>
          </div>
          <div className="w-full flex gap-4">
            <input
              type="text"
              value={bottomMoodText}
              onChange={(e) => setBottomMoodText(e.target.value)}
              className="flex-1 bg-white/5 text-white rounded-full px-6 py-2 border-2 border-gray-700/50 focus:border-purple-500 focus:outline-none text-base transition-all duration-300 backdrop-blur-sm"
              placeholder="Enter your mood "
            />
            <button className="bg-purple-500 text-white px-6 py-2 rounded-full hover:bg-purple-600 transition-colors shadow-lg shadow-purple-500/20">
              <Music className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};