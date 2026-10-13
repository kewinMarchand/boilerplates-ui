import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [vue()],
  test: {
    include: ['packages/*/tests/**/*.test.ts', 'tests/parity/**/*.test.ts'],
  },
})
