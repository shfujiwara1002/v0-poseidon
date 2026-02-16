/**
 * Poseidon Product Intro Video - Copy Text
 * All text content for the 30-second promotional video
 */

export const poseidonIntroCopy = {
  // Shot 1: Logo Reveal
  shot1: {
    brandName: 'Poseidon',
    tagline: 'Your AI-Powered Financial Guardian',
  },

  // Shot 2: Problem Statement
  shot2: {
    headline: 'Consumers Are Forced to Be Their Own Financial Integrators',
    statistic: '$24B+',
    statisticLabel: 'Annual Coordination Failure',
    subtext: 'Hidden fees. Missed opportunities. Fragmented decisions.',
  },

  // Shot 3: Solution Overview / Dashboard
  shot3: {
    headline: 'One Unified AI Backbone',
    flowText: ['Detect', 'Forecast', 'Act', 'Explain'],
    bullets: [
      'Personalized fraud detection',
      '7-day predictive forecasting',
      'Human-approved automation',
      'Real-time explainability',
    ],
  },

  // Shot 4: PROTECT Engine
  shot4: {
    engineName: 'PROTECT',
    engineTagline: 'Guardian',
    stat: '99.7%',
    statLabel: 'Detection Accuracy',
    description: 'Personalized ML on YOUR behavior',
    subDescription: '50+ signals analyzed per transaction in <100ms',
    transactionAmount: '$847.23',
    transactionMerchant: 'Electronics Store',
    anomalyFactors: [
      { label: 'Location: 2,400 miles from home', value: 0.85, color: '#EF4444' },
      { label: 'Category: First in 6 months', value: 0.72, color: '#F59E0B' },
      { label: 'Time: 3:42 AM local', value: 0.68, color: '#EF4444' },
    ],
    confidence: '94%',
    confidenceLabel: 'Fraudulent',
  },

  // Shot 5: GOVERN Engine
  shot5: {
    engineName: 'GOVERN',
    engineTagline: 'Transparency',
    keyPhrase: 'Compliance as Architecture',
    keyPhraseHighlight: 'Not Afterthought',
    stats: [
      { value: '<200ms', label: 'Explainability' },
      { value: '100%', label: 'Decisions Logged' },
      { value: '24/7', label: 'Fairness Monitoring' },
    ],
    auditEntries: [
      { time: '14:23:01', action: 'Anomaly detected (txn_8847)', status: 'complete' },
      { time: '14:23:01', action: 'SHAP computed (147ms)', status: 'complete' },
      { time: '14:23:01', action: 'User notified', status: 'complete' },
      { time: '14:23:15', action: 'User approved block', status: 'complete' },
      { time: '14:23:15', action: 'Action logged (SHA-256)', status: 'complete' },
    ],
    complianceBadges: ['EU AI Act', 'GDPR Art.22', 'ECOA/Reg B', 'Section 1033'],
  },

  // Shot 6: 4-Engine Integration
  shot6: {
    headline: 'Four Engines. One Unified Intelligence.',
    coreFormula: 'Deterministic models compute. GenAI explains. Humans approve.',
    engines: [
      {
        name: 'PROTECT',
        label: 'Detect & Explain',
        metric: '99.7% Accuracy',
        color: '#14B8A6', // teal
      },
      {
        name: 'GROW',
        label: 'Forecast & Recommend',
        metric: '7-Day Prediction',
        color: '#8B5CF6', // violet
      },
      {
        name: 'EXECUTE',
        label: 'Automate with Consent',
        metric: '$2,400/yr Savings',
        color: '#EAB308', // gold
      },
      {
        name: 'GOVERN',
        label: 'Trust & Transparency',
        metric: '<200ms Explain',
        color: '#3B82F6', // blue
      },
    ],
  },

  // Shot 7: CTA / Outro
  shot7: {
    taglinePart1: 'Your money works while you sleep.',
    taglinePart2: 'But you always understand why.',
    url: 'poseidon.ai',
    cta: 'Join the Waitlist',
  },
} as const;

export type PoseidonIntroCopy = typeof poseidonIntroCopy;
