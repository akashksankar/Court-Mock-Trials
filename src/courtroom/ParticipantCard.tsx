import React, { useEffect, useRef } from 'react';
import { Participant } from '../types/courtroom';
import { Mic, MicOff, Hand, VideoOff, Volume2 } from 'lucide-react';

interface ParticipantCardProps {
  participant: Participant;
  isCurrentUser?: boolean;
}

export const ParticipantCard: React.FC<ParticipantCardProps> = ({ participant, isCurrentUser }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current && participant.stream) {
      videoRef.current.srcObject = participant.stream;
    }
  }, [participant.stream, participant.isVideoOn]);

  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case 'Judge / Mentor':
        return 'bg-[#2B2D42] text-[#EDF2F4] border-[#D90429] font-extrabold';
      case 'Petitioner Counsel':
        return 'bg-emerald-950/90 text-emerald-200 border-emerald-400 font-extrabold';
      case 'Respondent Counsel':
        return 'bg-blue-950/90 text-blue-200 border-blue-400 font-extrabold';
      case 'Witness':
      case 'Expert Witness':
        return 'bg-purple-950/90 text-purple-200 border-purple-400 font-extrabold';
      default:
        return 'bg-[#2B2D42]/90 text-white border-[#8D99AE]/40 font-semibold';
    }
  };

  return (
    <div
      className={`relative w-full h-44 sm:h-52 min-h-[170px] rounded-2xl overflow-hidden bg-[#2B2D42] border-2 transition-all duration-300 shadow-md group flex flex-col justify-between ${
        participant.isSpeaking
          ? 'ring-4 ring-[#EF233C] border-[#EF233C] shadow-lg shadow-[#EF233C]/30 scale-[1.01]'
          : 'border-white hover:border-[#EF233C]/50 shadow-[0_10px_25px_rgba(43,45,66,0.08)]'
      }`}
    >
      {/* BACKGROUND MEDIA FEED (Video / Avatar background) */}
      <div className="absolute inset-0 w-full h-full bg-[#2B2D42] overflow-hidden">
        {participant.isVideoOn ? (
          participant.stream ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted={isCurrentUser}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full relative">
              <img
                src={
                  participant.avatarUrl ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
                }
                alt={participant.name}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-[#2B2D42]/20 backdrop-blur-[0.5px]" />
            </div>
          )
        ) : (
          <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-br from-[#2B2D42] via-[#1f2030] to-[#2B2D42]">
            {participant.avatarUrl ? (
              <img
                src={participant.avatarUrl}
                alt={participant.name}
                className="w-full h-full object-cover opacity-20 blur-xs"
              />
            ) : null}

            {/* Centered avatar photo when camera is off */}
            <div className="absolute flex flex-col items-center justify-center gap-1 z-10">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-white/80 shadow-xl bg-slate-900">
                <img
                  src={
                    participant.avatarUrl ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
                  }
                  alt={participant.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[10px] text-stone-200 font-semibold flex items-center gap-1 bg-black/60 px-2.5 py-0.5 rounded-full border border-white/10 backdrop-blur-md">
                <VideoOff className="w-3 h-3 text-[#EF233C]" /> Camera Off
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Halo outline pulse effect when speaking */}
      {participant.isSpeaking && (
        <div className="absolute inset-0 border-4 border-[#EF233C]/80 animate-pulse pointer-events-none z-10" />
      )}

      {/* TOP OVERLAY BAR: Badges & Media Status Controls */}
      <div className="relative z-20 p-2.5 sm:p-3 flex items-start justify-between gap-2 bg-gradient-to-b from-black/75 via-black/35 to-transparent">
        {/* Role Badge Overlay */}
        <span
          className={`text-[9.5px] sm:text-[10px] tracking-wider px-2.5 py-0.5 rounded-full border uppercase shadow-sm backdrop-blur-md ${getRoleBadgeStyle(
            participant.courtRole
          )}`}
        >
          {participant.courtRole}
        </span>

        {/* Status Badges Overlay (Mic, Hand Raised) */}
        <div className="flex items-center gap-1.5 shrink-0">
          {participant.isHandRaised && (
            <span
              className="p-1 sm:p-1.5 rounded-full bg-[#EF233C] text-white animate-bounce shadow-md border border-white/40"
              title="Hand Raised to Speak"
            >
              <Hand className="w-3.5 h-3.5 fill-white" />
            </span>
          )}

          {participant.isMuted ? (
            <span
              className="p-1 sm:p-1.5 rounded-lg bg-rose-600/90 text-white border border-rose-400/50 backdrop-blur-md shadow-xs"
              title="Microphone Muted"
            >
              <MicOff className="w-3.5 h-3.5" />
            </span>
          ) : (
            <span
              className={`p-1 sm:p-1.5 rounded-lg backdrop-blur-md shadow-xs ${
                participant.isSpeaking
                  ? 'bg-emerald-500 text-white border border-emerald-300 animate-pulse'
                  : 'bg-black/60 text-emerald-400 border border-emerald-500/40'
              }`}
              title="Microphone Active"
            >
              <Mic className="w-3.5 h-3.5" />
            </span>
          )}
        </div>
      </div>

      {/* BOTTOM OVERLAY BAR: Name, Role, College/Bar details */}
      <div className="relative z-20 p-2.5 sm:p-3 pt-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col gap-0.5 text-left">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs sm:text-sm font-bold text-white tracking-wide line-clamp-1 drop-shadow-md flex items-center gap-1.5">
            {participant.name}
            {isCurrentUser && (
              <span className="text-[9.5px] text-white font-bold border border-[#EF233C] bg-[#D90429] px-1.5 py-0.2 rounded-full uppercase">
                You
              </span>
            )}
          </p>

          {participant.isSpeaking && (
            <span className="shrink-0 text-[9px] font-black text-white bg-[#EF233C] px-2 py-0.5 rounded-md flex items-center gap-1 shadow-md animate-pulse">
              <Volume2 className="w-3 h-3 text-white" /> SPEAKING
            </span>
          )}
        </div>

        {participant.college && (
          <p className="text-[10px] sm:text-[11px] text-[#EDF2F4]/80 line-clamp-1 font-medium drop-shadow">
            {participant.college}
          </p>
        )}
      </div>
    </div>
  );
};
