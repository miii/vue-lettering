import { PluginObject, DirectiveOptions } from 'vue'
import { VueLetteringOptions } from '../src/lib/lettering'

export {
  VueLetteringOptions
}

declare const _default: PluginObject<Partial<VueLetteringOptions>> & DirectiveOptions
export default _default
