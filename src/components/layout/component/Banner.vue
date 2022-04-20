<template>
  <div id="nav" class="full-page" :style="cover">
    <!-- 头图中间文字 -->
    <div id="site-info">
      <div id="site_title" class="zoomIn animated">
        {{ bannerTitle }}
      </div>
      <!-- <div id="site_subtitle">
        <span id="subtitle" />
        <span class="typed-cursor typed-cursor--blink">|</span>
        <div id="clock" />
      </div> -->
      <div class="blog-intro">
        {{ obj.output }} <span class="typed-cursor">|</span>
      </div>

      <div class="blog-contact">
        <a
          v-if="isShowSocial('qq')"
          class="mr-5 iconfont iconqq"
          target="_blank"
          :href="
            'http://wpa.qq.com/msgrd?v=3&uin=' +
            blogInfo.websiteConfig.qq +
            '&site=qq&menu=yes'
          "
        />
        <a
          v-if="isShowSocial('github')"
          target="_blank"
          :href="blogInfo.websiteConfig.github"
          class="mr-5 iconfont icongithub"
        />
        <a
          v-if="isShowSocial('gitee')"
          target="_blank"
          :href="blogInfo.websiteConfig.gitee"
          class="iconfont icongitee-fill-round"
        />
      </div>
    </div>
    <!-- 下拉按钮 -->
    <div id="scroll_down" @click="scrollDown">
      <i class="el-icon-arrow-down scroll-down-effects" />
    </div>

    <div>
      <slot name="articleTitle" />
    </div>
  </div>
</template>

<script>
import request from '@/utils/request';
import EasyTyper from 'easy-typer-js';
export default {
  data: function () {
    return {
      tip: false,
      time: '',
      obj: {
        output: '',
        isEnd: false,
        speed: 300,
        singleBack: false,
        sleep: 0,
        type: 'rollback',
        backSpeed: 40,
        sentencePause: true,
      },
      articleList: [],
      talkList: [],
      current: 1,
    };
  },
  props: {
    bannerTitle: {
      type: String,
      default: '',
    },
    bannerImg: {
      type: String,
      required: true,
    },
  },
  computed: {
    isShowSocial() {
      return function (social) {
        return this.blogInfo.websiteConfig.socialUrlList.indexOf(social) !== -1;
      };
    },
    cover() {
      let cover = '';
      this.$store.state.blogInfo.pageList.forEach((item) => {
        if (item.pageLabel === 'home') {
          cover = item.pageCover;
        }
      });
      return 'background: url(' + cover + ') center center / cover no-repeat';
    },
    blogInfo() {
      return this.$store.state.blogInfo;
    },
  },

  created() {
    this.init();
    this.listHomeTalks();
    this.timer = setInterval(this.runTime, 1000);
  },
  methods: {
    // 初始化
    init() {
      document.title = this.blogInfo.websiteConfig.websiteName;
      // 一言Api进行打字机循环输出效果
      fetch('https://v1.hitokoto.cn?c=i')
        .then((res) => {
          return res.json();
        })
        .then(({ hitokoto }) => {
          this.initTyped(hitokoto);
        });
    },
    listHomeTalks() {
      request('/home/talks').then(({ data }) => {
        this.talkList = data;
      });
    },
    initTyped(input, fn, hooks) {
      const obj = this.obj;
      // eslint-disable-next-line no-unused-vars
      const typed = new EasyTyper(obj, input, fn, hooks);
    },
    scrollDown() {
      window.scrollTo({
        behavior: 'smooth',
        // 获取当前元素的高度
        top: document.documentElement.clientHeight,
      });
    },
  },
};
</script>

<style lang="less" scoped>
@media (max-width: 759px) {
  #site_title {
    font-size: 26px;
  }
  .blog-contact {
    font-size: 1.25rem;
    line-height: 2;
    text-align: center;
    & > a {
      color: #fff;
    }
  }
}

@media (min-width: 760px) {
  #site_title {
    font-size: 2.5rem;
  }

  .blog-intro {
    font-size: 1.5rem;
  }

  .blog-contact {
    display: none;
  }
}
</style>

