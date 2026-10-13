import { createElement } from 'react'

import {
  DIALOG_ARG_TYPES,
  type DialogArgs,
  dialogHtml,
  openWithTrigger,
  ReactDialogDemo,
  vueDialogDemo,
} from './support/dialogs'
import { mountReact, mountVue } from './support/frameworks'
import { grid, OVERVIEW } from './support/grid'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta<DialogArgs> = {
  title: 'Superpositions/Modale',
  args: {
    trigger: 'Supprimer le brouillon',
    title: 'Supprimer le brouillon ?',
    text: 'Le brouillon sera définitivement supprimé. Cette action est irréversible.',
    confirm: 'Supprimer',
    closeLabel: 'Fermer',
    side: 'end',
  },
  argTypes: { ...DIALOG_ARG_TYPES, side: { table: { disable: true } } },
}
export default meta

type Story = StoryObj<DialogArgs>

export const ToutesLesVariantes: Story = {
  name: 'Toutes les variantes',
  parameters: OVERVIEW,
  render: (args) =>
    grid(
      'Contenus (ouvrir pour voir la modale)',
      ['Déclencheur'],
      [
        { label: 'Confirmation', cells: [dialogHtml('vue-confirmation', args, false)] },
        {
          label: 'Information',
          cells: [
            dialogHtml(
              'vue-information',
              {
                ...args,
                trigger: 'Voir les conditions',
                title: 'Conditions',
                text: 'Livraison offerte dès 50 €.',
                confirm: 'Compris',
              },
              false,
            ),
          ],
        },
      ],
    ),
}

export const Fermee: Story = {
  name: 'HTML et vanilla',
  render: (args) => dialogHtml('brouillon', args, false),
}
export const Ouverte: Story = {
  name: 'Ouverte (HTML et vanilla)',
  render: (args) => dialogHtml('brouillon', args, false),
  play: openWithTrigger,
}
export const ReactOuverte: Story = {
  name: 'React ouverte',
  render: (args) => mountReact(createElement(ReactDialogDemo, { args, isDrawer: false })),
  play: openWithTrigger,
}
export const VueOuverte: Story = {
  name: 'Vue ouverte',
  render: (args) => mountVue(vueDialogDemo(args, false)),
  play: openWithTrigger,
}
