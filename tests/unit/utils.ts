import { DirectiveBinding } from 'vue/types/options'
import { VNode } from 'vue/types/umd'
import { createLocalVue, shallowMount } from '@vue/test-utils'

import { directive, VueLetteringOptions } from '@/lib/lettering'
import plugin from '@/lib'

interface PluginBinding extends DirectiveBinding {
  value: Partial<VueLetteringOptions> | VueLetteringOptions['splits'];
}

/**
 * Direcive bind wrapper
 * @param el Element to bind
 * @param binding Directive binding
 */
export const bind = (el: HTMLElement, binding: Partial<PluginBinding> = {}, vnode: Partial<VNode> = {}) => {
  return directive.inserted(el, {
    modifiers: {},
    name: 'lettering',
    ...binding
  }, {
    // @ts-ignore
    children: [{ text: el.textContent || '' }],
    ...vnode
  })
}

/**
 * Create element with text content
 * @param text Custom text
 */
export const createEl = (text = 'Foo bar') => {
  const el = document.createElement('h1')
  el.textContent = text

  return { el, text }
}

/**
 * Create component and shallow mount it
 * @param template Template to render
 * @param data Set component data
 */
export const createComponent = (template: string, data: unknown = { text: 'Foo' }) => {
  const localVue = createLocalVue()
  localVue.use(plugin)
  const component = localVue.component('test', {
    data: () => data,
    template
  })
  const wrapper = shallowMount(component)

  return { localVue, component, wrapper }
}
