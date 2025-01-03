import { Heart, Sun, Moon, Star, Coffee, Headphones, PartyPopper } from 'lucide-react';
import { Mood } from '../types';

export const WHEEL_RADIUS = 140;
export const CENTER_CIRCLE_SIZE = 96;

export const MOODS: Mood[] = [
  { name: 'Hafla', icon: PartyPopper, color: 'bg-red-500' },
  { name: 'Happy', icon: Heart, color: 'bg-pink-500' },
  { name: 'Energetic', icon: Sun, color: 'bg-yellow-500' },
  { name: 'Calm', icon: Moon, color: 'bg-blue-500' },
  { name: 'Focus', icon: Coffee, color: 'bg-orange-500' },
  { name: 'Groove', icon: Headphones, color: 'bg-green-500' },
  { name: 'Dreamy', icon: Star, color: 'bg-purple-500' }
];

export const getWheelSize = () => {
    // Base size on viewport width and height
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    
    // Use the smaller dimension to ensure wheel fits on screen
    const minDimension = Math.min(vw, vh);
    
    // Calculate wheel size (50% of smaller screen dimension)
    return Math.min(Math.max(minDimension * 0.5, 288), 600); // min 288px, max 600px
  };
  
  export const getWheelRadius = (wheelSize: number) => wheelSize * 0.4; // 40% of wheel size
  export const getCenterCircleSize = (wheelSize: number) => wheelSize * 0.2; // 20% of wheel size
  