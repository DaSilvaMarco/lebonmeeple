// vitest.config.ts
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      // Chemins depuis la racine du projet
      '@': path.resolve(__dirname, './src'),
      '@domains': path.resolve(__dirname, './src/domains'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@guard': path.resolve(__dirname, './src/guard'),
      '@decorator': path.resolve(__dirname, './src/decorator'),
      '@prisma-service': path.resolve(__dirname, './src/prisma'),
      '@test': path.resolve(__dirname, './test'),
      '@prisma': path.resolve(__dirname, './prisma'),

      // Alias backend depuis la racine (pour les imports cross-modules)
      '@backend': path.resolve(__dirname, './src'),
      '@backend/domains': path.resolve(__dirname, './src/domains'),
      '@backend/utils': path.resolve(__dirname, './src/utils'),
      '@backend/guard': path.resolve(__dirname, './src/guard'),
      '@backend/decorator': path.resolve(__dirname, './src/decorator'),
      '@backend/prisma': path.resolve(__dirname, './src/prisma'),
    },
  },
  // Configuration pour exécution depuis la racine du projet
  root: process.cwd().endsWith('back-end') ? '.' : './apps/back-end',
  test: {
    include: ['test/**/*.spec.ts'],
    coverage: {
      provider: 'istanbul',
      include: ['src/**/*.ts'],
      exclude: [
        'src/domains/comment/comment.module.ts',
        'src/domains/post/post.module.ts',
        'src/domains/user/user.module.ts',
        'src/domains/comment/comment.service.ts',
        'src/domains/post/post.service.ts',
        'src/domains/user/user.service.ts',
        'src/app.module.ts',
        'src/main.ts',
        'src/guard/**',
        'src/prisma/**',
        'src/utils/**',
      ],
      all: true,
      reporter: ['text', 'json', 'html'],
    },
    globals: true,
  },
});
