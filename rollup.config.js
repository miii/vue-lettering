import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import del from 'rollup-plugin-delete'
import replace from 'rollup-plugin-replace'

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

export default [
  {
    input: 'src/lib/index.ts',
    external: Object.keys(pkg.dependencies || []),
    output: [
      {
        file: `dist/${name}.esm.js`,
        format: 'es',
        banner
      },
      {
        file: `dist/${name}.common.js`,
        format: 'cjs',
        banner
      },
      {
        file: `dist/${name}.umd.js`,
        format: 'umd',
        banner,
        name: moduleName
      },
      {
        file: `dist/${name}.umd.min.js`,
        format: 'umd',
        banner,
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
  }
]
