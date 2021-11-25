module.exports = {
  extends: require.resolve('ng-build/config/eslintrc.js'),
  plugins: ['react', '@typescript-eslint', 'prettier'],
  env: {
    browser: true,
    jest: true
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/member-ordering': 'warn',
    '@typescript-eslint/unbound-method': 'warn',
    '@typescript-eslint/tslint/config': 'warn',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/semi': 'warn',
    'import/namespace': 'warn',
    'import/no-extraneous-dependencies': 'warn',
    'import/order': 'warn',
    'import/default': 'warn',
    'import/extensions': 'warn',
    'import/no-unresolved': 'warn',
    'no-restricted-syntax': 'warn',
    eqeqeq: 'warn',
    'no-useless-return': 'warn',
    'no-shadow': 'warn',
    'no-global-assign': 'off',
    'react/destructuring-assignment': 'warn',
    'react/jsx-no-bind': 'warn',
    'jsdoc/require-param-type': 'warn'
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    }
  }
}
