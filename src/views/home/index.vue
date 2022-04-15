<template>
  <div>
    <!-- banner -->
    <banner
      :banner-title="blogInfo.websiteConfig.websiteName"
      :banner-img="blogInfo.websiteConfig.websiteName"
    />
    <main id="content-inner" class="layout_page">
      <!-- 文章展示模块外部容器 -->
      <div class="recent-posts">
        <div class="animated zoomIn card" v-if="talkList.length > 0">
          <Swiper :list="talkList" />
        </div>

        <!-- 首页文章列表展示 -->
        <HomeArticleItem
          v-for="(article, i) in articleList"
          :key="article.articleId"
          :article="article"
          :index="i"
        />

        <el-pagination
          :current-page.sync="current"
          :page-size="10"
          background
          layout="prev, pager, next, jumper"
          :total="this.blogInfo.articleCount"
          @current-change="handleCurrentChange"
        />
      </div>
      <!-- 右侧菜单 -->
      <aside-content />
    </main>
  </div>
</template>

<script>
import EasyTyper from 'easy-typer-js';
import HomeArticleItem from './components/HomeArticleItem';
import request from '@/utils/request';
import Swiper from '@/components/Swiper';
export default {
  name: 'Home',
  components: {
    HomeArticleItem,
    Swiper,
  },
  data: () => ({
    articleList: [], // 文章列表
    current: 1, // 当前页数
    talkList: [],
  }),

  created() {
    this.listHomeTalks();
    this.getArticleList();
  },
  computed: {
    blogInfo() {
      return this.$store.state.blogInfo;
    },
  },
  methods: {
    async getArticleList() {
      let md = require('markdown-it')();
      const { data } = await request('/articles', {
        params: {
          current: this.current,
        },
      });
      if (data.length) {
        // 去除markdown标签
        data.forEach((item) => {
          item.articleContent = md
            .render(item.articleContent)
            .replace(/<\/?[^>]*>/g, '')
            .replace(/[|]*\n/, '')
            .replace(/&npsp;/gi, '');
        });
        this.articleList.push(...data);
      }
    },
    // 初始化
    init() {
      document.title = this.blogInfo.websiteConfig.websiteName;
      // 一言Api进行打字机循环输出效果
    },
    async listHomeTalks() {
      await request('/home/talks').then(({ data }) => {
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
        top: document.documentElement.clientHeight,
      });
    },
    runTime() {
      var timeold =
        new Date().getTime() -
        new Date(this.blogInfo.websiteConfig.websiteCreateTime).getTime();
      var msPerDay = 24 * 60 * 60 * 1000;
      var daysold = Math.floor(timeold / msPerDay);
      var str = '';
      var day = new Date();
      str += daysold + '天';
      str += day.getHours() + '时';
      str += day.getMinutes() + '分';
      str += day.getSeconds() + '秒';
      this.time = str;
    },
    handleCurrentChange(val) {
      this.valcurrent = val;
      let md = require('markdown-it')();
      request('/articles', {
        params: {
          current: this.current,
        },
      }).then(({ data }) => {
        if (data.length) {
          // 去除markdown标签
          data.forEach((item) => {
            item.articleContent = md
              .render(item.articleContent)
              .replace(/<\/?[^>]*>/g, '')
              .replace(/[|]*\n/, '')
              .replace(/&npsp;/gi, '');
          });
          this.articleList.push(...data);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.el-pagination {
  display: flex;
  justify-content: center;
}

.card {
  background: #fff;
  border-width: thin;
  display: block;
  max-width: 100%;
  outline: none;
  text-decoration: none;
  transition-property: box-shadow, opacity;
  overflow-wrap: break-word;
  position: relative;
  white-space: normal;

  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  border-radius: 8px;
  margin-bottom: 20px;
}
</style>
