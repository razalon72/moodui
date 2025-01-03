import React, { useState } from 'react';
import { User, LogOut, Info, Settings } from 'lucide-react';

export const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
      >
        <User className="w-6 h-6" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 rounded-lg bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 shadow-lg z-20">
            <div className="py-1">
              <button className="w-full px-4 py-2 text-sm text-white hover:bg-white/10 flex items-center gap-2">
                <Info className="w-4 h-4" />
                About
              </button>
              <button className="w-full px-4 py-2 text-sm text-white hover:bg-white/10 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </button>
              <hr className="my-1 border-gray-700/50" />
              <button className="w-full px-4 py-2 text-sm text-red-400 hover:bg-white/10 flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                Log Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}; 