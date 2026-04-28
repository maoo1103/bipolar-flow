import React from 'react';
import { Zap, Coffee, Wine, Users, AlertTriangle, Moon } from 'lucide-react';

interface ContextualTriggersProps {
  selectedTriggers: string[];
  onToggle: (trigger: string) => void;
}

const TRIGGERS = [
  { id: 'conflict', label: '冲突', icon: Zap },
  { id: 'stress', label: '压力', icon: AlertTriangle },
  { id: 'late_night', label: '熬夜', icon: Moon },
  { id: 'caffeine', label: '咖啡因', icon: Coffee },
  { id: 'alcohol', label: '酒精', icon: Wine },
  { id: 'social', label: '社交过载', icon: Users },
];

const ContextualTriggers: React.FC<ContextualTriggersProps> = ({ selectedTriggers, onToggle }) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-baseline">
        <h2 className="text-sm font-bold text-stone-400 tracking-wide uppercase">背景因素</h2>
        <span className="text-[10px] text-stone-300">多选 / 可跳过</span>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {TRIGGERS.map((item) => {
          const isSelected = selectedTriggers.includes(item.id);
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => onToggle(item.id)}
              className={`
                flex flex-col items-center justify-center py-3 px-2 rounded-xl transition-all duration-200 border
                ${isSelected 
                  ? 'bg-stone-700 text-stone-50 border-stone-700 shadow-md' 
                  : 'bg-white text-stone-500 border-stone-100 hover:border-stone-200'
                }
              `}
            >
              <Icon size={18} className={`mb-1 ${isSelected ? 'text-stone-200' : 'text-stone-400'}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ContextualTriggers;