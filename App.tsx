import React, { useState, useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { BookOpen, Settings, BarChart2, Check, Cloud, Sun, CloudRain, CloudSnow } from 'lucide-react';

import MoodSelector from './components/MoodSelector';
import ContextualTriggers from './components/ContextualTriggers';
import MedicationSection from './components/MedicationSection';
import SafetyModal from './components/SafetyModal';
import PatternChart from './components/PatternChart';
import PhysiologicalSection from './components/PhysiologicalSection';
import ReportView from './components/ReportView';
import SymptomSelector from './components/SymptomSelector';

import { MoodLevel, SleepData, MedicationData, WeatherType } from './types';
import { getCompanionInsight } from './services/geminiService';

const App: React.FC = () => {
  // Navigation View State
  const [currentView, setCurrentView] = useState<'diary' | 'insights'>('diary');

  // Core Data State
  const [weather, setWeather] = useState<WeatherType>('sunny');
  const [selectedMood, setSelectedMood] = useState<MoodLevel | null>(null);
  const [triggers, setTriggers] = useState<string[]>([]);
  const [sleepData, setSleepData] = useState<SleepData>({
    hours: 7.0,
    difficultyFallingAsleep: false,
    earlyWakeUp: false
  });
  const [menstrualDay, setMenstrualDay] = useState<number>(0);
  const [medication, setMedication] = useState<MedicationData>({
    taken: false,
    name: '',
    sideEffects: ''
  });
  const [symptoms, setSymptoms] = useState<string[]>([]);
  
  // Logic State
  const [symptomType, setSymptomType] = useState<'depression' | 'mania' | null>(null);
  const [showSaveGlow, setShowSaveGlow] = useState(false);

  // System State
  const [safetyOpen, setSafetyOpen] = useState(false);
  const [companionText, setCompanionText] = useState<string>("");
  const [loadingInsight, setLoadingInsight] = useState(false);
  
  const [showReport, setShowReport] = useState(false);

  // 1. Safety Trigger
  useEffect(() => {
    if (selectedMood === MoodLevel.ABYSS) {
      setSafetyOpen(true);
    }
  }, [selectedMood]);

  // 2. Symptom Portrait Trigger Logic
  useEffect(() => {
    if (!selectedMood) {
      setSymptomType(null);
      return;
    }
    
    const isManiaRisk = [MoodLevel.ROCKET, MoodLevel.FERRIS_WHEEL].includes(selectedMood) || (sleepData.hours < 4 && selectedMood !== MoodLevel.DEEP_SEA && selectedMood !== MoodLevel.ABYSS);
    const isDepressionRisk = [MoodLevel.DEEP_SEA, MoodLevel.ABYSS].includes(selectedMood) || (selectedMood === MoodLevel.HOLDING_BREATH && sleepData.hours > 10);

    if (isManiaRisk) setSymptomType('mania');
    else if (isDepressionRisk) setSymptomType('depression');
    else setSymptomType(null);

  }, [selectedMood, sleepData.hours]);

  // 3. Insight Generator
  useEffect(() => {
    let isMounted = true;
    if (selectedMood) {
      setLoadingInsight(true);
      const sleepIssues = [];
      if (sleepData.difficultyFallingAsleep) sleepIssues.push("Hard to sleep");
      if (sleepData.earlyWakeUp) sleepIssues.push("Early wake");

      getCompanionInsight(selectedMood, {
        triggers,
        sleepHours: sleepData.hours,
        medicationTaken: medication.taken,
        sleepIssues
      }).then(text => {
          if(isMounted) {
            setCompanionText(text);
            setLoadingInsight(false);
          }
        });
    }
    return () => { isMounted = false; };
  }, [selectedMood, triggers, sleepData.hours, medication.taken]);

  const handleSaveDailyRecord = () => {
    // Trigger Moon Glow Effect
    setShowSaveGlow(true);
    setTimeout(() => setShowSaveGlow(false), 2000);
  };

  const toggleTrigger = (triggerId: string) => {
    if (triggers.includes(triggerId)) {
      setTriggers(triggers.filter(t => t !== triggerId));
    } else {
      setTriggers([...triggers, triggerId]);
    }
  };

  const toggleSymptom = (sym: string) => {
    if (symptoms.includes(sym)) setSymptoms(symptoms.filter(s => s !== sym));
    else setSymptoms([...symptoms, sym]);
  };

  if (showReport) {
    return (
      <ReportView 
        onClose={() => setShowReport(false)} 
        mockHistoryData={`Weather: ${weather}. Mood: ${selectedMood}. Sleep: ${sleepData.hours}h. Cycle: Day ${menstrualDay}. Symptoms: ${symptoms.join(',')}`}
      />
    );
  }

  return (
    <HashRouter>
      <div className="min-h-screen bg-stone-50 pb-24 max-w-lg mx-auto shadow-2xl overflow-hidden relative font-sans">
        
        {/* Save Glow Overlay */}
        <div className={`fixed inset-0 z-50 pointer-events-none transition-opacity duration-1000 flex items-center justify-center bg-indigo-900/20 ${showSaveGlow ? 'opacity-100' : 'opacity-0'}`}>
           <div className={`w-64 h-64 bg-indigo-100 rounded-full blur-[100px] transition-transform duration-1000 ${showSaveGlow ? 'scale-150' : 'scale-50'}`}></div>
        </div>

        {/* Header with Environment Bar */}
        <header className="px-6 py-6 bg-stone-50/80 backdrop-blur-sm sticky top-0 z-10 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-stone-800 tracking-tight">Fluctuations</h1>
              <p className="text-xs text-stone-400 mt-0.5">允许波动，精准记录</p>
            </div>
            <button className="text-stone-400 hover:text-stone-600 transition-colors bg-white p-2 rounded-full shadow-sm">
              <Settings size={20} />
            </button>
          </div>

          {/* Environmental Context Bar */}
          <div className="flex gap-2 items-center overflow-x-auto pb-1 no-scrollbar">
             <span className="text-[10px] font-bold text-stone-300 uppercase mr-2">ENV</span>
             {(['sunny', 'cloudy', 'rainy', 'snowy'] as WeatherType[]).map(w => (
               <button 
                 key={w}
                 onClick={() => setWeather(w)}
                 className={`p-2 rounded-full transition-colors ${weather === w ? 'bg-stone-800 text-white' : 'bg-white text-stone-300'}`}
               >
                 {w === 'sunny' && <Sun size={14} />}
                 {w === 'cloudy' && <Cloud size={14} />}
                 {w === 'rainy' && <CloudRain size={14} />}
                 {w === 'snowy' && <CloudSnow size={14} />}
               </button>
             ))}
             <span className="text-[10px] text-stone-400 ml-auto">{new Date().toLocaleDateString()}</span>
          </div>
        </header>

        <main className="px-6 space-y-8 animate-slide-in">
          
          {currentView === 'diary' ? (
            <>
              {/* Mood */}
              <section className="space-y-3">
                 <div className="flex justify-between items-end">
                    <h2 className="text-sm font-bold text-stone-400 tracking-wide uppercase">当前状态</h2>
                    {selectedMood && companionText && (
                       <span className="text-[10px] px-3 py-1.5 rounded-full bg-stone-200 text-stone-600 animate-fade-in max-w-[200px] truncate">
                          {loadingInsight ? "..." : companionText}
                       </span>
                    )}
                 </div>
                <MoodSelector 
                  selectedMood={selectedMood} 
                  onSelect={setSelectedMood} 
                />
              </section>

              {/* Physiological (Includes Moon Phase) */}
              <section>
                <PhysiologicalSection 
                  sleepData={sleepData}
                  onSleepChange={setSleepData}
                  menstrualDay={menstrualDay}
                  onMenstrualChange={setMenstrualDay}
                />
              </section>

              {/* Symptom Portrait (Conditional) */}
              {symptomType && (
                 <section>
                   <SymptomSelector 
                     type={symptomType}
                     selectedSymptoms={symptoms}
                     onToggle={toggleSymptom}
                   />
                 </section>
              )}

              {/* Triggers */}
              <section>
                 <ContextualTriggers 
                    selectedTriggers={triggers}
                    onToggle={toggleTrigger}
                 />
              </section>

              {/* Medication */}
              <section>
                <MedicationSection 
                  data={medication}
                  onChange={setMedication}
                />
              </section>
              
              {/* Save Button (Diary Mode) */}
              <div className="pt-4 pb-8">
                 <button 
                   onClick={handleSaveDailyRecord}
                   disabled={!selectedMood}
                   className="w-full bg-stone-800 text-stone-50 py-4 rounded-2xl font-bold text-sm hover:bg-stone-900 transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-stone-200"
                 >
                   <Check size={18} />
                   记录此刻
                 </button>
              </div>
            </>
          ) : (
            /* INSIGHTS VIEW */
            <div className="space-y-6 animate-slide-in">
              <div className="bg-stone-900 text-stone-100 p-6 rounded-3xl shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-2">环境与周期洞察</h2>
                  <p className="text-stone-400 text-sm leading-relaxed mb-4">
                    分析月相、天气与生理节律的共振效应。
                  </p>
                  <button 
                    onClick={() => setShowReport(true)}
                    className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 backdrop-blur-sm border border-white/10"
                  >
                    <BookOpen size={14} /> 生成复诊报告 (Clinical)
                  </button>
                </div>
                {/* Decorative Moon */}
                <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-indigo-500 rounded-full blur-[70px] opacity-30 pointer-events-none"></div>
              </div>
              <PatternChart />
            </div>
          )}
        </main>

        {/* Floating Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-stone-100 max-w-lg mx-auto z-40 pb-safe">
          <div className="flex justify-around py-4">
            <button 
              onClick={() => setCurrentView('diary')}
              className={`flex flex-col items-center gap-1 transition-colors ${currentView === 'diary' ? 'text-stone-800' : 'text-stone-400 hover:text-stone-600'}`}
            >
              <BookOpen size={22} className={currentView === 'diary' ? 'fill-stone-200' : ''} />
              <span className="text-[10px] font-bold">日记</span>
            </button>
            <button 
              onClick={() => setCurrentView('insights')}
              className={`flex flex-col items-center gap-1 transition-colors ${currentView === 'insights' ? 'text-stone-800' : 'text-stone-400 hover:text-stone-600'}`}
            >
              <BarChart2 size={22} className={currentView === 'insights' ? 'fill-stone-200' : ''} />
              <span className="text-[10px] font-bold">洞察</span>
            </button>
          </div>
        </nav>

        {/* Safety Modal */}
        <SafetyModal 
          isOpen={safetyOpen} 
          onClose={() => setSafetyOpen(false)} 
        />

      </div>
    </HashRouter>
  );
};

export default App;