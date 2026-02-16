import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RouterProvider } from '../../router';
import ProtectAlertDetail from '../../pages/ProtectAlertDetail';

/**
 * Protect decision flow: PRT02 evidence → decision order enforcement.
 * Critical rule: Signal → Evidence → Decision.
 */
describe('Protect decision flow (PRT02)', () => {
  function renderPRT02() {
    return render(
      <RouterProvider>
        <ProtectAlertDetail />
      </RouterProvider>,
    );
  }

  it('renders signal section', () => {
    renderPRT02();
    expect(screen.getAllByText(/Signal/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Alert type/i)).toBeInTheDocument();
  });

  it('renders evidence section', () => {
    renderPRT02();
    expect(screen.getByText(/Evidence analysis/i)).toBeInTheDocument();
  });

  it('renders decision section with recommended actions', () => {
    renderPRT02();
    expect(screen.getByText(/Recommended actions/i)).toBeInTheDocument();
    expect(screen.getByText(/Block & investigate/i)).toBeInTheDocument();
  });

  it('shows fraud severity as critical', () => {
    renderPRT02();
    // The severity chip renders "critical"
    expect(screen.getAllByText(/critical/i).length).toBeGreaterThan(0);
  });

  it('shows confidence score', () => {
    renderPRT02();
    expect(screen.getAllByText(/97%/).length).toBeGreaterThan(0);
  });

  it('has governance contract set', () => {
    const { container } = renderPRT02();
    const govBadge = container.querySelector('.mission-govern-badge');
    expect(govBadge).not.toBeNull();
  });

  it('provides dispute link', () => {
    renderPRT02();
    expect(screen.getByText(/Open dispute/i)).toBeInTheDocument();
  });

  it('signal section appears before decision controls in DOM order', () => {
    const { container } = renderPRT02();

    // Signal section contains "Alert type"
    const signalSection = container.querySelector('.engine-section');
    // Decision section contains data-slot="action_preview"
    const decisionSection = container.querySelector('[data-slot="action_preview"]');

    expect(signalSection).not.toBeNull();
    expect(decisionSection).not.toBeNull();

    if (signalSection && decisionSection) {
      const position = signalSection.compareDocumentPosition(decisionSection);
      // Signal must come before decision
      expect(position & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    }
  });
});
