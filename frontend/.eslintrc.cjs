module.exports = {
  root: true,
  env: { browser: true, es2022: true, node: false },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'prettier',
  ],
  settings: {
    react: { version: 'detect' },
    'import/resolver': { node: { extensions: ['.js', '.jsx'] } },
  },
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/no-unresolved': 'off',
    'import/named': 'off',
  },
  overrides: [
    {
      files: ['vite.config.*', 'tailwind.config.*', '*.config.*'],
      env: { node: true, browser: false },
      rules: {},
    },
  ],
}
