import { forwardRef, type ReactNode } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import { IconContainer } from '../IconContainer'
import type { NavigationLinkProps } from './NavigationLink.schema'

const engineHover: Record<string, string> = {
  protect: 'hover:border-green-500/20', grow: 'hover:border-violet-500/20',
  execute: 'hover:border-amber-500/20', govern: 'hover:border-blue-500/20',
}

export const NavigationLink = forwardRef<HTMLAnchorElement, NavigationLinkProps>(
  function NavigationLink({ href, label, description, icon, engine, external = false, className }, ref) {
    return (
      <a ref={ref} href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}
        className={twMerge(clsx('group flex items-center gap-3 rounded-lg p-3', 'border border-white/[0.06] bg-white/[0.02]', 'transition-all duration-150 hover:bg-white/[0.04]', engine ? engineHover[engine] : 'hover:border-white/[0.12]'), className)}>
        {icon && <IconContainer engine={engine} size="sm">{icon as ReactNode}</IconContainer>}
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-sm font-medium text-white group-hover:text-white/90 truncate">{label}{external && <span className="ml-1 text-white/30">{'\u2197'}</span>}</span>
          {description && <span className="text-xs text-white/40 truncate">{description}</span>}
        </div>
      </a>
    )
  },
)
NavigationLink.displayName = 'NavigationLink'
