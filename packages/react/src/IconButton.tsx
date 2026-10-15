import { cx } from './cx'
import { Icon } from './Icon'

import type { IconName } from './iconNames'
import type { ButtonHTMLAttributes } from 'react'

export interface IconButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'aria-label'
> {
  /** Nom accessible, obligatoire : le bouton n'a pas de texte visible. */
  label: string
  icon: IconName
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'nav'
  size?: 'sm' | 'md'
}

export const IconButton = ({
  label,
  icon,
  variant = 'primary',
  size = 'md',
  type = 'button',
  className,
  ...rest
}: IconButtonProps) => (
  <button
    type={type}
    className={cx(
      'bui-button',
      variant !== 'primary' && `bui-button--${variant}`,
      size !== 'md' && `bui-button--${size}`,
      'bui-button--icon',
      className,
    )}
    aria-label={label}
    {...rest}
  >
    <Icon name={icon} />
  </button>
)
