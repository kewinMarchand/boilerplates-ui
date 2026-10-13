import { spinner } from '@kewinmarchand/css/reference/markup.ts'
import { Spinner as ReactSpinner } from '@kewinmarchand/react'
import { Spinner as VueSpinner } from '@kewinmarchand/vue'
import { createElement } from 'react'
import { h } from 'vue'

import { mountReact, mountVue } from './support/frameworks'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta = { title: 'Composants/Indicateur de chargement' }
export default meta

type Story = StoryObj

export const Normal: Story = { render: () => spinner() }
export const Grand: Story = {
  render: () => spinner({ size: 'lg', label: 'Chargement des produits' }),
}

export const React: Story = {
  render: () =>
    mountReact(
      createElement('div', { className: 'sb-stack' }, [
        createElement(ReactSpinner, { key: 'md' }),
        createElement(ReactSpinner, { key: 'lg', size: 'lg', label: 'Chargement des produits' }),
      ]),
    ),
}

export const Vue: Story = {
  render: () =>
    mountVue({
      render: () =>
        h('div', { class: 'sb-stack' }, [
          h(VueSpinner),
          h(VueSpinner, { size: 'lg', label: 'Chargement des produits' }),
        ]),
    }),
}
