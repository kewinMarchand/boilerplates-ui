let iconSprite = '/icons.svg'

/** Chemin du sprite, à changer quand le site est servi sous un sous-chemin. */
export const setIconSprite = (url: string) => {
  iconSprite = url
}

export const iconHref = (name: string) => `${iconSprite}#${name}`
