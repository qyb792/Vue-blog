import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

// 引入需要的css
import '@/styles/index.css'
import '@/styles/darkmode.css' // 夜间模式css
import '@/assets/fonts/iconfont.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
