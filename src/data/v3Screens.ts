export type ScreenDomain = 'PUB' | 'ACT' | 'CORE' | 'PRT' | 'GRW' | 'EXE' | 'GOV' | 'SET' | 'SYS';

export type NavigationContract = {
  primaryNav: 'topbar';
  secondaryNav: 'sidebar';
  inScreenNav: 'tabs';
  mobileNav: 'bottom-nav';
};

export type ShapeTextContract = {
  chipMaxCharsDesktop: number;
  chipMaxCharsMobile: number;
  chipMinHeight: number;
  chipWrapPolicy: 'nowrap' | 'truncate' | '2line';
};

export type ColorHierarchyContract = {
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  accentText: string;
  engineAccentMap: {
    PRT: string;
    GRW: string;
    EXE: string;
    GOV: string;
  };
};

export type DensityContract = {
  mode: 'aggressive' | 'balanced' | 'light';
  defaultDisclosure: 'summary-first' | 'full-first';
  maxVisibleBodyLinesDesktop: number;
  maxVisibleBodyLinesMobile: number;
  maxVisibleChipRowsDesktop: number;
  maxVisibleChipRowsMobile: number;
  trustVisibility: 'compact' | 'full';
};

export interface V3ScreenItem {
  id: string;
  domain: ScreenDomain;
  screenClass: string;
  oneScreenMessage: string;
  transitionCue: string;
  requires: {
    header: boolean;
    proofLine: boolean;
    definitionLine: boolean;
    governContract: boolean;
  };
  variants: Array<'Desktop' | 'Mobile'>;
  visualContract: {
    layoutPattern: string;
    evidencePlacement: string;
    backgroundTier: string;
    iconizationLevel: string;
    mobileActionPattern: string;
  };
  premiumVisualContract: {
    tone: string;
    depthModel: string;
    accentMode: string;
    glowIntensity: 'low' | 'medium';
    borderStyle: string;
    cardDensity: string;
    ctaPlacement: 'first-viewport' | 'standard';
    iconizationLevel: string;
  };
  navigationContract: NavigationContract;
  shapeTextContract: ShapeTextContract;
  colorHierarchyContract: ColorHierarchyContract;
  densityContract: DensityContract;
}

type V3ScreenSeed = Omit<
  V3ScreenItem,
  'navigationContract' | 'shapeTextContract' | 'colorHierarchyContract' | 'densityContract'
>;

