import { cx } from './cx'

import type { ButtonHTMLAttributes } from 'react'

/** Bouton à l'apparence de lien : une action discrète dans le texte ou sous un formulaire (« Tout effacer »). */
export interface LinkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Occupe toute la largeur de son conteneur. */
  fullWidth?: boolean
}

export const LinkButton = ({
  type = 'button',
  fullWidth = false,
  className,
  ...rest
}: LinkButtonProps) => (
  <button
    type={type}
    className={cx('bui-link', 'bui-link--button', fullWidth && 'bui-link--full-width', className)}
    {...rest}
  />
)
