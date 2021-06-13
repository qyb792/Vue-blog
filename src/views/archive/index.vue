<template>
  <div>
    <!-- banner -->
    <banner
      :banner-title="this.$store.getters.bannerTitle"
      :banner-img="this.$store.getters.bannerImg"
    />
    <main id="content-inner" class="layout_page">
      <div id="archive">
        <div class="article-sort-title">文章总览 - {{ count }}</div>
        <div class="article-sort">
          <div class="article-sort-item year">2021</div>
          <div
            v-for="item of archiveList"
            :key="item.id"
            class="article-sort-item"
          >
            <a class="article-sort-item-img" href="#">
              <img
                src="https://cdn.jsdelivr.net/gh/zytqyb/Image-hosting@master/hexo_blog_img/y8qpqk.3hdi9olrkc80.jpg"
                alt=""
              >
            </a>
            <div class="article-sort-item-info">
              <div class="article-sort-item-time">
                <i class="fa fa-calendar" />
                <time
                  class="post-meta-date-created"
                  :title="'发表于' + item.createTime"
                >
                  {{ item.createTime | date }}
                </time>
              </div>

              <a
                class="article-sort-item-title"
                href="#"
                title="Vue学习笔记"
                data-pjax-state=""
              >{{ item.articleTitle }}</a>
            </div>
          </div>
        </div>
        <el-pagination
          :current-page.sync="current"
          :page-size="10"
          background
          layout="prev, pager, next, jumper"
          :total="count"
          @current-change="handleCurrentChange"
        />
      </div>
      <!-- 右侧菜单 -->
      <aside-content />
    </main>
  </div>
</template>

<script>
import { getArchives } from '@/api/archive'
export default {
  data: () => ({
    current: 1,
    count: 0,
    archiveList: []
  }),
  created() {
    this.getArchives()
    this.$store.dispatch(
      'blog/getBannerImg',
      'https://cdn.jsdelivr.net/gh/zytqyb/Image-hosting@master/hexo_blog_img/bg1.6cejq9rfsb40.jpg'
    )
    this.$store.dispatch('blog/getBannerTitle', '归档')
  },
  methods: {
    async getArchives() {
      const result = await getArchives(this.current)
      this.archiveList = result.data
      this.count = result.count
      // console.log(result)
    },
    // 当页数改变边的时候
    handleCurrentChange(val) {
      this.current = val
      this.getArchives()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-pagination {
	display: flex;
	justify-content: center;
	margin-top: 20px;
}

.article-sort-title {
  position: relative;
  margin-left: 0.5rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
  font-size: 1.72em;
}

.article-sort-title:before {
  position: absolute;
  top: calc(((100% - 1.8rem) / 2));
  left: -0.45rem;
  z-index: 1;
  width: 0.5rem;
  height: 0.5rem;
  border: 0.25rem solid #49b1f5;
  border-radius: 0.5rem;
  background: var(--card-bg);
  content: '';
  line-height: 0.5rem;
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  -ms-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
.article-sort-title:after {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 0;
  width: 2px;
  height: 1.5em;
  background: #aadafa;
  content: '';
}

.article-sort-title:hover:before {
  border-color: #ff7242;
}

.article-sort {
  margin-left: 0.5rem;
  padding-left: 1rem;
  border-left: 2px solid #aadafa;
}

.article-sort-item {
  position: relative;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  margin: 0 0 1rem 0.5rem;
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  -ms-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}

.article-sort-item:before {
  position: absolute;
  left: calc(-1rem - 17px);
  width: 0.3rem;
  height: 0.3rem;
  border: 0.15rem solid #49b1f5;
  border-radius: 0.3rem;
  background: #fff;
  content: '';
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  -ms-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}

.article-sort-item:hover:before {
  border-color: #ff7242;
}

.article-sort-item-img {
  overflow: hidden;
  width: 80px;
  height: 80px;
}

.article-sort-item-img img {
  width: 100%;
  height: 100%;
  -webkit-transition: all 0.6s;
  -moz-transition: all 0.6s;
  -o-transition: all 0.6s;
  -ms-transition: all 0.6s;
  transition: all 0.6s;
  object-fit: cover;
}

img {
  max-width: 100%;
  -webkit-transition: all 0.2s;
  -moz-transition: all 0.2s;
  -o-transition: all 0.2s;
  -ms-transition: all 0.2s;
  transition: all 0.2s;
}

a {
  color: #99a9bf;
  text-decoration: none;
  word-wrap: break-word;
  -webkit-transition: all 0.2s;
  -moz-transition: all 0.2s;
  -o-transition: all 0.2s;
  -ms-transition: all 0.2s;
  transition: all 0.2s;
  overflow-wrap: break-word;
}

.article-sort-item-info {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  padding: 0 0.8rem;
}

.article-sort-item-time time {
  padding-left: 0.3rem;
  cursor: default;
}

.article-sort-item-title {
  color: var(--font-color);
  font-size: 16px;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -o-transition: all 0.3s;
  -ms-transition: all 0.3s;
  transition: all 0.3s;
  -webkit-line-clamp: 2;
}

.article-sort-item-title:hover {
  color: #49b1f5;

  margin-left: 10px;
}

.article-sort-item.year {
  font-size: 1.43em;
}
</style>
