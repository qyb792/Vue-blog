<template>
  <main id="content-inner" class="layout_page">

    <router-view :key="key" />
    <div id="aside_content" class="aside-content">
      <!-- 博主信息 -->
      <div class="card-widget">
        <div class="card-content">
          <!-- 头像,姓名,签名区域 -->
          <div class="card-info">
            <img class="avatar-img" src="https://cdn.jsdelivr.net/gh/zytqyb/Image-hosting@master/hexo_blog_img/Avatar.jpg" alt="">
            <div class="author-info-name">zytqyb</div>
            <div class="author-info-description">海上月是天上月,眼前人是心上人</div>
          </div>
          <div class="card-info-data">
            <div class="card-info-data-item is-center">
              <a href="javascript:;">
                <div class="headline">文章</div>
                <div class="length-num">10</div>
              </a>
            </div>
            <div class="card-info-data-item is-center">
              <a href="javascript:;">
                <div class="headline">标签</div>
                <div class="length-num">3</div>
              </a>
            </div>
            <div class="card-info-data-item is-center">
              <a href="javascript:;">
                <div class="headline">分类</div>
                <div class="length-num">10</div>
              </a>
            </div>
          </div>

          <div class="bookmarkwai is-center">
            <a class="bookmark" @click="tip = true">
              <i class="el-icon-collection-tag" />
              <span style="padding-left: 10px;">加入书签</span>
            </a>
          </div>
          <div class="card-info-social-icons is-center">

            <a
              target="_blank"
              href="https://github.com/zytqyb"
              class="iconfont icongithub social-icon"
            />
            <a class="social-icon" href="mailto:1713684374@qq.com" target="_blank" title="Email"><i
              class="iconfont icongithub social-icon"
            /></a>
            <a target="_blank" class="iconfont icongitee-fill-round social-icon" />

          </div>
        </div>
      </div>

      <!-- 公告 -->
      <div class="card-widget">
        <div class="card-content">
          <div class="item-headline">
            <i class="el-icon-message-solid" />
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
            <div class="aside-recent-post">
              <a href="./article.html">
                <div class="aside-post-cover">
                  <img class="aside-post-bg lazyloaded" src="https://cdn.jsdelivr.net/gh/zytqyb/Image-hosting@master/hexo_blog_img/Avatar.jpg" alt="">
                </div>
                <div class="aside-post-title">
                  <div class="aside-post_title">Javaweb博客开发文档</div>
                  <time>2020-12-15 10:30:33</time>
                </div>
              </a>
            </div>
            <div class="aside-recent-post">
              <a href="./轮播图.html">
                <div class="aside-post-cover">
                  <img class="aside-post-bg lazyloaded" src="https://cdn.jsdelivr.net/gh/zytqyb/Image-hosting@master/hexo_blog_img/Avatar.jpg" alt="">
                </div>
                <div class="aside-post-title">
                  <div class="aside-post_title">原生轮播图原理分析</div>
                  <time>2020-12-15 10:30:33</time>
                </div>
              </a>
            </div>
            <div class="aside-recent-post">
              <a href="./aboutBlog.html">
                <div class="aside-post-cover">
                  <img class="aside-post-bg lazyloaded" src="https://cdn.jsdelivr.net/gh/zytqyb/Image-hosting@master/hexo_blog_img/Avatar.jpg" alt="">
                </div>
                <div class="aside-post-title">
                  <div class="aside-post_title">关于博客</div>
                  <time>2020-12-15 10:30:33</time>
                </div>
              </a>
            </div>
            <div class="aside-recent-post">
              <a href="#">
                <div class="aside-post-cover">
                  <img class="aside-post-bg lazyloaded" src="https://cdn.jsdelivr.net/gh/zytqyb/Image-hosting@master/hexo_blog_img/Avatar.jpg" alt="">
                </div>
                <div class="aside-post-title">
                  <div class="aside-post_title">测试文章</div>
                  <time>2020-12-15 10:30:33</time>
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
            <i class="el-icon-finished" />
            <span>网站资讯</span>
          </div>
          <div class="webinfo">
            <div class="webinfo-item">
              <div class="webinfo-article-name">文章数目</div>
              <div class="webinfo-article-count">30</div>
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
    <!-- 提示消息 -->
    <v-snackbar v-model="tip" top color="#49b1f5" :timeout="2000">
      按CTRL+D 键将本页加入书签
    </v-snackbar>
  </main>
</template>

<script>
export default {
  name: 'AppMain',
  data: () => ({
    tip: false
  }),
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>

</style>
