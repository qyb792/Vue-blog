<template>
  <div id="body-wrap">
    <!-- 顶部导航条 -->
    <top-nav-bar @isLogin="isLogin" />

    <!-- 主要内容区 -->
    <app-main />
    <!-- 回到顶部等工具 -->
    <back-top />

    <LoginModel />

    <!-- 注册模态框 -->
    <RegisterModel />
    <!-- 找回密码模态框 -->
    <ForgetModel />

    <!-- 绑定邮箱模态框 -->
    <EmailModel></EmailModel>

    <!-- 聊天室 -->
    <ChatRoom v-if="blogInfo.websiteConfig.isChatRoom == 1"></ChatRoom>

    <Aplayer v-if="blogInfo.websiteConfig.isMusicPlayer == 1" />

    <SearchModel />
    <!-- 网站底部 -->
    <Footer v-if="isShow" />
  </div>
</template>

<script>
import TopNavBar from '@/components/layout/component/TopNavBar';
import AppMain from '@/components/layout/component/AppMain';
import BackTop from '@/components/BackTop';
import Footer from '@/components/layout/component/Footer';
import Aplayer from '@/components/Aplayer';
import LoginModel from '@/components/model/LoginModel';
import SearchModel from '@/components/model/SearchModel';
import RegisterModel from '@/components/model/RegisterModel';
import ForgetModel from '@/components/model/ForgetModel';
import EmailModel from '@/components/model/EmailModel';
import ChatRoom from '@/components/ChatRoom';
export default {
  components: {
    TopNavBar,
    AppMain,
    BackTop,
    Footer,
    Aplayer,
    LoginModel,
    SearchModel,
    RegisterModel,
    ForgetModel,
    EmailModel,
    ChatRoom,
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
    isShow() {
      return this.$route.name !== 'message';
    },
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
