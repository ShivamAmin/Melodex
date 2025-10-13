import { FlatCompat } from '@eslint/eslintrc'
 
const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})
 
const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript'],
    ignorePatterns: ["**/lib/generated/**", "**/node_modules/**", "**/out/**", "**/.next/**", "**/dist/**"],
  }),
]
 
export default eslintConfig
