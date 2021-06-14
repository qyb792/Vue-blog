<template>
  <div>
    <!-- banner -->
    <banner
      :banner-title="title"
      :banner-img="'https://cdn.jsdelivr.net/gh/zytqyb/Image-hosting@master/hexo_blog_img/3.42hgan96tn60.jpg'"
    />

    <div class="article-list-wrapper animate__animated animate__backInUp">
      <el-row>
        <el-col v-for="item of articleList" :key="item.id" :span="8">
          <el-card :body-style="{ padding: '0px' }">
            <router-link :to="'/article/' + item.id">
              <img :src="item.articleCover" class="image">
            </router-link>
            <div class="article-item-info">
              <!-- 文章标题 -->
              <div>
                <router-link :to="'/article/' + item.id">
                  {{ item.articleTitle }}
                </router-link>
              </div>
              <div style="" class="article-info">
                <span>
                  <!-- 发表时间 -->
                  <i class="fa fa-history" />
                  {{ item.createTime | date }}
                </span>
                <!-- 文章分类 -->
                <span>
                  <router-link
                    :to="'/category/' + item.categoryId"
                    class="float-right"
                  >
                    <i class="el-icon-collection-tag" />{{ item.categoryName }}
                  </router-link>
                </span>
              </div>
            </div>

            <!-- 分割线 -->
            <span class="link" />
            <!-- 文章标签 -->
            <div class="tag-wrapper">
              <router-link
                v-for="tag of item.tagDTOList"
                :key="tag.tagId"
                :to="'/tag/' + tag.tagId"
                class="tag-btn"
              >
                {{ tag.tagName }}
              </router-link>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-pagination
        :current-page.sync="current"
        :page-size="10"
        background
        layout="prev, pager, next, jumper"
        :total="this.$store.getters.articleCount"
        @current-change="handleCurrentChange"
      />
    </div>

  </div>

</template>
<script>
import { getCategoryArticle } from '@/api/category'
export default {
  data() {
    return {
      current: 1,
      articleList: [],
      name: '',
      title: '',
      categoryOrTag: '',
      count: 20
    }
  },
  created() {
    const path = this.$route.path
    if (path.indexOf('/category') !== -1) {
      this.title = '分类'
      this.categoryOrTag = 'category-banner'
    } else {
      this.title = '标签'
      this.categoryOrTag = 'tag-banner'
    }
    this.getCategoryArticle()
  },
  methods: {
    // 当页数改变边的时候
    handleCurrentChange(val) {
      this.current = val
      this.getCategoryArticle()
    },

    async getCategoryArticle() {
      const url = this.$route.path
      const result = await getCategoryArticle(url, this.current)
      this.articleList = result.data.articlePreviewDTOList
      this.name = console.log(result)
    }
  }
}
</script>

<style lang="scss" scoped>
.link {
  display: block;
  flex: 1 1 0px;
  max-width: 100%;
  height: 0px;
  max-height: 0px;
  border: solid;
  border-width: thin 0 0 0;
  transition: inherit;
  border-color: #ccc;
}

.tag-wrapper {
  padding: 10px 15px 10px 18px;
}

.tag-btn {
  display: inline-block;
  font-size: 0.725rem;
  line-height: 22px;
  height: 22px;
  border-radius: 10px;
  padding: 0 12px !important;
  background: linear-gradient(to right, #bf4643 0%, #6c9d8f 100%);
  opacity: 0.6;
  margin-right: 0.5rem;
  color: #fff;
}

.article-info {
  display: flex;
  justify-content: space-between;
}

.article-item-info a {
  color: #4c4948;
  text-decoration: none;

	&:hover {
		color: #1976d2;
	}
}

.el-pagination {
	display: flex;
	justify-content: center;
	margin-top: 20px;
}

@media (min-width: 760px) {
  .article-list-wrapper {
    max-width: 1106px;
    margin: 50px auto 1rem auto;
  }
}

@media (min-width: 760px) {
  .article-item-info {
    line-height: 1.7;
    padding: 15px 15px 12px 18px;
    font-size: 15px;
  }
}

.el-row {
  flex-wrap: wrap;
  flex: 1 1 auto;
  margin-right: -12px;
  margin-left: -12px;
}

.el-card {
  background: #fff;
  color: #4c4948;
  border-radius: 8px;
  box-shadow: 0 4px 8px 6px rgb(7 17 27 / 6%);
  transition: all 0.3s;
  margin: 10px;
}

.el-card__body {
  padding: 0 !important;
}
</style>

<style>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
  height: 200px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}
</style>
