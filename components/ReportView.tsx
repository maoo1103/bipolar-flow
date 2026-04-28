import React, { useRef, useState, useEffect } from 'react';
import PatternChart from './PatternChart';
import { Share, Download, X, FileText, CloudSun, Calendar, Activity } from 'lucide-react';
import html2canvas from 'html2canvas';
import { generateClinicalReport } from '../services/geminiService';

interface ReportViewProps {
  onClose: () => void;
  mockHistoryData: string; 
}

const ReportView: React.FC<ReportViewProps> = ({ onClose, mockHistoryData }) => {
  const reportRef = useRef<HTMLDivElement>(null);
  const [reportText, setReportText] = useState("正在整合环境与生理数据...");
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    generateClinicalReport(mockHistoryData).then(setReportText);
  }, [mockHistoryData]);

  const handleExport = async () => {
    if (!reportRef.current) return;
    setIsExporting(true);
    await new Promise(r => setTimeout(r, 100));
    try {
      const canvas = await html2canvas(reportRef.current, {
        backgroundColor: '#fafaf9',
        scale: 2,
        useCORS: true
      });
      const link = document.createElement('a');
      link.download = `Fluctuations_Clinical_${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (e) {
      console.error(e);
      alert("Export failed");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-100 overflow-y-auto">
      {/* Toolbar */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-md p-4 flex justify-between items-center border-b border-stone-100 z-10">
         <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full text-stone-500">
           <X size={24} />
         </button>
         <h2 className="text-sm font-bold uppercase tracking-widest text-stone-800">复诊报告预览</h2>
         <button 
           onClick={handleExport} 
           disabled={isExporting}
           className="bg-stone-800 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-stone-700 transition-colors"
         >
           {isExporting ? '生成中...' : '保存长图'}
         </button>
      </div>

      {/* The Report (Capture Target) */}
      <div className="py-8 flex justify-center">
        <div 
          ref={reportRef} 
          className="w-[420px] bg-white shadow-xl min-h-[800px] flex flex-col relative"
        >
           {/* Header */}
           <div className="bg-stone-900 text-white p-8">
              <h1 className="text-2xl font-bold tracking-tight mb-2">Fluctuations</h1>
              <div className="flex justify-between items-end opacity-80">
                 <div>
                   <p className="text-[10px] uppercase tracking-widest">Clinical Insight Report</p>
                   <p className="text-xs mt-1">Patient ID: #8821 • {new Date().toLocaleDateString()}</p>
                 </div>
                 <Activity size={24} />
              </div>
           </div>

           <div className="p-8 space-y-8 flex-1">
              
              {/* 1. Chart Visualization */}
              <section>
                 <div className="flex items-center gap-2 mb-4 text-stone-400">
                    <Calendar size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">周期波动图</span>
                 </div>
                 <div className="bg-stone-50 p-2 rounded-2xl border border-stone-100">
                   <div className="pointer-events-none transform scale-95 origin-top-left w-[105%]">
                     <PatternChart />
                   </div>
                 </div>
                 <div className="mt-2 flex gap-4 justify-center">
                    <div className="flex items-center gap-1 text-[9px] text-stone-400"><div className="w-2 h-2 bg-stone-500 rounded-full"></div> Mood</div>
                    <div className="flex items-center gap-1 text-[9px] text-stone-400"><div className="w-2 h-2 bg-indigo-100 rounded-sm"></div> Sleep</div>
                    <div className="flex items-center gap-1 text-[9px] text-stone-400"><div className="w-2 h-2 bg-rose-400 rounded-full"></div> Moon Cycle</div>
                 </div>
              </section>

              <hr className="border-stone-100" />

              {/* 2. AI Analysis */}
              <section>
                 <div className="flex items-center gap-2 mb-4 text-stone-400">
                    <FileText size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">临床观察简报</span>
                 </div>
                 <div className="bg-amber-50/50 p-5 rounded-xl border border-amber-100/50">
                    <div className="prose prose-sm text-stone-700 text-xs leading-relaxed whitespace-pre-line font-serif">
                      {reportText}
                    </div>
                 </div>
              </section>

              {/* 3. Environment Context */}
              <section className="grid grid-cols-2 gap-4">
                 <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                    <div className="flex items-center gap-2 mb-2 text-stone-400">
                       <CloudSun size={14} />
                       <span className="text-[9px] font-bold uppercase">环境敏感度</span>
                    </div>
                    <p className="text-[10px] text-stone-600">
                       检测到阴雨天气下 (2 days)，情绪分值平均下降 1.5 分。
                    </p>
                 </div>
                 <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                    <div className="flex items-center gap-2 mb-2 text-stone-400">
                       <Activity size={14} />
                       <span className="text-[9px] font-bold uppercase">症状高频词</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                       <span className="px-2 py-1 bg-white border border-stone-100 rounded-md text-[9px] text-stone-500">入睡困难</span>
                       <span className="px-2 py-1 bg-white border border-stone-100 rounded-md text-[9px] text-stone-500">社交回避</span>
                    </div>
                 </div>
              </section>
           </div>

           {/* Footer */}
           <div className="bg-stone-50 p-6 text-center border-t border-stone-100">
              <p className="text-[9px] text-stone-300">Generated by Fluctuations App • Not a substitute for professional diagnosis.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ReportView;