const v3ScreensBase: V3ScreenSeed[] = [
  {
    "id": "S-V3-PUB01",
    "domain": "PUB",
    "screenClass": "public",
    "oneScreenMessage": "Poseidon orchestrates financial decision-making through four integrated engines.",
    "transitionCue": "Why sign up now",
    "requires": {
      "header": true,
      "proofLine": true,
      "definitionLine": true,
      "governContract": false
    },
    "variants": [
      "Desktop",
      "Mobile"
    ],
    "visualContract": {
      "layoutPattern": "hero-evidence-chips",
      "evidencePlacement": "below-header",
      "backgroundTier": "canvas-card-focus",
      "iconizationLevel": "high",
      "mobileActionPattern": "one-primary-one-secondary"
    },
    "premiumVisualContract": {
      "tone": "executive-dark-glass",
      "depthModel": "canvas-card-focus",
      "accentMode": "engine-coded",
      "glowIntensity": "medium",
      "borderStyle": "hairline-soft",
      "cardDensity": "balanced",
      "ctaPlacement": "standard",
      "iconizationLevel": "medium-high"
    }
  },
  {
    "id": "S-V3-PUB02",
    "domain": "PUB",
    "screenClass": "public",
    "oneScreenMessage": "Trust is guaranteed by auditability, not declarations.",
    "transitionCue": "Why trust before signup",
    "requires": {
      "header": true,
      "proofLine": true,
      "definitionLine": false,
      "governContract": false
    },
    "variants": [
      "Desktop",
      "Mobile"
    ],
    "visualContract": {
      "layoutPattern": "hero-evidence-chips",
      "evidencePlacement": "below-header",
      "backgroundTier": "canvas-card-focus",
      "iconizationLevel": "high",
      "mobileActionPattern": "one-primary-one-secondary"
    },
    "premiumVisualContract": {
      "tone": "executive-dark-glass",
      "depthModel": "canvas-card-focus",
      "accentMode": "engine-coded",
      "glowIntensity": "medium",
      "borderStyle": "hairline-soft",
      "cardDensity": "balanced",
      "ctaPlacement": "standard",
      "iconizationLevel": "medium-high"
    }
  },
  {
    "id": "S-V3-PUB03",
    "domain": "PUB",
    "screenClass": "public",
    "oneScreenMessage": "Price is justified by savings impact.",
    "transitionCue": "Why convert",
    "requires": {
      "header": true,
      "proofLine": true,
      "definitionLine": true,
      "governContract": false
    },
    "variants": [
      "Desktop",
      "Mobile"
    ],
    "visualContract": {
      "layoutPattern": "hero-evidence-chips",
      "evidencePlacement": "below-header",
      "backgroundTier": "canvas-card-focus",
      "iconizationLevel": "high",
      "mobileActionPattern": "one-primary-one-secondary"
    },
    "premiumVisualContract": {
      "tone": "executive-dark-glass",
      "depthModel": "canvas-card-focus",
      "accentMode": "engine-coded",
      "glowIntensity": "medium",
      "borderStyle": "hairline-soft",
      "cardDensity": "balanced",
      "ctaPlacement": "standard",
      "iconizationLevel": "medium-high"
    }
  },
  {
    "id": "S-V3-ACT01",
    "domain": "ACT",
    "screenClass": "auth",
    "oneScreenMessage": "Account creation completes quickly and securely.",
    "transitionCue": "Why continue onboarding",
    "requires": {
      "header": true,
      "proofLine": true,
      "definitionLine": false,
      "governContract": false
    },
    "variants": [
      "Desktop",
      "Mobile"
    ],
    "visualContract": {
      "layoutPattern": "form-inline-hints",
      "evidencePlacement": "below-header",
      "backgroundTier": "canvas-card-focus",
      "iconizationLevel": "medium",
      "mobileActionPattern": "one-primary-one-secondary"
    },
    "premiumVisualContract": {
      "tone": "executive-dark-glass",
      "depthModel": "canvas-card-focus",
      "accentMode": "engine-coded",
      "glowIntensity": "low",
      "borderStyle": "hairline-soft",
      "cardDensity": "balanced",
      "ctaPlacement": "standard",
      "iconizationLevel": "medium-high"
    }
  },
  {
    "id": "S-V3-ACT02",
    "domain": "ACT",
    "screenClass": "auth",
    "oneScreenMessage": "Secure re-entry completes in the shortest time possible.",
    "transitionCue": "Why resume flow",
    "requires": {
      "header": true,
      "proofLine": true,
      "definitionLine": false,
      "governContract": false
    },
    "variants": [
      "Desktop",
      "Mobile"
    ],
    "visualContract": {
      "layoutPattern": "form-inline-hints",
      "evidencePlacement": "below-header",
      "backgroundTier": "canvas-card-focus",
      "iconizationLevel": "medium",
      "mobileActionPattern": "one-primary-one-secondary"
    },
    "premiumVisualContract": {
      "tone": "executive-dark-glass",
      "depthModel": "canvas-card-focus",
      "accentMode": "engine-coded",
      "glowIntensity": "low",
      "borderStyle": "hairline-soft",
      "cardDensity": "balanced",
      "ctaPlacement": "standard",
      "iconizationLevel": "medium-high"
    }
  },
  {
    "id": "S-V3-ACT03",
    "domain": "ACT",
    "screenClass": "auth",
    "oneScreenMessage": "Recovery steps are safe and transparent.",
    "transitionCue": "Why re-login",
    "requires": {
      "header": true,
      "proofLine": true,
      "definitionLine": false,
      "governContract": false
    },
    "variants": [
      "Desktop",
      "Mobile"
    ],
    "visualContract": {
      "layoutPattern": "form-inline-hints",
      "evidencePlacement": "below-header",
      "backgroundTier": "canvas-card-focus",
      "iconizationLevel": "medium",
      "mobileActionPattern": "one-primary-one-secondary"
    },
    "premiumVisualContract": {
      "tone": "executive-dark-glass",
      "depthModel": "canvas-card-focus",
      "accentMode": "engine-coded",
      "glowIntensity": "low",
      "borderStyle": "hairline-soft",
      "cardDensity": "balanced",
      "ctaPlacement": "standard",
      "iconizationLevel": "medium-high"
    }
  },
  {
    "id": "S-V3-ACT04",
    "domain": "ACT",
    "screenClass": "auth",
    "oneScreenMessage": "Data scope is clarified before connection.",
    "transitionCue": "Why set goals",
    "requires": {
      "header": true,
      "proofLine": true,
      "definitionLine": true,
      "governContract": false
    },
    "variants": [
      "Desktop",
      "Mobile"
    ],
    "visualContract": {
      "layoutPattern": "form-inline-hints",
      "evidencePlacement": "below-header",
      "backgroundTier": "canvas-card-focus",
      "iconizationLevel": "medium",
      "mobileActionPattern": "one-primary-one-secondary"
    },
    "premiumVisualContract": {
      "tone": "executive-dark-glass",
      "depthModel": "canvas-card-focus",
      "accentMode": "engine-coded",
      "glowIntensity": "low",
      "borderStyle": "hairline-soft",
      "cardDensity": "balanced",
      "ctaPlacement": "standard",
      "iconizationLevel": "medium-high"
    }
  },
  {
    "id": "S-V3-ACT05",
    "domain": "ACT",
    "screenClass": "auth",
    "oneScreenMessage": "Goal-setting defines the boundaries of AI behavior.",
    "transitionCue": "Why set consent",
    "requires": {
      "header": true,
      "proofLine": true,
      "definitionLine": true,
      "governContract": false
    },
    "variants": [
      "Desktop",
      "Mobile"
    ],
    "visualContract": {
      "layoutPattern": "form-inline-hints",
      "evidencePlacement": "below-header",
      "backgroundTier": "canvas-card-focus",
      "iconizationLevel": "medium",
      "mobileActionPattern": "one-primary-one-secondary"
    },
    "premiumVisualContract": {
      "tone": "executive-dark-glass",
      "depthModel": "canvas-card-focus",
      "accentMode": "engine-coded",
      "glowIntensity": "low",
      "borderStyle": "hairline-soft",
      "cardDensity": "balanced",
      "ctaPlacement": "standard",
      "iconizationLevel": "medium-high"
    }
  },
  {
    "id": "S-V3-ACT06",
    "domain": "ACT",
    "screenClass": "auth",
    "oneScreenMessage": "Users finalize consent boundaries before execution begins.",
    "transitionCue": "Why activate app",
    "requires": {
      "header": true,
      "proofLine": true,
      "definitionLine": true,
      "governContract": false
    },
    "variants": [
      "Desktop",
      "Mobile"
    ],
    "visualContract": {
      "layoutPattern": "form-inline-hints",
      "evidencePlacement": "below-header",
      "backgroundTier": "canvas-card-focus",
      "iconizationLevel": "medium",
      "mobileActionPattern": "one-primary-one-secondary"
    },
    "premiumVisualContract": {
      "tone": "executive-dark-glass",
      "depthModel": "canvas-card-focus",
      "accentMode": "engine-coded",
      "glowIntensity": "low",
      "borderStyle": "hairline-soft",
      "cardDensity": "balanced",
      "ctaPlacement": "standard",
      "iconizationLevel": "medium-high"
    }
  },
  {
    "id": "S-V3-ACT07",
    "domain": "ACT",
    "screenClass": "auth",
    "oneScreenMessage": "Auditable initialization is complete.",
    "transitionCue": "Go to dashboard",
    "requires": {
      "header": true,
      "proofLine": true,
      "definitionLine": false,
      "governContract": false
    },
    "variants": [
      "Desktop",
      "Mobile"
    ],
    "visualContract": {
      "layoutPattern": "form-inline-hints",
      "evidencePlacement": "below-header",
      "backgroundTier": "canvas-card-focus",
      "iconizationLevel": "medium",
      "mobileActionPattern": "one-primary-one-secondary"
    },
    "premiumVisualContract": {
      "tone": "executive-dark-glass",
      "depthModel": "canvas-card-focus",
      "accentMode": "engine-coded",
      "glowIntensity": "low",
      "borderStyle": "hairline-soft",
      "cardDensity": "balanced",
      "ctaPlacement": "standard",
      "iconizationLevel": "medium-high"
    }
  },
  {
    "id": "S-V3-CORE01",
    "domain": "CORE",
    "screenClass": "decision",
    "oneScreenMessage": "Understand your complete financial state and next-best action in 10 seconds.",
    "transitionCue": "Why open engine detail",
    "requires": {
      "header": true,
      "proofLine": true,
      "definitionLine": true,
      "governContract": true
    },
    "variants": [
      "Desktop",
      "Mobile"
    ],
    "visualContract": {
      "layoutPattern": "summary-factors-drawer",
      "evidencePlacement": "below-header",
      "backgroundTier": "canvas-card-focus",
      "iconizationLevel": "high",
      "mobileActionPattern": "one-primary-one-secondary"
    },
    "premiumVisualContract": {
      "tone": "executive-dark-glass",
      "depthModel": "canvas-card-focus",
      "accentMode": "engine-coded",
      "glowIntensity": "medium",
      "borderStyle": "hairline-soft",
      "cardDensity": "balanced",
      "ctaPlacement": "first-viewport",
      "iconizationLevel": "medium-high"
    }
  },
  {
    "id": "S-V3-CORE02",
    "domain": "CORE",
    "screenClass": "decision",
    "oneScreenMessage": "Critical alerts can be processed in priority order.",
    "transitionCue": "Why open Protect detail",
    "requires": {
      "header": true,
      "proofLine": true,
      "definitionLine": true,
      "governContract": true
    },
    "variants": [
      "Desktop",
      "Mobile"
    ],
    "visualContract": {
      "layoutPattern": "summary-factors-drawer",
      "evidencePlacement": "below-header",
      "backgroundTier": "canvas-card-focus",
      "iconizationLevel": "high",
      "mobileActionPattern": "one-primary-one-secondary"
    },
    "premiumVisualContract": {
      "tone": "executive-dark-glass",
      "depthModel": "canvas-card-focus",
      "accentMode": "engine-coded",
      "glowIntensity": "medium",
      "borderStyle": "hairline-soft",
      "cardDensity": "balanced",
      "ctaPlacement": "first-viewport",
      "iconizationLevel": "medium-high"
    }
  },
  {
    "id": "S-V3-CORE03",
    "domain": "CORE",
    "screenClass": "decision",
    "oneScreenMessage": "Insights become valuable only when paired with explanation and action.",
    "transitionCue": "Why execute recommendation",
    "requires": {
      "header": true,
      "proofLine": true,
      "definitionLine": true,
      "governContract": true
    },
    "variants": [
      "Desktop",
      "Mobile"
    ],
    "visualContract": {
      "layoutPattern": "summary-factors-drawer",
      "evidencePlacement": "below-header",
      "backgroundTier": "canvas-card-focus",
      "iconizationLevel": "high",
      "mobileActionPattern": "one-primary-one-secondary"
    },
    "premiumVisualContract": {
      "tone": "executive-dark-glass",
      "depthModel": "canvas-card-focus",
      "accentMode": "engine-coded",
      "glowIntensity": "medium",
      "borderStyle": "hairline-soft",
      "cardDensity": "balanced",
      "ctaPlacement": "first-viewport",
      "iconizationLevel": "medium-high"
    }
  },
  {
    "id": "S-V3-CORE04",
    "domain": "CORE",
    "screenClass": "audit",
    "oneScreenMessage": "Every action is traceable in chronological order.",
    "transitionCue": "Why inspect Govern record",
    "requires": {
      "header": true,
      "proofLine": true,
      "definitionLine": false,
      "governContract": false
    },
    "variants": [
      "Desktop",
      "Mobile"
    ],
    "visualContract": {
      "layoutPattern": "timeline-proof-drawer",
      "evidencePlacement": "below-header",
      "backgroundTier": "canvas-card-focus",
      "iconizationLevel": "high",
      "mobileActionPattern": "one-primary-one-secondary"
    },
    "premiumVisualContract": {
      "tone": "executive-dark-glass",
      "depthModel": "canvas-card-focus",
      "accentMode": "engine-coded",
      "glowIntensity": "medium",
      "borderStyle": "hairline-soft",
      "cardDensity": "balanced",
      "ctaPlacement": "first-viewport",
      "iconizationLevel": "medium-high"
    }
  },
  {
    "id": "S-V3-CORE05",
    "domain": "CORE",
    "screenClass": "decision",
    "oneScreenMessage": "Only action-relevant notifications are delivered.",
    "transitionCue": "Why adjust preferences",
    "requires": {
      "header": true,
      "proofLine": false,
      "definitionLine": false,
      "governContract": false
    },
    "variants": [
      "Desktop",
      "Mobile"
    ],
    "visualContract": {
      "layoutPattern": "summary-factors-drawer",
      "evidencePlacement": "below-header",
      "backgroundTier": "canvas-card-focus",
      "iconizationLevel": "high",
      "mobileActionPattern": "one-primary-one-secondary"
    },
    "premiumVisualContract": {
      "tone": "executive-dark-glass",
      "depthModel": "canvas-card-focus",
      "accentMode": "engine-coded",
      "glowIntensity": "medium",
      "borderStyle": "hairline-soft",
      "cardDensity": "balanced",
      "ctaPlacement": "first-viewport",
      "iconizationLevel": "medium-high"
    }
  },
  {
    "id": "S-V3-PRT01",
    "domain": "PRT",
    "screenClass": "decision",
    "oneScreenMessage": "Threats are detected early and presented with evidence.",
    "transitionCue": "Why open alert detail",
    "requires": {
      "header": true,
      "proofLine": true,
      "definitionLine": true,
      "governContract": true
    },
    "variants": [
      "Desktop",
      "Mobile"
    ],
    "visualContract": {
      "layoutPattern": "summary-factors-drawer",
      "evidencePlacement": "below-header",
      "backgroundTier": "canvas-card-focus",
      "iconizationLevel": "high",
      "mobileActionPattern": "one-primary-one-secondary"
    },
    "premiumVisualContract": {
      "tone": "executive-dark-glass",
      "depthModel": "canvas-card-focus",
      "accentMode": "engine-coded",
      "glowIntensity": "medium",
      "borderStyle": "hairline-soft",
      "cardDensity": "balanced",
      "ctaPlacement": "first-viewport",
      "iconizationLevel": "medium-high"
    }
  },
  {
    "id": "S-V3-PRT02",
    "domain": "PRT",
    "screenClass": "decision",
    "oneScreenMessage": "Approve or block after understanding the evidence.",
    "transitionCue": "Why request review",
    "requires": {
      "header": true,
      "proofLine": true,
      "definitionLine": true,
      "governContract": true
    },
    "variants": [
      "Desktop",
      "Mobile"
    ],
    "visualContract": {
      "layoutPattern": "summary-factors-drawer",
      "evidencePlacement": "below-header",
      "backgroundTier": "canvas-card-focus",
      "iconizationLevel": "high",
      "mobileActionPattern": "one-primary-one-secondary"
    },
    "premiumVisualContract": {
      "tone": "executive-dark-glass",
      "depthModel": "canvas-card-focus",
      "accentMode": "engine-coded",
      "glowIntensity": "medium",
      "borderStyle": "hairline-soft",
      "cardDensity": "balanced",
      "ctaPlacement": "first-viewport",
      "iconizationLevel": "medium-high"
    }
  },
  {
    "id": "S-V3-PRT03",
    "domain": "PRT",
    "screenClass": "audit",
    "oneScreenMessage": "Dispute filing and human intervention are always available.",
    "transitionCue": "Why track case",
    "requires": {
      "header": true,
      "proofLine": true,
      "definitionLine": false,
      "governContract": true
    },
    "variants": [
      "Desktop",
      "Mobile"
    ],
    "visualContract": {
      "layoutPattern": "timeline-proof-drawer",
      "evidencePlacement": "below-header",
      "backgroundTier": "canvas-card-focus",
      "iconizationLevel": "high",
      "mobileActionPattern": "one-primary-one-secondary"
    },
    "premiumVisualContract": {
      "tone": "executive-dark-glass",
      "depthModel": "canvas-card-focus",
      "accentMode": "engine-coded",
      "glowIntensity": "medium",
      "borderStyle": "hairline-soft",
      "cardDensity": "balanced",
      "ctaPlacement": "first-viewport",
      "iconizationLevel": "medium-high"
    }
  },
  {
    "id": "S-V3-GRW01",
    "domain": "GRW",
    "screenClass": "decision",
    "oneScreenMessage": "Understand forecasts and their uncertainty simultaneously.",
    "transitionCue": "Why run scenario",
    "requires": {
      "header": true,
      "proofLine": true,
      "definitionLine": true,
      "governContract": true
    },
    "variants": [
      "Desktop",
      "Mobile"
    ],
    "visualContract": {
      "layoutPattern": "summary-factors-drawer",
      "evidencePlacement": "below-header",
      "backgroundTier": "canvas-card-focus",
      "iconizationLevel": "high",
      "mobileActionPattern": "one-primary-one-secondary"
    },
    "premiumVisualContract": {
      "tone": "executive-dark-glass",
      "depthModel": "canvas-card-focus",
      "accentMode": "engine-coded",
      "glowIntensity": "medium",
      "borderStyle": "hairline-soft",
      "cardDensity": "balanced",
      "ctaPlacement": "first-viewport",
      "iconizationLevel": "medium-high"
    }
  },
  {
    "id": "S-V3-GRW02",
    "domain": "GRW",
    "screenClass": "decision",
    "oneScreenMessage": "Visualize how hypothesis changes affect outcomes.",
    "transitionCue": "Why take recommended action",
    "requires": {
      "header": true,
      "proofLine": true,
      "definitionLine": true,
      "governContract": true
    },
    "variants": [
      "Desktop",
      "Mobile"
    ],
    "visualContract": {
      "layoutPattern": "summary-factors-drawer",
      "evidencePlacement": "below-header",
      "backgroundTier": "canvas-card-focus",
      "iconizationLevel": "high",
      "mobileActionPattern": "one-primary-one-secondary"
    },
    "premiumVisualContract": {
      "tone": "executive-dark-glass",
      "depthModel": "canvas-card-focus",
      "accentMode": "engine-coded",
      "glowIntensity": "medium",
      "borderStyle": "hairline-soft",
      "cardDensity": "balanced",
      "ctaPlacement": "first-viewport",
      "iconizationLevel": "medium-high"
    }
  },
  {
    "id": "S-V3-GRW03",
    "domain": "GRW",
    "screenClass": "decision",
    "oneScreenMessage": "Recommendations are evidence-backed and connected to execution.",
    "transitionCue": "Why route to Execute",
    "requires": {
      "header": true,
      "proofLine": true,
      "definitionLine": true,
      "governContract": true
    },
    "variants": [
      "Desktop",
      "Mobile"
    ],
    "visualContract": {
      "layoutPattern": "summary-factors-drawer",
      "evidencePlacement": "below-header",
      "backgroundTier": "canvas-card-focus",
      "iconizationLevel": "high",
      "mobileActionPattern": "one-primary-one-secondary"
    },
    "premiumVisualContract": {
      "tone": "executive-dark-glass",
      "depthModel": "canvas-card-focus",
      "accentMode": "engine-coded",
      "glowIntensity": "medium",
      "borderStyle": "hairline-soft",
      "cardDensity": "balanced",
      "ctaPlacement": "first-viewport",
      "iconizationLevel": "medium-high"
    }
  },
  {
    "id": "S-V3-EXE01",
    "domain": "EXE",
    "screenClass": "decision",
    "oneScreenMessage": "Only high-value actions are promoted to the priority queue.",
    "transitionCue": "Why open action detail",
    "requires": {
      "header": true,
      "proofLine": true,
      "definitionLine": true,
      "governContract": true
    },
    "variants": [
      "Desktop",
      "Mobile"
    ],
    "visualContract": {
      "layoutPattern": "summary-factors-drawer",
      "evidencePlacement": "below-header",
      "backgroundTier": "canvas-card-focus",
      "iconizationLevel": "high",
      "mobileActionPattern": "one-primary-one-secondary"
    },
    "premiumVisualContract": {
      "tone": "executive-dark-glass",
      "depthModel": "canvas-card-focus",
      "accentMode": "engine-coded",
      "glowIntensity": "medium",
      "borderStyle": "hairline-soft",
      "cardDensity": "balanced",
      "ctaPlacement": "first-viewport",
      "iconizationLevel": "medium-high"
    }
  },
  {
    "id": "S-V3-EXE02",
    "domain": "EXE",
    "screenClass": "decision",
    "oneScreenMessage": "Execution proceeds only after explanation and consent.",
    "transitionCue": "Why approve/reject/review",
    "requires": {
      "header": true,
      "proofLine": true,
      "definitionLine": true,
      "governContract": true
    },
    "variants": [
      "Desktop",
      "Mobile"
    ],
    "visualContract": {
      "layoutPattern": "summary-factors-drawer",
      "evidencePlacement": "below-header",
      "backgroundTier": "canvas-card-focus",
      "iconizationLevel": "high",
      "mobileActionPattern": "one-primary-one-secondary"
    },
    "premiumVisualContract": {
      "tone": "executive-dark-glass",
      "depthModel": "canvas-card-focus",
      "accentMode": "engine-coded",
      "glowIntensity": "medium",
      "borderStyle": "hairline-soft",
      "cardDensity": "balanced",
      "ctaPlacement": "first-viewport",
      "iconizationLevel": "medium-high"
    }
  },
  {
    "id": "S-V3-EXE03",
    "domain": "EXE",
    "screenClass": "audit",
    "oneScreenMessage": "Actions remain revocable and auditable after execution.",
    "transitionCue": "Why adjust rule",
    "requires": {
      "header": true,
      "proofLine": true,
      "definitionLine": true,
      "governContract": true
    },
    "variants": [
      "Desktop",
      "Mobile"
    ],
    "visualContract": {
      "layoutPattern": "timeline-proof-drawer",
      "evidencePlacement": "below-header",
      "backgroundTier": "canvas-card-focus",
      "iconizationLevel": "high",
      "mobileActionPattern": "one-primary-one-secondary"
    },
    "premiumVisualContract": {
      "tone": "executive-dark-glass",
      "depthModel": "canvas-card-focus",
      "accentMode": "engine-coded",
      "glowIntensity": "medium",
      "borderStyle": "hairline-soft",
      "cardDensity": "balanced",
      "ctaPlacement": "first-viewport",
      "iconizationLevel": "medium-high"
    }
  },
  {
    "id": "S-V3-GOV01",
    "domain": "GOV",
    "screenClass": "audit",
    "oneScreenMessage": "Trust state is quantified as a composite metric.",
    "transitionCue": "Why inspect ledger",
    "requires": {
      "header": true,
      "proofLine": true,
      "definitionLine": true,
      "governContract": true
    },
    "variants": [
      "Desktop",
      "Mobile"
    ],
    "visualContract": {
      "layoutPattern": "timeline-proof-drawer",
      "evidencePlacement": "below-header",
      "backgroundTier": "canvas-card-focus",
      "iconizationLevel": "high",
      "mobileActionPattern": "one-primary-one-secondary"
    },
    "premiumVisualContract": {
      "tone": "executive-dark-glass",
      "depthModel": "canvas-card-focus",
      "accentMode": "engine-coded",
      "glowIntensity": "medium",
      "borderStyle": "hairline-soft",
      "cardDensity": "balanced",
      "ctaPlacement": "first-viewport",
      "iconizationLevel": "medium-high"
    }
  },
  {
    "id": "S-V3-GOV02",
    "domain": "GOV",
    "screenClass": "audit",
    "oneScreenMessage": "Every AI output and action is a searchable evidence trail.",
    "transitionCue": "Why open audit detail",
    "requires": {
      "header": true,
      "proofLine": true,
      "definitionLine": true,
      "governContract": true
    },
    "variants": [
      "Desktop",
      "Mobile"
    ],
    "visualContract": {
      "layoutPattern": "timeline-proof-drawer",
      "evidencePlacement": "below-header",
      "backgroundTier": "canvas-card-focus",
      "iconizationLevel": "high",
      "mobileActionPattern": "one-primary-one-secondary"
    },
    "premiumVisualContract": {
      "tone": "executive-dark-glass",
      "depthModel": "canvas-card-focus",
      "accentMode": "engine-coded",
      "glowIntensity": "medium",
      "borderStyle": "hairline-soft",
      "cardDensity": "balanced",
      "ctaPlacement": "first-viewport",
      "iconizationLevel": "medium-high"
    }
  },
  {
    "id": "S-V3-GOV03",
    "domain": "GOV",
    "screenClass": "audit",
    "oneScreenMessage": "Individual decisions can be fully reconstructed.",
    "transitionCue": "Why escalate oversight",
    "requires": {
      "header": true,
      "proofLine": true,
      "definitionLine": true,
      "governContract": true
    },
    "variants": [
      "Desktop",
      "Mobile"
    ],
    "visualContract": {
      "layoutPattern": "timeline-proof-drawer",
      "evidencePlacement": "below-header",
      "backgroundTier": "canvas-card-focus",
      "iconizationLevel": "high",
      "mobileActionPattern": "one-primary-one-secondary"
    },
    "premiumVisualContract": {
      "tone": "executive-dark-glass",
      "depthModel": "canvas-card-focus",
      "accentMode": "engine-coded",
      "glowIntensity": "medium",
      "borderStyle": "hairline-soft",
      "cardDensity": "balanced",
      "ctaPlacement": "first-viewport",
      "iconizationLevel": "medium-high"
    }
  },
  {
    "id": "S-V3-GOV04",
    "domain": "GOV",
    "screenClass": "audit",
    "oneScreenMessage": "Explanation formats are standardized across all engines.",
    "transitionCue": "Why check model card",
    "requires": {
      "header": true,
      "proofLine": true,
      "definitionLine": true,
      "governContract": true
    },
    "variants": [
      "Desktop",
      "Mobile"
    ],
    "visualContract": {
      "layoutPattern": "timeline-proof-drawer",
      "evidencePlacement": "below-header",
      "backgroundTier": "canvas-card-focus",
      "iconizationLevel": "high",
      "mobileActionPattern": "one-primary-one-secondary"
    },
    "premiumVisualContract": {
      "tone": "executive-dark-glass",
      "depthModel": "canvas-card-focus",
      "accentMode": "engine-coded",
      "glowIntensity": "medium",
      "borderStyle": "hairline-soft",
      "cardDensity": "balanced",
      "ctaPlacement": "first-viewport",
      "iconizationLevel": "medium-high"
    }
  },
  {
    "id": "S-V3-GOV05",
    "domain": "GOV",
    "screenClass": "audit",
    "oneScreenMessage": "Human reviews operate under SLA guarantees.",
    "transitionCue": "Why resolve",
    "requires": {
      "header": true,
      "proofLine": true,
      "definitionLine": false,
      "governContract": true
    },
    "variants": [
      "Desktop",
      "Mobile"
    ],
    "visualContract": {
      "layoutPattern": "timeline-proof-drawer",
      "evidencePlacement": "below-header",
      "backgroundTier": "canvas-card-focus",
      "iconizationLevel": "high",
      "mobileActionPattern": "one-primary-one-secondary"
    },
    "premiumVisualContract": {
      "tone": "executive-dark-glass",
      "depthModel": "canvas-card-focus",
      "accentMode": "engine-coded",
      "glowIntensity": "medium",
      "borderStyle": "hairline-soft",
      "cardDensity": "balanced",
      "ctaPlacement": "first-viewport",
      "iconizationLevel": "medium-high"
    }
  },
  {
    "id": "S-V3-GOV06",
    "domain": "GOV",
    "screenClass": "audit",
    "oneScreenMessage": "Model limitations and policy boundaries are visible to users.",
    "transitionCue": "Why return to source screen",
    "requires": {
      "header": true,
      "proofLine": true,
      "definitionLine": true,
      "governContract": true
    },
    "variants": [
      "Desktop",
      "Mobile"
    ],
    "visualContract": {
      "layoutPattern": "timeline-proof-drawer",
      "evidencePlacement": "below-header",
      "backgroundTier": "canvas-card-focus",
      "iconizationLevel": "high",
      "mobileActionPattern": "one-primary-one-secondary"
    },
    "premiumVisualContract": {
      "tone": "executive-dark-glass",
      "depthModel": "canvas-card-focus",
      "accentMode": "engine-coded",
      "glowIntensity": "medium",
      "borderStyle": "hairline-soft",
      "cardDensity": "balanced",
      "ctaPlacement": "first-viewport",
      "iconizationLevel": "medium-high"
    }
  },
  {
    "id": "S-V3-SET01",
    "domain": "SET",
    "screenClass": "settings",
    "oneScreenMessage": "Understand the impact of configuration changes before applying them.",
    "transitionCue": "Why open category",
    "requires": {
      "header": true,
      "proofLine": true,
      "definitionLine": false,
      "governContract": false
    },
    "variants": [
      "Desktop",
      "Mobile"
    ],
    "visualContract": {
      "layoutPattern": "utility-list",
      "evidencePlacement": "below-header",
      "backgroundTier": "canvas-card-focus",
      "iconizationLevel": "medium",
      "mobileActionPattern": "one-primary-one-secondary"
    },
    "premiumVisualContract": {
      "tone": "executive-dark-glass",
      "depthModel": "canvas-card-focus",
      "accentMode": "engine-coded",
      "glowIntensity": "low",
      "borderStyle": "hairline-soft",
      "cardDensity": "balanced",
      "ctaPlacement": "standard",
      "iconizationLevel": "medium-high"
    }
  },
  {
    "id": "S-V3-SET02",
    "domain": "SET",
    "screenClass": "settings",
    "oneScreenMessage": "Delegation levels and thresholds are managed under user sovereignty.",
    "transitionCue": "Why save changes",
    "requires": {
      "header": true,
      "proofLine": true,
      "definitionLine": true,
      "governContract": false
    },
    "variants": [
      "Desktop",
      "Mobile"
    ],
    "visualContract": {
      "layoutPattern": "utility-list",
      "evidencePlacement": "below-header",
      "backgroundTier": "canvas-card-focus",
      "iconizationLevel": "medium",
      "mobileActionPattern": "one-primary-one-secondary"
    },
    "premiumVisualContract": {
      "tone": "executive-dark-glass",
      "depthModel": "canvas-card-focus",
      "accentMode": "engine-coded",
      "glowIntensity": "low",
      "borderStyle": "hairline-soft",
      "cardDensity": "balanced",
      "ctaPlacement": "standard",
      "iconizationLevel": "medium-high"
    }
  },
  {
    "id": "S-V3-SET03",
    "domain": "SET",
    "screenClass": "settings",
    "oneScreenMessage": "Data integrations are explicit and instantly revocable.",
    "transitionCue": "Why open rights center",
    "requires": {
      "header": true,
      "proofLine": true,
      "definitionLine": true,
      "governContract": false
    },
    "variants": [
      "Desktop",
      "Mobile"
    ],
    "visualContract": {
      "layoutPattern": "utility-list",
      "evidencePlacement": "below-header",
      "backgroundTier": "canvas-card-focus",
      "iconizationLevel": "medium",
      "mobileActionPattern": "one-primary-one-secondary"
    },
    "premiumVisualContract": {
      "tone": "executive-dark-glass",
      "depthModel": "canvas-card-focus",
      "accentMode": "engine-coded",
      "glowIntensity": "low",
      "borderStyle": "hairline-soft",
      "cardDensity": "balanced",
      "ctaPlacement": "standard",
      "iconizationLevel": "medium-high"
    }
  },
  {
    "id": "S-V3-SET04",
    "domain": "SET",
    "screenClass": "settings",
    "oneScreenMessage": "Acquisition, revocation, and deletion are guaranteed as first-class operations.",
    "transitionCue": "Why export/archive",
    "requires": {
      "header": true,
      "proofLine": true,
      "definitionLine": true,
      "governContract": false
    },
    "variants": [
      "Desktop",
      "Mobile"
    ],
    "visualContract": {
      "layoutPattern": "utility-list",
      "evidencePlacement": "below-header",
      "backgroundTier": "canvas-card-focus",
      "iconizationLevel": "medium",
      "mobileActionPattern": "one-primary-one-secondary"
    },
    "premiumVisualContract": {
      "tone": "executive-dark-glass",
      "depthModel": "canvas-card-focus",
      "accentMode": "engine-coded",
      "glowIntensity": "low",
      "borderStyle": "hairline-soft",
      "cardDensity": "balanced",
      "ctaPlacement": "standard",
      "iconizationLevel": "medium-high"
    }
  },
  {
    "id": "S-V3-SYS01",
    "domain": "SYS",
    "screenClass": "system",
    "oneScreenMessage": "Support processing is fully trackable without opacity.",
    "transitionCue": "Why return to engine",
    "requires": {
      "header": true,
      "proofLine": true,
      "definitionLine": false,
      "governContract": false
    },
    "variants": [
      "Desktop",
      "Mobile"
    ],
    "visualContract": {
      "layoutPattern": "utility-state-panel",
      "evidencePlacement": "below-header",
      "backgroundTier": "canvas-card-focus",
      "iconizationLevel": "medium",
      "mobileActionPattern": "one-primary-one-secondary"
    },
    "premiumVisualContract": {
      "tone": "executive-dark-glass",
      "depthModel": "canvas-card-focus",
      "accentMode": "engine-coded",
      "glowIntensity": "low",
      "borderStyle": "hairline-soft",
      "cardDensity": "balanced",
      "ctaPlacement": "standard",
      "iconizationLevel": "medium-high"
    }
  },
  {
    "id": "S-V3-SYS02",
    "domain": "SYS",
    "screenClass": "system",
    "oneScreenMessage": "Immediate recovery is available when navigation is lost.",
    "transitionCue": "Go to dashboard",
    "requires": {
      "header": true,
      "proofLine": false,
      "definitionLine": false,
      "governContract": false
    },
    "variants": [
      "Desktop",
      "Mobile"
    ],
    "visualContract": {
      "layoutPattern": "utility-state-panel",
      "evidencePlacement": "below-header",
      "backgroundTier": "canvas-card-focus",
      "iconizationLevel": "medium",
      "mobileActionPattern": "one-primary-one-secondary"
    },
    "premiumVisualContract": {
      "tone": "executive-dark-glass",
      "depthModel": "canvas-card-focus",
      "accentMode": "engine-coded",
      "glowIntensity": "low",
      "borderStyle": "hairline-soft",
      "cardDensity": "balanced",
      "ctaPlacement": "standard",
      "iconizationLevel": "medium-high"
    }
  }
] as V3ScreenSeed[];

