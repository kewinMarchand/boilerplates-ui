import { cx } from './cx'

import type { ReactNode } from 'react'

export interface BadgeProps {
  variant?: 'neutral' | 'secondary' | 'info' | 'success' | 'warning' | 'error'
  children: ReactNode
}

export const Badge = ({ variant = 'neutral', children }: BadgeProps) => (
  <span className={cx('bui-badge', variant !== 'neutral' && `bui-badge--${variant}`)}>
    {children}
  </span>
)
