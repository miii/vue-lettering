import { readFileSync } from 'fs'
import { transformSync } from '@babel/core'
import template from 'lodash/template'

import nuxtModule from '@/nuxt'

describe('nuxt module', () => {
  describe('index.js', () => {
    it('exports a module', () => {
      expect(typeof nuxtModule).toBe('function')
    })

    it('adds plugin.js as a nuxt plugin', () => {
      const addPlugin = jest.fn()

      // @ts-ignore
      nuxtModule.apply({
        options: {},
        addPlugin
      })
      const addPluginArgs = addPlugin.mock.calls[0][0]

      expect(addPluginArgs.src).toMatch(/plugin\.js$/)
    })

    it('merges inline and explicit options', () => {
      const addPlugin = jest.fn()
      const optionsA = { tagName: 'a' }
      const optionsB = { className: 'b' }

      // @ts-ignore
      nuxtModule.apply({
        options: { lettering: optionsA },
        addPlugin
      }, [optionsB])
      const addPluginArgs = addPlugin.mock.calls[0][0]

      expect(addPluginArgs.options).toMatchObject(optionsA)
      expect(addPluginArgs.options).toMatchObject(optionsB)
    })
  })

  describe('plugin.js', () => {
    it('registers the plugin with passed options', () => {
      jest.mock('vue')
      jest.mock('@miii/vue-lettering', () => ({ fake: true }), { virtual: true })
      const Vue = require('vue')
      const serialize = obj => JSON.stringify(obj)
      const options = { isFakeOptions: true }
      const pluginFile = readFileSync(require.resolve('@/nuxt/plugin.js'), 'utf-8')
      const compiledPlugin = template(pluginFile)({ serialize, options })
      const transpiledCode = transformSync(compiledPlugin).code

      // eslint-disable-next-line no-eval
      eval(transpiledCode)

      expect(Vue.use.mock.calls[0][0]).toEqual({ fake: true })
      expect(Vue.use.mock.calls[0][1]).toEqual(options)
      jest.resetModules()
    })
  })
})
