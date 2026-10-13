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
          : name === 'style' && node instanceof HTMLElement
            ? `style="${node.style.cssText}"`
            : `${name}="${value}"`,
      )
      .sort()
    const children = [...node.childNodes].map(serialize).join('')
    return `<${node.localName}${attrs.map((attr) => ` ${attr}`).join('')}>${children}</${node.localName}>`
  }
  return [...template.content.childNodes].map(serialize).join('')
}

const OPTIONS = [
  { value: 'fr', label: 'France' },
  { value: 'be', label: 'Belgique' },
]

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
  {
    name: 'bouton icône',
    reference: ref.iconButton({ label: 'Supprimer', icon: 'trash', variant: 'ghost', size: 'sm' }),
    react: r(R.IconButton, { label: 'Supprimer', icon: 'trash', variant: 'ghost', size: 'sm' }),
    vue: () => h(V.IconButton, { label: 'Supprimer', icon: 'trash', variant: 'ghost', size: 'sm' }),
  },
  {
    name: 'bouton icône désactivé',
    reference: ref.iconButton({ label: 'Modifier', icon: 'pencil', disabled: true }),
    react: r(R.IconButton, { label: 'Modifier', icon: 'pencil', disabled: true }),
    vue: () => h(V.IconButton, { label: 'Modifier', icon: 'pencil', disabled: true }),
  },
  {
    name: 'lien',
    reference: ref.link({ href: '/contact', label: 'Contact' }),
    react: r(R.Link, { href: '/contact', children: 'Contact' }),
    vue: () => h(V.Link, { href: '/contact' }, { default: () => 'Contact' }),
  },
  {
    name: 'lien externe',
    reference: ref.link({ href: 'https://example.org', label: 'Documentation', external: true }),
    react: r(R.Link, { href: 'https://example.org', external: true, children: 'Documentation' }),
    vue: () =>
      h(
        V.Link,
        { href: 'https://example.org', external: true },
        { default: () => 'Documentation' },
      ),
  },
  {
    name: 'zone de texte en erreur',
    reference: ref.textArea({
      id: 'msg',
      label: 'Message',
      hint: 'Aide',
      error: 'Trop court',
      required: true,
      rows: 6,
    }),
    react: r(R.TextArea, {
      id: 'msg',
      label: 'Message',
      hint: 'Aide',
      error: 'Trop court',
      required: true,
      rows: 6,
    }),
    vue: () =>
      h(V.TextArea, {
        id: 'msg',
        label: 'Message',
        hint: 'Aide',
        error: 'Trop court',
        required: true,
        rows: 6,
      }),
  },
  {
    name: 'zone de texte désactivée',
    reference: ref.textArea({ id: 'note', label: 'Note', disabled: true }),
    react: r(R.TextArea, { id: 'note', label: 'Note', disabled: true }),
    vue: () => h(V.TextArea, { id: 'note', label: 'Note', disabled: true }),
  },
  {
    name: 'liste déroulante',
    reference: ref.select({
      id: 'pays',
      label: 'Pays',
      placeholder: 'Choisir',
      options: OPTIONS,
      hint: 'Aide',
      error: 'Requis',
      required: true,
    }),
    react: r(R.Select, {
      id: 'pays',
      label: 'Pays',
      placeholder: 'Choisir',
      options: OPTIONS,
      hint: 'Aide',
      error: 'Requis',
      required: true,
    }),
    vue: () =>
      h(V.Select, {
        id: 'pays',
        label: 'Pays',
        placeholder: 'Choisir',
        options: OPTIONS,
        hint: 'Aide',
        error: 'Requis',
        required: true,
      }),
  },
  {
    name: 'bouton radio seul',
    reference: ref.radio({ id: 'r1', name: 'r', value: 'a', label: 'A', disabled: true }),
    react: r(R.Radio, { id: 'r1', name: 'r', value: 'a', label: 'A', disabled: true }),
    vue: () => h(V.Radio, { id: 'r1', name: 'r', value: 'a', label: 'A', disabled: true }),
  },
  {
    name: 'groupe de boutons radio',
    reference: ref.radioGroup({
      id: 'livraison',
      name: 'livraison',
      legend: 'Livraison',
      options: OPTIONS,
      value: 'be',
      hint: 'Aide',
      error: 'Choisir',
      required: true,
    }),
    react: r(R.RadioGroup, {
      id: 'livraison',
      name: 'livraison',
      legend: 'Livraison',
      options: OPTIONS,
      defaultValue: 'be',
      hint: 'Aide',
      error: 'Choisir',
      required: true,
    }),
    vue: () =>
      h(V.RadioGroup, {
        id: 'livraison',
        name: 'livraison',
        legend: 'Livraison',
        options: OPTIONS,
        modelValue: 'be',
        hint: 'Aide',
        error: 'Choisir',
        required: true,
      }),
  },
  {
    name: 'groupe de champs',
    reference: ref.fieldset({ id: 'contact', legend: 'Contact', body: '<p>Contenu</p>' }),
    react: r(R.Fieldset, { id: 'contact', legend: 'Contact', children: r('p', null, 'Contenu') }),
    vue: () =>
      h(V.Fieldset, { id: 'contact', legend: 'Contact' }, { default: () => h('p', 'Contenu') }),
  },
  {
    name: 'interrupteur activé',
    reference: ref.switchControl({ id: 'notif', label: 'Notifications', checked: true }),
    react: r(R.Switch, { id: 'notif', label: 'Notifications', defaultChecked: true }),
    vue: () => h(V.Switch, { id: 'notif', label: 'Notifications', modelValue: true }),
  },
  {
    name: 'interrupteur désactivé',
    reference: ref.switchControl({ id: 'off', label: 'Mode avion', disabled: true }),
    react: r(R.Switch, { id: 'off', label: 'Mode avion', disabled: true }),
    vue: () => h(V.Switch, { id: 'off', label: 'Mode avion', disabled: true }),
  },
  ...(['neutral', 'info', 'success', 'warning', 'error'] as const).map((variant) => ({
    name: `badge ${variant}`,
    reference: ref.badge({ label: 'Nouveau', variant }),
    react: r(R.Badge, { variant, children: 'Nouveau' }),
    vue: () => h(V.Badge, { variant }, { default: () => 'Nouveau' }),
  })),
  ...(['horizontal', 'vertical'] as const).map((orientation) => ({
    name: `séparateur ${orientation}`,
    reference: ref.separator({ orientation }),
    react: r(R.Separator, { orientation }),
    vue: () => h(V.Separator, { orientation }),
  })),
  {
    name: 'indicateur de chargement',
    reference: ref.spinner({ size: 'lg', label: 'Envoi en cours' }),
    react: r(R.Spinner, { size: 'lg', label: 'Envoi en cours' }),
    vue: () => h(V.Spinner, { size: 'lg', label: 'Envoi en cours' }),
  },
  {
    name: 'squelette texte',
    reference: ref.skeleton({ variant: 'text', width: '60%' }),
    react: r(R.Skeleton, { variant: 'text', width: '60%' }),
    vue: () => h(V.Skeleton, { variant: 'text', width: '60%' }),
  },
  {
    name: 'squelette cercle',
    reference: ref.skeleton({ variant: 'circle' }),
    react: r(R.Skeleton, { variant: 'circle' }),
    vue: () => h(V.Skeleton, { variant: 'circle' }),
  },
  {
    name: 'avatar initiales',
    reference: ref.avatar({ name: 'Kewin Marchand', size: 'lg' }),
    react: r(R.Avatar, { name: 'Kewin Marchand', size: 'lg' }),
    vue: () => h(V.Avatar, { name: 'Kewin Marchand', size: 'lg' }),
  },
  {
    name: 'avatar image décoratif',
    reference: ref.avatar({ name: 'Kewin Marchand', src: '/a.webp', decorative: true }),
    react: r(R.Avatar, { name: 'Kewin Marchand', src: '/a.webp', decorative: true }),
    vue: () => h(V.Avatar, { name: 'Kewin Marchand', src: '/a.webp', decorative: true }),
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
