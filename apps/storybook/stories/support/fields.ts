import { uid } from './grid'

import type { ForcedState, GridRow } from './grid'

/** Contrôles communs aux champs : libellé, aide, erreur, requis, désactivé. */
export const FIELD_ARG_TYPES = {
  id: { control: 'text' },
  label: { control: 'text' },
  hint: { control: 'text', description: 'Aide liée par aria-describedby' },
  error: { control: 'text', description: 'Message d’erreur, pose aria-invalid' },
  required: { control: 'boolean' },
  disabled: { control: 'boolean' },
} as const

interface FieldState {
  label: string
  state?: ForcedState
  options: { hint?: string; error?: string; required?: boolean; disabled?: boolean }
}

/** Les états d'un champ, un par ligne : normal, focus, aide, requis, erreur, désactivé. */
export const FIELD_STATES: FieldState[] = [
  { label: 'Normal', options: {} },
  { label: 'Focus', state: 'focus', options: {} },
  { label: 'Avec aide', options: { hint: 'Texte d’aide sous le libellé' } },
  { label: 'Requis', options: { required: true } },
  { label: 'Erreur', options: { required: true, error: 'Message d’erreur explicite' } },
  { label: 'Désactivé', options: { disabled: true } },
]

export const fieldRows = (
  base: string,
  render: (options: FieldState['options'] & { id: string }) => string,
): GridRow[] =>
  FIELD_STATES.map(({ label, state, options }) => ({
    label,
    ...(state ? { state } : {}),
    cells: [render({ ...options, id: uid(base) })],
  }))
