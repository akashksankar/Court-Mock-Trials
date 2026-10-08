import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CASE_LIBRARY } from '../data/cases';
import { Search, PlusCircle, ChevronDown, ChevronUp, BookOpen, Scale, FileText } from 'lucide-react';

export const CaseLibraryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedCaseId, setExpandedCaseId] = useState<string | null>(null);

  const categories = ['All', 'Criminal', 'Civil', 'Consumer', 'Corporate', 'Constitutional', 'IP'];

  const filteredCases = CASE_LIBRARY.filter((cs) => {
    const matchesCat = selectedCategory === 'All' || cs.category === selectedCategory;
    const matchesSearch =
      cs.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cs.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cs.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#EDF2F4] text-[#2B2D42] p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/95 shadow-[0_20px_50px_rgba(43,45,66,0.06)]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-0.5 rounded-full bg-[#EDF2F4] text-[#D90429] text-[10px] font-extrabold uppercase border border-[#8D99AE]/30">
                STATUTORY REPOSITORY
              </span>
              <span className="text-xs text-[#8D99AE] font-medium">10 Educational Scenarios</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#2B2D42] tracking-tight">
              Indian Legal Case Library
            </h1>
            <p className="text-xs sm:text-sm text-[#8D99AE] mt-1 font-medium">
              Authentic Indian statutory scenarios referencing Bharatiya Nyaya Sanhita (BNS), BSA 2023, BNSS 2023, IT Act & RERA.
            </p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white/80 backdrop-blur-xl p-4 rounded-2xl border border-white/90 text-xs shadow-xs">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#8D99AE] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search case, act, or section..."
              className="w-full bg-[#EDF2F4]/60 border border-[#8D99AE]/30 rounded-xl pl-10 pr-3.5 py-2.5 text-[#2B2D42] placeholder-[#8D99AE] focus:outline-none focus:border-[#EF233C] focus:bg-white shadow-xs transition-all"
            />
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap text-xs cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#2B2D42] text-white shadow-xs font-bold'
                    : 'bg-[#EDF2F4]/60 text-[#8D99AE] hover:text-[#2B2D42] hover:bg-white border border-[#8D99AE]/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Cases Grid */}
        <div className="space-y-4">
          {filteredCases.map((cs) => {
            const isExpanded = expandedCaseId === cs.id;

            return (
              <div
                key={cs.id}
                className="p-6 rounded-3xl bg-white/85 backdrop-blur-xl border border-white/95 hover:border-[#EF233C]/40 transition-all space-y-4 shadow-[0_15px_40px_rgba(43,45,66,0.05)]"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#EDF2F4] text-[#D90429] text-[10px] font-bold border border-[#8D99AE]/25">
                        {cs.category}
                      </span>
                      <span className="text-xs text-[#D90429] font-mono font-bold">{cs.caseNumber}</span>
                      <span className="text-[11px] text-[#8D99AE] font-mono">• {cs.courtType}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#2B2D42]">{cs.title}</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setExpandedCaseId(isExpanded ? null : cs.id)}
                      className="px-3.5 py-2 rounded-xl bg-[#EDF2F4] hover:bg-white text-[#2B2D42] text-xs font-semibold flex items-center gap-1.5 transition-all border border-[#8D99AE]/25 shadow-xs cursor-pointer"
                    >
                      {isExpanded ? 'Hide Brief' : 'View Full Brief'}
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    <Link
                      to={`/create?caseId=${cs.id}`}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D90429] to-[#EF233C] hover:from-[#ba0323] hover:to-[#df1a33] text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-[#D90429]/20"
                    >
                      <PlusCircle className="w-4 h-4" /> Create Trial
                    </Link>
                  </div>
                </div>

                <p className="text-xs text-[#8D99AE] leading-relaxed bg-[#EDF2F4]/50 p-3.5 rounded-2xl border border-[#8D99AE]/20 font-medium">
                  {cs.summary}
                </p>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="space-y-4 pt-3 border-t border-[#8D99AE]/20 text-xs animate-fade-in">
                    {/* Facts */}
                    <div className="space-y-1.5">
                      <h4 className="font-bold text-[#2B2D42] uppercase tracking-wider text-[11px]">
                        Essential Facts of Case
                      </h4>
                      <ul className="space-y-1 pl-4 list-disc text-[#8D99AE] font-medium">
                        {cs.facts.map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Legal Provisions */}
                    <div className="space-y-2">
                      <h4 className="font-bold text-[#2B2D42] uppercase tracking-wider text-[11px]">
                        Applicable Statutory Sections
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {cs.applicableLaws.map((law, i) => (
                          <div key={i} className="p-3 rounded-2xl bg-[#EDF2F4]/60 border border-[#8D99AE]/20">
                            <span className="font-bold text-[#2B2D42] block">{law.act}</span>
                            <span className="font-mono text-[#D90429] font-bold block">{law.section}</span>
                            {law.formerRef && (
                              <span className="text-[10px] text-[#8D99AE] block">Former: {law.formerRef}</span>
                            )}
                            <p className="text-[11px] text-[#8D99AE] mt-1 font-medium">{law.summary}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Evidence Exhibits */}
                    <div className="space-y-1.5">
                      <h4 className="font-bold text-[#2B2D42] uppercase tracking-wider text-[11px]">
                        Key Exhibits Included
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {cs.evidence.map((ex) => (
                          <span key={ex.id} className="px-3 py-1 rounded-xl bg-white text-[#2B2D42] border border-[#8D99AE]/30 text-[11px] font-semibold shadow-xs">
                            📁 {ex.title} ({ex.type})
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
