/**
 * Behavior tracking service for adaptive UI personalization
 * Tracks feature usage, time spent, and computes engagement scores
 */

import { logger } from '../utils/logger';

export interface FeatureUsage {
  featureId: string;
  useCount: number;
  lastUsed: Date;
  totalTimeMs: number;
  engagementScore: number;
}

interface StoredFeatureUsage {
  featureId: string;
  useCount: number;
  lastUsed: string; // ISO timestamp
  totalTimeMs: number;
}

const VALID_FEATURE_IDS = [
  'dashboard',
  'protect',
  'grow',
  'execute',
  'govern',
  'settings',
  'chat',
  'search'
] as const;

const DECAY_DAYS = 30;
const RECENCY_WEIGHT = 0.8;
const FREQUENCY_WEIGHT = 0.2;
const LOCAL_STORAGE_KEY = 'poseidon-behavior';

class BehaviorTracker {
  private tracking: Map<string, FeatureUsage> = new Map();

  constructor() {
    this.loadFromStorage();
  }

  /**
   * Track a feature use event
   */
  trackFeatureUse(featureId: string): void {
    if (!this.isValidFeatureId(featureId)) {
      logger.warn(`Invalid feature ID: ${featureId}`);
      return;
    }

    const now = new Date();
    const existing = this.tracking.get(featureId);

    if (existing) {
      existing.useCount += 1;
      existing.lastUsed = now;
    } else {
      this.tracking.set(featureId, {
        featureId,
        useCount: 1,
        lastUsed: now,
        totalTimeMs: 0,
        engagementScore: 0
      });
    }

    this.updateEngagementScores();
    this.saveToStorage();
  }

  /**
   * Track time spent on a feature
   */
  trackTimeSpent(featureId: string, ms: number): void {
    if (!this.isValidFeatureId(featureId)) {
      logger.warn(`Invalid feature ID: ${featureId}`);
      return;
    }

    const existing = this.tracking.get(featureId);
    if (existing) {
      existing.totalTimeMs += Math.max(0, ms);
      this.updateEngagementScores();
      this.saveToStorage();
    }
  }

  /**
   * Get top features sorted by engagement score
   */
  getTopFeatures(limit: number = 5): FeatureUsage[] {
    const sorted = Array.from(this.tracking.values())
      .sort((a, b) => b.engagementScore - a.engagementScore);
    return sorted.slice(0, limit);
  }

  /**
   * Get all tracked features
   */
  getAllFeatures(): FeatureUsage[] {
    return Array.from(this.tracking.values());
  }

  /**
   * Get engagement score for a specific feature
   */
  getFeatureScore(featureId: string): number {
    return this.tracking.get(featureId)?.engagementScore ?? 0;
  }

  /**
   * Reset all tracking data
   */
  reset(): void {
    this.tracking.clear();
    this.saveToStorage();
  }

  /**
   * Reset specific feature
   */
  resetFeature(featureId: string): void {
    this.tracking.delete(featureId);
    this.saveToStorage();
  }

  private isValidFeatureId(id: string): boolean {
    return (VALID_FEATURE_IDS as readonly string[]).includes(id);
  }

  private updateEngagementScores(): void {
    const now = new Date();
    const features = Array.from(this.tracking.values());

    if (features.length === 0) return;

    // Compute normalized recency and frequency scores
    const maxUseCount = Math.max(...features.map(f => f.useCount), 1);
    features.forEach(feature => {
      // Recency score (0-1): based on days since last used with 30-day decay
      const daysSinceUsed = (now.getTime() - feature.lastUsed.getTime()) / (1000 * 60 * 60 * 24);
      const recencyScore = Math.max(0, 1 - daysSinceUsed / DECAY_DAYS);

      // Frequency score (0-1): normalized use count
      const frequencyScore = feature.useCount / maxUseCount;

      // Combined engagement score
      feature.engagementScore = RECENCY_WEIGHT * recencyScore + FREQUENCY_WEIGHT * frequencyScore;
    });
  }

  private loadFromStorage(): void {
    try {
      if (typeof window === 'undefined') return;
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!stored) return;

      const data = JSON.parse(stored) as StoredFeatureUsage[];
      data.forEach(item => {
        this.tracking.set(item.featureId, {
          ...item,
          lastUsed: new Date(item.lastUsed),
          engagementScore: 0
        });
      });

      this.updateEngagementScores();
    } catch (error) {
      console.error('Failed to load behavior tracking data:', error);
      this.tracking.clear();
    }
  }

  private saveToStorage(): void {
    try {
      if (typeof window === 'undefined') return;
      const data: StoredFeatureUsage[] = Array.from(this.tracking.values()).map(
        ({ engagementScore, ...rest }) => ({
          ...rest,
          lastUsed: rest.lastUsed.toISOString()
        })
      );
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save behavior tracking data:', error);
    }
  }
}

// Singleton instance
export const behaviorTracker = new BehaviorTracker();
