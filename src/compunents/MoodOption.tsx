import React from 'react';
import { Mood } from '../types';

interface MoodOptionProps {
    mood: Mood;
    position: { x: number; y: number };
    isSelected: boolean;
    wheelSize: number;
}

export const MoodOption: React.FC<MoodOptionProps> = ({ mood, position, isSelected, wheelSize }) => {
    const iconSize = wheelSize * 0.06; // Increased from 0.05 (8% of wheel size)
    const padding = wheelSize * 0.045; // Increased from 0.03 (4.5% of wheel size)

    return (
        <div
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ${isSelected ? 'scale-110' : ''
                }`}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`
            }}
        >
            <div
                className={`${mood.color} rounded-full relative group`}
                style={{ padding: `${padding}px` }}
            >
                <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <mood.icon style={{ width: `${iconSize}px`, height: `${iconSize}px` }} className="text-white" />
            </div>
            <div className="text-white text-xs text-center mt-2 whitespace-nowrap opacity-80 group-hover:opacity-100">
                {mood.name}
            </div>
        </div>
    );
};