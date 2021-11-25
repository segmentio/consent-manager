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
    '@typescript-eslint/ban-ts-ignore': 'warn',
    'no-global-assign': 'off',
    '@typescript-eslint/unbound-method': 'warn'
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    }
  }
}
