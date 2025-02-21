import antfu from '@antfu/eslint-config'

export default antfu({
  // 忽略文件或目录
  ignores: ['dist'],

  // TypeScript 配置
  typescript: true,

  // React 配置
  react: true,
  // 样式格式化支持
  stylistic: true, // 启用样式相关的规则
  // 自定义规则
  rules: {
    // 自定义 TypeScript 规则
    '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
    '@typescript-eslint/no-empty-function': [
      'error',
      {
        allow: ['arrowFunctions', 'functions', 'methods'],
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/no-unsafe-function-type': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unused-vars': 'off',

    // 自定义 React 规则
    'react-hooks/rules-of-hooks': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],

    // 自定义导入顺序规则
    'import/order': [
      'error',
      {
        groups: [
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
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
  },
})