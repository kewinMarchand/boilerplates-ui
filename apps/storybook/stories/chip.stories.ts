import { createElement } from 'react'
import { h } from 'vue'

import { chip, type ChipOptions } from '@kewinmarchand/css/reference/markup.ts'

import { Chip as ReactChip } from '@kewinmarchand/react'
import { Chip as VueChip } from '@kewinmarchand/vue'

import { mountReact, mountVue } from './support/frameworks'
import { defined, grid, OVERVIEW, sections } from './support/grid'

import type { Meta, StoryObj } from '@storybook/html-vite'

type Args = ChipOptions & { onClick?: () => void }

const meta: Meta<Args> = {
  title: 'Actions/Puce',
  args: { label: 'Mi-ombre', href: '#catalogue', current: false, removable: true },
  argTypes: {
    label: { control: 'text' },
    href: {
      control: 'select',
      options: ['aucun', '#catalogue'],
      mapping: { aucun: undefined },
      description: 'Lien vers la page filtrée. Sans lui, un bouton',
    },
    current: { control: 'boolean', description: 'aria-current="page", avec href seulement' },
    removable: { control: 'boolean', description: 'Filtre actif, retiré au clic' },
    onClick: { action: 'click', description: 'React et Vue' },
  },
}
export default meta

type Story = StoryObj<Args>

const list = (label: string, ...chips: string[]) =>
  `<ul class="bui-chip-list" role="list" aria-label="${label}">${chips.map((item) => `<li>${item}</li>`).join('')}</ul>`

export const ToutesLesVariantes: Story = {
  name: 'Toutes les variantes',
  parameters: OVERVIEW,
  render: () =>
    sections(
      grid(
        'Types et états',
        ['Normal', { label: 'Survol', state: 'hover' }, { label: 'Focus', state: 'focus' }],
        [
          { label: 'Sous-catégorie (lien)', options: { label: 'Feuillages', href: '#feuillages' } },
          {
            label: 'Page courante',
            options: { label: 'Fougères', href: '#fougeres', current: true },
          },
          {
            label: 'Filtre retirable (lien)',
            options: { label: 'Mi-ombre', href: '#catalogue', removable: true },
          },
          { label: 'Filtre retirable (bouton)', options: { label: 'En stock', removable: true } },
        ].map(({ label, options }) => ({
          label,
          cells: Array.from({ length: 3 }, () => chip(options)),
        })),
      ),
      grid(
        'Liste de puces',
        ['Rendu'],
        [
          {
            label: 'Filtres actifs',
            cells: [
              list(
                'Filtres actifs',
                chip({ label: 'Mi-ombre', href: '#catalogue', removable: true }),
                chip({ label: 'En stock', href: '#catalogue', removable: true }),
                chip({ label: 'Moins de 30 €', href: '#catalogue', removable: true }),
              ),
            ],
          },
        ],
      ),
    ),
}

export const Html: Story = { name: 'HTML', render: (args) => chip(defined(args)) }

export const React: Story = {
  render: (args) => {
    const { label, href, current, removable, onClick } = defined(args)
    return mountReact(
      href === undefined
        ? createElement(ReactChip, { removable: removable ?? false, onClick }, label)
        : createElement(
            ReactChip,
            {
              href,
              removable: removable ?? false,
              'aria-current': current ? 'page' : undefined,
              onClick,
            },
            label,
          ),
    )
  },
}

export const Vue: Story = {
  render: (args) => {
    const { label, href, current, removable = false, onClick } = defined(args)
    const slots = { default: () => label }
    return mountVue({
      render: () =>
        href === undefined
          ? h(VueChip, { removable, onClick }, slots)
          : h(
              VueChip,
              { href, removable, 'aria-current': current ? 'page' : undefined, onClick },
              slots,
            ),
    })
  },
}
