import { createElement, useState } from 'react'
import { defineComponent, h, ref } from 'vue'

import { drawer, modal } from '@kewinmarchand/css/reference/markup.ts'

import {
  Button as ReactButton,
  Drawer as ReactDrawer,
  Modal as ReactModal,
} from '@kewinmarchand/react'
import { Button as VueButton, Drawer as VueDrawer, Modal as VueModal } from '@kewinmarchand/vue'

/** Démonstrations communes à la modale et au tiroir : un déclencheur, un titre, un texte, deux actions. */
export interface DialogArgs {
  id: string
  trigger: string
  title: string
  text: string
  confirm: string
  closeLabel: string
  side?: 'start' | 'end' | undefined
  onClose?: () => void
}

export const DIALOG_ARG_TYPES = {
  id: { control: 'text', description: 'Identifiant du dialog, préfixe de celui du titre' },
  trigger: { control: 'text', description: 'Libellé du déclencheur' },
  title: { control: 'text' },
  text: { control: 'text' },
  confirm: { control: 'text', description: 'Action principale du pied' },
  closeLabel: { control: 'text', description: 'Nom accessible du bouton de fermeture' },
  onClose: { action: 'close', description: 'React et Vue, à chaque fermeture' },
} as const

export const openWithTrigger = ({ canvasElement }: { canvasElement: HTMLElement }) => {
  canvasElement.querySelector('button')?.click()
}

export const dialogHtml = (id: string, args: DialogArgs, isDrawer: boolean) => {
  const options = {
    id,
    title: args.title,
    closeLabel: args.closeLabel,
    body: `<p>${args.text}</p>`,
    footer: `<button type="button" class="bui-button bui-button--outline" data-bui-modal-close>Annuler</button><button type="button" class="bui-button" data-bui-modal-close>${args.confirm}</button>`,
    ...(args.side ? { side: args.side } : {}),
  }
  return `<button type="button" class="bui-button" data-bui-modal-open="${id}">${args.trigger}</button>${
    isDrawer ? drawer(options) : modal(options)
  }`
}

export const ReactDialogDemo = ({ args, isDrawer }: { args: DialogArgs; isDrawer: boolean }) => {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return [
    createElement(ReactButton, { key: 'trigger', onClick: () => setOpen(true) }, args.trigger),
    createElement(isDrawer ? ReactDrawer : ReactModal, {
      key: 'dialog',
      id: args.id,
      title: args.title,
      closeLabel: args.closeLabel,
      ...(args.side ? { side: args.side } : {}),
      open,
      onClose: () => {
        args.onClose?.()
        close()
      },
      footer: [
        createElement(
          ReactButton,
          { key: 'annuler', variant: 'outline', onClick: close },
          'Annuler',
        ),
        createElement(ReactButton, { key: 'ok', onClick: close }, args.confirm),
      ],
      children: createElement('p', null, args.text),
    }),
  ]
}

export const vueDialogDemo = (args: DialogArgs, isDrawer: boolean) =>
  defineComponent(() => {
    const open = ref(false)
    const close = () => {
      open.value = false
    }
    return () => [
      h(VueButton, { onClick: () => (open.value = true) }, { default: () => args.trigger }),
      h(
        isDrawer ? VueDrawer : VueModal,
        {
          id: args.id,
          title: args.title,
          closeLabel: args.closeLabel,
          ...(args.side ? { side: args.side } : {}),
          open: open.value,
          onClose: () => {
            args.onClose?.()
            close()
          },
        },
        {
          default: () => h('p', args.text),
          footer: () => [
            h(VueButton, { variant: 'outline', onClick: close }, { default: () => 'Annuler' }),
            h(VueButton, { onClick: close }, { default: () => args.confirm }),
          ],
        },
      ),
    ]
  })
