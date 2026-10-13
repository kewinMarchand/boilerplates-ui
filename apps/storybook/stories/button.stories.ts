import { button, type ButtonOptions } from '@kewinmarchand/css/reference/markup.ts'
import { Button as ReactButton, type IconName } from '@kewinmarchand/react'
import { Button as VueButton } from '@kewinmarchand/vue'
import { createElement } from 'react'
import { h } from 'vue'

import { mountReact, mountVue } from './support/frameworks'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta = { title: 'Composants/Bouton' }
export default meta

type Story = StoryObj

const STATES: (ButtonOptions & { icon?: IconName })[] = [
  { label: 'Primaire' },
  { label: 'Contour', variant: 'outline' },
  { label: 'Fantôme', variant: 'ghost' },
  { label: 'Petit', size: 'sm' },
  { label: 'Grand', size: 'lg' },
  { label: 'Ajouter', icon: 'plus' },
  { label: 'Désactivé', disabled: true },
  { label: 'Envoyer', loading: true },
]

const stack = (html: string) => `<div class="sb-stack">${html}</div>`
const variants = () =>
  stack(
    ['primary', 'outline', 'ghost']
      .map((variant) => button({ label: 'Envoyer', variant } as ButtonOptions))
      .join(''),
  )

export const Primaire: Story = { render: () => button({ label: 'Envoyer' }) }
export const Contour: Story = { render: () => button({ label: 'Annuler', variant: 'outline' }) }
export const Fantome: Story = {
  name: 'Fantôme',
  render: () => button({ label: 'Fermer', variant: 'ghost' }),
}
export const Tailles: Story = {
  render: () =>
    stack(
      (['sm', 'md', 'lg'] as const)
        .map((size) => button({ label: `Taille ${size}`, size }))
        .join(''),
    ),
}
export const AvecIcone: Story = {
  name: 'Avec icône',
  render: () => button({ label: 'Écrire', icon: 'mail' }),
}
export const Desactive: Story = {
  name: 'Désactivé',
  render: () =>
    stack(
      ['primary', 'outline']
        .map((variant) => button({ label: 'Envoyer', variant, disabled: true } as ButtonOptions))
        .join(''),
    ),
}
export const Chargement: Story = { render: () => button({ label: 'Envoyer', loading: true }) }
export const Survol: Story = { render: variants, parameters: { pseudo: { hover: true } } }
export const Focus: Story = { render: variants, parameters: { pseudo: { focusVisible: true } } }

export const React: Story = {
  render: () =>
    mountReact(
      createElement(
        'div',
        { className: 'sb-stack' },
        STATES.map(({ label, ...props }) =>
          createElement(ReactButton, { key: label, ...props }, label),
        ),
      ),
    ),
}

export const Vue: Story = {
  render: () =>
    mountVue({
      render: () =>
        h(
          'div',
          { class: 'sb-stack' },
          STATES.map(({ label, ...props }) => h(VueButton, props, { default: () => label })),
        ),
    }),
}
