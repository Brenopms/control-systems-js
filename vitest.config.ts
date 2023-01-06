/// <reference types="vitest" />

// Configure Vitest (https://vitest.dev/config/)

import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    coverage: {
      reporter: ['html', 'json'],
    },
    /* for example, use global to avoid globals imports (describe, test, expect): */
    // globals: true,
  },
});
