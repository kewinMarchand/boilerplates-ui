import { menu } from '@kewinmarchand/css/reference/markup.ts'
import { Menu as ReactMenu } from '@kewinmarchand/react'
import { Menu as VueMenu } from '@kewinmarchand/vue'
import { createElement } from 'react'
import { h } from 'vue'

import { mountReact, mountVue } from './support/frameworks'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta = { title: 'Composants/Menu déroulant' }
export default meta

type Story = StoryObj

const ITEMS = [
  { id: 'modifier', label: 'Modifier' },
  { id: 'dupliquer', label: 'Dupliquer' },
  { id: 'archiver', label: 'Archiver' },
]

const SPACE = (element: HTMLElement | string) => {
  const root = document.createElement('div')
  root.style.minHeight = '220px'
  if (typeof element === 'string') root.innerHTML = element
  else root.append(element)
  return root
}

const openMenu: Story['play'] = ({ canvasElement }) => {
  canvasElement.querySelector<HTMLButtonElement>('.bui-menu__trigger')?.click()
}

export const Html: Story = {
  name: 'HTML et vanilla',
  render: () => SPACE(menu({ id: 'actions', label: 'Actions', items: ITEMS })),
}
export const Ouvert: Story = {
  render: () => SPACE(menu({ id: 'actions-ouvert', label: 'Actions', items: ITEMS })),
  play: openMenu,
}

export const React: Story = {
  render: () =>
    SPACE(
      mountReact(
        createElement(ReactMenu, {
          id: 'actions-react',
          label: 'Actions',
          items: ITEMS,
          onSelect: () => {},
        }),
      ),
    ),
}

export const Vue: Story = {
  render: () =>
    SPACE(
      mountVue({ render: () => h(VueMenu, { id: 'actions-vue', label: 'Actions', items: ITEMS }) }),
    ),
}
