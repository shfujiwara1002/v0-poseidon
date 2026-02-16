import React from 'react';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { RouterProvider } from '../../router';
import Dashboard from '../Dashboard';
import EngineWorkspace from '../EngineWorkspace';
import Engines from '../Engines';
import Execute from '../Execute';
import ExecuteV2 from '../ExecuteV2';
import Govern from '../Govern';
import GovernV2 from '../GovernV2';
import Grow from '../Grow';
import GrowV2 from '../GrowV2';
import Landing from '../Landing';
import Login from '../Login';
import NotFound from '../NotFound';
import Onboarding from '../Onboarding';
import OnboardingV2 from '../OnboardingV2';
import Protect from '../Protect';
import ProtectV2 from '../ProtectV2';
import Settings from '../Settings';
import Signup from '../Signup';
import V3Hub from '../V3Hub';

const REQUIRED_SLOTS = [
  'hero_message',
  'proof_line',
  'kpi_grid',
  'primary_feed',
  'decision_rail',
  'govern_controls',
  'transition_cue',
] as const;

const PAGE_CASES: Array<{ name: string; render: () => React.ReactElement }> = [
  { name: 'Landing', render: () => <Landing /> },
  { name: 'Signup', render: () => <Signup /> },
  { name: 'Onboarding', render: () => <Onboarding /> },
  { name: 'Dashboard', render: () => <Dashboard /> },
  { name: 'Protect', render: () => <Protect /> },
  { name: 'Grow', render: () => <Grow /> },
  { name: 'Execute', render: () => <Execute /> },
  { name: 'Govern', render: () => <Govern /> },
  { name: 'Settings', render: () => <Settings /> },
  { name: 'NotFound', render: () => <NotFound /> },
  { name: 'EngineWorkspace', render: () => <EngineWorkspace slug="protect" /> },
  { name: 'Engines', render: () => <Engines /> },
  { name: 'Login', render: () => <Login /> },
  { name: 'V3Hub', render: () => <V3Hub /> },
  { name: 'ProtectV2', render: () => <ProtectV2 /> },
  { name: 'GrowV2', render: () => <GrowV2 /> },
  { name: 'ExecuteV2', render: () => <ExecuteV2 /> },
  { name: 'GovernV2', render: () => <GovernV2 /> },
  { name: 'OnboardingV2', render: () => <OnboardingV2 /> },
];

function renderPage(element: React.ReactElement) {
  return render(<RouterProvider>{element}</RouterProvider>);
}

describe('visual system coverage - all pages', () => {
  it.each(PAGE_CASES)('renders mission-control shell for %s', ({ render: renderElement }) => {
    const { container } = renderPage(renderElement());

    expect(container.querySelector('.entry-screen')).not.toBeNull();
    expect(container.querySelector('.entry-nav')).not.toBeNull();

    REQUIRED_SLOTS.forEach((slot) => {
      expect(container.querySelector(`[data-slot="${slot}"]`)).not.toBeNull();
    });
  });
});

