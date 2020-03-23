import { VueConstructor, PluginObject } from 'vue'
import { version } from '../../package.json'
import { defaults, directive, PartialVueLetteringOptions } from './lettering'
declare global {
  interface Window {
    Vue: VueConstructor;
  }
}

const install = (Vue: VueConstructor, options?: PartialVueLetteringOptions): void => {
  if (options)
    Object.keys(options).forEach((key) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      defaults[key] = options[key]
    })

  Vue.directive('lettering', directive)
}

const plugin: PluginObject<PartialVueLetteringOptions> = {
  install,
  version
}
export default plugin

if (typeof window !== 'undefined' && window.Vue)
  window.Vue.use(plugin)
