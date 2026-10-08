export type UserRole = 'Judge' | 'Student' | 'Spectator';

export type CourtRole =
  | 'Judge / Mentor'
  | 'Petitioner Counsel'
  | 'Respondent Counsel'
  | 'Witness'
  | 'Victim / Complainant'
  | 'Police Officer'
  | 'Expert Witness'
  | 'Spectator';

export interface UserProfile {
  id: string;
  name: string;
  primaryRole: UserRole;
  avatarUrl: string;
  college: string;
  barNumber?: string;
  hearingsCount: number;
  casesCount: number;
  objectionsRaised: number;
  scoreAvg: number;
}

export type HearingStage =
  | 'Court Not Started'
  | 'Court Called to Order'
  | 'Opening Statements'
  | 'Petitioner Arguments'
  | 'Respondent Arguments'
  | 'Witness Examination'
  | 'Cross Examination'
  | 'Evidence Presentation'
  | 'Objections & Motions'
  | 'Final Arguments'
  | 'Judgment & Feedback'
  | 'Court Adjourned';

export type ObjectionType =
  | 'Relevance'
  | 'Hearsay'
  | 'Leading Question'
  | 'Speculation'
  | 'Argumentative'
  | 'Compound Question'
  | 'Asked and Answered'
  | 'Assumes Facts'
  | 'Lack of Foundation';

export type ObjectionDecision = 'SUSTAINED' | 'OVERRULED' | 'PENDING';

export interface ObjectionEvent {
  id: string;
  raisedBy: string; // participant name
  raisedByRole: CourtRole;
  type: ObjectionType;
  timestamp: string;
  decision?: ObjectionDecision;
  ruledBy?: string;
}

export interface Participant {
  id: string;
  peerId?: string;
  name: string;
  courtRole: CourtRole;
  college?: string;
  avatarUrl: string;
  isMuted: boolean;
  isVideoOn: boolean;
  isHandRaised: boolean;
  isSpeaking: boolean;
  stream?: MediaStream;
  isHost?: boolean;
  joinedAt: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: CourtRole;
  text: string;
  category: 'GENERAL' | 'QUESTION' | 'COURT_NOTICE' | 'SYSTEM';
  timestamp: string;
}

export interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  type: 'STAGE' | 'OBJECTION' | 'EVIDENCE' | 'WITNESS' | 'RULING' | 'SYSTEM';
}

export interface SpectatorQuestion {
  id: string;
  senderName: string;
  question: string;
  timestamp: string;
  status: 'PENDING' | 'ALLOWED' | 'REJECTED';
}

export type CourtEvent =
  | { type: 'PARTICIPANT_JOINED'; participant: Participant }
  | { type: 'PARTICIPANT_LEFT'; participantId: string }
  | { type: 'ALLOW_SPEAK'; participantId: string }
  | { type: 'DENY_SPEAK'; participantId: string }
  | { type: 'MUTE'; participantId: string }
  | { type: 'REMOVE'; participantId: string }
  | { type: 'STAGE_CHANGED'; stage: HearingStage }
  | { type: 'OBJECTION'; objection: ObjectionEvent }
  | { type: 'OBJECTION_DECISION'; decision: ObjectionDecision; objectionId: string }
  | { type: 'EVIDENCE_PRESENTED'; exhibitId: string; presentedBy: string }
  | { type: 'CHAT_MESSAGE'; message: ChatMessage }
  | { type: 'CALL_WITNESS'; witnessName: string }
  | { type: 'COURT_ANNOUNCEMENT'; message: string };
