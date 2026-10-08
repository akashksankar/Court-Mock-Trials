import { CourtRole } from './courtroom';

export interface LegalProvision {
  act: string;
  section: string;
  formerRef?: string; // Legacy IPC/CrPC/IEA reference
  summary: string;
}

export interface Exhibit {
  id: string;
  title: string;
  type: 'Document' | 'Image' | 'Audio' | 'Forensic Report' | 'CCTV / Video';
  description: string;
  contentUrl?: string;
  previewText?: string;
  presentedBy?: string;
}

export interface CaseWitness {
  id: string;
  name: string;
  role: string; // e.g. "Key Eyewitness", "Digital Forensics Officer"
  statement: string;
  predefinedAnswers: { keywords: string[]; answer: string }[];
}

export interface CaseData {
  id: string;
  caseNumber: string;
  title: string;
  category: 'Criminal' | 'Civil' | 'Consumer' | 'Corporate' | 'Constitutional' | 'IP';
  courtType: 'High Court' | 'District & Sessions Court' | 'Supreme Court Simulation' | 'Consumer Forum';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  summary: string;
  facts: string[];
  issues: string[];
  applicableLaws: LegalProvision[];
  petitioner: {
    name: string;
    counselNotes: string;
  };
  respondent: {
    name: string;
    counselNotes: string;
  };
  witnesses: CaseWitness[];
  evidence: Exhibit[];
  privateFacts: {
    [key in CourtRole]?: string[];
  };
  learningObjectives: string[];
}
