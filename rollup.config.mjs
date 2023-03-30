import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'

export default [
  {
    input: 'src/index.ts',
    external: ['@capacitor/cli/dist/tasks/run', '@capacitor/cli/dist/tasks/build', '@capacitor/cli/dist/config', '@capacitor/cli/dist/tasks/sync', 'inquirer'],
    output: {
      format: 'cjs',
      file: `dist/index.js`,
    },
    plugins: [
      esbuild(),
    ],
  },
  {
    input: 'src/index.ts',
    external: ['@capacitor/cli/dist/tasks/run', '@capacitor/cli/dist/tasks/build', '@capacitor/cli/dist/config'],
    output: {
      file: 'dist/index.d.ts',
      format: 'es',
    },
    plugins: [
      dts(),
    ],
  }
]
