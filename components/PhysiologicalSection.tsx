import React from 'react';
import { Moon, Clock, Sunrise, Circle } from 'lucide-react';
import { SleepData } from '../types';

interface PhysiologicalSectionProps {
  sleepData: SleepData;
  onSleepChange: (data: SleepData) => void;
  menstrualDay: number;
  onMenstrualChange: (day: number) => void;
}

const PhysiologicalSection: React.FC<PhysiologicalSectionProps> = ({
  sleepData,
  onSleepChange,
  menstrualDay,
  onMenstrualChange
}) => {
  
  const handleSleepUpdate = (updates: Partial<SleepData>) => {
    onSleepChange({ ...sleepData, ...updates });
  };

  // Logic to map Cycle Day to Moon Phase Visuals
  const renderMoonPhase = (day: number, isSelected: boolean) => {
    // Day 1-2: New Moon (Stroke only)
    // Day 3-5: Waxing (Partial Fill)
    // Day 6+: Full Moon (Full Fill)
    
    const baseClass = `transition-all duration-300 ${isSelected ? 'text-indigo-400 scale-110 drop-shadow-md' : 'text-stone-300'}`;

    if (day <= 2) {
       return <Circle size={isSelected ? 24 : 18} className={baseClass} strokeWidth={2} />;
    } else if (day <= 5) {
       return <Moon size={isSelected ? 24 : 18} className={baseClass} fill="currentColor" fillOpacity={0.5} strokeWidth={2} />;
    } else {
       return <Circle size={isSelected ? 24 : 18} className={baseClass} fill="currentColor" strokeWidth={0} />;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-bold text-stone-400 tracking-wide uppercase">生理节律 (Rhythm)</h2>
      
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-stone-100 space-y-8">
        
        {/* Sleep Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center text-stone-600">
            <div className="flex items-center gap-2">
              <Moon size={18} className="text-stone-400" />
              <span className="text-sm font-bold text-stone-700">昨夜睡眠</span>
            </div>
            <span className="text-xl font-bold font-mono text-stone-700">{sleepData.hours}<span className="text-xs font-normal text-stone-400 ml-1">h</span></span>
          </div>
          
          <input 
            type="range" 
            min="0" 
            max="14" 
            step="0.5"
            value={sleepData.hours}
            onChange={(e) => handleSleepUpdate({ hours: parseFloat(e.target.value) })}
            className="w-full h-2 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-stone-600"
          />

          {/* Sleep Anomalies */}
          <div className="flex gap-3 pt-1">
             {['入睡困难', '早醒'].map((label, idx) => {
                 const key = idx === 0 ? 'difficultyFallingAsleep' : 'earlyWakeUp';
                 const isActive = sleepData[key as keyof SleepData];
                 return (
                    <button
                        key={key}
                        onClick={() => handleSleepUpdate({ [key]: !isActive })}
                        className={`
                           flex-1 py-2 px-3 rounded-xl text-[10px] font-bold border transition-all
                           ${isActive 
                             ? 'bg-stone-800 text-white border-stone-800' 
                             : 'bg-white text-stone-400 border-stone-100 hover:border-stone-200'}
                        `}
                    >
                        {label}
                    </button>
                 )
             })}
          </div>

          {/* Time Inputs */}
          {(sleepData.difficultyFallingAsleep || sleepData.earlyWakeUp) && (
            <div className="grid grid-cols-2 gap-3 animate-slide-in">
               <div className={`transition-opacity ${sleepData.difficultyFallingAsleep ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
                 <input 
                   type="time" 
                   value={sleepData.fallAsleepTime || ''}
                   onChange={(e) => handleSleepUpdate({ fallAsleepTime: e.target.value })}
                   className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs font-mono text-stone-700 outline-none"
                 />
               </div>
               <div className={`transition-opacity ${sleepData.earlyWakeUp ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
                 <input 
                   type="time" 
                   value={sleepData.wakeUpTime || ''}
                   onChange={(e) => handleSleepUpdate({ wakeUpTime: e.target.value })}
                   className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs font-mono text-stone-700 outline-none"
                 />
               </div>
            </div>
          )}
        </div>

        <div className="w-full h-px bg-stone-100" />

        {/* Menstrual Cycle (Moon Phase Metaphor) */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
             <span className="text-sm font-bold text-stone-700">月相周期 (Cycle)</span>
             <span className="text-xs text-indigo-400 font-medium">
                {menstrualDay === 0 ? "Off" : `Day ${menstrualDay} ${menstrualDay <= 2 ? '• 新月' : menstrualDay <= 5 ? '• 上弦' : '• 满月'}`}
             </span>
          </div>
          
          <div className="flex justify-between items-center px-1">
             <button 
                onClick={() => onMenstrualChange(0)}
                className={`text-xs px-3 py-1.5 rounded-full transition-colors ${menstrualDay === 0 ? 'bg-stone-800 text-white' : 'text-stone-300 hover:bg-stone-100'}`}
             >
               OFF
             </button>

             <div className="flex items-center gap-2">
               {[1, 2, 3, 4, 5, 6, 7].map((day) => {
                 const isSelected = menstrualDay === day;
                 
                 return (
                   <button
                     key={day}
                     onClick={() => onMenstrualChange(isSelected ? 0 : day)}
                     className="relative w-8 h-10 flex items-center justify-center"
                   >
                     {renderMoonPhase(day, isSelected)}
                     
                     {/* Day Tooltip */}
                     {isSelected && (
                         <span className="absolute -bottom-3 text-[9px] font-bold text-indigo-300">D{day}</span>
                     )}
                   </button>
                 );
               })}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysiologicalSection;