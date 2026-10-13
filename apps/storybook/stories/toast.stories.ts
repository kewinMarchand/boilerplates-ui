import { toaster, type ToastOptions } from '@kewinmarchand/css/reference/markup.ts'
import {
  Button as ReactButton,
  Toaster as ReactToaster,
  useToaster as useReactToaster,
} from '@kewinmarchand/react'
import { showToast } from '@kewinmarchand/vanilla'
import {
  Button as VueButton,
  Toaster as VueToaster,
  useToaster as useVueToaster,
} from '@kewinmarchand/vue'
import { createElement } from 'react'
import { defineComponent, h } from 'vue'

import { mountReact, mountVue } from './support/frameworks'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta = { title: 'Composants/Toast' }
export default meta

type Story = StoryObj

const STATIC: ToastOptions[] = [
  { id: 'info', message: 'Une mise à jour est disponible.', variant: 'info' },
  { id: 'succes', message: 'Profil enregistré.', variant: 'success' },
  { id: 'attention', message: 'Connexion instable.', variant: 'warning' },
  { id: 'erreur', message: 'Envoi impossible, réessayer.', variant: 'error' },
]

const SUCCESS = { message: 'Profil enregistré.', variant: 'success' } as const
const ERROR = { message: 'Envoi impossible, réessayer.', variant: 'error' } as const

export const File: Story = { name: 'File, quatre gravités', render: () => toaster(STATIC) }

export const Html: Story = {
  name: 'HTML et vanilla',
  render: () => {
    const root = document.createElement('div')
    root.innerHTML = `<div class="sb-stack"><button type="button" class="bui-button">Enregistrer</button><button type="button" class="bui-button bui-button--outline">Provoquer une erreur</button></div>${toaster()}`
    const toasterElement = root.querySelector<HTMLElement>('[data-bui-toaster]')!
    const [success, error] = root.querySelectorAll('button')
    success?.addEventListener('click', () => showToast(toasterElement, SUCCESS))
    error?.addEventListener('click', () => showToast(toasterElement, ERROR))
    return root
  },
}

const ReactDemo = () => {
  const { toasts, show, close } = useReactToaster()
  return createElement('div', null, [
    createElement('div', { key: 'actions', className: 'sb-stack' }, [
      createElement(ReactButton, { key: 'ok', onClick: () => show(SUCCESS) }, 'Enregistrer'),
      createElement(
        ReactButton,
        { key: 'ko', variant: 'outline', onClick: () => show(ERROR) },
        'Provoquer une erreur',
      ),
    ]),
    createElement(ReactToaster, { key: 'toaster', toasts, onClose: close }),
  ])
}

const VueDemo = defineComponent(() => {
  const { toasts, show, close } = useVueToaster()
  return () =>
    h('div', [
      h('div', { class: 'sb-stack' }, [
        h(VueButton, { onClick: () => show(SUCCESS) }, { default: () => 'Enregistrer' }),
        h(
          VueButton,
          { variant: 'outline', onClick: () => show(ERROR) },
          { default: () => 'Provoquer une erreur' },
        ),
      ]),
      h(VueToaster, { toasts: toasts.value, onClose: close }),
    ])
})

export const React: Story = { render: () => mountReact(createElement(ReactDemo)) }
export const Vue: Story = { render: () => mountVue(VueDemo) }
