import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Scale, PlusCircle, LogIn, BookOpen, LayoutDashboard, Shield, LogOut } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { SoundToggle } from './SoundToggle';

export const Navbar: React.FC = () => {
  const { user, logout } = useUser();
  const location = useLocation();

  const isCurrentPage = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-[#8D99AE]/20 text-[#2B2D42] shadow-xs">
      {/* Top Crimson Brand Accent Line */}
      <div className="h-0.5 bg-gradient-to-r from-[#D90429] via-[#EF233C] to-[#2B2D42] w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D90429] to-[#EF233C] flex items-center justify-center shadow-md shadow-[#D90429]/20 group-hover:scale-105 transition-all">
            <Scale className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-wider text-lg text-[#2B2D42] uppercase">
                CourtVerse
              </span>
              <span className="text-[9.5px] px-2 py-0.5 rounded-full bg-[#EDF2F4] text-[#D90429] border border-[#8D99AE]/30 uppercase tracking-wider font-extrabold">
                JWT • IND
              </span>
            </div>
            <p className="text-[10px] text-[#8D99AE] tracking-wide font-medium hidden sm:block">
              Virtual Courtroom Practice Platform
            </p>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-1.5 text-xs font-semibold">
          <Link
            to="/dashboard"
            className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
              isCurrentPage('/dashboard')
                ? 'bg-[#EDF2F4] text-[#D90429] border border-[#8D99AE]/30 shadow-xs font-bold'
                : 'text-[#2B2D42]/80 hover:text-[#D90429] hover:bg-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-[#D90429]" />
            Dashboard
          </Link>

          <Link
            to="/cases"
            className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
              isCurrentPage('/cases')
                ? 'bg-[#EDF2F4] text-[#D90429] border border-[#8D99AE]/30 shadow-xs font-bold'
                : 'text-[#2B2D42]/80 hover:text-[#D90429] hover:bg-white'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#8D99AE]" />
            Case Library
          </Link>

          <Link
            to="/create"
            className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
              isCurrentPage('/create')
                ? 'bg-[#EDF2F4] text-[#D90429] border border-[#8D99AE]/30 shadow-xs font-bold'
                : 'text-[#2B2D42]/80 hover:text-[#D90429] hover:bg-white'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-emerald-600" />
            Create Court
          </Link>

          <Link
            to="/join"
            className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
              isCurrentPage('/join')
                ? 'bg-[#EDF2F4] text-[#D90429] border border-[#8D99AE]/30 shadow-xs font-bold'
                : 'text-[#2B2D42]/80 hover:text-[#D90429] hover:bg-white'
            }`}
          >
            <LogIn className="w-4 h-4 text-blue-600" />
            Join Court
          </Link>
        </nav>

        {/* Right Section: Sound Toggle, User Profile & JWT Sign Out */}
        <div className="flex items-center gap-2.5">
          <SoundToggle />

          {/* User Profile Link */}
          <Link
            to="/profile"
            className="flex items-center gap-2.5 p-1 pl-2.5 rounded-xl bg-white/80 border border-[#8D99AE]/30 hover:border-[#EF233C] transition-all text-xs shadow-xs"
            title="View Profile and Settings"
          >
            <div className="text-right hidden sm:block">
              <p className="font-bold text-[#2B2D42] text-xs line-clamp-1">{user.name}</p>
              <div className="flex items-center gap-1 justify-end">
                <Shield className="w-3 h-3 text-[#D90429]" />
                <span className="text-[10px] text-[#8D99AE] font-semibold">{user.primaryRole}</span>
              </div>
            </div>
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-xs"
            />
          </Link>

          {/* JWT Sign Out Button */}
          <button
            type="button"
            onClick={logout}
            className="p-2 rounded-xl bg-white hover:bg-rose-50 text-[#8D99AE] hover:text-[#D90429] border border-[#8D99AE]/30 hover:border-[#EF233C]/40 transition-all text-xs flex items-center gap-1 shadow-xs cursor-pointer"
            title="Sign Out (Revoke JWT Session)"
          >
            <LogOut className="w-4 h-4 text-[#D90429]" />
            <span className="hidden lg:inline text-[11px] font-semibold">Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
};

