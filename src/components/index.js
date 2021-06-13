import Banner from './layout/component/Banner.vue'
import AsideContent from './layout/component/AsideContent.vue'
export default {
  install(Vue) {
    Vue.component('Banner', Banner) // 顶部Banner
    Vue.component('AsideContent', AsideContent) // 侧边栏
  }
}

