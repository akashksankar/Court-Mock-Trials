import React, { useState } from 'react';
import { Participant, ChatMessage, TimelineEvent, SpectatorQuestion, CourtRole } from '../types/courtroom';
import { CaseData, Exhibit } from '../types/case';
import { Users, BookOpen, FolderOpen, MessageSquare, Clock, HelpCircle, Send, FileText, Eye, ShieldAlert } from 'lucide-react';
import { WitnessSimEngine } from './WitnessSimEngine';

interface SidePanelProps {
  participants: Participant[];
  caseData: CaseData;
  chatMessages: ChatMessage[];
  timelineEvents: TimelineEvent[];
  spectatorQuestions: SpectatorQuestion[];
  userRole: CourtRole;
  onSendMessage: (text: string, category: 'GENERAL' | 'QUESTION' | 'COURT_NOTICE') => void;
  onInspectExhibit: (exhibit: Exhibit) => void;
  onPresentExhibit: (exhibit: Exhibit) => void;
  onSubmitSpectatorQuestion: (questionText: string) => void;
  onApproveSpectatorQuestion?: (id: string) => void;
}

type TabType = 'PEOPLE' | 'CASE' | 'EVIDENCE' | 'CHAT' | 'EVENTS' | 'SPECTATORS';

export const SidePanel: React.FC<SidePanelProps> = ({
  participants,
  caseData,
  chatMessages,
  timelineEvents,
  spectatorQuestions,
  userRole,
  onSendMessage,
  onInspectExhibit,
  onPresentExhibit,
  onSubmitSpectatorQuestion,
  onApproveSpectatorQuestion,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('CASE');
  const [inputText, setInputText] = useState('');
  const [chatCategory, setChatCategory] = useState<'GENERAL' | 'QUESTION' | 'COURT_NOTICE'>('GENERAL');
  const [spectatorInput, setSpectatorInput] = useState('');

  const privateFacts = caseData.privateFacts[userRole] || [];

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim(), chatCategory);
    setInputText('');
  };

  const handleSendSpectatorQ = (e: React.FormEvent) => {
    e.preventDefault();
    if (!spectatorInput.trim()) return;
    onSubmitSpectatorQuestion(spectatorInput.trim());
    setSpectatorInput('');
  };

  return (
    <div className="bg-white/90 backdrop-blur-xl border border-white/95 rounded-3xl h-full flex flex-col overflow-hidden text-[#2B2D42] shadow-[0_20px_50px_rgba(43,45,66,0.06)]">
      {/* Tab Navigation */}
      <div className="flex items-center gap-1 p-2 bg-[#EDF2F4]/70 border-b border-[#8D99AE]/20 text-[11px] font-bold overflow-x-auto">
        <button
          onClick={() => setActiveTab('CASE')}
          className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'CASE'
              ? 'bg-white text-[#D90429] border border-white shadow-xs font-bold'
              : 'text-[#8D99AE] hover:text-[#2B2D42]'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-[#D90429]" /> Case
        </button>

        <button
          onClick={() => setActiveTab('PEOPLE')}
          className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'PEOPLE'
              ? 'bg-white text-[#D90429] border border-white shadow-xs font-bold'
              : 'text-[#8D99AE] hover:text-[#2B2D42]'
          }`}
        >
          <Users className="w-3.5 h-3.5 text-emerald-600" /> People ({participants.length})
        </button>

        <button
          onClick={() => setActiveTab('EVIDENCE')}
          className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'EVIDENCE'
              ? 'bg-white text-[#D90429] border border-white shadow-xs font-bold'
              : 'text-[#8D99AE] hover:text-[#2B2D42]'
          }`}
        >
          <FolderOpen className="w-3.5 h-3.5 text-blue-600" /> Evidence
        </button>

        <button
          onClick={() => setActiveTab('CHAT')}
          className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'CHAT'
              ? 'bg-white text-[#D90429] border border-white shadow-xs font-bold'
              : 'text-[#8D99AE] hover:text-[#2B2D42]'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5 text-purple-600" /> Chat
        </button>

        <button
          onClick={() => setActiveTab('EVENTS')}
          className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'EVENTS'
              ? 'bg-white text-[#D90429] border border-white shadow-xs font-bold'
              : 'text-[#8D99AE] hover:text-[#2B2D42]'
          }`}
        >
          <Clock className="w-3.5 h-3.5 text-[#8D99AE]" /> Timeline
        </button>

        <button
          onClick={() => setActiveTab('SPECTATORS')}
          className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'SPECTATORS'
              ? 'bg-white text-[#D90429] border border-white shadow-xs font-bold'
              : 'text-[#8D99AE] hover:text-[#2B2D42]'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5 text-[#EF233C]" /> Q&A
        </button>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-4 text-xs">
        {/* 1. CASE DETAILS */}
        {activeTab === 'CASE' && (
          <div className="space-y-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#EDF2F4] text-[#D90429] text-[10px] font-bold uppercase border border-[#8D99AE]/25">
                {caseData.category} • {caseData.courtType}
              </span>
              <h3 className="text-base font-bold text-[#2B2D42] mt-1.5">
                {caseData.title}
              </h3>
              <p className="text-[11px] font-mono text-[#8D99AE] font-semibold">{caseData.caseNumber}</p>
            </div>

            {/* Confidential Counsel Notes */}
            {privateFacts.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200 text-[#2B2D42] space-y-1 shadow-xs">
                <div className="flex items-center gap-1.5 font-bold text-[11px] text-[#D90429]">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#D90429]" /> CONFIDENTIAL COUNSEL NOTES ({userRole}):
                </div>
                {privateFacts.map((fact, idx) => (
                  <p key={idx} className="text-[11px] text-[#2B2D42]/90 italic font-medium">
                    • {fact}
                  </p>
                ))}
              </div>
            )}

            {/* Key Facts */}
            <div className="space-y-1.5">
              <h4 className="font-bold text-[#2B2D42] uppercase tracking-wider text-[11px]">
                Case Summary & Facts
              </h4>
              <p className="text-[#8D99AE] leading-relaxed bg-[#EDF2F4]/50 p-3 rounded-2xl border border-[#8D99AE]/20 font-medium">
                {caseData.summary}
              </p>
              <ul className="space-y-1 pl-4 list-disc text-[#8D99AE] font-medium">
                {caseData.facts.map((fact, i) => (
                  <li key={i}>{fact}</li>
                ))}
              </ul>
            </div>

            {/* Applicable Indian Laws */}
            <div className="space-y-2 pt-2 border-t border-[#8D99AE]/20">
              <h4 className="font-bold text-[#2B2D42] uppercase tracking-wider text-[11px]">
                Applicable Statutory Provisions (BNS / BSA / Acts)
              </h4>
              <div className="space-y-2">
                {caseData.applicableLaws.map((law, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-[#EDF2F4]/50 border border-[#8D99AE]/20">
                    <span className="font-bold text-[#2B2D42] block">{law.act}</span>
                    <span className="font-mono text-[#D90429] block text-[11px] font-bold">{law.section}</span>
                    {law.formerRef && (
                      <span className="text-[10px] text-[#8D99AE] block italic">Former: {law.formerRef}</span>
                    )}
                    <p className="text-[11px] text-[#8D99AE] mt-1 font-medium">{law.summary}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulated Witness Examination Engine */}
            {caseData.witnesses.length > 0 && (
              <div className="pt-2 border-t border-[#8D99AE]/20 space-y-2">
                <h4 className="font-bold text-[#2B2D42] uppercase tracking-wider text-[11px]">
                  Simulated Witness Box
                </h4>
                {caseData.witnesses.map((wit) => (
                  <WitnessSimEngine key={wit.id} witness={wit} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* 2. PEOPLE ROSTER */}
        {activeTab === 'PEOPLE' && (
          <div className="space-y-2">
            <h4 className="font-bold text-[#2B2D42] uppercase tracking-wider text-[11px] mb-2">
              Connected Participants Roster ({participants.length})
            </h4>
            {participants.map((p) => (
              <div key={p.id} className="p-3 rounded-2xl bg-[#EDF2F4]/50 border border-[#8D99AE]/20 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2.5">
                  <img src={p.avatarUrl} alt={p.name} className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-xs" />
                  <div>
                    <span className="font-bold text-[#2B2D42] block">{p.name}</span>
                    <span className="text-[10px] text-[#D90429] font-bold">{p.courtRole}</span>
                  </div>
                </div>
                <div className="text-right text-[10px] text-[#8D99AE]">
                  <span className="block font-mono">{p.joinedAt}</span>
                  <span className={p.isMuted ? 'text-rose-600 font-bold' : 'text-emerald-600 font-bold'}>
                    {p.isMuted ? 'Muted' : 'Mic Active'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. EVIDENCE EXHIBITS */}
        {activeTab === 'EVIDENCE' && (
          <div className="space-y-3">
            <h4 className="font-bold text-[#2B2D42] uppercase tracking-wider text-[11px]">
              Court Evidence Exhibits ({caseData.evidence.length})
            </h4>

            {caseData.evidence.map((ex) => (
              <div key={ex.id} className="p-3.5 rounded-2xl bg-[#EDF2F4]/50 border border-[#8D99AE]/20 space-y-2 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#2B2D42]">{ex.title}</span>
                  <span className="px-2 py-0.5 rounded-full bg-white text-[#D90429] font-mono text-[9px] uppercase border border-[#8D99AE]/25 font-bold">
                    {ex.type}
                  </span>
                </div>
                <p className="text-[11px] text-[#8D99AE] font-medium">{ex.description}</p>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => onInspectExhibit(ex)}
                    className="flex-1 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-[#2B2D42] text-[11px] font-bold flex items-center justify-center gap-1 transition-colors border border-[#8D99AE]/25 shadow-xs cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#D90429]" /> Inspect
                  </button>

                  <button
                    onClick={() => onPresentExhibit(ex)}
                    className="flex-1 py-1.5 rounded-xl bg-gradient-to-r from-[#D90429] to-[#EF233C] text-white text-[11px] font-bold flex items-center justify-center gap-1 transition-all shadow-xs cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" /> Present
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4. CHAT */}
        {activeTab === 'CHAT' && (
          <div className="h-full flex flex-col justify-between space-y-3">
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="p-2.5 rounded-2xl bg-[#EDF2F4]/60 border border-[#8D99AE]/20 text-xs shadow-xs">
                  <div className="flex items-center justify-between text-[10px] text-[#8D99AE] mb-1">
                    <span className="font-bold text-[#2B2D42]">{msg.senderName} ({msg.senderRole})</span>
                    <span className="font-mono">{msg.timestamp}</span>
                  </div>
                  <p className="text-[#2B2D42] font-medium">{msg.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendChat} className="space-y-2 pt-2 border-t border-[#8D99AE]/20">
              <div className="flex gap-1.5 text-[10px]">
                <button
                  type="button"
                  onClick={() => setChatCategory('GENERAL')}
                  className={`px-2.5 py-0.5 rounded-full font-bold cursor-pointer ${
                    chatCategory === 'GENERAL' ? 'bg-[#2B2D42] text-white' : 'bg-[#EDF2F4] text-[#8D99AE]'
                  }`}
                >
                  General
                </button>
                <button
                  type="button"
                  onClick={() => setChatCategory('QUESTION')}
                  className={`px-2.5 py-0.5 rounded-full font-bold cursor-pointer ${
                    chatCategory === 'QUESTION' ? 'bg-[#2B2D42] text-white' : 'bg-[#EDF2F4] text-[#8D99AE]'
                  }`}
                >
                  Question
                </button>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type courtroom chat..."
                  className="flex-1 bg-[#EDF2F4]/60 border border-[#8D99AE]/30 rounded-xl p-2.5 text-xs text-[#2B2D42] placeholder-[#8D99AE] focus:outline-none focus:border-[#EF233C] focus:bg-white shadow-xs transition-all"
                />
                <button type="submit" className="px-3.5 py-2.5 bg-gradient-to-r from-[#D90429] to-[#EF233C] text-white rounded-xl font-bold shadow-xs cursor-pointer">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 5. TIMELINE EVENTS */}
        {activeTab === 'EVENTS' && (
          <div className="space-y-2">
            <h4 className="font-bold text-[#2B2D42] uppercase tracking-wider text-[11px] mb-2">
              Official Hearing Timeline Log
            </h4>
            {timelineEvents.map((evt) => (
              <div key={evt.id} className="p-3 rounded-2xl bg-[#EDF2F4]/50 border border-[#8D99AE]/20 flex items-start gap-2.5 shadow-xs">
                <span className="font-mono text-[10px] text-[#D90429] font-bold pt-0.5">{evt.time}</span>
                <div>
                  <span className="font-bold text-[#2B2D42] block">{evt.title}</span>
                  <p className="text-[11px] text-[#8D99AE] font-medium">{evt.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 6. SPECTATOR QUESTIONS */}
        {activeTab === 'SPECTATORS' && (
          <div className="space-y-3">
            <h4 className="font-bold text-[#2B2D42] uppercase tracking-wider text-[11px]">
              Spectator Gallery Q&A
            </h4>

            {spectatorQuestions.map((q) => (
              <div key={q.id} className="p-3 rounded-2xl bg-[#EDF2F4]/50 border border-[#8D99AE]/20 text-xs space-y-1 shadow-xs">
                <div className="flex items-center justify-between text-[10px] text-[#8D99AE]">
                  <span className="font-bold text-[#2B2D42]">{q.senderName}</span>
                  <span className="font-mono">{q.timestamp}</span>
                </div>
                <p className="text-[#2B2D42] font-medium">"{q.question}"</p>
                <div className="flex items-center justify-between pt-1">
                  <span className={`text-[10px] font-bold ${q.status === 'ALLOWED' ? 'text-emerald-700' : 'text-[#D90429]'}`}>
                    Status: {q.status}
                  </span>
                  {userRole === 'Judge / Mentor' && q.status === 'PENDING' && (
                    <button
                      onClick={() => onApproveSpectatorQuestion?.(q.id)}
                      className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-bold shadow-xs cursor-pointer"
                    >
                      Approve Question
                    </button>
                  )}
                </div>
              </div>
            ))}

            <form onSubmit={handleSendSpectatorQ} className="pt-2 border-t border-[#8D99AE]/20 space-y-2">
              <input
                type="text"
                value={spectatorInput}
                onChange={(e) => setSpectatorInput(e.target.value)}
                placeholder="Ask Bench a spectator question..."
                className="w-full bg-[#EDF2F4]/60 border border-[#8D99AE]/30 rounded-xl p-2.5 text-xs text-[#2B2D42] placeholder-[#8D99AE] focus:outline-none focus:border-[#EF233C] focus:bg-white shadow-xs transition-all"
              />
              <button type="submit" className="w-full py-2 bg-gradient-to-r from-[#D90429] to-[#EF233C] text-white font-bold rounded-xl text-xs shadow-xs cursor-pointer">
                Submit Question to Bench
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
