import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import importX from 'eslint-plugin-import-x'
export default tseslint.config(
	{ ignores: ['dist'] },
	{
		extends: [js.configs.recommended, ...tseslint.configs.recommended],
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser
		},
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
			'import-x': importX,
			prettier: prettierPlugin
		},
		rules: {
			...prettierConfig.rules,
			...reactHooks.configs.recommended.rules,
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true }
			],
			'@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
			'no-empty-function': 'off',
			'@typescript-eslint/no-empty-function': [
				'error',
				{
					allow: ['arrowFunctions', 'functions', 'methods']
				}
			],
			'import-x/order': [
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
						'type'
					],
					'newlines-between': 'always-and-inside-groups'
				}
			],
			semi: ['error', 'never'],
			quotes: ['error', 'single'],
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/ban-ts-comment': 'off'
		}
	}
)
