<template>
  <div>
    <!-- banner -->
    <SmallBanner title="个人中心" :articleCover="cover" />
    <div class="layout">
      <div id="page">
        <div>
          <span class="info-title">基本信息</span>
        </div>
        <el-row class="info-wrapper">
          <el-col
            :xs="24"
            :lg="8"
            style="display: flex; justify-content: center"
          >
            <a id="pick-avatar">
              <el-avatar :size="140">
                <img :src="this.$store.state.avatar" />
              </el-avatar>
            </a>
            <avatar-cropper
              @uploaded="uploadAvatar"
              trigger="#pick-avatar"
              upload-url="/api/users/avatar"
            />
          </el-col>

          <el-col :xs="24" :lg="16">
            <el-form aria-labelledby="top" :model="userInfo">
              <el-form-item label="昵称">
                <el-input
                  placeholder="请输入您的昵称"
                  v-model="userInfo.nickname"
                />
              </el-form-item>
              <el-form-item label="个人网站">
                <el-input
                  v-model="userInfo.webSite"
                  placeholder="http://你的网址"
                />
              </el-form-item>
              <el-form-item label="简介">
                <el-input v-model="userInfo.intro" placeholder="介绍下自己吧" />
              </el-form-item>

              <div v-if="loginType != 0">
                <el-form-item label="邮箱号">
                  <el-input
                    placeholder="请输入邮箱号"
                    v-model="email"
                    :disabled="true"
                  >
                    <template slot="append">
                      <el-button
                        v-if="email"
                        type="primary"
                        small
                        @click="openEmailModel"
                      >
                        修改绑定
                      </el-button>
                      <el-button
                        v-else
                        type="primary"
                        small
                        @click="updataUserInfo"
                      >
                        绑定邮箱
                      </el-button>
                    </template>
                  </el-input>
                </el-form-item>
              </div>
              <el-button @click="updataUserInfo">修改</el-button>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import AvatarCropper from 'vue-avatar-cropper';
import request from '@/utils/request';
export default {
  components: { AvatarCropper },
  data: function () {
    return {
      userInfo: {
        nickname: this.$store.state.nickname,
        intro: this.$store.state.intro,
        webSite: this.$store.state.webSite,
        loginType: this.$store.state.loginType,
      },
    };
  },
  methods: {
    updataUserInfo() {
      request.put('/users/info', this.userInfo).then((data) => {
        if (data.flag) {
          this.$store.commit('updateUserInfo', this.userInfo);
          this.$message({ type: 'success', message: '修改成功' });
        } else {
          this.$message({ type: 'error', message: data.data.message });
        }
      });
    },
    uploadAvatar(data) {
      if (data.flag) {
        this.$store.commit('updateAvatar', data.data.data);
        this.$message({ type: 'success', message: '上传成功' });
      } else {
        this.$message({ type: 'error', message: data.data.message });
      }
    },
    openEmailModel() {
      this.$store.state.emailFlag = true;
    },
  },
  computed: {
    email() {
      return this.$store.state.email;
    },
    loginType() {
      return this.$store.state.loginType;
    },
    cover() {
      var cover = '';
      this.$store.state.blogInfo.pageList.forEach((item) => {
        if (item.pageLabel === 'user') {
          cover = item.pageCover;
        }
      });
      return 'background: url(' + cover + ') center center / cover no-repeat';
    },
  },
};
</script>

<style scoped>
.info-title {
  font-size: 1.25rem;
  font-weight: bold;
}
.info-wrapper {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
#pick-avatar {
  outline: none;
  transition: all 0.5s;
}

#pick-avatar:hover {
  transform: rotateZ(540deg);
}

.binding {
  display: flex;
  align-items: center;
}
</style>
