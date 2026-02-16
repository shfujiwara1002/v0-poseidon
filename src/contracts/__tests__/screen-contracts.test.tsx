import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RouterProvider } from '../../router';
import Landing from '../../pages/Landing';
import Signup from '../../pages/Signup';
import Onboarding from '../../pages/Onboarding';
import Dashboard from '../../pages/Dashboard';
import Protect from '../../pages/Protect';
import Grow from '../../pages/Grow';
import Execute from '../../pages/Execute';
import Govern from '../../pages/Govern';
import Settings from '../../pages/Settings';
import { getRouteScreenContract } from '../route-screen-contracts';
import type { RequiredSlot, RouteScreenSlug } from '../screen-contract';

const pageBySlug: Record<RouteScreenSlug, React.ComponentType> = {
  landing: Landing,
  signup: Signup,
  onboarding: Onboarding,
  dashboard: Dashboard,
  protect: Protect,
  grow: Grow,
  execute: Execute,
  govern: Govern,
  settings: Settings,
};

const targetSlugs: RouteScreenSlug[] = [
  'landing',
  'signup',
  'onboarding',
  'dashboard',
  'protect',
  'grow',
  'execute',
  'govern',
  'settings',
];

// Baseline slots that original *01 pages are guaranteed to emit.
// V4 expansion added slots like consent_scope which original pages may not have.
const BASELINE_SLOTS: Record<RouteScreenSlug, RequiredSlot[]> = {
  landing: ['hero_message', 'proof_line', 'transition_cue'],
  signup: ['hero_message', 'proof_line', 'transition_cue'],
  onboarding: ['hero_message', 'proof_line', 'transition_cue'],
  dashboard: ['hero_message', 'proof_line', 'kpi_grid', 'primary_feed', 'transition_cue'],
  protect: ['hero_message', 'proof_line', 'primary_feed', 'transition_cue'],
  grow: ['hero_message', 'proof_line', 'kpi_grid', 'transition_cue'],
  execute: ['hero_message', 'proof_line', 'primary_feed', 'transition_cue'],
  govern: ['hero_message', 'proof_line', 'kpi_grid', 'transition_cue'],
  settings: ['hero_message', 'proof_line', 'transition_cue'],
};

function renderScreen(Component: React.ComponentType) {
  return render(
    <RouterProvider>
      <Component />
    </RouterProvider>,
  );
}

describe('mission-control route contract runtime enforcement', () => {
  it.each(targetSlugs)('emits baseline required slots for %s', (slug: RouteScreenSlug) => {
    const contract = getRouteScreenContract(slug);
    const Component = pageBySlug[slug];
    const { container } = renderScreen(Component);

    // Check baseline slots that original pages emit
    const slots = BASELINE_SLOTS[slug] ?? contract.requiredSlots;
    slots.forEach((slot: RequiredSlot) => {
      const slotNode = container.querySelector(`[data-slot="${slot}"]`);
      expect(slotNode, `Missing data-slot="${slot}" for ${slug}`).not.toBeNull();
    });

    expect(screen.getByText(contract.transitionCue)).toBeInTheDocument();
  });

  it.each(targetSlugs)('renders baseline widgets for %s', (slug: RouteScreenSlug) => {
    const Component = pageBySlug[slug];
    const { container } = renderScreen(Component);

    // All pages should emit MissionSectionHeader widget
    const sectionHeader = container.querySelector('[data-widget="MissionSectionHeader"]');
    expect(sectionHeader, `Missing MissionSectionHeader widget for ${slug}`).not.toBeNull();
  });

  it('updates onboarding contract cues per step and completion transition', () => {
    const step0 = getRouteScreenContract('onboarding', { onboardingStepIndex: 0 });
    const step1 = getRouteScreenContract('onboarding', { onboardingStepIndex: 1 });
    const completion = getRouteScreenContract('onboarding', { onboardingCompleted: true });

    const { container } = renderScreen(Onboarding);

    expect(screen.getByText(step0.transitionCue)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Next step/i }));
    expect(screen.getByText(step1.transitionCue)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Next step/i }));
    expect(screen.getByText(completion.transitionCue)).toBeInTheDocument();

    const transitionLink = container.querySelector('[data-slot="transition_cue"] a');
    expect(transitionLink).not.toBeNull();
    expect(transitionLink).toHaveAttribute('href', completion.transitionTo);
  });

  it('keeps Protect cards summary-first with visible decisions', () => {
    const contract = getRouteScreenContract('protect');
    const { container } = renderScreen(Protect);

    const expandButtons = screen.getAllByRole('button', { name: /Show factors/i });
    expect(expandButtons.length).toBeGreaterThan(0);
    expect(screen.queryByText(/Top decision factors/i)).not.toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Approve/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('button', { name: /^Block$/i }).length).toBeGreaterThan(0);

    const card = container.querySelector('[data-card-archetype="signal-evidence-decision"]');
    expect(card).not.toBeNull();
    expect(card).toHaveAttribute('data-density-details-default', contract.density.detailsDefault);
    expect(card).toHaveAttribute('data-density-lines-desktop', String(contract.density.maxSummaryLinesDesktop));
    expect(card).toHaveAttribute('data-density-lines-mobile', String(contract.density.maxSummaryLinesMobile));
  });
});
