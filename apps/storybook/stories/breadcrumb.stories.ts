import { breadcrumb } from '@kewinmarchand/css/reference/markup.ts'
import { Breadcrumb as ReactBreadcrumb } from '@kewinmarchand/react'
import { Breadcrumb as VueBreadcrumb } from '@kewinmarchand/vue'
import { createElement } from 'react'
import { h } from 'vue'

import { mountReact, mountVue } from './support/frameworks'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta = { title: 'Composants/Fil d’Ariane' }
export default meta

type Story = StoryObj

const ITEMS = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Catalogue', href: '#catalogue' },
  { label: 'Vélos', href: '#velos' },
  { label: 'Vélo de ville' },
]

export const Html: Story = { name: 'HTML', render: () => breadcrumb({ items: ITEMS }) }
export const Focus: Story = {
  render: () => breadcrumb({ items: ITEMS }),
  parameters: { pseudo: { focusVisible: true } },
}
export const React: Story = {
  render: () => mountReact(createElement(ReactBreadcrumb, { items: ITEMS })),
}
export const Vue: Story = {
  render: () => mountVue({ render: () => h(VueBreadcrumb, { items: ITEMS }) }),
}
