import { setIconSprite as setReferenceSprite } from '@kewinmarchand/css/reference/markup.ts'
import {
  initMenus,
  initModals,
  initTables,
  initTabs,
  initToasts,
  initTooltips,
  setToastIconSprite,
} from '@kewinmarchand/vanilla'

import { setIconSprite as setReactSprite } from '@kewinmarchand/react'
import { setIconSprite as setVueSprite } from '@kewinmarchand/vue'

import { applyTheme } from '../stories/support/theme'

import type { Preview } from '@storybook/html-vite'

import '@fontsource-variable/inter'
import '@kewinmarchand/tokens/tokens.css'
import '@kewinmarchand/css'
import './preview.css'

// Chemin relatif à iframe.html : le sprite suit le Storybook sous un sous-chemin (GitHub Pages).
const ICON_SPRITE = 'icons.svg'
setReferenceSprite(ICON_SPRITE)
setReactSprite(ICON_SPRITE)
setVueSprite(ICON_SPRITE)
setToastIconSprite(ICON_SPRITE)

initModals()
initTabs()
initMenus()
initTooltips()
initToasts()
initTables()

/** Plan de travail blanc (surface des tokens) sur le fond gris de l'aperçu. */
const workbench = (content: unknown) => {
  const bench = document.createElement('div')
  bench.className = 'sb-workbench'
  if (content instanceof Node) bench.append(content)
  else bench.innerHTML = String(content)
  return bench
}

/** Bandeau d'avertissement de contraste, hors de la zone de l'histoire. */
const showWarnings = (warnings: string[]) => {
  document.getElementById('sb-contrast-warning')?.remove()
  if (warnings.length === 0) return
  const banner = document.createElement('p')
  banner.id = 'sb-contrast-warning'
  banner.className = 'sb-warning'
  banner.setAttribute('role', 'status')
  banner.textContent = `Contraste sous le niveau AA : ${warnings.join(', ')}.`
  document.body.prepend(banner)
}

const preview: Preview = {
  globalTypes: {
    a11yMode: {
      description: 'Mode accessibilité renforcée (section 4 de la spec commune)',
      toolbar: {
        title: 'Accessibilité',
        icon: 'accessibility',
        items: [
          { value: 'standard', title: 'Mode standard' },
          { value: 'enhanced', title: 'Mode renforcé' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { a11yMode: 'standard', primary: '', secondary: '', error: '' },
  decorators: [
    (story, { globals }) => {
      const enhanced = globals['a11yMode'] === 'enhanced'
      if (enhanced) document.documentElement.dataset['a11yMode'] = 'enhanced'
      else delete document.documentElement.dataset['a11yMode']
      showWarnings(
        applyTheme(
          { primary: globals['primary'], secondary: globals['secondary'], error: globals['error'] },
          enhanced,
        ),
      )
      return workbench(story())
    },
  ],
  parameters: {
    layout: 'padded',
    a11y: { test: 'error' },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Fondations',
          ['Vue d’ensemble', 'Tokens', 'Icône'],
          'Actions',
          ['Vue d’ensemble', '*'],
          'Formulaire',
          ['Vue d’ensemble', '*'],
          'Affichage',
          ['Vue d’ensemble', '*'],
          'Navigation',
          ['Vue d’ensemble', '*'],
          'Retours',
          ['Vue d’ensemble', '*'],
          'Superpositions',
          ['Vue d’ensemble', '*'],
        ],
      },
    },
  },
}

export default preview
