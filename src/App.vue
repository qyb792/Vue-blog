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
    },
  },
  created() {
    console.log(
      '%c 邱同学的小破站 %c v1.0.0 %c',
      'background: #35495e; padding: 1px; border-radius: 3px 0 0 3px; color: #fff',
      'background: #41b883; padding: 1px; border-radius: 0 3px 3px 0; color: #fff',
      'background: transparent'
    );
    // 获取博客信息
    this.getBlogInfo();
    // 上传访客信息
    request.post('/report');
  },
  methods: {
    getBlogInfo() {
      request('/').then(({ data }) => {
        this.$store.commit('checkBlogInfo', data);
      });
    },
  },
};
</script>
