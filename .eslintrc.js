module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'linebreak-style': ['error', 'windows'],
    'no-console': 'off',
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always',
        exports: 'always',
        functions: 'never',
      },
    ],
    'global-require': 0,
    'arrow-body-style': ['error', 'as-needed'],
    'max-len': ['error', { code: 150 }],
    'no-underscore-dangle': 0,
    'consistent-return': 0,
    'object-curly-newline': [
      'error',
      {
        ObjectPattern: { multiline: true },
        ImportDeclaration: 'never',
        ExportDeclaration: { multiline: true, minProperties: 3 },
      },
    ],
    'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
    'class-methods-use-this': 0,
  },
};
