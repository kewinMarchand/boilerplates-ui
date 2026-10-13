import { cx } from './cx'
import { Icon } from './Icon'

import type { IconName } from './iconNames'
import type { ButtonHTMLAttributes, MouseEvent } from 'react'

export type ButtonVariant = 'primary' | 'outline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Garde le bouton focalisable (aria-disabled) et ignore les clics pendant le chargement. */
  loading?: boolean
  icon?: IconName
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  type = 'button',
  className,
  onClick,
  children,
  ...rest
}: ButtonProps) => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (loading) {
      event.preventDefault()
      return
    }
    onClick?.(event)
  }

  return (
    <button
      type={type}
      className={cx(
        'bui-button',
        variant !== 'primary' && `bui-button--${variant}`,
        size !== 'md' && `bui-button--${size}`,
        className,
      )}
      aria-disabled={loading ? 'true' : undefined}
      onClick={handleClick}
      {...rest}
    >
      {loading ? (
        <Icon name="loader-circle" className="bui-button__spinner" />
      ) : (
        icon && <Icon name={icon} />
      )}
      {children}
      {loading && <span className="bui-visually-hidden"> (chargement en cours)</span>}
    </button>
  )
}
