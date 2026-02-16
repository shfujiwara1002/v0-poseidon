import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type TaskState = 'idle' | 'running' | 'paused' | 'completed' | 'cancelled' | 'error';

export interface AgentTask {
  id: string;
  intentId: string;
  description: string;
  engine: 'protect' | 'grow' | 'execute' | 'govern';
  state: TaskState;
  progress: number;
  startedAt: Date;
  completedAt?: Date;
  error?: string;
}

interface AgentExecutionContextValue {
  currentTask: AgentTask | null;
  taskHistory: AgentTask[];
  startTask: (intentId: string, description: string, engine: AgentTask['engine']) => string;
  pauseTask: (id: string) => void;
  resumeTask: (id: string) => void;
  cancelTask: (id: string) => void;
  updateProgress: (id: string, progress: number) => void;
  completeTask: (id: string) => void;
  failTask: (id: string, error: string) => void;
}

const AgentExecutionContext = createContext<AgentExecutionContextValue>({
  currentTask: null,
  taskHistory: [],
  startTask: () => '',
  pauseTask: () => {},
  resumeTask: () => {},
  cancelTask: () => {},
  updateProgress: () => {},
  completeTask: () => {},
  failTask: () => {},
});

export function AgentExecutionProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<AgentTask[]>([]);

  const startTask = useCallback((intentId: string, description: string, engine: AgentTask['engine']) => {
    const id = `task-${Date.now()}`;
    const task: AgentTask = { id, intentId, description, engine, state: 'running', progress: 0, startedAt: new Date() };
    setTasks(prev => [...prev, task]);
    return id;
  }, []);

  const updateTaskState = useCallback((id: string, updates: Partial<AgentTask>) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  }, []);

  const pauseTask = useCallback((id: string) => updateTaskState(id, { state: 'paused' }), [updateTaskState]);
  const resumeTask = useCallback((id: string) => updateTaskState(id, { state: 'running' }), [updateTaskState]);
  const cancelTask = useCallback((id: string) => updateTaskState(id, { state: 'cancelled', completedAt: new Date() }), [updateTaskState]);
  const updateProgress = useCallback((id: string, progress: number) => updateTaskState(id, { progress }), [updateTaskState]);
  const completeTask = useCallback((id: string) => updateTaskState(id, { state: 'completed', progress: 100, completedAt: new Date() }), [updateTaskState]);
  const failTask = useCallback((id: string, error: string) => updateTaskState(id, { state: 'error', error, completedAt: new Date() }), [updateTaskState]);

  const currentTask = tasks.find(t => t.state === 'running' || t.state === 'paused') || null;
  const taskHistory = tasks.filter(t => ['completed', 'cancelled', 'error'].includes(t.state));

  return (
    <AgentExecutionContext.Provider value={{ currentTask, taskHistory, startTask, pauseTask, resumeTask, cancelTask, updateProgress, completeTask, failTask }}>
      {children}
    </AgentExecutionContext.Provider>
  );
}

export function useAgentExecution() {
  return useContext(AgentExecutionContext);
}
