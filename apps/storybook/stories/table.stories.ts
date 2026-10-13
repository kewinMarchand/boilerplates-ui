import {
  type SortDirection,
  table,
  type TableOptions,
} from '@kewinmarchand/css/reference/markup.ts'
import { Table as ReactTable } from '@kewinmarchand/react'
import { Table as VueTable } from '@kewinmarchand/vue'
import { createElement, useState } from 'react'
import { defineComponent, h, ref } from 'vue'

import { mountReact, mountVue } from './support/frameworks'
import { grid, OVERVIEW } from './support/grid'

import type { Meta, StoryObj } from '@storybook/html-vite'

type Sort = { key: string; direction: SortDirection } | undefined

interface Args {
  caption: string
  sortKey: 'aucun' | 'produit' | 'prix' | 'stock'
  direction: SortDirection
}

const COLUMNS = [
  { key: 'produit', label: 'Produit', sortable: true },
  { key: 'categorie', label: 'Catégorie' },
  { key: 'prix', label: 'Prix', sortable: true },
  { key: 'stock', label: 'Stock', sortable: true },
]

const ROWS = [
  { produit: 'Vélo de ville', categorie: 'Vélos', prix: '349 €', stock: '4' },
  { produit: 'Casque', categorie: 'Équipement', prix: '45 €', stock: '18' },
  { produit: 'Antivol', categorie: 'Accessoires', prix: '29 €', stock: '32' },
]

type Row = (typeof ROWS)[number]

const sorted = (sort: Sort) =>
  sort
    ? [...ROWS].sort(
        (a, b) =>
          (a[sort.key as keyof Row] ?? '').localeCompare(b[sort.key as keyof Row] ?? '', 'fr', {
            numeric: true,
          }) * (sort.direction === 'ascending' ? 1 : -1),
      )
    : ROWS

const nextSort = (sort: Sort, key: string): Sort => ({
  key,
  direction: sort?.key === key && sort.direction === 'ascending' ? 'descending' : 'ascending',
})

const toSort = ({ sortKey, direction }: Args): Sort =>
  sortKey === 'aucun' ? undefined : { key: sortKey, direction }

const options = (id: string, caption: string, sort: Sort): TableOptions => ({
  id,
  caption,
  columns: COLUMNS,
  rows: sorted(sort),
  ...(sort ? { sort } : {}),
})

const meta: Meta<Args> = {
  title: 'Affichage/Tableau',
  args: { caption: 'Stock des produits', sortKey: 'aucun', direction: 'ascending' },
  argTypes: {
    caption: { control: 'text' },
    sortKey: {
      control: 'select',
      options: ['aucun', 'produit', 'prix', 'stock'],
      description: 'Colonne triée au départ',
    },
    direction: { control: 'select', options: ['ascending', 'descending'] },
  },
}
export default meta

type Story = StoryObj<Args>

export const ToutesLesVariantes: Story = {
  name: 'Toutes les variantes',
  parameters: OVERVIEW,
  render: () =>
    grid(
      'États',
      ['Rendu'],
      [
        { label: 'Non trié', cells: [table(options('vue-non-trie', 'Stock', undefined))] },
        {
          label: 'Trié par prix décroissant',
          cells: [table(options('vue-trie', 'Stock', { key: 'prix', direction: 'descending' }))],
        },
        {
          label: 'Défilement horizontal',
          cells: [
            `<div style="max-width: 280px">${table(options('vue-etroit', 'Stock', undefined))}</div>`,
          ],
        },
        {
          label: 'Focus de la zone',
          state: 'focus',
          cells: [table(options('vue-focus', 'Stock', undefined))],
        },
      ],
    ),
}

export const Html: Story = {
  name: 'HTML et vanilla',
  render: (args) => table(options('stock', args.caption, toSort(args))),
}

const ReactDemo = ({ args }: { args: Args }) => {
  const [sort, setSort] = useState<Sort>(toSort(args))
  return createElement(ReactTable, {
    ...options('stock-react', args.caption, sort),
    sort,
    onSort: (key: string) => setSort((current) => nextSort(current, key)),
  })
}

export const React: Story = {
  render: (args) =>
    mountReact(createElement(ReactDemo, { args, key: `${args.sortKey}-${args.direction}` })),
}

export const Vue: Story = {
  render: (args) =>
    mountVue(
      defineComponent(() => {
        const sort = ref<Sort>(toSort(args))
        return () =>
          h(VueTable, {
            ...options('stock-vue', args.caption, sort.value),
            sort: sort.value,
            onSort: (key: string) => (sort.value = nextSort(sort.value, key)),
          })
      }),
    ),
}
