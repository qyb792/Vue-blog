<template>
  <div
    id="nav"
    class="full-page"
    :class="{ 'article-banner': isArticleBanner, 'is-shadow': isArticleBanner }"
    :style="{backgroundImage: 'url(' + bannerImg + ')' }"
  >
    <!-- 头图中间文字 -->
    <div id="site-info">
      <h1 id="site_title">
        {{ bannerTitle }}
      </h1>
      <div v-if="!isArticleBanner" id="site_subtitle">
        <span id="subtitle" />
        <span class="typed-cursor typed-cursor--blink">|</span>
        <div id="clock" />
      </div>
    </div>
    <!-- 下拉按钮 -->
    <div v-if="!isArticleBanner" id="scroll_down" @click="scrollDown">
      <i class="el-icon-arrow-down scroll-down-effects" />
    </div>

    <div>
      <slot name="articleTitle" />
    </div>
  </div>
</template>

<script>
export default {

  props: {
    bannerTitle: {
      type: String,
      default: ''
    },
    bannerImg: {
      type: String,
      required: true
    },
    article: {
      type: Object,
      default: () => {
        return {}
      }
    }

  },
  computed: {

    isArticleBanner() {
      return this.bannerTitle !== '邱同学のblog'
    }
  },

  created() {
    // console.log(this.articleInfo)
  },
  methods: {
    // 初始化
    scrollDown() {
      window.scrollTo({
        behavior: 'smooth',
        // 获取当前元素的高度
        top: document.documentElement.clientHeight
      })
      // console.log(document.documentElement.clientHeight)
    }
  }
}
</script>

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
    background-color: rgba(0,0,0,.5);
    content: '';
}

</style>
