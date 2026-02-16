import type { WebSocketMessage } from './websocket';

type SimulatedEventHandler = (event: WebSocketMessage) => void;

/**
 * RealtimeSimulation — generates simulated real-time events for the prototype.
 * Replaces the need for a real WebSocket server.
 */
export class RealtimeSimulation {
  private handlers = new Set<SimulatedEventHandler>();
  private timers: ReturnType<typeof setInterval>[] = [];
  private running = false;

  onEvent(handler: SimulatedEventHandler): () => void {
    this.handlers.add(handler);
    return () => this.handlers.delete(handler);
  }

  private emit(type: string, payload: unknown) {
    const msg: WebSocketMessage = { type, payload, timestamp: Date.now() };
    this.handlers.forEach((h) => h(msg));
  }

  start() {
    if (this.running) return;
    this.running = true;

    // Alert push — every 15s
    this.timers.push(
      setInterval(() => {
        const severities = ['critical', 'high', 'medium', 'low'] as const;
        const types = ['fraud', 'anomaly', 'security', 'compliance'] as const;
        this.emit('alert:new', {
          id: `ALT-SIM-${Date.now()}`,
          type: types[Math.floor(Math.random() * types.length)],
          severity: severities[Math.floor(Math.random() * severities.length)],
          title: 'Simulated alert event',
          confidence: +(0.7 + Math.random() * 0.25).toFixed(2),
          timestamp: new Date().toISOString(),
        });
      }, 15000),
    );

    // Execute status — every 60s
    this.timers.push(
      setInterval(() => {
        const statuses = ['pending', 'approved', 'executing', 'completed'] as const;
        this.emit('execute:status', {
          actionId: `ACT-SIM-${Date.now()}`,
          status: statuses[Math.floor(Math.random() * statuses.length)],
          timestamp: new Date().toISOString(),
        });
      }, 60000),
    );

    // Oversight update — every 90s
    this.timers.push(
      setInterval(() => {
        this.emit('oversight:update', {
          caseId: `OV-SIM-${Date.now()}`,
          status: Math.random() > 0.5 ? 'resolved' : 'in-review',
          timestamp: new Date().toISOString(),
        });
      }, 90000),
    );

    // Trust score tick — every 120s
    this.timers.push(
      setInterval(() => {
        this.emit('trust:tick', {
          overall: Math.round(95 + Math.random() * 4),
          components: {
            accuracy: Math.round(94 + Math.random() * 4),
            transparency: Math.round(96 + Math.random() * 3),
            fairness: Math.round(92 + Math.random() * 5),
            compliance: 100,
          },
          timestamp: new Date().toISOString(),
        });
      }, 120000),
    );
  }

  stop() {
    this.running = false;
    this.timers.forEach(clearInterval);
    this.timers = [];
  }
}

export const realtimeSimulation = new RealtimeSimulation();
