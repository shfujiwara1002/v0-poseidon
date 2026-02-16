import React from 'react';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { PageShell } from '../PageShell';
import type { ScreenContract } from '../../contracts/screen-contract';

const contract: ScreenContract = {
  id: 'S-V3-CORE01',
  oneScreenMessage: 'Message',
  transitionCue: 'Go next',
  transitionTo: '/protect',
  requiredSlots: ['hero_message', 'proof_line', 'kpi_grid', 'primary_feed', 'govern_controls', 'transition_cue'],
  requiredWidgets: ['MissionSectionHeader'],
  governRequired: false,
  density: {
    maxSummaryLinesDesktop: 4,
    maxSummaryLinesMobile: 3,
    detailsDefault: 'collapsed',
  },
  mobileBehavior: {
    touchTargetMin: 44,
    inputFontMin: 16,
    disclosureDefault: 'collapsed',
    bottomSheetEnabled: false,
  },
  supportedStates: ['loading', 'empty', 'partial', 'error-recoverable', 'error-permission', 'success'],
};

describe('PageShell semantics', () => {
  it('uses region for primary feed instead of nested main', () => {
    const { container } = render(
      <PageShell
        slug="dashboard"
        contract={contract}
        layout="dashboard"
        heroVariant="command"
        hero={{
          kicker: 'Kicker',
          headline: 'Headline',
          subline: 'Subline',
          proofLine: { claim: 'Claim', evidence: 'Evidence', source: 'Source' },
          freshness: new Date(),
          kpis: [],
        }}
        primaryFeed={<div>Primary</div>}
        decisionRail={<div>Rail</div>}
      />,
    );

    const primaryFeed = container.querySelector('[data-slot="primary_feed"]');
    expect(primaryFeed?.tagName.toLowerCase()).toBe('section');
    expect(primaryFeed?.getAttribute('role')).toBe('region');
  });

  it('links hero heading id to primary feed region', () => {
    const { container } = render(
      <PageShell
        slug="protect"
        contract={contract}
        heroVariant="focused"
        hero={{
          kicker: 'Kicker',
          headline: 'Protect Headline',
          subline: 'Subline',
          proofLine: { claim: 'Claim', evidence: 'Evidence', source: 'Source' },
          freshness: new Date(),
          kpis: [],
        }}
        primaryFeed={<div>Primary</div>}
        decisionRail={<div>Rail</div>}
      />,
    );

    const heading = container.querySelector('#hero-heading-protect');
    const primaryFeed = container.querySelector('[data-slot="primary_feed"]');

    expect(heading).not.toBeNull();
    expect(primaryFeed?.getAttribute('aria-labelledby')).toBe('hero-heading-protect');
  });
});

