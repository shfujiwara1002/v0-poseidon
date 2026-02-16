/**
 * Hook for time-of-day context to enable adaptive UI based on user's current time
 * Returns period, greetings in English and Japanese, and contextual flags
 */

import { useState, useEffect } from 'react';

export type TimePeriod = 'morning' | 'afternoon' | 'evening' | 'night';

export interface TimeContext {
  period: TimePeriod;
  greeting: string;
  isMorningBriefing: boolean;
  isEveningReview: boolean;
}

// Time period boundaries (24-hour format)
const PERIOD_BOUNDARIES = {
  morning: { start: 6, end: 12 },
  afternoon: { start: 12, end: 17 },
  evening: { start: 17, end: 22 },
  night: { start: 22, end: 6 } // wraps around midnight
};

const GREETINGS: Record<TimePeriod, string> = {
  morning: 'Good morning',
  afternoon: 'Good afternoon',
  evening: 'Good evening',
  night: 'Working late'
};

/**
 * Determine current time period based on hour
 */
function getTimePeriod(hour: number): TimePeriod {
  if (hour >= PERIOD_BOUNDARIES.morning.start && hour < PERIOD_BOUNDARIES.morning.end) {
    return 'morning';
  }
  if (hour >= PERIOD_BOUNDARIES.afternoon.start && hour < PERIOD_BOUNDARIES.afternoon.end) {
    return 'afternoon';
  }
  if (hour >= PERIOD_BOUNDARIES.evening.start && hour < PERIOD_BOUNDARIES.evening.end) {
    return 'evening';
  }
  return 'night';
}

/**
 * Get current time context
 */
function getTimeContextNow(): TimeContext {
  const now = new Date();
  const hour = now.getHours();
  const period = getTimePeriod(hour);
  const greeting = GREETINGS[period];

  return {
    period,
    greeting,
    isMorningBriefing: period === 'morning',
    isEveningReview: period === 'evening'
  };
}

/**
 * Hook to get current time context with automatic updates on the hour
 */
export function useTimeContext(): TimeContext {
  const [timeContext, setTimeContext] = useState<TimeContext>(getTimeContextNow);

  useEffect(() => {
    // Update immediately in case the context changed
    setTimeContext(getTimeContextNow());

    // Set up hourly check
    const now = new Date();
    const nextHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1);
    const msUntilNextHour = nextHour.getTime() - now.getTime();

    // Initial timeout to next hour boundary
    const initialTimeout = setTimeout(() => {
      setTimeContext(getTimeContextNow());

      // Then set up recurring hourly interval
      const hourlyInterval = setInterval(() => {
        setTimeContext(getTimeContextNow());
      }, 60 * 60 * 1000);

      return () => clearInterval(hourlyInterval);
    }, msUntilNextHour);

    return () => clearTimeout(initialTimeout);
  }, []);

  return timeContext;
}
