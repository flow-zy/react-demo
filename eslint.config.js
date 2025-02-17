
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import AntFu from '@antfu/eslint-config'

export default AntFu({
	react: true,
	typescript: true,
	formatters: true,
	overrides: {
		react: {
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
						'type'
					],
					'newlines-between': 'always-and-inside-groups'
				}
			]
		}
	},
	plugins: {
		'prettier': prettierPlugin,
	}
}, {
	rules: {
		'format/prettier': 'error',
		...prettierConfig.rules
	}
})
