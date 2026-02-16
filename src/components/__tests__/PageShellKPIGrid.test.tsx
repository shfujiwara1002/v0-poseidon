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

function buildKpis(count: number) {
  return Array.from({ length: count }).map((_, index) => ({
    label: `KPI ${index + 1}`,
    value: String(index + 1),
    definition: 'Definition',
  }));
}

function renderWithKpis(count: number) {
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
        kpis: buildKpis(count),
      }}
      primaryFeed={<div>Primary</div>}
      decisionRail={<div>Rail</div>}
    />,
  );

  return container.querySelector('[data-slot="kpi_grid"]');
}

describe('PageShellKPIGrid', () => {
  it('applies layout class for 0 cards', () => {
    const node = renderWithKpis(0);
    expect(node).not.toBeNull();
    expect(node?.getAttribute('data-kpi-count')).toBe('0');
    expect(node?.className).toContain('kpi-layout--0');
  });

  it('applies layout class for 3 cards', () => {
    const node = renderWithKpis(3);
    expect(node?.className).toContain('kpi-layout--3');
  });

  it('applies layout class for 5 cards', () => {
    const node = renderWithKpis(5);
    expect(node?.className).toContain('kpi-layout--5');
  });
});

