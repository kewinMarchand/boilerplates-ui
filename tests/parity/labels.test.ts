import { createElement as r, type ReactElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { type Component } from 'svelte'
import { render as renderSvelte } from 'svelte/server'
import { describe, expect, it } from 'vitest'
import { createSSRApp, h, type VNode } from 'vue'
import { renderToString } from 'vue/server-renderer'

import * as ref from '@kewinmarchand/css/reference/markup.ts'

import * as R from '@kewinmarchand/react'
import * as S from '@kewinmarchand/svelte'
import * as V from '@kewinmarchand/vue'

import Render from './Render.svelte'

/**
 * Libellés d'interface : chaque composant garde son français sans prop, et pose le libellé fourni
 * dans les quatre couches. Les textes sont comparés espaces compris (« Name (required) »), ce que
 * la normalisation du test de parité ne voit pas.
 */

type Labels = Record<string, unknown>

interface Renders {
  reference: string
  react: ReactElement
  vue: () => VNode
  svelte: () => string
}

interface Case {
  name: string
  render: (labels: Labels) => Renders
  /** Libellés passés au composant, et textes ou noms accessibles attendus avec et sans eux. */
  labels: Labels
  fr: Expected
  en: Expected
}

interface Expected {
  texts?: string[]
  ariaLabels?: string[]
}

const s =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- n'importe quel composant de la bibliothèque
  (component: Component<any>, props: Record<string, unknown> = {}, html?: string) =>
    () =>
      renderSvelte(Render, { props: { component, props, html } }).body

const slot = (content: string) => ({ default: () => content })

const HREF = (page: number) => `?page=${page}`
const OPTIONS = [{ value: 'fr', label: 'France' }]
const CRUMBS = [{ label: 'Accueil', href: '/' }, { label: 'Vélo' }]
const TOASTS = [
  { id: 't1', message: 'Saved', variant: 'success' as const },
  { id: 't2', message: 'Failed', variant: 'error' as const },
]
const REQUIRED = { requiredLabel: '(required)' }

const CASES: Case[] = [
  {
    name: 'champ texte obligatoire',
    render: (labels) => {
      const props = { id: 'n', label: 'Name', required: true, ...labels }
      return {
        reference: ref.textField(props),
        react: r(R.TextField, props),
        vue: () => h(V.TextField, props),
        svelte: s(S.TextField, props),
      }
    },
    labels: REQUIRED,
    fr: { texts: ['Name (obligatoire)'] },
    en: { texts: ['Name (required)'] },
  },
  {
    name: 'zone de texte obligatoire',
    render: (labels) => {
      const props = { id: 'm', label: 'Message', required: true, ...labels }
      return {
        reference: ref.textArea(props),
        react: r(R.TextArea, props),
        vue: () => h(V.TextArea, props),
        svelte: s(S.TextArea, props),
      }
    },
    labels: REQUIRED,
    fr: { texts: ['Message (obligatoire)'] },
    en: { texts: ['Message (required)'] },
  },
  {
    name: 'liste déroulante obligatoire',
    render: (labels) => {
      const props = { id: 'p', label: 'Country', options: OPTIONS, required: true, ...labels }
      return {
        reference: ref.select(props),
        react: r(R.Select, props),
        vue: () => h(V.Select, props),
        svelte: s(S.Select, props),
      }
    },
    labels: REQUIRED,
    fr: { texts: ['Country (obligatoire)'] },
    en: { texts: ['Country (required)'] },
  },
  {
    name: 'case obligatoire',
    render: (labels) => {
      const props = { id: 'c', label: 'Accept', required: true, ...labels }
      return {
        reference: ref.checkbox(props),
        react: r(R.Checkbox, props),
        vue: () => h(V.Checkbox, props),
        svelte: s(S.Checkbox, props),
      }
    },
    labels: REQUIRED,
    fr: { texts: ['Accept (obligatoire)'] },
    en: { texts: ['Accept (required)'] },
  },
  {
    name: 'groupe obligatoire',
    render: (labels) => {
      const props = { id: 'f', legend: 'Contact', required: true, ...labels }
      return {
        reference: ref.fieldset({ ...props, body: 'x' }),
        react: r(R.Fieldset, { ...props, children: 'x' }),
        vue: () => h(V.Fieldset, props, slot('x')),
        svelte: s(S.Fieldset, props, 'x'),
      }
    },
    labels: REQUIRED,
    fr: { texts: ['Contact (obligatoire)'] },
    en: { texts: ['Contact (required)'] },
  },
  {
    name: 'boutons radio obligatoires',
    render: (labels) => {
      const props = {
        id: 'g',
        name: 'g',
        legend: 'Delivery',
        options: OPTIONS,
        required: true,
        ...labels,
      }
      return {
        reference: ref.radioGroup(props),
        react: r(R.RadioGroup, props),
        vue: () => h(V.RadioGroup, props),
        svelte: s(S.RadioGroup, props),
      }
    },
    labels: REQUIRED,
    fr: { texts: ['Delivery (obligatoire)'] },
    en: { texts: ['Delivery (required)'] },
  },
  {
    name: 'bouton en chargement',
    render: (labels) => ({
      reference: ref.button({ label: 'Send', loading: true, ...labels }),
      react: r(R.Button, { loading: true, ...labels }, 'Send'),
      vue: () => h(V.Button, { loading: true, ...labels }, slot('Send')),
      svelte: s(S.Button, { loading: true, ...labels }, 'Send'),
    }),
    labels: { loadingLabel: '(loading)' },
    fr: { texts: ['Send (chargement en cours)'] },
    en: { texts: ['Send (loading)'] },
  },
  {
    name: 'lien externe',
    render: (labels) => ({
      reference: ref.link({ href: '/a', label: 'Docs', external: true, ...labels }),
      react: r(R.Link, { href: '/a', external: true, ...labels }, 'Docs'),
      vue: () => h(V.Link, { href: '/a', external: true, ...labels }, slot('Docs')),
      svelte: s(S.Link, { href: '/a', external: true, ...labels }, 'Docs'),
    }),
    labels: { newWindowLabel: '(opens in a new window)' },
    fr: { texts: ['Docs (nouvelle fenêtre)'] },
    en: { texts: ['Docs (opens in a new window)'] },
  },
  ...[undefined, '/filtre'].map((href) => ({
    name: `puce retirable ${href ? 'en lien' : 'en bouton'}`,
    render: (labels: Labels) => {
      const props = { ...(href ? { href } : {}), removable: true, ...labels }
      return {
        reference: ref.chip({ label: 'Shade', ...props }),
        react: r(R.Chip, props, 'Shade'),
        vue: () => h(V.Chip, props, slot('Shade')),
        svelte: s(S.Chip, props, 'Shade'),
      }
    },
    labels: { removeLabel: 'Remove filter:' },
    fr: { texts: ['Retirer le filtre : Shade'] },
    en: { texts: ['Remove filter: Shade'] },
  })),
  {
    name: 'pagination',
    render: (labels) => {
      const props = { page: 2, count: 3, href: HREF, ...labels }
      return {
        reference: ref.pagination(props),
        react: r(R.Pagination, props),
        vue: () => h(V.Pagination, props),
        svelte: s(S.Pagination, props),
      }
    },
    labels: {
      label: 'Pages',
      previousLabel: 'Previous',
      nextLabel: 'Next',
      pageLabel: 'Page number',
    },
    fr: { texts: ['Précédent', 'Page 1', 'Page 2', 'Suivant'], ariaLabels: ['Pagination'] },
    en: {
      texts: ['Previous', 'Page number 1', 'Page number 2', 'Next'],
      ariaLabels: ['Pages'],
    },
  },
  {
    name: 'fil d’Ariane',
    render: (labels) => {
      const props = { items: CRUMBS, ...labels }
      return {
        reference: ref.breadcrumb(props),
        react: r(R.Breadcrumb, props),
        vue: () => h(V.Breadcrumb, props),
        svelte: s(S.Breadcrumb, props),
      }
    },
    labels: { label: 'Breadcrumb' },
    fr: { ariaLabels: ['Fil d’Ariane'] },
    en: { ariaLabels: ['Breadcrumb'] },
  },
  ...(
    [
      ['info', 'Information :', 'Information:'],
      ['success', 'Succès :', 'Success:'],
      ['warning', 'Attention :', 'Warning:'],
      ['error', 'Erreur :', 'Error:'],
    ] as const
  ).map(([variant, fr, en]) => ({
    name: `alerte ${variant}`,
    render: (labels: Labels) => {
      const props = { variant, ...labels }
      return {
        reference: ref.alert({ ...props, body: '<p>Body</p>' }),
        react: r(R.Alert, { ...props, children: r('p', null, 'Body') }),
        vue: () => h(V.Alert, props, { default: () => h('p', 'Body') }),
        svelte: s(S.Alert, props, '<p>Body</p>'),
      }
    },
    labels: { prefix: en },
    fr: { texts: [fr] },
    en: { texts: [en] },
  })),
  {
    name: 'file de toasts',
    render: (labels) => ({
      reference: ref.toaster(TOASTS, labels),
      react: r(R.Toaster, { toasts: TOASTS, onClose: () => {}, ...labels }),
      vue: () => h(V.Toaster, { toasts: TOASTS, ...labels }),
      svelte: s(S.Toaster, { toasts: TOASTS, ...labels }),
    }),
    labels: {
      prefixes: { success: 'Success:', error: 'Error:' },
      closeLabel: 'Close notification',
    },
    fr: {
      texts: ['Succès : Saved', 'Erreur : Failed'],
      ariaLabels: ['Fermer la notification', 'Fermer la notification'],
    },
    en: {
      texts: ['Success: Saved', 'Error: Failed'],
      ariaLabels: ['Close notification', 'Close notification'],
    },
  },
  {
    name: 'file de toasts, préfixe d’une seule variante',
    render: (labels) => ({
      reference: ref.toaster(TOASTS, labels),
      react: r(R.Toaster, { toasts: TOASTS, onClose: () => {}, ...labels }),
      vue: () => h(V.Toaster, { toasts: TOASTS, ...labels }),
      svelte: s(S.Toaster, { toasts: TOASTS, ...labels }),
    }),
    labels: { prefixes: { success: 'Success:' } },
    fr: { texts: ['Succès : Saved', 'Erreur : Failed'] },
    en: { texts: ['Success: Saved', 'Erreur : Failed'] },
  },
]

const withoutComments = (html: string) => html.replace(/<!--[\s\S]*?-->/g, '')
const textOf = (html: string) =>
  withoutComments(html)
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
const ariaLabelsOf = (html: string) =>
  [...withoutComments(html).matchAll(/aria-label="([^"]*)"/g)].map(([, value]) => value ?? '')

const check = (html: string, { texts = [], ariaLabels = [] }: Expected) => {
  for (const text of texts) expect(textOf(html)).toContain(text)
  expect(ariaLabelsOf(html).filter((label) => ariaLabels.includes(label))).toEqual(ariaLabels)
}

const LANGUAGES = [
  { language: 'français par défaut', provided: false },
  { language: 'anglais fourni', provided: true },
] as const

const ROWS = CASES.flatMap((test) =>
  LANGUAGES.map(({ language, provided }) => ({
    ...test,
    language,
    renders: () => test.render(provided ? test.labels : {}),
    expected: provided ? test.en : test.fr,
  })),
)

describe('libellés d’interface', () => {
  it.each(ROWS)('référence, $name, $language', ({ renders, expected }) => {
    check(renders().reference, expected)
  })

  it.each(ROWS)('React, $name, $language', ({ renders, expected }) => {
    check(renderToStaticMarkup(renders().react), expected)
  })

  it.each(ROWS)('Vue, $name, $language', async ({ renders, expected }) => {
    check(await renderToString(createSSRApp({ render: renders().vue })), expected)
  })

  it.each(ROWS)('Svelte, $name, $language', ({ renders, expected }) => {
    check(renders().svelte(), expected)
  })
})
