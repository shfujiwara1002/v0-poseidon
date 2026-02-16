import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GlassCard } from '../GlassCard';

describe('GlassCard', () => {
  it('renders children correctly', () => {
    render(
      <GlassCard>
        <p>Card content</p>
      </GlassCard>
    );
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { rerender, container } = render(
      <GlassCard variant="teal">
        <p>Teal variant</p>
      </GlassCard>
    );
    let card = container.firstChild as HTMLElement;
    expect(card.className).toContain('border-l-accent-teal');

    rerender(
      <GlassCard variant="violet">
        <p>Violet variant</p>
      </GlassCard>
    );
    card = container.firstChild as HTMLElement;
    expect(card.className).toContain('border-l-accent-violet');

    rerender(
      <GlassCard variant="amber">
        <p>Amber variant</p>
      </GlassCard>
    );
    card = container.firstChild as HTMLElement;
    expect(card.className).toContain('border-l-accent-amber');

    rerender(
      <GlassCard variant="blue">
        <p>Blue variant</p>
      </GlassCard>
    );
    card = container.firstChild as HTMLElement;
    expect(card.className).toContain('border-l-accent-blue');
  });

  it('applies tone classes correctly', () => {
    const { rerender, container } = render(
      <GlassCard tone="default">
        <p>Default tone</p>
      </GlassCard>
    );
    let card = container.firstChild as HTMLElement;
    expect(card.className).not.toContain('bg-glass-strong');

    rerender(
      <GlassCard tone="dark">
        <p>Dark tone</p>
      </GlassCard>
    );
    card = container.firstChild as HTMLElement;
    expect(card.className).toContain('bg-glass-strong');
  });

  it('applies base glass morphism classes', () => {
    const { container } = render(
      <GlassCard>
        <p>Content</p>
      </GlassCard>
    );
    const card = container.firstChild as HTMLElement;

    expect(card.className).toContain('bg-glass');
    expect(card.className).toContain('backdrop-blur-glass-mobile');
    expect(card.className).toContain('rounded-lg');
    expect(card.className).toContain('border');
  });

  it('applies custom className', () => {
    const { container } = render(
      <GlassCard className="custom-card-class">
        <p>Content</p>
      </GlassCard>
    );
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('custom-card-class');
  });

  it('renders with hover effect classes', () => {
    const { container } = render(
      <GlassCard>
        <p>Content</p>
      </GlassCard>
    );
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('hover:-translate-y-px');
  });

  it('has proper structure with effect layers', () => {
    const { container } = render(
      <GlassCard>
        <p>Content</p>
      </GlassCard>
    );

    // Should have shimmer layer
    const shimmer = container.querySelector('.absolute.inset-\\[-45\\%_-25\\%_35\\%_-25\\%\\]');
    expect(shimmer).toBeInTheDocument();

    // Should have inset effects layer
    const inset = container.querySelector('.absolute.inset-0.rounded-\\[inherit\\]');
    expect(inset).toBeInTheDocument();

    // Should have content wrapper with z-index
    const contentWrapper = container.querySelector('.relative.z-\\[1\\]');
    expect(contentWrapper).toBeInTheDocument();
  });
});
