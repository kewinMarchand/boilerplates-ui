import { spinner, type SpinnerOptions } from '@kewinmarchand/css/reference/markup.ts'
import { Spinner as ReactSpinner } from '@kewinmarchand/react'
import { Spinner as VueSpinner } from '@kewinmarchand/vue'
import { createElement } from 'react'
import { h } from 'vue'

import { mountReact, mountVue } from './support/frameworks'
import { grid, OVERVIEW } from './support/grid'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta<SpinnerOptions> = {
  title: 'Retours/Indicateur de chargement',
  args: { label: 'Chargement en cours', size: 'md' },
  argTypes: {
    label: { control: 'text', description: 'Texte masqué, annoncé' },
    size: { control: 'select', options: ['md', 'lg'] },
  },
}
export default meta

type Story = StoryObj<SpinnerOptions>

export const ToutesLesVariantes: Story = {
  name: 'Toutes les variantes',
  parameters: OVERVIEW,
  render: () =>
    grid(
      'Tailles',
      ['Rendu'],
      [
        { label: 'Moyen', cells: [spinner()] },
        { label: 'Grand', cells: [spinner({ size: 'lg', label: 'Chargement des produits' })] },
      ],
    ),
}

export const Html: Story = { name: 'HTML', render: (args) => spinner(args) }
export const React: Story = { render: (args) => mountReact(createElement(ReactSpinner, args)) }
export const Vue: Story = { render: (args) => mountVue({ render: () => h(VueSpinner, args) }) }
