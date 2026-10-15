import { cx } from './cx'

import type { ButtonHTMLAttributes } from 'react'

/** Bouton à l'apparence de lien : une action discrète dans le texte ou sous un formulaire (« Tout effacer »). */
export type LinkButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const LinkButton = ({ type = 'button', className, ...rest }: LinkButtonProps) => (
  <button type={type} className={cx('bui-link', 'bui-link--button', className)} {...rest} />
)
