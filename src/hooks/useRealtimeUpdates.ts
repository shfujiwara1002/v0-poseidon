import { useState, useEffect, useCallback, useRef } from 'react';
import { realtimeClient, ConnectionState } from '../services/websocket';

export interface RealtimeUpdate<T> {
  data: T;
  timestamp: Date;
  type: 'add' | 'update' | 'delete';
}

export interface UseRealtimeUpdatesOptions {
  pollingInterval?: number;
  enabled?: boolean;
  websocketUrl?: string;
  websocketMessageType?: string;
}

export interface UseRealtimeUpdatesReturn<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  lastUpdate: Date | null;
  refresh: () => Promise<void>;
  isLive: boolean;
  connectionState: ConnectionState;
}

/**
 * Real-time data hook with WebSocket transport and polling fallback.
 *
 * When websocketUrl is provided:
 * - Connects to WebSocket and listens for messages matching websocketMessageType
 * - Falls back to polling when WebSocket is disconnected
 *
 * When websocketUrl is not provided:
 * - Uses polling at pollingInterval (default 5000ms)
 */
export function useRealtimeUpdates<T>(
  fetchFn: () => Promise<T>,
  options: UseRealtimeUpdatesOptions = {}
): UseRealtimeUpdatesReturn<T> {
  const {
    pollingInterval = 5000,
    enabled = true,
    websocketUrl,
    websocketMessageType,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [connectionState, setConnectionState] = useState<ConnectionState>('disconnected');
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const wsConnectedRef = useRef(false);

  const isLive = connectionState === 'connected';

  const refresh = useCallback(async () => {
    try {
      const newData = await fetchFn();
      setData(newData);
      setLastUpdate(new Date());
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchFn]);

  // Start/stop polling based on WebSocket state
  const startPolling = useCallback(() => {
    if (pollingRef.current) return;
    pollingRef.current = setInterval(refresh, pollingInterval);
  }, [refresh, pollingInterval]);

  const stopPolling = useCallback(() => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  }, []);

  // WebSocket connection management
  useEffect(() => {
    if (!enabled || !websocketUrl) return;

    // Listen for connection state changes
    const unsubState = realtimeClient.onStateChange((state: ConnectionState) => {
      setConnectionState(state);
      wsConnectedRef.current = state === 'connected';

      if (state === 'connected') {
        // WebSocket connected: stop polling
        stopPolling();
      } else if (state === 'disconnected' || state === 'reconnecting') {
        // WebSocket lost: start polling as fallback
        startPolling();
      }
    });

    // Listen for data messages
    const unsubMessage = realtimeClient.onMessage((message) => {
      if (websocketMessageType && message.type !== websocketMessageType) return;

      // Update data from WebSocket message payload
      setData(message.payload as T);
      setLastUpdate(new Date(message.timestamp));
      setError(null);
      setIsLoading(false);
    });

    // Connect
    realtimeClient.connect(websocketUrl);

    return () => {
      unsubState();
      unsubMessage();
      realtimeClient.disconnect();
      wsConnectedRef.current = false;
    };
  }, [enabled, websocketUrl, websocketMessageType, startPolling, stopPolling]);

  // Polling fallback (when no WebSocket URL or WebSocket not connected)
  useEffect(() => {
    if (!enabled) return;

    // Initial fetch always happens
    refresh();

    // If no WebSocket URL configured, use polling directly
    if (!websocketUrl) {
      startPolling();
    }

    return () => {
      stopPolling();
    };
  }, [enabled, websocketUrl, refresh, startPolling, stopPolling]);

  return {
    data,
    isLoading,
    error,
    lastUpdate,
    refresh,
    isLive,
    connectionState,
  };
}
