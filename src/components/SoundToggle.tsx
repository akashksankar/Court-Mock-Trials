import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundManager } from '../audio/soundManager';

export const SoundToggle: React.FC = () => {
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());

  const toggleMute = () => {
    const next = !isMuted;
    soundManager.setMuted(next);
    setIsMuted(next);
    if (!next) {
      soundManager.play('notification');
    }
  };

  return (
    <button
      onClick={toggleMute}
      title={isMuted ? 'Unmute Court SFX' : 'Mute Court SFX'}
      className={`p-2 rounded-xl transition-all border flex items-center gap-1.5 text-xs font-semibold cursor-pointer shadow-xs ${
        isMuted
          ? 'bg-[#EDF2F4] text-[#8D99AE] border-[#8D99AE]/25 hover:bg-white'
          : 'bg-white text-[#D90429] border-[#8D99AE]/30 hover:border-[#EF233C]/50'
      }`}
    >
      {isMuted ? <VolumeX className="w-4 h-4 text-[#8D99AE]" /> : <Volume2 className="w-4 h-4 text-[#D90429]" />}
      <span className="hidden sm:inline text-[11px]">{isMuted ? 'SFX Off' : 'SFX On'}</span>
    </button>
  );
};
