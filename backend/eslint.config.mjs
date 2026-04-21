import js from '@eslint/js';

export default [
	{
		ignores: ['dist/**'],
	},
	js.configs.recommended,
	{
		files: ['**/*.ts'],
		languageOptions: {
			parser: (await import('@typescript-eslint/parser')).default,
			parserOptions: {
				sourceType: 'module',
				ecmaVersion: 'latest',
			},
			globals: {
				process: 'readonly',
				fetch: 'readonly',
				__dirname: 'readonly',
				__filename: 'readonly',
			},
		},
		plugins: {
			'@typescript-eslint': (await import('@typescript-eslint/eslint-plugin')).default,
		},
		rules: {
			'no-unused-vars': 'warn',
			'@typescript-eslint/no-unused-vars': 'warn',
		},
	},
];
