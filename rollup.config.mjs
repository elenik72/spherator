import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import html from '@rollup/plugin-html'
import css from "rollup-plugin-import-css"

export default {
  input: 'src/generator.mjs',
  output: {
    file: 'dist/bundle.js',
    format: 'es',
  },
  plugins: [
    commonjs(),
    terser(),
    css(),
    html({ title: 'Spherator' }),
  ]
}
