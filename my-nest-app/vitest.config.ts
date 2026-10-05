import { defineConfig } from 'vitest/config';
import swc from 'unplugin-swc';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.spec.ts'],
  },
  plugins: [
    // Required for NestJS dependency injection decorators (@Injectable, @Controller, etc.)
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
});
