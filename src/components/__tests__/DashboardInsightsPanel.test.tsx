import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DashboardInsightsPanel } from '../DashboardInsightsPanel';

describe('DashboardInsightsPanel', () => {
  it('renders morning variant with mission-control structure', () => {
    const { container } = render(<DashboardInsightsPanel variant="morning" />);

    expect(screen.getByText('Good morning')).toBeInTheDocument();
    expect(container.querySelector('.dashboard-main-card.dashboard-insights-card')).not.toBeNull();
    expect(container.querySelector('.dashboard-insights-card--activity')).not.toBeNull();
    expect(container.querySelectorAll('.activity-rail-item')).toHaveLength(3);
    expect(container.querySelectorAll('.activity-rail-node')).toHaveLength(3);
    expect(container.querySelector('.dashboard-action-list')).not.toBeNull();
  });

  it('renders evening variant with shared structure and state semantics', () => {
    const { container } = render(<DashboardInsightsPanel variant="evening" />);

    expect(screen.getByText('Day in review')).toBeInTheDocument();
    expect(container.querySelector('[data-widget="DashboardInsightsPanel"]')).toHaveAttribute('data-variant', 'evening');
    expect(container.querySelectorAll('.dashboard-insights-metric[data-tone]')).toHaveLength(3);
    expect(screen.getByText('AI recommendations')).toBeInTheDocument();
    expect(container.querySelector('.dashboard-insights-proof')).not.toBeNull();
  });
});
