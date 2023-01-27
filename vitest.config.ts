import { defineConfig, configDefaults } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    ...configDefaults,
    globals: true,
    setupFiles: ['vitest-localstorage-mock', './src/tests/setup'],
    mockReset: false,
  },
})
