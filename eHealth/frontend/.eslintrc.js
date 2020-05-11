module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  extends: ['airbnb', 'plugin:prettier/recommended', 'prettier/react'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    semi: 'never',
    'react/prop-types': 1,
    'arrow-parens': 'as-needed',
    'react/destructuring-assignment': 0,
    'no-underscore-dangle': 0,
    'jsx-a11y/href-no-hash': ['off'],
    'no-use-before-define': ['error', { variables: false }],
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
    'max-len': [
      'warn',
      {
        code: 80,
        tabWidth: 2,
        comments: 80,
        ignoreComments: false,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true
      }
    ]
  }
}
