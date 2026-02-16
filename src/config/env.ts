/**
 * Environment configuration utilities
 * Provides type-safe access to environment variables
 */

import { logger } from '../utils/logger';

interface EnvConfig {
  // API
  apiUrl: string;
  mockApi: boolean;

  // Feature Flags
  features: {
    codeSplitting: boolean;
    contextAPI: boolean;
    analytics: boolean;
    performanceMonitoring: boolean;
    uxMetrics: boolean;
  };
  uxMetricsEndpoint: string;

  // Build Info
  version: string;
  buildEnv: 'development' | 'production' | 'test';

  // Runtime
  isDev: boolean;
  isProd: boolean;
  isTest: boolean;
}

function getEnvVar(key: string, defaultValue?: string): string {
  const value = import.meta.env[key];
  if (value === undefined && defaultValue === undefined) {
    logger.warn(`Environment variable ${key} is not defined`);
    return '';
  }
  return value ?? defaultValue ?? '';
}

function getEnvBool(key: string, defaultValue: boolean = false): boolean {
  const value = import.meta.env[key];
  if (value === undefined) return defaultValue;
  return value === 'true' || value === '1';
}

export const env: EnvConfig = {
  // API
  apiUrl: getEnvVar('VITE_API_URL', '/api'),
  mockApi: getEnvBool('VITE_MOCK_API', true),

  // Feature Flags
  features: {
    codeSplitting: getEnvBool('VITE_FEATURE_CODE_SPLITTING', true),
    contextAPI: getEnvBool('VITE_FEATURE_CONTEXT_API', true),
    analytics: getEnvBool('VITE_ENABLE_ANALYTICS', false),
    performanceMonitoring: getEnvBool('VITE_ENABLE_PERFORMANCE_MONITORING', false),
    uxMetrics: getEnvBool('VITE_ENABLE_UX_METRICS', false),
  },
  uxMetricsEndpoint: getEnvVar('VITE_UX_METRICS_ENDPOINT', ''),

  // Build Info
  version: getEnvVar('VITE_VERSION', '1.0.0-dev'),
  buildEnv: (getEnvVar('VITE_BUILD_ENV', 'development') as EnvConfig['buildEnv']),

  // Runtime
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  isTest: import.meta.env.MODE === 'test',
};

// Log configuration in development
if (env.isDev) {
  console.log('[Config]', {
    version: env.version,
    buildEnv: env.buildEnv,
    mockApi: env.mockApi,
    features: env.features,
  });
}

export default env;
