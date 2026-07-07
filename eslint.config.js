import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import angular from '@angular-eslint/configs';

export default [
  js.configs.recommended,
  
  {
    files: ['**/*.ts'],
    extends: [
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.tsRecommended,
      prettier,
    ],
    rules: {

      'no-console': ['warn', { allow: ['warn', 'error'] }],

      quotes: ['warn', 'single', { avoidEscape: true, allowTemplateLiterals: true }],

      'object-curly-spacing': ['warn', 'always'],

      'space-in-template-string-expressions': ['warn', 'always'],

      semi: ['warn', 'always'],

      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        { accessibility: 'explicit', overrides: { constructors: 'no-public' } },
      ],

      '@typescript-eslint/naming-convention': [
        'error',
        [
          {
            selector: 'enumMember',
            format: ['UPPER_CASE'],
            custom: {
              regex: '^[^_]',
              match: true,
            },
          },
          {
            selector: 'interface',
            format: ['PascalCase'],
            prefix: ['I'],
          },
        ],
      ],

      '@typescript-eslint/lines-between-class-members': [
        'error',
        {
          blankLine: 'always',
          exceptAfterSingleLine: true,
        },
      ],
    },
  },

  {
    files: ['**/*.html'],
    extends: [
      angular.templateRecommended,
      angular.templateAccessibility,
      prettier,
    ],
    rules: {

      '@angular-eslint/template/banana-in-box': ['error'],

      '@angular-eslint/template/eqeqeq': ['warn'],

      '@angular-eslint/template/no-invalid-template-syntax': ['error'],
    },
  },
];
