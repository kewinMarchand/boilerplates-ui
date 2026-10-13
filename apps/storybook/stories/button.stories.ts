import { button, type ButtonOptions } from '@kewinmarchand/css/reference/markup.ts'
import { Button as ReactButton, ICON_NAMES, type IconName } from '@kewinmarchand/react'
import { Button as VueButton } from '@kewinmarchand/vue'
import { createElement } from 'react'
import { h } from 'vue'

import { mountReact, mountVue } from './support/frameworks'
import { defined, grid, OVERVIEW, sections } from './support/grid'

import type { Meta, StoryObj } from '@storybook/html-vite'

type Args = ButtonOptions & { icon?: IconName }

const VARIANTS = {
  primary: 'Primaire',
  secondary: 'Secondaire',
  outline: 'Contour',
  ghost: 'Fantôme',
} as const
const SIZES = { sm: 'Petit', md: 'Moyen', lg: 'Grand' } as const

const meta: Meta<Args> = {
  title: 'Actions/Bouton',
  args: { label: 'Envoyer', variant: 'primary', size: 'md', disabled: false, loading: false },
  argTypes: {
    label: { control: 'text', description: 'Texte du bouton' },
    variant: { control: 'select', options: Object.keys(VARIANTS) },
    size: { control: 'select', options: Object.keys(SIZES) },
    icon: { control: 'select', options: ['aucune', ...ICON_NAMES], mapping: { aucune: undefined } },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean', description: 'aria-disabled, icône animée, texte masqué' },
    type: { control: 'select', options: ['button', 'submit', 'reset'] },
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
        'Tailles et icône',
        ['Texte seul', 'Avec icône'],
        Object.entries(SIZES).map(([size, label]) => ({
          label,
          cells: [
            button({ label: 'Ajouter', size: size as 'sm' }),
            button({ label: 'Ajouter', size: size as 'sm', icon: 'plus' }),
          ],
        })),
      ),
    ),
}

export const Html: Story = { name: 'HTML', render: (args) => button(defined(args)) }

export const React: Story = {
  render: (args) => {
    const { label, ...props } = defined(args)
    return mountReact(createElement(ReactButton, props, label))
  },
}

export const Vue: Story = {
  render: (args) => {
    const { label, ...props } = defined(args)
    return mountVue({ render: () => h(VueButton, props, { default: () => label }) })
  },
}
