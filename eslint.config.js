import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['dist'],
  typescript: true,
  react: true,
  stylistic: true,
  rules: {
    '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
    '@typescript-eslint/no-empty-function': [
      'error',
      {
        allow: ['arrowFunctions', 'functions', 'methods'],
      },
    ],
    'perfectionist/sort-imports': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/no-unsafe-function-type': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'react-hooks/exhaustive-deps': 'off',
    // 自定义 React 规则
    'react-hooks/rules-of-hooks': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'style/no-tabs': 'off',
    // 自定义导入顺序规则
    'import/order': [
      'error',
      {
        'groups': [
          'internal',
          'external',
          'builtin',
          'sibling',
          'parent',
          'object',
          'index',
          'type',
        ],
        'newlines-between': 'always-and-inside-groups',
      },
    ],
    // 其他规则
    'semi': ['error', 'never'],
    'quotes': ['error', 'single'],
    'react/no-unstable-default-props': 'off',
    'no-console': 'off',
  },
})
