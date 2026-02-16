export type RemotionCoreScreenId =
  | 'S-V3-CORE01'
  | 'S-V3-PRT01'
  | 'S-V3-GRW01'
  | 'S-V3-EXE01'
  | 'S-V3-GOV01'
  | 'S-V3-SET01';

export interface RemotionScreenContract {
  id: RemotionCoreScreenId;
  oneScreenMessage: string;
  transitionCue: string;
}

export const remotionCoreScreenContracts: Record<RemotionCoreScreenId, RemotionScreenContract> = {
  'S-V3-CORE01': {
    id: 'S-V3-CORE01',
    oneScreenMessage: 'Understand your complete financial state and next-best action in 10 seconds.',
    transitionCue: 'Why open engine detail',
  },
  'S-V3-PRT01': {
    id: 'S-V3-PRT01',
    oneScreenMessage: 'Threats are detected early and presented with evidence.',
    transitionCue: 'Why open alert detail',
  },
  'S-V3-GRW01': {
    id: 'S-V3-GRW01',
    oneScreenMessage: 'Understand forecasts and their uncertainty simultaneously.',
    transitionCue: 'Why run scenario',
  },
  'S-V3-EXE01': {
    id: 'S-V3-EXE01',
    oneScreenMessage: 'Only high-value actions are promoted to the priority queue.',
    transitionCue: 'Why open action detail',
  },
  'S-V3-GOV01': {
    id: 'S-V3-GOV01',
    oneScreenMessage: 'Trust state is quantified as a composite metric.',
    transitionCue: 'Why inspect ledger',
  },
  'S-V3-SET01': {
    id: 'S-V3-SET01',
    oneScreenMessage: 'Understand the impact of configuration changes before applying them.',
    transitionCue: 'Why open category',
  },
};
