import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [
          {
            group: ['**/slides/css/*', '**/slides/*.html'],
            message: 'Legacy slides/ is deprecated. Use theme.ts.',
          },
          {
            group: ['puppeteer', 'puppeteer-core', 'playwright', '@playwright/*'],
            message: 'Playwright/Puppeteer is deprecated. Use Remotion.',
          },
        ],
      }],
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  { ignores: ['node_modules/', '.remotion/', 'public/assets/', 'src/legacy/**'] }
);