const NAVIGATION_CONTRACT_DEFAULT: NavigationContract = {
  primaryNav: 'topbar',
  secondaryNav: 'sidebar',
  inScreenNav: 'tabs',
  mobileNav: 'bottom-nav',
};

const COLOR_HIERARCHY_DEFAULT: ColorHierarchyContract = {
  textPrimary: '$--foreground',
  textSecondary: '$--muted-foreground',
  textTertiary: '$--text-tertiary',
  accentText: '$--primary',
  engineAccentMap: {
    PRT: '$--engine-protect',
    GRW: '$--engine-grow',
    EXE: '$--engine-execute',
    GOV: '$--engine-govern',
  },
};

const SHAPE_TEXT_BY_CLASS: Record<
  V3ScreenItem['screenClass'],
  ShapeTextContract
> = {
  public: {
    chipMaxCharsDesktop: 26,
    chipMaxCharsMobile: 18,
    chipMinHeight: 30,
    chipWrapPolicy: 'truncate',
  },
  auth: {
    chipMaxCharsDesktop: 22,
    chipMaxCharsMobile: 16,
    chipMinHeight: 30,
    chipWrapPolicy: 'truncate',
  },
  decision: {
    chipMaxCharsDesktop: 24,
    chipMaxCharsMobile: 16,
    chipMinHeight: 30,
    chipWrapPolicy: 'truncate',
  },
  audit: {
    chipMaxCharsDesktop: 28,
    chipMaxCharsMobile: 18,
    chipMinHeight: 30,
    chipWrapPolicy: 'truncate',
  },
  settings: {
    chipMaxCharsDesktop: 24,
    chipMaxCharsMobile: 16,
    chipMinHeight: 30,
    chipWrapPolicy: 'truncate',
  },
  system: {
    chipMaxCharsDesktop: 22,
    chipMaxCharsMobile: 16,
    chipMinHeight: 30,
    chipWrapPolicy: 'truncate',
  },
};

