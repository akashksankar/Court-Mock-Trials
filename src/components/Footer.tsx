import React from 'react';
import { Scale, Shield, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white/85 backdrop-blur-md border-t border-[#8D99AE]/20 text-[#8D99AE] py-7 px-4 text-xs shadow-xs mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#D90429] to-[#EF233C] flex items-center justify-center text-white shadow-xs">
            <Scale className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-extrabold text-[#2B2D42] uppercase tracking-wider text-sm">
              CourtVerse
            </p>
            <p className="text-[11px] text-[#8D99AE] font-medium">
              Virtual Courtroom Practice Platform for Indian Law Students
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5 text-[#8D99AE] text-[11px] font-medium">
          <span className="flex items-center gap-1 font-semibold text-[#2B2D42]">
            <Shield className="w-3.5 h-3.5 text-[#D90429]" /> Educational Moot Simulation
          </span>
          <span>BNS / BNSS / BSA 2023</span>
          <span>Localhost JWT Active</span>
        </div>

        <div className="text-[11px] text-[#8D99AE] flex items-center gap-1">
          <span>Crafted for Indian Advocacy Practice</span>
          <Heart className="w-3 h-3 text-[#EF233C] fill-[#EF233C] inline" />
        </div>
      </div>
    </footer>
  );
};

