
import { createLocalVue, shallowMount } from '@vue/test-utils'

import { createEl, bind } from './utils'
import { directive, classNames } from '@/lib/lettering'
import plugin from '@/lib'

describe('directive', () => {
  it('has an inserted function', () => {
    expect(typeof directive.inserted).toBe('function')
  })
  it('has a componentUpdated function', () => {
    expect(typeof directive.componentUpdated).toBe('function')
  })

  describe('vue lifecycle', () => {
    const localVue = createLocalVue()
    localVue.use(plugin)
    const component = localVue.component('test', {
      data: () => ({ text: 'Foo' }),
      template: '<h1 v-lettering>{{ text }}</h1>'
    })
    const wrapper = shallowMount(component)

    it('renders correctly on mount', () => {
      expect(wrapper.element.children.length).toBe(3)
    })

    it('renders correctly on update', async () => {
      wrapper.setData({ text: 'Foobar' })
      await localVue.nextTick()

      expect(wrapper.element.children.length).toBe(6)
    })
  })

  it('complies with the WAI-ARIA guidelines', () => {
    const { el, text } = createEl()

    bind(el)

    expect(el.getAttribute('aria-label')).toBe(text)
    expect(el.querySelectorAll('[aria-hidden=true]').length).toBe(text.length)
  })

  describe('options', () => {
    let el: HTMLElement
    let text: string

    beforeEach(() => {
      const root = createEl()
      el = root.el
      text = root.text
    })

    it('can be set globally', () => {
      jest.resetModules()
      const localPlugin = require('@/lib/index').default
      const { defaults } = require('@/lib/lettering')
      const localVue = createLocalVue()

      localVue.use(localPlugin, { tagName: 'div' })

      expect(defaults.tagName).toBe('div')
    })

    describe('tagName', () => {
      const tagName = 'a'

      it('can be set with binding value object', () => {
        bind(el, { value: { tagName } })

        const childNodes = Array.from(el.childNodes)
        const deviantChildExist = childNodes.some(c => c.nodeName.toLowerCase() !== tagName)

        expect(deviantChildExist).toBeFalsy()
        expect(childNodes.length).toBe(text.length)
      })

      it('can be set with modifier', () => {
        bind(el, { modifiers: { [tagName]: true } })

        const childNodes = Array.from(el.childNodes)
        const deviantChildExist = childNodes.some(c => c.nodeName.toLowerCase() !== tagName)

        expect(deviantChildExist).toBeFalsy()
        expect(childNodes.length).toBe(text.length)
      })

      it('defaults to <span>', () => {
        bind(el)

        expect(el.querySelectorAll('span').length).toBe(text.length)
      })
    })

    describe('splits', () => {
      it('can be set with binding value (string)', () => {
        bind(el, { value: '' })

        expect(el.childNodes.length).toBe(text.length)
      })

      it('can be set with binding value (array)', () => {
        bind(el, { value: [''] })

        expect(el.childNodes.length).toBe(text.length)
      })

      it('supports single split', () => {
        const { el } = createEl('Foo bar')

        bind(el, { value: { splits: [' '] } })

        expect(el.childNodes.length).toBe(2)
        expect(el.childNodes[0].textContent).toBe('Foo')
        expect(el.childNodes[1].textContent).toBe('bar')
      })

      it('supports RegExp', () => {
        bind(el, { value: { splits: [/(\s+)/] } })

        expect(el.childNodes.length).toBe(3)
      })

      it('supports recursive splits', () => {
        const { el } = createEl('Do it')

        bind(el, { value: { splits: [' ', ''] } })

        /**
         * DOM tree should look like this:
         *
         * #
         *  -
         *    - D
         *    - o
         *  -
         *    - i
         *    - t
         */
        expect(el.childNodes.length).toBe(2)
        expect(el.childNodes[0].childNodes.length).toBe(2)
        expect(el.childNodes[0].childNodes[0].textContent).toBe('D')
        expect(el.childNodes[0].childNodes[1].textContent).toBe('o')
        expect(el.childNodes[1].childNodes.length).toBe(2)
        expect(el.childNodes[1].childNodes[0].textContent).toBe('i')
        expect(el.childNodes[1].childNodes[1].textContent).toBe('t')
      })
    })

    describe('char', () => {
      it('can add a prefix', () => {
        const { el } = createEl('Foo')

        bind(el, { value: { char: (char) => `_${char}` } })

        const childNodes = Array.from(el.childNodes)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        expect(childNodes.some(c => !c.textContent!.startsWith('_'))).toBeFalsy()
      })
    })

    describe('className', () => {
      const className = 'test-class'

      it('set as string', () => {
        bind(el, { value: { className } })

        expect(el.querySelectorAll(`.${className}`).length).toBe(text.length)
      })

      it('set as function', () => {
        bind(el, { value: { className: () => className } })

        expect(el.querySelectorAll(`.${className}`).length).toBe(text.length)
      })
    })

    describe('classNameInjection', () => {
      it('can disable group class name', () => {
        bind(el, { value: { classNameInjection: { group: false } } })

        expect(el.querySelectorAll(classNames.group).length).toBe(0)
      })

      it('can disable level class name', () => {
        const { el } = createEl('Foo bar')

        bind(el, { value: { classNameInjection: { level: false } } })

        expect(el.querySelectorAll(classNames.level(1)).length).toBe(0)
      })

      it('can disable index class name', () => {
        const { el } = createEl('Foo bar')

        bind(el, { value: { classNameInjection: { index: false } } })

        expect(el.querySelectorAll(classNames.index(1)).length).toBe(0)
      })
    })

    describe('beforeAppend', () => {
      it('can modify child nodes', () => {
        bind(el, {
          value: {
            beforeAppend: (node) => {
              node.dataset.tested = '1'
            }
          }
        })

        expect(el.querySelectorAll('[data-tested="1"]').length).toBe(text.length)
      })
    })
  })
})
