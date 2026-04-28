import React from 'react';
import { Phone, X, ShieldAlert } from 'lucide-react';

interface SafetyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SafetyModal: React.FC<SafetyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border-l-8 border-indigo-900 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <ShieldAlert className="text-indigo-900" size={32} />
          <h2 className="text-xl font-bold text-stone-800">安全防护协议</h2>
        </div>

        <p className="text-stone-600 mb-8 leading-relaxed">
          检测到当前的“重力”较强。此刻不需要用力游回水面，但请确保安全索（Safety Line）已连接。
        </p>

        <div className="space-y-4">
          <a 
            href="tel:123456789" 
            className="flex items-center justify-center gap-3 w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-900 py-4 rounded-2xl transition-colors font-medium"
          >
            <Phone size={20} />
            拨打信任联系人
          </a>
          
          <a 
            href="tel:988" 
            className="flex items-center justify-center gap-3 w-full border border-stone-200 hover:bg-stone-50 text-stone-600 py-4 rounded-2xl transition-colors font-medium"
          >
            <ShieldAlert size={20} />
            危机干预热线
          </a>
        </div>

        <div className="mt-6 text-center">
          <button onClick={onClose} className="text-sm text-stone-400 hover:text-stone-600 underline">
            我目前是安全的，仅记录
          </button>
        </div>
      </div>
    </div>
  );
};

export default SafetyModal;