/**
 * Expert mode context for progressive disclosure of advanced features
 * Allows users to toggle between novice, intermediate, and expert views
 */

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { logger } from '../utils/logger';

export type ExpertMode = 'novice' | 'intermediate' | 'expert';

interface ExpertModeContextValue {
  expertMode: ExpertMode;
  setExpertMode: (mode: ExpertMode) => void;
  isExpert: boolean;
  isNovice: boolean;
  metricLabel: (expertLabel: string, noviceLabel: string) => string;
}

const LOCAL_STORAGE_KEY = 'poseidon-expert-mode';

// Create default context value
const defaultContextValue: ExpertModeContextValue = {
  expertMode: 'intermediate',
  setExpertMode: () => logger.warn('ExpertModeContext not initialized'),
  isExpert: false,
  isNovice: false,
  metricLabel: (_expert, novice) => novice
};

const ExpertModeContext = createContext<ExpertModeContextValue>(defaultContextValue);

export function ExpertModeProvider({ children }: { children: ReactNode }) {
  const [expertMode, setExpertModeState] = useState<ExpertMode>(() => {
    try {
      if (typeof window === 'undefined') return 'intermediate';
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored && ['novice', 'intermediate', 'expert'].includes(stored)) {
        return stored as ExpertMode;
      }
      return 'intermediate';
    } catch (error) {
      console.error('Failed to load expert mode:', error);
      return 'intermediate';
    }
  });

  const setExpertMode = useCallback((mode: ExpertMode) => {
    setExpertModeState(mode);
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(LOCAL_STORAGE_KEY, mode);
      }
    } catch (error) {
      console.error('Failed to save expert mode:', error);
    }
  }, []);

  const isExpert = expertMode === 'expert';
  const _isNovice = expertMode === 'novice';

  const metricLabel = (expertLabel: string, noviceLabel: string): string => {
    if (expertMode === 'expert') {
      return expertLabel;
    }
    if (expertMode === 'intermediate') {
      // Intermediate can show either - default to novice for clarity
      return noviceLabel;
    }
    // novice
    return noviceLabel;
  };

  const value: ExpertModeContextValue = {
    expertMode,
    setExpertMode,
    isExpert,
    isNovice: _isNovice,
    metricLabel
  };

  return (
    <ExpertModeContext.Provider value={value}>
      {children}
    </ExpertModeContext.Provider>
  );
}

export function useExpertMode() {
  const context = useContext(ExpertModeContext);
  if (!context) {
    throw new Error('useExpertMode must be used within ExpertModeProvider');
  }
  return context;
}
