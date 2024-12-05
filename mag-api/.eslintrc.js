import { ESLint } from 'eslint';
import prettier from 'eslint-plugin-prettier';
import importHelpers from 'eslint-plugin-import-helpers';
import typescript from '@typescript-eslint/eslint-plugin';

export default new ESLint({
  baseConfig: {
    env: {
      es2022: true,
      node: true,
      jest: true
    },
    extends: [
      'airbnb-base',
      'plugin:@typescript-eslint/recommended',
      'prettier',
      'plugin:prettier/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    plugins: {
      '@typescript-eslint': typescript,
      'import-helpers': importHelpers,
      'prettier': prettier
    },
    rules: {
      'consistent-return': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'import/prefer-default-export': 'off',
      'camelcase': 'off',
      'class-methods-use-this': 'off',
      'import/no-unresolved': 'off',
      'no-useless-constructor': 'off',
      'max-classes-per-file': 'off',
      'no-restricted-syntax': 'off',
      'no-promise-executor-return': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '_',
          varsIgnorePattern: '_'
        }
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: true
          }
        }
      ],
      'no-shadow': 'off',
      'no-empty-function': 'off',
      'lines-between-class-members': 'error',
      'import-helpers/order-imports': [
        'warn',
        {
          newlinesBetween: 'always',
          groups: [
            'module',
            '/^@shared/',
            ['parent', 'sibling', 'index']
          ],
          alphabetize: {
            order: 'asc',
            ignoreCase: true
          }
        }
      ],
      'import/no-extraneous-dependencies': [
        'off',
        {
          devDependencies: ['**/*.spec.js']
        }
      ],
      'no-nested-ternary': 'off',
      'import/no-duplicates': 'off',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          ts: 'never',
          tsx: 'never'
        }
      ],
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto'
        }
      ],
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'never',
          named: 'never',
          asyncArrow: 'always'
        }
      ],
      'keyword-spacing': [
        'error',
        {
          before: true,
          after: true
        }
      ],
      'space-infix-ops': 'error',
      'space-in-parens': ['error', 'never'],
      'array-bracket-spacing': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'computed-property-spacing': ['error', 'never'],
      'func-call-spacing': ['error', 'never'],
      'block-spacing': ['error', 'always'],
      'template-curly-spacing': ['error', 'never']
    },
    settings: {
      'import/resolver': {
        typescript: {}
      }
    }
  }
});
