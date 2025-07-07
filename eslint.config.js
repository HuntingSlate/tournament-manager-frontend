import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import unusedImports from 'eslint-plugin-unused-imports';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier/recommended';
import { fixupPluginRules } from '@eslint/compat';
import jsxA11Y from 'eslint-plugin-jsx-a11y';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default tseslint.config([
	{ ignores: ['dist/', 'node_modules/'] },
	{
		extends: [js.configs.recommended, ...tseslint.configs.recommended],
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			'simple-import-sort': simpleImportSort,
			'react-hooks': fixupPluginRules(reactHooks),
			'react-refresh': reactRefresh,
			'unused-imports': unusedImports,
			import: fixupPluginRules(importPlugin),
			prettier: prettier,
			'jsx-a11y': fixupPluginRules(jsxA11Y),
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
			'@typescript-eslint/no-explicit-any': ['off'],
			quotes: [2, 'single', { avoidEscape: true }],
			'jsx-quotes': [2, 'prefer-single'],
			'no-console': [
				'error',
				{
					allow: ['warn', 'error'],
				},
			],
			'jsx-a11y/no-autofocus': 'off',
			semi: ['error', 'always'],
			'unused-imports/no-unused-imports': 'error',
			'@typescript-eslint/no-unused-vars': 'warn',
			'@typescript-eslint/consistent-type-imports': 'error',
			'no-restricted-imports': [
				'error',
				{
					patterns: [
						{
							group: ['*./*', '**../'],
							message: 'Relative imports are not allowed.',
						},
					],
				},
			],
			'import/no-cycle': 'off',
			'import/prefer-default-export': 'off',
			'import/order': [
				'error',
				{
					groups: ['type', 'builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
					'newlines-between': 'always',
					pathGroups: [
						{
							pattern: '@**',
							group: 'external',
						},
						{
							pattern: '@/src/**',
							group: 'internal',
						},
					],
					pathGroupsExcludedImportTypes: ['react'],
					alphabetize: {
						order: 'asc',
						caseInsensitive: true,
					},
				},
			],

			'simple-import-sort/exports': 'error',
			'import/first': 'error',
			'import/newline-after-import': 'error',
			'import/no-duplicates': 'error',
			'no-multiple-empty-lines': ['error', { max: 1 }],
		},
	},
	{
		files: ['**/*index.tsx', '**/*index.ts', '**/*index.js', '**/*index.jsx'],

		rules: {
			'no-restricted-imports': 'off',
		},
	},
]);
