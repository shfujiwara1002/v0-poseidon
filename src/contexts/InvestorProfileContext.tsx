/**
 * Investor profile context for role-based UI customization
 * Stores investor characteristics and derives recommended allocations
 */

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { logger } from '../utils/logger';

export type RiskTolerance = 'conservative' | 'balanced' | 'aggressive';
export type InvestmentHorizon = 'short' | 'medium' | 'long';
export type ExperienceLevel = 'beginner' | 'intermediate' | 'expert';

export interface RecommendedAllocation {
  stocks: number;
  bonds: number;
  cash: number;
  alternatives: number;
}

export interface InvestorProfile {
  riskTolerance: RiskTolerance;
  investmentHorizon: InvestmentHorizon;
  experienceLevel: ExperienceLevel;
  focusAreas: string[];
  recommendedAllocation: RecommendedAllocation;
}

interface InvestorProfileContextValue {
  profile: InvestorProfile;
  updateProfile: (partial: Partial<InvestorProfile>) => void;
  getRiskDescription: (risk: RiskTolerance) => string;
  getHorizonDescription: (horizon: InvestmentHorizon) => string;
}

// Default recommended allocations by risk tolerance
const ALLOCATION_BY_RISK: Record<RiskTolerance, RecommendedAllocation> = {
  conservative: {
    stocks: 30,
    bonds: 50,
    cash: 15,
    alternatives: 5
  },
  balanced: {
    stocks: 50,
    bonds: 30,
    cash: 10,
    alternatives: 10
  },
  aggressive: {
    stocks: 70,
    bonds: 15,
    cash: 5,
    alternatives: 10
  }
};

// Default investor profile
const DEFAULT_PROFILE: InvestorProfile = {
  riskTolerance: 'balanced',
  investmentHorizon: 'medium',
  experienceLevel: 'intermediate',
  focusAreas: ['growth', 'protection'],
  recommendedAllocation: ALLOCATION_BY_RISK.balanced
};

const LOCAL_STORAGE_KEY = 'poseidon-investor-profile';

// Create default context value
const defaultContextValue: InvestorProfileContextValue = {
  profile: DEFAULT_PROFILE,
  updateProfile: () => logger.warn('InvestorProfileContext not initialized'),
  getRiskDescription: () => '',
  getHorizonDescription: () => ''
};

const InvestorProfileContext = createContext<InvestorProfileContextValue>(
  defaultContextValue
);

export function InvestorProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<InvestorProfile>(() => {
    try {
      if (typeof window === 'undefined') return DEFAULT_PROFILE;
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!stored) return DEFAULT_PROFILE;
      return JSON.parse(stored) as InvestorProfile;
    } catch (error) {
      console.error('Failed to load investor profile:', error);
      return DEFAULT_PROFILE;
    }
  });

  const updateProfile = useCallback((partial: Partial<InvestorProfile>) => {
    setProfile(prev => {
      const updated: InvestorProfile = {
        ...prev,
        ...partial
      };

      // If risk tolerance changed, update recommended allocation
      if (
        partial.riskTolerance &&
        partial.riskTolerance !== prev.riskTolerance
      ) {
        updated.recommendedAllocation =
          ALLOCATION_BY_RISK[partial.riskTolerance];
      }

      // Persist to localStorage
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
        }
      } catch (error) {
        console.error('Failed to save investor profile:', error);
      }

      return updated;
    });
  }, []);

  const getRiskDescription = (risk: RiskTolerance): string => {
    const descriptions: Record<RiskTolerance, string> = {
      conservative:
        'Prioritize capital preservation with lower volatility exposure',
      balanced:
        'Moderate growth with balanced exposure to risk and stability',
      aggressive: 'Maximum growth potential with higher volatility tolerance'
    };
    return descriptions[risk];
  };

  const getHorizonDescription = (horizon: InvestmentHorizon): string => {
    const descriptions: Record<InvestmentHorizon, string> = {
      short: 'Less than 5 years',
      medium: '5-15 years',
      long: 'More than 15 years'
    };
    return descriptions[horizon];
  };

  const value: InvestorProfileContextValue = {
    profile,
    updateProfile,
    getRiskDescription,
    getHorizonDescription
  };

  return (
    <InvestorProfileContext.Provider value={value}>
      {children}
    </InvestorProfileContext.Provider>
  );
}

export function useInvestorProfile() {
  const context = useContext(InvestorProfileContext);
  if (!context) {
    throw new Error(
      'useInvestorProfile must be used within InvestorProfileProvider'
    );
  }
  return context;
}
