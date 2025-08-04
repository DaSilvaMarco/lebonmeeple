import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  // Ignorer les fichiers de build et générés
  {
    ignores: [
      'dist/**',
      'build/**',
      '*.d.ts',
      '**/dist/**',
      '**/build/**',
      '**/node_modules/**',
      '**/.next/**',
      '**/coverage/**',
      '**/prisma/migrations/**',
      '**/seed.ts',
      '*.config.js',
      '*.config.mjs',
      'next-env.d.ts',
    ],
  },

  // Configuration de base JavaScript
  js.configs.recommended,

  // Configuration TypeScript recommandée
  ...tseslint.configs.recommended,

  // Configuration pour tous les fichiers JS/TS
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2022,
      },
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // Règles Prettier
      'prettier/prettier': 'error',

      // Règles TypeScript strictes pour la qualité du code
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
          disallowTypeAnnotations: false,
        },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

      // Règles JavaScript/TypeScript communes pour la qualité
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'no-param-reassign': 'error',
      'no-nested-ternary': 'warn',
      'no-unneeded-ternary': 'error',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-else-return': 'error',
      'prefer-destructuring': [
        'error',
        {
          array: true,
          object: true,
        },
        {
          enforceForRenamedProperties: false,
        },
      ],

      // Règles de style et organisation
      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          allowSeparatedGroups: true,
        },
      ],
    },
  },

  // Configuration spécifique pour React/Next.js (front-end)
  {
    files: ['apps/front-end/**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // Autorise console.log en développement front-end
      'no-console': 'off',
    },
  },

  // Configuration spécifique pour NestJS (back-end)
  {
    files: ['apps/back-end/**/*.ts'],
    rules: {
      // Règles spécifiques NestJS
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          // Ignorer les paramètres des décorateurs NestJS
          ignoreRestSiblings: true,
        },
      ],

      // Désactiver la règle consistent-type-imports pour les services injectés
      // Les classes NestJS doivent être importées sans 'type' pour l'injection de dépendances
      '@typescript-eslint/consistent-type-imports': 'off',

      // Les décorateurs NestJS peuvent avoir des paramètres non utilisés
      '@typescript-eslint/no-unused-expressions': 'off',

      // Autorise les any dans les DTOs pour la validation
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // Configuration spécifique aux fichiers de test
  {
    files: [
      '**/*.spec.ts',
      '**/*.test.ts',
      '**/test/**/*.ts',
      '**/__tests__/**/*.ts',
    ],
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.node,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'no-console': 'off',
      'prefer-const': 'off',
      // Autorise les objets vides dans les tests
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },

  // Configuration pour les fichiers de configuration
  {
    files: ['*.config.{js,mjs,ts}', 'vite.config.*', 'vitest.config.*'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // Désactiver les règles qui peuvent entrer en conflit avec Prettier
  prettier,
];
