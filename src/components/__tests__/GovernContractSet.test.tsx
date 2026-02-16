import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { GovernContractSet } from '../GovernContractSet';

describe('GovernContractSet', () => {
  it('renders all three sub-components when valid props provided', () => {
    const { container } = render(
      <GovernContractSet
        auditId="GV-TEST-001"
        modelVersion="v3.2"
        explanationVersion="1.1"
      />,
    );

    // Verified badge
    expect(container.querySelector('.mission-govern-badge')).not.toBeNull();
    // Audit link chip (auditId appears in multiple sub-components)
    expect(screen.getAllByText(/GV-TEST-001/).length).toBeGreaterThanOrEqual(1);
    // Human review CTA
    expect(screen.getByText(/Request human review/i)).toBeInTheDocument();
  });

  it('renders fallback when auditId is missing', () => {
    const { container } = render(
      <GovernContractSet
        auditId=""
        modelVersion="v3.2"
      />,
    );

    // Fallback shows safety message
    expect(screen.getByText(/governance data unavailable/i)).toBeInTheDocument();
    // Should NOT show the verified badge
    expect(container.querySelector('.mission-govern-badge')).toBeNull();
  });

  it('renders fallback when modelVersion is missing', () => {
    render(
      <GovernContractSet
        auditId="GV-TEST-001"
        modelVersion=""
      />,
    );

    expect(screen.getByText(/governance data unavailable/i)).toBeInTheDocument();
  });
});
