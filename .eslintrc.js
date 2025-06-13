export default {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'jsx-a11y'],
  rules: {
    'react/react-in-jsx-scope': 'off', // Not needed in React 17+
    'jsx-a11y/alt-text': 'warn',
    'jsx-a11y/no-autofocus': 'warn',
    // Add more rules as needed
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
