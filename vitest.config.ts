import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['html', 'json'],
      thresholds: {
        lines: 75,
        statements: 75,
      },
    },
    include: ['src/**/*.{test,spec}.ts'],
  },
});
