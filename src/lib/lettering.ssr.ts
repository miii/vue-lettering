import { VNode } from 'vue/types'

export const bindSSR = (vnode: VNode) => {
  if (vnode.context?.$attrs)
    vnode.context.$attrs['data-lettering'] = 'loading'
}
