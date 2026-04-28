import React, { useState } from 'react';
import { Pill, Check } from 'lucide-react';

interface MedicationButtonProps {
  taken: boolean;
  onToggle: (taken: boolean) => void;
}

const MedicationButton: React.FC<MedicationButtonProps> = ({ taken, onToggle }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <button
        onClick={() => onToggle(!taken)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative group flex items-center justify-center
          w-20 h-20 rounded-full transition-all duration-500 ease-out shadow-sm
          ${taken 
            ? 'bg-emerald-100 text-emerald-700 ring-4 ring-emerald-50' 
            : 'bg-stone-100 text-stone-400 hover:bg-stone-200'
          }
        `}
      >
        <div className={`absolute inset-0 rounded-full border-2 ${taken ? 'border-emerald-200' : 'border-stone-200'}`} />
        
        {taken ? (
          <Check size={32} className="scale-100 transition-transform duration-300" />
        ) : (
          <Pill size={32} className={`${isHovered ? 'rotate-12' : 'rotate-0'} transition-transform duration-300`} />
        )}
      </button>
      <span className={`mt-3 text-xs font-medium tracking-wide transition-colors duration-300 ${taken ? 'text-emerald-600' : 'text-stone-400'}`}>
        {taken ? "今日已服药" : "点击记录服药"}
      </span>
    </div>
  );
};

export default MedicationButton;