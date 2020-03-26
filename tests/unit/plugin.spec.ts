import { createLocalVue } from '@vue/test-utils'

import plugin from '@/lib/index'

describe('vue plugin', () => {
  it('includes install function', () => {
    expect(typeof plugin.install).toBe('function')
  })

  it('installs the v-lettering directive', () => {
    const localVue = createLocalVue()
    localVue.use(plugin)

    // @ts-ignore
    expect(localVue.options.directives).toHaveProperty('lettering')
  })

  it('auto-installs to existing Vue instance', () => {
    const localVue = createLocalVue()
    window.Vue = localVue

    jest.resetModules()
    // Expect side effects
    require('@/lib/index')

    // @ts-ignore
    expect(localVue.options.directives).toHaveProperty('lettering')
  })
})
