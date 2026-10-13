/**
 * Vue « Toutes les variantes » : un tableau par axe (variantes × états, tailles…), avec intitulés.
 * Une colonne peut forcer un état visuel (survol, focus) par `storybook-addon-pseudo-states`.
 */
export type ForcedState = 'hover' | 'focus' | 'focus-within'

export interface GridColumn {
  label: string
  state?: ForcedState
}

export interface GridRow {
  label: string
  cells: string[]
  state?: ForcedState
}

export const grid = (caption: string, columns: (GridColumn | string)[], rows: GridRow[]) => {
  const cols = columns.map((column) => (typeof column === 'string' ? { label: column } : column))
  const head = cols.map((column) => `<th scope="col">${column.label}</th>`).join('')
  const body = rows
    .map(
      (row) =>
        `<tr><th scope="row">${row.label}</th>${row.cells
          .map((cell, index) => {
            const state = cols[index]?.state ?? row.state
            return `<td><div class="sb-cell"${state ? ` data-sb-state="${state}"` : ''}>${cell}</div></td>`
          })
          .join('')}</tr>`,
    )
    .join('')
  return `<div class="sb-grid" role="region" aria-label="${caption}" tabindex="0"><table><caption>${caption}</caption><thead><tr><td></td>${head}</tr></thead><tbody>${body}</tbody></table></div>`
}

export const sections = (...grids: string[]) => `<div class="sb-sections">${grids.join('')}</div>`

/** Paramètres de la vue d'ensemble : pas de contrôles, états forcés par colonne. */
export const OVERVIEW = {
  controls: { disable: true },
  pseudo: {
    hover: ['[data-sb-state="hover"] *'],
    focusVisible: ['[data-sb-state="focus"] *'],
    focusWithin: ['[data-sb-state="focus-within"]', '[data-sb-state="focus-within"] *'],
  },
}

/** Identifiants uniques dans une vue d'ensemble, pour les liens label, aide et erreur. */
export const uid = (() => {
  let counter = 0
  return (base: string) => `${base}-${++counter}`
})()

/** Retire les clés à `undefined` (contrôles « aucune ») avant de passer les args aux composants. */
export const defined = <T extends object>(value: T): T =>
  Object.fromEntries(Object.entries(value).filter(([, entry]) => entry !== undefined)) as T
