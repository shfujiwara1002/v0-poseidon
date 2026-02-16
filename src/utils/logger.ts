/**
 * Dev-gated logger utility
 * Wraps console methods behind import.meta.env.DEV to silence
 * default-context warnings and debug output in production builds.
 *
 * Usage:
 *   import { logger } from '../utils/logger';
 *   logger.warn('Context not initialized');  // noop in prod
 *
 * Note: console.error in catch blocks should remain as-is —
 * those indicate real runtime failures worth surfacing in prod.
 */

const isDev = import.meta.env.DEV;

export const logger = {
  warn: (...args: unknown[]): void => {
    if (isDev) console.warn(...args);
  },
  log: (...args: unknown[]): void => {
    if (isDev) console.log(...args);
  },
  info: (...args: unknown[]): void => {
    if (isDev) console.info(...args);
  },
};

export default logger;
