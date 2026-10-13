import { cx } from './cx'
import { Icon } from './Icon'
import { useModal } from './useModal'

import type { ReactNode } from 'react'

export interface ModalProps {
  id: string
  title: string
  open: boolean
  onClose: () => void
  footer?: ReactNode
  closeLabel?: string
  /** Tiroir latéral : la modale s'ouvre contre le bord indiqué. */
  side?: 'start' | 'end' | undefined
  children: ReactNode
}

export const Modal = ({
  id,
  title,
  open,
  onClose,
  footer,
  closeLabel = 'Fermer',
  side,
  children,
}: ModalProps) => {
  const ref = useModal(open, onClose)

  return (
    <dialog
      ref={ref}
      className={cx(
        'bui-modal',
        side && 'bui-modal--drawer',
        side === 'start' && 'bui-modal--start',
      )}
      id={id}
      aria-labelledby={`${id}-title`}
    >
      <div className="bui-modal__header">
        <h2 className="bui-modal__title" id={`${id}-title`}>
          {title}
        </h2>
        <button
          type="button"
          className="bui-modal__close"
          aria-label={closeLabel}
          onClick={() => ref.current?.close()}
        >
          <Icon name="x" />
        </button>
      </div>
      <div className="bui-modal__body">{children}</div>
      {footer && <div className="bui-modal__footer">{footer}</div>}
    </dialog>
  )
}
