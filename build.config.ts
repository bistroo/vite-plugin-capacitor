import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    {
      input: 'src/index.ts',
      outDir: 'dist',
      format: 'esm',
    },
    {
      input: 'src/index.ts',
      outDir: 'dist',
      format: 'cjs',
      ext: 'cjs',
    },
  ],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
    esbuild: {
      minify: true,
    },
  },
})
