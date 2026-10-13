import { createElement as h } from 'react'
import { addons, types, useGlobals } from 'storybook/manager-api'
import { create } from 'storybook/theming'

const COLORS = [
  { key: 'primary', label: 'Primaire', fallback: '#1d4ed8' },
  { key: 'secondary', label: 'Secondaire', fallback: '#7c3aed' },
  { key: 'error', label: 'Erreur', fallback: '#b91c1c' },
] as const

const ColorTool = () => {
  const [globals, updateGlobals] = useGlobals()
  return h(
    'div',
    { style: { display: 'flex', alignItems: 'center', gap: 10, padding: '0 8px', fontSize: 12 } },
    ...COLORS.map(({ key, label, fallback }) =>
      h(
        'label',
        { key, style: { display: 'flex', alignItems: 'center', gap: 4 } },
        label,
        h('input', {
          type: 'color',
          value: typeof globals[key] === 'string' && globals[key] ? globals[key] : fallback,
          onChange: (event: { target: { value: string } }) =>
            updateGlobals({ [key]: event.target.value }),
          style: {
            width: 28,
            height: 22,
            padding: 0,
            border: 0,
            background: 'none',
            cursor: 'pointer',
          },
        }),
      ),
    ),
    h(
      'button',
      {
        type: 'button',
        onClick: () => updateGlobals({ primary: '', secondary: '', error: '' }),
        style: {
          border: 0,
          background: 'none',
          color: 'inherit',
          cursor: 'pointer',
          textDecoration: 'underline',
        },
      },
      'Couleurs par défaut',
    ),
  )
}

addons.register('bui/colors', () => {
  addons.add('bui/colors/tool', { type: types.TOOL, title: 'Couleurs', render: ColorTool })
})

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'boilerplates-ui',
    brandImage: 'brand.svg',
    brandUrl: 'https://github.com/kewinMarchand/boilerplates-ui',
    brandTarget: '_blank',
    colorPrimary: '#1d4ed8',
    colorSecondary: '#1d4ed8',
    appBg: '#f5f5f5',
    appContentBg: '#ffffff',
    appBorderColor: '#e5e7eb',
    appBorderRadius: 8,
    textColor: '#111827',
    textMutedColor: '#4b5563',
    barSelectedColor: '#1d4ed8',
    fontBase: "'Inter Variable', system-ui, sans-serif",
  }),
})
