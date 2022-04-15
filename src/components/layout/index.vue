<template>
  <div id="body-wrap">
    <!-- 顶部导航条 -->
    <top-nav-bar @isLogin="isLogin" />

    <!-- 主要内容区 -->
    <app-main />
    <!-- 回到顶部等工具 -->
    <back-top />
    <!-- 网站底部 -->
    <Footer />
    <Aplayer v-if="blogInfo.websiteConfig.isMusicPlayer == 1" />

    <LoginModel />

    <SearchModel />
  </div>
</template>

<script>
import TopNavBar from '@/components/layout/component/TopNavBar';
import AppMain from '@/components/layout/component/AppMain';
import BackTop from '@/components/BackTop';
import Footer from '@/components/layout/component/Footer';
import Aplayer from '@/components/aplayer';
import LoginModel from '@/components/model/LoginModel';
import SearchModel from '@/components/model/SearchModel';

export default {
  components: {
    TopNavBar,
    AppMain,
    BackTop,
    Footer,
    Aplayer,
    LoginModel,
    SearchModel,
  },
  data() {
    return {
      username: '',
      password: '',
      isLoginDialog: false,
    };
  },
  computed: {
    blogInfo() {
      return this.$store.state.blogInfo;
    },
  },
  created() {
    // this.$store.dispatch('blog/getBlogInfo')
  },
  methods: {
    isLogin() {
      this.isLoginDialog = true;
    },
  },
};
</script>

<style lang="less" scoped>

.login-btn {
  width: 100%;
  margin-top: 20px !important;
}
</style>
