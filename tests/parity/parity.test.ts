// @vitest-environment jsdom
import * as ref from '@kewinmarchand/css/reference/markup.ts'
import * as R from '@kewinmarchand/react'
import * as V from '@kewinmarchand/vue'
import { createElement as r, type ReactElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { createSSRApp, h, type VNode } from 'vue'
import { renderToString } from 'vue/server-renderer'

/**
 * Forme canonique d'un fragment HTML : commentaires retirés (marqueurs de fragments Vue et React),
 * textes adjacents fusionnés et espaces normalisés, attributs et classes triés.
 * Deux balisages égaux sous cette forme produisent le même DOM pour le CSS et l'accessibilité.
 */
const canonical = (html: string) => {
  const template = document.createElement('template')
  template.innerHTML = html
  const walker = document.createTreeWalker(template.content, NodeFilter.SHOW_COMMENT)
  const comments: Node[] = []
  while (walker.nextNode()) comments.push(walker.currentNode)
  for (const comment of comments) comment.parentNode?.removeChild(comment)
  template.content.normalize()

  const serialize = (node: Node): string => {
    if (node.nodeType === Node.TEXT_NODE)
      return (node.textContent ?? '').replace(/\s+/g, ' ').trim()
    if (!(node instanceof Element)) return ''
    const attrs = [...node.attributes]
      .map(({ name, value }) =>
        name === 'class'
          ? `class="${value.split(/\s+/).filter(Boolean).sort().join(' ')}"`
          : `${name}="${value}"`,
      )
      .sort()
    const children = [...node.childNodes].map(serialize).join('')
    return `<${node.localName}${attrs.map((attr) => ` ${attr}`).join('')}>${children}</${node.localName}>`
  }
  return [...template.content.childNodes].map(serialize).join('')
}

interface Case {
  name: string
  reference: string
  react: ReactElement
  vue: () => VNode
}

const CASES: Case[] = [
  {
    name: 'bouton primaire',
    reference: ref.button({ label: 'Envoyer' }),
    react: r(R.Button, null, 'Envoyer'),
    vue: () => h(V.Button, null, { default: () => 'Envoyer' }),
  },
  {
    name: 'bouton contour petit avec icône',
    reference: ref.button({ label: 'Ajouter', variant: 'outline', size: 'sm', icon: 'plus' }),
    react: r(R.Button, { variant: 'outline', size: 'sm', icon: 'plus' }, 'Ajouter'),
    vue: () =>
      h(V.Button, { variant: 'outline', size: 'sm', icon: 'plus' }, { default: () => 'Ajouter' }),
  },
  {
    name: 'bouton fantôme grand désactivé',
    reference: ref.button({ label: 'Annuler', variant: 'ghost', size: 'lg', disabled: true }),
    react: r(R.Button, { variant: 'ghost', size: 'lg', disabled: true }, 'Annuler'),
    vue: () =>
      h(V.Button, { variant: 'ghost', size: 'lg', disabled: true }, { default: () => 'Annuler' }),
  },
  {
    name: 'bouton en chargement',
    reference: ref.button({ label: 'Envoyer', type: 'submit', loading: true }),
    react: r(R.Button, { type: 'submit', loading: true }, 'Envoyer'),
    vue: () => h(V.Button, { type: 'submit', loading: true }, { default: () => 'Envoyer' }),
  },
  {
    name: 'champ texte simple',
    reference: ref.textField({ id: 'nom', label: 'Nom' }),
    react: r(R.TextField, { id: 'nom', label: 'Nom' }),
    vue: () => h(V.TextField, { id: 'nom', label: 'Nom' }),
  },
  {
    name: 'champ texte requis, aide et erreur',
    reference: ref.textField({
      id: 'email',
      label: 'E-mail',
      type: 'email',
      autocomplete: 'email',
      required: true,
      hint: 'Format : nom@domaine.fr',
      error: 'Saisir une adresse e-mail valide',
    }),
    react: r(R.TextField, {
      id: 'email',
      label: 'E-mail',
      type: 'email',
      autoComplete: 'email',
      required: true,
      hint: 'Format : nom@domaine.fr',
      error: 'Saisir une adresse e-mail valide',
    }),
    vue: () =>
      h(V.TextField, {
        id: 'email',
        label: 'E-mail',
        type: 'email',
        autocomplete: 'email',
        required: true,
        hint: 'Format : nom@domaine.fr',
        error: 'Saisir une adresse e-mail valide',
      }),
  },
  {
    name: 'case à cocher cochée',
    reference: ref.checkbox({ id: 'news', label: 'Recevoir la lettre', checked: true }),
    react: r(R.Checkbox, { id: 'news', label: 'Recevoir la lettre', defaultChecked: true }),
    vue: () => h(V.Checkbox, { id: 'news', label: 'Recevoir la lettre', modelValue: true }),
  },
  {
    name: 'case à cocher requise en erreur, désactivée',
    reference: ref.checkbox({
      id: 'cgu',
      label: 'J’accepte les conditions',
      required: true,
      disabled: true,
      hint: 'Lecture conseillée',
      error: 'Cocher la case pour continuer',
    }),
    react: r(R.Checkbox, {
      id: 'cgu',
      label: 'J’accepte les conditions',
      required: true,
      disabled: true,
      hint: 'Lecture conseillée',
      error: 'Cocher la case pour continuer',
    }),
    vue: () =>
      h(V.Checkbox, {
        id: 'cgu',
        label: 'J’accepte les conditions',
        required: true,
        disabled: true,
        hint: 'Lecture conseillée',
        error: 'Cocher la case pour continuer',
      }),
  },
  ...(['info', 'success', 'warning', 'error'] as const).map((variant) => ({
    name: `alerte ${variant}`,
    reference: ref.alert({ variant, title: 'Titre', body: '<p>Message</p>', role: 'status' }),
    react: r(R.Alert, {
      variant,
      title: 'Titre',
      role: 'status',
      children: r('p', null, 'Message'),
    }),
    vue: () =>
      h(V.Alert, { variant, title: 'Titre', role: 'status' }, { default: () => h('p', 'Message') }),
  })),
  {
    name: 'alerte sans titre',
    reference: ref.alert({ body: 'Message' }),
    react: r(R.Alert, { children: 'Message' }),
    vue: () => h(V.Alert, null, { default: () => 'Message' }),
  },
  {
    name: 'carte complète',
    reference: ref.card({
      title: 'Titre',
      headingLevel: 2,
      body: '<p>Texte</p>',
      media: '<img src="/a.webp" alt="" width="320" height="180" loading="lazy">',
      footer: '<a href="/a">Lire</a>',
    }),
    react: r(R.Card, {
      title: 'Titre',
      headingLevel: 2,
      media: r('img', { src: '/a.webp', alt: '', width: 320, height: 180, loading: 'lazy' }),
      footer: r('a', { href: '/a' }, 'Lire'),
      children: r('p', null, 'Texte'),
    }),
    vue: () =>
      h(
        V.Card,
        { title: 'Titre', headingLevel: 2 },
        {
          default: () => h('p', 'Texte'),
          media: () =>
            h('img', { src: '/a.webp', alt: '', width: 320, height: 180, loading: 'lazy' }),
          footer: () => h('a', { href: '/a' }, 'Lire'),
        },
      ),
  },
  {
    name: 'carte minimale',
    reference: ref.card({ title: 'Titre', body: '<p>Texte</p>' }),
    react: r(R.Card, { title: 'Titre', children: r('p', null, 'Texte') }),
    vue: () => h(V.Card, { title: 'Titre' }, { default: () => h('p', 'Texte') }),
  },
  {
    name: 'modale',
    reference: ref.modal({
      id: 'confirmation',
      title: 'Confirmer',
      body: '<p>Texte</p>',
      footer: '<button type="button">OK</button>',
    }),
    react: r(R.Modal, {
      id: 'confirmation',
      title: 'Confirmer',
      open: false,
      onClose: () => {},
      footer: r('button', { type: 'button' }, 'OK'),
      children: r('p', null, 'Texte'),
    }),
    vue: () =>
      h(
        V.Modal,
        { id: 'confirmation', title: 'Confirmer', open: false },
        { default: () => h('p', 'Texte'), footer: () => h('button', { type: 'button' }, 'OK') },
      ),
  },
]

describe('parité du balisage avec la référence CSS', () => {
  it.each(CASES)('React, $name', ({ reference, react }) => {
    expect(canonical(renderToStaticMarkup(react))).toBe(canonical(reference))
  })

  it.each(CASES)('Vue, $name', async ({ reference, vue }) => {
    expect(canonical(await renderToString(createSSRApp({ render: vue })))).toBe(
      canonical(reference),
    )
  })
})
