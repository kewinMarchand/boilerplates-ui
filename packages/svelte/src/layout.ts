/** Espacement des briques de mise en page, dans l'échelle des jetons (`--bui-space-*`). */
export type Gap = '1' | '2' | '3' | '4' | '6' | '8' | '12'

/** Balises qu'une brique de mise en page peut rendre. */
export type LayoutTag =
  | 'div'
  | 'section'
  | 'article'
  | 'aside'
  | 'header'
  | 'footer'
  | 'main'
  | 'nav'
  | 'form'
  | 'ul'
  | 'ol'
