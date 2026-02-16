import { env } from '../config/env';

type VitalName = 'LCP' | 'FID' | 'CLS' | 'INP' | 'TTFB';

interface VitalPayload {
  name: VitalName;
  value: number;
  path: string;
  timestamp: number;
}

export function reportVitalMetric(name: VitalName, value: number, path = window.location.pathname) {
  if (!env.features.uxMetrics) return;
  if (!env.uxMetricsEndpoint) return;

  const payload: VitalPayload = {
    name,
    value,
    path,
    timestamp: Date.now(),
  };

  const body = JSON.stringify(payload);
  const blob = new Blob([body], { type: 'application/json' });

  if (navigator.sendBeacon) {
    navigator.sendBeacon(env.uxMetricsEndpoint, blob);
    return;
  }

  void fetch(env.uxMetricsEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
    keepalive: true,
  });
}

