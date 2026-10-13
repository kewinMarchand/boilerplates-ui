import { menu } from '@kewinmarchand/css/reference/markup.ts'
import { Menu as ReactMenu } from '@kewinmarchand/react'
import { Menu as VueMenu } from '@kewinmarchand/vue'
import { createElement } from 'react'
import { h } from 'vue'

import { mountReact, mountVue } from './support/frameworks'
import { grid, OVERVIEW } from './support/grid'

import type { Meta, StoryObj } from '@storybook/html-vite'

interface Args {
  label: string
  items: string
}

const toItems = (items: string) =>
  items
    .split(',')
    .map((label) => label.trim())
    .filter(Boolean)
    .map((label, index) => ({ id: `item-${index}`, label }))

const meta: Meta<Args> = {
  title: 'Superpositions/Menu déroulant',
  args: { label: 'Actions', items: 'Modifier, Dupliquer, Archiver' },
  argTypes: {
    label: { control: 'text' },
    items: { control: 'text', description: 'Éléments séparés par des virgules' },
  },
}
export default meta

type Story = StoryObj<Args>

const space = (content: string | HTMLElement) => {
  const root = document.createElement('div')
  root.style.minHeight = '220px'
  if (typeof content === 'string') root.innerHTML = content
  else root.append(content)
  return root
}

export const ToutesLesVariantes: Story = {
  name: 'Toutes les variantes',
  parameters: OVERVIEW,
  render: (args) =>
    grid(
      'États',
      ['Rendu'],
      [
        {
          label: 'Fermé',
          cells: [menu({ id: 'vue-ferme', label: args.label, items: toItems(args.items) })],
        },
        {
          label: 'Focus',
          state: 'focus',
          cells: [menu({ id: 'vue-focus', label: args.label, items: toItems(args.items) })],
        },
        {
          label: 'Ouvert',
          cells: [
            `<div style="min-height: 180px">${menu({ id: 'vue-ouvert', label: args.label, items: toItems(args.items), open: true })}</div>`,
          ],
        },
      ],
    ),
}

export const Html: Story = {
  name: 'HTML et vanilla',
  render: (args) => space(menu({ id: 'actions', label: args.label, items: toItems(args.items) })),
}
export const Ouvert: Story = {
  render: (args) =>
    space(menu({ id: 'actions-ouvert', label: args.label, items: toItems(args.items) })),
  play: ({ canvasElement }) =>
    canvasElement.querySelector<HTMLButtonElement>('.bui-menu__trigger')?.click(),
}
export const React: Story = {
  render: (args) =>
    space(
      mountReact(
        createElement(ReactMenu, {
          id: 'actions-react',
          label: args.label,
          items: toItems(args.items),
          onSelect: () => {},
        }),
      ),
    ),
}
export const Vue: Story = {
  render: (args) =>
    space(
      mountVue({
        render: () =>
          h(VueMenu, { id: 'actions-vue', label: args.label, items: toItems(args.items) }),
      }),
    ),
}
