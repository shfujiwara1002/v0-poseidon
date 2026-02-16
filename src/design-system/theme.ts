/**
 * Poseidon Design System — Token Registry
 *
 * Defines typed token metadata for the design system.
 * CSS variables are the runtime source of truth (tokens.css);
 * this module provides TypeScript-side references and metadata
 * for tooling, CVA variants, and documentation.
 */

// ── Engine color tokens ──────────────────────────────────────
export const ENGINE_COLORS = {
  protect: { token: 'var(--engine-protect)', hex: '#14B8A6', label: 'Teal' },
  grow:    { token: 'var(--engine-grow)',    hex: '#8B5CF6', label: 'Violet' },
  execute: { token: 'var(--engine-execute)', hex: '#F59E0B', label: 'Amber' },
  govern:  { token: 'var(--engine-govern)',  hex: '#3B82F6', label: 'Blue' },
} as const;

export type EngineColor = keyof typeof ENGINE_COLORS;

// ── State color tokens ───────────────────────────────────────
export const STATE_COLORS = {
  healthy:  { token: 'var(--state-healthy)',  hex: '#14B8A6' },
  warning:  { token: 'var(--state-warning)',  hex: '#F59E0B' },
  critical: { token: 'var(--state-critical)', hex: '#EF4444' },
  primary:  { token: 'var(--state-primary)',  hex: '#3B82F6' },
  neutral:  { token: 'var(--state-neutral)',  hex: 'rgba(255,255,255,0.72)' },
} as const;

export type StateColor = keyof typeof STATE_COLORS;

// ── Accent color tokens ──────────────────────────────────────
export const ACCENT_COLORS = {
  cyan:   { token: 'var(--accent-cyan)',   hex: '#00F0FF' },
  teal:   { token: 'var(--accent-teal)',   hex: '#14B8A6' },
  violet: { token: 'var(--accent-violet)', hex: '#8B5CF6' },
  amber:  { token: 'var(--accent-amber)',  hex: '#F59E0B' },
  blue:   { token: 'var(--accent-blue)',   hex: '#3B82F6' },
  red:    { token: 'var(--accent-red)',    hex: '#EF4444' },
  gold:   { token: 'var(--accent-gold)',   hex: '#EAB308' },
} as const;

export type AccentColor = keyof typeof ACCENT_COLORS;

// ── Surface tokens ───────────────────────────────────────────
export const SURFACE_TOKENS = {
  primary:   'var(--surface-primary)',
  secondary: 'var(--surface-secondary)',
  elevated:  'var(--surface-elevated)',
} as const;

// ── Text tokens ──────────────────────────────────────────────
export const TEXT_TOKENS = {
  primary:   'var(--text-primary)',
  secondary: 'var(--text-secondary)',
  tertiary:  'var(--text-tertiary)',
} as const;

// ── Spacing scale ────────────────────────────────────────────
export const SPACING = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
} as const;

// ── Radius scale ─────────────────────────────────────────────
export const RADIUS = {
  sm: '12px',
  md: '16px',
  lg: '24px',
} as const;

// ── Motion tokens ────────────────────────────────────────────
export const MOTION = {
  duration: { fast: '120ms', base: '200ms', slow: '320ms' },
  easing: {
    standard: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
    emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
  },
} as const;

// ── Breakpoints ──────────────────────────────────────────────
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;
