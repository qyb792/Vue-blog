<template>
  <div>
    <!-- banner -->
    <div class="message-banner">
      <!-- 弹幕输入框 -->
      <div class="message-container">
        <h1 class="message-title">留言板</h1>
        <div class="animated fadeInUp message-input-wrapper">
          <input
            v-model="messageContent"
            placeholder="说点什么吧"
            @click="show = true"
          >
          <button
            v-show="show"
            class="ml-3 animate__animated animate__backInLeft"
            @click="addToList"
          >
            发送
          </button>
        </div>
      </div>
      <!-- 弹幕列表 -->
      <div class="barrage-container">
        <vue-baberrage :barrage-list="barrageList" :loop="true">
          <template v-slot:default="slotProps">
            <span class="barrage-items">
              <img
                :src="slotProps.item.avatar"
                width="30"
                height="30"
                style="border-radius:50%"
              >
              <span class="ml-2">{{ slotProps.item.nickname }} :</span>
              <span class="ml-2">{{ slotProps.item.messageContent }}</span>
            </span>
          </template>
        </vue-baberrage>
      </div>
    </div>
  </div>
</template>

<script>
import { getMessageList, addMessages } from '@/api/message';
export default {
  data() {
    return {
      show: false,
      messageContent: '',
      barrageList: []
    };
  },
  mounted() {
    this.listMessage();
  },
  methods: {
    addToList() {
      if (this.messageContent.trim() === '') {
        this.$message.error('留言不能为空');
        return false;
      }
      const userAvatar = this.$store.getters.loginAvatar
        ? this.$store.getters.loginAvatar
        : 'https://cdn.jsdelivr.net/gh/zytqyb/Image-hosting@master/hexo_blog_img/y8qpqk.3hdi9olrkc80.jpg';
      const userNickname = this.$store.getters.loginNickname
        ? this.$store.getters.loginNickname
        : '游客';
      var message = {
        avatar: userAvatar,
        nickname: userNickname,
        messageContent: this.messageContent,
        time: Math.floor(Math.random() * 10 + 3)
      };
      this.barrageList.push(message);
      this.messageContent = '';
      addMessages(message);
    },
    async listMessage() {
      const result = await getMessageList();
      if (result.success) {
        this.barrageList = result.data;
      }
    }
  }
};
</script>

<style>
.ismessage {
  left: 0px;
  right: 0px;
  bottom: 0px;
  background: rgba(0, 0, 0, 0);
}

.message-banner {
  position: absolute;
  left: 0;
  right: 0;
  height: 100vh;
  background: url(https://cdn.jsdelivr.net/gh/zytqyb/Image-hosting@master/hexo_blog_img/2.ltk83vjvvlc.jpg) center center /
    cover no-repeat;
  background-color: #49b1f5;
  animation: header-effect 1s;
}
.message-title {
  color: #eee;
  animation: title-scale 1s;
}
.message-container {
  position: absolute;
  width: 360px;
  top: 35%;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 5;
  margin: 0 auto;
  color: #fff;
}
.message-input-wrapper {
  display: flex;
  justify-content: center;
  height: 2.5rem;
  margin-top: 2rem;
}
.message-input-wrapper input {
  outline: none;
  width: 252px;
  border-radius: 20px;
  height: 40px;
  padding: 0 1.25rem;
  color: #fff;
  border: #fff 1px solid;
  background: transparent;
}
.message-input-wrapper input::-webkit-input-placeholder {
  color: #eeee;
}
.message-input-wrapper button {
  border-radius: 20px;
  width: 70px;
  height: 40px;
  margin-left: 20px;
  color: #fff;
  border: 1px #fff solid;
  background: transparent;
}
.barrage-container {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  height: calc(100% -50px);
  width: 100%;
}
.barrage-items {
  background: rgb(0, 0, 0, 0.7);
  border-radius: 100px;
  color: #fff;
  padding: 5px 10px 5px 5px;
  align-items: center;
  display: flex;
}

#footer {
  position: absolute !important;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background: rgba(0, 0, 0, 0);
}
</style>
