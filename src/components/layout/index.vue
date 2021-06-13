<template>
  <div id="body-wrap">
    <!-- 顶部导航条 -->
    <top-nav-bar />

    <!-- 主要内容区 -->
    <app-main />
    <!-- 回到顶部等工具 -->
    <back-top />
    <!-- 网站底部 -->
    <Footer />
  </div>
</template>

<script>

import TopNavBar from '@/components/layout/component/TopNavBar'
import AppMain from '@/components/layout/component/AppMain'
import BackTop from '@/components/BackTop'
import Footer from '@/components/layout/component/Footer'
export default {

  components: {
    TopNavBar,
    AppMain,
    BackTop,
    Footer
  },
  created() {
    this.$store.dispatch('blog/getBlogInfo')
  }
}
</script>

<style>

</style>
