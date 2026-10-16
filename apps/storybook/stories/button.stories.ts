import { createElement } from 'react'
import { h } from 'vue'

import { button, type ButtonOptions } from '@kewinmarchand/css/reference/markup.ts'

import { Button as ReactButton, ICON_NAMES, type IconName } from '@kewinmarchand/react'
import { Button as VueButton } from '@kewinmarchand/vue'

import { mountReact, mountVue } from './support/frameworks'
import { defined, grid, OVERVIEW, sections } from './support/grid'

import type { Meta, StoryObj } from '@storybook/html-vite'

type Args = ButtonOptions & { icon?: IconName; onClick?: () => void }

const VARIANTS = {
  primary: 'Primaire',
  secondary: 'Secondaire',
  outline: 'Contour',
  ghost: 'Fantôme',
  nav: 'Navigation (fond primaire)',
  light: 'Clair (sur photo)',
  'outline-light': 'Contour clair (sur photo)',
} as const
const SIZES = { sm: 'Petit', md: 'Moyen', lg: 'Grand' } as const

const meta: Meta<Args> = {
  title: 'Actions/Bouton',
  args: {
    label: 'Envoyer',
    variant: 'primary',
    size: 'md',
    iconPosition: 'start',
    disabled: false,
    loading: false,
    fullWidth: false,
  },
  argTypes: {
    label: { control: 'text', description: 'Texte du bouton' },
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'outline',
        'ghost',
        'inverse',
        'nav',
        'light',
        'outline-light',
      ],
    },
    size: { control: 'select', options: Object.keys(SIZES) },
    icon: { control: 'select', options: ['aucune', ...ICON_NAMES], mapping: { aucune: undefined } },
    iconPosition: { control: 'select', options: ['start', 'end'] },
    href: {
      control: 'select',
      options: ['aucun', '#catalogue'],
      mapping: { aucun: undefined },
      description: 'Rend un lien <a> à l’apparence de bouton',
    },
    current: { control: 'boolean', description: 'aria-current="page", avec href seulement' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean', description: 'aria-disabled, icône animée, texte masqué' },
    type: { control: 'select', options: ['button', 'submit', 'reset'] },
    fullWidth: { control: 'boolean', description: 'Toute la largeur du conteneur' },
    onClick: { action: 'click', description: 'React et Vue' },
  },
}
export default meta

type Story = StoryObj<Args>

export const ToutesLesVariantes: Story = {
  name: 'Toutes les variantes',
  parameters: OVERVIEW,
  render: () =>
    sections(
      grid(
        'Variantes et états',
        [
          'Normal',
          { label: 'Survol', state: 'hover' },
          { label: 'Focus', state: 'focus' },
          'Désactivé',
          'Chargement',
        ],
        Object.entries(VARIANTS).map(([variant, label]) => {
          const v = variant as ButtonOptions['variant'] & string
          return {
            label,
            dark: v === 'inverse' || v === 'nav',
            photo: v === 'light' || v === 'outline-light',
            cells: [
              button({ label: 'Envoyer', variant: v }),
              button({ label: 'Envoyer', variant: v }),
              button({ label: 'Envoyer', variant: v }),
              button({ label: 'Envoyer', variant: v, disabled: true }),
              button({ label: 'Envoyer', variant: v, loading: true }),
            ],
          }
        }),
      ),
      grid(
        'Tailles, icône et lien',
        ['Texte seul', 'Icône avant', 'Icône après', 'Lien (href)'],
        Object.entries(SIZES).map(([size, label]) => ({
          label,
          cells: [
            button({ label: 'Ajouter', size: size as 'sm' }),
            button({ label: 'Ajouter', size: size as 'sm', icon: 'plus' }),
            button({
              label: 'Suivant',
              size: size as 'sm',
              icon: 'chevron-right',
              iconPosition: 'end',
            }),
            button({ label: 'Catalogue', size: size as 'sm', href: '#catalogue' }),
          ],
        })),
      ),
      grid(
        'Pleine largeur',
        ['Bouton', 'Lien (href)'],
        [
          {
            label: 'Conteneur de 320 px',
            cells: [
              `<div style="width: 320px">${button({ label: 'Envoyer', fullWidth: true })}</div>`,
              `<div style="width: 320px">${button({ label: 'Catalogue', href: '#catalogue', fullWidth: true })}</div>`,
            ],
          },
        ],
      ),
    ),
}

export const Html: Story = { name: 'HTML', render: (args) => button(defined(args)) }

export const React: Story = {
  render: (args) => {
    const { label, current, ...props } = defined(args)
    return mountReact(
      createElement(ReactButton, { ...props, 'aria-current': current ? 'page' : undefined }, label),
    )
  },
}

export const Vue: Story = {
  render: (args) => {
    const { label, current, ...props } = defined(args)
    return mountVue({
      render: () =>
        h(
          VueButton,
          { ...props, 'aria-current': current ? 'page' : undefined },
          { default: () => label },
        ),
    })
  },
}
