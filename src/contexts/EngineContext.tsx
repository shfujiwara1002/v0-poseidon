import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { logger } from '../utils/logger';

export interface EngineMetrics {
  accuracy: number;
  coverage: number;
  speed: number;
  volume: number;
}

export interface EngineData {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'processing';
  metrics: EngineMetrics;
  lastUpdated: Date;
}

interface EngineContextValue {
  engines: Record<string, EngineData>;
  updateEngine: (id: string, data: Partial<EngineData>) => void;
  updateMetrics: (id: string, metrics: Partial<EngineMetrics>) => void;
  refreshEngines: () => Promise<void>;
  isRefreshing: boolean;
}

// Initial mock data for engines - must be declared before defaultEngineContext
const initialEngines: Record<string, EngineData> = {
  protect: {
    id: 'protect',
    name: 'Protect Engine',
    status: 'active',
    metrics: {
      accuracy: 94,
      coverage: 87,
      speed: 92,
      volume: 1200000
    },
    lastUpdated: new Date()
  },
  grow: {
    id: 'grow',
    name: 'Grow Engine',
    status: 'active',
    metrics: {
      accuracy: 96,
      coverage: 89,
      speed: 88,
      volume: 850000
    },
    lastUpdated: new Date()
  },
  execute: {
    id: 'execute',
    name: 'Execute Engine',
    status: 'active',
    metrics: {
      accuracy: 91,
      coverage: 93,
      speed: 95,
      volume: 2100000
    },
    lastUpdated: new Date()
  },
  govern: {
    id: 'govern',
    name: 'Govern Engine',
    status: 'processing',
    metrics: {
      accuracy: 98,
      coverage: 85,
      speed: 79,
      volume: 450000
    },
    lastUpdated: new Date()
  }
};

// Create default context value to prevent "No default value" errors
const defaultEngineContext: EngineContextValue = {
  engines: initialEngines,
  updateEngine: () => logger.warn('Engine context not initialized'),
  updateMetrics: () => logger.warn('Engine context not initialized'),
  refreshEngines: async () => logger.warn('Engine context not initialized'),
  isRefreshing: false,
};

const EngineContext = createContext<EngineContextValue>(defaultEngineContext);

export function EngineProvider({ children }: { children: ReactNode }) {
  const [engines, setEngines] = useState<Record<string, EngineData>>(initialEngines);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const updateEngine = useCallback((id: string, data: Partial<EngineData>) => {
    setEngines(prev => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: { ...prev[id], ...data, lastUpdated: new Date() }
      };
    });
  }, []);

  const updateMetrics = useCallback((id: string, metrics: Partial<EngineMetrics>) => {
    setEngines(prev => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          metrics: { ...prev[id].metrics, ...metrics },
          lastUpdated: new Date()
        }
      };
    });
  }, []);

  const refreshEngines = useCallback(async () => {
    setIsRefreshing(true);
    try {
      // Simulate API call - will be replaced with real API in Phase 3
      await new Promise(resolve => setTimeout(resolve, 800));

      // Update lastUpdated timestamp for all engines
      setEngines(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(key => {
          updated[key] = { ...updated[key], lastUpdated: new Date() };
        });
        return updated;
      });
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  const value: EngineContextValue = {
    engines,
    updateEngine,
    updateMetrics,
    refreshEngines,
    isRefreshing
  };

  return <EngineContext.Provider value={value}>{children}</EngineContext.Provider>;
}

export function useEngines() {
  const context = useContext(EngineContext);
  return context;
}
