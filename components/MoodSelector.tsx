import React from 'react';
import { MoodLevel } from '../types';
import { MOOD_CONFIGS } from '../constants';
import { Rocket, Fan, Trees, Waves, Anchor, Orbit } from 'lucide-react';

interface MoodSelectorProps {
  selectedMood: MoodLevel | null;
  onSelect: (mood: MoodLevel) => void;
}

const IconMap = {
  Rocket: Rocket,
  FerrisWheel: Fan,
  Trees: Trees,
  Waves: Waves,
  Anchor: Anchor,
  Orbit: Orbit,
};

const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onSelect }) => {
  return (
    <div className="py-4">
      <div className="grid grid-cols-3 gap-4">
        {MOOD_CONFIGS.map((config) => {
          const Icon = IconMap[config.iconName as keyof typeof IconMap];
          const isSelected = selectedMood === config.id;
          
          // Determine animation speed based on mood energy
          let animationClass = '';
          if (config.value > 1) animationClass = 'animate-breathe-fast'; // Mania
          else if (config.value < -1) animationClass = 'animate-breathe-slow'; // Depression
          else animationClass = 'animate-breathe-normal'; // Steady

          return (
            <button
              key={config.id}
              onClick={() => onSelect(config.id)}
              className={`
                group relative flex flex-col items-center justify-center p-2
                transition-all duration-500 ease-out
                ${isSelected ? 'scale-110 z-10' : 'scale-95 opacity-60 hover:opacity-100'}
              `}
            >
              {/* Breathing Orb Background */}
              <div 
                className={`
                  absolute inset-0 rounded-full blur-xl opacity-20 transition-all duration-700
                  ${config.color.replace('bg-', 'bg-')}
                  ${isSelected ? animationClass + ' opacity-40' : 'opacity-0'}
                `} 
              />
              
              <div 
                className={`
                  relative w-20 h-20 rounded-full flex items-center justify-center
                  shadow-sm border transition-all duration-500
                  ${isSelected 
                    ? `${config.color} text-white border-transparent shadow-lg ${animationClass}` 
                    : 'bg-white text-stone-400 border-stone-100 group-hover:border-stone-200'
                  }
                `}
              >
                <Icon size={28} strokeWidth={isSelected ? 2 : 1.5} />
              </div>

              <span className={`
                mt-3 text-[10px] font-bold tracking-widest uppercase transition-colors duration-300
                ${isSelected ? 'text-stone-800' : 'text-stone-400'}
              `}>
                {config.label}
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Selected Mood Description (Dynamic Footer) */}
      <div className="h-8 mt-4 flex items-center justify-center">
        {selectedMood && (
          <p className="text-xs text-stone-500 font-medium animate-fade-in text-center">
             {MOOD_CONFIGS.find(m => m.id === selectedMood)?.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default MoodSelector;