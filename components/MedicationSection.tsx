import React, { useState, useEffect } from 'react';
import { Pill, Camera, Check, Edit2 } from 'lucide-react';
import { MedicationData } from '../types';

interface MedicationSectionProps {
  data: MedicationData;
  onChange: (data: MedicationData) => void;
}

const MedicationSection: React.FC<MedicationSectionProps> = ({ data, onChange }) => {
  const [isEditingName, setIsEditingName] = useState(false);

  // Load saved medication name on mount
  useEffect(() => {
    const savedName = localStorage.getItem('userMedicationName');
    if (savedName && !data.name) {
      onChange({ ...data, name: savedName });
    }
  }, []);

  const handleNameSave = (newName: string) => {
    onChange({ ...data, name: newName });
    localStorage.setItem('userMedicationName', newName);
  };

  const toggleTaken = () => {
    onChange({ ...data, taken: !data.taken });
  };

  const handlePhotoClick = () => {
    console.log('Camera triggered');
    // In a real app, this would open the camera stream
    alert("Camera permission requested for medication recognition.");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-bold text-stone-400 tracking-wide uppercase">药物记录</h2>
      
      <div className={`
        bg-white rounded-3xl p-6 shadow-sm border transition-all duration-500 overflow-hidden
        ${data.taken ? 'border-emerald-100 bg-emerald-50/30' : 'border-stone-100'}
      `}>
        {/* Primary Toggle */}
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={toggleTaken}
            className={`
              relative group flex items-center justify-center
              w-20 h-20 rounded-full transition-all duration-500 ease-out shadow-sm
              ${data.taken 
                ? 'bg-emerald-500 text-white ring-4 ring-emerald-100 shadow-emerald-200' 
                : 'bg-stone-100 text-stone-400 hover:bg-stone-200'
              }
            `}
          >
            {data.taken ? (
              <Check size={36} className="scale-100 transition-transform duration-300" />
            ) : (
              <Pill size={36} className="transition-transform duration-300" />
            )}
          </button>
          <span className={`mt-3 text-xs font-bold tracking-wide transition-colors ${data.taken ? 'text-emerald-600' : 'text-stone-400'}`}>
            {data.taken ? "今日已服药" : "点击记录服药"}
          </span>
        </div>

        {/* Expanded Details */}
        <div className={`transition-all duration-500 ease-in-out ${data.taken ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="space-y-4 pt-4 border-t border-emerald-100/50">
            
            {/* Drug Name Input */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-stone-400">药物名称</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                   <input
                    type="text"
                    value={data.name}
                    placeholder="输入药物名称..."
                    disabled={!isEditingName && data.name.length > 0}
                    onChange={(e) => handleNameSave(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-xl px-3 py-3 text-sm text-stone-700 focus:ring-2 focus:ring-emerald-200 outline-none disabled:bg-stone-50 disabled:text-stone-500"
                  />
                  {data.name.length > 0 && !isEditingName && (
                    <button 
                      onClick={() => setIsEditingName(true)}
                      className="absolute right-3 top-3 text-stone-400 hover:text-stone-600"
                    >
                      <Edit2 size={14} />
                    </button>
                  )}
                  {isEditingName && (
                     <button 
                      onClick={() => setIsEditingName(false)}
                      className="absolute right-3 top-3 text-emerald-500 hover:text-emerald-700 text-xs font-bold"
                    >
                      OK
                    </button>
                  )}
                </div>
                <button 
                  onClick={handlePhotoClick}
                  className="bg-stone-100 hover:bg-stone-200 text-stone-500 p-3 rounded-xl transition-colors"
                  title="拍照识别"
                >
                  <Camera size={20} />
                </button>
              </div>
            </div>

            {/* Side Effects */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-stone-400">副作用 / 备注</label>
              <textarea
                value={data.sideEffects}
                onChange={(e) => onChange({ ...data, sideEffects: e.target.value })}
                placeholder="例如：手抖、嗜睡、口渴..."
                className="w-full bg-white border border-stone-200 rounded-xl px-3 py-3 text-sm text-stone-700 min-h-[80px] focus:ring-2 focus:ring-emerald-200 outline-none resize-none"
              />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default MedicationSection;