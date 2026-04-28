import React from 'react';
import { DEPRESSION_SYMPTOMS, MANIA_SYMPTOMS } from '../types';

interface SymptomSelectorProps {
  type: 'depression' | 'mania' | null;
  selectedSymptoms: string[];
  onToggle: (symptom: string) => void;
}

const SymptomSelector: React.FC<SymptomSelectorProps> = ({ type, selectedSymptoms, onToggle }) => {
  if (!type) return null;

  const symptoms = type === 'depression' ? DEPRESSION_SYMPTOMS : MANIA_SYMPTOMS;
  const title = type === 'depression' ? "低能量画像确认" : "高能量画像确认";
  const colorClass = type === 'depression' ? "text-blue-500" : "text-rose-500";
  const bgSelected = type === 'depression' ? "bg-blue-50 border-blue-200 text-blue-700" : "bg-rose-50 border-rose-200 text-rose-700";

  return (
    <div className="space-y-3 animate-slide-in">
      <div className="flex justify-between items-baseline">
        <h2 className={`text-sm font-bold tracking-wide uppercase ${colorClass}`}>{title}</h2>
        <span className="text-[10px] text-stone-300">今日是否有以下表现?</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {symptoms.map((symptom) => {
          const isSelected = selectedSymptoms.includes(symptom);
          
          return (
            <button
              key={symptom}
              onClick={() => onToggle(symptom)}
              className={`
                px-3 py-2 rounded-lg text-xs font-medium border transition-all duration-200
                ${isSelected 
                  ? `${bgSelected} shadow-sm` 
                  : 'bg-white text-stone-500 border-stone-100 hover:border-stone-200'
                }
              `}
            >
              {symptom}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SymptomSelector;