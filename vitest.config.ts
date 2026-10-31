import { svelte } from '@sveltejs/vite-plugin-svelte'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [vue(), svelte()],
  test: {
    include: ['packages/*/tests/**/*.test.ts', 'tests/parity/**/*.test.ts'],
  },
})
