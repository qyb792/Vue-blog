<template>
  <el-dialog
    :visible="emailFlag"
    :fullscreen="isMobile"
    width="460px"
    destroy-on-close
    :before-close="handleClose"
    top="20vh"
  >
    <el-form
      ref="form"
      :label-position="'top'"
      label-width="80px"
      style="border-radius: 4px"
    >
      <el-form-item prop="email" label="邮箱号">
        <el-input
          v-model="email"
          placeholder="请输入邮箱号"
          clearable
          @keyup.enter="register"
        />
      </el-form-item>
      <el-form-item prop="email" style="margin-top: 50px">
        <el-input
          placeholder="请输入6位验证码"
          v-model="code"
          @keyup.enter="register"
          class="yzm"
        >
          <!-- <template slot="append">
            <el-button text small :disabled="flag" @click="sendCode">
              {{ codeMsg }}
            </el-button>
          </template> -->
        </el-input>
        <el-button
          type="text"
          small
          :disabled="flag"
          @click="sendCode"
          style="width: 16%"
        >
          {{ codeMsg }}
        </el-button>
      </el-form-item>

      <!-- 按钮 -->
      <div style="width: 100%">
        <el-button
          class="login-btn"
          style="width: 100%; margin-top: 40px"
          type="primary"
          @click="saveUserEmail"
          >绑 定</el-button
        >
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import request from '@/utils/request';
export default {
  data: function () {
    return {
      email: this.$store.state.email,
      code: '',
      flag: true,
      codeMsg: '发送',
      time: 60,
      show: false,
    };
  },
  methods: {
    handleClose() {
      this.$store.state.emailFlag = false;
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
              params: { username: that.email },
            })
            .then((data) => {
              if (data.flag) {
                that.$message({ type: 'success', message: data.data.message });
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
    saveUserEmail() {
      var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!reg.test(this.email)) {
        this.$message({ type: 'error', message: '邮箱格式不正确' });
        return false;
      }
      if (this.code.trim().length !== 6) {
        this.$message({ type: 'error', message: '请输入6位验证码' });
        return false;
      }
      const user = {
        email: this.email,
        code: this.code,
      };
      request.post('/users/email', user).then((data) => {
        if (data.flag) {
          this.$store.commit('saveEmail', this.email);
          this.email = '';
          this.code = '';
          this.$store.commit('closeModel');
          this.$message({ type: 'success', message: data.data.message });
        } else {
          this.$message({ type: 'error', message: data.data.message });
        }
      });
    },
  },
  computed: {
    emailFlag: {
      set(value) {
        this.$store.state.emailFlag = value;
      },
      get() {
        return this.$store.state.emailFlag;
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
    email(value) {
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

<style scoped lang="less">
@media (min-width: 760px) {
  .login-container {
    padding: 1rem;
    border-radius: 4px;
    height: 400px;
  }
}

.el-form-item {
  .yzm {
    width: 83%;
  }
}
</style>
