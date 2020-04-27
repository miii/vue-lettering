import { PluginObject, DirectiveOptions } from 'vue'
import { VueLetteringOptions } from '../src/lib/lettering'

export {
  VueLetteringOptions
}

declare const _default: PluginObject<Partial<VueLetteringOptions>> & DirectiveOptions
export default _default

declare module '@nuxt/types/config/index' {
  interface Configuration {
    lettering?: Partial<VueLetteringOptions>;
  }
}
