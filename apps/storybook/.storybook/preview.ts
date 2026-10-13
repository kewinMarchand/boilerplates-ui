import '@fontsource-variable/inter'
import '@kewinmarchand/tokens/tokens.css'
import '@kewinmarchand/css'
import './preview.css'

import { initModals } from '@kewinmarchand/vanilla'

import type { Preview } from '@storybook/html-vite'

initModals()

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
