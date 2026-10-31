import { render } from 'svelte/server'
import { describe, expect, it } from 'vitest'

import Render from '../../../tests/parity/Render.svelte'
import { Button, Checkbox, Chip, Fieldset, Link, Pagination, TextField } from '../src'

import type { Component } from 'svelte'

/**
 * Svelte retire l'espace en début et en fin de contenu d'un élément. Le test de parité normalise ces espaces
 * et ne le verrait pas : on vérifie ici le texte exact des mentions où l'espace compte (« Nom (obligatoire) »).
 */
const text = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- n'importe quel composant de la bibliothèque
  component: Component<any>,
  props: Record<string, unknown>,
  html?: string,
) =>
  render(Render, { props: { component, props, html } })
    .body.replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, '')

describe('espaces des mentions accessibles', () => {
  it.each([
    [
      'champ obligatoire',
      text(TextField, { id: 'n', label: 'Nom', required: true }),
      'Nom (obligatoire)',
    ],
    [
      'case obligatoire',
      text(Checkbox, { id: 'c', label: 'Accepter', required: true }),
      'Accepter (obligatoire)',
    ],
    [
      'groupe obligatoire',
      text(Fieldset, { id: 'f', legend: 'Contact', required: true }, 'x'),
      'Contact (obligatoire)',
    ],
    [
      'bouton en chargement',
      text(Button, { loading: true }, 'Envoyer'),
      'Envoyer (chargement en cours)',
    ],
    ['lien externe', text(Link, { href: '/a', external: true }, 'Doc'), 'Doc (nouvelle fenêtre)'],
    ['puce retirable', text(Chip, { removable: true }, 'Mi-ombre'), 'Retirer le filtre : Mi-ombre'],
    ['page de la pagination', text(Pagination, { page: 2, count: 3, href: () => '#' }), 'Page 2'],
  ])('%s', (_, rendered, expected) => {
    expect(rendered.replace(/\s+/g, ' ')).toContain(expected)
  })
})