const DENSITY_BY_CLASS: Record<
  V3ScreenItem['screenClass'],
  DensityContract
> = {
  public: {
    mode: 'aggressive',
    defaultDisclosure: 'summary-first',
    maxVisibleBodyLinesDesktop: 3,
    maxVisibleBodyLinesMobile: 2,
    maxVisibleChipRowsDesktop: 2,
    maxVisibleChipRowsMobile: 1,
    trustVisibility: 'compact',
  },
  auth: {
    mode: 'aggressive',
    defaultDisclosure: 'summary-first',
    maxVisibleBodyLinesDesktop: 2,
    maxVisibleBodyLinesMobile: 2,
    maxVisibleChipRowsDesktop: 1,
    maxVisibleChipRowsMobile: 1,
    trustVisibility: 'compact',
  },
  decision: {
    mode: 'aggressive',
    defaultDisclosure: 'summary-first',
    maxVisibleBodyLinesDesktop: 4,
    maxVisibleBodyLinesMobile: 3,
    maxVisibleChipRowsDesktop: 2,
    maxVisibleChipRowsMobile: 1,
    trustVisibility: 'compact',
  },
  audit: {
    mode: 'aggressive',
    defaultDisclosure: 'summary-first',
    maxVisibleBodyLinesDesktop: 4,
    maxVisibleBodyLinesMobile: 3,
    maxVisibleChipRowsDesktop: 2,
    maxVisibleChipRowsMobile: 1,
    trustVisibility: 'compact',
  },
  settings: {
    mode: 'aggressive',
    defaultDisclosure: 'summary-first',
    maxVisibleBodyLinesDesktop: 2,
    maxVisibleBodyLinesMobile: 2,
    maxVisibleChipRowsDesktop: 1,
    maxVisibleChipRowsMobile: 1,
    trustVisibility: 'compact',
  },
  system: {
    mode: 'aggressive',
    defaultDisclosure: 'summary-first',
    maxVisibleBodyLinesDesktop: 2,
    maxVisibleBodyLinesMobile: 2,
    maxVisibleChipRowsDesktop: 1,
    maxVisibleChipRowsMobile: 1,
    trustVisibility: 'compact',
  },
};

