import { modal } from '@kewinmarchand/css/reference/markup.ts'
import { Button as ReactButton, Modal as ReactModal } from '@kewinmarchand/react'
import { Button as VueButton, Modal as VueModal } from '@kewinmarchand/vue'
import { createElement, useState } from 'react'
import { defineComponent, h, ref } from 'vue'

import { mountReact, mountVue } from './support/frameworks'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta = { title: 'Composants/Modale' }
export default meta

type Story = StoryObj

const TITLE = 'Supprimer le brouillon ?'
const TEXT = 'Le brouillon sera définitivement supprimé. Cette action est irréversible.'
const TRIGGER = 'Supprimer le brouillon'

const openWithTrigger: Story['play'] = ({ canvasElement }) => {
  canvasElement.querySelector('button')?.click()
}

const html = () =>
  `<button type="button" class="bui-button" data-bui-modal-open="brouillon">${TRIGGER}</button>${modal(
    {
      id: 'brouillon',
      title: TITLE,
      body: `<p>${TEXT}</p>`,
      footer:
        '<button type="button" class="bui-button bui-button--outline" data-bui-modal-close>Annuler</button>' +
        '<button type="button" class="bui-button" data-bui-modal-close>Supprimer</button>',
    },
  )}`

const ReactDemo = () => {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return [
    createElement(ReactButton, { key: 'trigger', onClick: () => setOpen(true) }, TRIGGER),
    createElement(ReactModal, {
      key: 'modal',
      id: 'brouillon-react',
      title: TITLE,
      open,
      onClose: close,
      footer: [
        createElement(
          ReactButton,
          { key: 'annuler', variant: 'outline', onClick: close },
          'Annuler',
        ),
        createElement(ReactButton, { key: 'supprimer', onClick: close }, 'Supprimer'),
      ],
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
      VueModal,
      { id: 'brouillon-vue', title: TITLE, open: open.value, onClose: close },
      {
        default: () => h('p', TEXT),
        footer: () => [
          h(VueButton, { variant: 'outline', onClick: close }, { default: () => 'Annuler' }),
          h(VueButton, { onClick: close }, { default: () => 'Supprimer' }),
        ],
      },
    ),
  ]
})

export const Fermee: Story = { name: 'Fermée (HTML et vanilla)', render: html }
export const Ouverte: Story = {
  name: 'Ouverte (HTML et vanilla)',
  render: html,
  play: openWithTrigger,
}
export const ReactOuverte: Story = {
  name: 'React ouverte',
  render: () => mountReact(createElement(ReactDemo)),
  play: openWithTrigger,
}
export const VueOuverte: Story = {
  name: 'Vue ouverte',
  render: () => mountVue(VueDemo),
  play: openWithTrigger,
}
