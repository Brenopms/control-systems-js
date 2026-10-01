import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json', 'lcov'],
      thresholds: {
        lines: 75,
        statements: 75,
      },
    },
    include: ['src/**/*.{test,spec}.ts'],
  },
});
