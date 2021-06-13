module.exports = {
  extends: 'standard-with-typescript',
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    '@typescript-eslint/no-non-null-assertion': 0,
    // we should be able to use if (xxx) just like C++ where xxx can be non boolean value
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/brace-style': 0
  },
  overrides: [
    {
      files: ['./*.ts'],
      rules: {
        // https://github.com/typescript-eslint/typescript-eslint/blob/ef88a696a157f617d38ce6d49207a4a4a089a19b/packages/eslint-plugin/docs/rules/naming-convention.md#enforce-that-interface-names-do-not-begin-with-an-i
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'interface',
            format: ['PascalCase'],
            custom: {
              regex: '^I[A-Z]',
              match: true
            }
          }
        ]
      }
    }
  ]
}
