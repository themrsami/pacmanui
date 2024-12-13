import { defineConfig } from 'tsup'
import aliasPath from 'esbuild-plugin-alias-path'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ['react', 'react-dom'],
  esbuildPlugins: [
    aliasPath({
      alias: {
        '@': '.'
      }
    })
  ]
})
