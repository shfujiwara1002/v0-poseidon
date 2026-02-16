/**
 * Poseidon Design System — CVA Variant Definitions
 *
 * Shared CVA variant maps for tone, size, and engine-specific styling.
 * Import these into component CVA definitions for consistent theming.
 */

import { cva, type VariantProps } from 'class-variance-authority';

// ── Tone variants (maps to state colors) ─────────────────────
export const toneVariants = {
  healthy: 'text-[var(--state-healthy)] border-[var(--state-healthy)]',
  warning: 'text-[var(--state-warning)] border-[var(--state-warning)]',
  critical: 'text-[var(--state-critical)] border-[var(--state-critical)]',
  primary: 'text-[var(--state-primary)] border-[var(--state-primary)]',
  neutral: 'text-[var(--text-secondary)] border-white/10',
} as const;

export type Tone = keyof typeof toneVariants;

// ── Engine accent variants ───────────────────────────────────
export const engineAccentVariants = {
  protect: 'text-[var(--engine-protect)] border-[var(--engine-protect)]',
  grow: 'text-[var(--engine-grow)] border-[var(--engine-grow)]',
  execute: 'text-[var(--engine-execute)] border-[var(--engine-execute)]',
  govern: 'text-[var(--engine-govern)] border-[var(--engine-govern)]',
} as const;

export type EngineAccent = keyof typeof engineAccentVariants;

// ── Size variants ────────────────────────────────────────────
export const sizeVariants = {
  sm: 'text-sm px-3 py-1.5',
  md: 'text-sm px-4 py-2',
  lg: 'text-base px-5 py-2.5',
} as const;

export type Size = keyof typeof sizeVariants;

// ── Card CVA base ────────────────────────────────────────────
export const cardVariants = cva(
  'rounded-2xl border bg-[var(--surface-primary)] p-4 transition-colors',
  {
    variants: {
      tone: {
        healthy:  'border-[var(--state-healthy)]/20',
        warning:  'border-[var(--state-warning)]/20',
        critical: 'border-[var(--state-critical)]/20',
        primary:  'border-[var(--state-primary)]/20',
        neutral:  'border-white/10',
      },
      variant: {
        default:  '',
        elevated: 'shadow-lg',
        glass:    'backdrop-blur-xl bg-[var(--surface-primary)]/60',
        outline:  'bg-transparent',
      },
    },
    defaultVariants: {
      tone: 'neutral',
      variant: 'default',
    },
  },
);

export type CardVariants = VariantProps<typeof cardVariants>;

// ── Chip/Badge CVA base ──────────────────────────────────────
export const chipVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
  {
    variants: {
      tone: {
        healthy:  'bg-[var(--state-healthy)]/10 text-[var(--state-healthy)]',
        warning:  'bg-[var(--state-warning)]/10 text-[var(--state-warning)]',
        critical: 'bg-[var(--state-critical)]/10 text-[var(--state-critical)]',
        primary:  'bg-[var(--state-primary)]/10 text-[var(--state-primary)]',
        neutral:  'bg-white/5 text-[var(--text-secondary)]',
      },
    },
    defaultVariants: {
      tone: 'neutral',
    },
  },
);

export type ChipVariants = VariantProps<typeof chipVariants>;

// ── Button CVA base ──────────────────────────────────────────
export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:   'bg-[var(--accent-cyan)] text-[#04141a] hover:bg-[var(--accent-cyan)]/90',
        secondary: 'bg-white/10 text-[var(--text-primary)] hover:bg-white/15',
        ghost:     'text-[var(--text-secondary)] hover:bg-white/5 hover:text-[var(--text-primary)]',
        destructive: 'bg-[var(--state-critical)]/10 text-[var(--state-critical)] hover:bg-[var(--state-critical)]/20',
        outline:   'border border-white/10 bg-transparent text-[var(--text-primary)] hover:bg-white/5',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
