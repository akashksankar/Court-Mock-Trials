import React from 'react';
import { Exhibit } from '../types/case';
import { FileText, Image as ImageIcon, FileCheck, X, ShieldAlert, Download } from 'lucide-react';

interface EvidenceModalProps {
  exhibit: Exhibit | null;
  onClose: () => void;
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({ exhibit, onClose }) => {
  if (!exhibit) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#2B2D42]/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-2xl border border-white/95 rounded-3xl max-w-2xl w-full p-6 sm:p-7 text-[#2B2D42] shadow-[0_25px_60px_-15px_rgba(43,45,66,0.18)] relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8D99AE] hover:text-[#2B2D42] p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-[#8D99AE]/20">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D90429] to-[#EF233C] flex items-center justify-center text-white shadow-xs">
            {exhibit.type === 'Image' || exhibit.type === 'CCTV / Video' ? (
              <ImageIcon className="w-6 h-6 text-white" />
            ) : (
              <FileText className="w-6 h-6 text-white" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#EDF2F4] text-[#D90429] text-[10px] font-bold tracking-wider uppercase border border-[#8D99AE]/25">
                OFFICIAL COURT EXHIBIT
              </span>
              <span className="text-xs text-[#8D99AE] font-medium">BSA Sec 63 Certified</span>
            </div>
            <h3 className="text-xl font-bold text-[#2B2D42] mt-0.5">
              {exhibit.title}
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-4 mb-6 text-xs">
          <div className="p-3.5 rounded-2xl bg-[#EDF2F4]/60 border border-[#8D99AE]/20 text-[#2B2D42] leading-relaxed">
            <span className="font-bold text-[#D90429]">Description: </span>
            <span className="text-[#8D99AE] font-medium">{exhibit.description}</span>
          </div>

          {/* Document or Image Box Preview */}
          <div className="p-6 rounded-2xl bg-[#EDF2F4]/50 border border-[#8D99AE]/25 font-mono text-xs text-[#2B2D42] space-y-3 min-h-[160px] flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] text-[#D90429] uppercase font-bold">
              <ShieldAlert className="w-3.5 h-3.5" /> Certified Evidence
            </div>

            <p className="text-[#2B2D42] font-sans text-xs font-bold uppercase tracking-wider mb-1">
              RECORD TRANSCRIPT / EXTRACT:
            </p>

            <div className="p-4 rounded-xl bg-white border border-[#8D99AE]/20 text-[#2B2D42] whitespace-pre-wrap leading-relaxed shadow-xs font-mono text-[11px]">
              {exhibit.previewText || 'Certified Electronic Evidence Extract on file with the Registrar.'}
            </div>

            {exhibit.presentedBy && (
              <div className="mt-2 text-[11px] text-[#8D99AE] font-sans font-medium">
                Presented by Counsel: <span className="text-[#D90429] font-bold">{exhibit.presentedBy}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-[#8D99AE]/20">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#EDF2F4] hover:bg-white text-[#8D99AE] hover:text-[#2B2D42] text-xs font-semibold transition-colors border border-[#8D99AE]/25 shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#D90429]" /> Save Copy to Notes
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D90429] to-[#EF233C] text-white font-bold text-xs transition-all shadow-md shadow-[#D90429]/20 flex items-center gap-1.5 cursor-pointer"
          >
            <FileCheck className="w-4 h-4" /> Acknowledge Exhibit
          </button>
        </div>
      </div>
    </div>
  );
};
