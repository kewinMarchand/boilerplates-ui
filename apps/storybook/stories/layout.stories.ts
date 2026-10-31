import { createElement } from 'react'
import { h } from 'vue'

import { cluster, container, grid, stack } from '@kewinmarchand/css/reference/markup.ts'

import { Cluster as ReactCluster, Stack as ReactStack } from '@kewinmarchand/react'
import { Cluster as VueCluster, Stack as VueStack } from '@kewinmarchand/vue'

import { mountReact, mountSvelte, mountVue } from './support/frameworks'
import LayoutDemo from './support/svelte/LayoutDemo.svelte'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta = { title: 'Fondations/Mise en page' }
export default meta

type Story = StoryObj

const BOX =
  'padding: var(--bui-space-2) var(--bui-space-3); border: 1px dashed var(--bui-color-border); border-radius: var(--bui-radius-md)'
const boxes = (count: number, tag = 'div') =>
  Array.from(
    { length: count },
    (_, index) => `<${tag} style="${BOX}">Bloc ${index + 1}</${tag}>`,
  ).join('')

const section = (title: string, content: string) =>
  `<section style="margin-block-end: var(--bui-space-8)"><h2 class="bui-text bui-text--h4">${title}</h2>${content}</section>`

export const ToutesLesVariantes: Story = {
  name: 'Toutes les variantes',
  render: () =>
    container({
      content: [
        section(
          'Empilement (espacement 4 par défaut, ici 2)',
          stack({ content: boxes(3), gap: '2' }),
        ),
        section('Rangée (passe à la ligne)', cluster({ content: boxes(5) })),
        section('Rangée répartie', cluster({ content: boxes(2), justify: 'between' })),
        section(
          'Grille, colonnes d’au moins 160 px',
          grid({ content: boxes(8, 'li'), as: 'ul', min: 'sm' }),
        ),
        section('Grille, colonnes d’au moins 220 px', grid({ content: boxes(6, 'li'), as: 'ul' })),
        section(
          'Grille, colonnes d’au moins 280 px',
          grid({ content: boxes(4, 'li'), as: 'ul', min: 'lg' }),
        ),
      ].join(''),
    }),
}

const LABELS = ['Bloc 1', 'Bloc 2']

export const React: Story = {
  render: () =>
    mountReact(
      createElement(
        ReactStack,
        { gap: '4' },
        createElement(
          ReactCluster,
          { justify: 'between' },
          LABELS.map((label) =>
            createElement(
              'div',
              { key: label, style: { padding: 8, border: '1px dashed' } },
              label,
            ),
          ),
        ),
        LABELS.map((label) =>
          createElement('div', { key: label, style: { padding: 8, border: '1px dashed' } }, label),
        ),
      ),
    ),
}

export const Vue: Story = {
  render: () =>
    mountVue({
      render: () =>
        h(VueStack, { gap: '4' }, () => [
          h(VueCluster, { justify: 'between' }, () =>
            LABELS.map((label) => h('div', { style: 'padding: 8px; border: 1px dashed' }, label)),
          ),
          ...LABELS.map((label) => h('div', { style: 'padding: 8px; border: 1px dashed' }, label)),
        ]),
    }),
}
export const Svelte: Story = {
  render: () => mountSvelte(LayoutDemo, { labels: LABELS }),
}
