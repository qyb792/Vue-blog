<template>
  <div class="post-item">
    <!-- 首页文章展示头图 -->
    <div class="item-img">
      <router-link :to="'/article/'+ article.articleId">
        <img class="img1" :src="article.articleCover" alt="文章头图">
      </router-link>
    </div>

    <div class="recent-post-information">
      <router-link class="article-title" :to="'/article/'+ article.articleId">
        {{ article.articleTitle }}
      </router-link>
      <div class="article-information">
        <time class="article-date" :title="'发表于' + article.createTime">
          <i class="fa fa-calendar" />
          {{ article.createTime }}
        </time>
        <span class="article-meta">
          <span class="separator"> |</span>
          <i class="fa fa-inbox article-meta--icon" />
          <a class="categories" href="javascript:;">{{ article.categoryName }}</a>
        </span>
        <div class="content">
          {{ article.articleContent }}
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
      required: true
    }
  }
}
</script>

<style>
</style>
