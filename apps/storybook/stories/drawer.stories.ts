import { drawer } from '@kewinmarchand/css/reference/markup.ts'
import { Button as ReactButton, Drawer as ReactDrawer } from '@kewinmarchand/react'
import { Button as VueButton, Drawer as VueDrawer } from '@kewinmarchand/vue'
import { createElement, useState } from 'react'
import { defineComponent, h, ref } from 'vue'

import { mountReact, mountVue } from './support/frameworks'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta = { title: 'Composants/Tiroir' }
export default meta

type Story = StoryObj

const TITLE = 'Filtres'
const TEXT = 'Affiner la liste par catégorie, prix et disponibilité.'
const TRIGGER = 'Ouvrir les filtres'

const openWithTrigger: Story['play'] = ({ canvasElement }) => {
  canvasElement.querySelector('button')?.click()
}

const html = (side: 'start' | 'end') => () =>
  `<button type="button" class="bui-button" data-bui-modal-open="filtres-${side}">${TRIGGER}</button>${drawer(
    {
      id: `filtres-${side}`,
      title: TITLE,
      side,
      body: `<p>${TEXT}</p>`,
      footer: '<button type="button" class="bui-button" data-bui-modal-close>Appliquer</button>',
    },
  )}`

const ReactDemo = () => {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return [
    createElement(ReactButton, { key: 'trigger', onClick: () => setOpen(true) }, TRIGGER),
    createElement(ReactDrawer, {
      key: 'drawer',
      id: 'filtres-react',
      title: TITLE,
      open,
      onClose: close,
      footer: createElement(ReactButton, { onClick: close }, 'Appliquer'),
      children: createElement('p', null, TEXT),
    }),
  ]
}

const VueDemo = defineComponent(() => {
  const open = ref(false)
  const close = () => {
    open.value = false
  }
  return () => [
    h(VueButton, { onClick: () => (open.value = true) }, { default: () => TRIGGER }),
    h(
      VueDrawer,
      { id: 'filtres-vue', title: TITLE, open: open.value, onClose: close },
      {
        default: () => h('p', TEXT),
        footer: () => h(VueButton, { onClick: close }, { default: () => 'Appliquer' }),
      },
    ),
  ]
})

export const Ferme: Story = { name: 'Fermé', render: html('end') }
export const Ouvert: Story = { render: html('end'), play: openWithTrigger }
export const OuvertDebut: Story = {
  name: 'Ouvert côté début',
  render: html('start'),
  play: openWithTrigger,
}
export const ReactOuvert: Story = {
  name: 'React ouvert',
  render: () => mountReact(createElement(ReactDemo)),
  play: openWithTrigger,
}
export const VueOuvert: Story = {
  name: 'Vue ouvert',
  render: () => mountVue(VueDemo),
  play: openWithTrigger,
}
