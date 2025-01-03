import React from 'react';
import { RefreshCw } from 'lucide-react';

interface ResetButtonProps {
  onReset: (e: React.MouseEvent) => void;
}

export const ResetButton: React.FC<ResetButtonProps> = ({ onReset }) => (
  <button
    onClick={onReset}
    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white/10 p-1.5 rounded-full hover:bg-white/20 transition-colors"
  >
    <RefreshCw className="w-4 h-4 text-white" />
  </button>
);