import { resolve } from 'path'
import { VueLetteringOptions } from '@/lib/lettering'
import { bindSSR } from '@/lib/lettering.ssr'

/**
 * Create object path if not exists
 * @param {object} root Root object
 * @param {string} path Target path
 * @param {function} callback Callback after target was found
 */
const getObj = (root: any, path: string, callback: (obj: any) => any) => {
  let obj = root
  path.split('.').forEach(p => {
    if (!obj[p])
      obj[p] = {}

    obj = obj[p]
  })

  return callback(obj)
}

/**
 * Nuxt module
 */
export default function VueLetteringModule (this: any, moduleOptions?: Partial<VueLetteringOptions>) {
  const options = Object.assign({}, this.options.lettering, moduleOptions)

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'vue-lettering.js',
    options
  })

  getObj(this.options, 'render.bundleRenderer.directives', (directives) => {
    directives.lettering = bindSSR
  })
}

module.exports.meta = require('../../package.json')
