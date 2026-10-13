import vue from '@vitejs/plugin-vue'

import type { StorybookConfig } from '@storybook/html-vite'

const config: StorybookConfig = {
  framework: '@storybook/html-vite',
  stories: ['../stories/**/*.stories.ts'],
  addons: ['@storybook/addon-a11y', 'storybook-addon-pseudo-states'],
  staticDirs: [
    '../public',
    { from: '../../../packages/css/icons', to: '/' },
    { from: '../../../node_modules/@fontsource-variable/inter/files', to: '/fonts' },
  ],
  core: { disableTelemetry: true },
  viteFinal: (viteConfig) => ({ ...viteConfig, plugins: [...(viteConfig.plugins ?? []), vue()] }),
}

export default config
