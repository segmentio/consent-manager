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
    '@typescript-eslint/member-ordering': 'off',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/tslint/config': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/semi': 'off',
    'import/namespace': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/order': 'off',
    'import/default': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'no-restricted-syntax': 'off',
    eqeqeq: 'off',
    'no-useless-return': 'off',
    'no-shadow': 'off',
    'no-global-assign': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-no-bind': 'off',
    'jsdoc/require-param-type': 'off',
    'func-names': 'off',
    'quote-props': 'off',
    'react/jsx-indent-props': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'space-before-function-paren': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'no-console': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off'
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    }
  }
}
