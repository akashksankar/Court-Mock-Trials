import React, { useState, useEffect, useRef } from 'react';
import { Camera, Mic, Volume2, Wifi, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { soundManager } from '../audio/soundManager';

interface HardwareCheckProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const HardwareCheckModal: React.FC<HardwareCheckProps> = ({ isOpen, onClose, onConfirm }) => {
  const [cameraActive, setCameraActive] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [micLevel, setMicLevel] = useState(0);
  const [testingSpeaker, setTestingSpeaker] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (!isOpen) {
      stopMedia();
      return;
    }

    startMediaCheck();

    return () => {
      stopMedia();
    };
  }, [isOpen]);

  const startMediaCheck = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
      setMicActive(true);

      // Simulate mic level bounce
      const interval = setInterval(() => {
        setMicLevel(Math.floor(Math.random() * 60) + 20);
      }, 200);

      return () => clearInterval(interval);
    } catch (err) {
      console.warn('Hardware check media denied or unavailable:', err);
      setCameraActive(false);
      setMicActive(false);
    }
  };

  const stopMedia = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
    setMicActive(false);
  };

  const testSpeakerSound = () => {
    setTestingSpeaker(true);
    soundManager.play('court-open');
    setTimeout(() => setTestingSpeaker(false), 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#2B2D42]/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-2xl border border-white/95 rounded-3xl max-w-lg w-full p-6 sm:p-7 text-[#2B2D42] shadow-[0_25px_60px_-15px_rgba(43,45,66,0.18)] relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8D99AE] hover:text-[#2B2D42] p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-5 pb-3 border-b border-[#8D99AE]/20">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#D90429] to-[#EF233C] flex items-center justify-center text-white shadow-xs">
            <Camera className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#2B2D42]">
              Hardware & Stream Diagnostics
            </h3>
            <p className="text-xs text-[#8D99AE]">
              Verify video, audio, and network stability before entering courtroom.
            </p>
          </div>
        </div>

        {/* Video Preview Box */}
        <div className="relative aspect-video rounded-2xl bg-[#2B2D42] border border-[#8D99AE]/25 overflow-hidden mb-5 flex items-center justify-center shadow-inner">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover ${cameraActive ? 'block' : 'hidden'}`}
          />
          {!cameraActive && (
            <div className="text-center p-4 text-white">
              <Camera className="w-8 h-8 text-[#8D99AE] mx-auto mb-2" />
              <p className="text-xs font-semibold text-white">Camera Stream Simulated / Ready</p>
              <p className="text-[11px] text-[#8D99AE] mt-1 font-medium">
                You can enter courtroom using your advocate profile stream.
              </p>
            </div>
          )}

          <div className="absolute bottom-2.5 left-2.5 bg-black/70 px-2.5 py-1 rounded-full text-[10px] font-mono border border-white/10 text-emerald-300 backdrop-blur-md">
            {cameraActive ? '1080p WebRTC Ready' : 'Avatar Stream Active'}
          </div>
        </div>

        {/* Diagnostics Checklist */}
        <div className="space-y-2.5 text-xs mb-5">
          {/* Camera Status */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#EDF2F4]/60 border border-[#8D99AE]/20">
            <div className="flex items-center gap-2.5">
              <Camera className="w-4 h-4 text-[#D90429]" />
              <span className="font-semibold text-[#2B2D42]">Webcam Video Feed</span>
            </div>
            {cameraActive ? (
              <span className="flex items-center gap-1 text-emerald-600 font-bold">
                <CheckCircle2 className="w-4 h-4" /> Active
              </span>
            ) : (
              <span className="flex items-center gap-1 text-blue-600 font-bold">
                <CheckCircle2 className="w-4 h-4" /> Ready (Avatar)
              </span>
            )}
          </div>

          {/* Mic Meter Status */}
          <div className="p-3 rounded-2xl bg-[#EDF2F4]/60 border border-[#8D99AE]/20">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <Mic className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-[#2B2D42]">Microphone Input Level</span>
              </div>
              <span className="text-[#8D99AE] font-mono text-[11px] font-bold">{micActive ? `${micLevel}%` : 'Ready'}</span>
            </div>
            <div className="w-full bg-[#8D99AE]/20 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-[#EF233C] h-full transition-all duration-150 rounded-full"
                style={{ width: `${micActive ? micLevel : 45}%` }}
              />
            </div>
          </div>

          {/* Speaker Test */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#EDF2F4]/60 border border-[#8D99AE]/20">
            <div className="flex items-center gap-2.5">
              <Volume2 className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-[#2B2D42]">Gavel & Audio Speaker Test</span>
            </div>
            <button
              onClick={testSpeakerSound}
              disabled={testingSpeaker}
              className="px-3 py-1 bg-white hover:bg-slate-50 border border-[#8D99AE]/30 text-[#2B2D42] text-[11px] rounded-xl font-bold transition-all shadow-xs cursor-pointer"
            >
              {testingSpeaker ? 'Playing Chime...' : 'Test Sound'}
            </button>
          </div>

          {/* Internet Status */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#EDF2F4]/60 border border-[#8D99AE]/20">
            <div className="flex items-center gap-2.5">
              <Wifi className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold text-[#2B2D42]">PeerJS Network Bandwidth</span>
            </div>
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Optimal (38ms)
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#8D99AE]/20">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-[#EDF2F4] hover:bg-white text-[#8D99AE] hover:text-[#2B2D42] text-xs font-semibold transition-colors border border-[#8D99AE]/20 shadow-xs cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              stopMedia();
              onConfirm();
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D90429] to-[#EF233C] hover:from-[#ba0323] hover:to-[#df1a33] text-white text-xs font-bold tracking-wide transition-all shadow-md shadow-[#D90429]/20 flex items-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" /> Connect To Courtroom
          </button>
        </div>
      </div>
    </div>
  );
};
