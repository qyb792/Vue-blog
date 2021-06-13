<template>
  <div>
    <!-- banner -->
    <banner
      :banner-title="this.$store.getters.bannerTitle"
      :banner-img="this.$store.getters.bannerImg"
    />
    <main id="content-inner" class="layout_page">
      <!-- 文章展示模块外部容器 -->
      <div class="recent-posts">
        <!-- github提交日历 -->
        <github-calendar />

        <!-- 首页文章列表展示 -->
        <home-article-item
          v-for="article in articleList"
          :key="article.articleId"
          :article="article"
        />

        <el-pagination
          :current-page.sync="current"
          :page-size="10"
          background
          layout="prev, pager, next, jumper"
          :total="this.$store.getters.articleCount"
          @current-change="handleCurrentChange"
        />
      </div>
      <!-- 右侧菜单 -->
      <aside-content />
    </main>
  </div>
</template>

<script>
import { getArticleList } from '@/api/home'

import GithubCalendar from '@/components/GithubCalendar'
import HomeArticleItem from './components/HomeArticleItem'
export default {
  name: 'Home',
  components: {
    GithubCalendar,
    HomeArticleItem
  },
  data: () => ({
    articleList: [], // 文章列表
    blogInfo: {}, // 个人信息
    current: 1 // 当前页数
  }),
  created() {
    this.getArticleList()
    this.$store.dispatch(
      'blog/getBannerImg',
      'https://cdn.jsdelivr.net/gh/zytqyb/Image-hosting@master/hexo_blog_img/bg.4ynvqn49q400.jpg'
    )
    this.$store.dispatch('blog/getBannerTitle', '邱同学のblog')
  },
  methods: {
    async getArticleList() {
      const result = await getArticleList(this.current)
      this.articleList = result.data
      // console.log(result)
    },
    // 当页数改变边的时候
    handleCurrentChange(val) {
      this.current = val
      this.getArticleList()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-pagination {
  display: flex;
  justify-content: center;
}
</style>
