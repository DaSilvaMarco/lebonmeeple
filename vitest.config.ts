import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: [
      'apps/back-end/src/domains/**/*.spec.ts',
      'apps/front-end/src/**/*.spec.{ts,tsx}',
    ],
    setupFiles: ['apps/front-end/src/test/setup.ts'],
    coverage: {
      provider: 'istanbul',
      include: ['apps/back-end/src/**/*.ts'],
      exclude: [
        'apps/back-end/src/domains/comment/comment.module.ts',
        'apps/back-end/src/domains/post/post.module.ts',
        'apps/back-end/src/domains/user/user.module.ts',
        'apps/back-end/src/domains/comment/comment.service.ts',
        'apps/back-end/src/domains/post/post.service.ts',
        'apps/back-end/src/domains/user/user.service.ts',
        'apps/back-end/src/app.module.ts',
        'apps/back-end/src/main.ts',
        'apps/back-end/src/guard/**',
        'apps/back-end/src/prisma/**',
        'apps/back-end/src/utils/**',
      ],
      all: true,
      reporter: ['text', 'json', 'html'],
    },
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
  resolve: {
    alias: {
      // Alias globaux pour le monorepo
      '@backend': path.resolve(__dirname, 'apps/back-end/src'),
      '@frontend': path.resolve(__dirname, 'apps/front-end/src'),

      // Alias backend
      '@': path.resolve(__dirname, 'apps/back-end/src'),
      '@domains': path.resolve(__dirname, 'apps/back-end/src/domains'),
      '@utils': path.resolve(__dirname, 'apps/back-end/src/utils'),
      '@guard': path.resolve(__dirname, 'apps/back-end/src/guard'),
      '@decorator': path.resolve(__dirname, 'apps/back-end/src/decorator'),
      '@prisma-service': path.resolve(__dirname, 'apps/back-end/src/prisma'),
      '@prisma': path.resolve(__dirname, 'apps/back-end/prisma'),
      '@backend/domains': path.resolve(__dirname, 'apps/back-end/src/domains'),
      '@backend/utils': path.resolve(__dirname, 'apps/back-end/src/utils'),
      '@backend/guard': path.resolve(__dirname, 'apps/back-end/src/guard'),
      '@backend/decorator': path.resolve(
        __dirname,
        'apps/back-end/src/decorator',
      ),
      '@backend/prisma': path.resolve(__dirname, 'apps/back-end/src/prisma'),

      // Alias frontend
      '@/components': path.resolve(__dirname, 'apps/front-end/src/components'),
      '@/domains': path.resolve(__dirname, 'apps/front-end/src/domains'),
      '@/store': path.resolve(__dirname, 'apps/front-end/src/store'),
      '@/ui': path.resolve(__dirname, 'apps/front-end/src/ui'),
      '@/utils': path.resolve(__dirname, 'apps/front-end/src/utils'),
    },
  },
});
