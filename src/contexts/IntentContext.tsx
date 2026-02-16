import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface IntentImpact {
  metric: string;
  value: string;
  direction: 'up' | 'down' | 'neutral';
}

export interface AgentIntent {
  id: string;
  engine: 'protect' | 'grow' | 'execute' | 'govern';
  action: string;
  description: string;
  reasoning: string[];
  impact: IntentImpact[];
  confidence: number;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected' | 'modified' | 'expired';
}

interface IntentContextValue {
  intents: AgentIntent[];
  pendingIntent: AgentIntent | null;
  pushIntent: (intent: Omit<AgentIntent, 'id' | 'createdAt' | 'status'>) => void;
  approveIntent: (id: string) => void;
  rejectIntent: (id: string) => void;
  modifyIntent: (id: string, modifications: Partial<AgentIntent>) => void;
  clearIntents: () => void;
}

const IntentContext = createContext<IntentContextValue>({
  intents: [],
  pendingIntent: null,
  pushIntent: () => {},
  approveIntent: () => {},
  rejectIntent: () => {},
  modifyIntent: () => {},
  clearIntents: () => {},
});

export function IntentProvider({ children }: { children: ReactNode }) {
  const [intents, setIntents] = useState<AgentIntent[]>([]);

  const pushIntent = useCallback((intent: Omit<AgentIntent, 'id' | 'createdAt' | 'status'>) => {
    const newIntent: AgentIntent = {
      ...intent,
      id: `intent-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    setIntents(prev => [...prev, newIntent]);
  }, []);

  const approveIntent = useCallback((id: string) => {
    setIntents(prev => prev.map(i => i.id === id ? { ...i, status: 'approved' as const } : i));
  }, []);

  const rejectIntent = useCallback((id: string) => {
    setIntents(prev => prev.map(i => i.id === id ? { ...i, status: 'rejected' as const } : i));
  }, []);

  const modifyIntent = useCallback((id: string, modifications: Partial<AgentIntent>) => {
    setIntents(prev => prev.map(i => i.id === id ? { ...i, ...modifications, status: 'modified' as const } : i));
  }, []);

  const clearIntents = useCallback(() => {
    setIntents(prev => prev.filter(i => i.status === 'pending'));
  }, []);

  const pendingIntent = intents.find(i => i.status === 'pending') || null;

  return (
    <IntentContext.Provider value={{ intents, pendingIntent, pushIntent, approveIntent, rejectIntent, modifyIntent, clearIntents }}>
      {children}
    </IntentContext.Provider>
  );
}

export function useIntents() {
  return useContext(IntentContext);
}
