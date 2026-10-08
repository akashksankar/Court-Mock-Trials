import React from 'react';
import { Award, CheckCircle, Scale, X, Star } from 'lucide-react';

interface JudgmentModalProps {
  isOpen: boolean;
  caseTitle: string;
  onClose: () => void;
}

export const JudgmentModal: React.FC<JudgmentModalProps> = ({ isOpen, caseTitle, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#2B2D42]/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-2xl border border-white/95 rounded-3xl max-w-xl w-full p-6 sm:p-8 text-[#2B2D42] shadow-[0_25px_60px_-15px_rgba(43,45,66,0.18)] relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8D99AE] hover:text-[#2B2D42] p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D90429] to-[#EF233C] mx-auto flex items-center justify-center text-white mb-3 shadow-md shadow-[#D90429]/20">
            <Scale className="w-7 h-7" />
          </div>
          <span className="px-3 py-0.5 rounded-full bg-[#EDF2F4] text-[#D90429] font-mono text-[10px] font-bold tracking-widest uppercase border border-[#8D99AE]/25">
            FINAL VERDICT & EVALUATION
          </span>
          <h3 className="text-2xl font-black text-[#2B2D42] mt-2">
            COURT ADJOURNED SINE DIE
          </h3>
          <p className="text-xs text-[#8D99AE] font-medium mt-1">{caseTitle}</p>
        </div>

        {/* Score Card Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6 text-center text-xs">
          <div className="p-3.5 rounded-2xl bg-[#EDF2F4]/60 border border-[#8D99AE]/20 shadow-xs">
            <span className="text-[10px] text-[#8D99AE] uppercase font-semibold block">Advocacy Score</span>
            <span className="text-xl font-black text-[#D90429] mt-0.5 block">88 / 100</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#EDF2F4]/60 border border-[#8D99AE]/20 shadow-xs">
            <span className="text-[10px] text-[#8D99AE] uppercase font-semibold block">BSA Compliance</span>
            <span className="text-xl font-black text-emerald-600 mt-0.5 block">92%</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#EDF2F4]/60 border border-[#8D99AE]/20 shadow-xs">
            <span className="text-[10px] text-[#8D99AE] uppercase font-semibold block">Objections Precision</span>
            <span className="text-xl font-black text-blue-600 mt-0.5 block">4 Sustained</span>
          </div>
        </div>

        {/* Judicial Feedback Comments */}
        <div className="p-4 rounded-2xl bg-[#EDF2F4]/50 border border-[#8D99AE]/20 text-xs text-[#2B2D42] space-y-2 mb-6">
          <div className="flex items-center gap-1.5 font-bold text-[#D90429]">
            <Star className="w-4 h-4 fill-[#EF233C] text-[#EF233C]" />
            Bench Evaluation Notes:
          </div>
          <ul className="space-y-1.5 pl-4 list-disc text-[#8D99AE] font-medium">
            <li>Petitioner counsel demonstrated strong statutory grasp of BSA Section 63 electronic evidence rules.</li>
            <li>Cross-examination of the Investigating Officer effectively exposed chain-of-custody gaps.</li>
            <li>Objection timing on leading questions was commendable.</li>
          </ul>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#D90429] to-[#EF233C] hover:from-[#ba0323] hover:to-[#df1a33] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#D90429]/20 flex items-center gap-2 cursor-pointer"
          >
            <CheckCircle className="w-4 h-4" /> Close Verdict & Return
          </button>
        </div>
      </div>
    </div>
  );
};
