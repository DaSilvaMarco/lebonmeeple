import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['apps/front-end/src/**/*.spec.{ts,tsx}'],
    setupFiles: ['apps/front-end/src/test/setup.ts'],
    coverage: {
      provider: 'istanbul',
      include: ['apps/front-end/src/**/*.{ts,tsx}'],
      exclude: [
        'apps/front-end/src/test/**',
        'apps/front-end/src/**/*.spec.{ts,tsx}',
        'apps/front-end/src/app/layout.tsx',
        'apps/front-end/src/app/page.tsx',
        'apps/front-end/src/ui/ClientColorModeScript.tsx',
        'apps/front-end/src/ui/Provider.tsx',
        'apps/front-end/src/ui/ThemeProvider.tsx',
        'apps/front-end/src/store/ReduxProvider.tsx',
      ],
      all: true,
      reporter: ['text', 'json', 'html'],
    },
  },
  resolve: {
    alias: {
      // Alias globaux pour le monorepo
      '@frontend': path.resolve(__dirname, 'apps/front-end/src'),

      // Alias frontend
      '@': path.resolve(__dirname, 'apps/front-end/src'),
      '@/components': path.resolve(__dirname, 'apps/front-end/src/components'),
      '@/domains': path.resolve(__dirname, 'apps/front-end/src/domains'),
      '@/store': path.resolve(__dirname, 'apps/front-end/src/store'),
      '@/ui': path.resolve(__dirname, 'apps/front-end/src/ui'),
      '@/utils': path.resolve(__dirname, 'apps/front-end/src/utils'),
    },
  },
});
