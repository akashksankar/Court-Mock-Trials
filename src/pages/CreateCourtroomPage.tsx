import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CASE_LIBRARY } from '../data/cases';
import { useUser } from '../context/UserContext';
import { PlusCircle, Copy, Share2, Check, Gavel, Scale, Sparkles } from 'lucide-react';
import { soundManager } from '../audio/soundManager';

export const CreateCourtroomPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useUser();

  const initialCaseId = searchParams.get('caseId') || CASE_LIBRARY[0].id;

  const [courtroomName, setCourtroomName] = useState('CourtVerse Mock Court #01');
  const [selectedCaseId, setSelectedCaseId] = useState(initialCaseId);
  const [courtType, setCourtType] = useState<'High Court' | 'District & Sessions Court' | 'Supreme Court Simulation'>('High Court');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [judgeName, setJudgeName] = useState(user.name);
  const [createdRoomCode, setCreatedRoomCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const selectedCase = CASE_LIBRARY.find((c) => c.id === selectedCaseId) || CASE_LIBRARY[0];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.play('gavel');

    // Generate short courtroom code
    const code = `CV-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    setCreatedRoomCode(code);
  };

  const handleCopyCode = () => {
    if (createdRoomCode) {
      navigator.clipboard.writeText(createdRoomCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#EDF2F4] text-[#2B2D42] p-4 sm:p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white/85 backdrop-blur-2xl border border-white/95 rounded-3xl p-6 sm:p-9 shadow-[0_25px_60px_-15px_rgba(43,45,66,0.1)] space-y-6">
        <div className="flex items-center gap-3.5 pb-5 border-b border-[#8D99AE]/20">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D90429] to-[#EF233C] flex items-center justify-center text-white shadow-md shadow-[#D90429]/20">
            <Scale className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-[#2B2D42] tracking-tight">
              Create Virtual Courtroom
            </h1>
            <p className="text-xs text-[#8D99AE] font-medium">
              Establish a simulated bench session with WebRTC audio/video and invite student advocates.
            </p>
          </div>
        </div>

        {!createdRoomCode ? (
          <form onSubmit={handleCreate} className="space-y-4 text-xs">
            {/* Courtroom Title */}
            <div className="space-y-1">
              <label className="font-bold text-[#2B2D42] uppercase tracking-wider text-[11px] block">
                Courtroom Session Title
              </label>
              <input
                type="text"
                required
                value={courtroomName}
                onChange={(e) => setCourtroomName(e.target.value)}
                className="w-full bg-[#EDF2F4]/60 border border-[#8D99AE]/30 rounded-xl p-3 text-[#2B2D42] text-xs focus:outline-none focus:border-[#EF233C] focus:bg-white shadow-xs transition-all"
              />
            </div>

            {/* Select Case */}
            <div className="space-y-1">
              <label className="font-bold text-[#2B2D42] uppercase tracking-wider text-[11px] block">
                Select Indian Legal Case Scenario
              </label>
              <select
                value={selectedCaseId}
                onChange={(e) => setSelectedCaseId(e.target.value)}
                className="w-full bg-[#EDF2F4]/60 border border-[#8D99AE]/30 rounded-xl p-3 text-[#2B2D42] text-xs focus:outline-none focus:border-[#EF233C] focus:bg-white shadow-xs transition-all cursor-pointer font-medium"
              >
                {CASE_LIBRARY.map((cs) => (
                  <option key={cs.id} value={cs.id}>
                    [{cs.category}] {cs.title} ({cs.caseNumber})
                  </option>
                ))}
              </select>
            </div>

            {/* Selected Case Summary Card */}
            <div className="p-3.5 rounded-2xl bg-[#EDF2F4]/70 border border-[#8D99AE]/25 text-[#2B2D42] leading-relaxed shadow-xs">
              <span className="font-bold text-[#D90429] block mb-1">
                Selected Case: {selectedCase.title}
              </span>
              <p className="line-clamp-2 text-[11px] text-[#8D99AE]">{selectedCase.summary}</p>
            </div>

            {/* Court Type & Difficulty */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-[#2B2D42] uppercase tracking-wider text-[11px] block">
                  Court Type
                </label>
                <select
                  value={courtType}
                  onChange={(e) => setCourtType(e.target.value as unknown as typeof courtType)}
                  className="w-full bg-[#EDF2F4]/60 border border-[#8D99AE]/30 rounded-xl p-3 text-[#2B2D42] focus:outline-none focus:border-[#EF233C] focus:bg-white shadow-xs cursor-pointer font-medium"
                >
                  <option value="High Court">High Court</option>
                  <option value="District & Sessions Court">District & Sessions Court</option>
                  <option value="Supreme Court Simulation">Supreme Court Simulation</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#2B2D42] uppercase tracking-wider text-[11px] block">
                  Trial Difficulty
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as unknown as typeof difficulty)}
                  className="w-full bg-[#EDF2F4]/60 border border-[#8D99AE]/30 rounded-xl p-3 text-[#2B2D42] focus:outline-none focus:border-[#EF233C] focus:bg-white shadow-xs cursor-pointer font-medium"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            {/* Judge Presiding Name */}
            <div className="space-y-1">
              <label className="font-bold text-[#2B2D42] uppercase tracking-wider text-[11px] block">
                Presiding Judge / Mentor Name
              </label>
              <input
                type="text"
                required
                value={judgeName}
                onChange={(e) => setJudgeName(e.target.value)}
                className="w-full bg-[#EDF2F4]/60 border border-[#8D99AE]/30 rounded-xl p-3 text-[#2B2D42] text-xs focus:outline-none focus:border-[#EF233C] focus:bg-white shadow-xs transition-all"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D90429] to-[#EF233C] hover:from-[#ba0323] hover:to-[#df1a33] text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-[#D90429]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <PlusCircle className="w-5 h-5" /> CREATE COURTROOM SESSION
              </button>
            </div>
          </form>
        ) : (
          /* SUCCESS SCREEN */
          <div className="text-center space-y-6 py-4 animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 border border-emerald-300 mx-auto flex items-center justify-center text-emerald-800 shadow-sm">
              <Gavel className="w-8 h-8" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-mono text-xs font-bold uppercase border border-emerald-300">
                COURTROOM CREATED SUCCESSFULLY
              </span>
              <h2 className="text-2xl font-bold text-[#2B2D42] mt-2">
                {courtroomName}
              </h2>
              <p className="text-xs text-[#8D99AE] mt-1 font-medium">Presiding: {judgeName}</p>
            </div>

            {/* CODE BOX */}
            <div className="p-6 rounded-3xl bg-[#EDF2F4] border border-[#8D99AE]/30 max-w-sm mx-auto space-y-2 shadow-xs">
              <span className="text-[#8D99AE] font-mono text-xs uppercase block font-bold">COURT CODE</span>
              <span className="font-mono text-4xl font-black text-[#D90429] tracking-widest block">
                {createdRoomCode}
              </span>
              <p className="text-[11px] text-[#8D99AE] font-medium">Share this code with counsel, witnesses & evaluators</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleCopyCode}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#2B2D42] text-xs font-bold flex items-center gap-1.5 transition-colors border border-[#8D99AE]/30 shadow-xs cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#D90429]" />}
                {copied ? 'Code Copied!' : 'Copy Code'}
              </button>

              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: 'CourtVerse Courtroom', text: `Join my courtroom: ${createdRoomCode}` });
                  } else {
                    handleCopyCode();
                  }
                }}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#2B2D42] text-xs font-bold flex items-center gap-1.5 transition-colors border border-[#8D99AE]/30 shadow-xs cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-blue-600" /> Share
              </button>

              <button
                onClick={() => navigate(`/courtroom/${createdRoomCode}`)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D90429] to-[#EF233C] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#D90429]/20 cursor-pointer"
              >
                ENTER COURTROOM
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
