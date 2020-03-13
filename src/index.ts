import { VueConstructor, PluginObject } from 'vue'
import { bind, VueLetteringOptions, defaults } from './lettering'

declare global {
  interface Window {
    Vue: VueConstructor;
  }
}

const version = '__VERSION__'

const install = (Vue: VueConstructor, options?: VueLetteringOptions): void => {
  if (options)
    Object.keys(options).forEach((key) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      defaults[key] = options[key]
    })

  Vue.directive('lettering', { bind })
}

const plugin: PluginObject<VueLetteringOptions> = {
  install,
  version
}
export default plugin

if (typeof window !== 'undefined' && window.Vue)
  window.Vue.use(plugin)
