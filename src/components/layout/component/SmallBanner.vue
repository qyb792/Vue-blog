<template>
  <div class="banner" :style="articleCover">
    <div class="article-info-container">
      <!-- 文章标题 -->
      <div class="article-title">
        {{ title || article.articleTitle }}
      </div>
      <div class="article-info" v-if="title === undefined">
        <div class="first-line">
          <!-- 发表时间 -->
          <span>
            <i class="iconfont iconrili" />
            发表于 {{ article.createTime | date }}
          </span>
          <span class="separator"> | </span>
          <!-- 发表时间 -->
          <span>
            <i class="iconfont icongengxinshijian" />
            更新于
            <template v-if="article.updateTime">
              {{ article.updateTime | date }}
            </template>
            <template v-else>
              {{ article.createTime | date }}
            </template>
          </span>
          <span class="separator"> | </span>
          <!-- 文章分类 -->
          <span class="article-category">
            <i class="iconfont iconfenlei1" />
            <router-link :to="'/categories/' + article.categoryId">
              {{ article.categoryName }}
            </router-link>
          </span>
        </div>
        <div class="second-line">
          <!-- 字数统计 -->
          <span>
            <i class="iconfont iconzishu" />
            字数统计: {{ articleValue.wordNum | num }}
          </span>
          <span class="separator"> | </span>
          <!-- 阅读时长 -->
          <span>
            <i class="iconfont iconshijian" />
            阅读时长: {{ articleValue.readTime }}
          </span>
          <span class="separator"> | </span>
          <!-- 阅读量 -->
          <span>
            <i class="iconfont iconliulan" /> 阅读量: {{ article.viewsCount }}
          </span>
          <span class="separator"> | </span>
          <!-- 评论量 -->
          <span>
            <i class="iconfont iconpinglunzu1" />评论数: {{ commentCount }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
    },
    articleValue: {
      type: Object,
    },
    commentCount: {
      type: Number,
    },
    title: {
      type: String,
    },
    articleCover: {
      type: String,
      require: true,
    },
  },
};
</script>
<style lang="less" scoped>
@keyframes header-effect {
  0% {
    opacity: 0;
    -webkit-transform: translateY(-50px);
    -moz-transform: translateY(-50px);
    -o-transform: translateY(-50px);
    -ms-transform: translateY(-50px);
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    -ms-filter: none;
    filter: none;
    -webkit-transform: translateY(0);
    -moz-transform: translateY(0);
    -o-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
  }
}

.banner {
  height: 25rem;
  position: relative;
  width: 100%;
  background-color: #49b1f5;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  animation: header-effect 1s;
  color: #fff;
  .article-category a {
    color: #fff;

    &:hover {
      color: #fff;
    }
  }

  &:before {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    content: '';
  }

  .article-info-container {
    position: absolute;
    bottom: 8.25rem;
    padding: 0 8%;
    width: 100%;
    text-align: center;

    .article-title {
      font-size: 40px;
      margin: 20px 0 8px;
    }

    .article-info {
      color: #eee;
      font-size: 95%;
    }
  }
}

@media screen and (max-width: 900px) {
  .layout_post {
    flex-wrap: wrap;
  }

  #post {
    width: 100% !important;
  }
}
</style>
