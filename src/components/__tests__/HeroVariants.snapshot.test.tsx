import React from 'react';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { PageShell } from '../PageShell';
import type { ScreenContract } from '../../contracts/screen-contract';
import type { HeroVariant } from '../PageShell/PageShell';

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

function renderVariant(variant: HeroVariant) {
  const { container } = render(
    <PageShell
      slug={variant}
      contract={contract}
      heroVariant={variant}
      hero={{
        kicker: `Kicker ${variant}`,
        headline: `Headline ${variant}`,
        subline: 'Subline',
        proofLine: { claim: 'Claim', evidence: 'Evidence', source: 'Source' },
        freshness: new Date(),
        kpis: [],
      }}
      primaryFeed={<div>Primary</div>}
      decisionRail={<div>Rail</div>}
    />,
  );

  return container.querySelector('[data-slot="hero_message"]');
}

describe('Hero variants', () => {
  it('renders variant marker attributes', () => {
    const variants: HeroVariant[] = ['command', 'focused', 'analytical', 'editorial', 'minimal'];

    for (const variant of variants) {
      const heroNode = renderVariant(variant);
      expect(heroNode?.getAttribute('data-hero-variant')).toBe(variant);
    }
  });

  it('renders differentiated hero structures', () => {
    const command = renderVariant('command');
    const focused = renderVariant('focused');
    const analytical = renderVariant('analytical');
    const editorial = renderVariant('editorial');
    const minimal = renderVariant('minimal');

    expect(command?.querySelector('.hero-analytical-table')).toBeNull();
    expect(command?.querySelector('.hero-focused-status-bar')).toBeNull();

    expect(focused?.querySelector('.hero-focused-status-bar')).not.toBeNull();
    expect(focused?.querySelector('.hero-focused-proof')).not.toBeNull();

    expect(analytical?.querySelector('.hero-analytical-table')).not.toBeNull();
    expect(analytical?.querySelector('.hero-focused-status-bar')).toBeNull();

    expect(editorial?.querySelector('.hero-editorial-subline')).not.toBeNull();
    expect(editorial?.querySelector('.hero-analytical-table')).toBeNull();

    expect(minimal?.querySelector('.hero-minimal-subline')).not.toBeNull();
    expect(minimal?.querySelector('.hero-analytical-table')).toBeNull();
  });
});
