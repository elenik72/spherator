import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import html from '@rollup/plugin-html'
import css from 'rollup-plugin-import-css'
import { promises as fs } from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'public', 'index.html')

const linkReplacement = path => `<link rel="stylesheet" href="${path}">`
const scriptReplacement = path => `<script src="${path}" type="module"></script>`

export default {
  input: 'src/generator.mjs',
  output: {
    format: 'es',
    dir: 'dist',
    entryFileNames: 'bundle-[hash].js',
  },
  plugins: [
    commonjs(),
    terser(),
    css(),
    html({
      template: async ({ files }) => {
        try {
          const html = await fs.readFile(filePath, 'utf-8')

          const jsFiles = files.js?.reduce(
            (coll, chunk) => coll.concat('\n' + scriptReplacement(chunk.fileName)), '')
          const cssFiles = files.css?.reduce(
            (coll, chunk) => coll.concat('\n' + linkReplacement(chunk.fileName)), '')
          const updatedHtml = html
            .replace('%link%', cssFiles)
            .replace('%script%', jsFiles)

          return updatedHtml
        } catch (error) {
          console.error('Ошибка при чтении файла:', error)
        }
      }
    }),
  ]
}
