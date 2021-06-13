import Vue from 'vue'
import App from './App.vue'
import moment from 'moment'
import router from './router'
import store from './store'
import './plugins/element.js'

// 引入自定义组件中的自定义从插件
import Component from '@/components'
Vue.use(Component) // 注册自己的插件

import '@/styles/index.css'
import '@/styles/darkmode.css' // 夜间模式css
import '@/assets/fonts/iconfont.css'
import './plugins/element.js'

Vue.config.productionTip = false

Vue.filter('date', function(value) {
  return moment(value).format('YYYY-MM-DD')
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
