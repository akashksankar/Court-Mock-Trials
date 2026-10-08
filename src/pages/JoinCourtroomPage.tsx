import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { CourtRole } from '../types/courtroom';
import { HardwareCheckModal } from '../components/HardwareCheckModal';
import { LogIn, Camera, CheckCircle2, Shield } from 'lucide-react';
import { soundManager } from '../audio/soundManager';

const ROLES: CourtRole[] = [
  'Petitioner Counsel',
  'Respondent Counsel',
  'Witness',
  'Victim / Complainant',
  'Police Officer',
  'Expert Witness',
  'Spectator',
];

export const JoinCourtroomPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const [roomCode, setRoomCode] = useState('CV-7X92');
  const [userName, setUserName] = useState(user.name);
  const [selectedRole, setSelectedRole] = useState<CourtRole>('Petitioner Counsel');
  const [isHardwareModalOpen, setIsHardwareModalOpen] = useState(false);

  const handleJoinDirect = () => {
    soundManager.play('join');
    navigate(`/courtroom/${roomCode.toUpperCase()}`);
  };

  return (
    <div className="min-h-screen bg-[#EDF2F4] text-[#2B2D42] p-4 sm:p-8 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white/85 backdrop-blur-2xl border border-white/95 rounded-3xl p-6 sm:p-9 shadow-[0_25px_60px_-15px_rgba(43,45,66,0.1)] space-y-6">
        <div className="flex items-center gap-3.5 pb-5 border-b border-[#8D99AE]/20">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2B2D42] to-[#8D99AE] flex items-center justify-center text-white shadow-md shadow-[#2B2D42]/20">
            <LogIn className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-[#2B2D42] tracking-tight">
              Join Virtual Courtroom
            </h1>
            <p className="text-xs text-[#8D99AE] font-medium">
              Enter the unique session code provided by the Presiding Bench.
            </p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsHardwareModalOpen(true);
          }}
          className="space-y-4 text-xs"
        >
          {/* Courtroom Code Input */}
          <div className="space-y-1">
            <label className="font-bold text-[#2B2D42] uppercase tracking-wider text-[11px] block">
              Courtroom Session Code
            </label>
            <input
              type="text"
              required
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              placeholder="e.g. CV-7X92"
              className="w-full bg-[#EDF2F4]/60 border border-[#8D99AE]/30 rounded-xl p-3 text-[#D90429] font-mono text-base uppercase font-bold tracking-wider focus:outline-none focus:border-[#EF233C] focus:bg-white shadow-xs transition-all"
            />
          </div>

          {/* Name Input */}
          <div className="space-y-1">
            <label className="font-bold text-[#2B2D42] uppercase tracking-wider text-[11px] block">
              Advocate / Participant Name
            </label>
            <input
              type="text"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full bg-[#EDF2F4]/60 border border-[#8D99AE]/30 rounded-xl p-3 text-[#2B2D42] text-xs focus:outline-none focus:border-[#EF233C] focus:bg-white shadow-xs transition-all"
            />
          </div>

          {/* Court Role Selection */}
          <div className="space-y-1">
            <label className="font-bold text-[#2B2D42] uppercase tracking-wider text-[11px] block">
              Select Court Role / Capacity
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as CourtRole)}
              className="w-full bg-[#EDF2F4]/60 border border-[#8D99AE]/30 rounded-xl p-3 text-[#2B2D42] text-xs focus:outline-none focus:border-[#EF233C] focus:bg-white shadow-xs cursor-pointer font-medium"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Hardware Diagnostic Pre-check Button */}
          <div className="p-3.5 rounded-2xl bg-[#EDF2F4]/70 border border-[#8D99AE]/25 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <Camera className="w-4 h-4 text-[#D90429]" />
              <div>
                <span className="font-bold text-[#2B2D42] block text-[11px]">Pre-Join Stream Diagnostic</span>
                <span className="text-[10px] text-[#8D99AE]">Test microphone input & webcam video stream</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsHardwareModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-[#2B2D42] font-bold text-[11px] transition-all border border-[#8D99AE]/30 shadow-xs cursor-pointer"
            >
              Test Hardware
            </button>
          </div>

          {/* Join Actions */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D90429] to-[#EF233C] hover:from-[#ba0323] hover:to-[#df1a33] text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-[#D90429]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-5 h-5" /> JOIN COURTROOM
            </button>
          </div>
        </form>

        {/* Hardware Diagnostic Modal */}
        <HardwareCheckModal
          isOpen={isHardwareModalOpen}
          onClose={() => setIsHardwareModalOpen(false)}
          onConfirm={() => {
            setIsHardwareModalOpen(false);
            handleJoinDirect();
          }}
        />
      </div>
    </div>
  );
};
