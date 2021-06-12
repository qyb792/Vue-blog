import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

import '@/styles/index.css'
import '@/styles/darkmode.css' // 夜间模式css
import '@/assets/fonts/iconfont.css'
import './plugins/element.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
