import { cx } from './cx'

import type { IconName } from './iconNames'

let iconSprite = '/icons.svg'

/** Chemin du sprite, à changer quand le site est servi sous un sous-chemin. */
export const setIconSprite = (url: string) => {
  iconSprite = url
}

export interface IconProps {
  name: IconName
  /** Nom accessible d'une icône porteuse de sens. Sans lui, l'icône est décorative. */
  label?: string
  /** Taille fixe, sinon la taille du texte (1em). */
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const Icon = ({ name, label, size, className }: IconProps) => (
  <svg
    className={cx('bui-icon', size && `bui-icon--${size}`, className)}
    {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': 'true' })}
  >
    <use href={`${iconSprite}#${name}`} />
  </svg>
)
