import React, { createContext, useContext, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ── Card Context ────────────────────────────────────────────
interface CardContextValue {
  tone: CardTone;
  variant: CardVariant;
}

const CardContext = createContext<CardContextValue>({
  tone: 'neutral',
  variant: 'default',
});

export function useCard() {
  return useContext(CardContext);
}

// ── CVA Definitions ────────────────────────────────────────
export type CardTone = 'healthy' | 'warning' | 'critical' | 'primary' | 'neutral';
export type CardVariant =
  | 'default'
  | 'alert'
  | 'action'
  | 'insight'
  | 'audit'
  | 'rule'
  | 'control'
  | 'metric'
  | 'stat'
  | 'kpi'
  | 'glass';

const cardCva = cva('engine-card', {
  variants: {
    variant: {
      default: '',
      alert: 'signal-evidence-card',
      action: 'action-queue-card',
      insight: 'subscription-leak-card',
      audit: 'audit-log-card',
      rule: 'rule-card',
      control: 'privacy-control-card',
      metric: '',
      stat: 'stat-card stat-card--md',
      kpi: 'stat-card stat-card--md kpi-contract-card',
      glass: '',
    },
    tone: {
      healthy: '',
      warning: '',
      critical: '',
      primary: '',
      neutral: '',
    },
  },
  compoundVariants: [
    { variant: 'action', tone: 'critical', className: 'action-queue-card--critical' },
    { variant: 'action', tone: 'warning', className: 'action-queue-card--warning' },
    { variant: 'action', tone: 'primary', className: 'action-queue-card--primary' },
    { variant: 'action', tone: 'healthy', className: 'action-queue-card--healthy' },
  ],
  defaultVariants: {
    variant: 'default',
    tone: 'neutral',
  },
});

type CardCvaProps = VariantProps<typeof cardCva>;

// ── Card Root ───────────────────────────────────────────────
export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  variant?: CardVariant;
  tone?: CardTone;
  as?: 'article' | 'div' | 'section';
}

const CardRoot = forwardRef<HTMLElement, CardProps>(
  ({ variant = 'default', tone = 'neutral', as: Tag = 'article', className, children, ...props }, ref) => {
    return (
      <CardContext.Provider value={{ tone, variant }}>
        <Tag
          ref={ref as never}
          className={cn(cardCva({ variant, tone }), className)}
          {...props}
        >
          {children}
        </Tag>
      </CardContext.Provider>
    );
  },
);
CardRoot.displayName = 'Card';

// ── Card.Header ─────────────────────────────────────────────
export interface CardHeaderProps extends React.HTMLAttributes<HTMLElement> {}

const CardHeader = forwardRef<HTMLElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <header ref={ref as never} className={cn(className)} {...props}>
        {children}
      </header>
    );
  },
);
CardHeader.displayName = 'Card.Header';

// ── Card.Content ────────────────────────────────────────────
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(className)} {...props}>
        {children}
      </div>
    );
  },
);
CardContent.displayName = 'Card.Content';

// ── Card.Footer ─────────────────────────────────────────────
export interface CardFooterProps extends React.HTMLAttributes<HTMLElement> {}

const CardFooter = forwardRef<HTMLElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <footer ref={ref as never} className={cn(className)} {...props}>
        {children}
      </footer>
    );
  },
);
CardFooter.displayName = 'Card.Footer';

// ── Card.Actions ────────────────────────────────────────────
export interface CardActionsProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardActions = forwardRef<HTMLDivElement, CardActionsProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('mission-dual-actions', className)} {...props}>
        {children}
      </div>
    );
  },
);
CardActions.displayName = 'Card.Actions';

// ── Card.Meta ───────────────────────────────────────────────
export interface CardMetaProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardMeta = forwardRef<HTMLDivElement, CardMetaProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(className)} {...props}>
        {children}
      </div>
    );
  },
);
CardMeta.displayName = 'Card.Meta';

// ── Compound Export ─────────────────────────────────────────
export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
  Actions: CardActions,
  Meta: CardMeta,
});

export type { CardCvaProps };
