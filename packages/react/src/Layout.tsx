import { createElement } from 'react'

import { cx } from './cx'

import type { HTMLAttributes } from 'react'

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

export interface LayoutProps extends HTMLAttributes<HTMLElement> {
  as?: LayoutTag
  gap?: Gap
}

const layout = (
  base: string,
  { as = 'div', gap, className, ...rest }: LayoutProps,
  ...modifiers: (string | false | undefined)[]
) =>
  createElement(as, {
    ...rest,
    className: cx(base, ...modifiers, gap && `bui-gap-${gap}`, className),
  })

/** Empilement vertical. */
export const Stack = (props: LayoutProps) => layout('bui-stack', props)

export interface ClusterProps extends LayoutProps {
  justify?: 'between' | 'end'
  align?: 'start'
}

/** Rangée qui passe à la ligne. */
export const Cluster = ({ justify, align, ...props }: ClusterProps) =>
  layout(
    'bui-cluster',
    props,
    justify && `bui-cluster--${justify}`,
    align && `bui-cluster--${align}`,
  )

export interface GridProps extends LayoutProps {
  /** Largeur minimale d'une colonne : `sm` 160 px, 220 px par défaut, `lg` 280 px. */
  min?: 'sm' | 'lg'
}

/** Grille de colonnes aussi nombreuses que la largeur le permet. */
export const Grid = ({ min, ...props }: GridProps) =>
  layout('bui-grid', props, min && `bui-grid--${min}`)

/** Conteneur large de la page : 1440 px au plus, gouttières selon la largeur. */
export const Container = (props: Omit<LayoutProps, 'gap'>) => layout('bui-container', props)
