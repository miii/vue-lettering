import { VueConstructor, PluginObject } from 'vue'
import { bind } from './lettering'

declare global {
  interface Window {
    Vue: VueConstructor;
  }
}

const version = '__VERSION__'

const install = (Vue: VueConstructor): void => {
  Vue.directive('lettering', { bind })
}

const plugin: PluginObject<VueConstructor> = {
  install,
  version
}
export default plugin

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}
