/**
 * @type {import('@typescript-eslint/experimental-utils').TSESLint.Linter.Config}
 */
module.exports = {
  extends: 'standard-with-typescript',
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    '@typescript-eslint/no-non-null-assertion': 0,
    // we should be able to use if (xxx) just like C++ where xxx can be non boolean value
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/brace-style': 0,
    '@typescript-eslint/space-before-function-paren': 0,
    'generator-star-spacing': 0,
    'yield-star-spacing': 0
  },
  overrides: [
    {
      files: ['./*.spec.ts'],
      parserOptions: {
        project: ['./tsconfig.spec.json']
      }
    }
  ]
}
