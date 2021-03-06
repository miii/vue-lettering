
import { createLocalVue } from '@vue/test-utils'

import { createEl, bind, createComponent } from './utils'
import { directive, classNames } from '@/lib/lettering'

describe('directive', () => {
  it('has an bind function', () => {
    expect(typeof directive.bind).toBe('function')
  })
  it('has a componentUpdated function', () => {
    expect(typeof directive.componentUpdated).toBe('function')
  })

  describe('vue lifecycle', () => {
    describe('using slot', () => {
      const { wrapper, localVue } = createComponent('<h1 v-lettering>{{ text }}</h1>')

      it('renders groups on mount', () => {
        expect(wrapper.element.children.length).toBe(3)
      })

      it('re-renders groups on update', async () => {
        wrapper.setData({ text: 'Foobar' })
        await localVue.nextTick()

        expect(wrapper.element.children.length).toBe(6)
      })
    })

    describe('using v-text', () => {
      const { wrapper, localVue } = createComponent('<h1 v-lettering v-text="text" />')

      it('renders groups on mount', () => {
        expect(wrapper.element.children.length).toBe(3)
      })

      it('re-renders groups on update', async () => {
        wrapper.setData({ text: 'Foobar' })
        await localVue.nextTick()

        expect(wrapper.element.children.length).toBe(6)
      })
    })
  })

  it('does not break if empty text content', () => {
    const { el } = createEl('')

    bind(el)

    expect(el.innerHTML.length).toBe(0)
  })

  it('complies with the WAI-ARIA guidelines', () => {
    const { el, text } = createEl()

    bind(el)

    expect(el.getAttribute('aria-label')).toBe(text)
    expect(el.querySelectorAll('[aria-hidden=true]').length).toBe(text.length)
  })

  it('does not override existing aria-label', () => {
    const { el } = createEl()
    el.setAttribute('aria-label', 'test')

    bind(el)

    expect(el.getAttribute('aria-label')).toBe('test')
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

      it('can be set as string', () => {
        bind(el, { value: { className } })

        expect(el.querySelectorAll(`.${className}`).length).toBe(text.length)
      })

      it('can be set as function', () => {
        bind(el, { value: { className: () => className } })

        expect(el.querySelectorAll(`.${className}`).length).toBe(text.length)
      })
    })

    describe('classNameInjection', () => {
      it('can disable group class name', () => {
        bind(el, { value: { classNameInjection: { group: false } } })

        expect(el.querySelectorAll(`.${classNames.group}`).length).toBe(0)
        expect(el.querySelectorAll(`.${classNames.index(1)}`).length).toBeGreaterThan(0)
      })

      it('can disable level class name', () => {
        const { el } = createEl('Foo bar')

        bind(el, { value: { classNameInjection: { level: false } } })

        expect(el.querySelectorAll(`.${classNames.level(1)}`).length).toBe(0)
        expect(el.querySelectorAll(`.${classNames.index(1)}`).length).toBeGreaterThan(0)
      })

      it('can disable index class name', () => {
        const { el } = createEl('Foo bar')

        bind(el, { value: { classNameInjection: { index: false } } })

        expect(el.querySelectorAll(`.${classNames.index(1)}`).length).toBe(0)
        expect(el.querySelectorAll(`.${classNames.group}`).length).toBeGreaterThan(0)
      })

      it('can disable all class names with value: false', () => {
        bind(el, { value: { classNameInjection: false } })

        expect(el.querySelectorAll(`.${classNames.group}`).length).toBe(0)
        expect(el.querySelectorAll(`.${classNames.index(1)}`).length).toBe(0)
        expect(el.querySelectorAll(`.${classNames.level(1)}`).length).toBe(0)
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
