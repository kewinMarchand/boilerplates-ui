import { createElement } from 'react'
import { defineComponent, h } from 'vue'

import { TOAST_VARIANTS, toaster, type ToastOptions } from '@kewinmarchand/css/reference/markup.ts'
import { showToast } from '@kewinmarchand/vanilla'

import {
  Button as ReactButton,
  Toaster as ReactToaster,
  useToaster as useReactToaster,
} from '@kewinmarchand/react'
import {
  Button as VueButton,
  Toaster as VueToaster,
  useToaster as useVueToaster,
} from '@kewinmarchand/vue'

import { mountReact, mountVue } from './support/frameworks'
import { grid, OVERVIEW } from './support/grid'

import type { Meta, StoryObj } from '@storybook/html-vite'

interface Args {
  message: string
  variant: NonNullable<ToastOptions['variant']>
}

const meta: Meta<Args> = {
  title: 'Retours/Toast',
  args: { message: 'Profil enregistré.', variant: 'success' },
  argTypes: {
    message: { control: 'text' },
    variant: {
      control: 'select',
      options: Object.keys(TOAST_VARIANTS),
      description: 'status pour info et succès, alert sinon',
    },
  },
}
export default meta

type Story = StoryObj<Args>

const ERROR = { message: 'Envoi impossible, réessayer.', variant: 'error' } as const
const LABELS = {
  info: 'Information',
  success: 'Succès',
  warning: 'Avertissement',
  error: 'Erreur',
} as const

export const ToutesLesVariantes: Story = {
  name: 'Toutes les variantes',
  parameters: OVERVIEW,
  render: () =>
    grid(
      'Gravités (rôle annoncé)',
      ['Rendu'],
      Object.entries(LABELS).map(([variant, label]) => ({
        label: `${label} (${TOAST_VARIANTS[variant as 'info'].role})`,
        cells: [
          toaster([
            {
              id: `toast-${variant}`,
              message: 'Message court et explicite.',
              variant: variant as 'info',
            },
          ]),
        ],
      })),
    ),
}

export const Html: Story = {
  name: 'HTML et vanilla',
  render: (args) => {
    const root = document.createElement('div')
    root.innerHTML = `<div class="sb-stack"><button type="button" class="bui-button">Enregistrer</button><button type="button" class="bui-button bui-button--outline">Provoquer une erreur</button></div>${toaster()}`
    const toasterElement = root.querySelector<HTMLElement>('[data-bui-toaster]')!
    const [show, error] = root.querySelectorAll('button')
    show?.addEventListener('click', () => showToast(toasterElement, args))
    error?.addEventListener('click', () => showToast(toasterElement, ERROR))
    return root
  },
}

const ReactDemo = ({ args }: { args: Args }) => {
  const { toasts, show, close } = useReactToaster()
  return createElement('div', null, [
    createElement('div', { key: 'actions', className: 'sb-stack' }, [
      createElement(ReactButton, { key: 'ok', onClick: () => show(args) }, 'Enregistrer'),
      createElement(
        ReactButton,
        { key: 'ko', variant: 'outline', onClick: () => show(ERROR) },
        'Provoquer une erreur',
      ),
    ]),
    createElement(ReactToaster, { key: 'toaster', toasts, onClose: close }),
  ])
}

export const React: Story = { render: (args) => mountReact(createElement(ReactDemo, { args })) }

export const Vue: Story = {
  render: (args) =>
    mountVue(
      defineComponent(() => {
        const { toasts, show, close } = useVueToaster()
        return () =>
          h('div', [
            h('div', { class: 'sb-stack' }, [
              h(VueButton, { onClick: () => show(args) }, { default: () => 'Enregistrer' }),
              h(
                VueButton,
                { variant: 'outline', onClick: () => show(ERROR) },
                { default: () => 'Provoquer une erreur' },
              ),
            ]),
            h(VueToaster, { toasts: toasts.value, onClose: close }),
          ])
      }),
    ),
}
