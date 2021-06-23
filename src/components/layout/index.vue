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
    <aplayer />
    <el-dialog title="登录" :visible.sync="isLoginDialog" width="40%" center>
      <el-form ref="form" :label-position="'top'" label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="username" placeholder="请输入账号" clearable />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="password" placeholder="请输入密码" show-password />
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-btn"
            type="primary"
            @click="login"
          >登 录</el-button>
        </el-form-item>
        <!-- 注册和忘记密码 -->
        <el-form-item class="btnlist">
          <el-button type="text">注册账号</el-button>
          <el-button type="text">忘记密码?</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import TopNavBar from '@/components/layout/component/TopNavBar'
import AppMain from '@/components/layout/component/AppMain'
import BackTop from '@/components/BackTop'
import Footer from '@/components/layout/component/Footer'
import aplayer from '@/components/aplayer'

import { login } from '@/api/user'
export default {
  components: {
    TopNavBar,
    AppMain,
    BackTop,
    Footer,
    aplayer
  },
  data() {
    return {
      username: '',
      password: '',
      isLoginDialog: false
    }
  },
  computed: {},
  created() {
    this.$store.dispatch('blog/getBlogInfo')
  },
  methods: {
    isLogin() {
      this.isLoginDialog = true
    },
    async login() {
      // var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (this.username.length === 0) {
        this.$message.error('用户名不能为空')
        return false
      }
      if (this.password.trim().length === 0) {
        this.$message.error('密码不能为空')
        return false
      }
      const param = {
        username: this.username,
        password: this.password
      }
      const result = await login(param)
      console.log(result)
      if (result.success) {
        this.username = ''
        this.password = ''
        this.$store.dispatch('blog/login', result.user.user)
        this.isLoginDialog = false
      }
    }
  }
}
</script>

<style>
.btnlist .el-form-item__content {
  display: flex;
  justify-content: space-between;
}

.login-btn {
  width: 100%;
  margin-top: 20px !important;
}

.el-dialog__wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
}

.el-dialog {
  margin-top: 30vh !important;
}
</style>
