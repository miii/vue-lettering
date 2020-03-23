import { DirectiveBinding } from 'vue/types/options'

type RegExpOrString = RegExp | string;
type Splits = RegExpOrString | RegExpOrString[];
type StringOrNull = string | null;
type ClassNameModifier = (index: number, level: number, char: string) => StringOrNull;

interface VueLetteringOptions {
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
  classNameInjection: {
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
  };

  /**
   * Before append hook
   */
  beforeAppend?: (element: HTMLElement, index: number, level: number) => unknown;
}
export type PartialVueLetteringOptions = Partial<VueLetteringOptions>

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

/**
 * Directive bind callback
 * @param el HTML element
 * @param binding Vue directive binding
 */
const bind = (el: HTMLElement, binding: DirectiveBinding) => {
  // Get text contnet
  const text = el.textContent?.trim() || ''

  // Create options object
  let bindingValue = binding.value
  if (Array.isArray(bindingValue)) bindingValue = { splits: bindingValue }

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
      if (options.classNameInjection.group) subEl.classList.add('vl__g')
      if (options.classNameInjection.level && splits.length > 1) subEl.classList.add(`vl--lvl-${level}`)
      if (options.classNameInjection.index) subEl.classList.add(`vl--i-${index + 1}`)

      // Run beforeAppend hook
      if (options.beforeAppend) options.beforeAppend(el, index + 1, level)

      // Split another level
      runSplit(subEl, group.split(splits[level]), level + 1)
    })
  }

  // Initiate split
  runSplit(el, text.split(splits[0]))
}

export const directive = {
  bind
}
