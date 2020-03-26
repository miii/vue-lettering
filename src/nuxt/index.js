import { resolve } from 'path'

export default function VueLetteringModule (moduleOptions) {
  const options = Object.assign({}, this.options.lettering, moduleOptions)

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'vue-lettering.js',
    options
  })
}

module.exports.meta = require('../../package.json')
