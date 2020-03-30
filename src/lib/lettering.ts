import { DirectiveBinding } from 'vue/types/options'
import { VNode } from 'vue/types'

type RegExpOrString = RegExp | string;
type Splits = RegExpOrString | RegExpOrString[];
type StringOrNull = string | null;
type ClassNameModifier = (index: number, level: number, char: string) => StringOrNull;

export interface VueLetteringOptions {
  /**
   * HTML tag name
   * @default span
   */
  tagName: string;

  /**
   * Array of character split arguments (may be recursive)
   * @default ['']
   */
  splits: Splits;

  /**
   * Modify character callback
   * @default null
   */
  char: (char: string) => string;

  /**
   * Set custom class names on groups
   * @default null
   */
  className: ClassNameModifier | StringOrNull;

  /**
   * Enable helper class names injection
   */
  classNameInjection: Partial<{
    /**
     * vl__group class name
     * @default true
     */
    group: boolean;

    /**
     * vl__level-x class name
     * @default true
     */
    level: boolean;

    /**
     * vl__index-x class name
     * @default true
     */
    index: boolean;
  }>;

  /**
   * Before append hook
   */
  beforeAppend?: (element: HTMLElement, index: number, level: number) => unknown;
}

// Default plugin options
export const defaults: VueLetteringOptions = {
  tagName: 'span',
  splits: [''],
  char: (text) => text.replace(' ', '&nbsp;'),
  className: null,
  classNameInjection: {
    group: true,
    level: true,
    index: true
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setDefaultOption = (key: keyof VueLetteringOptions, value: any) => {
  defaults[key] = value
}

export const classNames = {
  group: 'vl__g',
  level: (n: number) => `vl--lvl-${n}`,
  index: (n: number) => `vl--i-${n}`
}

/**
 * Directive inserted callback
 * @param el HTML element
 * @param binding Vue directive binding
 * @param vnode Vue VNode
 */
const inserted = (el: HTMLElement, binding: DirectiveBinding, vnode: VNode) => {
  const text = (vnode.children && vnode.children[0].text) || ''

  // Create options object
  let bindingValue = binding.value
  if (bindingValue !== undefined && typeof bindingValue !== 'object') bindingValue = { splits: bindingValue }

  const options: VueLetteringOptions = { ...defaults, ...bindingValue }
  options.tagName = Object.keys(binding.modifiers)[0] || options.tagName

  // Create array/function if strings are provided
  const splits = !Array.isArray(options.splits) ? [options.splits] : options.splits
  const setClassName = typeof options.className !== 'function' ? (() => options.className) as ClassNameModifier : options.className

  // Create and append character subelements
  el.innerHTML = ''
  el.setAttribute('aria-label', text)

  /**
   * Run recursive split functions
   * @param el Parent element
   * @param groups List of character groups
   * @param level Current recursion depth
   */
  const runSplit = (el: HTMLElement, groups: string[], level = 1) => {
    // Check if all leafs are found
    if (level > splits.length) {
      // Add character
      el.innerHTML = options.char(groups[0])

      // Return leaf element
      return
    }

    // Create new element for each character group
    groups.forEach((group, index) => {
      const subEl = document.createElement(options.tagName)
      el.append(subEl)

      if (level === 1)
        subEl.setAttribute('aria-hidden', 'true')

      // Set custom class name if provided
      const className = setClassName(index + 1, level, group)
      if (className) subEl.classList.add(className)

      // Inject helper class names
      if (options.classNameInjection.group) subEl.classList.add(classNames.group)
      if (options.classNameInjection.level && splits.length > 1) subEl.classList.add(classNames.level(level))
      if (options.classNameInjection.index) subEl.classList.add(classNames.index(index + 1))

      // Run beforeAppend hook
      if (options.beforeAppend) options.beforeAppend(subEl, index + 1, level)

      // Split another level
      runSplit(subEl, group.split(splits[level]), level + 1)
    })
  }

  // Initiate split
  runSplit(el, text.split(splits[0]))
}

export const directive = {
  inserted,
  componentUpdated: inserted
}
