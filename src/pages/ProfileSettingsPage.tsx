import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { UserRole } from '../types/courtroom';
import { User, CheckCircle2, RotateCcw, KeyRound, LogOut, ShieldCheck, Code2 } from 'lucide-react';

export const ProfileSettingsPage: React.FC = () => {
  const { user, updateUser, setRole, resetProfile, jwtToken, decodedJWT, logout } = useUser();

  const [name, setName] = useState(user.name);
  const [college, setCollege] = useState(user.college);
  const [barNumber, setBarNumber] = useState(user.barNumber || '');
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
  const [savedMessage, setSavedMessage] = useState(false);
  const [showRawToken, setShowRawToken] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name,
      college,
      barNumber,
      avatarUrl,
    });
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#EDF2F4] text-[#2B2D42] p-4 sm:p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white/85 backdrop-blur-2xl border border-white/95 rounded-3xl p-6 sm:p-9 shadow-[0_25px_60px_-15px_rgba(43,45,66,0.1)] space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-[#8D99AE]/20">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D90429] to-[#EF233C] flex items-center justify-center text-white shadow-md shadow-[#D90429]/20">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-[#2B2D42] tracking-tight">
                Advocate Profile & JWT Settings
              </h1>
              <p className="text-xs text-[#8D99AE] font-medium">
                Manage your credentials, courtroom capacity, and authenticated JWT session.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={logout}
            className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-[#D90429] border border-rose-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Primary Role Switcher */}
        <div className="p-4 rounded-2xl bg-[#EDF2F4]/70 border border-[#8D99AE]/25 space-y-2 text-xs">
          <span className="font-bold text-[#2B2D42] uppercase tracking-wider text-[11px] block">
            Primary Courtroom Role / Capacity
          </span>
          <div className="grid grid-cols-3 gap-2">
            {(['Judge', 'Student', 'Spectator'] as UserRole[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`py-2 px-3 rounded-xl border font-bold transition-all text-center cursor-pointer ${
                  user.primaryRole === r
                    ? 'bg-[#2B2D42] text-white border-[#2B2D42] shadow-xs'
                    : 'bg-white text-[#8D99AE] border-[#8D99AE]/25 hover:text-[#2B2D42]'
                }`}
              >
                {r === 'Judge' ? '🧑‍⚖️ Hon. Judge' : r === 'Student' ? '⚖️ Student Counsel' : '👥 Spectator'}
              </button>
            ))}
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-[#2B2D42] uppercase tracking-wider text-[11px] block">
              Full Legal Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#EDF2F4]/60 border border-[#8D99AE]/30 rounded-xl p-3 text-[#2B2D42] text-xs focus:outline-none focus:border-[#EF233C] focus:bg-white shadow-xs transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#2B2D42] uppercase tracking-wider text-[11px] block">
              Law School / University / Bar Association
            </label>
            <input
              type="text"
              required
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              className="w-full bg-[#EDF2F4]/60 border border-[#8D99AE]/30 rounded-xl p-3 text-[#2B2D42] text-xs focus:outline-none focus:border-[#EF233C] focus:bg-white shadow-xs transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#2B2D42] uppercase tracking-wider text-[11px] block">
              Bar Council Roll No. / Student Roll ID
            </label>
            <input
              type="text"
              value={barNumber}
              onChange={(e) => setBarNumber(e.target.value)}
              placeholder="e.g. KA/2025/9921"
              className="w-full bg-[#EDF2F4]/60 border border-[#8D99AE]/30 rounded-xl p-3 text-[#2B2D42] text-xs focus:outline-none focus:border-[#EF233C] focus:bg-white font-mono shadow-xs transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#2B2D42] uppercase tracking-wider text-[11px] block">
              Avatar Image URL
            </label>
            <div className="flex items-center gap-3">
              <img
                src={avatarUrl}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-xs shrink-0"
              />
              <input
                type="url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="w-full bg-[#EDF2F4]/60 border border-[#8D99AE]/30 rounded-xl p-3 text-[#2B2D42] text-xs focus:outline-none focus:border-[#EF233C] focus:bg-white shadow-xs transition-all"
              />
            </div>
          </div>

          {/* Localhost JWT Session Status Card */}
          <div className="p-4 rounded-2xl bg-[#EDF2F4]/70 border border-[#8D99AE]/25 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#2B2D42] flex items-center gap-1.5 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Active Localhost JWT Session
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                HS256 VALID
              </span>
            </div>

            <p className="text-[11px] text-[#8D99AE] font-medium">
              Issued for: <strong className="text-[#2B2D42]">{user.name}</strong> • Subject ID: <span className="font-mono text-[#D90429]">{user.id}</span>
            </p>

            <button
              type="button"
              onClick={() => setShowRawToken(!showRawToken)}
              className="text-[11px] text-[#D90429] hover:underline font-semibold flex items-center gap-1 cursor-pointer pt-1"
            >
              <Code2 className="w-3.5 h-3.5" />
              {showRawToken ? 'Hide Raw JWT Token' : 'Inspect Raw Encoded Token'}
            </button>

            {showRawToken && jwtToken && (
              <div className="p-2.5 rounded-xl bg-[#2B2D42] text-[#EDF2F4] text-[9.5px] font-mono break-all mt-2">
                {jwtToken}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#8D99AE]/20">
            <button
              type="button"
              onClick={resetProfile}
              className="px-4 py-2.5 rounded-xl bg-[#EDF2F4] hover:bg-white text-[#8D99AE] hover:text-[#2B2D42] text-xs font-semibold flex items-center gap-1.5 transition-all border border-[#8D99AE]/25 shadow-xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Profile
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D90429] to-[#EF233C] hover:from-[#ba0323] hover:to-[#df1a33] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#D90429]/20 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" /> Save Profile
            </button>
          </div>

          {savedMessage && (
            <p className="text-center text-xs text-emerald-600 font-bold animate-pulse">
              Profile updated and new JWT token re-issued!
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
