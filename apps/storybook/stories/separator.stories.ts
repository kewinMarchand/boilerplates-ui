import { separator } from '@kewinmarchand/css/reference/markup.ts'
import { Separator as ReactSeparator } from '@kewinmarchand/react'
import { Separator as VueSeparator } from '@kewinmarchand/vue'
import { createElement } from 'react'
import { h } from 'vue'

import { mountReact, mountVue } from './support/frameworks'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta = { title: 'Composants/Séparateur' }
export default meta

type Story = StoryObj

export const Horizontal: Story = {
  render: () => `<p>Section précédente</p>${separator()}<p>Section suivante</p>`,
}
export const Vertical: Story = {
  render: () =>
    `<div class="sb-stack" style="align-items: stretch"><span>Accueil</span>${separator({ orientation: 'vertical' })}<span>Catalogue</span></div>`,
}

export const React: Story = {
  render: () =>
    mountReact(
      createElement('div', null, [
        createElement('p', { key: 'a' }, 'Section précédente'),
        createElement(ReactSeparator, { key: 'sep' }),
        createElement('p', { key: 'b' }, 'Section suivante'),
      ]),
    ),
}

export const Vue: Story = {
  render: () =>
    mountVue({
      render: () =>
        h('div', [h('p', 'Section précédente'), h(VueSeparator), h('p', 'Section suivante')]),
    }),
}
