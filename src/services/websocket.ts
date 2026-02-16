export type ConnectionState = 'connecting' | 'connected' | 'disconnected' | 'reconnecting';

export interface WebSocketMessage<T = unknown> {
  type: string;
  payload: T;
  timestamp: number;
}

type MessageHandler<T = unknown> = (message: WebSocketMessage<T>) => void;
type StateHandler = (state: ConnectionState) => void;

export class RealtimeClient {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private messageHandlers = new Set<MessageHandler>();
  private stateHandlers = new Set<StateHandler>();
  private state: ConnectionState = 'disconnected';
  private url: string = '';
  private latency: number = 0;
  private pingTimer: ReturnType<typeof setInterval> | null = null;

  get connectionState(): ConnectionState {
    return this.state;
  }

  get currentLatency(): number {
    return this.latency;
  }

  connect(url: string): void {
    this.url = url;
    this.setState('connecting');

    try {
      this.ws = new WebSocket(url);

      this.ws.onopen = () => {
        this.reconnectAttempts = 0;
        this.setState('connected');
        this.startPing();
      };

      this.ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data) as WebSocketMessage;
          if (message.type === 'pong') {
            this.latency = Date.now() - message.timestamp;
            return;
          }
          this.messageHandlers.forEach(handler => handler(message));
        } catch {
          // Non-JSON message, ignore
        }
      };

      this.ws.onerror = () => {
        // Error handling is done in onclose
      };

      this.ws.onclose = () => {
        this.stopPing();
        if (this.state !== 'disconnected') {
          this.attemptReconnect();
        }
      };
    } catch {
      this.attemptReconnect();
    }
  }

  disconnect(): void {
    this.setState('disconnected');
    this.stopPing();
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  send<T>(type: string, payload: T): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, payload, timestamp: Date.now() }));
    }
  }

  onMessage(handler: MessageHandler): () => void {
    this.messageHandlers.add(handler);
    return () => this.messageHandlers.delete(handler);
  }

  onStateChange(handler: StateHandler): () => void {
    this.stateHandlers.add(handler);
    return () => this.stateHandlers.delete(handler);
  }

  private setState(state: ConnectionState): void {
    this.state = state;
    this.stateHandlers.forEach(handler => handler(state));
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      this.setState('disconnected');
      return;
    }
    this.setState('reconnecting');
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
    this.reconnectAttempts++;
    this.reconnectTimer = setTimeout(() => this.connect(this.url), delay);
  }

  private startPing(): void {
    this.pingTimer = setInterval(() => {
      this.send('ping', { timestamp: Date.now() });
    }, 10000);
  }

  private stopPing(): void {
    if (this.pingTimer) {
      clearInterval(this.pingTimer);
      this.pingTimer = null;
    }
  }
}

// Singleton instance
export const realtimeClient = new RealtimeClient();
