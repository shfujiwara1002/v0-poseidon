import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type AutonomyLevel = 0 | 1 | 2 | 3;

export interface AutonomyConfig {
  level: AutonomyLevel;
  labels: Record<AutonomyLevel, { name: string; description: string }>;
}

interface AutonomyContextValue {
  autonomyLevel: AutonomyLevel;
  setAutonomyLevel: (level: AutonomyLevel) => void;
  config: AutonomyConfig;
}

const defaultConfig: AutonomyConfig = {
  level: 1,
  labels: {
    0: { name: 'Manual', description: 'Approve every action' },
    1: { name: 'Collaborative', description: 'AI suggests, you confirm' },
    2: { name: 'Autonomous', description: 'AI executes with intent preview' },
    3: { name: 'Proactive', description: 'AI self-directs optimization' },
  },
};

const AutonomyContext = createContext<AutonomyContextValue>({
  autonomyLevel: 1,
  setAutonomyLevel: () => {},
  config: defaultConfig,
});

export function AutonomyProvider({ children }: { children: ReactNode }) {
  const [autonomyLevel, setLevel] = useState<AutonomyLevel>(() => {
    const saved = localStorage.getItem('poseidon-autonomy-level');
    return saved ? (parseInt(saved, 10) as AutonomyLevel) : 1;
  });

  const setAutonomyLevel = useCallback((level: AutonomyLevel) => {
    setLevel(level);
    localStorage.setItem('poseidon-autonomy-level', String(level));
  }, []);

  return (
    <AutonomyContext.Provider value={{ autonomyLevel, setAutonomyLevel, config: { ...defaultConfig, level: autonomyLevel } }}>
      {children}
    </AutonomyContext.Provider>
  );
}

export function useAutonomy() {
  return useContext(AutonomyContext);
}
