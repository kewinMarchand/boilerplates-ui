import { cx } from './cx'
import { Icon } from './Icon'

import type { IconName } from './iconNames'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react'

export type ButtonVariant =
  'primary' | 'secondary' | 'outline' | 'ghost' | 'inverse' | 'nav' | 'light' | 'outline-light'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonBaseProps {
  /**
   * `inverse` : sur fond sombre ou primaire. `nav` : lien ou bouton de navigation sur fond primaire (header).
   * `light` et `outline-light` : sur une photo (héros), mêmes couleurs en mode sombre.
   */
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: IconName
  iconPosition?: 'start' | 'end'
  /** Occupe toute la largeur de son conteneur. */
  fullWidth?: boolean
  className?: string
  children?: ReactNode
}

interface NativeButtonProps
  extends ButtonBaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> {
  href?: undefined
  /** Garde le bouton focalisable (aria-disabled) et ignore les clics pendant le chargement. */
  loading?: boolean
}

interface LinkButtonProps
  extends ButtonBaseProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> {
  /** Rend un lien `<a>` à l'apparence de bouton. Désactivé, il perd son `href`. */
  href: string
  disabled?: boolean
}

export type ButtonProps = NativeButtonProps | LinkButtonProps

const classNameOf = (
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  fullWidth = false,
  className?: string,
) =>
  cx(
    'bui-button',
    variant !== 'primary' && `bui-button--${variant}`,
    size !== 'md' && `bui-button--${size}`,
    fullWidth && 'bui-button--full-width',
    className,
  )

export const Button = (props: ButtonProps) => {
  if (typeof props.href === 'string') {
    const {
      variant,
      size,
      icon,
      iconPosition = 'start',
      fullWidth = false,
      className,
      children,
      href,
      disabled,
      ...rest
    } = props
    return (
      <a
        className={classNameOf(variant, size, fullWidth, className)}
        href={disabled ? undefined : href}
        aria-disabled={disabled ? 'true' : undefined}
        {...rest}
      >
        {icon && iconPosition === 'start' && <Icon name={icon} />}
        {children}
        {icon && iconPosition === 'end' && <Icon name={icon} />}
      </a>
    )
  }

  const {
    variant,
    size,
    icon,
    iconPosition = 'start',
    fullWidth = false,
    className,
    children,
    loading = false,
    type = 'button',
    onClick,
    ...rest
  } = props

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
      className={classNameOf(variant, size, fullWidth, className)}
      aria-disabled={loading ? 'true' : undefined}
      onClick={handleClick}
      {...rest}
    >
      {loading ? (
        <Icon name="loader-circle" className="bui-button__spinner" />
      ) : (
        icon && iconPosition === 'start' && <Icon name={icon} />
      )}
      {children}
      {!loading && icon && iconPosition === 'end' && <Icon name={icon} />}
      {loading && <span className="bui-visually-hidden"> (chargement en cours)</span>}
    </button>
  )
}
