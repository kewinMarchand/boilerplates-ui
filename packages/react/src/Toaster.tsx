import { Icon } from './Icon'

import type { IconName } from './iconNames'

export type ToastVariant = 'info' | 'success' | 'warning' | 'error'

export interface ToastData {
  id: string
  message: string
  variant?: ToastVariant
}

const VARIANTS: Record<ToastVariant, { icon: IconName; prefix: string; role: 'status' | 'alert' }> =
  {
    info: { icon: 'info', prefix: 'Information :', role: 'status' },
    success: { icon: 'circle-check', prefix: 'Succès :', role: 'status' },
    warning: { icon: 'triangle-alert', prefix: 'Attention :', role: 'alert' },
    error: { icon: 'circle-alert', prefix: 'Erreur :', role: 'alert' },
  }

export interface ToasterProps {
  toasts: ToastData[]
  onClose: (id: string) => void
  /** Préfixes masqués par variante ; une variante absente garde le sien. */
  prefixes?: Partial<Record<ToastVariant, string>>
  /** Nom accessible du bouton de fermeture de chaque toast. */
  closeLabel?: string
}

/** Pas de disparition automatique (WCAG 2.2.1) : chaque toast se ferme par son bouton. */
export const Toaster = ({
  toasts,
  onClose,
  prefixes,
  closeLabel = 'Fermer la notification',
}: ToasterProps) => (
  <div className="bui-toaster">
    {toasts.map(({ id, message, variant = 'info' }) => (
      <div
        key={id}
        className={`bui-toast bui-toast--${variant}`}
        id={id}
        role={VARIANTS[variant].role}
      >
        <Icon name={VARIANTS[variant].icon} className="bui-toast__icon" />
        <p className="bui-toast__message">
          <span className="bui-visually-hidden">{`${prefixes?.[variant] ?? VARIANTS[variant].prefix} `}</span>
          {message}
        </p>
        <button
          type="button"
          className="bui-toast__close"
          aria-label={closeLabel}
          onClick={() => onClose(id)}
        >
          <Icon name="x" />
        </button>
      </div>
    ))}
  </div>
)
