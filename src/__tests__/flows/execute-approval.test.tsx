import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RouterProvider } from '../../router';
import ExecuteApproval from '../../pages/ExecuteApproval';

/**
 * Execute approval flow: EXE02 consent-gated approval.
 * Critical rule: Approve button disabled until ConsentScopePanel viewed.
 */
describe('Execute approval flow (EXE02)', () => {
  function renderEXE02() {
    return render(
      <RouterProvider>
        <ExecuteApproval />
      </RouterProvider>,
    );
  }

  it('starts with approve button disabled', () => {
    renderEXE02();
    const approveBtn = screen.getByRole('button', { name: /Review consent scope first/i });
    expect(approveBtn).toBeDisabled();
  });

  it('enables approve button after consent scope is reviewed', () => {
    const { container } = renderEXE02();

    // Click the consent scope card to mark as reviewed
    const consentCard = container.querySelector('[data-slot="consent_scope"]') as HTMLElement;
    expect(consentCard).not.toBeNull();
    fireEvent.click(consentCard);

    // After clicking, the button text changes and becomes enabled
    const approveBtn = screen.getByRole('button', { name: /Approve & execute/i });
    expect(approveBtn).not.toBeDisabled();
  });

  it('consent scope card shows reviewed status after click', () => {
    const { container } = renderEXE02();

    const consentCard = container.querySelector('[data-slot="consent_scope"]') as HTMLElement;
    fireEvent.click(consentCard);

    expect(screen.getByText(/Reviewed/)).toBeInTheDocument();
  });

  it('shows action evidence section', () => {
    renderEXE02();
    expect(screen.getByText(/Action evidence/i)).toBeInTheDocument();
  });

  it('shows expected outcome section', () => {
    renderEXE02();
    expect(screen.getByText(/Expected outcome/i)).toBeInTheDocument();
  });

  it('has governance contract set', () => {
    const { container } = renderEXE02();
    expect(container.querySelector('.mission-govern-badge')).not.toBeNull();
  });
});
