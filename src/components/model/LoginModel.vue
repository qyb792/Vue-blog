<template>
  <div>
    <el-dialog
      :visible="loginFlag"
      :fullscreen="isMobile"
      width="460px"
      destroy-on-close
      :before-close="handleClose"
      top="15vh"
    >
      <el-form ref="form" :label-position="'top'" label-width="80px">
        <el-form-item prop="email" label="邮箱号">
          <el-input
            v-model="username"
            placeholder="请输入邮箱号"
            clearable
            @keyup.enter="login"
          />
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="password"
            label="密码"
            placeholder="请输入密码"
            show-password
            @keyup.enter="login"
          />
        </el-form-item>
        <div style="width: 100%">
          <el-button
            class="login-btn"
            style="width: 100%"
            type="primary"
            @click="login"
            >登 录</el-button
          >
        </div>
        <!-- 注册和忘记密码 -->
        <div class="btnlist">
          <el-button @click="openRegister" type="text">注册账号</el-button>
          <el-button @click="openForget" type="text">忘记密码?</el-button>
        </div>

        <div v-if="socialLoginList.length > 0">
          <div class="social-login-title">社交账号登录</div>
          <div class="social-login-wrapper">
            <!-- 微博登录 -->
            <a
              v-if="showLogin('weibo')"
              class="iconfont iconweibo"
              style="color: #e05244; margin-right: 5px;"
              @click="weiboLogin"
            />
            <!-- qq登录 -->
            <a
              v-if="showLogin('qq')"
              class="iconfont iconqq"
              style="color: #00aaee"
              @click="qqLogin"
            />
          </div>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/utils/request';
export default {
  data: function () {
    return {
      username: '',
      password: '',
      show: false,
    };
  },
  computed: {
    loginFlag: {
      set(value) {
        this.$store.state.loginFlag = value;
      },
      get() {
        return this.$store.state.loginFlag;
      },
    },
    isMobile() {
      const clientWidth = document.documentElement.clientWidth;
      if (clientWidth > 960) {
        return false;
      }
      return true;
    },
    socialLoginList() {
      return this.$store.state.blogInfo.websiteConfig.socialLoginList;
    },
    showLogin() {
      return function (type) {
        return this.socialLoginList.indexOf(type) !== -1;
      };
    },
  },
  methods: {
    handleClose() {
      this.$store.state.loginFlag = false;
    },
    openRegister() {
      this.$store.state.loginFlag = false;
      this.$store.state.registerFlag = true;
    },
    openForget() {
      this.$store.state.loginFlag = false;
      this.$store.state.forgetFlag = true;
    },
    login() {
      var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!reg.test(this.username)) {
        this.$message({ type: 'error', message: '邮箱格式不正确' });
        return false;
      }
      if (this.password.trim().length === 0) {
        this.$message({ type: 'error', message: '密码不能为空' });

        return false;
      }
      const that = this;
      // eslint-disable-next-line no-undef
      var captcha = new TencentCaptcha(this.config.TENCENT_CAPTCHA, function (
        res
      ) {
        if (res.ret === 0) {
          // 发送登录请求
          const param = new URLSearchParams();
          param.append('username', that.username);
          param.append('password', that.password);
          request.post('/login', param).then((data) => {
            if (data.flag) {
              that.username = '';
              that.password = '';
              that.$store.commit('login', data.data);
              that.$store.commit('closeModel');
              that.$message({
                type: 'success',
                message: '登录成功',
              });
            } else {
              that.$message({
                type: 'error',
                message: data.data.message,
              });
            }
          });
        }
      });
      // 显示验证码
      captcha.show();
    },
    qqLogin() {
      // 保留当前路径
      this.$store.commit('saveLoginUrl', this.$route.path);
      if (
        navigator.userAgent.match(
          /(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i
        )
      ) {
        // eslint-disable-next-line no-undef
        QC.Login.showPopup({
          appId: this.config.QQ_APP_ID,
          redirectURI: this.config.QQ_REDIRECT_URI,
        });
      } else {
        window.open(
          'https://graph.qq.com/oauth2.0/show?which=Login&display=pc&client_id=' +
            +this.config.QQ_APP_ID +
            '&response_type=token&scope=all&redirect_uri=' +
            this.config.QQ_REDIRECT_URI,
          '_self'
        );
      }
    },
    weiboLogin() {
      // 保留当前路径
      this.$store.commit('saveLoginUrl', this.$route.path);
      window.open(
        'https://api.weibo.com/oauth2/authorize?client_id=' +
          this.config.WEIBO_APP_ID +
          '&response_type=code&redirect_uri=' +
          this.config.WEIBO_REDIRECT_URI,
        '_self'
      );
    },
  },
};
</script>

<style lang="less" scoped>
.social-login-title {
  margin-top: 1.5rem;
  color: #b5b5b5;
  font-size: 0.75rem;
  text-align: center;
}
.social-login-title::before {
  content: '';
  display: inline-block;
  background-color: #d8d8d8;
  width: 60px;
  height: 1px;
  margin: 0 12px;
  vertical-align: middle;
}
.social-login-title::after {
  content: '';
  display: inline-block;
  background-color: #d8d8d8;
  width: 60px;
  height: 1px;
  margin: 0 12px;
  vertical-align: middle;
}
.social-login-wrapper {
  margin-top: 1rem;
  font-size: 2rem;
  text-align: center;
}
.social-login-wrapper a {
  text-decoration: none;
}

.btnlist {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}
</style>
