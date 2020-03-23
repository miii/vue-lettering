import Vue from 'vue'
import plugin from './lib'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(plugin)

new Vue({
  render: h => h(App)
}).$mount('#app')
