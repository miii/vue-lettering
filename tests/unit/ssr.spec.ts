import { VNode } from 'vue'
import { bindSSR } from '@/lib/lettering.ssr'

describe('SSR directive', () => {
  it('sets the data-lettering attribute', () => {
    const vnode = {
      context: {
        $attrs: {}
      }
    }

    bindSSR(vnode as VNode)

    // @ts-ignore
    expect(vnode.context.$attrs['data-lettering']).toBe('loading')
  })
})
