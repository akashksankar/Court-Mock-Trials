import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { CASE_LIBRARY } from '../data/cases';
import {
  Participant,
  HearingStage,
  ObjectionType,
  ObjectionEvent,
  ChatMessage,
  TimelineEvent,
  SpectatorQuestion,
  CourtRole,
  CourtEvent,
} from '../types/courtroom';
import { Exhibit } from '../types/case';
import { peerManager } from '../webrtc/peerManager';
import { soundManager } from '../audio/soundManager';
import { TopViewCourtroom } from '../courtroom/TopViewCourtroom';
import { JudgeControls } from '../courtroom/JudgeControls';
import { SidePanel } from '../courtroom/SidePanel';
import { RaiseObjectionModal, RuleObjectionBanner } from '../components/ObjectionModal';
import { EvidenceModal } from '../components/EvidenceModal';
import { CinematicOpening } from '../components/CinematicOpening';
import { JudgmentModal } from '../components/JudgmentModal';
import { Scale, Users } from 'lucide-react';

export const CourtroomPage: React.FC = () => {
  const { roomCode } = useParams<{ roomCode: string }>();
  const navigate = useNavigate();
  const { user } = useUser();

  const currentRoomCode = roomCode || 'CV-7X92';
  const caseData = CASE_LIBRARY[0];

  // Determine user's primary courtroom role
  const userCourtRole: CourtRole =
    user.primaryRole === 'Judge'
      ? 'Judge / Mentor'
      : user.primaryRole === 'Student'
      ? 'Petitioner Counsel'
      : 'Spectator';

  // Local media stream reference
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  // Initialize Room State containing ONLY real connected participants
  const [participants, setParticipants] = useState<Participant[]>(() => {
    const currentUserPart: Participant = {
      id: user.id,
      name: user.name,
      courtRole: userCourtRole,
      college: user.college,
      avatarUrl: user.avatarUrl,
      isMuted: false,
      isVideoOn: true,
      isHandRaised: false,
      isSpeaking: false,
      isHost: user.primaryRole === 'Judge',
      joinedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    return [currentUserPart];
  });

  const [hearingStage, setHearingStage] = useState<HearingStage>('Court Called to Order');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      senderId: 'sys',
      senderName: 'BENCH REGISTRAR',
      senderRole: 'Judge / Mentor',
      text: `Courtroom ${currentRoomCode} opened. Waiting for connected participants to join session.`,
      category: 'COURT_NOTICE',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([
    {
      id: 't1',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title: 'Courtroom Initialized',
      description: `Courtroom ${currentRoomCode} ready for live hearing.`,
      type: 'SYSTEM',
    },
  ]);

  const [spectatorQuestions, setSpectatorQuestions] = useState<SpectatorQuestion[]>([]);

  // Modal States
  const [activeObjection, setActiveObjection] = useState<ObjectionEvent | null>(null);
  const [isRaiseObjectionOpen, setIsRaiseObjectionOpen] = useState(false);
  const [inspectedExhibit, setInspectedExhibit] = useState<Exhibit | null>(null);
  const [isCinematicOpen, setIsCinematicOpen] = useState(false);
  const [isJudgmentOpen, setIsJudgmentOpen] = useState(false);

  // 1. Acquire Local Camera/Microphone Media Stream (Works even when Judge is alone)
  useEffect(() => {
    let active = true;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (!active) {
            stream.getTracks().forEach((t) => t.stop());
            return;
          }
          setLocalStream(stream);
          setParticipants((prev) =>
            prev.map((p) =>
              p.id === user.id
                ? { ...p, stream, isVideoOn: true, isMuted: false }
                : p
            )
          );
        })
        .catch((err) => {
          console.warn('Local media stream acquisition info:', err);
        });
    }

    return () => {
      active = false;
    };
  }, [user.id]);

  // Clean up local media stream on unmount
  useEffect(() => {
    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [localStream]);

  // 2. PeerJS WebRTC Room Signaling Effect
  useEffect(() => {
    let unbind: (() => void) | null = null;

    if (user.primaryRole === 'Judge') {
      peerManager.initHost(currentRoomCode, user.name);
    } else {
      const currentUserPart = participants.find((p) => p.id === user.id) || {
        id: user.id,
        name: user.name,
        courtRole: userCourtRole,
        college: user.college,
        avatarUrl: user.avatarUrl,
        isMuted: false,
        isVideoOn: true,
        isHandRaised: false,
        isSpeaking: false,
        joinedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      peerManager.initParticipant(currentRoomCode, currentUserPart);
    }

    unbind = peerManager.onEvent((event: CourtEvent) => {
      handleIncomingCourtEvent(event);
    });

    return () => {
      if (unbind) unbind();
      peerManager.destroy();
    };
  }, [currentRoomCode, user.id, user.primaryRole, user.name]);

  const handleIncomingCourtEvent = (event: CourtEvent) => {
    switch (event.type) {
      case 'PARTICIPANT_JOINED':
        setParticipants((prev) => {
          if (prev.some((p) => p.id === event.participant.id)) return prev;
          soundManager.play('join');
          return [...prev, event.participant];
        });
        break;

      case 'PARTICIPANT_LEFT':
        setParticipants((prev) => prev.filter((p) => p.id !== event.participantId));
        break;

      case 'ALLOW_SPEAK':
        soundManager.play('hand-raised');
        setParticipants((prev) =>
          prev.map((p) =>
            p.id === event.participantId ? { ...p, isSpeaking: true, isMuted: false, isHandRaised: false } : { ...p, isSpeaking: false }
          )
        );
        break;

      case 'DENY_SPEAK':
        setParticipants((prev) =>
          prev.map((p) => (p.id === event.participantId ? { ...p, isHandRaised: false } : p))
        );
        break;

      case 'MUTE':
        soundManager.play('notification');
        setParticipants((prev) =>
          prev.map((p) => (p.id === event.participantId ? { ...p, isMuted: true, isSpeaking: false } : p))
        );
        break;

      case 'STAGE_CHANGED':
        setHearingStage(event.stage);
        if (event.stage === 'Court Called to Order') {
          setIsCinematicOpen(true);
        } else if (event.stage === 'Judgment & Feedback' || event.stage === 'Court Adjourned') {
          setIsJudgmentOpen(true);
        }
        break;

      case 'OBJECTION':
        soundManager.play('objection');
        setActiveObjection(event.objection);
        break;

      case 'OBJECTION_DECISION':
        if (activeObjection && activeObjection.id === event.objectionId) {
          setActiveObjection({ ...activeObjection, decision: event.decision });
          setTimeout(() => setActiveObjection(null), 3500);
        }
        break;

      case 'EVIDENCE_PRESENTED':
        soundManager.play('notification');
        const ex = caseData.evidence.find((e) => e.id === event.exhibitId);
        if (ex) {
          setInspectedExhibit({ ...ex, presentedBy: event.presentedBy });
        }
        break;

      case 'CHAT_MESSAGE':
        setChatMessages((prev) => [...prev, event.message]);
        break;
    }
  };

  // Local Controls Triggers
  const handleToggleMic = () => {
    soundManager.play('notification');
    setParticipants((prev) =>
      prev.map((p) => {
        if (p.id === user.id) {
          const nextMuted = !p.isMuted;
          if (localStream) {
            localStream.getAudioTracks().forEach((track) => {
              track.enabled = !nextMuted;
            });
          }
          return { ...p, isMuted: nextMuted, isSpeaking: !nextMuted };
        }
        return p;
      })
    );
  };

  const handleToggleCamera = () => {
    soundManager.play('notification');
    setParticipants((prev) =>
      prev.map((p) => {
        if (p.id === user.id) {
          const nextVideoOn = !p.isVideoOn;
          if (localStream) {
            localStream.getVideoTracks().forEach((track) => {
              track.enabled = nextVideoOn;
            });
          }
          return { ...p, isVideoOn: nextVideoOn };
        }
        return p;
      })
    );
  };

  const handleRaiseHand = () => {
    soundManager.play('hand-raised');
    setParticipants((prev) =>
      prev.map((p) => (p.id === user.id ? { ...p, isHandRaised: !p.isHandRaised } : p))
    );
  };

  const handleCreateObjection = (type: ObjectionType) => {
    const newObjection: ObjectionEvent = {
      id: 'obj-' + Date.now(),
      raisedBy: user.name,
      raisedByRole: userCourtRole,
      type,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setActiveObjection(newObjection);
    peerManager.broadcast({ type: 'OBJECTION', objection: newObjection });
  };

  const handleRuleObjection = (objectionId: string, decision: 'SUSTAINED' | 'OVERRULED') => {
    peerManager.broadcast({ type: 'OBJECTION_DECISION', objectionId, decision });
    if (activeObjection) {
      setActiveObjection({ ...activeObjection, decision });
      setTimeout(() => setActiveObjection(null), 3500);
    }
  };

  const handleSendMessage = (text: string, category: 'GENERAL' | 'QUESTION' | 'COURT_NOTICE') => {
    const msg: ChatMessage = {
      id: 'm-' + Date.now(),
      senderId: user.id,
      senderName: user.name,
      senderRole: userCourtRole,
      text,
      category,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, msg]);
    peerManager.broadcast({ type: 'CHAT_MESSAGE', message: msg });
  };

  const handlePresentExhibit = (exhibit: Exhibit) => {
    setInspectedExhibit(exhibit);
    peerManager.broadcast({
      type: 'EVIDENCE_PRESENTED',
      exhibitId: exhibit.id,
      presentedBy: user.name,
    });
  };

  const activeSpeaker = participants.find((p) => p.isSpeaking);

  return (
    <div className="min-h-screen bg-[#EDF2F4] text-[#2B2D42] flex flex-col justify-between selection:bg-[#EF233C]/20 selection:text-[#D90429]">
      {/* Top Bar Header */}
      <header className="bg-white/90 backdrop-blur-xl border-b border-[#8D99AE]/20 px-4 py-2.5 flex items-center justify-between text-xs shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#D90429] to-[#EF233C] flex items-center justify-center text-white shadow-xs">
            <Scale className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-[#2B2D42] text-sm tracking-wide">COURTVERSE</span>
              <span className="px-2 py-0.5 rounded-full bg-[#EDF2F4] text-[#D90429] font-mono text-[10px] font-bold border border-[#8D99AE]/25">
                CODE: {currentRoomCode}
              </span>
            </div>
            <p className="text-[10px] text-[#8D99AE] font-medium">{caseData.title}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 text-[11px] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Court Session
          </span>

          <span className="px-3 py-1 rounded-full bg-[#EDF2F4] text-[#2B2D42] font-bold border border-[#8D99AE]/30 text-xs shadow-xs">
            {userCourtRole}
          </span>
        </div>
      </header>

      {/* Main Grid View */}
      <main className="flex-1 p-3 sm:p-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Top View Courtroom Interior + Judge Controls */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="flex-1 min-h-[520px]">
            <TopViewCourtroom
              participants={participants}
              currentUserId={user.id}
              currentUserRole={userCourtRole}
              hearingStage={hearingStage}
              activeSpeakerName={activeSpeaker?.name}
              roomCode={currentRoomCode}
              onToggleMic={handleToggleMic}
              onToggleCamera={handleToggleCamera}
              onRaiseHand={handleRaiseHand}
              onOpenObjectionModal={() => setIsRaiseObjectionOpen(true)}
              onLeaveCourt={() => navigate('/dashboard')}
            />
          </div>

          {/* Judge Authority Control Panel */}
          {user.primaryRole === 'Judge' && (
            <JudgeControls
              hearingStage={hearingStage}
              participants={participants}
              onCallCourtToOrder={() => {
                setIsCinematicOpen(true);
                peerManager.broadcast({ type: 'STAGE_CHANGED', stage: 'Court Called to Order' });
              }}
              onChangeStage={(stg) => {
                setHearingStage(stg);
                peerManager.broadcast({ type: 'STAGE_CHANGED', stage: stg });
              }}
              onAllowSpeaking={(pId) => peerManager.broadcast({ type: 'ALLOW_SPEAK', participantId: pId })}
              onDenySpeaking={(pId) => peerManager.broadcast({ type: 'DENY_SPEAK', participantId: pId })}
              onMuteParticipant={(pId) => peerManager.broadcast({ type: 'MUTE', participantId: pId })}
              onRemoveParticipant={(pId) =>
                setParticipants((prev) => prev.filter((p) => p.id !== pId))
              }
              onOpenPresentExhibit={() => handlePresentExhibit(caseData.evidence[0])}
              onCallWitness={() => soundManager.play('notification')}
            />
          )}
        </div>

        {/* Right: Side Panel (Case, People, Evidence, Chat, Timeline) */}
        <div className="lg:col-span-4 h-[650px] lg:h-auto">
          <SidePanel
            participants={participants}
            caseData={caseData}
            chatMessages={chatMessages}
            timelineEvents={timelineEvents}
            spectatorQuestions={spectatorQuestions}
            userRole={userCourtRole}
            onSendMessage={handleSendMessage}
            onInspectExhibit={(ex) => setInspectedExhibit(ex)}
            onPresentExhibit={handlePresentExhibit}
            onSubmitSpectatorQuestion={(qText) => {
              setSpectatorQuestions((prev) => [
                ...prev,
                {
                  id: 'sq-' + Date.now(),
                  senderName: user.name,
                  question: qText,
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  status: 'PENDING',
                },
              ]);
            }}
            onApproveSpectatorQuestion={(sqId) => {
              setSpectatorQuestions((prev) =>
                prev.map((q) => (q.id === sqId ? { ...q, status: 'ALLOWED' } : q))
              );
            }}
          />
        </div>
      </main>

      {/* Modals & Overlays */}
      <RaiseObjectionModal
        isOpen={isRaiseObjectionOpen}
        onClose={() => setIsRaiseObjectionOpen(false)}
        onSubmitObjection={handleCreateObjection}
      />

      <RuleObjectionBanner
        objection={activeObjection}
        userRole={userCourtRole}
        onRule={handleRuleObjection}
      />

      <EvidenceModal
        exhibit={inspectedExhibit}
        onClose={() => setInspectedExhibit(null)}
      />

      <CinematicOpening
        isOpen={isCinematicOpen}
        caseTitle={caseData.title}
        caseNumber={caseData.caseNumber}
        courtType={caseData.courtType}
        onFinished={() => setIsCinematicOpen(false)}
      />

      <JudgmentModal
        isOpen={isJudgmentOpen}
        caseTitle={caseData.title}
        onClose={() => setIsJudgmentOpen(false)}
      />
    </div>
  );
};
