import { useState, useEffect, useCallback } from 'react';

export type ColorblindMode = 'none' | 'deuteranopia' | 'protanopia' | 'tritanopia';

interface UseColorblindModeReturn {
  mode: ColorblindMode;
  setMode: (mode: ColorblindMode) => void;
  isActive: boolean;
}

const STORAGE_KEY = 'poseidon-colorblind-mode';

/**
 * Hook to manage colorblind mode and apply it to the document.
 *
 * Usage:
 * const { mode, setMode, isActive } = useColorblindMode();
 *
 * When mode is set, applies `data-colorblind-mode` attribute to document.documentElement.
 * Removes attribute when mode is 'none'.
 * Persists selection in localStorage.
 *
 * @returns Object with current mode, setter, and active status
 */
export function useColorblindMode(): UseColorblindModeReturn {
  const [mode, setModeState] = useState<ColorblindMode>(() => {
    // Load from localStorage on mount
    if (typeof window === 'undefined') return 'none';
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && isValidColorblindMode(saved)) {
      return saved as ColorblindMode;
    }
    return 'none';
  });

  const isActive = mode !== 'none';

  // Apply mode to document and save to localStorage
  const setMode = useCallback((newMode: ColorblindMode) => {
    setModeState(newMode);

    if (typeof window !== 'undefined') {
      const htmlElement = document.documentElement;

      if (newMode === 'none') {
        htmlElement.removeAttribute('data-colorblind-mode');
      } else {
        htmlElement.setAttribute('data-colorblind-mode', newMode);
      }

      localStorage.setItem(STORAGE_KEY, newMode);
    }
  }, []);

  // Apply initial mode on mount
  useEffect(() => {
    const htmlElement = document.documentElement;
    if (mode === 'none') {
      htmlElement.removeAttribute('data-colorblind-mode');
    } else {
      htmlElement.setAttribute('data-colorblind-mode', mode);
    }
  }, [mode]);

  return {
    mode,
    setMode,
    isActive,
  };
}

/**
 * Type guard to validate colorblind mode strings.
 */
function isValidColorblindMode(value: unknown): value is ColorblindMode {
  return (
    value === 'none' ||
    value === 'deuteranopia' ||
    value === 'protanopia' ||
    value === 'tritanopia'
  );
}
