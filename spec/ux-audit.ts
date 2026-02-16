export type CriteriaKey =
  | 'first5s'
  | 'oneCta'
  | 'heroDiff'
  | 'navConfidence'
  | 'calm'
  | 'performance'
  | 'trust'
  | 'copy'
  | 'state'
  | 'a11y'
  | 'reliability'
  | 'memorable';

export interface UXIssue {
  id: string;
  route: string;
  criteria: CriteriaKey;
  layer: 'token' | 'component' | 'shell' | 'page' | 'copy';
  severity: 'P0' | 'P1' | 'P2';
  demoImpact: 'high' | 'medium' | 'low';
  effort: 'S' | 'M' | 'L';
  symptom: string;
  fixHypothesis: string;
  owner: string;
  status: 'open' | 'in_progress' | 'done' | 'blocked';
  beforeShot?: string;
  afterShot?: string;
  detectedBy?: 'rule' | 'visual-diff' | 'manual';
  autofixable?: boolean;
  autofixRule?: string;
  confidence?: number;
  patchPreviewPath?: string;
}

export interface UXCriteriaScore {
  criteria: CriteriaKey;
  score: number;
  note: string;
}

export interface UXAuditReport {
  baselineDate: string;
  demoFlow: string[];
  scores: UXCriteriaScore[];
  issues: UXIssue[];
}
