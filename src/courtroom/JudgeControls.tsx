import React from 'react';
import { Participant, HearingStage } from '../types/courtroom';
import { Gavel, Check, X, FilePlus, UserPlus, MicOff, UserX, Users } from 'lucide-react';

interface JudgeControlsProps {
  hearingStage: HearingStage;
  participants: Participant[];
  onCallCourtToOrder: () => void;
  onChangeStage: (stage: HearingStage) => void;
  onAllowSpeaking: (participantId: string) => void;
  onDenySpeaking: (participantId: string) => void;
  onMuteParticipant: (participantId: string) => void;
  onRemoveParticipant: (participantId: string) => void;
  onOpenPresentExhibit: () => void;
  onCallWitness: () => void;
}

const STAGES: HearingStage[] = [
  'Court Called to Order',
  'Opening Statements',
  'Petitioner Arguments',
  'Respondent Arguments',
  'Witness Examination',
  'Cross Examination',
  'Evidence Presentation',
  'Objections & Motions',
  'Final Arguments',
  'Judgment & Feedback',
  'Court Adjourned',
];

export const JudgeControls: React.FC<JudgeControlsProps> = ({
  hearingStage,
  participants,
  onCallCourtToOrder,
  onChangeStage,
  onAllowSpeaking,
  onDenySpeaking,
  onMuteParticipant,
  onRemoveParticipant,
  onOpenPresentExhibit,
  onCallWitness,
}) => {
  const speakingRequests = participants.filter((p) => p.isHandRaised);
  const otherParticipants = participants.filter((p) => p.courtRole !== 'Judge / Mentor');

  return (
    <div className="bg-white/90 backdrop-blur-xl border border-white/95 rounded-3xl p-5 text-[#2B2D42] space-y-5 shadow-[0_20px_50px_rgba(43,45,66,0.06)]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-[#8D99AE]/20">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D90429] to-[#EF233C] flex items-center justify-center text-white shadow-xs">
            <Gavel className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#2B2D42] uppercase tracking-wider">
              BENCH CONTROL AUTHORITY
            </h3>
            <p className="text-[10px] text-[#8D99AE] font-medium">Hon'ble Judge Judicial Control System</p>
          </div>
        </div>

        <button
          onClick={onCallCourtToOrder}
          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#D90429] to-[#EF233C] text-white font-bold text-xs uppercase tracking-wider shadow-xs hover:scale-[1.02] transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Gavel className="w-3.5 h-3.5" /> Call Court to Order
        </button>
      </div>

      {/* Hearing Stage Selector */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-[#2B2D42] uppercase tracking-wider block">
          Current Hearing Stage
        </label>
        <select
          value={hearingStage}
          onChange={(e) => onChangeStage(e.target.value as HearingStage)}
          className="w-full bg-[#EDF2F4]/60 border border-[#8D99AE]/30 rounded-xl p-2.5 text-xs text-[#2B2D42] focus:outline-none focus:border-[#EF233C] focus:bg-white shadow-xs font-semibold cursor-pointer"
        >
          {STAGES.map((stg) => (
            <option key={stg} value={stg}>
              {stg}
            </option>
          ))}
        </select>
      </div>

      {/* Hand Raised Speaking Requests Queue */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#2B2D42] uppercase tracking-wider">
            Speaking Requests ({speakingRequests.length})
          </span>
        </div>

        {speakingRequests.length > 0 ? (
          <div className="space-y-2">
            {speakingRequests.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-2.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs shadow-xs"
              >
                <div>
                  <span className="font-bold text-[#2B2D42] block">{p.name}</span>
                  <span className="text-[10px] text-amber-800 font-bold">{p.courtRole}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onAllowSpeaking(p.id)}
                    className="p-1 px-2.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 text-emerald-900 text-[10px] font-bold flex items-center gap-0.5 shadow-xs cursor-pointer"
                  >
                    <Check className="w-3 h-3 text-emerald-700" /> Allow
                  </button>
                  <button
                    onClick={() => onDenySpeaking(p.id)}
                    className="p-1 px-2.5 rounded-xl bg-rose-100 hover:bg-rose-200 border border-rose-300 text-rose-900 text-[10px] font-bold flex items-center gap-0.5 shadow-xs cursor-pointer"
                  >
                    <X className="w-3 h-3 text-rose-700" /> Deny
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[11px] text-[#8D99AE] italic p-2.5 rounded-2xl bg-[#EDF2F4]/50 border border-[#8D99AE]/20 text-center font-medium">
            No pending speaking requests
          </p>
        )}
      </div>

      {/* Quick Action Triggers: Witness & Evidence */}
      <div className="grid grid-cols-2 gap-2.5 pt-1">
        <button
          onClick={onCallWitness}
          className="p-2.5 rounded-xl bg-[#EDF2F4] hover:bg-white border border-[#8D99AE]/25 text-purple-900 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
        >
          <UserPlus className="w-4 h-4 text-purple-700" /> Call Witness
        </button>

        <button
          onClick={onOpenPresentExhibit}
          className="p-2.5 rounded-xl bg-[#EDF2F4] hover:bg-white border border-[#8D99AE]/25 text-[#D90429] text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
        >
          <FilePlus className="w-4 h-4 text-[#D90429]" /> Present Exhibit
        </button>
      </div>

      {/* Participant Management Roster */}
      <div className="space-y-2 pt-2 border-t border-[#8D99AE]/20">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#2B2D42] uppercase tracking-wider block">
            Connected Courtroom Roster ({participants.length})
          </span>
        </div>

        {otherParticipants.length > 0 ? (
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {participants.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-2 rounded-xl bg-[#EDF2F4]/50 border border-[#8D99AE]/20 text-xs"
              >
                <div className="line-clamp-1 pr-2">
                  <span className="font-bold text-[#2B2D42] block">{p.name}</span>
                  <span className="text-[10px] text-[#8D99AE]">{p.courtRole}</span>
                </div>

                {p.courtRole !== 'Judge / Mentor' && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onMuteParticipant(p.id)}
                      title={p.isMuted ? 'Unmute' : 'Mute'}
                      className={`p-1.5 rounded-lg cursor-pointer ${
                        p.isMuted
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : 'bg-white text-[#8D99AE] hover:text-[#2B2D42]'
                      }`}
                    >
                      <MicOff className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onRemoveParticipant(p.id)}
                      title="Remove from Courtroom"
                      className="p-1.5 rounded-lg bg-white hover:bg-rose-100 text-[#8D99AE] hover:text-[#D90429] transition-colors cursor-pointer"
                    >
                      <UserX className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-3 rounded-2xl bg-[#EDF2F4]/50 border border-dashed border-[#8D99AE]/30 text-center text-[11px] text-[#8D99AE]">
            <Users className="w-4 h-4 text-[#8D99AE] mx-auto mb-1" />
            No external advocates or witnesses connected yet.
          </div>
        )}
      </div>
    </div>
  );
};
