import React, { useState } from 'react';
import { ObjectionType, ObjectionEvent, CourtRole } from '../types/courtroom';
import { AlertTriangle, Gavel, CheckCircle, XCircle, X } from 'lucide-react';
import { soundManager } from '../audio/soundManager';

interface RaiseObjectionProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitObjection: (type: ObjectionType) => void;
}

const OBJECTION_TYPES: { type: ObjectionType; desc: string }[] = [
  { type: 'Relevance', desc: 'Question or testimony does not relate to facts in issue under BSA.' },
  { type: 'Hearsay', desc: 'Out-of-court statement offered to prove truth of matter asserted.' },
  { type: 'Leading Question', desc: 'Suggests the answer during direct examination.' },
  { type: 'Speculation', desc: 'Asks witness to guess rather than state personal knowledge.' },
  { type: 'Argumentative', desc: 'Designed to badger or argue with witness rather than elicit facts.' },
  { type: 'Compound Question', desc: 'Combines multiple questions into a single confusing inquiry.' },
  { type: 'Asked and Answered', desc: 'Question has already been posed and answered previously.' },
  { type: 'Assumes Facts', desc: 'Presupposes facts not yet established on record.' },
  { type: 'Lack of Foundation', desc: 'Sufficient preliminary evidence has not been shown.' },
];

export const RaiseObjectionModal: React.FC<RaiseObjectionProps> = ({ isOpen, onClose, onSubmitObjection }) => {
  const [selectedType, setSelectedType] = useState<ObjectionType>('Leading Question');

  if (!isOpen) return null;

  const handleSubmit = () => {
    soundManager.play('objection');
    onSubmitObjection(selectedType);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2B2D42]/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-2xl border border-white/95 rounded-3xl max-w-lg w-full p-6 sm:p-7 text-[#2B2D42] shadow-[0_25px_60px_-15px_rgba(43,45,66,0.18)] relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8D99AE] hover:text-[#2B2D42] p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-11 h-11 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-[#D90429] shadow-xs">
            <AlertTriangle className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#2B2D42]">
              RAISE FORMAL OBJECTION
            </h3>
            <p className="text-xs text-[#8D99AE]">
              Select statutory grounds under BSA Evidence Rules to challenge opposing counsel.
            </p>
          </div>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto pr-1 mb-6 text-xs">
          {OBJECTION_TYPES.map((obj) => (
            <label
              key={obj.type}
              className={`flex items-start gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                selectedType === obj.type
                  ? 'bg-rose-50/80 border-[#EF233C] text-[#2B2D42] shadow-xs'
                  : 'bg-[#EDF2F4]/60 border-[#8D99AE]/25 text-[#2B2D42] hover:bg-white'
              }`}
            >
              <input
                type="radio"
                name="objection-type"
                checked={selectedType === obj.type}
                onChange={() => setSelectedType(obj.type)}
                className="mt-0.5 accent-[#D90429]"
              />
              <div>
                <span className="font-bold text-xs sm:text-sm block text-[#2B2D42]">{obj.type}</span>
                <span className="text-[11px] text-[#8D99AE] font-medium">{obj.desc}</span>
              </div>
            </label>
          ))}
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#8D99AE]/20">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-[#EDF2F4] hover:bg-white text-[#8D99AE] hover:text-[#2B2D42] text-xs font-semibold cursor-pointer border border-[#8D99AE]/20 shadow-xs"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D90429] to-[#EF233C] hover:from-[#ba0323] hover:to-[#df1a33] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#D90429]/20 flex items-center gap-1.5 cursor-pointer"
          >
            <AlertTriangle className="w-4 h-4" /> SUBMIT OBJECTION
          </button>
        </div>
      </div>
    </div>
  );
};

interface RuleObjectionProps {
  objection: ObjectionEvent | null;
  userRole: CourtRole;
  onRule: (objectionId: string, decision: 'SUSTAINED' | 'OVERRULED') => void;
}

export const RuleObjectionBanner: React.FC<RuleObjectionProps> = ({ objection, userRole, onRule }) => {
  if (!objection || objection.decision) return null;

  const isJudge = userRole === 'Judge / Mentor';

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-xl w-[92%] bg-white/95 backdrop-blur-2xl border-2 border-[#EF233C] rounded-2xl p-4 text-[#2B2D42] shadow-[0_20px_50px_rgba(239,35,60,0.18)] animate-bounce">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-[#D90429] shadow-xs">
            <Gavel className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-[#EF233C]/10 text-[#D90429] font-bold text-[10px] uppercase border border-[#EF233C]/30">
                FORMAL OBJECTION RAISED
              </span>
              <span className="text-[11px] text-[#8D99AE] font-mono">{objection.timestamp}</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-[#2B2D42] mt-0.5">
              {objection.raisedBy} ({objection.raisedByRole}):{' '}
              <span className="text-[#D90429]">"{objection.type}"</span>
            </p>
          </div>
        </div>

        {isJudge ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundManager.play('sustained');
                onRule(objection.id, 'SUSTAINED');
              }}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
            >
              <CheckCircle className="w-3.5 h-3.5" /> SUSTAIN
            </button>
            <button
              onClick={() => {
                soundManager.play('overruled');
                onRule(objection.id, 'OVERRULED');
              }}
              className="px-3 py-1.5 rounded-xl bg-[#2B2D42] hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
            >
              <XCircle className="w-3.5 h-3.5" /> OVERRULE
            </button>
          </div>
        ) : (
          <div className="text-right">
            <span className="text-xs font-semibold text-[#D90429] block animate-pulse">
              Awaiting Bench Ruling...
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
