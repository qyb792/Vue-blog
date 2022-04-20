import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element.js';
import dayjs from 'dayjs';
import VueImageSwipe from 'vue-image-swipe';
import 'vue-image-swipe/dist/vue-image-swipe.css';
import NProgress from 'nprogress';

import Share from 'vue-social-share';

import mavonEditor from 'mavon-editor';
Vue.use(mavonEditor);

import config from './assets/js/config';

import 'mavon-editor/dist/css/index.css';
import 'highlight.js/styles/atom-one-dark.css';
import 'nprogress/nprogress.css';
import './styles/markdown.less';
import './assets/css/vue-social-share/client.css';
import '@/styles/darkmode.less'; // 夜间模式css
import '@/styles/index.less';
import '@/assets/fonts/iconfont.css';
import './plugins/element.js';


// 引入自定义组件中的自定义从插件
import Component from '@/components';
Vue.use(Component); // 注册自己的插件

import { vueBaberrage } from 'vue-baberrage';

import animated from 'animate.css';
Vue.use(animated);
Vue.use(vueBaberrage);

Vue.use(VueImageSwipe);
Vue.use(Share);

Vue.prototype.config = config;

Vue.config.devtools = true;

Vue.config.productionTip = false;

Vue.filter('date', function (value) {
  return dayjs(value).format('YYYY-MM-DD');
});

Vue.filter('year', function (value) {
  return dayjs(value).format('YYYY');
});

Vue.filter('hour', function (value) {
  return dayjs(value).format('HH:mm:ss');
});

Vue.filter('time', function (value) {
  return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
});

Vue.filter('num', function (value) {
  if (value >= 1000) {
    return (value / 1000).toFixed(1) + 'k';
  }
  return value;
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

router.afterEach(() => {
  window.scrollTo({
    top: 0,
    behavior: 'instant',
  });
  NProgress.done();
});

import hevueImgPreview from 'hevue-img-preview';
Vue.use(hevueImgPreview);

import APlayer from '@moefe/vue-aplayer';
Vue.use(APlayer, {
  defaultCover: 'https://github.com/u3u.png',
  productionTip: true,
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

import '@/permission';
