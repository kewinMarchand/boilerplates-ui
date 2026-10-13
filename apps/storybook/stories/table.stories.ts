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

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta = { title: 'Composants/Tableau' }
export default meta

type Story = StoryObj

type Sort = { key: string; direction: SortDirection } | undefined

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

const sorted = (sort: Sort) =>
  sort
    ? [...ROWS].sort(
        (a, b) =>
          (a[sort.key as keyof (typeof ROWS)[number]] ?? '').localeCompare(
            b[sort.key as keyof (typeof ROWS)[number]] ?? '',
            'fr',
            { numeric: true },
          ) * (sort.direction === 'ascending' ? 1 : -1),
      )
    : ROWS

const nextSort = (sort: Sort, key: string): Sort => ({
  key,
  direction: sort?.key === key && sort.direction === 'ascending' ? 'descending' : 'ascending',
})

const options = (id: string, sort?: Sort): TableOptions => ({
  id,
  caption: 'Stock des produits',
  columns: COLUMNS,
  rows: sorted(sort),
  ...(sort ? { sort } : {}),
})

export const Html: Story = { name: 'HTML et vanilla', render: () => table(options('stock')) }
export const Trie: Story = {
  name: 'Trié par prix décroissant',
  render: () => table(options('stock-trie', { key: 'prix', direction: 'descending' })),
}
export const Etroit: Story = {
  name: 'Défilement horizontal',
  render: () => `<div style="max-width: 320px">${table(options('stock-etroit'))}</div>`,
}

const ReactDemo = () => {
  const [sort, setSort] = useState<Sort>(undefined)
  return createElement(ReactTable, {
    ...options('stock-react', sort),
    sort,
    onSort: (key: string) => setSort((current) => nextSort(current, key)),
  })
}

const VueDemo = defineComponent(() => {
  const sort = ref<Sort>(undefined)
  return () =>
    h(VueTable, {
      ...options('stock-vue', sort.value),
      sort: sort.value,
      onSort: (key: string) => (sort.value = nextSort(sort.value, key)),
    })
})

export const React: Story = { render: () => mountReact(createElement(ReactDemo)) }
export const Vue: Story = { render: () => mountVue(VueDemo) }
