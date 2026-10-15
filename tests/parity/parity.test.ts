// @vitest-environment jsdom
import { createElement as r, Fragment, type ReactElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { createSSRApp, Fragment as VueFragment, h, type VNode } from 'vue'
import { renderToString } from 'vue/server-renderer'

import * as ref from '@kewinmarchand/css/reference/markup.ts'

import * as R from '@kewinmarchand/react'
import * as V from '@kewinmarchand/vue'

/**
 * Forme canonique d'un fragment HTML : attributs `data-bui-*` (branchements du JS vanilla, absents
 * de React et Vue pour ne pas mêler deux comportements) et commentaires retirés (marqueurs de fragments Vue et React),
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
      .filter(({ name }) => !name.startsWith('data-bui-'))
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

const TOASTS = [
  { id: 't1', message: 'Enregistré', variant: 'success' as const },
  { id: 't2', message: 'Échec de l’envoi', variant: 'error' as const },
]
const MENU = [
  { id: 'modifier', label: 'Modifier' },
  { id: 'supprimer', label: 'Supprimer' },
]
const CRUMBS = [
  { label: 'Accueil', href: '/' },
  { label: 'Catalogue', href: '/catalogue' },
  { label: 'Vélo' },
]
const HREF = (page: number) => `?page=${page}`
const TABLE = {
  id: 'produits',
  caption: 'Produits',
  columns: [
    { key: 'nom', label: 'Nom', sortable: true },
    { key: 'prix', label: 'Prix', sortable: true },
    { key: 'stock', label: 'Stock' },
  ],
  rows: [
    { nom: 'Vélo', prix: '300 €', stock: '4' },
    { nom: 'Casque', prix: '40 €', stock: '12' },
  ],
  sort: { key: 'prix', direction: 'descending' as const },
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
    name: 'bouton secondaire',
    reference: ref.button({ label: 'En savoir plus', variant: 'secondary' }),
    react: r(R.Button, { variant: 'secondary' }, 'En savoir plus'),
    vue: () => h(V.Button, { variant: 'secondary' }, { default: () => 'En savoir plus' }),
  },
  {
    name: 'bouton inverse, icône après le libellé',
    reference: ref.button({
      label: 'Suivant',
      variant: 'inverse',
      icon: 'chevron-right',
      iconPosition: 'end',
    }),
    react: r(
      R.Button,
      { variant: 'inverse', icon: 'chevron-right', iconPosition: 'end' },
      'Suivant',
    ),
    vue: () =>
      h(
        V.Button,
        { variant: 'inverse', icon: 'chevron-right', iconPosition: 'end' },
        { default: () => 'Suivant' },
      ),
  },
  {
    name: 'bouton lien',
    reference: ref.button({
      label: 'Voir le catalogue',
      href: '/catalogue',
      icon: 'chevron-right',
      iconPosition: 'end',
    }),
    react: r(
      R.Button,
      { href: '/catalogue', icon: 'chevron-right', iconPosition: 'end' },
      'Voir le catalogue',
    ),
    vue: () =>
      h(
        V.Button,
        { href: '/catalogue', icon: 'chevron-right', iconPosition: 'end' },
        { default: () => 'Voir le catalogue' },
      ),
  },
  {
    name: 'bouton lien désactivé',
    reference: ref.button({
      label: 'Voir',
      href: '/catalogue',
      variant: 'outline',
      disabled: true,
    }),
    react: r(R.Button, { href: '/catalogue', variant: 'outline', disabled: true }, 'Voir'),
    vue: () =>
      h(
        V.Button,
        { href: '/catalogue', variant: 'outline', disabled: true },
        { default: () => 'Voir' },
      ),
  },
  {
    name: 'bouton de navigation, page courante',
    reference: ref.button({
      label: 'Catalogue',
      variant: 'nav',
      href: '/catalogue',
      current: true,
    }),
    react: r(R.Button, { variant: 'nav', href: '/catalogue', 'aria-current': 'page' }, 'Catalogue'),
    vue: () =>
      h(
        V.Button,
        { variant: 'nav', href: '/catalogue', 'aria-current': 'page' },
        { default: () => 'Catalogue' },
      ),
  },
  {
    name: 'boutons clairs sur photo',
    reference:
      ref.button({ label: 'Mes tâches', variant: 'light', href: '/taches' }) +
      ref.button({ label: 'Contact', variant: 'outline-light', href: '/contact' }),
    react: r(
      Fragment,
      null,
      r(R.Button, { variant: 'light', href: '/taches' }, 'Mes tâches'),
      r(R.Button, { variant: 'outline-light', href: '/contact' }, 'Contact'),
    ),
    vue: () =>
      h(VueFragment, [
        h(V.Button, { variant: 'light', href: '/taches' }, { default: () => 'Mes tâches' }),
        h(V.Button, { variant: 'outline-light', href: '/contact' }, { default: () => 'Contact' }),
      ]),
  },
  {
    name: 'bouton icône de navigation',
    reference: ref.iconButton({ label: 'Menu', icon: 'menu', variant: 'nav' }),
    react: r(R.IconButton, { label: 'Menu', icon: 'menu', variant: 'nav' }),
    vue: () => h(V.IconButton, { label: 'Menu', icon: 'menu', variant: 'nav' }),
  },
  {
    name: 'bouton-lien',
    reference: ref.linkButton({ label: 'Tout effacer' }),
    react: r(R.LinkButton, null, 'Tout effacer'),
    vue: () => h(V.LinkButton, null, { default: () => 'Tout effacer' }),
  },
  {
    name: 'puces de sous-catégorie, page courante',
    reference:
      ref.chip({ label: 'Feuillages', href: '/catalogue/feuillages' }) +
      ref.chip({ label: 'Fougères', href: '/catalogue/fougeres', current: true }),
    react: r(
      Fragment,
      null,
      r(R.Chip, { href: '/catalogue/feuillages' }, 'Feuillages'),
      r(R.Chip, { href: '/catalogue/fougeres', 'aria-current': 'page' }, 'Fougères'),
    ),
    vue: () =>
      h(VueFragment, [
        h(V.Chip, { href: '/catalogue/feuillages' }, { default: () => 'Feuillages' }),
        h(
          V.Chip,
          { href: '/catalogue/fougeres', 'aria-current': 'page' },
          { default: () => 'Fougères' },
        ),
      ]),
  },
  {
    name: 'puces de filtre retirables, lien et bouton',
    reference:
      ref.chip({ label: 'Mi-ombre', href: '/catalogue', removable: true }) +
      ref.chip({ label: 'En stock', removable: true }),
    react: r(
      Fragment,
      null,
      r(R.Chip, { href: '/catalogue', removable: true }, 'Mi-ombre'),
      r(R.Chip, { removable: true }, 'En stock'),
    ),
    vue: () =>
      h(VueFragment, [
        h(V.Chip, { href: '/catalogue', removable: true }, { default: () => 'Mi-ombre' }),
        h(V.Chip, { removable: true }, { default: () => 'En stock' }),
      ]),
  },
  {
    name: 'icône porteuse de sens, taille fixe',
    reference: ref.icon('circle-check', undefined, { label: 'Validé', size: 'lg' }),
    react: r(R.Icon, { name: 'circle-check', label: 'Validé', size: 'lg' }),
    vue: () => h(V.Icon, { name: 'circle-check', label: 'Validé', size: 'lg' }),
  },
  {
    name: 'alerte avec action',
    reference: ref.alert({
      variant: 'error',
      body: 'Envoi impossible.',
      action:
        '<button type="button" class="bui-button bui-button--outline bui-button--sm">Réessayer</button>',
    }),
    react: r(R.Alert, {
      variant: 'error',
      action: r(R.Button, { variant: 'outline', size: 'sm' }, 'Réessayer'),
      children: 'Envoi impossible.',
    }),
    vue: () =>
      h(
        V.Alert,
        { variant: 'error' },
        {
          default: () => 'Envoi impossible.',
          action: () =>
            h(V.Button, { variant: 'outline', size: 'sm' }, { default: () => 'Réessayer' }),
        },
      ),
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
    name: 'bouton icône secondaire',
    reference: ref.iconButton({ label: 'Partager', icon: 'share-2', variant: 'secondary' }),
    react: r(R.IconButton, { label: 'Partager', icon: 'share-2', variant: 'secondary' }),
    vue: () => h(V.IconButton, { label: 'Partager', icon: 'share-2', variant: 'secondary' }),
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
  ...(
    ['h1', 'h2', 'h3', 'h4', 'title', 'lead', 'body', 'body-sm', 'caption', 'overline'] as const
  ).map((variant) => ({
    name: `texte ${variant}`,
    reference: ref.text({ text: 'Vélo', variant }),
    react: r(R.Text, { variant, children: 'Vélo' }),
    vue: () => h(V.Text, { variant }, { default: () => 'Vélo' }),
  })),
  {
    name: 'texte titre 2 rendu en titre 3',
    reference: ref.text({ text: 'Vélo', variant: 'h2', as: 'h3' }),
    react: r(R.Text, { variant: 'h2', as: 'h3', children: 'Vélo' }),
    vue: () => h(V.Text, { variant: 'h2', as: 'h3' }, { default: () => 'Vélo' }),
  },
  ...(['neutral', 'secondary', 'info', 'success', 'warning', 'error'] as const).map((variant) => ({
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
    name: 'avatar initiales secondaire',
    reference: ref.avatar({ name: 'Kewin Marchand', variant: 'secondary' }),
    react: r(R.Avatar, { name: 'Kewin Marchand', variant: 'secondary' }),
    vue: () => h(V.Avatar, { name: 'Kewin Marchand', variant: 'secondary' }),
  },
  {
    name: 'avatar image secondaire',
    reference: ref.avatar({ name: 'Kewin Marchand', src: '/a.webp', variant: 'secondary' }),
    react: r(R.Avatar, { name: 'Kewin Marchand', src: '/a.webp', variant: 'secondary' }),
    vue: () => h(V.Avatar, { name: 'Kewin Marchand', src: '/a.webp', variant: 'secondary' }),
  },
  {
    name: 'avatar image décoratif',
    reference: ref.avatar({ name: 'Kewin Marchand', src: '/a.webp', decorative: true }),
    react: r(R.Avatar, { name: 'Kewin Marchand', src: '/a.webp', decorative: true }),
    vue: () => h(V.Avatar, { name: 'Kewin Marchand', src: '/a.webp', decorative: true }),
  },
  {
    name: 'tiroir',
    reference: ref.drawer({ id: 'filtres', title: 'Filtres', body: '<p>Texte</p>', side: 'start' }),
    react: r(R.Drawer, {
      id: 'filtres',
      title: 'Filtres',
      open: false,
      onClose: () => {},
      side: 'start',
      children: r('p', null, 'Texte'),
    }),
    vue: () =>
      h(
        V.Drawer,
        { id: 'filtres', title: 'Filtres', open: false, side: 'start' },
        { default: () => h('p', 'Texte') },
      ),
  },
  {
    name: 'file de toasts',
    reference: ref.toaster(TOASTS),
    react: r(R.Toaster, { toasts: TOASTS, onClose: () => {} }),
    vue: () => h(V.Toaster, { toasts: TOASTS }),
  },
  {
    name: 'onglets',
    reference: ref.tabs({
      id: 'fiche',
      label: 'Fiche',
      selected: 'b',
      tabs: [
        { id: 'a', label: 'A', body: '<p>Un</p>' },
        { id: 'b', label: 'B', body: '<p>Deux</p>' },
      ],
    }),
    react: r(R.Tabs, {
      id: 'fiche',
      label: 'Fiche',
      defaultTab: 'b',
      tabs: [
        { id: 'a', label: 'A', content: r('p', null, 'Un') },
        { id: 'b', label: 'B', content: r('p', null, 'Deux') },
      ],
    }),
    vue: () =>
      h(
        V.Tabs,
        {
          id: 'fiche',
          label: 'Fiche',
          defaultTab: 'b',
          tabs: [
            { id: 'a', label: 'A' },
            { id: 'b', label: 'B' },
          ],
        },
        { a: () => h('p', 'Un'), b: () => h('p', 'Deux') },
      ),
  },
  {
    name: 'accordéon',
    reference: ref.accordion({
      name: 'faq',
      items: [
        { title: 'Q1', body: '<p>R1</p>', open: true },
        { title: 'Q2', body: '<p>R2</p>' },
      ],
    }),
    react: r(R.Accordion, {
      name: 'faq',
      items: [
        { id: 'q1', title: 'Q1', content: r('p', null, 'R1'), open: true },
        { id: 'q2', title: 'Q2', content: r('p', null, 'R2') },
      ],
    }),
    vue: () =>
      h(
        V.Accordion,
        {
          name: 'faq',
          items: [
            { id: 'q1', title: 'Q1', open: true },
            { id: 'q2', title: 'Q2' },
          ],
        },
        { q1: () => h('p', 'R1'), q2: () => h('p', 'R2') },
      ),
  },
  {
    name: 'info-bulle',
    reference: ref.tooltip({
      id: 'aide',
      text: 'Texte d’aide',
      trigger: '<button type="button" aria-describedby="aide">Aide</button>',
    }),
    react: r(R.Tooltip, {
      id: 'aide',
      text: 'Texte d’aide',
      children: (describedBy: string) =>
        r('button', { type: 'button', 'aria-describedby': describedBy }, 'Aide'),
    }),
    vue: () =>
      h(
        V.Tooltip,
        { id: 'aide', text: 'Texte d’aide' },
        {
          default: ({ describedBy }: { describedBy: string }) =>
            h('button', { type: 'button', 'aria-describedby': describedBy }, 'Aide'),
        },
      ),
  },
  {
    name: 'menu déroulant',
    reference: ref.menu({ id: 'actions', label: 'Actions', items: MENU }),
    react: r(R.Menu, { id: 'actions', label: 'Actions', items: MENU, onSelect: () => {} }),
    vue: () => h(V.Menu, { id: 'actions', label: 'Actions', items: MENU }),
  },
  {
    name: 'fil d’Ariane',
    reference: ref.breadcrumb({ items: CRUMBS }),
    react: r(R.Breadcrumb, { items: CRUMBS }),
    vue: () => h(V.Breadcrumb, { items: CRUMBS }),
  },
  ...(
    [
      [1, 5],
      [6, 12],
    ] as const
  ).map(([page, count]) => ({
    name: `pagination ${page} sur ${count}`,
    reference: ref.pagination({ page, count, href: HREF }),
    react: r(R.Pagination, { page, count, href: HREF }),
    vue: () => h(V.Pagination, { page, count, href: HREF }),
  })),
  {
    name: 'tableau trié',
    reference: ref.table(TABLE),
    react: r(R.Table, TABLE),
    vue: () => h(V.Table, TABLE),
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
