import { Icon } from './Icon'

import type { IconName } from './iconNames'
import type { ReactNode } from 'react'

export type AlertVariant = 'info' | 'success' | 'warning' | 'error'

const VARIANTS: Record<AlertVariant, { icon: IconName; prefix: string }> = {
  info: { icon: 'info', prefix: 'Information :' },
  success: { icon: 'circle-check', prefix: 'Succès :' },
  warning: { icon: 'triangle-alert', prefix: 'Attention :' },
  error: { icon: 'circle-alert', prefix: 'Erreur :' },
}

export interface AlertProps {
  variant?: AlertVariant
  title?: string
  /** `alert` ou `status` seulement pour une alerte injectée après le chargement de la page. */
  role?: 'alert' | 'status'
  children: ReactNode
}

export const Alert = ({ variant = 'info', title, role, children }: AlertProps) => (
  <div className={`bui-alert bui-alert--${variant}`} role={role}>
    <Icon name={VARIANTS[variant].icon} className="bui-alert__icon" />
    <div className="bui-alert__content">
      <span className="bui-visually-hidden">{VARIANTS[variant].prefix}</span>
      {title && <p className="bui-alert__title">{title}</p>}
      <div className="bui-alert__body">{children}</div>
    </div>
  </div>
)
