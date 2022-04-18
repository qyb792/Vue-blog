<template>
  <el-dialog
    :visible="registerFlag"
    :fullscreen="isMobile"
    width="460px"
    destroy-on-close
    :before-close="handleClose"
    top="15vh"
  >
    <el-form ref="form" :label-position="'top'" label-width="80px">
      <el-form-item prop="email">
        <el-input
          v-model="username"
          placeholder="请输入邮箱号"
          clearable
          @keyup.enter="login"
        />
      </el-form-item>
      <el-form-item prop="email">
        <el-input placeholder="请输入6位验证码" v-model="code">
          <template slot="append">
            <el-button text small :disabled="flag" @click="sendCode">
              {{ codeMsg }}
            </el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
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
          type="danger"
          @click="sendCode"
          >注 册</el-button
        >
      </div>
      <!-- 注册和忘记密码 -->
      <div class="btnlist">
        <el-button @click="openLogin" type="text">已有账号？登录</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import request from '@/utils/request';
export default {
  data: function () {
    return {
      username: '',
      code: '',
      password: '',
      flag: true,
      codeMsg: '发送',
      time: 60,
      show: false,
    };
  },
  methods: {
    handleClose() {
      this.$store.state.registerFlag = false;
    },
    openLogin() {
      this.$store.state.registerFlag = false;
      this.$store.state.loginFlag = true;
    },
    sendCode() {
      const that = this;
      // eslint-disable-next-line no-undef
      var captcha = new TencentCaptcha(this.config.TENCENT_CAPTCHA, function (
        res
      ) {
        if (res.ret === 0) {
          //发送邮件
          that.countDown();
          request
            .get('/users/code', {
              params: { username: that.username },
            })
            .then((data) => {
              if (data.flag) {
                that.$message({ type: 'success', message: '发送成功' });
              } else {
                that.$message({ type: 'error', message: data.data.message });
              }
            });
        }
      });
      // 显示验证码
      captcha.show();
    },
    countDown() {
      this.flag = true;
      this.timer = setInterval(() => {
        this.time--;
        this.codeMsg = this.time + 's';
        if (this.time <= 0) {
          clearInterval(this.timer);
          this.codeMsg = '发送';
          this.time = 60;
          this.flag = false;
        }
      }, 1000);
    },
    register() {
      var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!reg.test(this.username)) {
        this.$message({ type: 'error', message: '邮箱格式不正确' });
        return false;
      }
      if (this.code.trim().length !== 6) {
        this.$message({ type: 'error', message: '请输入6位验证码' });
        return false;
      }
      if (this.password.trim().length < 6) {
        this.$message({ type: 'error', message: '密码不能少于6位' });
        return false;
      }
      const user = {
        username: this.username,
        password: this.password,
        code: this.code,
      };
      request.post('/register', user).then((data) => {
        if (data.flag) {
          let param = new URLSearchParams();
          param.append('username', user.username);
          param.append('password', user.password);
          request.post('/login', param).then((data) => {
            this.username = '';
            this.password = '';
            this.$store.commit('login', data.data.data);
            this.$store.commit('closeModel');
          });
          this.$message({ type: 'success', message: '登录成功' });
        } else {
          this.$message({ type: 'error', message: data.data.message });
        }
      });
    },
  },
  computed: {
    registerFlag: {
      set(value) {
        this.$store.state.registerFlag = value;
      },
      get() {
        return this.$store.state.registerFlag;
      },
    },
    isMobile() {
      const clientWidth = document.documentElement.clientWidth;
      if (clientWidth > 960) {
        return false;
      }
      return true;
    },
  },
  watch: {
    username(value) {
      var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (reg.test(value)) {
        this.flag = false;
      } else {
        this.flag = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.btnlist {
  margin-top: 10px;
}
</style>
