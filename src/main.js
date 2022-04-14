import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import dayjs from 'dayjs';
import VueImageSwipe from 'vue-image-swipe';
import 'vue-image-swipe/dist/vue-image-swipe.css';

import './styles/markdown.css'

// 引入自定义组件中的自定义从插件
import Component from '@/components'
Vue.use(Component) // 注册自己的插件

import { vueBaberrage } from 'vue-baberrage'
Vue.use(vueBaberrage)

Vue.use(VueImageSwipe);

import '@/styles/index.css'
import '@/styles/darkmode.css' // 夜间模式css
import '@/assets/fonts/iconfont.css'
import './plugins/element.js'
import 'highlight.js/styles/atom-one-dark.css'
import animated from 'animate.css'
Vue.use(animated)

Vue.config.devtools = true

Vue.config.productionTip = false

Vue.filter('date', function(value) {
  return dayjs(value).format('YYYY-MM-DD');
});

Vue.filter('year', function(value) {
  return dayjs(value).format('YYYY');
});

Vue.filter('hour', function(value) {
  return dayjs(value).format('HH:mm:ss');
});

Vue.filter('time', function(value) {
  return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
});

Vue.filter('num', function(value) {
  if (value >= 1000) {
    return (value / 1000).toFixed(1) + 'k';
  }
  return value;
});

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

import '@/permission'
