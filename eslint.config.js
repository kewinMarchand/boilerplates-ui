import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import prettier from 'eslint-config-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import vue from 'eslint-plugin-vue'
import globals from 'globals'
import ts from 'typescript-eslint'

export default defineConfig(
  {
    ignores: [
      '**/node_modules/',
      '**/storybook-static/',
      'packages/tokens/generated/',
      'packages/vanilla/types/',
      'test-results/',
      'playwright-report/',
    ],
  },
  js.configs.recommended,
  ts.configs.recommended,
  vue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: ts.parser } },
    rules: { 'vue/require-default-prop': 'off' },
  },
  {
    files: ['packages/react/**/*.{ts,tsx}', 'apps/storybook/stories/**/*.ts'],
    ...reactHooks.configs.flat['recommended-latest'],
  },
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    plugins: { 'simple-import-sort': simpleImportSort },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'simple-import-sort/imports': [
        'error',
        {
          // Ordre de standards-front adapté au dépôt : 1 tiers, 3 socle (paquets sans framework),
          // 4 modules (paquets React et Vue), 6 relatifs, 7 types, 8 styles et autres effets de bord.
          // Les groupes 2 (bibliothèque commune) et 5 (vues) sont sans objet ici.
          groups: [
            ['^node:', '^(?!@kewinmarchand/)@?\\w'],
            ['^@kewinmarchand/(tokens|css|vanilla)(/|$)'],
            ['^@kewinmarchand/(react|vue)(/|$)'],
            ['^\\.'],
            ['^.+\\u0000$'],
            ['^\\u0000'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
  {
    files: ['tools/**', 'packages/tokens/scripts/**'],
    rules: { 'no-console': 'off' },
  },
  prettier,
)
