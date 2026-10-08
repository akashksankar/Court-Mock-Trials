import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, PlusCircle, BookOpen, ShieldCheck, Award, Users, Gavel, Sparkles, ArrowRight, Video, FileText } from 'lucide-react';
import { useUser } from '../context/UserContext';

export const LandingPage: React.FC = () => {
  const { user, setRole } = useUser();

  return (
    <div className="min-h-screen bg-[#EDF2F4] text-[#2B2D42] flex flex-col justify-between selection:bg-[#EF233C]/20 selection:text-[#D90429] relative overflow-hidden">
      {/* Delicate background gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-b from-[#EF233C]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-tr from-[#8D99AE]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Main Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Hero Text Content */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#8D99AE]/30 text-[#2B2D42] text-xs font-bold uppercase tracking-wider shadow-xs backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#D90429]" />
              <span>INDIAN MOCK COURTROOM SIMULATOR</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-[#2B2D42] tracking-tight leading-none uppercase">
              COURT<span className="text-[#D90429]">VERSE</span>
            </h1>

            <p className="text-lg sm:text-2xl text-[#2B2D42]/85 font-semibold">
              Virtual Courtroom Practice Platform for Law Students
            </p>

            <p className="text-[#8D99AE] text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
              Step onto the virtual bench. Practice advocacy, cross-examine witnesses with real-time peer audio/video, and challenge evidence with statutory Bharatiya Sakshya Adhiniyam (BSA) 2023 objections.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                to="/dashboard"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D90429] to-[#EF233C] hover:from-[#ba0323] hover:to-[#df1a33] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#D90429]/25 transition-all flex items-center gap-2 hover:scale-[1.02]"
              >
                <Gavel className="w-4 h-4" /> Enter Courtroom
              </Link>

              <Link
                to="/create"
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#2B2D42] border border-[#8D99AE]/35 font-bold text-sm transition-all flex items-center gap-2 shadow-xs hover:border-[#EF233C]"
              >
                <PlusCircle className="w-4 h-4 text-emerald-600" /> Create Courtroom
              </Link>

              <Link
                to="/cases"
                className="px-6 py-3.5 rounded-xl bg-white/70 hover:bg-white text-[#8D99AE] hover:text-[#2B2D42] border border-[#8D99AE]/25 font-semibold text-sm transition-all flex items-center gap-2 shadow-xs"
              >
                <BookOpen className="w-4 h-4 text-blue-600" /> Explore Cases
              </Link>
            </div>

            {/* Active Identity Bar */}
            <div className="pt-6 border-t border-[#8D99AE]/25 max-w-md mx-auto lg:mx-0 text-xs">
              <span className="text-[#8D99AE] block mb-2.5 font-bold uppercase tracking-wider text-[11px]">
                Simulated Entry Identity:
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setRole('Judge')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    user.primaryRole === 'Judge'
                      ? 'bg-white border-[#D90429] text-[#D90429] font-bold shadow-xs'
                      : 'bg-white/60 border-[#8D99AE]/30 text-[#8D99AE] hover:text-[#2B2D42]'
                  }`}
                >
                  🧑‍⚖️ Judge / Mentor
                </button>

                <button
                  onClick={() => setRole('Student')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    user.primaryRole === 'Student'
                      ? 'bg-white border-[#D90429] text-[#D90429] font-bold shadow-xs'
                      : 'bg-white/60 border-[#8D99AE]/30 text-[#8D99AE] hover:text-[#2B2D42]'
                  }`}
                >
                  ⚖️ Student Counsel
                </button>

                <button
                  onClick={() => setRole('Spectator')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    user.primaryRole === 'Spectator'
                      ? 'bg-white border-[#D90429] text-[#D90429] font-bold shadow-xs'
                      : 'bg-white/60 border-[#8D99AE]/30 text-[#8D99AE] hover:text-[#2B2D42]'
                  }`}
                >
                  👥 Spectator
                </button>
              </div>
            </div>
          </div>

          {/* Right Hero Visual: Clean Light Architectural Schematic */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/95 p-6 sm:p-7 shadow-[0_25px_60px_-15px_rgba(43,45,66,0.12)] overflow-hidden">
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#EDF2F4] text-[#D90429] text-[10px] uppercase font-extrabold border border-[#8D99AE]/30 shadow-xs">
                SCHEMATIC CV-01 • TOP VIEW
              </div>

              <div className="text-center mb-5">
                <span className="text-sm font-extrabold text-[#2B2D42] uppercase tracking-wider block">
                  HIGH COURT SIMULATION DAIS
                </span>
                <p className="text-[11px] text-[#8D99AE] font-medium">Digital Top-View Architectural Layout</p>
              </div>

              {/* Court Interior Schematic Box */}
              <div className="space-y-3 bg-[#EDF2F4]/60 p-4 rounded-2xl border border-[#8D99AE]/25 text-xs">
                {/* Judge Dais */}
                <div className="p-3.5 rounded-xl bg-white border border-[#D90429]/40 text-center space-y-1 shadow-xs">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D90429]/10 text-[#D90429] text-[10px] font-bold">
                    <Gavel className="w-3 h-3" /> HON'BLE BENCH DAIS
                  </div>
                  <span className="text-[11px] text-[#2B2D42] block font-bold">The Presiding Judicial Chair</span>
                </div>

                {/* Middle: Counsel Tables & Witness Box */}
                <div className="grid grid-cols-3 gap-2.5 text-center">
                  <div className="p-3 rounded-xl bg-white border border-emerald-300 text-[#2B2D42] shadow-xs">
                    <span className="font-bold block text-[11px] text-emerald-800">⚖️ PETITIONER</span>
                    <span className="text-[10px] text-[#8D99AE]">Prosecution</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-purple-300 text-[#2B2D42] shadow-xs">
                    <span className="font-bold block text-[11px] text-purple-800">👤 WITNESS</span>
                    <span className="text-[10px] text-[#8D99AE]">Witness Box</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-blue-300 text-[#2B2D42] shadow-xs">
                    <span className="font-bold block text-[11px] text-blue-800">⚖️ RESPONDENT</span>
                    <span className="text-[10px] text-[#8D99AE]">Defense Counsel</span>
                  </div>
                </div>

                {/* Spectators */}
                <div className="p-2.5 rounded-xl bg-white border border-[#8D99AE]/25 text-center text-[#2B2D42] shadow-xs">
                  <span className="font-bold block text-[11px]">👥 SPECTATOR GALLERY</span>
                  <span className="text-[10px] text-[#8D99AE]">Law Student Observers & Faculty Evaluators</span>
                </div>
              </div>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-3 gap-2.5 mt-4 text-[11px] text-[#2B2D42] text-center font-medium">
                <div className="p-2.5 rounded-xl bg-white border border-[#8D99AE]/20 shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <span>BSA Objections</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#8D99AE]/20 shadow-xs">
                  <Video className="w-4 h-4 text-[#D90429] mx-auto mb-1" />
                  <span>WebRTC P2P Video</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#8D99AE]/20 shadow-xs">
                  <FileText className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                  <span>Live Evidence Exhibit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
