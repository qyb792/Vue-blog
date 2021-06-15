import Vue from 'vue'
import App from './App.vue'
import moment from 'moment'
import router from './router'
import store from './store'
import './plugins/element.js'

import './styles/markdown.css'

// 引入自定义组件中的自定义从插件
import Component from '@/components'
Vue.use(Component) // 注册自己的插件

import { vueBaberrage } from 'vue-baberrage'
Vue.use(vueBaberrage)

import '@/styles/index.css'
import '@/styles/darkmode.css' // 夜间模式css
import '@/assets/fonts/iconfont.css'
import './plugins/element.js'
import 'highlight.js/styles/atom-one-dark.css'
import animated from 'animate.css'
Vue.use(animated)

Vue.config.productionTip = false

Vue.filter('date', function(value) {
  return moment(value).format('YYYY-MM-DD')
})

import hevueImgPreview from 'hevue-img-preview'
Vue.use(hevueImgPreview)

import APlayer from '@moefe/vue-aplayer'
Vue.use(APlayer, {
  defaultCover: 'https://github.com/u3u.png',
  productionTip: true
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

// 路由的前置守卫
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = '邱同学的小破站 - ' + to.meta.title
  }
  next()
})

router.afterEach(() => {
  window.scrollTo({
    top: 0,
    behavior: 'instant'
  })
})

