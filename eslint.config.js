import eslintPluginNestJs from '@darraghor/eslint-plugin-nestjs-typed'
import eslintPluginJs from '@eslint/js'
import { defineConfig } from 'eslint/config'
import eslintTypescript from 'typescript-eslint'

export default defineConfig(
  eslintPluginJs.configs.recommended,
  eslintTypescript.configs.recommended,
  eslintPluginNestJs.configs.flatNoSwagger,
  { ignores: ['dist/**', 'node_modules/**', 'eslint.config.ts'] },
  {
    languageOptions: {
      parser: eslintTypescript.parser,
      sourceType: 'module',
      parserOptions: { warnOnUnsupportedTypeScriptVersion: false }
    }
  }
)
