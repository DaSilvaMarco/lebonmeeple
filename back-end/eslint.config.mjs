import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  // Ignorer les fichiers de build
  {
    ignores: ['dist/**', 'node_modules/**', '*.d.ts'],
  },

  // Configuration de base JavaScript
  js.configs.recommended,

  // Configuration TypeScript
  ...tseslint.configs.recommended,

  // Configuration pour tous les fichiers JS/TS
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // Règles Prettier
      'prettier/prettier': 'error',

      // Désactiver les avertissements pour les directives eslint-disable inutilisées
      '@eslint-community/eslint-comments/no-unused-disable': 'off',

      // Règles TypeScript communes
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',

      // Règles JavaScript communes
      'no-console': 'warn',
      'prefer-const': 'error',
    },
  },

  // Configuration spécifique aux fichiers de test
  {
    files: ['**/*.spec.ts', '**/*.test.ts', '**/test/**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
    },
  },

  // Désactiver les règles qui peuvent entrer en conflit avec Prettier
  prettier,
];
