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
      // console.log(document.documentElement.clientHeight)
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
  background-image: url('~@/assets/img/bg.jpg');
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
</style>
