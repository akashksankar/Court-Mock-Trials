import React, { useState } from 'react';
import { Participant, HearingStage, CourtRole } from '../types/courtroom';
import { ParticipantCard } from './ParticipantCard';
import { Gavel, Mic, MicOff, Video, VideoOff, Hand, AlertTriangle, LogOut, Copy, Check, Users, Shield } from 'lucide-react';

interface TopViewCourtroomProps {
  participants: Participant[];
  currentUserId: string;
  currentUserRole: CourtRole;
  hearingStage: HearingStage;
  activeSpeakerName?: string;
  roomCode?: string;
  onToggleMic: () => void;
  onToggleCamera: () => void;
  onRaiseHand: () => void;
  onOpenObjectionModal: () => void;
  onLeaveCourt: () => void;
}

export const TopViewCourtroom: React.FC<TopViewCourtroomProps> = ({
  participants,
  currentUserId,
  currentUserRole,
  hearingStage,
  activeSpeakerName,
  roomCode = 'CV-7X92',
  onToggleMic,
  onToggleCamera,
  onRaiseHand,
  onOpenObjectionModal,
  onLeaveCourt,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);

  const currentUser = participants.find((p) => p.id === currentUserId) || {
    id: currentUserId,
    name: 'You',
    courtRole: currentUserRole,
    avatarUrl: '',
    isMuted: true,
    isVideoOn: false,
    isHandRaised: false,
    isSpeaking: false,
    joinedAt: '',
  };

  const judge = participants.find((p) => p.courtRole === 'Judge / Mentor');
  const petitionerCounsels = participants.filter((p) => p.courtRole === 'Petitioner Counsel');
  const respondentCounsels = participants.filter((p) => p.courtRole === 'Respondent Counsel');
  const witnesses = participants.filter(
    (p) => p.courtRole === 'Witness' || p.courtRole === 'Expert Witness' || p.courtRole === 'Victim / Complainant'
  );
  const spectators = participants.filter((p) => p.courtRole === 'Spectator' || p.courtRole === 'Police Officer');

  const remoteParticipantsCount = participants.filter((p) => p.id !== currentUserId).length;
  const canObject = currentUserRole === 'Petitioner Counsel' || currentUserRole === 'Respondent Counsel';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="relative w-full h-full min-h-[580px] bg-[#EDF2F4] rounded-3xl border border-white/95 p-4 sm:p-6 flex flex-col justify-between overflow-hidden shadow-[0_20px_50px_rgba(43,45,66,0.06)]">
      {/* Top Bar: Hearing Stage, Active Speaker & Live Status */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 bg-white/90 backdrop-blur-xl border border-white/95 p-3 sm:p-3.5 rounded-2xl shadow-xs">
        <div className="flex items-center gap-2">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600" />
          </span>
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
            BENCH ACTIVE ({participants.length} PRESENT)
          </span>
        </div>

        <div className="px-3.5 py-1 rounded-full bg-[#EDF2F4] border border-[#8D99AE]/30 text-xs font-bold text-[#2B2D42] tracking-wide text-center shadow-xs">
          STAGE: <span className="uppercase text-[#D90429] font-extrabold">{hearingStage}</span>
        </div>

        <div className="text-xs text-[#8D99AE] flex items-center gap-1.5 font-medium">
          <Gavel className="w-4 h-4 text-[#D90429]" />
          {activeSpeakerName ? (
            <span>
              Speaking: <strong className="text-[#2B2D42]">{activeSpeakerName}</strong>
            </span>
          ) : (
            <span className="text-[#8D99AE] italic">Court in order</span>
          )}
        </div>
      </div>

      {/* "WAITING FOR PARTICIPANTS" BANNER WHEN ALONE */}
      {remoteParticipantsCount === 0 && (
        <div className="relative z-20 my-2.5 p-3.5 sm:p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-[#EF233C]/30 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-[#2B2D42] animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EF233C]/10 border border-[#EF233C]/30 flex items-center justify-center text-[#D90429] shadow-xs shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-xs sm:text-sm text-[#2B2D42]">
                AWAITING PARTICIPANTS TO JOIN COURTROOM
              </p>
              <p className="text-[11px] text-[#8D99AE] font-medium">
                You are currently in session alone. Share the courtroom session code to invite advocates, witnesses, and spectators.
              </p>
            </div>
          </div>

          <button
            onClick={handleCopyCode}
            className="px-3.5 py-2 rounded-xl bg-[#2B2D42] hover:bg-[#D90429] text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs shrink-0 cursor-pointer"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#EF233C]" />}
            <span>{copiedCode ? 'Code Copied!' : `Copy Code: ${roomCode}`}</span>
          </button>
        </div>
      )}

      {/* COURTROOM INTERIOR LAYOUT */}
      <div className="relative z-10 my-3 flex-1 grid grid-rows-12 gap-3 items-center">
        {/* 1. THE BENCH / JUDGE'S ELEVATED DAIS (Top Row 1-4) */}
        <div className="row-span-4 flex flex-col items-center justify-center">
          <div className="w-full max-w-md bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-3.5 shadow-md relative text-center">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 bg-gradient-to-r from-[#D90429] to-[#EF233C] text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-xs">
              HON'BLE BENCH DAIS
            </div>

            {judge ? (
              <div className="w-full max-w-md mx-auto">
                <ParticipantCard participant={judge} isCurrentUser={judge.id === currentUserId} />
              </div>
            ) : (
              <div className="py-5 text-xs text-[#8D99AE] font-semibold italic">
                Waiting for Presiding Judge / Mentor to join bench...
              </div>
            )}
          </div>
        </div>

        {/* 2. COUNSEL TABLES & WITNESS BOX (Middle Row 5-9) */}
        <div className="row-span-5 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 items-center">
          {/* PETITIONER COUNSEL TABLE (Left) */}
          <div className="bg-white/85 backdrop-blur-xl border border-emerald-200 rounded-2xl p-3 shadow-xs flex flex-col items-center h-full justify-start">
            <div className="px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wider mb-2 border border-emerald-200">
              PETITIONER COUNSEL
            </div>
            <div className="w-full grid grid-cols-1 gap-2 flex-1">
              {petitionerCounsels.length > 0 ? (
                petitionerCounsels.map((p) => (
                  <ParticipantCard key={p.id} participant={p} isCurrentUser={p.id === currentUserId} />
                ))
              ) : (
                <div className="h-full min-h-[90px] flex flex-col items-center justify-center p-3 text-[11px] text-[#8D99AE] text-center italic border border-dashed border-[#8D99AE]/30 rounded-xl bg-[#EDF2F4]/50">
                  <Shield className="w-4 h-4 text-[#8D99AE] mb-1" />
                  No Petitioner Advocate Joined
                </div>
              )}
            </div>
          </div>

          {/* WITNESS BOX (Center) */}
          <div className="bg-white/85 backdrop-blur-xl border border-purple-200 rounded-2xl p-3 shadow-xs flex flex-col items-center h-full justify-start">
            <div className="px-3 py-0.5 rounded-full bg-purple-50 text-purple-800 text-[10px] font-bold uppercase tracking-wider mb-2 border border-purple-200">
              WITNESS BOX
            </div>
            <div className="w-full flex-1">
              {witnesses.length > 0 ? (
                witnesses.map((p) => (
                  <ParticipantCard key={p.id} participant={p} isCurrentUser={p.id === currentUserId} />
                ))
              ) : (
                <div className="h-full min-h-[90px] flex flex-col items-center justify-center p-3 text-[11px] text-[#8D99AE] text-center italic border border-dashed border-[#8D99AE]/30 rounded-xl bg-[#EDF2F4]/50">
                  Witness Box Empty
                </div>
              )}
            </div>
          </div>

          {/* RESPONDENT COUNSEL TABLE (Right) */}
          <div className="bg-white/85 backdrop-blur-xl border border-blue-200 rounded-2xl p-3 shadow-xs flex flex-col items-center h-full justify-start">
            <div className="px-3 py-0.5 rounded-full bg-blue-50 text-blue-800 text-[10px] font-bold uppercase tracking-wider mb-2 border border-blue-200">
              RESPONDENT COUNSEL
            </div>
            <div className="w-full grid grid-cols-1 gap-2 flex-1">
              {respondentCounsels.length > 0 ? (
                respondentCounsels.map((p) => (
                  <ParticipantCard key={p.id} participant={p} isCurrentUser={p.id === currentUserId} />
                ))
              ) : (
                <div className="h-full min-h-[90px] flex flex-col items-center justify-center p-3 text-[11px] text-[#8D99AE] text-center italic border border-dashed border-[#8D99AE]/30 rounded-xl bg-[#EDF2F4]/50">
                  <Shield className="w-4 h-4 text-[#8D99AE] mb-1" />
                  No Respondent Advocate Joined
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3. SPECTATOR GALLERY (Bottom Row 10-12) */}
        <div className="row-span-3 bg-white/80 backdrop-blur-xl border border-white/90 rounded-2xl p-2.5 shadow-xs">
          <div className="text-[10px] text-[#8D99AE] font-bold uppercase tracking-widest text-center mb-1.5">
            SPECTATOR GALLERY ({spectators.length})
          </div>
          {spectators.length > 0 ? (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {spectators.map((p) => (
                <div key={p.id} className="w-56 sm:w-64 shrink-0">
                  <ParticipantCard participant={p} isCurrentUser={p.id === currentUserId} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[11px] text-[#8D99AE] text-center italic py-1 font-medium">
              No student spectators currently present in gallery
            </p>
          )}
        </div>
      </div>

      {/* BOTTOM ACTION TOOLBAR */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2.5 bg-white/90 backdrop-blur-xl border border-white/95 p-2.5 rounded-2xl shadow-md">
        {/* Left: Media Toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleMic}
            className={`p-2.5 rounded-xl flex items-center gap-1.5 text-xs font-bold transition-all shadow-xs cursor-pointer ${
              currentUser.isMuted
                ? 'bg-rose-50 text-[#D90429] border border-rose-200 hover:bg-rose-100'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
            }`}
          >
            {currentUser.isMuted ? <MicOff className="w-4 h-4 text-[#D90429]" /> : <Mic className="w-4 h-4 text-emerald-600" />}
            <span className="hidden sm:inline">{currentUser.isMuted ? 'Mic Off' : 'Mic On'}</span>
          </button>

          <button
            onClick={onToggleCamera}
            className={`p-2.5 rounded-xl flex items-center gap-1.5 text-xs font-bold transition-all shadow-xs cursor-pointer ${
              !currentUser.isVideoOn
                ? 'bg-[#EDF2F4] text-[#8D99AE] border border-[#8D99AE]/30 hover:bg-white'
                : 'bg-blue-50 text-blue-800 border border-blue-300 hover:bg-blue-100'
            }`}
          >
            {!currentUser.isVideoOn ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4 text-blue-600" />}
            <span className="hidden sm:inline">{!currentUser.isVideoOn ? 'Cam Off' : 'Cam On'}</span>
          </button>
        </div>

        {/* Center: Interactive Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onRaiseHand}
            className={`p-2.5 rounded-xl flex items-center gap-1.5 text-xs font-bold transition-all border shadow-xs cursor-pointer ${
              currentUser.isHandRaised
                ? 'bg-[#EF233C] text-white border-[#EF233C] animate-bounce'
                : 'bg-[#EDF2F4] text-[#2B2D42] border-[#8D99AE]/30 hover:bg-white'
            }`}
          >
            <Hand className="w-4 h-4" />
            <span>{currentUser.isHandRaised ? 'Hand Raised' : 'Raise Hand'}</span>
          </button>

          {canObject && (
            <button
              onClick={onOpenObjectionModal}
              className="p-2.5 rounded-xl bg-gradient-to-r from-[#D90429] to-[#EF233C] hover:from-[#ba0323] hover:to-[#df1a33] text-white font-extrabold text-xs tracking-wider shadow-md shadow-[#D90429]/25 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>OBJECTION</span>
            </button>
          )}
        </div>

        {/* Right: Leave Court */}
        <button
          onClick={onLeaveCourt}
          className="p-2.5 rounded-xl bg-[#EDF2F4] hover:bg-rose-50 text-[#8D99AE] hover:text-[#D90429] text-xs font-bold flex items-center gap-1.5 transition-colors border border-[#8D99AE]/25 shadow-xs cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Leave Court</span>
        </button>
      </div>
    </div>
  );
};
