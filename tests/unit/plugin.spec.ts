import { createLocalVue } from '@vue/test-utils'
import { VueConstructor } from 'vue'

import plugin from '@/lib/index'

interface VueConstructorWithOptions extends VueConstructor<Vue> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any;
}

describe('vue plugin', () => {
  it('includes install function', () => {
    expect(typeof plugin.install).toBe('function')
  })

  it('installs the v-lettering directive', () => {
    const localVue = createLocalVue() as VueConstructorWithOptions
    localVue.use(plugin)

    expect(localVue.options.directives).toHaveProperty('lettering')
  })

  it('auto-installs to existing Vue instance', () => {
    const localVue = createLocalVue() as VueConstructorWithOptions

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.Vue = localVue

    jest.resetModules()
    // Expect side effects
    require('@/lib/index')

    expect(localVue.options.directives).toHaveProperty('lettering')
  })
})
