import { cx } from './cx'
import { Icon } from './Icon'

import type { AnchorHTMLAttributes } from 'react'

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  /** Ouvre dans une nouvelle fenêtre et l'annonce (icône et texte masqué). */
  external?: boolean
  /** Mention masquée d'un lien externe. */
  newWindowLabel?: string
}

export const Link = ({
  external = false,
  newWindowLabel = '(nouvelle fenêtre)',
  className,
  children,
  ...rest
}: LinkProps) => (
  <a
    className={cx('bui-link', className)}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
    {...rest}
  >
    {children}
    {external && (
      <>
        <Icon name="external-link" className="bui-link__icon" />
        <span className="bui-visually-hidden">{` ${newWindowLabel}`}</span>
      </>
    )}
  </a>
)