<style>
/* 首页头图 */
.full-page {
  height: 100vh;
  background-attachment: fixed;
}
.article-banner {
  height: 400px !important;
}

.is-shadow:before {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  content: '';
}

.blog-intro {
  text-align: center;
  color: #fff;
}

.zoomIn {
  animation-name: zoomIn;
}

.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}

.mr-5 {
  margin-right: 20px;
}

/* 博客首页头图下方按钮的样式 */
.full-page #scroll_down {
  position: absolute;
  bottom: 0;
  width: 100%;
  cursor: pointer;
}

/* 首页下跳按钮动画绑定 */
.scroll-down-effects {
  -webkit-animation: scroll-down-effect 1.5s infinite;
  -moz-animation: scroll-down-effect 1.5s infinite;
  -o-animation: scroll-down-effect 1.5s infinite;
  -ms-animation: scroll-down-effect 1.5s infinite;
  animation: scroll-down-effect 1.5s infinite;
}

.full-page #scroll_down .scroll-down-effects {
  position: relative;
  width: 100%;
  font-size: 1.5rem;
  color: #eee;
  text-align: center;
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.15);
  line-height: 1.5;
}
@keyframes scroll-down-effect {
  0% {
    top: 0;
    opacity: 0.4;
  }
  50% {
    top: -16px;
    opacity: 1;
    -ms-filter: none;
    filter: none;
  }
  100% {
    top: 0;
    opacity: 0.4;
  }
}

#site-info {
  position: absolute;
  top: 43%;
  padding: 0 10px;
  width: 100%;
}

/* 到达某个位置后上滑后顶部导航栏的css样式 */
#page-header.visible {
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -o-transition: all 0.5s;
  -ms-transition: all 0.5s;
  transition: all 0.5s;
  -webkit-transform: translate3d(0, 100%, 0);
  -moz-transform: translate3d(0, 100%, 0);
  -o-transform: translate3d(0, 100%, 0);
  -ms-transform: translate3d(0, 100%, 0);
  transform: translate3d(0, 100%, 0);
}

#page-header.fixed {
  position: fixed;
  top: -60px;
  z-index: 101;
  background: rgba(255, 255, 255, 0.8);
  -webkit-box-shadow: 0 5px 6px -5px rgba(133, 133, 133, 0.6);
  box-shadow: 0 5px 6px -5px rgba(133, 133, 133, 0.6);
  -webkit-transition: -webkit-transform 0.2s ease-in-out,
    opacity 0.2s ease-in-out;
  -moz-transition: -moz-transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
  -o-transition: -o-transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
  -ms-transition: -ms-transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
  transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
}

#page-header.fixed a,
#page-header.fixed #site-name,
#page-header.fixed .toggle-menu {
  color: #4c4948;
  text-shadow: none;
}

.pull_left {
  float: left;
}

#page-header #site-name {
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.15);
  font-weight: bold;
  cursor: pointer;
}

#page-header a {
  color: #eee;
}

.pull_right {
  float: right;
}

/* 非xxx选择器 */
#page-header:not(.fixed) .menus {
  padding-right: 0 !important;
}

/* 顶部导航条菜单样式 */
#page-header .menus_items {
  display: inline;
}

#page-header .toggle-menu {
  display: none;
  padding: 2px 0 0 6px;
  vertical-align: top;
}

#page-header .menus_items .menus_item {
  position: relative;
  display: inline-block;
  padding: 0 0 0 14px;
}

#page-header .site-page {
  position: relative;
  padding-bottom: 6px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  font-size: 14px;
  cursor: pointer;
}

#page-header .menus_items .menus_item a:after {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: -1;
  width: 0;
  height: 3px;
  background-color: #80c8f8;
  content: '';
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

#page-header .menus_items .menus_item a:hover:after {
  width: 100%;
}

/* 首页头图中间信息的css样式 */
#site-info #site_title {
  color: #eee;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15);
  line-height: 1.5;
  font-size: 40px;
}

.full-page #site-info #site_subtitle {
  color: #eee;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15);
  line-height: 1.5;
  font-size: 24px;
}

.full-page #site-info #subtitle {
  color: #eee;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15);
  line-height: 1.5;
  font-size: 24px;
}

</style>
