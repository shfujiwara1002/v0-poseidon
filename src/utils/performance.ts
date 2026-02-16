/**
 * Performance monitoring utilities
 * Tracks key metrics and reports Web Vitals
 */

import { env } from '../config/env';
import { reportVitalMetric } from '../services/uxTelemetry';

interface PerformanceMeasure {
  name: string;
  duration: number;
  startMark: string;
  endMark?: string;
}

class PerformanceMonitor {
  private marks = new Map<string, number>();
  private measures: PerformanceMeasure[] = [];
  private enabled: boolean;

  constructor() {
    this.enabled = env.features.performanceMonitoring;
  }

  /**
   * Mark a performance timestamp
   */
  mark(name: string): void {
    if (!this.enabled) return;

    const timestamp = performance.now();
    this.marks.set(name, timestamp);

    if (env.isDev) {
      console.log(`[Perf Mark] ${name}: ${timestamp.toFixed(2)}ms`);
    }
  }

  /**
   * Measure duration between two marks
   */
  measure(name: string, startMark: string, endMark?: string): number | null {
    if (!this.enabled) return null;

    const start = this.marks.get(startMark);
    if (!start) {
      console.warn(`[Perf] Start mark "${startMark}" not found`);
      return null;
    }

    const end = endMark ? this.marks.get(endMark) : performance.now();
    if (endMark && !end) {
      console.warn(`[Perf] End mark "${endMark}" not found`);
      return null;
    }

    const duration = (end as number) - start;

    const measure: PerformanceMeasure = {
      name,
      duration,
      startMark,
      endMark,
    };
    this.measures.push(measure);

    if (env.isDev) {
      console.log(`[Perf Measure] ${name}: ${duration.toFixed(2)}ms`);
    }

    return duration;
  }

  /**
   * Get all recorded measures
   */
  getMeasures(): PerformanceMeasure[] {
    return [...this.measures];
  }

  /**
   * Clear all marks and measures
   */
  clear(): void {
    this.marks.clear();
    this.measures = [];
  }

  /**
   * Report Web Vitals (LCP, FID, CLS)
   */
  reportWebVitals(): void {
    if (!this.enabled) return;
    if (typeof window === 'undefined') return;
    if (!('PerformanceObserver' in window)) return;

    // Largest Contentful Paint (LCP)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
          renderTime?: number;
          loadTime?: number;
        };
        const lcp = lastEntry.renderTime || lastEntry.loadTime || 0;

        if (env.isDev) {
          console.log(`[WebVitals] LCP: ${lcp.toFixed(2)}ms`);
        }
        reportVitalMetric('LCP', lcp);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // LCP not supported
    }

    // First Input Delay (FID)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: PerformanceEntry & { processingStart?: number }) => {
          const fid = entry.processingStart ? entry.processingStart - entry.startTime : 0;

          if (env.isDev) {
            console.log(`[WebVitals] FID: ${fid.toFixed(2)}ms`);
          }
          reportVitalMetric('FID', fid);
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      // FID not supported
    }

    // Cumulative Layout Shift (CLS)
    try {
      let clsScore = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: PerformanceEntry & { value?: number }) => {
          if (!(entry as { hadRecentInput?: boolean }).hadRecentInput) {
            clsScore += entry.value || 0;
          }
        });

        if (env.isDev) {
          console.log(`[WebVitals] CLS: ${clsScore.toFixed(4)}`);
        }
        reportVitalMetric('CLS', clsScore);
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      // CLS not supported
    }

    // Interaction to Next Paint (INP) — replaces FID as Core Web Vital
    try {
      let worstInp = 0;
      const inpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: PerformanceEntry & { duration?: number }) => {
          const duration = entry.duration ?? 0;
          if (duration > worstInp) {
            worstInp = duration;
          }
        });

        if (env.isDev) {
          console.log(`[WebVitals] INP (worst): ${worstInp.toFixed(2)}ms`);
        }
        reportVitalMetric('INP', worstInp);
      });
      inpObserver.observe({ type: 'event', buffered: true } as PerformanceObserverInit);
    } catch (e) {
      // INP / event timing not supported
    }

    // Time to First Byte (TTFB)
    if (window.performance && window.performance.timing) {
      const navigationTiming = window.performance.timing;
      const ttfb = navigationTiming.responseStart - navigationTiming.requestStart;

      if (env.isDev) {
        console.log(`[WebVitals] TTFB: ${ttfb.toFixed(2)}ms`);
      }
      reportVitalMetric('TTFB', ttfb);
    }
  }

  /**
   * Track component render time
   */
  trackComponentRender(componentName: string, duration: number): void {
    if (!this.enabled) return;

    if (duration > 16) {
      // Warn if render takes longer than one frame (16ms at 60fps)
      console.warn(`[Perf] Slow render: ${componentName} took ${duration.toFixed(2)}ms`);
    }
  }

  /**
   * Get performance summary
   */
  getSummary(): {
    totalMarks: number;
    totalMeasures: number;
    averageDuration: number;
    slowestMeasure: PerformanceMeasure | null;
  } {
    const totalMarks = this.marks.size;
    const totalMeasures = this.measures.length;

    if (totalMeasures === 0) {
      return {
        totalMarks,
        totalMeasures,
        averageDuration: 0,
        slowestMeasure: null,
      };
    }

    const totalDuration = this.measures.reduce((sum, m) => sum + m.duration, 0);
    const averageDuration = totalDuration / totalMeasures;
    const slowestMeasure = this.measures.reduce((slowest, current) =>
      current.duration > slowest.duration ? current : slowest
    );

    return {
      totalMarks,
      totalMeasures,
      averageDuration,
      slowestMeasure,
    };
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Initialize Web Vitals reporting
if (typeof window !== 'undefined' && env.features.performanceMonitoring) {
  performanceMonitor.reportWebVitals();
}

export default performanceMonitor;
