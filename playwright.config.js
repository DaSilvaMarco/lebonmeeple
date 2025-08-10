import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  features: 'packages/e2e-tests/features/**/*.feature',
  steps:    'packages/e2e-tests/steps/**/*.steps.ts',
  language: 'fr',
});

export default defineConfig({
  testDir,
  reporter: 'html',
});
