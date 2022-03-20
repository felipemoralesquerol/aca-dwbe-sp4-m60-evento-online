module.exports = {
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es2021: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    semi: [2, 'always'],
    'comma-dangle': ['error', 'never']

  }
};
