<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import request from './utils/request';
export default {
  name: 'App',
  computed: {
    blogInfo() {
      return this.$store.state.blogInfo;
    },
    isMobile() {
      const flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    }
  },
  created() {
    // 获取博客信息
    this.getBlogInfo();
    // 上传访客信息
    request.post('/report');
  },
  methods: {
    getBlogInfo() {
      request('/').then((data) => {
        console.log(data);
        this.$store.commit('checkBlogInfo', data);
      });
    }
  }
};
</script>