export const v3Screens: V3ScreenItem[] = v3ScreensBase.map((screen) => ({
  ...screen,
  navigationContract: NAVIGATION_CONTRACT_DEFAULT,
  shapeTextContract: SHAPE_TEXT_BY_CLASS[screen.screenClass] ?? SHAPE_TEXT_BY_CLASS.decision,
  colorHierarchyContract: {
    ...COLOR_HIERARCHY_DEFAULT,
    accentText:
      screen.domain === 'PRT'
        ? '$--engine-protect'
        : screen.domain === 'GRW'
          ? '$--engine-grow'
          : screen.domain === 'EXE'
            ? '$--engine-execute'
            : screen.domain === 'GOV'
              ? '$--engine-govern'
              : '$--primary',
  },
  densityContract: DENSITY_BY_CLASS[screen.screenClass] ?? DENSITY_BY_CLASS.decision,
}));

export const domainOrder: ScreenDomain[] = ['PUB','ACT','CORE','PRT','GRW','EXE','GOV','SET','SYS'];

export const domainLabels: Record<ScreenDomain, string> = {
  PUB: 'Public',
  ACT: 'Activation',
  CORE: 'Core',
  PRT: 'Protect',
  GRW: 'Grow',
  EXE: 'Execute',
  GOV: 'Govern',
  SET: 'Settings',
  SYS: 'System',
};
