<template>
  <div id="aside_content" class="aside-content">
    <!-- 博主信息 -->
    <div class="card-widget">
      <div class="card-content">
        <!-- 头像,姓名,签名区域 -->
        <div class="card-info">
          <img
            class="avatar-img"
            :src="avatar"
            alt=""
          >
          <div class="author-info-name">{{ nickname }}</div>
          <div class="author-info-description">
            {{ intro }}
          </div>
        </div>
        <div class="card-info-data">
          <div class="card-info-data-item is-center">
            <a href="javascript:;">
              <div class="headline">文章</div>
              <div class="length-num">{{ articleCount }}</div>
            </a>
          </div>
          <div class="card-info-data-item is-center">
            <a href="javascript:;">
              <div class="headline">标签</div>
              <div class="length-num">{{ tagCount }}</div>
            </a>
          </div>
          <div class="card-info-data-item is-center">
            <a href="javascript:;">
              <div class="headline">分类</div>
              <div class="length-num">{{ categoryCount }}</div>
            </a>
          </div>
        </div>

        <div class="bookmarkwai is-center" @click="popUp">
          <div id="bookmark-it" class="bookmark">
            <i class="el-icon-collection-tag" />
            <span style="padding-left: 10px">加入书签</span>
          </div>
        </div>
        <div class="card-info-social-icons is-center">
          <a
            class="social-icon"
            href="https://github.com/zytqyb"
            target="_blank"
            title="Github"
          ><i
            class="fa fa-github"
          /></a>
          <a
            class="social-icon"
            href="mailto:1713684374@qq.com"
            target="_blank"
            title="Email"
          ><i
            class="fa fa-envelope"
          /></a>
          <a
            class="social-icon"
            href="/"
            target="_blank"
            title="RSS"
          ><i
            class="fa fa-rss"
          /></a>
        </div>
      </div>
    </div>

    <!-- 公告 -->
    <div class="card-widget">
      <div class="card-content">
        <div class="item-headline">
          <i class="fa fa-bullhorn card-announcement-animation" />
          <span>公告</span>
        </div>
        <div class="announcement_content">
          感谢访问本站，若喜欢请收藏 ^_^ ^_^不喜欢的话我再想想办法
        </div>
      </div>
    </div>

    <!-- 最新文章 -->
    <div class="card-widget card-recent-post">
      <div class="card-content">
        <div class="item-headline">
          <i class="fa fa-history" />
          <span>最新文章</span>
        </div>
        <div class="aside-recent-item">
          <div v-for="item in newBlog" :key="item.articleId" class="aside-recent-post">
            <a href="./article.html">
              <div class="aside-post-cover">
                <img
                  class="aside-post-bg lazyloaded"
                  :src="item.articleCover"
                  alt=""
                >
              </div>
              <div class="aside-post-title">
                <div class="aside-post_title">{{ item.articleTitle }}</div>
                <time>{{ item.createTime }}</time>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- 网站信息 -->
    <div class="card-widget card-webinfo">
      <div class="card-content">
        <div class="item-headline">
          <i class="fa fa-line-chart" />
          <span>网站资讯</span>
        </div>
        <div class="webinfo">
          <div class="webinfo-item">
            <div class="webinfo-article-name">文章数目</div>
            <div class="webinfo-article-count">{{ articleCount }}</div>
          </div>
          <div class="webinfo-item">
            <div class="webinfo-article-name">已运行时间 :</div>
            <div class="webinfo-article-count">10天</div>
          </div>
          <div class="webinfo-item">
            <div class="webinfo-article-name">本站总字数 :</div>
            <div class="webinfo-article-count">10.6k</div>
          </div>
          <div class="webinfo-item">
            <div class="webinfo-article-name">本站总访问量 :</div>
            <div class="webinfo-article-count">3216</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({}),

  computed: {
    ...mapGetters(['avatar', 'nickname', 'intro', 'articleCount', 'categoryCount', 'tagCount', 'newBlog'])
  },
  created() {
    this.$store.dispatch('blog/getNewBlog')
  },
  methods: {
    popUp() {
      this.$message({
        message: '按 CTRL+ D 键将本页加入书签',
        center: true,
        type: 'success'
      })
    }
  }
}
</script>

<style>
</style>
