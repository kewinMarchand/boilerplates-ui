import { cx } from './cx'

import type { IconName } from './iconNames'

export const ICON_SPRITE = '/icons.svg'

export interface IconProps {
  name: IconName
  /** Nom accessible d'une icône porteuse de sens. Sans lui, l'icône est décorative. */
  label?: string
  className?: string
}

export const Icon = ({ name, label, className }: IconProps) => (
  <svg
    className={cx('bui-icon', className)}
    {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': 'true' })}
  >
    <use href={`${ICON_SPRITE}#${name}`} />
  </svg>
)
