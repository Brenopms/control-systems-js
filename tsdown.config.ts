import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  target: 'es2017',
  outExtensions: ({ format }) => (format === 'es' ? { js: '.mjs', dts: '.d.mts' } : { js: '.cjs', dts: '.d.cts' }),
  exports: true,
});
