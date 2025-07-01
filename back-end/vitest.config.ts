// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
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
