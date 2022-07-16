module.exports = {
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
  },
  plugins: [
    'react',
  ],
  rules: {
  },
};
