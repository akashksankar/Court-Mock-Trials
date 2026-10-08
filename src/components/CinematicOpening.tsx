import React, { useEffect } from 'react';
import { Scale, Gavel } from 'lucide-react';
import { soundManager } from '../audio/soundManager';

interface CinematicOpeningProps {
  isOpen: boolean;
  caseTitle: string;
  caseNumber: string;
  courtType: string;
  onFinished: () => void;
}

export const CinematicOpening: React.FC<CinematicOpeningProps> = ({
  isOpen,
  caseTitle,
  caseNumber,
  courtType,
  onFinished,
}) => {
  useEffect(() => {
    if (isOpen) {
      soundManager.play('gavel');
      const timer = setTimeout(() => {
        onFinished();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onFinished]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#EDF2F4]/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-[#2B2D42] text-center animate-fade-in">
      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#D90429] to-[#EF233C] border-2 border-white flex items-center justify-center mb-6 shadow-2xl shadow-[#D90429]/30 animate-pulse">
        <Scale className="w-10 h-10 text-white" />
      </div>

      <div className="space-y-3.5 max-w-2xl">
        <span className="px-3.5 py-1 rounded-full bg-white text-[#D90429] border border-[#8D99AE]/30 font-mono text-xs font-bold tracking-widest uppercase shadow-xs">
          {courtType}
        </span>

        <h1 className="text-3xl sm:text-5xl font-black text-[#2B2D42] tracking-wider uppercase leading-tight">
          COURT IS NOW IN SESSION
        </h1>

        <div className="h-1.5 w-32 bg-gradient-to-r from-[#D90429] to-[#EF233C] mx-auto rounded-full my-4" />

        <p className="text-xs font-mono text-[#D90429] font-bold tracking-widest uppercase">
          CASE NO: {caseNumber}
        </p>

        <h2 className="text-xl sm:text-2xl text-[#2B2D42]/90 font-bold">
          {caseTitle}
        </h2>

        <p className="text-xs text-[#8D99AE] tracking-wide pt-4 flex items-center justify-center gap-2 font-medium">
          <Gavel className="w-4 h-4 text-[#D90429]" />
          The Hon'ble Bench preside over trial proceedings. SILENCE IN THE COURT.
        </p>
      </div>
    </div>
  );
};
