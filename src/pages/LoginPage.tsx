import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { UserRole } from '../types/courtroom';
import { Scale, Lock, Mail, User, ShieldCheck, KeyRound, Sparkles, Code2, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../audio/soundManager';

export const LoginPage: React.FC = () => {
  const { loginWithJWT } = useUser();

  const [email, setEmail] = useState('afsa.advocate@courtverse.local');
  const [password, setPassword] = useState('lawyer2026');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('Adv. Afsa Manakkal');
  const [role, setRole] = useState<UserRole>('Student');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [showTokenPreview, setShowTokenPreview] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim()) {
      setErrorMsg('Please enter an advocate email address.');
      return;
    }

    if (!password.trim()) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setIsLoading(true);
    soundManager.play('gavel');

    setTimeout(() => {
      const nameToUse = isRegisterMode ? fullName.trim() : fullName.trim() || email.split('@')[0];
      loginWithJWT(email.trim(), nameToUse, role);
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#EDF2F4] text-[#2B2D42] relative flex flex-col justify-between items-center px-4 py-8 sm:py-12 overflow-x-hidden selection:bg-[#EF233C]/20 selection:text-[#D90429]">
      {/* Soft Ambient Floating Background Orbs for Glassmorphism depth */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#EF233C]/15 to-[#D90429]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[550px] h-[550px] rounded-full bg-gradient-to-tl from-[#8D99AE]/25 to-[#2B2D42]/10 blur-3xl pointer-events-none" />
      <div className="absolute top-[35%] right-[15%] w-[350px] h-[350px] rounded-full bg-[#EF233C]/8 blur-2xl pointer-events-none" />

      {/* Top Brand Header */}
      <div className="relative z-10 w-full max-w-md text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#8D99AE]/30 text-[#2B2D42] text-[11px] font-semibold tracking-wide shadow-xs backdrop-blur-md mb-4">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D90429]" />
          <span>Localhost JWT Authentication • HS256 Standard</span>
        </div>

        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D90429] to-[#EF233C] flex items-center justify-center text-white shadow-lg shadow-[#D90429]/25">
            <Scale className="w-6 h-6 text-white stroke-[2.2]" />
          </div>
          <div className="text-left">
            <h1 className="text-2xl sm:text-3xl font-black text-[#2B2D42] tracking-tight leading-none">
              CourtVerse
            </h1>
            <p className="text-[11px] sm:text-xs text-[#8D99AE] font-medium tracking-wide mt-0.5">
              Virtual Courtroom Advocacy Platform
            </p>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white/85 backdrop-blur-2xl border border-white/95 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(43,45,66,0.12)] transition-all">
        {/* Card Header */}
        <div className="pb-5 border-b border-[#8D99AE]/20 mb-5">
          <h2 className="text-lg sm:text-xl font-bold text-[#2B2D42]">
            {isRegisterMode ? 'Advocate Registration' : 'Advocate Sign In'}
          </h2>
          <p className="text-xs text-[#8D99AE] mt-0.5">
            {isRegisterMode
              ? 'Create your credentials to issue a signed JWT session'
              : 'Sign in to access virtual courtrooms, trials & tools'}
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-[#D90429] text-xs font-medium flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D90429]" />
            {errorMsg}
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegisterMode && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#2B2D42] block">Advocate Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#8D99AE] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Adv. Afsa Manakkal"
                  className="w-full bg-[#EDF2F4]/60 border border-[#8D99AE]/30 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-[#2B2D42] placeholder-[#8D99AE] focus:outline-none focus:border-[#EF233C] focus:bg-white transition-all"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#2B2D42] block">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#8D99AE] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="afsa.advocate@courtverse.local"
                required
                className="w-full bg-[#EDF2F4]/60 border border-[#8D99AE]/30 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-[#2B2D42] placeholder-[#8D99AE] focus:outline-none focus:border-[#EF233C] focus:bg-white transition-all font-sans"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#2B2D42] block">Password</label>
              <span className="text-[10px] text-[#8D99AE]">Localhost dev mode</span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8D99AE] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full bg-[#EDF2F4]/60 border border-[#8D99AE]/30 rounded-xl pl-10 pr-10 py-2.5 text-xs text-[#2B2D42] placeholder-[#8D99AE] focus:outline-none focus:border-[#EF233C] focus:bg-white transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8D99AE] hover:text-[#2B2D42] cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5 pt-1">
            <label className="text-xs font-semibold text-[#2B2D42] block">Courtroom Role</label>
            <div className="grid grid-cols-3 gap-2">
              {(['Student', 'Judge', 'Spectator'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                    role === r
                      ? 'bg-[#2B2D42] text-white border-[#2B2D42] shadow-xs'
                      : 'bg-[#EDF2F4]/60 border-[#8D99AE]/30 text-[#2B2D42] hover:bg-white'
                  }`}
                >
                  {r === 'Student' ? 'Advocate' : r === 'Judge' ? 'Judge' : 'Spectator'}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#D90429] to-[#EF233C] hover:from-[#c00424] hover:to-[#e21a33] text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-[#D90429]/25 hover:shadow-xl hover:shadow-[#D90429]/35 transition-all flex items-center justify-center gap-2 mt-5 cursor-pointer disabled:opacity-75"
          >
            {isLoading ? (
              <span>Signing in & Generating JWT...</span>
            ) : (
              <>
                <KeyRound className="w-4 h-4" />
                <span>{isRegisterMode ? 'Register & Generate JWT' : 'Sign In with JWT'}</span>
              </>
            )}
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                setIsRegisterMode(!isRegisterMode);
                setErrorMsg('');
              }}
              className="text-xs text-[#8D99AE] hover:text-[#D90429] font-medium transition-colors cursor-pointer"
            >
              {isRegisterMode
                ? 'Already have an account? Sign In'
                : 'Need a new advocate profile? Create Account'}
            </button>
          </div>
        </form>

        {/* JWT Technical Inspector Drawer / Toggle */}
        <div className="mt-6 pt-4 border-t border-[#8D99AE]/20">
          <button
            type="button"
            onClick={() => setShowTokenPreview(!showTokenPreview)}
            className="w-full flex items-center justify-between text-[11px] text-[#8D99AE] hover:text-[#2B2D42] font-semibold py-1 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-[#D90429]" />
              Localhost JWT Specification & Verification
            </span>
            <span>{showTokenPreview ? '▲ Hide' : '▼ Inspect'}</span>
          </button>

          {showTokenPreview && (
            <div className="mt-3 p-3 rounded-xl bg-[#2B2D42] text-[#EDF2F4] text-[10px] font-mono space-y-2">
              <div className="flex items-center justify-between text-[#8D99AE] border-b border-white/10 pb-1">
                <span>Algorithm: HS256</span>
                <span>Type: JWT</span>
                <span>Issuer: courtverse.localhost</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3 h-3 shrink-0" />
                <span>RFC 7519 compliant JSON Web Token engine</span>
              </div>
              <p className="text-[#8D99AE] text-[9.5px]">
                Upon login, the token is signed with HS256, persisted to browser storage, and verified on every navigation and courtroom action.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Credentials Note */}
      <div className="relative z-10 text-center text-xs text-[#8D99AE] mt-6 flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#D90429]" />
        <span>CourtVerse Advocacy Simulation • Clean Light Mode Active</span>
      </div>
    </div>
  );
};
