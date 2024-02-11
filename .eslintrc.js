module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ['airbnb', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // Enable JSX since we're using React
    },
  },
  plugins: ['prettier'],
  ignorePatterns: ['node_modules', 'build', 'dist', 'public'],
  settings: {
    react: {
      // Tells eslint-plugin-react to automatically detect the version of React to use.
      version: 'detect',
    },
    // Tells eslint how to resolve imports
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx'],
      },
    },
  },
  rules: {
    'prettier/prettier': ['error'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'no-console': 'warn',
    'import/prefer-default-export': 'off',
    'import/no-anonymous-default-export': 'off',
    'import/no-cycle': 'off',
    'import/no-unresolved': [2, { caseSensitive: false }],
    'react/prop-types': ['off'],
    'no-param-reassign': 'off',
    'no-nested-ternary': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
  },
};
