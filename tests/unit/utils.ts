
import { directive, VueLetteringOptions } from '@/lib/lettering'
import { DirectiveBinding } from 'vue/types/options'

interface PluginBinding extends DirectiveBinding {
  value: Partial<VueLetteringOptions> | VueLetteringOptions['splits'];
}

/**
 * Direcive bind wrapper
 * @param el Element to bind
 * @param binding Directive binding
 */
export const bind = (el: HTMLElement, binding: Partial<PluginBinding> = {}) => {
  return directive.inserted(el, {
    modifiers: {},
    name: 'lettering',
    ...binding
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
