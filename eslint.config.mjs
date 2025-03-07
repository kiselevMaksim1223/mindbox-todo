import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

export default [
  {
    ignores: ['**/README.md', '**/*.json', '**/dist/', '**/playwright-report/']
  },
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/jsx-runtime',
      'plugin:import/recommended',
      'prettier',
      'plugin:prettier/recommended'
    )
  ),
  {
    plugins: {
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      react: fixupPluginRules(react),
      'react-hooks': fixupPluginRules(reactHooks),
      'simple-import-sort': simpleImportSort
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },

      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'module'
    },

    parserOptions: {
      project: './tsconfig.json'
    },

    settings: {
      'import/resolver': {
        typescript: {}
      },

      react: {
        version: 'detect'
      }
    },

    rules: {
      'no-console': 'error',
      'no-nested-ternary': 'error',
      'react/jsx-curly-brace-presence': [
        'error',
        {
          props: 'always',
          children: 'never'
        }
      ],
      'prettier/prettier': 'warn',
      'react/prop-types': 'off',
      'react/jsx-curly-spacing': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/no-array-index-key': 'off',
      'react/boolean-prop-naming': 'error',

      'react/display-name': [
        'off',
        {
          ignoreTranspilerName: true
        }
      ],

      'react/destructuring-assignment': ['error', 'always'],
      'react/jsx-boolean-value': 'error',
      'react/jsx-fragments': ['error', 'element'],
      'react/jsx-handler-names': 'error',

      'react/jsx-sort-props': [
        2,
        {
          callbacksLast: true,
          multiline: 'last',
          noSortAlphabetically: false
        }
      ],

      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],

      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react'],
            ['^@*'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ['^.+\\.?(css)$']
          ]
        }
      ],

      'simple-import-sort/exports': 'error'
    }
  }
]
