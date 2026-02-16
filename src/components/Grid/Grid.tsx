import React, { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const gridCva = cva('poseidon-grid', {
  variants: {
    columns: {
      1: 'poseidon-grid--1',
      2: 'poseidon-grid--2',
      3: 'poseidon-grid--3',
      4: 'poseidon-grid--4',
      auto: 'poseidon-grid--auto',
    },
    gap: {
      none: 'poseidon-grid--gap-none',
      compact: 'poseidon-grid--gap-compact',
      normal: '',
      spacious: 'poseidon-grid--gap-spacious',
    },
  },
  defaultVariants: {
    columns: 'auto',
    gap: 'normal',
  },
});

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Fixed column count or 'auto' for responsive auto-fit */
  columns?: 1 | 2 | 3 | 4 | 'auto';
  /** Gap between items */
  gap?: 'none' | 'compact' | 'normal' | 'spacious';
}

const GridRoot = forwardRef<HTMLDivElement, GridProps>(
  ({ columns = 'auto', gap = 'normal', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(gridCva({ columns, gap }), className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
GridRoot.displayName = 'Grid';

// ── Grid.Item ────────────────────────────────────────────────
export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Span multiple columns */
  span?: 1 | 2 | 3 | 4 | 'full';
}

const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  ({ span, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          span === 'full' && 'poseidon-grid-item--full',
          span && span !== 'full' && `poseidon-grid-item--span-${span}`,
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
GridItem.displayName = 'Grid.Item';

// ── Compound Export ──────────────────────────────────────────
export const Grid = Object.assign(GridRoot, {
  Item: GridItem,
});
