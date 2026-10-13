import '@fontsource-variable/inter'
import '@kewinmarchand/tokens/tokens.css'
import '@kewinmarchand/css'
import './preview.css'

import { setIconSprite as setReferenceSprite } from '@kewinmarchand/css/reference/markup.ts'
import { setIconSprite as setReactSprite } from '@kewinmarchand/react'
import {
  initMenus,
  initModals,
  initTables,
  initTabs,
  initToasts,
  initTooltips,
  setToastIconSprite,
} from '@kewinmarchand/vanilla'
import { setIconSprite as setVueSprite } from '@kewinmarchand/vue'

import type { Preview } from '@storybook/html-vite'

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
  initialGlobals: { a11yMode: 'standard' },
  decorators: [
    (story, { globals }) => {
      if (globals['a11yMode'] === 'enhanced')
        document.documentElement.dataset['a11yMode'] = 'enhanced'
      else delete document.documentElement.dataset['a11yMode']
      return story()
    },
  ],
  parameters: {
    layout: 'padded',
    a11y: { test: 'error' },
  },
}

export default preview
