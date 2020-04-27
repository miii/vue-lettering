import Vue from 'vue'
import VueLettering from '@miii/vue-lettering'

Vue.use(VueLettering, <%= serialize(options) %>)

// Hide any loading element
if (process.client)
  document.head.insertAdjacentHTML('beforeend', '<style>[data-lettering="loading"] { visibility: hidden }</style>');
