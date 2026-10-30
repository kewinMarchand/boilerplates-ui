import { useEffect, useRef } from 'react'

import { cx } from './cx'
import { Icon } from './Icon'
import { useModal } from './useModal'

import type { HTMLAttributes, ReactNode } from 'react'

export interface ModalProps extends Omit<
  HTMLAttributes<HTMLDialogElement>,
  'title' | 'children' | 'onClose' | 'id'
> {
  id: string
  title: string
  open: boolean
  onClose: () => void
  footer?: ReactNode
  closeLabel?: string
  /** Tiroir latéral : la modale s'ouvre contre le bord indiqué. */
  side?: 'start' | 'end' | undefined
  /** Le titre reçoit le focus à l'ouverture et à chaque changement (navigation à niveaux dans un tiroir). */
  focusTitle?: boolean
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
  focusTitle,
  children,
  ...rest
}: ModalProps) => {
  const ref = useModal(open, onClose)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (open && focusTitle) titleRef.current?.focus()
  }, [open, focusTitle, title])

  return (
    <dialog
      {...rest}
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
        <h2
          ref={titleRef}
          className="bui-modal__title"
          id={`${id}-title`}
          tabIndex={focusTitle ? -1 : undefined}
        >
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
