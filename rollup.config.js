import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import del from 'rollup-plugin-delete'
import replace from 'rollup-plugin-replace'
import copy from 'rollup-plugin-copy'

import moment from 'moment'
import pkg from './package.json'

const name = 'vue-lettering'
const moduleName = 'VueLettering'
const banner = '/*\n' +
  `* ${pkg.name}\n` +
  `* Version: ${pkg.version} (${moment().format('YYYY-MM-DD')})\n` +
  `* Author: ${pkg.author}\n` +
  `* License: ${pkg.license}\n` +
  '*/'

const defaultOutput = {
  banner,
  exports: 'named',
  sourcemap: true
}

export default [
  {
    input: 'src/lib/index.ts',
    external: Object.keys(pkg.dependencies || []),
    output: [
      {
        file: `dist/${name}.esm.js`,
        format: 'es',
        ...defaultOutput
      },
      {
        file: `dist/${name}.common.js`,
        format: 'cjs',
        ...defaultOutput
      },
      {
        file: `dist/${name}.umd.js`,
        format: 'umd',
        ...defaultOutput,
        name: moduleName
      },
      {
        file: `dist/${name}.umd.min.js`,
        format: 'umd',
        ...defaultOutput,
        name: moduleName,
        plugins: [
          terser({
            output: {
              comments: (_, comment) => /@miii/.test(comment.value)
            }
          })
        ]
      }
    ],
    plugins: [
      del({ targets: 'dist/' }),
      typescript(),
      json(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ]
  },
  {
    input: 'src/nuxt/index.ts',
    external: Object.keys(pkg.dependencies || []),
    output: [
      {
        file: 'dist/nuxt/index.js',
        format: 'es',
        ...defaultOutput
      }
    ],
    plugins: [
      typescript(),
      json(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      copy({
        targets: [
          {
            src: 'src/nuxt/plugin.js',
            dest: 'dist/nuxt'
          }
        ]
      })
    ]
  }
]
