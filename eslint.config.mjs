import js from '@eslint/js'
import globals from 'globals'

export default [
  js.configs.recommended,
  {
    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'object-curly-spacing': ['error', 'always', { objectsInObjects: false }],
      'max-len': ['error', { code: 100 }],
      'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 1 }],
      'quote-props': ['error', 'as-needed'],
      'arrow-parens': ['error', 'as-needed'],
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        myCustomGlobal: 'readonly'
      }
    },
  },
  {
    ignores: ['dist/'],
  }
]
