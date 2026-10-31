import { createElement } from 'react'

import {
  DIALOG_ARG_TYPES,
  type DialogArgs,
  dialogHtml,
  openWithTrigger,
  ReactDialogDemo,
  vueDialogDemo,
} from './support/dialogs'
import { mountReact, mountSvelte, mountVue } from './support/frameworks'
import { grid, OVERVIEW } from './support/grid'
import DialogDemo from './support/svelte/DialogDemo.svelte'

import type { Meta, StoryObj } from '@storybook/html-vite'

const meta: Meta<DialogArgs> = {
  title: 'Superpositions/Tiroir',
  args: {
    id: 'filtres',
    trigger: 'Ouvrir les filtres',
    title: 'Filtres',
    text: 'Affiner la liste par catégorie, prix et disponibilité.',
    confirm: 'Appliquer',
    closeLabel: 'Fermer',
    side: 'end',
  },
  argTypes: { ...DIALOG_ARG_TYPES, side: { control: 'select', options: ['start', 'end'] } },
}
export default meta

type Story = StoryObj<DialogArgs>

export const ToutesLesVariantes: Story = {
  name: 'Toutes les variantes',
  parameters: OVERVIEW,
  render: (args) =>
    grid(
      'Côtés (ouvrir pour voir le tiroir)',
      ['Déclencheur'],
      [
        { label: 'Côté fin', cells: [dialogHtml('vue-fin', { ...args, side: 'end' }, true)] },
        {
          label: 'Côté début',
          cells: [
            dialogHtml('vue-debut', { ...args, side: 'start', trigger: 'Ouvrir le menu' }, true),
          ],
        },
      ],
    ),
}

export const Ferme: Story = {
  name: 'HTML et vanilla',
  render: (args) => dialogHtml(args.id, args, true),
}
export const Ouvert: Story = {
  render: (args) => dialogHtml(args.id, args, true),
  play: openWithTrigger,
}
export const TitreFocalise: Story = {
  name: 'Titre focalisé',
  args: { focusTitle: true },
  render: (args) => dialogHtml(args.id, args, true),
}
export const TitreFocaliseReact: Story = {
  name: 'Titre focalisé React',
  args: { focusTitle: true },
  render: (args) => mountReact(createElement(ReactDialogDemo, { args, isDrawer: true })),
}
export const TitreFocaliseVue: Story = {
  name: 'Titre focalisé Vue',
  args: { focusTitle: true },
  render: (args) => mountVue(vueDialogDemo(args, true)),
}
export const TitreFocaliseSvelte: Story = {
  name: 'Titre focalisé Svelte',
  args: { focusTitle: true },
  render: (args) => mountSvelte(DialogDemo, { args, isDrawer: true }),
}
export const ReactOuvert: Story = {
  name: 'React ouvert',
  render: (args) => mountReact(createElement(ReactDialogDemo, { args, isDrawer: true })),
  play: openWithTrigger,
}
export const VueOuvert: Story = {
  name: 'Vue ouvert',
  render: (args) => mountVue(vueDialogDemo(args, true)),
  play: openWithTrigger,
}
export const SvelteOuvert: Story = {
  name: 'Svelte ouvert',
  render: (args) => mountSvelte(DialogDemo, { args, isDrawer: true }),
  play: openWithTrigger,
}
