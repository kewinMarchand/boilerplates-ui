import { createElement } from 'react'
import { h } from 'vue'

import { separator } from '@kewinmarchand/css/reference/markup.ts'

import { Separator as ReactSeparator } from '@kewinmarchand/react'
import { Separator as VueSeparator } from '@kewinmarchand/vue'

import { mountReact, mountVue } from './support/frameworks'
import { grid, OVERVIEW } from './support/grid'

import type { Meta, StoryObj } from '@storybook/html-vite'

interface Args {
  orientation: 'horizontal' | 'vertical'
}

const meta: Meta<Args> = {
  title: 'Affichage/Séparateur',
  args: { orientation: 'horizontal' },
  argTypes: { orientation: { control: 'select', options: ['horizontal', 'vertical'] } },
}
export default meta

type Story = StoryObj<Args>

const layout = (orientation: Args['orientation'], html: string) =>
  orientation === 'vertical'
    ? `<div class="sb-stack" style="align-items: stretch"><span>Accueil</span>${html}<span>Catalogue</span></div>`
    : `<p>Section précédente</p>${html}<p>Section suivante</p>`

export const ToutesLesVariantes: Story = {
  name: 'Toutes les variantes',
  parameters: OVERVIEW,
  render: () =>
    grid(
      'Orientations',
      ['Rendu'],
      [
        {
          label: 'Horizontal',
          cells: [`<div style="width: 240px">${layout('horizontal', separator())}</div>`],
        },
        { label: 'Vertical', cells: [layout('vertical', separator({ orientation: 'vertical' }))] },
      ],
    ),
}

export const Html: Story = {
  name: 'HTML',
  render: ({ orientation }) => layout(orientation, separator({ orientation })),
}

const frame = (orientation: Args['orientation'], node: HTMLElement) => {
  const root = document.createElement('div')
  root.innerHTML = layout(orientation, '<span data-slot></span>')
  node.style.display = 'contents'
  root.querySelector('[data-slot]')?.replaceWith(node)
  return root
}

export const React: Story = {
  render: ({ orientation }) =>
    frame(orientation, mountReact(createElement(ReactSeparator, { orientation }))),
}
export const Vue: Story = {
  render: ({ orientation }) =>
    frame(orientation, mountVue({ render: () => h(VueSeparator, { orientation }) })),
}
