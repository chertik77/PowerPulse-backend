module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    warnOnUnsupportedTypeScriptVersion: false
  },
  plugins: ['@typescript-eslint/eslint-plugin', '@darraghor/nestjs-typed'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@darraghor/nestjs-typed/recommended',
    'plugin:prettier/recommended'
  ],
  root: true,
  env: { node: true },
  ignorePatterns: ['.eslintrc.js']
}
