import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider } from '../../router';
import Dashboard from '../Dashboard';

let mockPeriod: 'morning' | 'afternoon' | 'evening' | 'night' = 'morning';

vi.mock('../../hooks/useTimeContext', () => ({
  useTimeContext: () => ({
    period: mockPeriod,
    greeting: 'Test greeting',
    isMorningBriefing: mockPeriod === 'morning',
    isEveningReview: mockPeriod === 'evening',
  }),
}));

function renderDashboard() {
  return render(
    <RouterProvider>
      <Dashboard />
    </RouterProvider>,
  );
}

describe('Dashboard insights period mapping', () => {
  it('renders morning insights for morning period', () => {
    mockPeriod = 'morning';
    const { container } = renderDashboard();

    expect(screen.getByText('Good morning')).toBeInTheDocument();
    expect(container.querySelector('[data-widget="DashboardInsightsPanel"]')).toHaveAttribute('data-variant', 'morning');
  });

  it('renders evening insights for non-morning periods', () => {
    mockPeriod = 'afternoon';
    const { container } = renderDashboard();

    expect(screen.getByText('Day in review')).toBeInTheDocument();
    expect(container.querySelector('[data-widget="DashboardInsightsPanel"]')).toHaveAttribute('data-variant', 'evening');
  });

  it('reuses EngineIconBadge in signal trend and insights', () => {
    mockPeriod = 'morning';
    const { container } = renderDashboard();

    const badges = container.querySelectorAll('[data-widget="EngineIconBadge"]');
    expect(badges.length).toBeGreaterThan(0);
    expect(container.querySelector('[data-widget="EngineIconBadge"][data-engine="Protect"]')).not.toBeNull();
  });

  it('applies activity-rail visuals to morning insights', () => {
    mockPeriod = 'morning';
    const { container } = renderDashboard();

    expect(container.querySelector('.dashboard-insights-card--activity')).not.toBeNull();
    expect(container.querySelectorAll('.dashboard-insights-activity-rail .activity-rail-item')).toHaveLength(3);
    expect(container.querySelectorAll('.dashboard-insights-activity-rail .activity-rail-node')).toHaveLength(3);
  });
});
