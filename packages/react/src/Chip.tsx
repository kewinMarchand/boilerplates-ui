import { cx } from './cx'
import { Icon } from './Icon'

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

interface ChipBaseProps {
  /** Filtre actif : un clic le retire, ce que l'icône montre et un texte masqué annonce. */
  removable?: boolean
  className?: string
  children?: ReactNode
}

interface LinkChipProps
  extends ChipBaseProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ChipBaseProps> {
  /** Lien vers la page filtrée. `aria-current="page"` marque la puce de la page courante. */
  href: string
}

interface ButtonChipProps
  extends ChipBaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ChipBaseProps> {
  href?: undefined
}

/** Puce de filtre ou de sous-catégorie. Une suite de puces va dans une `<ul className="bui-chip-list" role="list">`. */
export type ChipProps = LinkChipProps | ButtonChipProps

const ChipContent = ({ removable, children }: Pick<ChipBaseProps, 'removable' | 'children'>) =>
  removable ? (
    <>
      <span className="bui-visually-hidden">Retirer le filtre : </span>
      {children}
      <Icon name="x" />
    </>
  ) : (
    children
  )

export const Chip = (props: ChipProps) => {
  if (typeof props.href === 'string') {
    const { removable = false, className, children, ...rest } = props
    return (
      <a className={cx('bui-chip', className)} {...rest}>
        <ChipContent removable={removable}>{children}</ChipContent>
      </a>
    )
  }
  const { removable = false, className, children, type = 'button', ...rest } = props
  return (
    <button type={type} className={cx('bui-chip', className)} {...rest}>
      <ChipContent removable={removable}>{children}</ChipContent>
    </button>
  )
}
