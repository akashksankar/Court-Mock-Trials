import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { CASE_LIBRARY } from '../data/cases';
import { Gavel, PlusCircle, BookOpen, Award, AlertTriangle, ArrowRight, Shield, Calendar, MapPin, Sparkles } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user, setRole } = useUser();

  const isJudge = user.primaryRole === 'Judge';

  return (
    <div className="min-h-screen bg-[#EDF2F4] text-[#2B2D42] p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/95 shadow-[0_20px_50px_rgba(43,45,66,0.06)]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-0.5 rounded-full bg-[#EDF2F4] text-[#D90429] text-[10px] font-extrabold uppercase border border-[#8D99AE]/30">
                {user.primaryRole} PORTAL • JWT VERIFIED
              </span>
              <span className="text-xs text-[#8D99AE] font-medium">{user.college}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#2B2D42] tracking-tight">
              Good day, {user.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#8D99AE] mt-1 font-medium">
              Virtual courtroom advocacy workspace & simulated judicial trials.
            </p>
          </div>

          {/* Quick Role Toggle */}
          <div className="flex items-center gap-2 bg-[#EDF2F4] p-1.5 rounded-2xl border border-[#8D99AE]/25 text-xs">
            <span className="text-[#8D99AE] text-[11px] px-2 font-bold uppercase">Role:</span>
            <button
              onClick={() => setRole('Student')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                !isJudge
                  ? 'bg-white text-[#D90429] border border-white shadow-xs font-extrabold'
                  : 'text-[#8D99AE] hover:text-[#2B2D42]'
              }`}
            >
              Student Counsel
            </button>
            <button
              onClick={() => setRole('Judge')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                isJudge
                  ? 'bg-white text-[#D90429] border border-white shadow-xs font-extrabold'
                  : 'text-[#8D99AE] hover:text-[#2B2D42]'
              }`}
            >
              Hon. Judge / Mentor
            </button>
          </div>
        </div>

        {/* STUDENT ADVOCATE DASHBOARD CONTENT */}
        {!isJudge && (
          <div className="space-y-8">
            {/* Next Hearing Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-xl border border-white/90 shadow-[0_20px_50px_rgba(43,45,66,0.06)] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#D90429] to-[#EF233C]" />

              <div className="space-y-2.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EF233C]/10 text-[#D90429] text-xs font-bold uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-[#D90429]" />
                  <span>UPCOMING MOCK TRIAL SESSION</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2B2D42]">
                  Cyber Fraud UPI Simulation Trial
                </h2>
                <p className="text-xs sm:text-sm text-[#8D99AE] font-medium">
                  Case No: <span className="font-mono text-[#D90429] font-bold">CV-2026-CRIM-001</span> • State of Kerala vs. Arjun Menon
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#8D99AE] pt-1 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#D90429]" /> Ready to Join (WebRTC Active)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" /> High Court Simulation Bench #01
                  </span>
                </div>
              </div>

              <Link
                to="/courtroom/CV-7X92"
                className="px-7 py-4 rounded-2xl bg-gradient-to-r from-[#D90429] to-[#EF233C] hover:from-[#ba0323] hover:to-[#df1a33] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#D90429]/25 flex items-center gap-2 whitespace-nowrap transition-all hover:scale-[1.02]"
              >
                <Gavel className="w-5 h-5" /> ENTER COURTROOM
              </Link>
            </div>

            {/* Practice Statistics Grid */}
            <div>
              <h3 className="text-sm font-bold text-[#8D99AE] mb-4 uppercase tracking-wider">
                Advocate Performance Statistics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/90 text-center shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-[#EDF2F4] flex items-center justify-center text-[#D90429] mx-auto mb-2">
                    <Gavel className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-black text-[#2B2D42] block">{user.hearingsCount}</span>
                  <span className="text-xs text-[#8D99AE] font-medium">Hearings Completed</span>
                </div>

                <div className="p-5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/90 text-center shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-[#EDF2F4] flex items-center justify-center text-blue-600 mx-auto mb-2">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-black text-[#2B2D42] block">{user.casesCount}</span>
                  <span className="text-xs text-[#8D99AE] font-medium">Cases Practiced</span>
                </div>

                <div className="p-5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/90 text-center shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-[#EDF2F4] flex items-center justify-center text-emerald-600 mx-auto mb-2">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-black text-[#2B2D42] block">{user.scoreAvg}%</span>
                  <span className="text-xs text-[#8D99AE] font-medium">Average Advocacy Score</span>
                </div>

                <div className="p-5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/90 text-center shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-[#EDF2F4] flex items-center justify-center text-[#EF233C] mx-auto mb-2">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-black text-[#2B2D42] block">{user.objectionsRaised}</span>
                  <span className="text-xs text-[#8D99AE] font-medium">Objections Raised</span>
                </div>
              </div>
            </div>

            {/* Featured Cases Library Preview */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#8D99AE] uppercase tracking-wider">
                  Recommended Educational Cases
                </h3>
                <Link to="/cases" className="text-xs text-[#D90429] hover:underline flex items-center gap-1 font-bold">
                  View All Cases <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {CASE_LIBRARY.slice(0, 3).map((cs) => (
                  <div
                    key={cs.id}
                    className="p-5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/90 hover:border-[#EF233C]/50 transition-all space-y-3 flex flex-col justify-between shadow-xs hover:shadow-md"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#EDF2F4] text-[#D90429] text-[10px] font-bold border border-[#8D99AE]/25">
                          {cs.category}
                        </span>
                        <span className="text-[10px] text-[#8D99AE] font-semibold">{cs.difficulty}</span>
                      </div>
                      <h4 className="text-sm font-bold text-[#2B2D42]">{cs.title}</h4>
                      <p className="text-xs text-[#8D99AE] line-clamp-2 mt-1">{cs.summary}</p>
                    </div>

                    <Link
                      to={`/create?caseId=${cs.id}`}
                      className="w-full py-2.5 bg-[#EDF2F4] hover:bg-white text-[#2B2D42] hover:text-[#D90429] text-xs font-bold rounded-xl text-center block transition-all border border-[#8D99AE]/20 shadow-xs"
                    >
                      Start Mock Trial
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* JUDGE / MENTOR DASHBOARD CONTENT */}
        {isJudge && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-xl border border-white/95 shadow-[0_20px_50px_rgba(43,45,66,0.06)]">
              <div>
                <h2 className="text-2xl font-bold text-[#2B2D42]">
                  MY VIRTUAL COURTROOM BENCH
                </h2>
                <p className="text-xs text-[#8D99AE] mt-1 font-medium">
                  Preside over student hearings, rule on BSA objections, call witnesses, and deliver final judgments.
                </p>
              </div>

              <Link
                to="/create"
                className="px-6 py-3.5 bg-gradient-to-r from-[#D90429] to-[#EF233C] text-white font-bold text-xs rounded-xl shadow-lg shadow-[#D90429]/25 flex items-center gap-2 whitespace-nowrap transition-all"
              >
                <PlusCircle className="w-4 h-4 text-white" /> CREATE NEW COURTROOM
              </Link>
            </div>

            {/* Active & Scheduled Sessions */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#8D99AE] uppercase tracking-wider">
                My Active & Scheduled Sessions
              </h3>

              <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/90 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-bold border border-emerald-300 uppercase">
                      ACTIVE SESSION
                    </span>
                    <span className="text-xs text-[#D90429] font-mono font-bold">ROOM CODE: CV-7X92</span>
                  </div>
                  <h4 className="text-base font-bold text-[#2B2D42]">
                    CourtVerse Mock Court #01 — Cyber Crime UPI Trial
                  </h4>
                  <p className="text-xs text-[#8D99AE]">State of Kerala vs. Arjun Menon • Multi-party WebRTC courtroom</p>
                </div>

                <Link
                  to="/courtroom/CV-7X92"
                  className="px-5 py-2.5 bg-[#2B2D42] hover:bg-[#D90429] text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                >
                  PRESIDE OVER BENCH
                </Link>
              </div>
            </div>

            {/* Student Evaluation Summary */}
            <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/90 space-y-4 shadow-xs">
              <h3 className="text-sm font-bold text-[#8D99AE] uppercase tracking-wider">
                Student Advocacy Performance Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-[#EDF2F4]/60 border border-[#8D99AE]/20">
                  <span className="font-bold text-[#2B2D42] block">Top Performer: Adv. Ananya Deshmukh</span>
                  <span className="text-[#8D99AE]">NLSIU Bengaluru • 94% BSA Compliance Score</span>
                </div>
                <div className="p-4 rounded-xl bg-[#EDF2F4]/60 border border-[#8D99AE]/20">
                  <span className="font-bold text-[#2B2D42] block">Total Objections Ruled: 38</span>
                  <span className="text-[#8D99AE]">28 Sustained • 10 Overruled</span>
                </div>
                <div className="p-4 rounded-xl bg-[#EDF2F4]/60 border border-[#8D99AE]/20">
                  <span className="font-bold text-[#2B2D42] block">Average Session Duration</span>
                  <span className="text-[#8D99AE]">42 Minutes per mock trial</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
