import Banner from './layout/component/Banner.vue';
import AsideContent from './layout/component/AsideContent.vue';
import SmallBanner from './layout/component/SmallBanner.vue';
export default {
  install(Vue) {
    Vue.component('Banner', Banner); // 顶部Banner
    Vue.component('AsideContent', AsideContent); // 侧边栏
    Vue.component('SmallBanner', SmallBanner);
  },
};
