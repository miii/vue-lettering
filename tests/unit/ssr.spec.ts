import { VNode } from 'vue'
import { bindSSR } from '@/lib/lettering.ssr'

describe('SSR directive', () => {
  it('sets the data-lettering attribute', () => {
    const vnode: {
      context: {
        $attrs: Record<string, string>
      }
    } = {
      context: {
        $attrs: {}
      }
    }

    bindSSR(vnode as VNode)

    expect(vnode.context.$attrs['data-lettering']).toBe('loading')
  })
})
