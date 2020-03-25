import { VueConstructor, PluginObject } from 'vue'
import { version } from '../../package.json'
import { directive, VueLetteringOptions, setDefaultOption } from './lettering'

declare global {
  interface Window {
    Vue: VueConstructor;
  }
}

const install = (Vue: VueConstructor, options?: Partial<VueLetteringOptions>): void => {
  // Merge options
  if (options)
    (Object.keys(options) as Array<keyof VueLetteringOptions>)
      .forEach((key) => setDefaultOption(key, options[key]))

  Vue.directive('lettering', directive)
}

const plugin: PluginObject<Partial<VueLetteringOptions>> = {
  install,
  version
}
export default plugin

if (typeof window !== 'undefined' && window.Vue)
  window.Vue.use(plugin)
